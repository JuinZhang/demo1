import React from "react";
import { request } from "../api/api";
// import Cookie from "js-cookie";
import { addFavorite, deleFavorite } from "../api/favorite";
import "./index.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        articles: []
      },
      style: 0,
      shu: null,
      pianyi: null,
      slug: null
    };
  }
  click(i) {
    request({
      method: "GET",
      url: "/api/articles?limit=20&offset=" + this.state.pianyi,
      params: {}
    }).then(res => {
      this.setState({
        // data: res.data,
        // shu: res.data.articlesCount / res.data.articles.length,
        pianyi: i * res.data.articles.length,
        style: i - 1
      });
    });
  }
  async fnFavorite(data) {
    await this.setState({
      favoritedisabled: true
    });

    console.log(data.favoritesCount);
    if (data.favorited) {
      await deleFavorite(data).then(res => {
        console.log(res, "quxiao");
      });
      data.favorited = false;
      data.favoritesCount += -1;
      let key = this.state.data.articles.indexOf(data);
      this.state.data.articles[key] = data;
      await this.setState({
        //异步
        articles: this.state.data.articles
      });
    } else {
      await addFavorite(data).then(res => {
        console.log(res, "tianjia ");
      });
      data.favorited = true;
      data.favoritesCount += 1;
      await this.setState({
        //异步
        articles: this.state.data.articles
      });
    }
    await this.setState({
      favoritedisabled: false
    });
  }
  componentDidMount() {
    request({
      method: "GET",
      url: "/api/articles?limit=20",
      params: {}
    }).then(res => {
      this.setState({
        data: res.data,
        shu: res.data.articlesCount / res.data.articles.length
      });
    });
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {this.state.data.articles.map((item, index) => {
                return (
                  <div className="article-preview" key={index}>
                    <div className="article-meta">
                      <a href="profile.html">
                        <img src={item.author.image} />
                      </a>
                      <div className="info">
                        <a href="" className="author">
                          {item.author.username}
                        </a>
                        <span className="date">{item.createdAt}</span>
                      </div>
                      <button
                        className="btn btn-outline-primary btn-sm pull-xs-right"
                        onClick={() => {
                          this.fnFavorite(item);
                        }}
                      >
                        <i className="ion-heart"></i> {item.favoritesCount}
                      </button>
                    </div>
                    <a href="" className="preview-link">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <span>Read more...</span>
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
            <nav>
              <ul className="pagination">
                {(() => {
                  let arr = [];
                  for (var i = 0; i < this.state.shu; i++) {
                    arr.push(
                      <li key={i} className="page-item">
                        <a
                          // className="page-link "
                          onClick={this.click.bind(this, i + 1)}
                          className={[
                            "page-link ",
                            this.state.style === i ? "active" : null
                          ].join("")}
                        >
                          {i + 1}
                        </a>
                      </li>
                    );
                  }
                  return arr;
                })()}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
