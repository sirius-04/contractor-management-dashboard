import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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
import { useState, useEffect } from "react";
import { getTopRatedContractors } from "@/services/ContractorService";

const chartConfig = {
  averageRating: {
    label: "Avg Rating",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
};

export default function RatingChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {
    const response = await getTopRatedContractors();
    setChartData(response.data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contractor Ratings</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="contractor"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="averageRating" type="number" domain={[0, 5]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="averageRating"
              layout="vertical"
              fill="var(--color-averageRating)"
              radius={4}
            >
              <LabelList
                dataKey="contractor"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="averageRating"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}