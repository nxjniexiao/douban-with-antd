import './layout.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Input } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// 自定义
import { selectMenu, selectSubmenu } from '../../actions/menusData';
import { getClassRes } from '../../actions/handleResult';
import Dashboard from '../../components/dashboard/dashboard';
// Header, Footer, Sider, Content组件只能放在Layout组件模块下
const { Sider, Header, Content } = Layout;
const Item = Menu.Item;
const Search = Input.Search;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logNames: {
        movie: '电影',
        music: '音乐',
        book: '读书'
      }
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.getActiveSubmenus = this.getActiveSubmenus.bind(this);
  }
  componentWillMount() {
    console.log('layout will mount.');
    // sessionStorage中存储的当前url
    const storageCurrMenuTagName = sessionStorage.getItem('currMenuTagName');
    if (storageCurrMenuTagName) {
      this.props.history.push('/' + storageCurrMenuTagName);
    } else {
      this.props.history.push('/movie');
    }
  }
  render() {
    const menus = this.props.menusData.menus;
    const currMenuTagName = this.props.menusData.currMenuTagName;
    const currSubmenuTagNames = this.props.menusData.currSubmenuTagNames;
    return (
      <div className="layout-container">
        <Layout style={{ height: '100%' }}>
          <Sider width='150' style={{ backgroundColor: '#d9d9d9' }}>
            <div className="logo">{this.state.logNames[this.props.menusData.currMenuTagName]}</div>
            <Menu onClick={this.handleMenuClick} selectedKeys={[currMenuTagName]} className="side-menu" style={{ backgroundColor: '#d9d9d9' }}>
              {menus.map(menu => (<Item key={menu.tagName}><Link to={'/' + menu.tagName}>{menu.title}</Link></Item>))}
            </Menu>
          </Sider>
          <Content>
            <div className="search-wrapper">
              <Search className="search"
                placeholder={'搜索' + this.state.logNames[this.props.menusData.currMenuTagName]}
                onSearch={value => console.log(value)}
                style={{ width: 400, margin: '10px 0' }}
              />
            </div>
            <Layout>
              <Header style={{ backgroundColor: '#F0F2F5' }}>
                <Menu mode="horizontal" onClick={this.handleSubmenuClick} selectedKeys={[currSubmenuTagNames[currMenuTagName]]} style={{ backgroundColor: '#F0F2F5' }}>
                  {this.getActiveSubmenus()}
                </Menu>
              </Header>
              <Content>
                <Dashboard />
              </Content>
            </Layout>
          </Content>
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
    const newMenuTagName = event.key;// 新的一级标题的tagName
    const currMenuTagName = this.props.menusData.currMenuTagName;// state中当前的一级标题的tagName
    if(newMenuTagName !== currMenuTagName) {
      // 一级标题发生了变化
      this.props.selectMenu(newMenuTagName);// 同步 dispatch
      this.props.getClassRes(newMenuTagName);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
    }
  }
  // 二级菜单点击事件
  handleSubmenuClick(event) {
    const currMenuTagName = this.props.menusData.currMenuTagName;// state中当前的一级标题的tagName
    const newSubmenuTagName = event.key// 新的二级标题的tagName
    const currSubmenuTagNames = this.props.menusData.currSubmenuTagNames;
    const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];// state中当前的二级标题的tagName
    if(newSubmenuTagName !== currSubmenuTagName) {
      // 二级标题发生了改变
      this.props.selectSubmenu(newSubmenuTagName);// 同步 dispatch
      this.props.getClassRes(currMenuTagName);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
    }
  }
}
const mapStateToProps = state => {
  return {
    menusData: state.menusData
  }
};
const mapDispatchToProps = dispatch => {
  return {
    selectMenu: (tagName) => dispatch(selectMenu(tagName)),
    selectSubmenu: (tagName) => dispatch(selectSubmenu(tagName)),
    getClassRes: (name) => dispatch(getClassRes(name))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicLayout));