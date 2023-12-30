"use client";

// ProductPage.tsx
import React, { useState } from "react";

import { Divider } from "@mui/material";

import type { nft } from "@/lib/types/db";

function ProductIntro({ nfts = [] }: { nfts: nft[] }) {
  const [selectedProduct, setSelectedProduct] = useState<nft | null>(null);

  const handleSelectProduct = (product: nft) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <div className="flex flex-row justify-start space-x-8 pb-2">
        {nfts.map((product) => (
          <button
            key={product.displayId}
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
            <p className="break-all p-2 text-3xl font-bold">
              {selectedProduct.totalAmount}
            </p>
            <p className="break-all p-2 text-xl">
              remain : {selectedProduct.totalAmount - selectedProduct.nowAmount}
            </p>
            <p className="break-all p-2 text-3xl font-bold">
              {selectedProduct.price}
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
