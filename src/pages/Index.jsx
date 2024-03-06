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
        <>
          <Textarea placeholder="Enter text here" style={imageDataUrl ? { backgroundImage: `url(${imageDataUrl})`, backgroundSize: "contain", backgroundPosition: "center", width: "300px", height: "100px", backgroundRepeat: "no-repeat" } : { width: "300px", height: "100px" }} />
        </>
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
import { useCallback } from "react";

// Both the onPaste and onFileChange callbacks are referencing an undeclared function 'setImages'.
