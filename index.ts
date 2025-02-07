import dotenv from 'dotenv';
dotenv.config();
import { Elysia } from 'elysia';
import { CastAddBody } from '@farcaster/hub-nodejs';
import publishCast from './publishCast';

interface PublishRequestBody {
  data: CastAddBody, fid: number, signerPrivateKey?: `0x${string}`, mnemonic?: string
}

const app = new Elysia();

app.post(
  '/',
  async ({ body }: { body: PublishRequestBody; }) => {
    try {
      console.log('Request received:', JSON.stringify({
        data: body.data,
        fid: body.fid,
      }, undefined, 2));
      await publishCast(body);
      console.log('Cast published successfully');
      return { success: true, message: 'Cast published successfully' };
    } catch (error) {
      console.error('Error processing request:', error);
      return { error: (error as Error).message };
    }
  }
);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
