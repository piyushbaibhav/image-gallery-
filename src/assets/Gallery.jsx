// Gallery.js
import React, { useState } from 'react';
import Image from './Image';
import FileUpload from './FileUpload';

const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleDelete = () => {
    const updatedImages = uploadedImages.filter((image) => !selectedImages.includes(image.id));
    setUploadedImages(updatedImages);
    setSelectedImages([]);
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleCheckboxChange = (imageId) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageId)) {
        return prevSelectedImages.filter((id) => id !== imageId);
      } else {
        return [...prevSelectedImages, imageId];
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <FileUpload onFileUpload={handleFileUpload} />

      {/* Delete Selected Button */}
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Selected
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {uploadedImages.map((image) => (
          <div key={image.id} className="relative group">
            <Image src={image.src} alt={image.alt} onClick={() => handleImageClick(image)} />
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(image.id)}
              checked={selectedImages.includes(image.id)}
              className="absolute top-2 left-2"
            />
          </div>
        ))}
      </div>

      {fullscreenImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative">
            <Image src={fullscreenImage.src} alt={fullscreenImage.alt} className="max-h-80" />
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
