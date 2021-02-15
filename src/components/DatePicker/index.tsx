import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { SingleDatePicker } from 'react-dates';
import { LANG } from '../../constants/Langs';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

type Props = {
  id: string;
  defaultValue: string;
  onDateChange: (date: Moment) => void;
};

const DatePicker = ({ id, defaultValue, onDateChange }: Props) => {
  const value = moment(defaultValue).locale(LANG);
  const [date, setDate] = useState<Moment>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const format = date.localeData().longDateFormat('L');

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setDate(date);
      onDateChange(date);
    }
  };

  return (
    <SingleDatePicker
      noBorder={true}
      block={true}
      date={date}
      onDateChange={handleDateChange}
      focused={isOpen}
      onFocusChange={({ focused }) => setIsOpen(focused)}
      id={id}
      numberOfMonths={1}
      horizontalMargin={50}
      displayFormat={format}
      isOutsideRange={() => false}
    />
  );
};

export default DatePicker;
