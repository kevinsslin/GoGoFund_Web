"use client";

import { useState } from "react";
import React from "react";

import { useRouter } from "next/navigation";

import { DialogTitle, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useAccount } from "wagmi";

function FundDialog() {
  const [open, setOpen] = React.useState(false);
  const { address } = useAccount();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    address: address?.toString() || "",
    title: "",
    description: "",
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    targetValue: 0,
    currency: "",
    image: null as File | null,
  });

  // Define handleChange to update formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Update formData with the new value
    const updatedValue =
      name === "targetValue"
        ? parseInt(value, 10)
        : name === "startDate" || name === "endDate"
          ? Date.parse(value)
          : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      ["image"]: file,
    });
  };

  // Define handleSubmit to create a new event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting:", formData);
    // const data = new FormData()
    // for (const [key, value] of Object.entries(formData)) {
    //   if (key === 'image' && value instanceof File) {
    //     data.append('image', value, value.name);
    //   } else {
    //     data.append(key, String(value));
    //   }
    // }
    // await createEvents(formData);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData.error);
        // Handle error: Display it in UI, etc.
      } else {
        const eventData = await response.json();
        router.push(`/myevents/${eventData.displayId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <button
        className="w-30 m-4 flex h-10 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white"
        onClick={handleClickOpen}
      >
        Get Fund
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent className="space-y-2">
          <InputLabel htmlFor="name">Title : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            type="text"
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
            id="description"
            name="description"
            type="text"
            multiline
            variant="standard"
            onChange={handleChange}
            fullWidth
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">Start Date : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="startDate"
            name="startDate"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">End Date : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="endDate"
            name="endDate"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">TargetAmount : </InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="TargetAmount"
            name="targetValue"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="name">Currency : </InputLabel>
          <TextField
            id="Currency"
            name="currency"
            select
            variant="standard"
            sx={{ width: 200 }}
            required
            className="pb-2"
            onChange={handleSelectChange}
          >
            <MenuItem value="NTD">
              <em>NTD</em>
            </MenuItem>
            <MenuItem value="USD">
              <em>USD</em>
            </MenuItem>
            <MenuItem value="BTC">
              <em>BTC</em>
            </MenuItem>
          </TextField>
          <InputLabel htmlFor="name">Image : </InputLabel>
          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
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

export default FundDialog;
