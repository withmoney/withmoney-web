/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as UserApi from 'api/User';
import * as UserAction from 'store/user';
import BoxForm from 'components/BoxForm';
import FieldInput from 'components/FieldInput';
import FieldButton from 'components/FieldButton';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      message: '',
    };
  }

  async onSave(event) {
    event.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      this.setState({
        message: 'Please confirm your password',
      });
      throw new Error('Please confirm your password');
    }

    try {
      await UserApi.signup({
        name,
        email,
        password,
      });

      this.setState({
        message: 'Your signup with success, please wait til the managers enabled you account.',
      });
    } catch (error) {
      console.error(error);
      this.setState({
        message: error.response.data.message,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  renderFields() {
    return (
      <Fragment>
        <FieldInput id="name" onChange={this.handleChange} placeholder="name" />
        <FieldInput id="email" onChange={this.handleChange} placeholder="email" />
        <FieldInput
          id="password"
          type="password"
          onChange={this.handleChange}
          placeholder="password"
        />
        <FieldInput
          id="passwordConfirm"
          type="password"
          onChange={this.handleChange}
          placeholder="confirm your password"
        />
        <FieldButton type="submit">Sign Up</FieldButton>
      </Fragment>
    );
  }

  render() {
    const { message } = this.state;

    const footer = (
      <Fragment>
        <span>Do Already have an account?</span>
        <Link to="/login">Log In</Link>
      </Fragment>
    );

    return (
      <Fragment>
        <Helmet>
          <title>Signup</title>
          <body className="page-signup" />
        </Helmet>
        <BoxForm
          title="withmoney"
          subtitle="Sign Up"
          onSubmit={this.onSave}
          message={message}
          fields={this.renderFields()}
          footer={footer}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
