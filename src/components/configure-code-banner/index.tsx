import { Box, Button, Flex, Link, Stack, Text, Icon } from '@chakra-ui/react';
import { clientConfig, appConfig } from 'config';
import { WrenchIcon } from 'icons/wrench-icon';
import { FiExternalLink } from 'react-icons/fi';
import useAxiosFetch from 'lib/hooks/use-axios-fetch';
import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react';
import { FiEye } from 'react-icons/fi';
import { BannerLightBulbIcon } from 'icons/banner-light-bulb-icon';

interface ConfigureCodeBannerProps {
  isBannerVisible: boolean;
  setIsBannerVisible: Dispatch<SetStateAction<boolean>>;
  isHelpBoxVisible: boolean;
}

export default function ConfigureCodeBanner(props: ConfigureCodeBannerProps) {
  const { isBannerVisible, isHelpBoxVisible } = props;
  const { data } = useAxiosFetch(clientConfig.roq.consoleServiceURL, {
    method: 'POST',
    data: { query: `{ environmentOnboardingUrls { editModelUrl localInstallationUrl } }` },
  });
  const { localInstallationUrl } = useMemo(() => data?.data?.environmentOnboardingUrls ?? {}, [data]);
  return (
    <Box
      as="section"
      background="var(--chakra-colors-chakra-body-bg)"
      padding="0"
      display={isBannerVisible ? 'block' : 'none'}
      position="sticky"
      top="0"
      zIndex={2000}
    >
      <Stack
        bg={isHelpBoxVisible ? 'white' : '#0A0B0F'}
        padding={{ base: '1rem 1.125rem', md: '1rem 1.125rem' }}
        direction={{ md: 'row', base: 'column' }}
        spacing={{ base: '3', md: '4' }}
        align="center"
        justify="space-between"
      >
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          direction={{ base: 'column', md: 'row' }}
          flex="1"
          textAlign="center"
          gap="12px"
        >
          <Icon color="#3365E4" as={FiEye} boxSize="20px" />
          <Text
            fontFamily={'"Satoshi-Variable"'}
            color={isHelpBoxVisible ? 'base.content' : 'white'}
            fontSize="1rem"
            fontWeight={600}
          >
            This is a preview of the application that you have generated. To continue click here:
          </Text>
          <Flex>
            <ButtonLink icon={<WrenchIcon width="1.25rem" height="1.25rem" />} href={localInstallationUrl || '#'}>
              Edit this app, make it yours
            </ButtonLink>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap={3}>
          <Icon color="secondary.main" as={BannerLightBulbIcon} boxSize="20px" />
          <Text
            fontSize="16px"
            color={isHelpBoxVisible ? 'base.content' : 'white'}
            fontWeight={600}
            fontFamily={'"Satoshi-Variable"'}
            lineHeight="normal"
          >
            Need Help Finishing Your App?
          </Text>
          <ButtonLink
            bgColor="secondary.main"
            icon={<FiExternalLink width="1.25rem" height="1.25rem" />}
            href={appConfig.getQuoteUrl}
          >
            Get started with a Quote{' '}
          </ButtonLink>
        </Flex>
      </Stack>
    </Box>
  );
}

const ButtonLink: React.FC<{ href: string; children: ReactNode; icon: ReactNode; bgColor?: string }> = ({
  href,
  children,
  icon,
  bgColor,
}) => (
  <Link href={href} style={{ textDecoration: 'none' }} target="_blank">
    <Button
      borderRadius="0.375rem"
      background="#3365E4"
      bgColor={bgColor}
      fontSize="0.875rem"
      fontWeight={700}
      color="white"
      padding="0.375rem 1rem"
      justifyContent="center"
      fontFamily={'"Satoshi-Variable"'}
      lineHeight="1.5rem"
      letterSpacing={'0.025rem'}
      boxShadow="0px 3px 1px -2px rgba(116, 116, 133, 0.15), 0px 2px 2px 0px rgba(116, 116, 133, 0.10), 0px 1px 5px 0px rgba(116, 116, 133, 0.05)"
      _hover={{
        color: 'white',
      }}
      display="flex"
      gap={'0.5rem'}
    >
      {children}
      {icon}
    </Button>
  </Link>
);
