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
    };
  }

  async onSave(event) {
    event.preventDefault();
    const { password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      throw new Error('please confirm your password');
    }

    try {
      await UserApi.signup(this.state);

      console.log(
        'Your signup with success, please wait til the administratos enabled you account.',
      );
    } catch (e) {
      console.log("Error, It's not possible create your account at this moment.");
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
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
