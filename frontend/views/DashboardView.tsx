import { Chart } from '@hilla/react-components/Chart.js';
import { ComboBox } from '@hilla/react-components/ComboBox.js';

export function DashboardView() {
  return (
    <div className="h-full p-m">
      <h1>Dashboard</h1>
      <Chart type="area" />
    </div>
  );
}
