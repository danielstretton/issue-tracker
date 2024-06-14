"use client";

import { User, issues } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserSelect = ({ issue }: { issue: issues }) => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get<User[]>("/api/users").then((response) => response.data),
        staleTime: 60 * 1000,
    });

    if (isLoading) return <Skeleton height="2rem" />;

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || "unassigned"}
            onValueChange={(userId) =>
                axios.patch("/api/issues/" + issue.id, {
                    assignedToUserId: userId !== "unassigned" ? userId : null,
                })
            }
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default UserSelect;
