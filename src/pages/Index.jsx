import React, { useState } from "react";
import UploadButton from "../components/UploadButton";
import { Box, Heading, Input, Button, List, ListItem, ListIcon, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "1234567890 can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb="8">gta 6 leaks</Heading>
      <HStack mb="4">
        <UploadButton onFileSelect={(fileContent) => setInputValue(fileContent)} />
      </HStack>
      <HStack>
        <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a new leak..." />
        <IconButton icon={<FaPlus />} onClick={addTodo} colorScheme="darkgreen" aria-label="Add todo" />
      </HStack>
      <List spacing={0} my={1} w="100%">
        {todos.map((todo, index) => (
          <ListItem key={index} p={2} bg="red.500" borderRadius="md">
            <HStack justify="space-between">
              <Box>{todo}</Box>
              <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
            </HStack>
          </ListItem>
        ))}
      </List>
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
// Removed the App component definition and export since it's unnecessary here
