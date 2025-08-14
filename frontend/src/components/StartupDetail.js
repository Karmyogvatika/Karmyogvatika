import React from 'react';

function StartupDetail({ startup, onClose }) {
  if (!startup) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{startup['Startup Name']}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {startup['Logo URL'] && <img src={startup['Logo URL']} alt="logo" className="img-fluid mb-3" />}
            <ul className="list-unstyled">
              {Object.entries(startup).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}: </strong>
                  {key === 'Website' ? (
                    <a href={value} target="_blank" rel="noreferrer">{value}</a>
                  ) : (
                    value
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupDetail;
