import styled from 'styled-components';

type TextProps = {
  isDisabled?: any;
  isPrimary?: any;
  isDanger?: any;
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
