import { extendTheme } from '@chakra-ui/react';
import { colors } from './foundations/colors';
import { config } from './foundations/config';
import { fonts } from './foundations/fonts';
import { components } from '../components';

export const samurai = extendTheme({
  config,
  colors,
  fonts,
  components,
});
