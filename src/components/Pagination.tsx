import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Flex from './Flex';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  setPage: (value: number) => void;
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage, setPage }: Props) => {
  const PageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalItems / itemsPerPage) - 1; ++i) {
    PageNumbers.push(i);
  }

  const handleGoToFirstPage = () => {
    setPage(0 * itemsPerPage);
    setCurrentPage(0);
  };

  const handleGoToNextPage = () => {
    setPage((currentPage + 1) * itemsPerPage);
    setCurrentPage(currentPage + 1);
  };

  const handleGoToPreviousPage = () => {
    setPage((currentPage - 1) * itemsPerPage);
    setCurrentPage(currentPage - 1);
  };

  const handleGoToLastPage = () => {
    setPage((PageNumbers.length - 1) * itemsPerPage);
    setCurrentPage(PageNumbers.length - 1);
  };

  return (
    <Nav justifyContent="center">
      <NavButton disabled={currentPage === 0} onClick={() => handleGoToFirstPage()}>
        {'<<'}
      </NavButton>
      <NavButton disabled={currentPage === 0} onClick={() => handleGoToPreviousPage()}>
        {'<'}
      </NavButton>
      {PageNumbers.map(
        (number) =>
          currentPage >= number &&
          currentPage <= number && (
            <NavButton disabled key={number}>
              {number + 1} / {PageNumbers.length}
            </NavButton>
          ),
      )}
      <NavButton
        disabled={currentPage === PageNumbers.length - 1}
        onClick={() => handleGoToNextPage()}
      >
        {'>'}
      </NavButton>
      <NavButton
        disabled={currentPage === PageNumbers.length - 1}
        onClick={() => handleGoToLastPage()}
      >
        {'>>'}
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
