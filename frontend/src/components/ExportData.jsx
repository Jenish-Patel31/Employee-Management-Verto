import React from 'react';

const ExportData = ({ employees, searchTerm, sortConfig }) => {
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Position', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...employees.map(employee => [
        `"${employee.name}"`,
        `"${employee.email}"`,
        `"${employee.position}"`,
        `"${employee.created_at}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const filename = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Export:</span>
      <button
        onClick={exportToCSV}
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        CSV
      </button>
    
    </div>
  );
};

export default ExportData;
