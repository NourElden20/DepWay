import React, { useState, useMemo } from 'react';

const DataTable = ({ 
  data = [], 
  columns = [], 
  onRowClick,
  sortable = true,
  searchable = true,
  pagination = true,
  pageSize = 10,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      columns.some(column => {
        const value = row[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px'
  };

  const sortableHeaderStyle = {
    ...headerStyle,
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative'
  };

  const rowStyle = {
    borderBottom: '1px solid #e1e5e9',
    transition: 'background-color 0.2s ease'
  };

  const cellStyle = {
    padding: '15px',
    fontSize: '14px',
    color: '#333'
  };

  const searchContainerStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px'
  };

  const searchInputStyle = {
    flex: 1,
    padding: '10px 15px',
    border: '2px solid #e1e5e9',
    borderRadius: '25px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  };

  const pageButtonStyle = (active = false) => ({
    padding: '8px 12px',
    border: '1px solid #e1e5e9',
    background: active ? '#667eea' : 'white',
    color: active ? 'white' : '#333',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  });

  const loadingStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div>
      {searchable && (
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="البحث في الجدول..."
            value={searchTerm}
            onChange={handleSearch}
            style={searchInputStyle}
          />
          <div style={{ fontSize: '14px', color: '#666' }}>
            عرض {paginatedData.length} من {sortedData.length} عنصر
          </div>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={sortable && column.sortable !== false ? sortableHeaderStyle : headerStyle}
                onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
              >
                {column.title}
                {sortable && column.sortable !== false && sortConfig.key === column.key && (
                  <span style={{ marginLeft: '5px' }}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={index}
              style={rowStyle}
              onClick={() => onRowClick && onRowClick(row, index)}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              {columns.map((column) => (
                <td key={column.key} style={cellStyle}>
                  {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div style={paginationStyle}>
          <button
            style={pageButtonStyle()}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            السابق
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              style={pageButtonStyle(page === currentPage)}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            style={pageButtonStyle()}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DataTable;
