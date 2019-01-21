import React from 'react';
import PercentBar from './PercentBar';

const InOutPercent = () => (
  <div className="inout-percent">
    <div className="inout-percent__type">
      <div className="inout-percent__info">
        <div className="inout-percent__total">Total In: $ 5,000.00</div>
        <div className="inout-percent__done">$450.34</div>
      </div>
      <PercentBar type="in" percent="33%" />
    </div>
    <div className="inout-percent__type">
      <div className="inout-percent__info">
        <div className="inout-percent__total">Total In: $ 5,000.00</div>
        <div className="inout-percent__done">$450.34</div>
      </div>
      <PercentBar type="out" percent="80%" />
    </div>
  </div>
);

export default InOutPercent;
