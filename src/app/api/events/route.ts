import { NextResponse, type NextRequest } from "next/server";

import { eq, not } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable, eventsTable } from "@/db/schema";

// import { privateEnv } from "@/lib/env/private";
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
// async function uploadToPinata(formData: FormData) {
//     try {
//       const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${privateEnv.PINATA_JWT}`, // Replace with your actual JWT token
//         }
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   }

const postEventRequestSchema = z.object({
  address: z.string(),
  title: z.string(),
  description: z.string(),
  startDate: z.number(),
  endDate: z.number(),
  targetValue: z.number().min(0),
  currency: z.enum(["USD", "BTC", "NTD"]),
  image: z.string(),
});
// you can use z.infer to get the typescript type from a zod schema
type PostEventRequest = z.infer<typeof postEventRequestSchema>;

// POST /api/events
export async function POST(req: NextRequest) {
  console.log("POST /api/events");
  const data = await req.json();
  try {
    // parse will throw an error if the data doesn't match the schema
    postEventRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    if (error instanceof z.ZodError) {
      console.error(error.errors);
    } else {
      console.error(error);
    }
    return NextResponse.json({ error: "Invalid Zod request" }, { status: 400 });
  }
  const {
    address,
    title,
    description,
    startDate,
    endDate,
    targetValue,
    currency,
    image,
  } = data as PostEventRequest;
  try {
    console.log("try to upload image to pinata");
    // const formData = new FormData();

    // formData.append('file', file)

    // const pinataMetadata = JSON.stringify({
    //   name: 'File name',
    // });
    // formData.append('pinataMetadata', pinataMetadata);

    // const pinataOptions = JSON.stringify({
    //   cidVersion: 0,
    // });
    // formData.append('pinataOptions', pinataOptions);

    // const res = await uploadToPinata(formData);

    // const imageSrc = res.IpfsHash;

    // Get the User
    const dbUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.walletAddress, address),
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    // create event
    const newEventId = await db
      .insert(eventsTable)
      .values({
        userId: dbUser.displayId,
        title,
        description,
        startDate: startDate?.toString(),
        endDate: endDate?.toString(),
        targetValue,
        currentValue: 0,
        currency,
        imageSrc: image,
        status: "pending",
      })
      .execute();

    return NextResponse.json({ id: newEventId }, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/events
export async function GET() {
  try {
    const dbEvents = await db.query.eventsTable.findMany({
      where: not(eq(eventsTable.status, "pending")),
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
    console.error("Error getting events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
