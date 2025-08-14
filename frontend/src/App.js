import React, { useState, useMemo } from 'react';
import Upload from './components/Upload';
import FilterBar from './components/FilterBar';
import StartupList from './components/StartupList';
import StartupDetail from './components/StartupDetail';

function App() {
  const [startups, setStartups] = useState([]);
  const [filters, setFilters] = useState({ city: '', stage: '', year: '' });
  const [selected, setSelected] = useState(null);

  const handleDataLoaded = data => {
    setStartups(data);
    setFilters({ city: '', stage: '', year: '' });
  };

  const handleFilterChange = updated => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const filteredStartups = useMemo(() => {
    return startups.filter(s =>
      (!filters.city || s['City'] === filters.city) &&
      (!filters.stage || s['Funding Stage'] === filters.stage) &&
      (!filters.year || String(s['Year Founded']) === filters.year)
    );
  }, [startups, filters]);

  const cities = Array.from(new Set(startups.map(s => s['City']).filter(Boolean)));
  const stages = Array.from(new Set(startups.map(s => s['Funding Stage']).filter(Boolean)));
  const years = Array.from(new Set(startups.map(s => String(s['Year Founded'])).filter(Boolean)));

  return (
    <div className="container py-4">
      <h1 className="mb-4">Startup Browser</h1>
      <Upload onDataLoaded={handleDataLoaded} />
      {startups.length > 0 && (
        <>
          <FilterBar
            cities={cities}
            stages={stages}
            years={years}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <StartupList startups={filteredStartups} onSelect={setSelected} />
        </>
      )}
      <StartupDetail startup={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
