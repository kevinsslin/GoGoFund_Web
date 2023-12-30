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
    <div className="pb-12">
      <div className="flex flex-row justify-start space-x-8 pb-2">
        {nfts.map((product) => (
          <button
            key={product.displayId}
            onClick={() => handleSelectProduct(product)}
            className="text-4xl font-bold hover:text-dark-blue pl-2"
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
          <div className="pl-2">
            <p className="break-all p-2 text-xl">
              price : $ {selectedProduct.price}
            </p>
            <p className="break-all p-2 text-xl">
              remain : {selectedProduct.totalAmount - selectedProduct.nowAmount}
            </p>
            <p className="break-all p-2 text-xl">
              {selectedProduct.description}
            </p>
          </div>
        ) : (
          <p className="p-2 text-xl">No products.</p>
        )}
      </div>
    </div>
  );
}

export default ProductIntro;
