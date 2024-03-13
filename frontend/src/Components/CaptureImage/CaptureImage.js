
// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);

//   // Load Graph Model
//   const loadModel = async () => {
//     try {
//       const model = await tf.loadGraphModel("https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json");
//       setModel(model);
//     } catch (error) {
//       console.error("Failed to load model:", error);
//     }
//   };

//   useEffect(() => {
//     loadModel();
//   }, []);

//   const detect = async () => {
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4 &&
//       model !== null
//     ) {
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // Resize video to match model input shape
//       const resizedVideo = tf.image.resizeBilinear(tf.browser.fromPixels(video), [64, 64]);
//       const casted = resizedVideo.cast('float32')
//       const expanded = casted.expandDims(0)

//         try{
            
//      const predictions = await model.executeAsync(expanded)
//      console.log(predictions)
//         } catch(err){
//             console.log(err)
//         }
//     //   drawBoxes(predictions);












//     }
//   };

//   const drawBoxes = (predictions) => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     // Process predictions and draw bounding boxes
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       detect();
//     }, 10);
//     return () => clearInterval(interval);
//   }, [model]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;



// Import dependencies
// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import { nextFrame } from "@tensorflow/tfjs";



// import { drawRect } from "./utililies.js";

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Main function
//   const runCoco = async () => {
//     // Load network
//     const net = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');
    
//     // Loop and detect hands
//     setInterval(() => {
//       detect(net);
//     }, 16.7);
//   };

//   const detect = async (net) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // Make Detections
//       const img = tf.browser.fromPixels(video);
//       const resized = tf.image.resizeBilinear(img, [64,64]);
//       const casted = resized.cast('float32');
//       const expanded = casted.expandDims(0);
//       const obj = await net.executeAsync(expanded);
//       console.log(obj);

//       const boxes = await obj[1].array();
//       const classes = await obj[2].array();
//       const scores = await obj[4].array();
      
//       // Draw objects
//       const ctx = canvasRef.current.getContext("2d");
//       requestAnimationFrame(() => {
//         drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx);
//       });

//       // Dispose tensors
//       tf.dispose(img);
//       tf.dispose(resized);
//       tf.dispose(casted);
//       tf.dispose(expanded);
//       tf.dispose(obj);
//     }
//   };

//   useEffect(() => {
//     runCoco();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true} 
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import { drawRect } from "./utililies.js";

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Main function
//   const runCoco = async () => {
//     try {
//       // Load network
//       const net = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');

//       // Loop and detect hands
//       setInterval(() => {
//         detect(net);
//       }, 16.7);
//     } catch (error) {
//       console.error("Error loading TensorFlow model:", error);
//     }
//   };

//   const detect = async (net) => {
//     // Check if webcamRef is available
//     if (!webcamRef.current || !webcamRef.current.video || webcamRef.current.video.readyState !== 4) {
//       return; // Exit early if video not available
//     }

//     const video = webcamRef.current.video;
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;

//     // Set video width
//     video.width = videoWidth;
//     video.height = videoHeight;

//     // Set canvas height and width
//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;

//     // Make Detections
//     const img = tf.browser.fromPixels(video);
//     const resized = tf.image.resizeBilinear(img, [64, 64]);
//     const casted = resized.cast('float32');
//     const expanded = casted.expandDims(0);

//     try {
//       const obj = await net.executeAsync(expanded);

//       // Check if obj contains expected properties
//       if (obj && obj.length >= 5) {
//         const boxes = await obj[1].array();
//         const classes = await obj[2].array();
//         const scores = await obj[4].array();

//         // Draw objects
//         const ctx = canvasRef.current.getContext("2d");
//         requestAnimationFrame(() => {
//           drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx);
//         });
//       } else {
//         console.error("Unexpected output from TensorFlow model:", obj);
//       }
//     } catch (error) {
//       console.error("Error executing TensorFlow model:", error);
//     } finally {
//       // Dispose tensors
//       tf.dispose(img);
//       tf.dispose(resized);
//       tf.dispose(casted);
//       tf.dispose(expanded);
//     }
//   };

//   useEffect(() => {
//     runCoco();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useRef, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import { drawRect } from "./utililies.js";

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Main function
//   const runCoco = async () => {
//     try {
//       // Load network
//       const net = await tf.loadGraphModel('https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json');

//       // Loop and detect hands
    
    
    
//       setInterval(() => {
//         detect(net);
//       }, 16.7);
//     } catch (error) {
//       console.error("Error loading TensorFlow model:", error);
//     }
//   };

//   const detect = async (net) => {
//     try {
//       // Check if webcamRef is available
//       if (!webcamRef.current || !webcamRef.current.video || webcamRef.current.video.readyState !== 4) {
//         return; // Exit early if video not available
//       }

//       const video = webcamRef.current.video;
//       const videoWidth = video.videoWidth;
//       const videoHeight = video.videoHeight;

//       // Set video width
//       video.width = videoWidth;
//       video.height = videoHeight;

//       // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // Make Detections
//       const img = tf.browser.fromPixels(video);
//       const resized = tf.image.resizeBilinear(img, [64, 64]);
//       const casted = resized.cast('float32');
//       const expanded = casted.expandDims(0);









//       const obj = await net.executeAsync(expanded);

//       // Check if obj contains expected properties
//       if (obj && obj.length >= 5) {
//         const boxes = await obj[1].array();
//         const classes = await obj[2].array();
//         const scores = await obj[4].array();

//         // Draw objects
//         const ctx = canvasRef.current.getContext("2d");
//         requestAnimationFrame(() => {
//           drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx);
//         });
//       } else {
//         console.error("Unexpected output from TensorFlow model:", obj);


//       }

//       // Dispose tensors
//       tf.dispose(img);
//       tf.dispose(resized);
//       tf.dispose(casted);
//       tf.dispose(expanded);
//       tf.dispose(obj);
//     } catch (error) {
//       console.error("Error detecting objects:", error);
//     }
//   };

//   useEffect(() => {
//     runCoco();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";

// // Define our labelmap
// const labelMap = {
//     1: { name: 'Egg', color: 'red' },
//     2: { name: 'Meat', color: 'yellow' },
// };

// // Define a drawing function
// const drawRect = (predictions, imgWidth, imgHeight, ctx) => {
//     if (!predictions) {
//         console.error("Predictions are undefined or null.");
//         return;
//     }

//     for (let i = 0; i < predictions.length; i++) {
//         const prediction = predictions[i];
//         if (prediction && prediction.length > 0) {
//             const [y, x, height, width] = prediction;

//             // Set styling
//             ctx.strokeStyle = labelMap[prediction[0]]['color']; // Accessing the class label from prediction
//             ctx.lineWidth = 2;
//             ctx.fillStyle = 'white';
//             ctx.font = '20px Arial';

//             // DRAW!!
//             ctx.beginPath();
//             ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth, height * imgHeight);
//             ctx.stroke();
//             ctx.fillText(labelMap[prediction[0]]['name'] + ' - ' + Math.round(prediction[1] * 100) / 100, x * imgWidth, y * imgHeight - 5); // Using prediction[1] for the score
//         }
//     }
// };

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);

//   // Load Graph Model
//   const loadModel = async () => {
//     try {
//       const loadedModel = await tf.loadGraphModel("https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json");
//       setModel(loadedModel);
//     } catch (error) {
//       console.error("Failed to load model:", error);
//     }
//   };

//   useEffect(() => {
//     loadModel();
//   }, []);

//   const detect = async () => {
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4 &&
//       model !== null
//     ) {
//       const video = webcamRef.current.video;
//       const videoWidth = video.videoWidth;
//       const videoHeight = video.videoHeight;

//       video.width = videoWidth;
//       video.height = videoHeight;

//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // Resize video to match model input shape
//       const resizedVideo = tf.image.resizeBilinear(tf.browser.fromPixels(video), [64, 64]);
//       const casted = resizedVideo.cast('float32');
//       const expanded = casted.expandDims(0);

//       try {
//         const predictions = await model.executeAsync(expanded);
//         drawRect(predictions.arraySync()[0], videoWidth, videoHeight, canvasRef.current.getContext("2d"));
//       } catch (err) {
//         console.error("Error predicting:", err);
//       } finally {
//         tf.dispose([resizedVideo, casted, expanded]);
//       }
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       detect();
//     }, 10);
//     return () => clearInterval(interval);
//   }, [model]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

const labelMap = {
    1: { name: 'Egg', color: 'red' },
    2: { name: 'Meat', color: 'yellow' },
};

const drawRect = (predictions, imgWidth, imgHeight, ctx) => {
    if (!predictions) {
        console.error("Predictions are undefined or null.");
        return;
    }

    for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        if (prediction && prediction.length > 0) {
            const [y, x, height, width] = prediction;

            ctx.strokeStyle = labelMap[prediction[0]]['color'];
            ctx.lineWidth = 2;
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';

            ctx.beginPath();
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth, height * imgHeight);
            ctx.stroke();
            ctx.fillText(labelMap[prediction[0]]['name'] + ' - ' + Math.round(prediction[1] * 100) / 100, x * imgWidth, y * imgHeight - 5);
        }
    }
};

function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);

    const loadModel = async () => {
        try {
            const loadedModel = await tf.loadGraphModel("https://raw.githubusercontent.com/NimeshHnasaka/FoodDetectionGraphModel/main/model.json");
            setModel(loadedModel);
        } catch (error) {
            console.error("Failed to load model:", error);
        }
    };

    useEffect(() => {
        loadModel();
    }, []);

    const detect = async () => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4 &&
            model !== null
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            console.log("Video dimensions:", videoWidth, videoHeight); // Log video dimensions

            video.width = videoWidth;
            video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const resizedVideo = tf.image.resizeBilinear(tf.browser.fromPixels(video), [64, 64]);
            const casted = resizedVideo.cast('float32');
            const expanded = casted.expandDims(0);

            try {
                //const predictions = await model.executeAsync(expanded);
                const predictions = await model.execute(expanded);
                //console.log("Predictions:", predictions.arraySync()); // Log predictions
                drawRect(predictions.arraySync()[0], videoWidth, videoHeight, canvasRef.current.getContext("2d"));
                console.log(predictions)
            } catch (err) {
                console.error("Error predicting:", err);
            } finally {
                tf.dispose([resizedVideo, casted, expanded]);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            detect();
        }, 10);
        return () => clearInterval(interval);
    }, [model]);

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    muted={true}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 8,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}

export default App;
