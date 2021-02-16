import styled from 'styled-components';

type Props = {
  size?: string;
  borderRadius?: string;
};

const Img = styled.img<Props>`
  width: ${({ size = 'var(--dashboard-default-img-size)' }) => size};
  height: ${({ size = 'var(--dashboard-default-img-size)' }) => size};
  border-radius: ${({ borderRadius = 'var(--dashboard-img-default-radius)' }) => borderRadius};
  margin-right: 8px;
`;

export default Img;
