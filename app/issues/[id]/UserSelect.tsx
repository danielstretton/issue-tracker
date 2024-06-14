"use client";

import { User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const UserSelect = () => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get<User[]>("/api/users").then((response) => response.data),
        staleTime: 60 * 1000,
    });

    if (isLoading) return <Skeleton height="2rem" />;

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
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
