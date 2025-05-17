import React from 'react';

interface FiltersProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const Filters: React.FC<FiltersProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filters">
      <button
        onClick={() => onFilterChange('all')}
        className={currentFilter === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={currentFilter === 'active' ? 'active' : ''}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={currentFilter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
    </div>
  );
};

export default Filters;