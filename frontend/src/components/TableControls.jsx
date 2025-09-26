import React from 'react';

const TableControls = ({ 
  sortConfig, 
  onClearSort, 
  totalCount, 
  filteredCount, 
  searchTerm 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      {/* Results Info */}
      <div className="text-sm text-gray-600">
        {searchTerm ? (
          <span>
            Showing <span className="font-medium">{filteredCount}</span> of{' '}
            <span className="font-medium">{totalCount}</span> employees
            {searchTerm && (
              <span> matching "<span className="font-medium">{searchTerm}</span>"</span>
            )}
          </span>
        ) : (
          <span>
            Showing <span className="font-medium">{totalCount}</span> employees
          </span>
        )}
      </div>

      {/* Sort Controls */}
      {sortConfig.key && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Sorted by: <span className="font-medium capitalize">{sortConfig.key}</span>
          </span>
          <span className="text-xs text-gray-500">
            ({sortConfig.direction === 'asc' ? 'A-Z' : 'Z-A'})
          </span>
          <button
            onClick={onClearSort}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default TableControls;
