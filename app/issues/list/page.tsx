import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { IssueStatus } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames as columns } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
    const statuses = Object.values(IssueStatus);

    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const orderBy = columns.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc" }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issues.findMany({
        where: {
            status: status,
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issues.count({
        where: {
            status: status,
        },
    });

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                itemCount={issueCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex>
    );
};

export default IssuesPage;
