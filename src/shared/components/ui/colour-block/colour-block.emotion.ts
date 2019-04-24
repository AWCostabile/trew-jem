import styled from 'react-emotion';

interface IStyledSpan {
  colour?: string;
}

export const ColouredSpan = styled('span')<IStyledSpan>`
  color: ${({ colour = 'inherit' }) => colour};
`;
