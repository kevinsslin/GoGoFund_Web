"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";

function Navbar() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/events");
  };

  return (
    <div className="p-12">
      <div className="flex flex-row items-center justify-between">
        <Image
          src="/logo.jpeg"
          alt="GoGoFund Logo"
          width={150}
          height={100}
          onClick={handleClick}
        />
        <div className="flex flex-row space-x-8">
          <Button variant="contained" className="h-10 text-xl text-black">
            我要募資
          </Button>
          <FaUserCircle className="text-4xl" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
