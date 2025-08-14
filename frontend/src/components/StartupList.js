import React from 'react';

function StartupList({ startups, onSelect }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Startup Name</th>
          <th>City</th>
          <th>Funding Stage</th>
          <th>Year Founded</th>
        </tr>
      </thead>
      <tbody>
        {startups.map((s, idx) => (
          <tr key={idx}>
            <td><button className="btn btn-link p-0" onClick={() => onSelect(s)}>{s['Startup Name']}</button></td>
            <td>{s['City']}</td>
            <td>{s['Funding Stage']}</td>
            <td>{s['Year Founded']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StartupList;
