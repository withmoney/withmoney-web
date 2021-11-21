import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

interface Data {
  name: string;
  total: number;
  entrada: number;
  saida: number;
}

type Props = {
  data: Data[];
};

const SimpleLineChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="entrada" barSize={10} fill="#219653" />
        <Bar dataKey="saida" barSize={10} fill="#E98686" />
        <Area type="monotone" dataKey="total" fill="#F5AD40" stroke="#F5AD40" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
