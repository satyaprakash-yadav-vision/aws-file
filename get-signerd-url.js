const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// const { s3 } = require('./config');
const { v4 } = require('uuid');


const getSignedUrlForS3 = async (fileName,fileType,expiresIn = 3600) => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
  });

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `other/${fileName}`,
    ContentType:fileType
  });

  try {
    // console.log(s3,"this is s3");
    console.log(s3Client,"this is s3Client");
    console.log(command,"this is command");
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL', error);
    throw error;
  }
};

module.exports = getSignedUrlForS3;
