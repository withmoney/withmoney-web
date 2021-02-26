import React from 'react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { filterCategories } from 'utils/FilterOperations';
import { TransactionType } from 'models';

type Props = {
  type: TransactionType;
  operations: any;
  categories: any;
};

const PieGraph = ({ type, operations, categories }: Props) => {
  const data = filterCategories(type, categories, operations);

  const option: EChartsOption = {
    title: {
      show: false,
      text: `withmoney ${type === TransactionType.Deposit ? 'Incomes' : 'Expanses'}`,
    },
    tooltip: {
      trigger: 'item',
      formatter: `{a} <br/>{b} ({d}%)`,
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
        name: type === TransactionType.Deposit ? 'Income' : 'Expanse',
        type: 'pie',
        data: data.length ? data : [{ value: 0, name: '' }],
        center: ['50%', '50%'],
        radius: [0, '65%'],

        label: {
          alignTo: 'edge',
          trigger: 'item',
          formatter: '{name|{b}}\n{percent|{d}%}',
          fontSize: 14,
          minMargin: 20,
          edgeDistance: 10,
          lineHeight: 18,
          rich: {
            percent: {
              fontSize: 14,
              color: '#999',
            },
            name: {
              fontSize: 16,
              color: '#363636',
              fontWeight: 700,
            },
          },
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
