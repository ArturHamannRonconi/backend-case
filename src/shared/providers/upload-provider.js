import { uid } from 'uid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand,
} from '@aws-sdk/client-s3';

import {
  AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_SECRET_ACCESS_KEY_ID, BUCKET_NAME,
} from '../config/environment.js';

import UploadFail from '../http/errors/upload-fail.js';

function UploadProvider() {
  const client = new S3Client({
    region: AWS_REGION,
    systemClockOffset: true,
    credentials: {
      accessKeyId: AWS_SECRET_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  return {
    upload: async (document) => {
      try {
        const Key = `${document.originalname}-${uid(16)}`;
        const command = new PutObjectCommand({
          Key,
          Bucket: BUCKET_NAME,
          Body: document.buffer,
        });

        const object = await client.send(command);
        return { Key, VersionId: object.VersionId };
      } catch (error) {
        throw UploadFail();
      }
    },

    update: async (fileName, buffer) => {
      try {
        const command = new PutObjectCommand({
          Body: buffer,
          Key: fileName,
          Bucket: BUCKET_NAME,
        });

        const object = await client.send(command);
        return object.VersionId;
      } catch (error) {
        throw UploadFail();
      }
    },

    addDeleteMarker: async (fileName, VersionId) => {
      const command = new DeleteObjectCommand({
        VersionId,
        Key: fileName,
        Bucket: BUCKET_NAME,
      });

      await client.send(command);
    },

    getUrl: async (Key) => {
      try {
        const command = new GetObjectCommand({
          Key, Bucket: BUCKET_NAME,
        });

        const url = await getSignedUrl(client, command);

        return url;
      } catch (error) {
        throw UploadFail();
      }
    },

  };
}

export default UploadProvider;
