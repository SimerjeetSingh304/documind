import { db } from './src/lib/db';
async function test() {
  try {
    const res = await db.$executeRaw`SELECT '[1,2,3]'::vector`;
    console.log('Success:', res);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
