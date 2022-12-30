import React from "react";
import { TabBar } from "antd-mobile";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../Home";
import Information from "../Information";
import LookFor from "../LookFor";
import My from "../My";
export default class Layout extends React.Component {
  
  state = {
    selectedTab: this.props.match.path,
    hidden: false,
    fullScreen: false,
    List: [
      { id: 1, title: "首页", to: "/layout", tab: "/layout", icon: "icon-ind" },
      {
        id: 2,
        title: "找房",
        to: "/layout/lookfor",
        tab: "/layout/lookfor",
        icon: "icon-findHouse",
      },
      {
        id: 3,
        title: "资讯",
        to: "/layout/information",
        tab: "/layout/information",
        icon: "icon-infom",
      },
      { id: 4, title: "我的", to: "/layout/my", tab: "/layout/my", icon: "icon-my" },
    ],
  };
  render() {
    return (
      <div>
        <Route exact path="/layout" component={Home}></Route>
        <Route path="/layout/lookfor" component={LookFor}></Route>
        <Route path="/layout/information" component={Information}></Route>
        <Route path="/layout/my" component={My}></Route>
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#00ae66"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {this.state.List.map((item) => {
              return (
                <TabBar.Item
                  title={item.title}
                  key={item.id}
                  icon={
                    <NavLink className="to" to={item.to}>
                      <i className={`iconfont ${item.icon}`}></i>
                    </NavLink>
                  }
                  selectedIcon={
                    <div>
                      <i
                        style={{ color: "#00ae66" }}
                        className={`iconfont ${item.icon}`}
                      ></i>
                    </div>
                  }
                  selected={this.state.selectedTab === item.tab}
                  onPress={() => {
                    this.setState({
                      selectedTab: item.tab,
                    });
                  }}
                ></TabBar.Item>
              );
            })}
          </TabBar>
        </div>
      </div>
    );
  }
}
