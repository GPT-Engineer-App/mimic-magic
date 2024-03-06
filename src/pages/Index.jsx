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
          <Textarea placeholder="Enter text here" style={imageDataUrl ? { backgroundImage: `url(${imageDataUrl})`, backgroundSize: "80px 80px", backgroundPosition: "center", width: "300px", height: "100px", backgroundRepeat: "no-repeat" } : { width: "300px", height: "100px" }} />
        </>
      </HStack>
    </VStack>
  );
};

export default Index;
