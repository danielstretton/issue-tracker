import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { IssueStatus, issues } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
    searchParams,
}: {
    searchParams: { status: IssueStatus; orderBy: keyof issues };
}) => {
    const columns: {
        label: string;
        value: keyof issues;
        className?: string;
    }[] = [
        {
            label: "Title",
            value: "title",
        },
        {
            label: "Status",
            value: "status",
            className: "hidden md:table-cell",
        },
        {
            label: "Created At",
            value: "createdAt",
            className: "hidden md:table-cell",
        },
    ];

    const statuses = Object.values(IssueStatus);

    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;

    const issues = await prisma.issues.findMany({
        where: {
            status: status,
        },
    });

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell
                                key={column.value}
                                className={column.className}
                            >
                                <NextLink
                                    href={{
                                        query: {
                                            ...searchParams,
                                            orderBy: column.value,
                                        },
                                    }}
                                >
                                    {column.label}
                                </NextLink>
                                {column.value === searchParams.orderBy && (
                                    <ArrowUpIcon className="inline" />
                                )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link
                                    href={`/issues/${issue.id}`}
                                    children={issue.title}
                                />
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuesPage;
