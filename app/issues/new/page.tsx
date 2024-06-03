"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "@/app/validationSchemas";
import { z } from "zod";

type FormData = z.infer<typeof createIssuesSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(createIssuesSchema),
    });
    const [error, setError] = useState("");
    return (
        <div className="max-w-xl ">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <AiFillAlert />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className="max-w-xl space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setError("An error occurred");
                    }
                })}
            >
                <TextField.Root
                    placeholder="Title"
                    {...register("title")}
                ></TextField.Root>
                {errors.title && (
                    <Text color="red" as="p">
                        {errors.title.message}
                    </Text>
                )}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE {...field} placeholder="Description" />
                    )}
                />
                {errors.description && (
                    <Text color="red" as="p">
                        {errors.description.message}
                    </Text>
                )}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
