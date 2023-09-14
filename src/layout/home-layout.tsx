import { Box } from '@chakra-ui/react';
import { HEADER_MD_HEIGHT, HEADER_MOBILE_HEIGHT } from 'const/sizes';
import { useBanner } from 'lib/hooks/use-banner';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { isBannerVisible } = useBanner();
  return (
    <Box display="flex" flexDirection="column" bg="base.100">
      <Box
        flex="0 0 auto"
        display={{ lg: 'flex' }}
        height={{
          md: isBannerVisible ? `calc(100vh - ${HEADER_MD_HEIGHT})` : '100vh',
          base: isBannerVisible ? `calc(100vh - ${HEADER_MOBILE_HEIGHT})` : '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
