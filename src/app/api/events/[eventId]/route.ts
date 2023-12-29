import { NextResponse, type NextRequest } from "next/server";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { eventsTable, usersTable } from "@/db/schema";

// GET /api/events/:eventId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      eventId: string;
    };
  },
) {
  const { eventId } = params;
  try {
    // Get the Event
    const dbEvent = await db.query.eventsTable.findFirst({
      where: eq(eventsTable.displayId, eventId),
    });
    if (!dbEvent) {
      return NextResponse.json({ error: "Event Not Found" }, { status: 404 });
    }

    const dbNFTs = await db.query.nftsTable.findMany({
      where: eq(eventsTable.displayId, eventId),
    });

    return NextResponse.json(
      {
        id: dbEvent.id,
        eventAddress: dbEvent.eventAddress,
        title: dbEvent.title,
        description: dbEvent.description,
        startDate: dbEvent.startDate,
        endDate: dbEvent.endDate,
        targetValue: dbEvent.targetValue,
        currentValue: dbEvent.currentValue,
        currency: dbEvent.currency,
        imageSrc: dbEvent.imageSrc,
        nfts: dbNFTs.map((dbNFT) => ({
          displayId: dbNFT.displayId,
          name: dbNFT.name,
          totalAmount: dbNFT.totalAmount,
          nowAmount: dbNFT.nowAmount,
          price: dbNFT.price,
          description: dbNFT.description,
          imageSrc: dbNFT.imageSrc,
        })),
      },
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

const updateEventRequestSchema = z.object({
  address: z.string(),
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
});
type updateEventRequest = z.infer<typeof updateEventRequestSchema>;

// PUT /api/Events/:eventId
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      eventId: string;
    };
  },
) {
  const { eventId } = params;
  const data = await req.json();
  try {
    const { address, title, description, imageSrc } =
      data as updateEventRequest;
    // Get the User
    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.walletAddress, address),
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    // Get the Event
    const dbEvent = await db.query.eventsTable.findFirst({
      where: and(
        eq(eventsTable.displayId, eventId),
        eq(eventsTable.userId, dbUser.displayId),
      ),
    });
    if (!dbEvent) {
      return NextResponse.json({ error: "Event Not Found" }, { status: 404 });
    }

    // Update the Event
    const [updateEvent] = await db
      .update(eventsTable)
      .set({
        title,
        description,
        imageSrc,
      })
      .where(eq(eventsTable.displayId, eventId))
      .returning();

    return NextResponse.json(
      {
        id: updateEvent.id,
        title: updateEvent.title,
        description: updateEvent.description,
        imageSrc: updateEvent.imageSrc,
      },
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
