import React, { Fragment } from 'react';
import * as UserApi from '../api/User';
import BoxForm from '../components/BoxForm';
import FieldInput from '../components/FieldInput';
import FieldButton from '../components/FieldButton';

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

  onSave(event) {
    event.preventDefault();
    console.log(this.state);


    UserApi.login(this.state).then(console.log);
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }


  render() {
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

export default Login;
