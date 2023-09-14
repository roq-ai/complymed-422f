import { Flex, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
import { useSession } from '@roq/nextjs';
import React, { CSSProperties, useEffect, useMemo } from 'react';

import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { PreviewWelcomeIcon } from 'icons/preview-welcome';
import { PreviewFirstUser } from 'icons/preview-first-user';
import { CustomButton } from 'components/custom-button';

function isFirstLogin() {
  const firstTimeLogin = !localStorage.getItem('userHasLoggedIn');
  if (firstTimeLogin) {
    localStorage.setItem('userHasLoggedIn', 'true');
    return false;
  } else {
    return true;
  }
}

function isFirstVisit() {
  const firstTimeLogin = !localStorage.getItem('userFirstVisit');
  if (firstTimeLogin) {
    localStorage.setItem('userFirstVisit', 'true');
    return false;
  } else {
    return true;
  }
}

interface HelpBoxProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}
export const HelpBox: React.FC<HelpBoxProps> = (props) => {
  const { isOpen, onClose, onOpen } = props;

  const { session, status: sessionStatus } = useSession();
  const modalContent = useMemo(() => {
    if (sessionStatus === 'authenticated') {
      return {
        title: 'You’ve just created your first user!',
        description: 'Keep exploring the app. You can always configure it by following the banner on the top.',
        maxW: '100%',
        icon: PreviewFirstUser,
        iconWidth: '8.125rem',
        iconHeight: '5.7935rem',
        btnText: 'Got it!',
      };
    } else if (sessionStatus === 'unauthenticated') {
      return {
        title: 'This is a preview of your app',
        description: 'To get most of your app, please register and check out what is behind the scenes!',
        maxW: '380px',
        icon: PreviewWelcomeIcon,
        iconWidth: '9.75rem',
        iconHeight: '6.5rem',
        btnText: 'Start exploring',
      };
    }
    return null;
  }, [sessionStatus]);

  useEffect(() => {
    if (session?.roqUserId) {
      if (!isFirstLogin()) {
        onOpen();
      }
    } else {
      if (!isFirstVisit()) {
        setTimeout(onOpen, 2000);
      }
    }
  }, [session?.roqUserId, onOpen]);

  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm' });

  const modalStyle = React.useMemo<CSSProperties>(() => {
    if (breakpoint === 'base') {
      return {
        position: 'fixed',
        bottom: 10,
        width: '80%',
      };
    }
    return {};
  }, [breakpoint]);

  if (modalContent === null) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent style={modalStyle} maxWidth="40.25rem" width="40.25rem">
          <ModalBody padding="0">
            <Flex direction="column" alignItems="center" textAlign="center" gap="2rem">
              <Icon
                as={modalContent.icon}
                color="primary.main"
                width={modalContent.iconWidth}
                height={modalContent.iconHeight}
              />
              <Flex direction="column" gap="0.5rem" alignItems="center">
                <Text
                  color="#0A0B0F"
                  fontSize="2rem"
                  fontWeight={600}
                  letterSpacing="0.01563rem"
                  lineHeight="2.47rem"
                  fontStyle={'normal'}
                  fontFamily='"Satoshi-Variable"'
                >
                  {modalContent.title}
                </Text>
                <Text
                  fontFamily='"Satoshi-Variable"'
                  fontSize="1rem"
                  fontStyle="normal"
                  maxW={modalContent.maxW}
                  color="#0A0B0F"
                >
                  {modalContent.description}
                </Text>
              </Flex>
              <CustomButton
                fontFamily='"Satoshi-Variable"'
                weight="primary"
                _hover={{ bg: 'primary.focus' }}
                onClick={onClose}
              >
                {modalContent.btnText}
              </CustomButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
