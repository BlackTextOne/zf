import React from "react";
import "./style.min.css";
import img1 from "../../assets/image/nav-1.png";
import img2 from "../../assets/image/nav-2.png";
import img3 from "../../assets/image/nav-3.png";
import img4 from "../../assets/image/nav-4.png";
import { Carousel, WingBlank } from "antd-mobile";
import { getSwiper, getGroups, getNews } from "../../api/home";

export default class Home extends React.Component {
  state = {
    //租房小组
    group: [],
    // 轮播图
    data: [],
    //资讯
    ts: [],
  };
  async componentDidMount() {
    // 获取轮播图
    const res = await getSwiper();
    console.log("轮播图", res.data.body);
    this.setState({
      data: res.data.body,
    });
    //获取租房小组
    const res1 = await getGroups({ area: "AREA|88cff55c-aaa4-e2e0" });
    console.log("租房小组", res1.data.body);
    this.setState({
      group: res1.data.body,
    });
    //获取最新资讯
    const res2 = await getNews({ area: "AREA|88cff55c-aaa4-e2e0" });
    console.log("首页资讯", res2.data.body);
    this.setState({
      ts: res2.data.body,
    });
  }
  render() {
    return (
      <div className="home-container">
        {/* 轮播 */}
        <div className="seeding">
          <Carousel autoplay={true} infinite>
            {this.state.data.map((val) => (
              <a
                className="lbA"
                key={val.id}
                href="#"
                style={{ display: "inline-block", width: "100%" }}
              >
                <img
                  src={`http://localhost:8080${val.imgSrc}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </a>
            ))}
          </Carousel>
        </div>
        {/* 分类 */}
        <ul className="classification">
          <li>
            <div className="img">
              <img src={img1} />
            </div>
            <p>整租</p>
          </li>
          <li>
            <div className="img">
              <img src={img2} />
            </div>
            <p>合租</p>
          </li>
          <li>
            <div className="img">
              <img src={img3} />
            </div>
            <p>地图找房</p>
          </li>
          <li>
            <div className="img">
              <img src={img4} />
            </div>
            <p>去出租</p>
          </li>
        </ul>
        {/* 租房小组 */}
        <div className="group">
          <div className="title">
            <p>租房小组</p>
            <span>更多</span>
          </div>
          <div className="content">
            <ul>
              {this.state.group.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <div className="img">
                      <img src={`http://localhost:8080${item.imgSrc}`} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* 最新资讯 */}
        <div className="newTx">
          <div className="title">
            <p>最新资讯</p>
          </div>
          {this.state.ts.map((item) => {
            return (
              <div className="content" key={item.id}>
                <div className="img">
                  <img src={`http://localhost:8080${item.imgSrc}`} />
                </div>
                <div className="text">
                  <div className="text-top">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="text-down">
                    <span className="from">{item.from}</span>
                    <span className="date">{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
