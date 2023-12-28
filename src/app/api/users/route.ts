import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const postUserRequestSchema = z.object({
  walletAddress: z.string(),
  username: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type PostUserRequest = z.infer<typeof postUserRequestSchema>;

// POST /api/users
export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    postUserRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { walletAddress, username } = data as PostUserRequest;
  try {
    // Saving the new user to the database
    const userId = await db
      .insert(usersTable)
      .values({
        walletAddress,
        username,
      })
      .execute();

    return NextResponse.json({ id: userId }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
