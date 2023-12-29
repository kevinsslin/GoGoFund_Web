import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  usersTable,
  eventsTable,
  transactionTable,
  transactionItemsTable,
} from "@/db/schema";

interface TransactionItem {
    nftId: string;
    quantity: number;
  }
  
  interface Transaction {
    id: number;
    displayId: string;
    transactionDate: string;
    items: TransactionItem[];
  }
  
  interface Event {
    displayId: string;
    title: string;
    startDate: string;
    endDate: string;
    targetValue: number;
    currentValue: number;
    currency: string;
    imageSrc: string;
    transactions: Transaction[];
  }

// Get /api/mycollection/:address
/// Get EventDetail and NFTs what you have
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
    const eventsWithTransactions: { [eventId: string]: Event } = {};
    for (const dbTransaction of dbTransactions) {
        let event = eventsWithTransactions[dbTransaction.eventId];
        if (!event) {
            const dbEvent = await db.query.eventsTable.findFirst({
              where: eq(eventsTable.displayId, dbTransaction.eventId),
            });
            if (!dbEvent) continue;
    
            event = {
              ...dbEvent, // Spread the dbEvent properties here
              transactions: [],
            };
    
            eventsWithTransactions[dbTransaction.eventId] = event;
          }
  
        const dbTransactionItems = await db.query.transactionItemsTable.findMany({
          where: eq(transactionItemsTable.transactionId, dbTransaction.displayId),
        });
  
        // Add the current transaction to the event
        event.transactions.push({
            id: dbTransaction.id,
            displayId: dbTransaction.displayId,
            transactionDate: dbTransaction.transactionDate,
            items: dbTransactionItems.map(item => ({
              nftId: item.nftId,
              quantity: item.quantity,
            })),
          });
      }

      return NextResponse.json(Object.values(eventsWithTransactions), { status: 200 });
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