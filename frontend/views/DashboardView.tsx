import { Chart } from '@hilla/react-components/Chart.js';
import { ChartSeries } from '@hilla/react-components/ChartSeries.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';
import { Select } from '@hilla/react-components/Select.js';
import Metric from 'Frontend/generated/com/example/application/data/service/dashboard/Metric.js';
import OrderInfo from 'Frontend/generated/com/example/application/data/service/dashboard/OrderInfo.js';
import { DashboardEndpoint } from 'Frontend/generated/endpoints.js';
import { useContext, useEffect, useState } from 'react';

export function DashboardView() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo[]>([]);

  const years = [
    { label: '2023' },
    { label: '2022' },
    { label: '2021' },
    { label: '2020' },
  ];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    const fetchData = async () => {
      DashboardEndpoint.getMetrics().onNext((metrics) => {
        setMetrics(metrics);
      });
      setOrderInfo(await DashboardEndpoint.getOrderInfo());
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-m">
      <div className="flex justify-between flex-wrap">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="flex flex-col items-start gap-s p-m"
            style={{ width: '120px' }}>
            <h2 className="font-normal m-0 text-secondary text-xs">
              {metric.name}
            </h2>
            <span className="font-semibold text-3xl">
              {metric.value.toLocaleString('en-US', {
                maximumFractionDigits: metric.fractionDigits,
              })}
              {metric.unit}
            </span>
            <span
              className={`badge ${metric.change > 0 ? 'success' : 'error'}`}>
              <Icon
                className="box-border p-xs"
                icon={
                  metric.change > 0 ? 'vaadin:arrow-up' : 'vaadin:arrow-down'
                }
              />
              <span>
                {metric.change.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between p-m">
          <div>
            <h2 className="text-xl m-0">Orders</h2>
            <span className="text-secondary text-xs">
              Cumulative (city/month)
            </span>
          </div>
          <Select items={years} value="2023" />
        </div>
        {orderInfo && (
          <Chart categories={monthNames} type="area">
            {orderInfo.map((orderInfoItem) => (
              <ChartSeries
                key={orderInfoItem.city}
                title={orderInfoItem.city}
                values={orderInfoItem.values}
              />
            ))}
          </Chart>
        )}
      </div>
    </div>
  );
}
