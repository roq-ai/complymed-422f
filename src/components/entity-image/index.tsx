import { Box, Image } from '@chakra-ui/react';
import { getFiles } from 'apiSdk/files';
import { useMemo } from 'react';
import useSWR from 'swr';

interface EntityImageProps {
  entity: string;
  entityId: string;
}
export function EntityImage(props: EntityImageProps) {
  const { entity, entityId } = props;
  const { data: filesQuery } = useSWR(
    () => `/file-association/${entity}/${entityId}`,
    () => getFiles({ entity, entityId }),
  );
  const src = useMemo(() => filesQuery?.files?.[0]?.url, [filesQuery]);

  if (!src) {
    return null;
  }

  return (
    <Box mb={5} w="full">
      <Image src={src} alt="" height="182px" width="100%" objectFit="cover" borderRadius="5px" />
    </Box>
  );
}
