'use client';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query { products { id name description price imageUrl } }`,
      }),
    })
      .then(res => res.json())
      .then(data => setProducts(data.data.products));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <img src={`http://localhost:4000${p.imageUrl}`} alt={p.name} width={200} />
            <p>{p.description}</p>
            <p>${p.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
