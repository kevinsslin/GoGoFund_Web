"use client";

import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export type CardListProps = {
  id: string;
  name: string;
  currency: string;
  progess: number;
  price: number;
  person: number;
  time: number;
};

export default function EventCard({
  id,
  name,
  currency,
  price,
  person,
  time,
}: CardListProps) {
  return (
    <Link href={`/myevents/${id}`}>
      <Paper className="w-50 p-2 hover:cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/events.jpeg"
            alt="event"
            width={300}
            height={300}
            className="p-5 "
          />
          <Typography className="break-all font-bold" variant="h4">
            {name}
          </Typography>
        </div>
        <p className="pl-6 text-xl font-bold text-dark-blue">
          {currency}$ {price}
        </p>
        <div className="flex flex-row items-center justify-end pb-2">
          <AiOutlineUser className="text-dark-blue" />
          <p className="p-2 font-bold text-dark-blue">{person} people</p>
          <AiOutlineFieldTime className="text-dark-blue" />
          <p className="p-2 font-bold text-dark-blue">{time} days</p>
        </div>
      </Paper>
    </Link>
  );
}
