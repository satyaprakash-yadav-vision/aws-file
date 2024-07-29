const express = require('express');
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const getSignedUrlForS3 = require('./get-signerd-url'); // Import the function

app.get("/upload", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});
app.get('/generate-signed-url', async (req, res) => {
  const { fileName, fileType } = req.query;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const objectKey = `other/${fileName}`;

  try {
    const signedUrl = await getSignedUrlForS3(fileName,fileType);
    console.log(signedUrl,"this is sighned");
    res.json({ signedUrl,key: objectKey});
  } catch (error) {
    res.status(500).json({ error: 'Error generating signed URL' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
