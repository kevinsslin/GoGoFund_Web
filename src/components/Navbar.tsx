"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { Navbar as MTNavbar } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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
  const { address, isConnected } = useAccount();

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
