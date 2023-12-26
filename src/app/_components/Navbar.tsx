"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Button from '@mui/material/Button';


function Navbar() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/events");
    }


    return (
        <div className="p-12">
          <div className="flex flex-row justify-between items-center">
            <Image
              src="/logo.jpeg"
              alt="GoGoFund Logo"
              width={150}
              height={100}
              onClick={handleClick}
            />
            <div className="flex flex-row space-x-8">
              <Button variant="contained" className="text-xl h-10 text-black">我要募資</Button>
              <FaUserCircle className="text-4xl" />
            </div>
          </div>
        </div>
    );

}
    

export default Navbar;