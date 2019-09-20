import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

const BoxForm = ({ title, subtitle, fields, footer, message, onSubmit }) => (
  <div className="box-form">
    <h1 className="box-form__title">{title}</h1>
    <form className="box-form__form" onSubmit={onSubmit}>
      <h3 className="box-form__subtitle">{subtitle}</h3>
      <Alert message={message} />
      {fields}
      <div className="box-form__footer">{footer}</div>
    </form>
  </div>
);

BoxForm.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  message: PropTypes.string,
  fields: PropTypes.any.isRequired,
  footer: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

BoxForm.defaultProps = {
  message: '',
};

export default BoxForm;
