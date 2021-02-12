export function currencyFormat(lang: string, currency: string | undefined, number: number) {
  return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(number);
}

export function currencyReverseFormatString(lang: string, currency: string, money: string) {
  const separatorDecimal = new Intl.NumberFormat(lang, {
    style: 'decimal',
  })
    .format(11.11)
    .replace(/\d/g, '');

  const separatorThousands = new Intl.NumberFormat(lang, {
    style: 'decimal',
  })
    .format(1111)
    .replace(/\d/g, '');

  const symbolOnLeft = new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
  })
    .format(1)
    .replace(new RegExp(`\\d|[${separatorDecimal}${separatorThousands}]*`, 'g'), '');

  const stringNumber = money
    .replace(new RegExp(`[${separatorThousands}]`, 'g'), '')
    .replace(separatorDecimal, '.')
    .replace(new RegExp(`[${symbolOnLeft}]`, 'g'), '');
  return stringNumber;
}

export function currencyReverseFormat(lang: string, currency: string, money: string) {
  return parseFloat(currencyReverseFormatString(lang, currency, money));
}

export const inputCurrencyFormat = (value: string) => {
  if (value.length) {
    const valueStr = value.replace(/[^0-9]/g, '').padStart(3, '0');

    if (Number.isNaN(parseInt(valueStr, 10))) {
      return 0;
    }

    return parseFloat([valueStr.substr(0, valueStr.length - 2), valueStr.substr(-2)].join('.'));
  }

  return 0;
};
