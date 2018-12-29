import React, {Component} from 'react'
import {Route, Switch, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import Cookies from 'js-cookie'

import LaobanInfo from "../laoban-info/laoban-info"
import DashenInfo from "../dashen-info/dashen-info"
import Dashen from "../dashen/dashen"
import Laoban from "../laoban/laoban"
import Personal from "../personal/personal"
import Message from "../message/message"

import {getUser} from "../../redux/actions"


import {getRedirectTo} from "../../utils"
import NotFound from "../../components/not-fount/not-fount"
import {NavBar} from "antd-mobile"
import NavFooter from "../../components/nav-footer/nav-footer"


class Main extends Component {

  componentDidMount() {
    const userid = Cookies.get('userid')
    const {_id} = this.props.user

    if (userid && !_id) {
      this.props.getUser()
    }

  }

  navList = [
    {
      path:'/laoban',
      component:Laoban,
      title:'大神列表',
      icon:'dashen',
      text:'大神'
    },
    {
      path:'/dashen',
      component:Dashen,
      title:'老板列表',
      icon:'laoban',
      text:'老板'
    },
    {
      path:'/message',
      component:Message,
      title:'消息列表',
      icon:'message',
      text:'消息'
    },
    {
      path:'/personal',
      component:Personal,
      title:'用户中心',
      icon:'personal',
      text:'个人'
    }
  ]


  render() {
    const userid = Cookies.get('userid')
    const {user} = this.props

    if (!userid) {
      return <Redirect to='/login'/>
    }

    if (!user._id) {
      return null
    } else {
      let path = this.props.location.pathname

      if (path === '/') {
        path = getRedirectTo(user.type, user.headers)
        return <Redirect to={path}/>
      }
    }

    const navList = this.navList
    // console.log(navList.map(e=>{
    //   e.path = e.path.substr(1)
    //   return e
    // }))
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path===path)

    if(currentNav){
      if(user.type === 'laoban'){
        navList[1].hide = true
      }else{
        navList[0].hide = true
      }
    }


    return (
        <div>
          {currentNav?<NavBar className='stick-header'>{currentNav.title}</NavBar>:null}
          <Switch>
            {
              navList.map((nav,index) => <Route path={nav.path} component={nav.component} key={index}/>)
            }
            <Route path='/laobanInfo' component={LaobanInfo}/>
            <Route path='/dashenInfo' component={DashenInfo}/>
            <Route component={NotFound}/>
          </Switch>
          {currentNav?<NavFooter navList={navList}/>:null}
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)