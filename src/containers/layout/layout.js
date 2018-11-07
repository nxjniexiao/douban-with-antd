import './layout.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Input } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// 自定义
import { selectMenu, selectSubmenu } from '../../actions/menusData';
import { getClassRes, getSearchRes } from '../../actions/handleResult';
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
    this.search = this.search.bind(this);
  }
  componentWillMount() {
    console.log('layout will mount.');
    // sessionStorage中存储的当前url
    const storageCurrMenuKeyName = sessionStorage.getItem('currMenuKeyName');
    if (storageCurrMenuKeyName) {
      this.props.history.push('/' + storageCurrMenuKeyName);
    } else {
      this.props.history.push('/movie');
    }
    // 加载数据
    const currMenuKeyName = this.props.menusData.currMenuKeyName;// state中当前的一级标题;的keyName
    this.props.getClassRes(currMenuKeyName);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
  }
  render() {
    const menus = this.props.menusData.menus;
    const currMenuKeyName = this.props.menusData.currMenuKeyName;
    const currSubmenuObj = this.props.menusData.currSubmenuObj;
    return (
      <div className="layout-container">
        <Layout style={{ height: '100%' }}>
          <Sider width='150' style={{ backgroundColor: '#d9d9d9' }}>
            <div className="logo">{this.state.logNames[this.props.menusData.currMenuKeyName]}</div>
            <Menu onClick={this.handleMenuClick} selectedKeys={[currMenuKeyName]} className="side-menu" style={{ backgroundColor: '#d9d9d9' }}>
              {menus.map(menu => (<Item key={menu.keyName}><Link to={'/' + menu.keyName}>{menu.title}</Link></Item>))}
            </Menu>
          </Sider>
          <Content>
            <div className="search-wrapper">
              <Search className="search"
                placeholder={'搜索' + this.state.logNames[this.props.menusData.currMenuKeyName]}
                onSearch={value => this.search(value)}
                style={{ width: 400, margin: '10px 0' }}
              />
            </div>
            <Layout>
              <Header style={{ backgroundColor: '#F0F2F5' }}>
                {/search/.test(this.props.location.pathname) ?
                  '搜索结果' :
                  <Menu mode="horizontal" onClick={this.handleSubmenuClick} selectedKeys={[currSubmenuObj[currMenuKeyName].keyName]} style={{ backgroundColor: '#F0F2F5' }}>
                    {this.getActiveSubmenus()}
                  </Menu>
                }
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
    const currMenuKeyName = this.props.menusData.currMenuKeyName;
    let submenus = null;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].keyName === currMenuKeyName) {
        submenus = menus[i].submenus;
        break;
      }
    }
    if (submenus) {
      return submenus.map(submenu => (<Item key={submenu.keyName}>{submenu.title}</Item>))
    }
    return null;
  }
  // 一级菜单点击事件
  handleMenuClick(event) {
    const newMenuTagName = event.key;// 新的一级标题;的keyName
    const currMenuKeyName = this.props.menusData.currMenuKeyName;// state中当前的一级标题;的keyName
    if (newMenuTagName !== currMenuKeyName) {
      // 一级标题发生了变化
      this.props.selectMenu(newMenuTagName);// 同步 dispatch
      this.props.getClassRes(newMenuTagName);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
    }
  }
  // 二级菜单点击事件
  handleSubmenuClick(event) {
    const currMenuKeyName = this.props.menusData.currMenuKeyName;// state中当前的一级标题;的keyName
    const newSubmenuTagName = event.key// 新的二级标题;的keyName
    const currSubmenuObj = this.props.menusData.currSubmenuObj;
    const currSubmenuTagName = currSubmenuObj[currMenuKeyName].keyName;// state中当前的二级标题;的keyName
    if (newSubmenuTagName !== currSubmenuTagName) {
      // 二级标题发生了改变
      this.props.selectSubmenu(newSubmenuTagName);// 同步 dispatch
      this.props.getClassRes(currMenuKeyName, false);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
    }
  }
  // 监听搜索
  search(keyword) {
    if (keyword) {
      const currMenuKeyName = this.props.menusData.currMenuKeyName;// state中当前的一级标题;的keyName
      this.props.getSearchRes(currMenuKeyName, keyword, false);// 异步 dispatch: 请求数据(传入name参数: 'movie' 'music' 'book')
      this.props.history.push('/search');
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
    selectMenu: (keyName) => dispatch(selectMenu(keyName)),
    selectSubmenu: (keyName) => dispatch(selectSubmenu(keyName)),
    getClassRes: (name, isLoadingMore) => dispatch(getClassRes(name, isLoadingMore)),
    getSearchRes: (name, keyword, isLoadingMore) => dispatch(getSearchRes(name, keyword, isLoadingMore))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicLayout));