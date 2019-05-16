import calc from 'app/utils/calc';

describe('Calc', () => {
  const transactions = [
    {
      value: '10.37',
      type: 'in',
    },
    {
      value: '10.00',
      type: 'in',
    },
    {
      value: '01.57',
      type: 'out',
    },
    {
      value: '100.00',
      type: 'out',
    },
  ];

  it('should sum all transactions', () => {
    expect(calc.sumAllTransactions(transactions)).toBe('$121.94');
  });

  it('should sum all in transactions', () => {
    expect(calc.sumAllInTransactions(transactions)).toBe('$20.37');
  });

  it('should sum all out transactions', () => {
    expect(calc.sumAllOutTransactions(transactions)).toBe('$101.57');
  });
});
