import styled from 'styled-components';

type TextProps = {
  isDisabled?: boolean;
  isPrimary?: boolean;
  isDanger?: boolean;
};

const Text = styled.p<TextProps>`
  color: ${(props) => {
    if (props.isDisabled) {
      return '#9AA0A9';
    } else if (props.isPrimary) {
      return '#219653';
    } else if (props.isDanger) {
      return '#E98686';
    } else {
      return '#363636';
    }
  }};
`;

export { Text };
