import React from "react";
import { Button, Input } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const UploadButton = ({ onFileSelect }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded && fileUploaded.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => onFileSelect(e.target.result);
      reader.readAsDataURL(fileUploaded);
    }
  };

  return (
    <>
      <Button leftIcon={<FaUpload />} onClick={handleClick}>
        Upload File
      </Button>
      <Input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
    </>
  );
};

export default UploadButton;
