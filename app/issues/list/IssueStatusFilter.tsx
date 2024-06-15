"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: IssueStatus }[] = [
    { label: "Open", value: "OPEN" },
    { label: "Done", value: "DONE" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
    const router = useRouter();

    return (
        <Select.Root
            onValueChange={(status) => {
                const query = status === "ALL" ? "" : `?status=${status}`;
                router.push("/issues/list" + query);
            }}
        >
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Status</Select.Label>
                    <Select.Item value="ALL">All</Select.Item>
                    {statuses.map((status) => (
                        <Select.Item key={status.value} value={status.value!}>
                            {status.label}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
