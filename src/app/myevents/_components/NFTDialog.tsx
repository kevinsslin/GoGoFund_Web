"use client";

import { useState } from "react";
import React from "react";

import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

// Define formData list
interface FormData {
  id: string;
  price: string;
  totalamount: string;
}

function GetFondDialog() {
  const [open, setOpen] = React.useState(false);
  const [formDataArray, setFormDataArray] = useState<FormData[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState<FormData>({
    id: "",
    price: "",
    totalamount: "",
  });

  // Define handleChange to update formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define handleSubmit to create a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting:", formData);

    setFormDataArray((prevState) => [...prevState, formData]);

    console.log(formDataArray);

    // const data = new FormData()
    // for (const [key, value] of Object.entries(formData)) {
    //   if (key === 'image' && value instanceof File) {
    //     data.append('image', value, value.name);
    //   } else {
    //     data.append(key, String(value));
    //   }
    // }
    // await createEvents(formData);
    // try {
    //   const response = await fetch("/api/events", {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error("Error from API:", errorData.error);
    //     // Handle error: Display it in UI, etc.
    //   } else {
    //     const eventData = await response.json();
    //     console.log("Event data:", eventData);
    //     // Process eventData as needed
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent className="space-y-2">
          <InputLabel htmlFor="name">NFT Id : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="NFT Id"
            name="id"
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
            name="totalamount"
            type="number"
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
