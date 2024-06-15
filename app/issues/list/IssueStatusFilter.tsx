"use client";

import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: IssueStatus }[] = [
    { label: "Open", value: "OPEN" },
    { label: "Done", value: "DONE" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root
            defaultValue={searchParams.get("status") || ""}
            onValueChange={(status) => {
                const params = new URLSearchParams();

                if (status !== "ALL") params.append("status", status);

                if (searchParams)
                    params.append("orderBy", searchParams.get("orderBy")!);

                const query = params.size ? `?${params.toString()}` : "";

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
