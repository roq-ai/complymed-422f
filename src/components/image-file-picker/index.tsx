import { Box, Button, Flex, FormControl, FormControlProps, FormErrorMessage, FormLabel, Image } from '@chakra-ui/react';
import { FileUpload, useRoqFileUploader } from '@roq/nextjs';
import { FileInterface } from '@roq/ui-react/dist/features';
import { createFileAssociation, deleteFileAssociation, getFiles } from 'apiSdk/files';
import useSWR from 'swr';
import { FC, ForwardedRef, ReactNode, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

interface ImagePickerComponentProps {
  id?: string;
  entityId: string;
  entity: string;
  formControlProps?: FormControlProps;
  label?: string | ReactNode;
  error?: string | ReactNode;
  onChange?: (file: File | null) => void;
  category?: string;
  onSuccess?: (file: FileInterface) => void;
  onError?: (err: Error) => void;
  ref?: ForwardedRef<any>;
}

export const ImagePicker: FC<ImagePickerComponentProps> = forwardRef(function ImagePickerComponent(inputProps, ref) {
  const {
    formControlProps,
    label,
    error,
    onChange,
    onSuccess,
    onError,
    category = 'USER_FILES',
    entity,
    entityId,
  } = inputProps;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { data: filesQuery, mutate } = useSWR(
    () => `/file-association/${entity}/${entityId}`,
    () => getFiles({ entity, entityId }),
  );
  const handleDeleteFile = async () => {
    setSelectedImage(null);
    if (onChange) {
      onChange(null);
    }
    if (filesQuery?.files?.[0]) {
      await deleteFileAssociation(filesQuery?.files?.[0].id);
    }
    mutate();
  };

  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      onSuccess?.(file);
    },
    onUploadFail: (err) => {
      console.error(err);
      onError?.(err);
    },
    onChange: ([file]) => {
      setSelectedImage(file);
      if (onChange) {
        onChange(file);
      }
    },
    fileCategory: category,
    onUploadRemoved: handleDeleteFile,
  });

  const handleUpload = useCallback(async () => {
    if (selectedImage) {
      const file = await fileUploader.uploadFile({
        file: selectedImage as File,
        temporaryId: Date.now().toString(),
      });
      await createFileAssociation({
        entityId,
        entity,
        fileId: file.fileId,
        ...(filesQuery?.files.length && {
          oldFileId: filesQuery.files[0].id,
        }),
      });
    }
  }, [fileUploader, selectedImage, entity, entityId, filesQuery]);

  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  const src = useMemo(() => filesQuery?.files?.[0]?.url, [filesQuery]);
  const imageAdded = useMemo(() => selectedImage || src, [selectedImage, src]);

  return (
    <FormControl {...formControlProps}>
      <FormLabel fontSize="1rem" fontWeight={600} color="base.content">
        {label}
      </FormLabel>
      <Flex alignItems="center" marginBottom="1rem">
        {!imageAdded && (
          <>
            <FileUpload
              fileUploader={fileUploader}
              accept={['image/*']}
              fileCategory={category}
              showActiveUploads={false}
            >
              <Button
                bg="neutral.transparent"
                color="neutral.main"
                type="button"
                display="flex"
                height="2.5rem"
                padding="0rem 1rem"
                justifyContent="center"
                alignItems="center"
                gap="0.5rem"
                _hover={{
                  bg: 'neutral.transparent',
                  color: 'neutral.main',
                }}
              >
                Upload file
              </Button>
            </FileUpload>
          </>
        )}
        {imageAdded && (
          <>
            <Flex direction="column" width="100%">
              {imageAdded && (
                <Image src={selectedImage ? URL.createObjectURL(selectedImage) : src} alt="Selected" width="100%" />
              )}
              {selectedImage && (
                <Box
                  sx={{
                    mt: '0.5rem',
                    fontSize: '0.875rem',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'base.content',
                  }}
                >
                  {selectedImage.name}
                </Box>
              )}
              <Flex pt="1rem" alignItems="center" direction={'row'} justifyContent={{ lg: 'space-between' }} gap={3}>
                <Box w="full">
                  <FileUpload
                    fileUploader={fileUploader}
                    accept={['image/*']}
                    className="image-uploader"
                    fileCategory={category}
                    style={{
                      width: '100%',
                    }}
                    showActiveUploads={false}
                  >
                    <Button
                      bg="state.info.main"
                      color="base.100"
                      type="button"
                      display="flex"
                      height="2.5rem"
                      padding="0rem 1rem"
                      justifyContent="center"
                      alignItems="center"
                      gap="0.5rem"
                      borderRadius="0.375rem"
                      width={'100%'}
                      mr="4"
                      _hover={{
                        bg: 'state.info.main',
                        color: 'base.100',
                      }}
                    >
                      Replace File
                    </Button>
                  </FileUpload>
                </Box>
                <Button
                  bg="state.error.transparent"
                  color="state.error.main"
                  type="button"
                  display="flex"
                  height="2.5rem"
                  padding="0rem 1rem"
                  justifyContent="center"
                  alignItems="center"
                  gap="0.5rem"
                  borderRadius="0.375rem"
                  _hover={{
                    bg: 'state.error.transparent',
                    color: 'state.error.main',
                  }}
                  w={'full'}
                  onClick={handleDeleteFile}
                >
                  <Box as={FiTrash} mr="2" />
                  Delete File
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
});
