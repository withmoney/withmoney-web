import styled from 'styled-components';
import Flex from '../../../../../components/Flex';

type Props = {
  width?: string;
  flex?: string;
};

export const CellHeader = styled.div<Props>`
  width: ${({ width }) => (width ? width : null)};
  flex: ${({ flex }) => (flex ? flex : null)};
  padding-left: 5px;
  padding-right: 5px;
`;

export const RowHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
type RowProps = {
  cursorHover?: boolean;
};
export const Row = styled(Flex)<RowProps>`
  cursor: ${({ cursorHover }) => (cursorHover ? 'pointer' : 'default')};
  & + & {
    margin-top: 5px;
  }
`;

export const Cell = styled(Flex)<Props>`
  width: ${({ width }) => (width ? width : null)};
  flex: ${({ flex }) => (flex ? flex : null)};
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;

  &:first-child {
    padding-left: 17px;
  }

  &:last-child {
    padding-left: 8px;
  }

  & + & {
    margin-top: 0;
  }
  & > div {
    width: 100%;
  }
`;
