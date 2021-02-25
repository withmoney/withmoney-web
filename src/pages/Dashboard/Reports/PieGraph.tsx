import React from 'react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { filterCategories } from 'utils/FilterOperations';

type Props = {
  incomes: boolean;
};

const PieGraph = ({ incomes }: Props) => {
  const data = filterCategories(incomes);

  const option: EChartsOption = {
    title: {
      show: false,
      text: `Withmoney ${incomes ? 'Incomes' : 'Expanses'}`,
    },
    tooltip: {
      trigger: 'item',
      formatter: `{a} <br/>{b} : {c} ({d}%)`,
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true, title: 'Save' },
      },
    },
    calculable: true,
    series: [
      {
        name: incomes ? 'Income' : 'Expense',
        type: 'pie',
        data: data.length ? data : [{ value: 0, name: '' }],
        center: ['50%', '50%'],
        radius: [0, '65%'],

        label: {
          formatter: '{b} ({d})%',
          fontSize: 14,
          fontWeight: 700,
        },
        emphasis: {
          itemStyle: {
            shadowOffsetX: 0,
          },
        },
      },
    ],
  };
  return <ReactECharts style={{ height: '48%', width: '48%', float: 'left' }} option={option} />;
};

export default PieGraph;
