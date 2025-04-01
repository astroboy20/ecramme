
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  try {
 
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     
      cache: 'no-store'
    });
    
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
   
    const data = await response.json();
    
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: `Failed to fetch from the provided URL: ${error instanceof Error ? error.message : 'Unknown error'}` }, 
      { status: 500 }
    );
  }
}