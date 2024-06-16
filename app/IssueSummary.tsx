import { IssueStatus } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
    open: number;
    inProgress: number;
    done: number;
}

const IssueSummary = ({ open, done, inProgress }: Props) => {
    const containers: {
        label: string;
        value: number;
        color: "red" | "violet" | "green";
        status: IssueStatus;
    }[] = [
        { label: "Open", value: open, color: "red", status: IssueStatus.OPEN },
        {
            label: "In Progress",
            value: inProgress,
            color: "violet",
            status: IssueStatus.IN_PROGRESS,
        },
        {
            label: "Done",
            value: done,
            color: "green",
            status: IssueStatus.DONE,
        },
    ];
    return (
        <Flex gap="4">
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction="column" gap="1">
                        <Link
                            className="text-sm font-medium"
                            href={`/issues/list?status=${container.status}`}
                        >
                            {container.label} issues
                        </Link>
                        <Text
                            size="5"
                            color={container.color}
                            className="font-bold"
                        >
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary;
