import React, { useState, useEffect } from 'react';

const SearchBar = ({ 
  placeholder = 'البحث...', 
  onSearch, 
  onClear,
  debounceMs = 300,
  showFilters = false,
  filters = [],
  onFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm, selectedFilters);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFilters, debounceMs, onSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedFilters({});
    if (onClear) {
      onClear();
    }
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...selectedFilters, [filterKey]: value };
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px'
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    borderRadius: '25px',
    border: '2px solid #e1e5e9',
    padding: '8px 15px',
    transition: 'border-color 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    background: 'transparent',
    color: '#333'
  };

  const searchIconStyle = {
    fontSize: '18px',
    color: '#666',
    marginLeft: '10px'
  };

  const clearButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#666',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const filtersContainerStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const filterStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: '#f8f9fa',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '14px'
  };

  const selectStyle = {
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <span style={searchIconStyle}>🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          style={inputStyle}
        />
        {searchTerm && (
          <button 
            style={clearButtonStyle}
            onClick={handleClear}
            onMouseEnter={(e) => {
              e.target.style.background = '#f0f0f0';
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#666';
            }}
          >
            ×
          </button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div style={filtersContainerStyle}>
          {filters.map((filter) => (
            <div key={filter.key} style={filterStyle}>
              <label style={{ fontSize: '12px', color: '#666' }}>
                {filter.label}:
              </label>
              <select
                value={selectedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                style={selectStyle}
              >
                <option value="">الكل</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {searchTerm && (
        <div style={{ 
          fontSize: '14px', 
          color: '#666',
          textAlign: 'center'
        }}>
          البحث عن: "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
