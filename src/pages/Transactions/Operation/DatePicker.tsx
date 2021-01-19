import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { SingleDatePicker } from 'react-dates';
import { Operation } from '../../../models';
import { LANG } from '../../../constants/currency';
import 'react-dates/lib/css/_datepicker.css';
import './style/react_dates_overrides.css';
import { useUpdateOperation } from '../../../hooks/useOperations';

type Props = {
  operation: Operation;
};

const DatePicker = ({ operation }: Props) => {
  const data = moment(operation.paidAt).locale(LANG);
  const [date, setDate] = useState<Moment>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { updateOperation } = useUpdateOperation();
  const format = date.localeData().longDateFormat('L');

  const updateDate = (date: Moment) => {
    setDate(date);
    updateOperation({
      variables: {
        id: operation.id,
        name: operation.name,
        type: operation.type,
        accountId: operation.account.id,
        categoryId: operation.category ? operation.category.id : '',
        value: operation.value,
        isPaid: operation.isPaid,
        paidAt: moment(date).format(),
      },
    });
  };

  return (
    <SingleDatePicker
      noBorder={true}
      block={true}
      date={date}
      onDateChange={(date) => updateDate(moment(date))}
      focused={isOpen}
      onFocusChange={({ focused }) => setIsOpen(focused)}
      id={operation.id}
      numberOfMonths={1}
      horizontalMargin={50}
      displayFormat={format}
    />
  );
};

export default DatePicker;
