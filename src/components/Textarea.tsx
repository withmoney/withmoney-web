import styled from 'styled-components';

const Textarea = styled.textarea`
  color: var(--text-area-color);
  border: 2px solid var(--text-area-border-color);
  font-size: var(--font-default);
  border-radius: var(--input-border-radius);
  resize: none;
  outline: none;
  padding: var(--text-area-padding-vertical) var(--text-area-padding-horizontal);

  &:hover {
    border-color: var(--text-area-border-color-hover);
  }

  &:focus {
    border-color: var(--text-area-border-color-focus);
    box-shadow: 0 0 0 2px var(--text-area-box-shadow-focus);
  }

  &:active {
    border-color: var(--text-area-border-color-active);
  }

  &:disabled {
    border-color: var(--text-area-border-color-disabled);
    background-color: var(--text-area-background-color-disabled);
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: var(--text-area-border-color-placeholder);
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: var(--text-area-border-color-placeholder);
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: var(--text-area-border-color-placeholder);
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: var(--text-area-border-color-placeholder);
  }
`;

export default Textarea;
