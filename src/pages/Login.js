import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import * as UserApi from 'api/User';
import * as UserAction from 'store/user';
import BoxForm from 'components/BoxForm';
import FieldInput from 'components/FieldInput';
import FieldButton from 'components/FieldButton';

class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      setUser: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  async onSave(event) {
    event.preventDefault();
    const { actions, history } = this.props;

    try {
      const { data } = await UserApi.login(this.state);

      if (data.success) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.payload));

        actions.setUser({
          token: data.token,
          data: data.payload,
        });

        history.push('/');
      } else {
        console.log('User not finded.');
      }
    } catch (e) {
      console.log('User not finded.');
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const fields = (
      <Fragment>
        <FieldInput id="email" onChange={this.handleChange} />
        <FieldInput id="password" type="password" onChange={this.handleChange} />
        <FieldButton type="submit">Log in</FieldButton>
      </Fragment>
    );

    const footer = (
      <Fragment>
        <span>Do not have an account?</span>
        <Link to="/signup">Sign Up</Link>
      </Fragment>
    );

    return (
      <>
        <Helmet>
          <body className="page-login" />
        </Helmet>
        <BoxForm
          title="withmoney"
          subtitle="Log in"
          onSubmit={this.onSave}
          fields={fields}
          footer={footer}
        />
      </>
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
)(Login);
