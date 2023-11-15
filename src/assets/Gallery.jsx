// Gallery.js
import React, { useState } from 'react';
import Image from './Image';
import FileUpload from './FileUpload';

const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleDeleteSelected = () => {
    const updatedImages = uploadedImages.filter((image) => !selectedImages.includes(image.id));
    setUploadedImages(updatedImages);
    setSelectedImages([]);
    setDeleteMode(false);
  };

  const handleImageClick = (image) => {
    if (deleteMode) {
      handleCheckboxChange(image.id);
    } else {
      setFullscreenImage(image);
    }
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

  const handleSelectAll = () => {
    setSelectedImages(uploadedImages.map((image) => image.id));
  };

  const handleDeselectAll = () => {
    setSelectedImages([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <FileUpload onFileUpload={handleFileUpload} />

      {/* Delete Buttons */}
      {deleteMode ? (
        <div className="mb-4">
          <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded mr-4">
            Delete Selected
          </button>
          <button onClick={() => setDeleteMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={() => setDeleteMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Delete
        </button>
      )}

      <div className="grid grid-cols-3 gap-4">
        {uploadedImages.map((image) => (
          <div key={image.id} className="relative group">
            <Image src={image.src} alt={image.alt} onClick={() => handleImageClick(image)} />
            {deleteMode && (
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(image.id)}
                checked={selectedImages.includes(image.id)}
                className="absolute top-2 left-2"
              />
            )}
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
