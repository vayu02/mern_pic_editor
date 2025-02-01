import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImageUtils"; // Helper function to crop the image

const CropModal = ({ image, onComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Crop Image</h2>
        <div className="relative w-[300px] h-[300px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3} // Change as needed
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
