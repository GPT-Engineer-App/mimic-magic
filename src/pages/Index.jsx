import React from "react";
import UploadButton from "../components/UploadButton";
import { VStack, Heading, HStack, Textarea } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";

const Index = () => {
  const [imageDataUrl, setImageDataUrl] = React.useState("");

  return (
    <VStack p={8}>
      <Heading mb="8">gta 6 leaks</Heading>
      <HStack mb="4" spacing="24px">
        <UploadButton onFileSelect={setImageDataUrl} />
        {imageDataUrl && (
          <>
            <Image src={imageDataUrl} alt="Uploaded image" boxSize="100px" objectFit="cover" />
            <Textarea placeholder="Enter text here" />
          </>
        )}
      </HStack>
    </VStack>
  );
};

export default Index;
function FileUploader({ onFileSelect }) {
  const handleFileInput = (e) => {
    // Handle the file input event and pass the file to the parent component
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return <input type="file" onChange={handleFileInput} accept="image/*" />;
}

// Removed duplicate React import

// React import already exists, so this line is unnecessary and should be removed.
import { useEffect } from "react";

function ImagePasteArea({ onImagePaste }) {
  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith("image/")) {
          onImagePaste(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [onImagePaste]);

  return <div>Paste an image here.</div>;
}
import { useState } from "react";

function ImageUploadAndPaste() {
  const [image, setImage] = useState(null);

  const handleFileSelect = (file) => {
    setImage(URL.createObjectURL(file));
  };

  const handleImagePaste = (file) => {
    setImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <FileUploader onFileSelect={handleFileSelect} />
      <ImagePasteArea onImagePaste={handleImagePaste} />
      {image && <img src={image} alt="Uploaded or Pasted" />}
    </div>
  );
}
import React, { useCallback, useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const onPaste = useCallback((event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = function(event) {
          // Add the image URL to your state
          setImages((prevImages) => [...prevImages, event.target.result]);
        };
        reader.readAsDataURL(blob);
      }
    }
  }, []);

  const onFileChange = useCallback((event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        // Add the image URL to your state
        setImages((prevImages) => [...prevImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <div onPaste={onPaste}>
      <input type="file" onChange={onFileChange} multiple accept="image/*" />
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Pasted or uploaded content ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;

