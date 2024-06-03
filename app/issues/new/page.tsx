"use client";
import { Button, Callout, TextField, Text, Spinner } from "@radix-ui/themes";
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
import ErrorMessage from "@/app/components/ErrorMessage";

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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                        setIsSubmitting(true);
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setIsSubmitting(false);
                        setError("An error occurred");
                    }
                })}
            >
                <TextField.Root
                    placeholder="Title"
                    {...register("title")}
                ></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE {...field} placeholder="Description" />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
