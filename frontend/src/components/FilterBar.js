import React from 'react';

function FilterBar({ cities, stages, years, filters, onFilterChange }) {
  return (
    <div className="row g-2 mb-3">
      <div className="col-md-4">
        <select className="form-select" value={filters.city} onChange={e => onFilterChange({ city: e.target.value })}>
          <option value="">All Cities</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select className="form-select" value={filters.stage} onChange={e => onFilterChange({ stage: e.target.value })}>
          <option value="">All Funding Stages</option>
          {stages.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select className="form-select" value={filters.year} onChange={e => onFilterChange({ year: e.target.value })}>
          <option value="">All Years</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
