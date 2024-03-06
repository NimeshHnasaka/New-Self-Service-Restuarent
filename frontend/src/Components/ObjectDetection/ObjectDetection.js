
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// //import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import TotalBill from '../TotalBill/TotalBill';
// import './ObjectDetection.css'

// const ObjectDetection = ({ capturedImage }) => {
//     // const [detectedObjects, setDetectedObjects] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     // const [showTotalBill, setShowTotalBill] = useState(false);
//     // const [objectQuantity, setObjectQuantity] = useState({});
    

//     // useEffect(() => {
//     //     const detectObjects = async () => {
//     //         try {
//     //             // Load the COCO-SSD model
//     //             const model = await cocoSsd.load();

//     //             // Create an image element from the captured image
//     //             const imageElement = document.createElement('img');
//     //             imageElement.src = capturedImage;

//     //             // Make predictions on the image
//     //             const predictions = await model.detect(imageElement);

//     //             // Extract class names from predictions
//     //             const detectedObjects = predictions.map(prediction => prediction.class);

//     //             // Set detected objects
//     //             setDetectedObjects(detectedObjects);

//     //             // Count object quantity
//     //             const objectQuantity = countObjectQuantity(detectedObjects);
//     //             setObjectQuantity(objectQuantity);


//     //             setLoading(false);

//     //             // Show detected objects for a short duration before showing total bill
//     //             setTimeout(() => {
//     //                 setShowTotalBill(true);
//     //             }, 10000); // Adjust the duration (in milliseconds) as needed

//     //             // Log detected objects to the console
//     //             console.log('Detected objects:', detectedObjects);
//     //         } catch (error) {
//     //             console.error('Error detecting objects:', error);
//     //             setLoading(false);
//     //         }
//     //     };

//     //     // Call detectObjects when capturedImage changes
//     //     if (capturedImage) {
//     //         detectObjects();
//     //     }
//     // }, [capturedImage]);

//     // // Function to count the occurrences of each detected object
//     // const countObjectQuantity = (detectedObjects) => {
//     //     const objectQuantity = {};
//     //     detectedObjects.forEach(object => {
//     //         objectQuantity[object] = (objectQuantity[object] || 0) + 1;
//     //     });
//     //     return objectQuantity;
//     // };



//     const [model, setModel] = useState(null);



//     useEffect(() => {
//       const loadModel = async () => {
//           try {
//               setLoading(true);

//               // Load the pre-trained model
//               const loadedModel = await tf.loadLayersModel('https://github.com/NimeshHnasaka/New-Self-Service-Restuarent/blob/Test3/frontend/src/tfjs.model/model.json');

//               // Set the loaded model to state
//               setModel(loadedModel);

//               setLoading(false);
//           } catch (error) {
//               console.error('Error loading model:', error);
//               setLoading(false);
//           }
//       };

//       // Call loadModel when component mounts
//       loadModel();
//   }, []);




//     return (
//         <div className='capture-image-container'>
//         {showTotalBill ? (
//           <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
//         ) : (
//           <div className="capture-form">
//             {loading ? (
//               <div className="loading-container">
               
              
//                 <h1 className="loading-text"> Detecting Food Items</h1>
//                 <h1 className="loading-text"> Loading...</h1>
//                 <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//               </div>
//             ) : (
//               <>
//                 {capturedImage && (
//                   <div className="webcam-container">
//                     <h2 className="header">Your Food Tray</h2>
                   
//                     <img src={capturedImage} alt="Captured" className="webcam" />
//                   </div>
//                 )}
//                 <h2 className="header">Detected Food Items</h2>
//                 <ul className="object-list">
//                   {Object.entries(objectQuantity).map(([object, quantity]) => (
//                     <li key={object} className="object-list-item">
//                       {object} - Quantity: {quantity}
//                     </li>
//                   ))}
//                 </ul>
//             <h1>Calculating Total Bill</h1>
//                 <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     );
// };

// export default ObjectDetection;

// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import * as tf from '@tensorflow/tfjs';
// import TotalBill from '../TotalBill/TotalBill';
// import './ObjectDetection.css';

// const ObjectDetection = ({ capturedImage }) => {
//     const [loading, setLoading] = useState(true);
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [objectQuantity, setObjectQuantity] = useState({});
//     const [model, setModel] = useState(null);

//     useEffect(() => {
//         const loadModel = async () => {
//             try {
//                 setLoading(true);
//                 // Fetch the model JSON file
//                 const response = await fetch('https://github.com/NimeshHnasaka/New-Self-Service-Restuarent/blob/ff3dc8a9b7de7aaa5672912810f0f30cf6b80a27/frontend/src/tfjs.model/model.json');
//                 const modelJson = await response.json();
//                 // Load the pre-trained model
//                 const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([modelJson]));
//                 // Set the loaded model to state
//                 setModel(loadedModel);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error loading model:', error);
//                 setLoading(false);
//             }
//         };

//         // Call loadModel when component mounts
//         loadModel();
//     }, []);

//     useEffect(() => {
//         if (model && capturedImage) {
//             detectObjects(model, capturedImage);
//         }
//     }, [model, capturedImage]);

//     const detectObjects = async (model, image) => {
//         try {
//             // Perform object detection using the loaded model
//             // This part should be replaced with your actual object detection logic
//             // Here's just a placeholder to simulate object detection
//             setLoading(true);
//             // Simulating object detection
//             // You need to replace this with your actual object detection code
//             // For example, if you have a TensorFlow.js model, you can call model.predict(imageData)
//             // and process the predictions accordingly
//             // This is just for demonstration purposes
//             setTimeout(() => {
//                 const detectedObjects = ['Object 1', 'Object 2', 'Object 3'];
//                 const objectQuantity = countObjectQuantity(detectedObjects);
//                 setDetectedObjects(detectedObjects);
//                 setObjectQuantity(objectQuantity);
//                 setLoading(false);
//                 setShowTotalBill(true);
//             }, 2000);
//         } catch (error) {
//             console.error('Error detecting objects:', error);
//             setLoading(false);
//         }
//     };

//     const countObjectQuantity = (detectedObjects) => {
//         const objectQuantity = {};
//         detectedObjects.forEach(object => {
//             objectQuantity[object] = (objectQuantity[object] || 0) + 1;
//         });
//         return objectQuantity;
//     };

//     return (
//         <div className='capture-image-container'>
//             {showTotalBill ? (
//                 <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
//             ) : (
//                 <div className="capture-form">
//                     {loading ? (
//                         <div className="loading-container">
//                             <h1 className="loading-text">Detecting Food Items</h1>
//                             <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//                         </div>
//                     ) : (
//                         <>
//                             {capturedImage && (
//                                 <div className="webcam-container">
//                                     <h2 className="header">Your Food Tray</h2>
//                                     <img src={capturedImage} alt="Captured" className="webcam" />
//                                 </div>
//                             )}
//                             <h2 className="header">Detected Food Items</h2>
//                             <ul className="object-list">
//                                 {Object.entries(objectQuantity).map(([object, quantity]) => (
//                                     <li key={object} className="object-list-item">
//                                         {object} - Quantity: {quantity}
//                                     </li>
//                                 ))}
//                             </ul>
//                             <h1>Calculating Total Bill</h1>
//                             <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ObjectDetection;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as tf from '@tensorflow/tfjs';
import TotalBill from '../TotalBill/TotalBill';
import './ObjectDetection.css';

const ObjectDetection = ({ capturedImage }) => {
    const [loading, setLoading] = useState(true);
    const [showTotalBill, setShowTotalBill] = useState(false);
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [objectQuantity, setObjectQuantity] = useState({});
    const [model, setModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                setLoading(true);
                // Fetch the model JSON file from the proxy server
                const response = await fetch('http://localhost:5000/model.json');
                const modelJson = await response.json();
                // Load the pre-trained model
                const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([modelJson]));
                // Set the loaded model to state
                setModel(loadedModel);
                setLoading(false);
            } catch (error) {
                console.error('Error loading model:', error);
                setLoading(false);
            }
        };

        // Call loadModel when component mounts
        loadModel();
    }, []);

    useEffect(() => {
        if (model && capturedImage) {
            detectObjects(model, capturedImage);
        }
    }, [model, capturedImage]);

    const detectObjects = async (model, image) => {
        try {
            // Perform object detection using the loaded model
            // This part should be replaced with your actual object detection logic
            setLoading(true);
            // Simulating object detection
            setTimeout(() => {
                const detectedObjects = ['Object 1', 'Object 2', 'Object 3'];
                const objectQuantity = countObjectQuantity(detectedObjects);
                setDetectedObjects(detectedObjects);
                setObjectQuantity(objectQuantity);
                setLoading(false);
                setShowTotalBill(true);
            }, 2000);
        } catch (error) {
            console.error('Error detecting objects:', error);
            setLoading(false);
        }
    };

    const countObjectQuantity = (detectedObjects) => {
        const objectQuantity = {};
        detectedObjects.forEach(object => {
            objectQuantity[object] = (objectQuantity[object] || 0) + 1;
        });
        return objectQuantity;
    };

    return (
        <div className='capture-image-container'>
            {showTotalBill ? (
                <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
            ) : (
                <div className="capture-form">
                    {loading ? (
                        <div className="loading-container">
                            <h1 className="loading-text">Detecting Food Items</h1>
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                        </div>
                    ) : (
                        <>
                            {capturedImage && (
                                <div className="webcam-container">
                                    <h2 className="header">Your Food Tray</h2>
                                    <img src={capturedImage} alt="Captured" className="webcam" />
                                </div>
                            )}
                            <h2 className="header">Detected Food Items</h2>
                            <ul className="object-list">
                                {Object.entries(objectQuantity).map(([object, quantity]) => (
                                    <li key={object} className="object-list-item">
                                        {object} - Quantity: {quantity}
                                    </li>
                                ))}
                            </ul>
                            <h1>Calculating Total Bill</h1>
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ObjectDetection;