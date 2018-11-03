import './layout.css';
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
// Header, Footer, Sider, Content组件只能放在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;
const Item = Menu.Item;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: 'movies',
      selectedMenuIndex: 0,
      selectedSubmenus: ['f_inTheaters', 'm_chinese', 'b_novel'],
      menus: [
        {
          title: '电影',
          tagName: 'movies',
          submenus: [
            { title: '正在热映', tagName: 'in_theaters', key: 'f_inTheaters' },
            { title: '即将上映', tagName: 'coming_soon', key: 'f_comingSoon' },
            { title: '高分电影', tagName: 'top250', key: 'f_top250' },
            { title: '华语', tagName: '华语', key: 'f_chinese' },
            { title: '欧美', tagName: '欧美', key: 'f_europeUS' },
            { title: '韩国', tagName: '韩国', key: 'f_cantonese' },
            { title: '日本', tagName: '日本', key: 'f_Jap' }
          ]
        },
        {
          title: '音乐',
          tagName: 'music',
          submenus: [
            { title: '华语', tagName: '华语', key: 'm_chinese' },
            { title: '欧美', tagName: '欧美', key: 'm_europeUS' },
            { title: '粤语', tagName: '粤语', key: 'm_cantonese' },
            { title: '韩语', tagName: '韩国', key: 'm_korean' },
            { title: '日语', tagName: '日语', key: 'm_Jap' }
          ]
        },
        {
          title: '图书',
          tagName: 'books',
          submenus: [
            { title: '小说', tagName: '小说', key: 'b_novel' },
            { title: '文学', tagName: '文学', key: 'b_letter' },
            { title: '历史', tagName: '历史', key: 'b_history' },
            { title: '随笔', tagName: '随笔', key: 'b_essay' },
            { title: '漫画', tagName: '漫画', key: 'b_cartoon' }
          ]
        },
      ],
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.getSubmenus = this.getSubmenus.bind(this);
  }
  render() {
    return (
      <div className="layout-container">
        <Layout style={{height: '100%'}}>
          <Sider theme="light">
            <Menu onClick={this.handleMenuClick} selectedKeys={[this.state.selectedMenu]} className="side-menu">
              {this.state.menus.map(menu => (<Item key={menu.tagName}>{menu.title}</Item>))}
            </Menu>
          </Sider>
          <Layout>
            <Header theme="light" style={{ backgroundColor: '#d9d9d9' }}>
              <Menu mode="horizontal" onClick={this.handleSubmenuClick} selectedKeys={this.state.selectedSubmenus} style={{ backgroundColor: '#d9d9d9' }}>
                {this.getSubmenus()}
              </Menu>
            </Header>
            <Content>内容</Content>
            <Footer>底部</Footer>
          </Layout>
        </Layout>

      </div>
    );
  }
  getSubmenus() {
    const menus = this.state.menus;
    const selectedMenu = this.state.selectedMenu;
    let submenus = null;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].tagName === selectedMenu) {
        submenus = menus[i].submenus;
        break;
      }
    }
    if (submenus) {
      return submenus.map(submenu => (<Item key={submenu.key}>{submenu.title}</Item>))
    }
    return null;
  }
  // 一级菜单点击事件
  handleMenuClick(event) {
    const menus = this.state.menus;
    const selectedMenu = event.key;// 一级标题的key
    let selectedMenuIndex = this.state.selectedMenuIndex;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].tagName === selectedMenu) {
        selectedMenuIndex = i;
        break;
      }
    }
    this.setState({
      selectedMenu,
      selectedMenuIndex
    });
  }
  // 二级菜单点击事件
  handleSubmenuClick(event) {
    const selectedSubmenus = this.state.selectedSubmenus;
    let selectedMenuIndex = this.state.selectedMenuIndex;
    selectedSubmenus[selectedMenuIndex] = event.key// 二级标题的key
    this.setState({
      selectedSubmenus
    });
  }
}
export default BasicLayout;