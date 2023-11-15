// Gallery.js
import React, { useState } from 'react';
import Image from './Image';
import FileUpload from './FileUpload';

const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleDelete = (id) => {
    const updatedImages = uploadedImages.filter((image) => image.id !== id);
    setUploadedImages(updatedImages);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div className="grid grid-cols-3 gap-4">
        {uploadedImages.map((image) => (
          <div key={image.id} className="relative group">
            <Image src={image.src} alt={image.alt} />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 bg-red-500 text-white p-2 rounded-full group-hover:opacity-100 transition-opacity duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
