import React, { Component } from "react";
import { request } from "../api/api";
import Cookie from "js-cookie";
import Pubsub from "pubsub-js";
class A extends React.Component {
  constructor(props) {
    super(props);
  }
  blur(event) {
    var value = event.target.value;

    Pubsub.publish("value", value);
  }
  render() {
    return (
      <div>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="your name"
            onBlur={this.blur.bind(this)}
          />
        </fieldset>
      </div>
    );
  }
}
export default class Login extends Component {
  password(e) {
    this.setState({ password: e.target.value });
  }
  email(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username ? this.setState.username : "",
      email: this.state.email,
      password: this.state.password
    };
    request({
      method: "POST",
      url: this.state.username ? "/api/users" : "/api/users/login",
      // url: "/api/users",
      data: {
        user: user
      }
    }).then(res => {
      Cookie.set("auth", res.data.user.token);
      // console.log('--',this);
      //跳转路由
      this.props.history.push("/");
      //发布
      Pubsub.publish("auth", res.data.user.token);
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "2448614775@qq.com",
      password: "zhangjiale123456!"
    };
  }
  componentDidMount() {
    Pubsub.subscribe("value", (mag, data) => {
      this.setState({
        username: data
      });
      console.log(this.state.username);
    });
  }
  isLogin() {
    return this.props.match.path === "/login";
  }
  render() {
    return (
      <div>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">
                  {this.isLogin() ? "Sign in" : "Sign up"}
                </h1>
                <p className="text-xs-center">
                  {this.isLogin() ? "Need an account" : " Have an account"}
                </p>
                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  {this.isLogin() ? "" : <A />}
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      onBlur={this.email.bind(this)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      onBlur={this.password.bind(this)}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    {this.isLogin() ? " Sign in" : "  Sign up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
