"use client";

// ProductPage.tsx
import React, { useState } from "react";

import { Divider } from "@mui/material";

interface Product {
  id: number;
  name: string;
  description: string;
}

const mockproducts: Product[] = [
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <div className="flex flex-row justify-start space-x-8 pb-2">
        {mockproducts.map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelectProduct(product)}
            className="text-4xl font-bold hover:text-dark-blue"
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
          <div>
            <p className="break-all p-2 pt-2 text-3xl font-bold">
              {mockproducts[0].name}
            </p>
            <p className="break-all p-2 text-xl">
              {mockproducts[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductIntro;
