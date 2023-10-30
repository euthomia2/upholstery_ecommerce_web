import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      console.log('=== Webhook triggered ===');
      console.log(body.data);
      console.log('=== Webhook end ===');
      return NextResponse.json(
        { message: 'Webhook Received' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error handling webhook:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } else {
    let response = NextResponse.next();

    response.header.set('Allow', 'POST');

    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    );
  }
}
