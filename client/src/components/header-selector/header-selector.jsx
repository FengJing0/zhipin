import React, {Component} from 'react'
import {List, Grid} from "antd-mobile"
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  constructor(props) {
    super(props)
    this.headerList = []

    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: `头像${i + 1}`,
        icon: require(`../../assets/image/headers/头像${i + 1}.png`)
      })
    }
  }

  state = {
    icon: null
  }

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  handleClick = ({icon,text}) => {
    this.setState({icon})
    this.props.setHeader(text)
  }


  render() {
    const {icon} = this.state
    const listHeader = icon ? (
        <div>
          已选择头像:<img src={icon} alt='header'/>
        </div>
    ) : '请选择头像'

    return (
        <List renderHeader={() => listHeader}>
          <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
        </List>
    )
  }
}