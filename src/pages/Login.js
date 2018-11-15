import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserApi from '../api/User';
import * as UserAction from '../store/modules/user';
import BoxForm from '../components/BoxForm';
import FieldInput from '../components/FieldInput';
import FieldButton from '../components/FieldButton';

console.log(UserAction);

class Login extends React.Component {
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
    const { actions } = this.props;
    try {

      const { data } = await UserApi.login(this.state);

      if (data.success) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.payload));

        actions.setUser({
          token: data.token,
          data: data.payload,
        });
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
    console.log(this.props)
    return (
      <BoxForm
        title="withmoney"
        subtitle="Log in"
        onSubmit={this.onSave}
        fields={(
          <Fragment>
            <FieldInput id="email" onChange={this.handleChange} />
            <FieldInput id="password" type="password" onChange={this.handleChange} />
            <FieldButton type="submit">
              Log in
            </FieldButton>
          </Fragment>
        )}
        footer={(
          <Fragment>
            <span>Do not have an account?</span>
            <a href="#">Signup</a>
          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
