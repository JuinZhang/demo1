import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Article from "./Article";
import Login from "./Login";
import Settings from "./Settings";
import Profile from "./Profile";
import Cookie from "js-cookie";
import Pubsub from "pubsub-js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ""
    };
  }
  componentDidMount() {
    var that = this;
    Pubsub.subscribe("auth", function(mag, date) {
      that.setState({
        auth: date
      });
    });
  }
  render() {
    if (Cookie.get("auth")) {
      return (
        <div>
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/editor" component={Article}></Route>
              <Route exact path="/register" component={Home}></Route>
              <Route exact path="/login" component={Home}></Route>
              <Route exact path="/settings" component={Settings}></Route>
              <Route exact path="/profile" component={Profile}></Route>
            </Switch>
            <Footer></Footer>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/editor" component={Home}></Route>
              <Route exact path="/register" component={Login}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/settings" component={Home}></Route>
              <Route exact path="/profile" component={Home}></Route>
            </Switch>
            <Footer></Footer>
          </Router>
        </div>
      );
    }
  }
}
export default App;
