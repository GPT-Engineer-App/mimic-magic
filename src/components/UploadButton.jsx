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
    if (fileUploaded) {
      onFileSelect(fileUploaded);
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
