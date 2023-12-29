import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
import { eq, and, not } from "drizzle-orm";
import { db } from "@/db";
import { nftsTable, eventsTable, transactionTable, transactionItemsTable } from "@/db/schema";

// Define a schema for individual transaction items
const transactionItemSchema = z.object({
  nftId: z.string().uuid(), // nftId is a UUID string
  quantity: z.number().min(1), // Quantity should be at least 1
});

// Define the main schema for a transaction request
const postTransactionRequestSchema = z.object({
  userId: z.string().uuid(), // Validate UUID format for user ID
  items: z.array(transactionItemSchema), // Array of transaction items
});

// you can use z.infer to get the typescript type from a zod schema
type PostTransactionRequest = z.infer<typeof postTransactionRequestSchema>;

// POST /api/events/:eventId/transaction
/// create new transaction to Transaction Table add new transaction items to TransactionItems Table
/// update current value of event
/// update supply of nft
export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } },
) {
  const data = await req.json();
  try {
    // parse will throw an error if the data doesn't match the schema
    postTransactionRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { userId, items } = data as PostTransactionRequest;
  const { eventId } = params;
  try {
    //get Event
    const dbEvent = await db.query.eventsTable.findFirst({
      where: and(
        eq(eventsTable.displayId, eventId),
        not(eq(eventsTable.status, "pending")),
      ),
    });
    if (!dbEvent) {
      return NextResponse.json({ error: "Event Not Found" }, { status: 404 });
    }
    // Saving the new transaction to the database
    const [transaction] = await db
      .insert(transactionTable)
      .values({
        userId,
        eventId,
        transactionDate: new Date()?.toString(),
      })
      .returning();

    for (const item of items) {
      // Saving the new transaction items to the database
      await db.insert(transactionItemsTable).values({
        transactionId: transaction.displayId,
        nftId: item.nftId,
        quantity: item.quantity,
      }).execute();

      // Update the NFT table amount
      const dbNFT = await db.query.nftsTable.findFirst({
        where: eq(nftsTable.displayId, item.nftId),
      });
      if (!dbNFT) {
        return NextResponse.json({ error: "NFT Not Found" }, { status: 404 });
      }
      await db.update(nftsTable)
        .set({
          nowAmount: dbNFT.nowAmount + item.quantity,
        })
        .where(eq(nftsTable.displayId, item.nftId))
        .execute();

      // incrementing the currentValue based on the transaction
      await db.update(eventsTable)
        .set({
          currentValue: dbEvent.currentValue + item.quantity*dbNFT.price,
        })
        .where(eq(eventsTable.displayId, eventId))
        .execute();
    }

    // Saving the new transaction items to the database
    
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
