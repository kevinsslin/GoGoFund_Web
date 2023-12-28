"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { Navbar as MTNavbar } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { User } from "lucide-react";
import { useAccount } from "wagmi";


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const { address, isConnected } = useAccount();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSave = async () => {
    // Call updateUser function with name and email
    try {
      const response = await fetch(`/api/users/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData.error);
        // Handle error: Display it in UI, etc.
      } else {
        const userData = await response.json();
        console.log("User data:", userData);
        // Process userData as needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };
  const navBarStyle = "text-2xl p-4 hover:text-dark-blue hover:border-b-4 font-bold";
  // Effect for handling resize events
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect for handling scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`/api/users/${address}`);
        if (response.status === 404) {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: address?.toString(),
              username: "user",
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from API:", errorData.error);
            // Handle error: Display it in UI, etc.
          } else {
            const userData = await response.json();
            console.log("User data:", userData);
            // Process userData as needed
          }
        }
        const userData = await response.json();
        // Process userData as needed
        return userData;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (isConnected && address) {
      getUser();
    }
  }, [address, isConnected]);
  // Render Navbar
  return (
    <>
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="text-black fixed top-0 z-50 border-0 bg-opacity-80 backdrop-blur-xl"
      placeholder={open ? "Loading..." : undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/logo.png" alt="GoGoFund Logo" width={240} height={160} />
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-black"
          }`}
        >
          <Link href="/events" className={navBarStyle}>
            All Events
          </Link>
          <Link href="/history" className={navBarStyle}>
            Our Team
          </Link>
          <Link href="/collection" className={navBarStyle}>
            My Collection
          </Link>
        </ul>
        <div className="flex flex-row space-x-8">
          <button className="flex h-10 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white">
            Get Fund
          </button>
          <ConnectButton />
        </div>
        <Button variant="outlined" onClick={handleClickOpen}>
            <User size={48} />
          </Button>
      </div>
    </MTNavbar>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Setting Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To receive notifications, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
