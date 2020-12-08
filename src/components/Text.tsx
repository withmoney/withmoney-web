import styled from 'styled-components';

type TextProps = {
  children: React.ReactNode;
  variation?: Variations;
};

type Variations = 'primary' | 'disabled' | 'danger';

const Text = styled.p<TextProps>`
  color: ${(props) => {
    switch (props.variation) {
      case 'primary':
        return '#219653';
      case 'disabled':
        return '#9AA0A9';
      case 'danger':
        return '#E98686';
      default:
        return '#363636';
    }
  }};
`;

export { Text };
