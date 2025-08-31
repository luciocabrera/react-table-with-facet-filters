import { useState } from "react";
import { FacetFilterTable } from "../../components";
import type { TableColumn } from "../../components";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  inStock: boolean;
  rating: number;
}

const productData: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    price: 1999,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    price: 999,
    inStock: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    price: 899,
    inStock: false,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Dell XPS 13",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Dell",
    price: 1299,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Nike Air Max",
    category: "Clothing",
    subcategory: "Shoes",
    brand: "Nike",
    price: 129,
    inStock: true,
    rating: 4.4,
  },
  {
    id: 6,
    name: "Adidas Ultraboost",
    category: "Clothing",
    subcategory: "Shoes",
    brand: "Adidas",
    price: 189,
    inStock: true,
    rating: 4.6,
  },
  {
    id: 7,
    name: "Levi's 501 Jeans",
    category: "Clothing",
    subcategory: "Pants",
    brand: "Levi's",
    price: 79,
    inStock: false,
    rating: 4.3,
  },
  {
    id: 8,
    name: "The Great Gatsby",
    category: "Books",
    subcategory: "Fiction",
    brand: "Scribner",
    price: 12,
    inStock: true,
    rating: 4.2,
  },
  {
    id: 9,
    name: "To Kill a Mockingbird",
    category: "Books",
    subcategory: "Fiction",
    brand: "Harper Lee",
    price: 14,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 10,
    name: "JavaScript: The Good Parts",
    category: "Books",
    subcategory: "Technology",
    brand: "O'Reilly",
    price: 35,
    inStock: false,
    rating: 4.1,
  },
];

const productColumns: TableColumn<Product>[] = [
  {
    key: "name",
    label: "Product Name",
    filterable: true,
  },
  {
    key: "category",
    label: "Category",
    filterable: true,
  },
  {
    key: "subcategory",
    label: "Subcategory",
    filterable: true,
  },
  {
    key: "brand",
    label: "Brand",
    filterable: true,
  },
  {
    key: "price",
    label: "Price",
    filterable: false,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    key: "inStock",
    label: "Stock Status",
    filterable: true,
    render: (value: boolean) => (value ? "In Stock" : "Out of Stock"),
  },
  {
    key: "rating",
    label: "Rating",
    filterable: false,
    render: (value: number) => (
      <div className="flex items-center">
        <span>{value.toFixed(1)}</span>
        <svg
          className="w-4 h-4 ml-1 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    ),
  },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Product Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Filter products by category, brand, and other attributes using the
          column filters.
        </p>
      </div>

      <FacetFilterTable data={productData} columns={productColumns} />
    </div>
  );
}
