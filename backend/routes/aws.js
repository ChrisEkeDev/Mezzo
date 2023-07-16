require("dotenv").config()
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_S3_BUCKET;
const awsAccessKey = process.env.AWS_S3_KEY;
const bucketRegion = process.env.AWS_S3_REGION;
const awsSecretKey = process.env.AWS_S3_SECRET;

const s3 = new S3({
    region: bucketRegion,
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey
})

const uploadFile = (fileStream, fileName) => {
    console.log("FILESTREAM", fileStream);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName,
    }
    return s3.upload(uploadParams).promise();
}

const downloadFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    };
    return s3.getObject(downloadParams).createReadStream();
}

module.exports = { uploadFile, downloadFile }
