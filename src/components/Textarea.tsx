import styled from 'styled-components';

const Textarea = styled.textarea`
  color: var(--text-area-color);
  border: 2px solid var(--text-area-border-color);
  font-size: var(--font-default);
  resize: none;
  outline: none;
  padding: var(--text-area-box-shadow-padding-top) var(--text-area-box-shadow-padding-left);

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
    color: var(--text-area-border-color-placeholder);
  }
`;

export default Textarea;
