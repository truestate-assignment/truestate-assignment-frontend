import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  // Generate page numbers array with ellipsis logic
  const getPageNumbers = () => {
    const total = parseInt(totalPages) || 0;
    const current = parseInt(page) || 1;
    const pages = [];
    const maxVisible = 7;

    if (total <= 1) return [1];

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      // Calculate start and end of the window around current page
      let start = Math.max(2, current - 1);
      let end = Math.min(total - 1, current + 1);

      // Adjust if near the beginning
      if (current <= 3) {
        end = Math.min(total - 1, 4);
      }

      // Adjust if near the end
      if (current >= total - 2) {
        start = Math.max(2, total - 3);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {pageNumbers.map((p, index) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`min-w-[2rem] h-9 px-3 rounded-md text-sm font-medium transition-all duration-200 ${p === page
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;