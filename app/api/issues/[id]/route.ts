import { issuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { NEVER } from "zod";

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
    const body = await req.json();

    const validation = issuesSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            { errors: validation.error.errors },
            { status: 400 }
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

    const updatedIssue = await prisma.issues.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title: body.title,
            description: body.description,
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
