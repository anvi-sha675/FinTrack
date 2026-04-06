import SummaryCards from "../components/ui/SummaryCards";
import BalanceTrend from "../components/charts/BalanceTrend";
import SpendingDonut from "../components/charts/SpendingDonut";
import KeyInsights from "../components/ui/KeyInsights";
import MonthlyBar from "../components/charts/MonthlyBar";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1280px] w-full">
      {/* Row 1 – Summary cards */}
      <SummaryCards />

      {/* Row 2 – Balance trend */}
      <BalanceTrend />

      {/* Row 3 – Donut + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <SpendingDonut />
        <KeyInsights />
      </div>

      {/* Row 4 – Monthly bar*/}
      <MonthlyBar />
    </div>
  );
}
