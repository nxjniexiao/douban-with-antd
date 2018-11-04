import './layout.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
// 自定义
import {selectMenu, selectSubmenu} from '../../actions/menusData';
import {getClassRes} from '../../actions/handleResult';
import Dashboard from '../../components/dashboard/dashboard';
// Header, Footer, Sider, Content组件只能放在Layout组件模块下
const { Sider, Header, Content } = Layout;
const Item = Menu.Item;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.getActiveSubmenus = this.getActiveSubmenus.bind(this);
  }
  componentWillMount() {
    console.log('layout will mount.');
    // sessionStorage中存储的当前url
    const storageCurrMenuTagName = sessionStorage.getItem('currMenuTagName');
    if(storageCurrMenuTagName){
      this.props.history.push('/' + storageCurrMenuTagName);
    } else {
      this.props.history.push('/movies');
    }
  }
  render() {
    const menus = this.props.menusData.menus;
    const currMenuTagName = this.props.menusData.currMenuTagName;
    const currSubmenuTagNames = this.props.menusData.currSubmenuTagNames;
    return (
      <div className="layout-container">
        <Layout style={{height: '100%'}}>
          <Sider theme="light">
            <Menu onClick={this.handleMenuClick} selectedKeys={[currMenuTagName]} className="side-menu">
              {menus.map(menu => (<Item key={menu.tagName}><Link to={'/' + menu.tagName}>{menu.title}</Link></Item>))}
            </Menu>
          </Sider>
          <Layout>
            <Header theme="light" style={{ backgroundColor: '#d9d9d9' }}>
              <Menu mode="horizontal" onClick={this.handleSubmenuClick} selectedKeys={[currSubmenuTagNames[currMenuTagName]]} style={{ backgroundColor: '#d9d9d9' }}>
                {this.getActiveSubmenus()}
              </Menu>
            </Header>
            <Content>
              <Dashboard />
            </Content>
          </Layout>
        </Layout>

      </div>
    );
  }
  getActiveSubmenus() {
    const menus = this.props.menusData.menus;
    const currMenuTagName = this.props.menusData.currMenuTagName;
    let submenus = null;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].tagName === currMenuTagName) {
        submenus = menus[i].submenus;
        break;
      }
    }
    if (submenus) {
      return submenus.map(submenu => (<Item key={submenu.tagName}>{submenu.title}</Item>))
    }
    return null;
  }
  // 一级菜单点击事件
  handleMenuClick(event) {
    const menuTagName = event.key;// 一级标题的tagName
    this.props.selectMenu(menuTagName);// 同步 dispatch
    this.props.getClassRes(menuTagName);// 异步 dispatch: 请求数据
  }
  // 二级菜单点击事件
  handleSubmenuClick(event) {
    const menuTagName = this.props.menusData.menuTagName;
    const submenuTagName = event.key// 二级标题的tagName
    this.props.selectSubmenu(submenuTagName);// 同步 dispatch
    this.props.getClassRes(menuTagName);// 异步 dispatch: 请求数据
  }
}
const mapStateToProps = state => {
  return {
    menusData: state.menusData
  }
};
const mapDispatchToProps = dispatch => {
  return {
    selectMenu: (key) => dispatch(selectMenu(key)),
    selectSubmenu: (key) => dispatch(selectSubmenu(key)),
    getClassRes: (name) => dispatch(getClassRes(name))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicLayout));