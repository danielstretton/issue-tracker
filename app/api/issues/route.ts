import AuthOptions from "@/app/auth/AuthOptions";
import { issuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const issues = await prisma.issues.findMany();
    return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in to create an issue" },
            { status: 401 }
        );
    }
    const body = await request.json();
    const validation = issuesSchema.safeParse(body);

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
