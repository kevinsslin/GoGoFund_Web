import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db";
import { z } from "zod";

// GET /api/users/:address
export async function GET(req: NextRequest, {
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

        return NextResponse.json(
            {
                id: dbUser.id,
                walletAddress: dbUser.walletAddress,
                username: dbUser.username,
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

const updateUserRequestSchema = z.object({
    username: z.string(),
});
type updateUserRequest = z.infer<typeof updateUserRequestSchema>;
// PUT /api/users/:address
export async function PUT(req: NextRequest, {
    params,
}: {
    params: {
        address: string;
    };
},
) {
    const { address } = params;
    const data = await req.json();
    try {
        const { username } = data as updateUserRequest;
        // Get the User
        const dbUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.walletAddress, address),
        });
        if (!dbUser) {
            return NextResponse.json({ error: "User Not Found" }, { status: 404 });
        }

        // Update the User
        const [updateUser] = await db.update(usersTable)
            .set({
                username,
            })
            .where(eq(usersTable.walletAddress, address))
            .returning();
        return NextResponse.json(
            {
                id: updateUser.id,
                walletAddress: updateUser.walletAddress,
                username: updateUser.username,
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