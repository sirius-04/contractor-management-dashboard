import StatCard from "./StatCard";
import { useState, useEffect } from "react";
import { getSummary } from "@/services/ContractorService";

export default function SummaryCards() {
  const [summaryStats, setSummaryStats] = useState([]);

  useEffect(() => {
    fetchSummaryStats();
  }, []);

  const fetchSummaryStats = async () => {
    const response = await getSummary();
    setSummaryStats(response.data);
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {summaryStats.map(stat => 
        <StatCard key={stat.description} title={stat.title} description={stat.description} />
      )}
    </div>
  );
}