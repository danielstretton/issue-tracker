import { IssueStatus } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

export default async function Home() {
    const isOpen = await prisma.issues.count({ where: { status: "OPEN" } });
    const isDone = await prisma.issues.count({ where: { status: "DONE" } });
    const isInProgress = await prisma.issues.count({
        where: { status: "IN_PROGRESS" },
    });

    return (
        <IssueSummary open={isOpen} inProgress={isInProgress} done={isDone} />
    );

    // return <LatestIssues />;
}
