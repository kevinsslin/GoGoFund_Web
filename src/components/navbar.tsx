import React from "react";
import { Navbar as MTNavbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Navbar component
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
        <Typography
          as="a"
          href="/"
          variant="h6"
          color={isScrolling ? "gray" : "white"}
          placeholder={open ? "Loading..." : undefined}
        >
          GoGoFund
        </Typography>
        <ul className={`ml-10 hidden items-center gap-6 lg:flex ${isScrolling ? "text-gray-900" : "text-white"}`}>
          <Link href="/about">About</Link>
          <Link href="/donations">Donations</Link>
          <Link href="/history">History</Link>
        </ul>
        <div className="hidden gap-2 lg:flex lg:items-center">
          <ConnectButton />
        </div>
      </div>
    </MTNavbar>
  );
}

export default Navbar;
