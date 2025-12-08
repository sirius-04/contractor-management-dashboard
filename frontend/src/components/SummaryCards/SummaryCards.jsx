import StatCard from "./StatCard";
import { summaryStats } from "@/data/summary-stats";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {summaryStats.map(stat => 
        <StatCard key={stat.description} title={stat.title} description={stat.description} />
      )}
    </div>
  );
}