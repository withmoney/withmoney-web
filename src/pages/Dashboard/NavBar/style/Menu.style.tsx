import styled from 'styled-components';
import Link from 'components/Link';
import Button from 'components/Button';

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin: 20px;
  ${Link} {
    margin-bottom: 10px;
  }
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 55px;
  right: 10px;
  width: 270px;
  padding-bottom: 50px;
  background-color: var(--dashboard-color-white);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25);
  cursor: default;

  ${Button} {
    position: absolute;
    right: 18;
    bottom: 14px;
  }

  &:after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-top: 0px solid transparent;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 11px solid var(--dashboard-color-white);
  }
  z-index: 1000;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--dashboard-color-grey);
  }
  &.disabled {
    pointer-events: none;
    cursor: default;
    background-color: var(--dashboard-color-lightgrey);
  }
`;
