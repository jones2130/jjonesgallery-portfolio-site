import React, { useState, useEffect } from 'react';
import './AdminMigrate.css';

export default function AdminMigrate() {
  const [targetPath, setTargetPath] = useState('');
  const [pendingImages, setPendingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/pending');
      const data = await res.json();
      setPendingImages(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pending images. Is the Python server running?');
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!targetPath) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetPath })
      });
      if (!res.ok) throw new Error('Scan failed');
      await fetchPending();
      setTargetPath('');
    } catch (err) {
      console.error(err);
      setError('Failed to scan target path. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (item) => {
    try {
      const res = await fetch('http://localhost:8000/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!res.ok) throw new Error('Approve failed');
      setPendingImages(prev => prev.filter(i => i.id !== item.id));
    } catch (err) {
      console.error(err);
      setError('Failed to approve image.');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/reject/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Reject failed');
      setPendingImages(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to reject image.');
    }
  };

  const handleChange = (id, field, value) => {
    setPendingImages(prev => prev.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  return (
    <div className="admin-migrate">
      <div className="admin-header">
        <h1>Art Migration Dashboard</h1>
        <p>Scan a folder or file to ingest new artwork via Ollama LLM.</p>
      </div>
      
      {error && <div className="admin-error">{error}</div>}

      <form className="scan-form" onSubmit={handleScan}>
        <input 
          type="text" 
          value={targetPath}
          onChange={(e) => setTargetPath(e.target.value)}
          placeholder="Enter full path to directory or image..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Scanning...' : 'Scan Path'}
        </button>
      </form>

      <div className="pending-grid">
        {pendingImages.length === 0 && !loading && (
          <div className="empty-state">No pending images found. Scan a path to begin!</div>
        )}
        
        {pendingImages.map(item => (
          <div key={item.id} className="pending-card">
            <div className="pending-image-col">
              <img src={item.imageUrl} alt="Pending Artwork" />
              <div className="pending-path">{item.originalPath}</div>
            </div>
            <div className="pending-form-col">
              <label>Title</label>
              <input 
                type="text" 
                value={item.title} 
                onChange={(e) => handleChange(item.id, 'title', e.target.value)} 
              />
              
              <label>Medium</label>
              <input 
                type="text" 
                value={item.medium} 
                onChange={(e) => handleChange(item.id, 'medium', e.target.value)} 
              />
              
              <label>Tags (comma separated)</label>
              <input 
                type="text" 
                value={item.tags} 
                onChange={(e) => handleChange(item.id, 'tags', e.target.value)} 
              />

              <div className="pending-dimensions">
                <div>
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={item.date || ''} 
                    onChange={(e) => handleChange(item.id, 'date', e.target.value)} 
                  />
                </div>
                <div>
                  <label>Width (in)</label>
                  <input 
                    type="text" 
                    value={item.width || ''} 
                    onChange={(e) => handleChange(item.id, 'width', e.target.value)} 
                  />
                </div>
                <div>
                  <label>Height (in)</label>
                  <input 
                    type="text" 
                    value={item.height || ''} 
                    onChange={(e) => handleChange(item.id, 'height', e.target.value)} 
                  />
                </div>
              </div>
              
              <label>Description</label>
              <textarea 
                rows="5" 
                value={item.description}
                onChange={(e) => handleChange(item.id, 'description', e.target.value)}
              ></textarea>
              
              <div className="pending-actions">
                <button className="btn-approve" onClick={() => handleApprove(item)}>Approve & Publish</button>
                <button className="btn-reject" onClick={() => handleReject(item.id)}>Discard</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
