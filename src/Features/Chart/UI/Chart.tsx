import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getMeasurements, getSelectedMetrics } from '../Core/selectors';
import { CustomTooltip } from './CustomTooltip';

const lineColors: Record<any, string> = {
  casingPressure: '##f54242',
  flareTemp: '#ecf542',
  injValveOpen: '#42f551',
  oilTemp: '#42f5f2',
  tubingPressure: '#aa42f5',
  waterTemp: '#f542d1',
};

export const Chart = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  const measurements = useSelector(getMeasurements);

  if (selectedMetrics.length === 0 || Object.keys(measurements).length === 0) return <div />;
  return (
    <ResponsiveContainer width="85%" height={750}>
      <LineChart>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="at" tickFormatter={(value) => moment(value).format('HH:mm')} />

        <Tooltip content={<CustomTooltip />} />
        {selectedMetrics.map(metric => (
          <>
            <YAxis tickCount={10} scale="auto" type="number" unit={measurements[metric][0].unit} yAxisId={metric} />
            <Line data={measurements[metric]} yAxisId={metric} type="monotone" dataKey="value" stroke={lineColors[metric]} />
          </>
        ))}

      </LineChart>
    </ResponsiveContainer>
  );
};
