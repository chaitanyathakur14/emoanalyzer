from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2
import os

app = Flask(__name__)
model = load_model("C:/Users/CHAITANYA THAKUR/Downloads/emotion_ace/emotion_ace/emotionalinte/model_file.h5")

class_labels = ['Angry','Disgust','Fear','Happy','Neutral','Sad','Surprise']

@app.route('/')
def home():
    return "Emotion Detection API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    img = image.load_img(file, target_size=(48,48), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    predicted_label = class_labels[np.argmax(prediction)]
    confidence = round(float(np.max(prediction)), 2)

    return jsonify({'emotion': predicted_label, 'confidence': confidence})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
