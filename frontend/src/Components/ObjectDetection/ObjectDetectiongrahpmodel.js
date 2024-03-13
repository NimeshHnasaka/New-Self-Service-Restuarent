// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import './ObjectDetection.css';

// const ObjectDetectionGrahpmodel = ({ capturedImage }) => {
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [loading, setLoading] = useState(true); // State to track model loading
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [objectQuantity, setObjectQuantity] = useState({});

//     useEffect(() => {
//         const detectObjects = async () => {
//             try {
//                 setLoading(true); // Set loading to true when model loading starts

//                 // Load the graph model from GitHub
//                 const model = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');

//                 // Preprocess captured image if needed
//                 // Example: convert the image to a tensor

//                 // Make predictions on the image
//                 const predictions = await model.predict(/* preprocessed image tensor */);

//                 // Process predictions as needed
//                 // Example: extract detected objects and their quantities

//                 // Update state with detected objects and quantities
//                 setDetectedObjects(/* Extracted detected objects */);
//                 setObjectQuantity(/* Extracted object quantities */);
//                 setLoading(false); // Set loading to false when model loading finishes
//                 setShowTotalBill(true); // Show total bill after detection
//             } catch (error) {
//                 console.error('Error loading or detecting objects:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call detectObjects when capturedImage changes
//         if (capturedImage) {
//             detectObjects();
//         }
//     }, [capturedImage]);

//     return (
//         <div className='capture-image-container'>
//             {/* Conditional rendering based on loading state */}
//             {loading ? (
//                 <div>Loading model...</div>
//             ) : (
//                 <div>
//                     {/* Your JSX code to display detected objects, loading spinner, and total bill */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ObjectDetectionGrahpmodel;


// import React, { useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import './ObjectDetection.css';

// const ObjectDetectionGrahpmodel = ({ capturedImage }) => {
//     const [detectedObjects, setDetectedObjects] = useState([]);
//     const [loading, setLoading] = useState(true); // State to track model loading
//     const [showTotalBill, setShowTotalBill] = useState(false);
//     const [objectQuantity, setObjectQuantity] = useState({});
//     const [modelLoaded, setModelLoaded] = useState(false); // State to track if the model is loaded

//     useEffect(() => {
//         const detectObjects = async () => {
//             try {
//                 setLoading(true); // Set loading to true when model loading starts

//                 // Load the graph model from GitHub
//                 const model = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');
//                 setModelLoaded(true); // Set modelLoaded to true when model is loaded

//                 // Preprocess captured image if needed
//                 // Example: convert the image to a tensor

//                 // Make predictions on the image
//                 const predictions = await model.predict(/* preprocessed image tensor */);

//                 // Process predictions as needed
//                 // Example: extract detected objects and their quantities

//                 // Update state with detected objects and quantities
//                 setDetectedObjects(/* Extracted detected objects */);
//                 setObjectQuantity(/* Extracted object quantities */);
//                 setLoading(false); // Set loading to false when model loading finishes
//                 setShowTotalBill(true); // Show total bill after detection
//             } catch (error) {
//                 console.error('Error loading or detecting objects:', error);
//                 setLoading(false); // Set loading to false on error
//             }
//         };

//         // Call detectObjects when capturedImage changes
//         if (capturedImage) {
//             detectObjects();
//         }
//     }, [capturedImage]);

//     return (
//         <div className='capture-image-container'>
//             {/* Conditional rendering based on loading state */}
//             {loading ? (
//                 <div>Loading model...</div>
//             ) : (
//                 <div>
//                     {/* Check if model is loaded and render message */}
//                     {modelLoaded && <div>Model loaded successfully!</div>}
//                     {/* Your JSX code to display detected objects, loading spinner, and total bill */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ObjectDetectionGrahpmodel;


import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './ObjectDetection.css';

const ObjectDetectionGrahpmodel = ({ capturedImage }) => {
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [loading, setLoading] = useState(true); // State to track model loading
    const [showTotalBill, setShowTotalBill] = useState(false);
    const [objectQuantity, setObjectQuantity] = useState({});
    const [model, setModel] = useState(null); // State to hold the loaded model

    useEffect(() => {
        const loadModel = async () => {
            try {
                setLoading(true); // Set loading to true when model loading starts

                // Load the graph model from GitHub
                const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');
                setModel(loadedModel); // Set the loaded model in the state
                console.log('Model Loaded');

                setLoading(false); // Set loading to false when model loading finishes
            } catch (error) {
                console.error('Error loading model:', error);
                setLoading(false); // Set loading to false on error

              


            }
        };

        // Load the model when the component mounts
        loadModel();
    }, []);

    useEffect(() => {
        const detectObjects = async () => {
            if (!model || !capturedImage) return; // If model or captured image is not ready, return

            try {
                // Preprocess captured image if needed
                // Example: convert the image to a tensor

                // Make predictions on the image
                const predictions = await model.predict(/* preprocessed image tensor */);

                // Process predictions as needed
                // Example: extract detected objects and their quantities

                // Update state with detected objects and quantities
                setDetectedObjects(/* Extracted detected objects */);
                setObjectQuantity(/* Extracted object quantities */);
                setShowTotalBill(true); // Show total bill after detection
            } catch (error) {
                console.error('Error detecting objects:', error);
            }
        };

        // Call detectObjects when capturedImage changes
        detectObjects();
    }, [model, capturedImage]);

    return (
        <div className='capture-image-container'>
            {/* Conditional rendering based on loading state */}
            {loading ? (
                <div>Loading model...</div>
            ) : (
                <div>
                    {/* Your JSX code to display detected objects, loading spinner, and total bill */}
                </div>
            )}
        </div>
    );
};

export default ObjectDetectionGrahpmodel;