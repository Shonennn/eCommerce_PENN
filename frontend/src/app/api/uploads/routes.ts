export async function POST(req: Request) {
    const formData = await req.formData();
  
    const response = await fetch('http://backend:4000/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  