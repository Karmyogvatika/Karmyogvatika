import React, { useState } from 'react';

function Upload({ onDataLoaded }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    const res = await fetch('http://localhost:5000/startups');
    const data = await res.json();
    onDataLoaded(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
        <button className="btn btn-primary" type="submit">Upload</button>
      </div>
    </form>
  );
}

export default Upload;
