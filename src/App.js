import React from "react";
import { BrowserRouter, Route , Link , Redirect} from 'react-router-dom'
import Layout from './Pages/Layout'
import Detail from './Pages/Detail'
import Login from './Pages/Login'
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect exact from="/" to='/layout'></Redirect>
          <Route path='/layout' component={Layout}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path='/login' component={Login}></Route>
        </div>
      </BrowserRouter>
    )
  }
}
