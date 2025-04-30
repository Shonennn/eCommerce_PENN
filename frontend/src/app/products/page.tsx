'use client';

import { gql, useQuery } from '@apollo/client';
import client from '@/graphql/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

type Product = {
    id: string;
    name: string;
    price: number;
  };
  

export default function ProductPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {data.products.map((product: Product) => (
          <li key={product.id} className="p-2 border rounded">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
