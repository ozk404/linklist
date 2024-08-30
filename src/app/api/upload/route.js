import { Storage } from '@google-cloud/storage';
import uniqid from 'uniqid';

export async function POST(req) {
  try {
    const formData = await req.formData();

    if (formData.has('file')) {
      const file = formData.get('file');

      const storage = new Storage();
      const bucketName = process.env.BUCKET_NAME;
      const bucket = storage.bucket(bucketName);

      const randomId = uniqid();
      const ext = file.name.split('.').pop();
      const newFilename = `${randomId}.${ext}`;

      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }

      const fileBuffer = Buffer.concat(chunks);
      const fileUpload = bucket.file(newFilename);

      await fileUpload.save(fileBuffer, {
        metadata: {
          contentType: file.type,
        },
      });

      const link = `https://storage.googleapis.com/${bucketName}/${newFilename}`;
      return new Response(JSON.stringify({ url: link }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'File not found in the request' }), { status: 400 });
    }
  } catch (error) {
    console.error('Error uploading file to Google Cloud:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
