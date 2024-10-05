
import { NextResponse } from 'next/server';
import redisClient from '../../../utils/redis';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    await redisClient.del(username);
    return NextResponse.json({ message: `Cache cleared for ${username}` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}
