const mime = require('mime-types')
const {
  CreateBucketCommand,
  GetBucketWebsiteCommand,
  PutBucketWebsiteCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  DeleteBucketCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} = require('@aws-sdk/client-s3')

const createHostedBucket = (s3) => async (bucketName) => {
  await s3.send(new CreateBucketCommand({ Bucket: bucketName }))
  // Clear `Block all public access`
  await s3.send(
    new PutBucketWebsiteCommand({
      Bucket: bucketName,
      ContentMD5: '',
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: 'error.html',
        },
        IndexDocument: {
          Suffix: 'index.html',
        },
      },
    })
  )
  // Attach a bucket policy
  await s3.send(
    new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicReadGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${bucketName}/*`,
          },
        ],
      }),
    })
  )
  // TODO: Bucket domain redirection
}

const putHostedBucket = (s3) => async (bucketName, storageFilesMap) => {
  await Promise.all(
    Object.keys(storageFilesMap).map((storageKey) =>
      s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: storageKey,
          Body: storageFilesMap[storageKey],
          // TODO: Set appropriate mime-type while uploading
          // ContentType: mime.lookup(storageKey),
        })
      )
    )
  )
  return true
}

const deleteHostedBucket = (s3) => async (bucketName) => {
  if (!bucketName) {
    return
  }
  const validBucket = await s3
    .send(new GetBucketWebsiteCommand({ Bucket: bucketName }))
    .then(() => true)
    .catch((e) => false)
  if (!validBucket) {
    return
  }
  const { Contents: bucketContents = [] } = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
    })
  )
  if (bucketContents.length) {
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: {
          Objects: bucketContents.map(({ Key }) => ({ Key })),
          Quiet: true,
        },
      })
    )
  }
  await s3.send(
    new DeleteBucketCommand({
      Bucket: bucketName,
    })
  )
}

module.exports = (s3) => ({
  createHostedBucket: createHostedBucket(s3),
  putHostedBucket: putHostedBucket(s3),
  deleteHostedBucket: deleteHostedBucket(s3),
})
