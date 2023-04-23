import React, { useState } from 'react';

function PaginationAdminComponent({ currentPage, pages, onPageChange }) {
  const [pageButtons, setPageButtons] = useState([]);

  // hàm để tạo mảng các nút phân trang
  const generatePageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    setPageButtons(buttons);
  };

  generatePageButtons();

  return <div className="pagination">{pageButtons}</div>;
}

export default React.memo(PaginationAdminComponent);
