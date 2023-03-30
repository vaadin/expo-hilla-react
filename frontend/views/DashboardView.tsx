import { Chart } from '@hilla/react-components/Chart.js';

export function DashboardView() {
  return (
    <div className="h-full p-m">
      <h1>Dashboard</h1>
      <Chart type="area" />
    </div>
  );
}
