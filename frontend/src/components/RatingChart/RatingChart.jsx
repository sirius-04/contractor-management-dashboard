import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { contractor: "Hajimi", averageRating: 9.6 },
  { contractor: "Zen Renovations", averageRating: 8.5 },
  { contractor: "ProFix Solutions", averageRating: 7.7 },
  { contractor: "BuildRight Sdn Bhd", averageRating: 7.4 },
  { contractor: "Other Contractors", averageRating: 6.9 },
];


const chartConfig = {
  averageRating: {
    label: "Avg Rating",
  },
};

export default function RatingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contractor Ratings</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 25 }}
            >
              <YAxis
                dataKey="contractor"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey="averageRating" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="averageRating"
                layout="vertical"
                radius={5}
                fill="#a4a8adff"
              />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
