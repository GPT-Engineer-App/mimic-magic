const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const id = uuidv4();
      const dir = `./submissions/${id}`;
      fs.mkdirSync(dir, { recursive: true });
      req.dir = dir; // Save directory to request for later use
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      // Save with the original file name
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Endpoint to upload a file and text
  app.post('/submit', upload.single('image'), (req, res) => {
    const text = req.body.text;
    const filePath = path.join(req.dir, 'text.txt');
  
    // Write the text to a file
    fs.writeFileSync(filePath, text);
  
    // Send back the ID of the submission
    res.send({ id: req.dir.split('/').pop() });
  });
  
  app.get('/', (req, res) => {
    res.send("")
  })

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  