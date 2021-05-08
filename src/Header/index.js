import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Cookie from "js-cookie";
import Pubsub from "pubsub-js";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ""
    };
  }
  componentDidMount() {
    var that = this;
    //将Cookie中的auth  和   state中的auth 进行合并
    Pubsub.subscribe("auth", function(msg, data) {
      // console.log(msg,data);
      that.setState({
        auth: data
      });
    });
  }
  render() {
    if (Cookie.get("auth")) {
      return (
        <div>
          <nav className="navbar navbar-light">
            <div className="container">
              <a className="navbar-brand" href="">
                conduit
              </a>

              <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/editor">
                    <i className="ion-compose"></i>&nbsp;New Article
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    juinZhang
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-light">
            <div className="container">
              <a className="navbar-brand" href="index.html">
                conduit
              </a>
              <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Sign up
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}
export default Header;
