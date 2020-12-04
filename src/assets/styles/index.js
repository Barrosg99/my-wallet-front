import { createGlobalStyle } from 'styled-components';
import reset from './reset';
import common from './common';

export default createGlobalStyle`
  ${reset}
  ${common}
`;
