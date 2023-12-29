import React, { useState, useEffect } from "react";

import {
  DialogTitle,
  Button,
  Dialog,
  DialogContent,
  InputLabel,
  TextField,
} from "@mui/material";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

import { PoolABI } from "@/utils/abis/Pool";
import type { nft } from "@/lib/types/db";

type FundDialogProps = {
  poolAddress: string;
  nfts: nft[];
};

function FundDialog({ poolAddress, nfts }: FundDialogProps) {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();

  const [formData, setFormData] = useState({
    to: address || "",
    amounts: new Array(nfts?.length).fill(""),
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = formData.amounts.reduce((acc, amount, index) => {
      const nftPrice = nfts[index]?.price || 0;
      return acc + nftPrice * (Number(amount) || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [formData, nfts]);

  const handleInputChange = (index:number, value:string) => {
    setFormData((prevData) => {
      const updatedAmounts = [...prevData.amounts];
      updatedAmounts[index] = value;
      return { ...prevData, amounts: updatedAmounts };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { config } = usePrepareContractWrite({
    address: poolAddress as `0x${string}`,
    abi: PoolABI,
    functionName: "mintBatch",
    args: [
      formData.to,
      nfts.map((nft) => nft.id),
      formData.amounts.map(Number),
    ],
  });

  const { write } = useContractWrite(config);

  const handleSubmit = () => {
    write?.();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        className="w-30 m-4 flex h-10 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white hover:bg-light-blue"
        onClick={handleClickOpen}
      >
        Fund
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Order</DialogTitle>
        <DialogContent className="space-y-2">
          {nfts.map((nft, index) => (
            <div key={nft.id}>
              <InputLabel htmlFor={`tokenId-${nft.id}`}>
                {`Token ID: ${nft.id}, Price: ${nft.price}`}
              </InputLabel>
              <TextField
                label={`Amount for Token ID ${nft.id}`}
                value={formData.amounts[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="mt-4"
                fullWidth
              />
            </div>
          ))}
          <div>Total Price: {totalPrice}</div>
          <Button disabled={!write} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default FundDialog;
