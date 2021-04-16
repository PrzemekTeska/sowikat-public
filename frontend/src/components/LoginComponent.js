import React, { Component } from "react";
import BookingService from "../services/BookingService";

class login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    const user_object = {
      username: username,
      password: password
    };

    BookingService.authenticate(user_object).then(res => {
      localStorage.setItem("authorization", res.data.token);
      
      
      if(res.status===200) {
        this.props.history.push('/admin/bookings');
        window.location.reload();
    }
    })
  };

  changeUsernameHandler = (event) => {
    this.setState({username: event.target.value})
  }

  changePasswordHandler = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div>
        <div class="wrapper" id="login-wrapper">
          <form class="form-signin" onSubmit={this.handleFormSubmit}>
            <h2 class="form-signin-heading">Panel logowania</h2>
            <div className="form-group">
              <input type="text"
                class="form-control"
                placeholder="login"
                value={this.state.username}
                onChange={this.changeUsernameHandler}
              />
            </div>
            <div className="form-group">
              <input type="password"
                class="form-control"
                placeholder="hasło"
                value={this.state.password}
                onChange={this.changePasswordHandler}
              />
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default login;