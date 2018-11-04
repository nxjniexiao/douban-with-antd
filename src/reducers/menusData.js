import { SELECT_MENU, SELECT_SUBMENU } from '../actions/menusData';

// 获取sessionStorage
const storageCurrMenuTagName = sessionStorage.getItem('currMenuTagName');
let storageCurrSubmenuTagNames = sessionStorage.getItem('currSubmenuTagNames');
if (storageCurrSubmenuTagNames) {
  storageCurrSubmenuTagNames = JSON.parse(storageCurrSubmenuTagNames);
}
const currMenuTagName = storageCurrMenuTagName || 'movie';
const currSubmenuTagNames = storageCurrSubmenuTagNames || { movie: 'in_theaters', music: '华语', book: '小说' };
const initMenusData = {
  currMenuTagName,
  currSubmenuTagNames,// {movie: 'in_theaters', music: '华语', book: '小说'}
  menus: [
    {
      title: '电影',
      tagName: 'movie',
      submenus: [
        { title: '正在热映', tagName: 'in_theaters' },
        { title: '即将上映', tagName: 'coming_soon' },
        { title: '高分电影', tagName: 'top250' },
        { title: '华语', tagName: '华语' },
        { title: '欧美', tagName: '欧美' },
        { title: '韩国', tagName: '韩国' },
        { title: '日本', tagName: '日本' }
      ]
    },
    {
      title: '音乐',
      tagName: 'music',
      submenus: [
        { title: '华语', tagName: '华语' },
        { title: '欧美', tagName: '欧美' },
        { title: '粤语', tagName: '粤语' },
        { title: '韩语', tagName: '韩国' },
        { title: '日语', tagName: '日语' }
      ]
    },
    {
      title: '图书',
      tagName: 'book',
      submenus: [
        { title: '小说', tagName: '小说' },
        { title: '文学', tagName: '文学' },
        { title: '历史', tagName: '历史' },
        { title: '随笔', tagName: '随笔' },
        { title: '漫画', tagName: '漫画' }
      ]
    },
  ]
};
const menusData = (state = initMenusData, action) => {
  const type = action.type;
  switch (type) {
    case SELECT_MENU:
      sessionStorage.setItem('currMenuTagName', action.menuTagName); //存储sessionStorage
      return {
        ...state,
        currMenuTagName: action.menuTagName
      };
    case SELECT_SUBMENU:
      const menuTagName = state.currMenuTagName;// 当前一级标题的 tagName
      const currSubmenuTagNames = state.currSubmenuTagNames;// 当前所有二级标题的 tagNames
      const newSubmenuTagName = action.submenuTagName;// 当前要修改的二级标题的 tagName
      // const newCurrSubmenuTagNames = Object.assign({}, currSubmenuTagNames, { [menuTagName]: newSubmenuTagName});
      const newCurrSubmenuTagNames = {
        ...currSubmenuTagNames,
        [menuTagName]: newSubmenuTagName
      };
      sessionStorage.setItem('currSubmenuTagNames', JSON.stringify(newCurrSubmenuTagNames)); //存储sessionStorage
      return {
        ...state,
        currSubmenuTagNames: newCurrSubmenuTagNames
      };
    default:
      return state;
  }
}
export default menusData;