
import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Simple LineChart component wrapper
export const LineChart = ({ 
  data,
  lines,
  xAxis = { dataKey: 'name' },
  title,
  description,
  height = 300,
  grid = true,
  legend = true
}: {
  data: any[];
  lines: { dataKey: string; stroke: string; name?: string }[];
  xAxis?: { dataKey: string };
  title?: string;
  description?: string;
  height?: number;
  grid?: boolean;
  legend?: boolean;
}) => {
  const content = (
    <div style={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          <XAxis dataKey={xAxis.dataKey} />
          <YAxis />
          <Tooltip />
          {legend && <Legend />}
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name || line.dataKey}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );

  // If title is provided, wrap in a Card, otherwise just return the chart
  if (title) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
};

export default LineChart;
