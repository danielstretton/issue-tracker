import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Pencil2Icon width="18" height="18" />
            <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    );
};

export default EditIssueButton;