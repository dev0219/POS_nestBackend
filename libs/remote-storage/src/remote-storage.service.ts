import { Injectable } from '@nestjs/common';
import {
  CopyObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as jszip from 'jszip';
import { RpcException } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

type BucketType = 'Catalogs' | 'Transactions' | 'Temporal Transactions';
const BucketValue = {
  Catalogs: process.env.AWS_BUCKET_CATALOGS,
  Transactions: process.env.AWS_BUCKET_TRANSACTIONS,
  'Temporal Transactions': process.env.AWS_BUCKET_TEMPORAL_TRANSACTIONS,
};

@Injectable()
export class RemoteStorageService {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
      },
    });
  }
  async saveFile(
    name: string,
    body: Buffer,
    bucket: BucketType,
  ): Promise<void> {
    try {
      const objectCmd = new PutObjectCommand({
        Bucket: BucketValue[bucket],
        Key: name,
        Body: body,
      });
      const result = await this.s3.send(objectCmd);
      console.log(result);
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: 'db',
        message: 'Error to save file',
      });
    }
  }

  async getLink(path: string, secondsToExpire = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_CATALOGS,
      Key: path,
    });
    return await getSignedUrl(this.s3, command, {
      expiresIn: secondsToExpire,
    });
  }

  async createZipFile(
    data: Record<string, any>,
    internalFileName: string,
  ): Promise<Buffer> {
    const jsonString = JSON.stringify(data);

    const zip = new jszip();
    const fileName = internalFileName;
    zip.file(fileName, jsonString);

    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    zip.remove(fileName);
    return buffer;
  }

  async moveFile(targetBucket: BucketType, originSource: string, name: string) {
    try {
      const command = new CopyObjectCommand({
        Bucket: BucketValue[targetBucket],
        CopySource: originSource,
        Key: name,
      });

      const result = await this.s3.send(command);
      console.info(result);
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: 'db',
        message: 'Error to move file',
      });
    }
  }
}
