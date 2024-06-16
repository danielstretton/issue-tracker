import { IssueStatus } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
    const isOpen = await prisma.issues.count({ where: { status: "OPEN" } });
    const isDone = await prisma.issues.count({ where: { status: "DONE" } });
    const isInProgress = await prisma.issues.count({
        where: { status: "IN_PROGRESS" },
    });

    return (
        <IssueChart open={isOpen} inProgress={isInProgress} done={isDone} />
        // <IssueSummary open={isOpen} inProgress={isInProgress} done={isDone} />
    );

    // return <LatestIssues />;
}
