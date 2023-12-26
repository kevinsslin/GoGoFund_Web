"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Navbar as MTNavbar } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  // Effect for handling resize events
  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect for handling scroll events
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render Navbar
  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
      placeholder={open ? "Loading..." : undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/logo.png" alt="GoGoFund Logo" width={400} height={250} />
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-black"
          }`}
        >
          <Link href="/events">All Events</Link>
          <Link href="/history">Our Team</Link>
          <Link href="/collection">My Collection</Link>
        </ul>
        <div className="flex flex-row space-x-8">
          <Button variant="contained" className="h-10 text-xl text-black">
            Get Fund
          </Button>
        </div>
        <div className="hidden gap-2 lg:flex lg:items-center">
          <ConnectButton />
        </div>
      </div>
    </MTNavbar>
  );
}

export default Navbar;
