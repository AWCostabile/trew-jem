import styled from 'react-emotion';
import { themeMargin } from 'shared/styling/utils';

export const LoginForm = styled('div')`
  display: flex;
  flex-direction: column;

  & input {
    ${themeMargin({ bottom: 1 })};
  }
`;
