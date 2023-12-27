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

  const navBarStyle = "text-2xl p-4 hover:font-bold hover:text-dark-blue hover:border-b-4";

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
      className="fixed top-0 z-50 border-0 text-black backdrop-blur-xl bg-opacity-80"
      placeholder={open ? "Loading..." : undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/logo.png" alt="GoGoFund Logo" width={300} height={200} />
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${isScrolling ? "text-gray-900" : "text-black"
            }`}
        >
          <Link href="/events" className={navBarStyle}>All Events</Link>
          <Link href="/history" className={navBarStyle}>Our Team</Link>
          <Link href="/collection" className={navBarStyle}>My Collection</Link>
        </ul>
        <div className="flex flex-row space-x-8">
          <button className="h-10 text-xl text-white bg-dark-blue p-4 flex items-center justify-center rounded-2xl font-bold">
            Get Fund
          </button>
          <ConnectButton />
        </div>
      </div>
    </MTNavbar>
  );
}

export default Navbar;
