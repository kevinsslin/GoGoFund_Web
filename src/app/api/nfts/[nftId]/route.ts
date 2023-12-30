import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { nftsTable } from "@/db/schema";

// GET /api/nfts/:eventId
/// Get All NFTs of Event
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      nftId: string;
    };
  },
) {
  const { nftId } = params;
  try {
    const dbNFT = await db.query.nftsTable.findFirst({
      where: eq(nftsTable.displayId, nftId),
    });

    return NextResponse.json({ nft: dbNFT }, { status: 200 });
  } catch (error) {
    console.error("Error getting NFTs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
