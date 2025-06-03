import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME || 'forma-public-dev';
const PREFIX = import.meta.env.VITE_S3_PREFIX || 'mainnet-snapshots/';
const REGION = import.meta.env.VITE_S3_REGION || 'us-east-2';

export interface S3File {
  key: string;
  name: string;
  size: number;
  lastModified: Date;
  downloadUrl: string;
}

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'anonymous',
    secretAccessKey: 'anonymous',
  },
  signer: { sign: async (request) => request },
});

const fetchFiles = async (): Promise<S3File[]> => {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: PREFIX,
    });

    const response = await s3Client.send(command);

    if (!response.Contents) {
      return [];
    }

    const files = response.Contents
      .filter(item => item.Key && !item.Key.endsWith('/') && item.Key !== PREFIX)
      .map(item => ({
        key: item.Key!,
        name: item.Key!.replace(PREFIX, ''),
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
        downloadUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${item.Key}`,
      }))
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return files;
};

let filesCache: Promise<S3File[]> | null = null;

export const getFiles = (): Promise<S3File[]> => {
  if (!filesCache) {
    filesCache = fetchFiles();
  }
  return filesCache;
};

export const resetFilesCache = (): void => {
  filesCache = null;
};
