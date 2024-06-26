import AuthOptions from "@/app/auth/AuthOptions";
import { patchIssuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    {
        params,
    }: {
        params: {
            id: string;
        };
    }
) {
    const session = await getServerSession(AuthOptions);
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in to create an issue" },
            { status: 401 }
        );
    }

    const body = await req.json();

    const validation = patchIssuesSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.errors },
            { status: 400 }
        );
    }

    const { title, description, assignedToUserId } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user) {
            return NextResponse.json("Invalid User", { status: 400 });
        }
    }

    const issue = await prisma.issues.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json("Issue not found", { status: 404 });
    }

    const updatedIssue = await prisma.issues.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title,
            description,
            assignedToUserId,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    req: NextRequest,
    {
        params,
    }: {
        params: {
            id: string;
        };
    }
) {
    const session = await getServerSession(AuthOptions);
    if (!session) {
        return NextResponse.json(
            { error: "You must be logged in to create an issue" },
            { status: 401 }
        );
    }

    const issue = await prisma.issues.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json("Issue not found", { status: 404 });
    }

    await prisma.issues.delete({
        where: {
            id: parseInt(params.id),
        },
    });

    return NextResponse.json({});
}
