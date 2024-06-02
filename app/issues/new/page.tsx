"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface FormData {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<FormData>();

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post("/api/issues", data);
                router.push("/issues");
            })}
        >
            <TextField.Root
                placeholder="Title"
                {...register("title")}
            ></TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE {...field} placeholder="Description" />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
