// Gallery.js
import React, { useState } from 'react';
import Image from './Image';
import FileUpload from './FileUpload';

const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
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
      toggleImageSelection(image.id);
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageId)) {
        return prevSelectedImages.filter((id) => id !== imageId);
      } else {
        return [...prevSelectedImages, imageId];
      }
    });
  };

  const handleCheckboxChange = (imageId) => {
    toggleImageSelection(imageId);
  };

  const handleSelectAll = () => {
    setSelectedImages(uploadedImages.map((image) => image.id));
  };

  const handleDeselectAll = () => {
    setSelectedImages([]);
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded-md shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">Image Gallery</h1>

      <FileUpload onFileUpload={handleFileUpload} className="w-full mb-4" />

      {/* Delete Buttons */}
      {deleteMode ? (
        <div className="mb-4 flex flex-col sm:flex-row">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-4 mt-4"
          >
            Delete Selected
          </button>
          <button onClick={() => setDeleteMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
            Cancel
          </button>
          <button onClick={handleSelectAll} className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4">
            Select All
          </button>
        </div>
      ) : (
        <button onClick={() => setDeleteMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-4">
          Delete
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uploadedImages.map((image) => (
          <div key={image.id} className="relative group" onClick={() => handleImageClick(image)}>
            <Image src={image.src} alt={image.alt} className="w-full" />
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
    </div>
  );
};

export default Gallery;
