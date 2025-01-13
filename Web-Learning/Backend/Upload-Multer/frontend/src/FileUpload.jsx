import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', file); // Ensure the field name matches 'image'
  
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // Timeout after 10 seconds
      });
      setMessage(res.data.message); // Success message
    } catch (error) {
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
        setMessage(error.response.data?.error || 'Error uploading file');
      } else if (error.request) {
        console.error('Error Request:', error.request);
        setMessage('No response received from the server');
      } else {
        console.error('Error Message:', error.message);
        setMessage('Error uploading file');
      }
    }
  };  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;