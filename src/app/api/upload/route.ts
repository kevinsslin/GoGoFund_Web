/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import pinataSDK from "@pinata/sdk";
import { IncomingForm } from "formidable";
import fs from "fs";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: any) => {
  const stream = fs.createReadStream(file.filepath);
  const options = {
    pinataMetadata: {
      name: file.originalFilename,
    },
  };
  const response = await pinata.pinFileToIPFS(stream, options);
  fs.unlinkSync(file.filepath);

  return response;
};

export async function POST(req: any) {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    try {
      const response = await saveFile(files.file);
      const { IpfsHash } = response;
      return NextResponse.json({ id: IpfsHash }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
  });
}
