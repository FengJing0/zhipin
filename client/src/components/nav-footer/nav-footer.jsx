import React, {Component} from 'react'
import {TabBar} from "antd-mobile"
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom"


const Item = TabBar.Item


class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    const navList = this.props.navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname
    return (
        <TabBar>
          {
            navList.map((nav, index) => (
                <Item key={index}
                      title={nav.text}
                      icon={{uri: require(`../../assets/image/nav/${nav.icon}.png`)}}
                      selectedIcon={{uri: require(`../../assets/image/nav/${nav.icon}-selected.png`)}}
                      selected={path === nav.path}
                      onPress={() => this.props.history.replace(nav.path)}/>
            ))
          }
        </TabBar>
    )
  }
}

export default withRouter(NavFooter)