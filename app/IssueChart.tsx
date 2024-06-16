"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
    open: number;
    inProgress: number;
    done: number;
}

const IssueChart = ({ open, inProgress, done }: Props) => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={[
                        { label: "Open", value: open },
                        { label: "In Progress", value: inProgress },
                        { label: "Done", value: done },
                    ]}
                >
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar
                        dataKey="value"
                        style={{ fill: "var(--accent-9)" }}
                        barSize="60"
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;
