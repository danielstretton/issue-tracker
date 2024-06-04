import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
    IssueStatus,
    { label: string; colour: "red" | "violet" | "green" }
> = {
    OPEN: { label: "Open", colour: "red" },
    IN_PROGRESS: { label: "In Progress", colour: "violet" },
    DONE: { label: "Closed", colour: "green" },
};

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
    return (
        <Badge color={statusMap[status].colour}>
            {statusMap[status].label}
        </Badge>
    );
};

export default IssueStatusBadge;
