import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Flex from './Flex';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }: Props) => {
  const PageNumbers = Math.ceil(totalItems / itemsPerPage);

  const handleGoToFirstPage = () => {
    setCurrentPage(0);
  };

  const handleGoToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleGoToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleGoToLastPage = () => {
    setCurrentPage(PageNumbers - 1);
  };

  return (
    <Nav justifyContent="center">
      <NavButton type="button" disabled={currentPage <= 0} onClick={() => handleGoToFirstPage()}>
        {'First Page'}
      </NavButton>
      <NavButton type="button" disabled={currentPage <= 0} onClick={() => handleGoToPreviousPage()}>
        {'Previous'}
      </NavButton>
      {PageNumbers === 0 ? (
        <NavButton disabled>1 / 1</NavButton>
      ) : (
        <NavButton disabled>
          {currentPage + 1} / {PageNumbers}
        </NavButton>
      )}
      <NavButton
        type="button"
        disabled={currentPage >= PageNumbers - 1}
        onClick={() => handleGoToNextPage()}
      >
        {'Next'}
      </NavButton>
      <NavButton
        type="button"
        disabled={currentPage >= PageNumbers - 1}
        onClick={() => handleGoToLastPage()}
      >
        {'Last Page'}
      </NavButton>
    </Nav>
  );
};

const Nav = styled(Flex)`
  padding: 15px;
`;
const NavButton = styled(Button)`
  height: 40px;
  margin-right: 5px;
`;

export default Pagination;
