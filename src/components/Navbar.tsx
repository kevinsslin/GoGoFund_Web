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

import UserDialog from "./UserDialog";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navBarStyle =
    "text-2xl p-4 hover:text-dark-blue hover:border-b-4 font-bold";

  const handleClickOpen = () => {
    setOpen(true);
  }

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
            <Link href="/myevents" className={navBarStyle}>
              My Events
            </Link>
            <Link href="/collection" className={navBarStyle}>
              My Collection
            </Link>
          </ul>
          <div className="flex flex-row space-x-8">
            <ConnectButton />
            <Button onClick={handleClickOpen}>
              <User size={32} />
            </Button>
          </div>
        </div>
      </MTNavbar>
      <UserDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Navbar;
