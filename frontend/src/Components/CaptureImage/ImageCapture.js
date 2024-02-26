// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// //import ObjectDetection from '../ObjectDetection/ObjectDetection';
// import ShowImage from '../Image/ShowImage';

// function ImageCapture() {
//     const webcamRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [showObjectDetection, setShowObjectDetection] = useState(false);

//     const capture = async () => {
//         setLoading(true);
//         const imageSrc = webcamRef.current.getScreenshot();
//         const blob = dataURItoBlob(imageSrc);

//         const formData = new FormData();
//         formData.append('image', blob, 'image.jpg');

//         try {
//             await axios.post('http://localhost:5000/api/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setLoading(false);
//             setShowObjectDetection(true);
//         } catch (error) {
//             console.error('Error capturing and uploading image:', error);
//             setLoading(false);
//         }
//     };

//     const dataURItoBlob = (dataURI) => {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     };

//     return (
//         <div>
//             <div className="capture-image-container">
//                 {showObjectDetection ? (
//                     <ShowImage  />
//                 ) : (
//                     <div className="capture-form">
//                         <h1 className="welcome-message">Welcome!</h1>
//                         <h2 className="header">Webcam Image Capture</h2>
//                         <h3 className="instruction">Put Your Tray Here</h3>
//                         <div className="webcam-container">
//                             <Webcam
//                                 audio={false}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/jpeg"
//                                 className="webcam"
//                             />
//                         </div>
//                         {loading ? (
//                             <p className="loading-text">Capturing image...</p>
//                         ) : (
//                             <button className="capture-button" onClick={capture}>Capture Image</button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ImageCapture;


// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import ObjectDetection from '../ObjectDetection/ObjectDetection';
// import ShowImage from '../Image/ShowImage';

// function ImageCapture() {
//     const webcamRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [imageUrl, setImageUrl] = useState(null); // State for storing image URL after uploading

//     const capture = async () => {
//         setLoading(true);
//         const imageSrc = webcamRef.current.getScreenshot();
//         const blob = dataURItoBlob(imageSrc);

//         const formData = new FormData();
//         formData.append('image', blob, 'image.jpg');

//         try {
//             const response = await axios.post('http://localhost:5000/api/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setLoading(false);
//             setImageUrl(response.data.imageUrl); // Set the image URL received from Cloudinary
            
//             console.log("imageUrl:", response.data.imageUrl); // Log the imageUrl
            
//         } catch (error) {
//             console.error('Error capturing and uploading image:', error);
//             setLoading(false);
//         }
//     };

//     const dataURItoBlob = (dataURI) => {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     };

//     return (
//         <div>
//             <div className="capture-image-container">
//                 {imageUrl ? ( // If imageUrl is available, show the captured image
//                     <ShowImage imageUrl={imageUrl} />
//                 ) : (
//                     <div className="capture-form">
//                         <h1 className="welcome-message">Welcome!</h1>
//                         <h2 className="header">Webcam Image Capture</h2>
//                         <h3 className="instruction">Put Your Tray Here</h3>
//                         <div className="webcam-container">
//                             <Webcam
//                                 audio={false}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/jpeg"
//                                 className="webcam"
//                             />
//                         </div>
//                         {loading ? (
//                             <p className="loading-text">Capturing image...</p>
//                         ) : (
//                             <button className="capture-button" onClick={capture}>Capture Image</button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ImageCapture;

// import './CaptureImage.css'; // Import the CSS file for styling
// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// //import ShowImage from '../ObjectDetection/ShowImage';
// import ObjectDetection from '../ObjectDetection/ObjectDetection';

// function ImageCapture() {
//   const webcamRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState(null);

//   const capture = async () => {
//     setLoading(true);
//     const imageSrc = webcamRef.current.getScreenshot();
//     const blob = dataURItoBlob(imageSrc);

//     const formData = new FormData();
//     formData.append('image', blob, 'image.jpg');

//     try {
//       const response = await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setLoading(false);
//       setImageUrl(response.data.url); // Set the image URL received from Cloudinary
//     } catch (error) {
//       console.error('Error capturing and uploading image:', error);
//       setLoading(false);
//     }
//   };

//   const dataURItoBlob = (dataURI) => {
//     const byteString = atob(dataURI.split(',')[1]);
//     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

//   return (
//     <div>
//       <div className="capture-image-container">
//         {imageUrl ? (
//           <ObjectDetection imageUrl={imageUrl} />
//         ) : (
//           <div className="capture-form">
//             <h1 className="welcome-message">Welcome!</h1>
//             <h2 className="header">Webcam Image Capture</h2>
//             <h3 className="instruction">Put Your Tray Here</h3>
//             <div className="webcam-container">
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 className="webcam"
//               />
//             </div>
//             {loading ? (
//               <p className="loading-text">Capturing image...</p>
//             ) : (
//               <button className="capture-button" onClick={capture}>Capture Image</button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageCapture;






import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ObjectDetection from '../ObjectDetection/ObjectDetection';
import './CaptureImage.css'; // Import the CSS file for styling

function ImageCapture() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const capture = async () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);

    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      setImageUrl(response.data.url); // Set the image URL received from Cloudinary
    } catch (error) {
      console.error('Error capturing and uploading image:', error);
      setLoading(false);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <div className="capture-image-container">
        {imageUrl ? (
          <ObjectDetection imageUrl={imageUrl} />
        ) : (
          <div className="capture-form">
            <h1 className="welcome-message">Welcome!</h1>
            <h2 className="header">Webcam Image Capture</h2>
            <h3 className="instruction">Put Your Tray Here</h3>
            <div className="webcam-container">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
              />
            </div>
            {loading ? (
              <div className="loading-container">
                <p className="loading-text">Capturing image...</p>
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              </div>
            ) : (
              <button className="capture-button" onClick={capture}>Capture Image</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCapture;