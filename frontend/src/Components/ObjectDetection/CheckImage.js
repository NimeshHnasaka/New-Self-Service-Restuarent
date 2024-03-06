import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './ObjectDetection.css';

const CheckImage = () => {
    const [model, setModel] = useState(null);
    //const [detectedObjects, setDetectedObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/model.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch model');
                }
                const modelJson = await response.json();
                const loadedModel = await tf.loadLayersModel(tf.io.fromMemory(JSON.stringify(modelJson)));
                setModel(loadedModel);
                setLoading(false);
            } catch (error) {
                console.error('Error loading model:', error);
                setLoading(false);
            }
        };

        loadModel();
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const detectObjects = async () => {
        try {
            if (!model || !selectedImage) {
                console.error('Model or image not loaded');
                return;
            }

            setLoading(true);

            // Pre-process the image
            const imageElement = document.createElement('img');
            imageElement.src = selectedImage;
            const imageTensor = tf.browser.fromPixels(imageElement).expandDims(0);

            // Make predictions
            const predictions = await model.predict(imageTensor);

            // Post-process predictions (you need to implement this based on your model output)
            // For demonstration, we'll just log the predictions
            console.log('Predictions:', predictions);

            setLoading(false);
        } catch (error) {
            console.error('Error detecting objects:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && <img src={selectedImage} alt="Selected" className="image-preview" />}
            <button onClick={detectObjects} disabled={loading || !selectedImage}>
                {loading ? 'Detecting...' : 'Detect Objects'}
            </button>
        </div>
    );
};

export default CheckImage;