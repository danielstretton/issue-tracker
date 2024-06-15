"use client";
import { ErrorMessage } from "@/app/components";
import { issuesSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { issues } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillAlert } from "react-icons/ai";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issuesSchema>;

const IssueForm = ({ issue }: { issue?: issues }) => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(issuesSchema),
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data);
                router.push(`/issues/${issue.id}`);
            } else {
                await axios.post("/api/issues", data);
                router.push("/issues/list");
                router.refresh();
            }
        } catch (error) {
            setIsSubmitting(false);
            setError("An error occurred");
        }
    });

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
            <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
                <TextField.Root
                    placeholder="Title"
                    defaultValue={issue?.title}
                    {...register("title")}
                ></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE {...field} placeholder="Description" />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "Submit New Issue"}{" "}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};
export const dynamice = "force-dynamic";

export default IssueForm;
