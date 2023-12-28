"use client";

// ProductPage.tsx
import React, { useState } from "react";

import { Divider } from "@mui/material";

interface Product {
  id: number;
  name: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Product1",
    description:
      "apple apple vsdsvf erfgvefdbvedrbve rfbrtbrthbr tghbrtbhnrynhrhb rnbrnr hnyrnrynybyntynytn rthbrthb rthbtrhbrt htr hrth rthr",
  },
  {
    id: 2,
    name: "Product2",
    description: "banana apple vsdsvf erfgvefd hbtrhbrt htr hrth rthr",
  },
  {
    id: 3,
    name: "Product3",
    description:
      "cat dbvedrbve rfbrtbrthbr tghbrtbhnrynhrhb rnbrnr hnyrnrynybyntynytn rthbrthb rthbtrhbrt htr hrth rthr",
  },
];

function ProductIntro() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0],
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <div className="flex justify-start pb-2">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelectProduct(product)}
            className="p-2 text-4xl font-bold text-dark-blue hover:border"
          >
            {product.name}
          </button>
        ))}
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        sx={{ borderWidth: 1 }}
      />
      <div>
        {selectedProduct ? (
          <div>
            <p className="break-all p-2 text-3xl font-bold">
              {selectedProduct.name}
            </p>
            <p className="break-all p-2 text-xl">
              {selectedProduct.description}
            </p>
          </div>
        ) : (
          <p>請選擇一個商品</p>
        )}
      </div>
    </div>
  );
}

export default ProductIntro;
