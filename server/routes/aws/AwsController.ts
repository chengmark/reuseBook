import { Request, Response } from 'express'
import aws from 'aws-sdk'
import { signS3 } from './params'

const S3_BUCKET = process.env.S3_BUCKET_NAME
aws.config.region = 'ap-southeast-1'

const AwsController = {
  // sign s3 url for image uploading
  signS3: async (req: Request, res: Response): Promise<void> => {
    const { fileName, fileType } = <signS3>(<unknown>req.body)
    const s3 = new aws.S3()
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    }
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).json(err)
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      }
      res.status(200).json(returnData)
    })
  },
}

export default AwsController
