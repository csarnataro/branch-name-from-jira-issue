import styled from '@emotion/styled';
import { CodeProps } from './CodeProps';

const StyledCode = styled.code`
  font-weight: ${({ bold }: CodeProps) => (bold ? 'bold' : 'normal')};
  display: ${({ inline }: CodeProps) => (inline ? 'inline' : 'block')}
`;

export default StyledCode;
