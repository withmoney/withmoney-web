import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { SingleDatePicker } from 'react-dates';
import { useUserLanguage } from 'hooks/useUser';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

type Props = {
  id: string;
  defaultValue: string;
  onDateChange: (date: Moment) => void;
};

const DatePicker = ({ id, defaultValue, onDateChange }: Props) => {
  const { value: language } = useUserLanguage();

  const [date, setDate] = useState<Moment>(moment());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (language) {
      const time = moment(defaultValue).locale(language);
      setDate(time);
    }
  }, [language]);

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
