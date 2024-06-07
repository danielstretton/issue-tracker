import { Box, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton height="2rem" mb="2" />
            <Skeleton height="20rem" />
        </Box>
    );
};

export default IssueFormSkeleton;
