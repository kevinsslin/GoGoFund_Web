import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, eventsTable } from "@/db/schema";

// GET /api/events/myevents/:address
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

    return NextResponse.json(
      dbEvents.map((dbEvent) => ({
        displayId: dbEvent.displayId,
        title: dbEvent.title,
        startDate: dbEvent.startDate,
        endDate: dbEvent.endDate,
        targetValue: dbEvent.targetValue,
        currentValue: dbEvent.currentValue,
        currency: dbEvent.currency,
        imageSrc: dbEvent.imageSrc,
      })),
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
