"use client";

import { useState } from "react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useAccount } from "wagmi";

// Define formData list
interface FormData {
  address: string;
  price: number;
  name: string;
  description: string;
  totalAmount: number;
  imageSrc: string;
}

function GetFondDialog() {
  const [open, setOpen] = React.useState(false);
  const { address } = useAccount();
  const {eventId} = useParams();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState<FormData>({
    address: address?.toString() || "",
    name: "",
    description: "",
    price: 0,
    totalAmount: 0,
    imageSrc: "",
  });

  // Define handleChange to update formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Update formData with the new value
    const updatedValue =
      name === "price" || name === "totalAmount"
        ? parseInt(value, 10)
        : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  // Define handleSubmit to create a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting:", formData);

    try {
      const response = await fetch(`/api/nfts/${eventId}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData.error);
        // Handle error: Display it in UI, etc.
      } else {
        console.log("Success");
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <button
        className="h-15 m-4 flex w-64 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white"
        onClick={handleClickOpen}
      >
        Add NFT Product
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Create NFT</DialogTitle>
        <DialogContent className="space-y-2">
          <InputLabel htmlFor="name">NFT Name : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="NFT Name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">Price : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="Price"
            name="price"
            type="number"
            variant="standard"
            onChange={handleChange}
            fullWidth
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">Total Amount : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="Total Amount"
            name="totalAmount"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">Description : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="Description"
            name="description"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <form onSubmit={handleSubmit} className="flex justify-center">
            <Button type="submit" onClick={handleClose}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default GetFondDialog;
