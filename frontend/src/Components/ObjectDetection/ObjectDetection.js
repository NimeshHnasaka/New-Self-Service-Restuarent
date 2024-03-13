
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import TotalBill from '../TotalBill/TotalBill';
// import './ObjectDetection.css'

// const ObjectDetection = ({ capturedImage }) => {
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [objectQuantity, setObjectQuantity] = useState({});
    

//     useEffect(() => {
//         const detectObjects = async () => {
//             try {
//                 // Load the COCO-SSD model
//                 const model = await cocoSsd.load();

//                 // Create an image element from the captured image
//                 const imageElement = document.createElement('img');
//                 imageElement.src = capturedImage;

//                 // Make predictions on the image
//                 const predictions = await model.detect(imageElement);

//                 // Extract class names from predictions
//                 const detectedObjects = predictions.map(prediction => prediction.class);

//                 // Set detected objects
//                 setDetectedObjects(detectedObjects);

//                 // Count object quantity
//                 const objectQuantity = countObjectQuantity(detectedObjects);
//                 setObjectQuantity(objectQuantity);


//                 setLoading(false);

//                 // Show detected objects for a short duration before showing total bill
//                 setTimeout(() => {
//                     setShowTotalBill(true);
//                 }, 10000); // Adjust the duration (in milliseconds) as needed

//                 // Log detected objects to the console
//                 console.log('Detected objects:', detectedObjects);
//             } catch (error) {
//                 console.error('Error detecting objects:', error);
//                 setLoading(false);
//             }
//         };

//         // Call detectObjects when capturedImage changes
//         if (capturedImage) {
//             detectObjects();
//         }
//     }, [capturedImage]);

//     // Function to count the occurrences of each detected object
//     const countObjectQuantity = (detectedObjects) => {
//         const objectQuantity = {};
//         detectedObjects.forEach(object => {
//             objectQuantity[object] = (objectQuantity[object] || 0) + 1;
//         });
//         return objectQuantity;
//     };

  
   

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



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import './ObjectDetection.css';
// import TotalBill from '../TotalBill/TotalBill';

// const ObjectDetection = ({ capturedImage }) => {
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [objectQuantity, setObjectQuantity] = useState({});
//     const [model, setModel] = useState(null); // State to hold the loaded model
//     const [modelLoaded, setModelLoaded] = useState(false); // State to track if the model is loaded

//     useEffect(() => {
//         const loadModel = async () => {
//             try {
//                 setLoading(true); // Set loading to true when model loading starts

//                 // Load the GraphModel
//                 const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json'); // Replace 'path/to/food/model.json' with the actual path to your model

//                 setModel(loadedModel); // Set the loaded model in the state
//                 setModelLoaded(true); // Set modelLoaded to true when the model is loaded
//                 setLoading(false); // Set loading to false when model loading finishes
//             } catch (error) {
//                 console.error('Error loading model:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call loadModel when the component mounts
//         loadModel();
//     }, []);

//     useEffect(() => {
//         const detectObjects = async () => {
//             if (!model || !capturedImage) return; // If model or captured image is not ready, return

//             try {
//                 // Create a tensor from the captured image
//                 const imageTensor = tf.browser.fromPixels(capturedImage);

//                 // Expand the dimensions of the image tensor to match the model input shape
//                 const expandedImageTensor = imageTensor.expandDims(0);

//                 // Make predictions on the image tensor
//                 const predictions = await model.executeAsync(expandedImageTensor);

//                 // Process predictions as needed
//                 // Example: extract detected objects and their quantities

//                 // Update state with detected objects and quantities
//                 setDetectedObjects(/* Extracted detected objects */);
//                 setObjectQuantity(/* Extracted object quantities */);

//                 // Free up memory by disposing tensors
//                 imageTensor.dispose();
//                 expandedImageTensor.dispose();
//                 predictions.dispose();

//                 setLoading(false); // Set loading to false
//                 setShowTotalBill(true); // Show total bill after detection
//             } catch (error) {
//                 console.error('Error detecting objects:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call detectObjects when both model and capturedImage are ready
//         if (model && capturedImage) {
//             detectObjects();
//         }
//     }, [model, capturedImage]);

//     return (
//         <div className='capture-image-container'>
//             {/* Conditional rendering based on loading state */}
//             {loading ? (
//                 <div className="loading-container">
//                     <h1 className="loading-text">Loading Model...</h1>
//                     <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//                 </div>
//             ) : modelLoaded ? (
//                 <div>
//                     {/* Your JSX code to display detected objects, loading spinner, and total bill */}
//                 </div>
//             ) : (
//                 <div className="loading-container">
//                     <h1 className="loading-text">Failed to Load Model</h1>
//                 </div>
//             )}
//             {showTotalBill && (
//                 <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
//             )}
//         </div>
//     );
// };

// export default ObjectDetection;



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import './ObjectDetection.css';
// import TotalBill from '../TotalBill/TotalBill';

// const ObjectDetection = ({ capturedImage }) => {
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [objectQuantity, setObjectQuantity] = useState({});
//     const [model, setModel] = useState(null); // State to hold the loaded model
//     const [modelLoaded, setModelLoaded] = useState(false); // State to track if the model is loaded

//     useEffect(() => {
//         const loadModel = async () => {
//             try {
//                 setLoading(true); // Set loading to true when model loading starts

//                 // Load the GraphModel
//                 const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json'); // Replace 'path/to/food/model.json' with the actual path to your model

//                 setModel(loadedModel); // Set the loaded model in the state
//                 setModelLoaded(true); // Set modelLoaded to true when the model is loaded
//                 setLoading(false); // Set loading to false when model loading finishes
//             } catch (error) {
//                 console.error('Error loading model:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call loadModel when the component mounts
//         loadModel();
//     }, []);

//     useEffect(() => {
//         const detectObjects = async () => {
//             if (!model || !capturedImage) return; // If model or captured image is not ready, return

//             try {
//                 let imageTensor;

//                 if (typeof capturedImage === 'string') {
//                     // If capturedImage is a string (e.g., image URL), load the image
//                     const image = await loadImage(capturedImage);
//                     imageTensor = tf.browser.fromPixels(image);
//                 } else if (capturedImage instanceof HTMLCanvasElement || capturedImage instanceof HTMLImageElement || capturedImage instanceof HTMLVideoElement) {
//                     // If capturedImage is already an HTMLCanvasElement, HTMLImageElement, or HTMLVideoElement
//                     imageTensor = tf.browser.fromPixels(capturedImage);
//                 } else {
//                     throw new Error('Invalid captured image type.');
//                 }

//                 // Expand the dimensions of the image tensor to match the model input shape
//                 const expandedImageTensor = imageTensor.expandDims(0);

//                 // Make predictions on the image tensor
//                 const predictions = await model.executeAsync(expandedImageTensor);

//                 // Process predictions as needed
//                 // Example: extract detected objects and their quantities

//                 // Update state with detected objects and quantities
//                 setDetectedObjects(/* Extracted detected objects */);
//                 setObjectQuantity(/* Extracted object quantities */);

//                 // Free up memory by disposing tensors
//                 imageTensor.dispose();
//                 expandedImageTensor.dispose();
//                 predictions.dispose();

//                 setLoading(false); // Set loading to false
//                 setShowTotalBill(true); // Show total bill after detection
//             } catch (error) {
//                 console.error('Error detecting objects:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call detectObjects when both model and capturedImage are ready
//         if (model && capturedImage) {
//             detectObjects();
//         }
//     }, [model, capturedImage]);

//     const loadImage = async (url) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.onload = () => resolve(img);
//             img.onerror = (error) => reject(error);
//             img.src = url;
//         });
//     };

//     return (
//         <div className='capture-image-container'>
//             {/* Conditional rendering based on loading state */}
//             {loading ? (
//                 <div className="loading-container">
//                     <h1 className="loading-text">Loading Model...</h1>
//                     <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//                 </div>
//             ) : modelLoaded ? (
//                 <div>
//                     {/* Your JSX code to display detected objects, loading spinner, and total bill */}
//                 </div>
//             ) : (
//                 <div className="loading-container">
//                     <h1 className="loading-text">Failed to Load Model</h1>
//                 </div>
//             )}
//             {showTotalBill && (
//                 <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
//             )}
//         </div>
//     );
// };

// export default ObjectDetection;


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './ObjectDetection.css';
import TotalBill from '../TotalBill/TotalBill';

const ObjectDetection = ({ capturedImage }) => {
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTotalBill, setShowTotalBill] = useState(false);
    const [objectQuantity, setObjectQuantity] = useState({});
    const [model, setModel] = useState(null); // State to hold the loaded model
    const [modelLoaded, setModelLoaded] = useState(false); // State to track if the model is loaded

    useEffect(() => {
        const loadModel = async () => {
            try {
                setLoading(true); // Set loading to true when model loading starts

                // Load the GraphModel
                const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json'); // Replace 'path/to/food/model.json' with the actual path to your model

                setModel(loadedModel); // Set the loaded model in the state
                setModelLoaded(true); // Set modelLoaded to true when the model is loaded
                setLoading(false); // Set loading to false when model loading finishes
            } catch (error) {
                console.error('Error loading model:', error);
                setLoading(false); // Set loading to false on error
            }
        };

        // Call loadModel when the component mounts
        loadModel();
    }, []);

    useEffect(() => {
        const detectObjects = async () => {
            if (!model || !capturedImage) return; // If model or captured image is not ready, return

            try {
                let imageTensor;

                if (typeof capturedImage === 'string') {
                    // If capturedImage is a string (e.g., image URL), load the image
                    const image = await loadImage(capturedImage);
                    imageTensor = tf.browser.fromPixels(image);
                } else if (capturedImage instanceof HTMLCanvasElement || capturedImage instanceof HTMLImageElement || capturedImage instanceof HTMLVideoElement) {
                    // If capturedImage is already an HTMLCanvasElement, HTMLImageElement, or HTMLVideoElement
                    imageTensor = tf.browser.fromPixels(capturedImage);
                } else {
                    throw new Error('Invalid captured image type.');
                }

                // Resize the input image to match the model's expected input shape
                const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [64, 64]);

                // Expand the dimensions of the resized image tensor to match the model input shape
                const expandedImageTensor = resizedImageTensor.expandDims(0);

                // Make predictions on the expanded image tensor
                const predictions = await model.executeAsync(expandedImageTensor);

                // Process predictions as needed
                // Example: extract detected objects and their quantities

                // Update state with detected objects and quantities
                setDetectedObjects(/* Extracted detected objects */);
                setObjectQuantity(/* Extracted object quantities */);

                // Free up memory by disposing tensors
                imageTensor.dispose();
                resizedImageTensor.dispose();
                expandedImageTensor.dispose();
                predictions.dispose();

                setLoading(false); // Set loading to false
                setShowTotalBill(true); // Show total bill after detection
            } catch (error) {
                console.error('Error detecting objects:', error);
                setLoading(false); // Set loading to false on error
            }
        };

        // Call detectObjects when both model and capturedImage are ready
        if (model && capturedImage) {
            detectObjects();
        }
    }, [model, capturedImage]);

    const loadImage = async (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    };

    return (
        <div className='capture-image-container'>
            {/* Conditional rendering based on loading state */}
            {loading ? (
                <div className="loading-container">
                    <h1 className="loading-text">Loading Model...</h1>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            ) : modelLoaded ? (
                <div>
                    {/* Your JSX code to display detected objects, loading spinner, and total bill */}
                </div>
            ) : (
                <div className="loading-container">
                    <h1 className="loading-text">Failed to Load Model</h1>
                </div>
            )}
            {showTotalBill && (
                <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
            )}
        </div>
    );
};

export default ObjectDetection;