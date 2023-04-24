import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    if (totalItems > 0) {
      const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
      const pages = [];

      for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
            {i}
          </Pagination.Item>,
        );
      }

      setTotalPages(totalPagesCount);
      setPageItems(pages);
    }
  }, [totalItems, itemsPerPage, currentPage, onPageChange]);

  return (
    <Pagination>
      <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
      {pageItems}
      <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
    </Pagination>
  );
};

export default PaginationComponent;
