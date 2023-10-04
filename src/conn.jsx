import React, { useState } from 'react';

export default function conn() {
  const [documentImage, setDocumentImage] = useState(null);
  const [liveImage, setLiveImage] = useState(null);
  const [response, setResponse] = useState(null);

  // Function to handle the document image upload
  function handleDocumentImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        // Remove the data URI prefix cuz the json pattern doesnt match
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
        // Removeing the data URI prefix cuz the json pattern doesnt match
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
    <div>
      <h1>Face Validation</h1>
      <input type="file" accept="image/*" onChange={handleDocumentImageChange} />
      <input type="file" accept="image/*" onChange={handleLiveImageChange} />
      <button onClick={sendRequest}>Send Request</button>
      
      <h2>API Response:</h2>
      {response ? <div>{JSON.stringify(response, null, 2)}</div> : <div>No response yet</div>}
    </div>
  );
}