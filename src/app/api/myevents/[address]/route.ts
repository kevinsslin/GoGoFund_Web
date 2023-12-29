import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, eventsTable, nftsTable } from "@/db/schema";

// GET /api/events/myevents/:address
/// Get My Events and associated NFTs
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      address: string;
    };
  },
) {
  const { address } = params;
  try {
    // Get the User
    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.walletAddress, address),
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    // Get the Events
    const dbEvents = await db.query.eventsTable.findMany({
      where: eq(eventsTable.userId, dbUser.displayId),
    });
    if (!dbEvents) {
      return NextResponse.json({ error: "Events Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      dbEvents.map((dbEvent) => {
        const dbNft = db.query.nftsTable.findMany({
          where: eq(nftsTable.eventId, dbEvent.displayId),
        });
        return {
          id: dbEvent.id,
          displayId: dbEvent.displayId,
          title: dbEvent.title,
          startDate: dbEvent.startDate,
          endDate: dbEvent.endDate,
          targetValue: dbEvent.targetValue,
          currentValue: dbEvent.currentValue,
          currency: dbEvent.currency,
          imageSrc: dbEvent.imageSrc,
          nfts: dbNft,
        };
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
