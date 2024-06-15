"use client";

import { User, issues } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserSelect = ({ issue }: { issue: issues }) => {
    const { data: users, isLoading } = useUsers();

    const assignUserToIssue = (userId: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: userId !== "unassigned" ? userId : null,
            })
            .catch(() => {
                toast.error("Failed to assign user");
            });
    };

    if (isLoading) return <Skeleton height="2rem" />;

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={assignUserToIssue}
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
            <Toaster />
        </>
    );
};

const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get<User[]>("/api/users").then((response) => response.data),
        staleTime: 60 * 1000,
    });
};

export default UserSelect;
