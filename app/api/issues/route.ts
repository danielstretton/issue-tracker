import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssuesSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function GET() {
    const issues = await prisma.issues.findMany();
    return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssuesSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            {
                errors: validation.error.errors.map((error) => {
                    return {
                        path: error.path.join("."),
                        message: error.message,
                    };
                }),
            },
            { status: 400 }
        );
    }

    const newIssue = await prisma.issues.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
