import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  usersTable,
  eventsTable,
  transactionTable,
  transactionItemsTable,
} from "@/db/schema";

// POST /api/transactions/:address
export async function GET(
  res: NextRequest,
  { params }: { params: { address: string } },
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
    const dbTransactions = await db.query.transactionTable.findMany({
      where: eq(transactionTable.userId, dbUser.displayId),
    });
    if (!dbTransactions) {
      return NextResponse.json(
        { error: "Transaction Not Found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      dbTransactions.map(async (dbTransaction) => {
        const dbEvent = await db.query.eventsTable.findFirst({
          where: eq(eventsTable.displayId, dbTransaction.eventId),
        });
        if (!dbEvent) {
          return NextResponse.json(
            { error: "Event Not Found" },
            { status: 404 },
          );
        }
        const dbTransactiionItems =
          await db.query.transactionItemsTable.findMany({
            where: eq(
              transactionItemsTable.transactionId,
              dbTransaction.displayId,
            ),
          });
        return {
          id: dbTransaction.id,
          displayId: dbTransaction.displayId,
          eventId: dbTransaction.eventId,
          transactionDate: dbTransaction.transactionDate,
          items: dbTransactiionItems.map((dbTransactiionItem) => ({
            nftId: dbTransactiionItem.nftId,
            quantity: dbTransactiionItem.quantity,
          })),
          event: {
            displayId: dbEvent.displayId,
            title: dbEvent.title,
            startDate: dbEvent.startDate,
            endDate: dbEvent.endDate,
            targetValue: dbEvent.targetValue,
            currentValue: dbEvent.currentValue,
            currency: dbEvent.currency,
            imageSrc: dbEvent.imageSrc,
          },
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
