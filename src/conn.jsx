import React, { useState } from 'react';
import './consty.css'; 

export default function Conn() {
  const [documentImage, setDocumentImage] = useState(null);
  const [liveImage, setLiveImage] = useState(null);
  const [response, setResponse] = useState(null);

  // Function to handle the document image upload
  function handleDocumentImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        // Remove the data URI prefix cuz the JSON pattern doesn't match
        const base64Data = reader.result.replace(/^data:image\/(jpeg|jpg);base64,/, '');
        setDocumentImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to handle the live image upload
  function handleLiveImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        // Remove the data URI prefix cuz the JSON pattern doesn't match
        const base64Data = reader.result.replace(/^data:image\/(jpeg|jpg);base64,/, '');
        setLiveImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to send the POST request to the API
  async function sendRequest() {
    try {
      if (!documentImage || !liveImage) {
        setResponse('Please upload both document and live images.');
        return;
      }

      const requestData = {
        document: documentImage,
        liveImage: liveImage,
      };

      const response = await fetch('Enter your API URL here', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponse(responseData);
        console.log("no errors")
      } else {
        setResponse('Error: Unable to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Unable to fetch data');
    }
  }

  return (
    <div className="container">
    <h1 className="header">Face Validation</h1>
    <label className="file-input1-label">
      Choose Document Image
      <input
        type="file"
        className="file-input1"
        accept="image/*"
        onChange={handleDocumentImageChange}
      />
    </label>
    <label className="file-input2-label">
      Choose Live Image
      <input
        type="file"
        className="file-input2"
        accept="image/*"
        onChange={handleLiveImageChange}
      />
    </label>
    <button className="send-button" onClick={sendRequest}>Send Request</button>
    
    <h2 className="api-response-header">API Response:</h2>
    {response ? <div className="response-box">{JSON.stringify(response, null, 2)}</div> : <div className="no-response">No response yet</div>}
  </div>
  
  );
}
