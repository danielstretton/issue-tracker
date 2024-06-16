import { IssueStatus } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
    const isOpen = await prisma.issues.count({ where: { status: "OPEN" } });
    const isDone = await prisma.issues.count({ where: { status: "DONE" } });
    const isInProgress = await prisma.issues.count({
        where: { status: "IN_PROGRESS" },
    });

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
            <Flex direction="column" gap="4">
                <IssueSummary
                    open={isOpen}
                    inProgress={isInProgress}
                    done={isDone}
                />
                <IssueChart
                    open={isOpen}
                    inProgress={isInProgress}
                    done={isDone}
                />
            </Flex>
            <LatestIssues />
        </Grid>
    );
}
