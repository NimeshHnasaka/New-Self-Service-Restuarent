import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function UploadImage() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const uploadToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageSrc);

      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded to server:', response.data);
    } catch (error) {
      console.error('Error uploading image to server:', error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={captureImage}>Capture Image</button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" />
          <button onClick={uploadToServer}>Upload to Server</button>
        </div>
      )}
    </div>
  );
}

export default UploadImage;