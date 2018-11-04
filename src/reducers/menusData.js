import { SELECT_MENU, SELECT_SUBMENU } from '../actions/menusData';

// 获取sessionStorage
const storageCurrMenuTagName = sessionStorage.getItem('currMenuTagName');
let storageCurrSubmenuKeys = sessionStorage.getItem('currSubmenuKeys');
if(storageCurrSubmenuKeys){
  storageCurrSubmenuKeys = storageCurrSubmenuKeys.split('&');
}
const currMenuTagName = storageCurrMenuTagName || 'movies';
const currSubmenuKeys = storageCurrSubmenuKeys || ['f_inTheaters', 'm_chinese', 'b_novel'];
const initMenusData = {
  currMenuTagName,
  currSubmenuKeys,
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
  ]
};
const menusData = (state = initMenusData, action) => {
  const type = action.type;
  switch (type) {
    case SELECT_MENU:
      sessionStorage.setItem('currMenuTagName', action.tagName); //存储sessionStorage
      return {
        ...state,
        currMenuTagName: action.tagName
      };
    case SELECT_SUBMENU:
      const currSubmenuKeys = state.currSubmenuKeys;
      const key = action.key;
      const reg = new RegExp('^' + key.slice(0, 2));
      for (let i = 0; i < currSubmenuKeys.length; i++) {
        if (reg.test(currSubmenuKeys[i])) {
          currSubmenuKeys[i] = key;
          break;
        }
      }
      sessionStorage.setItem('currSubmenuKeys', currSubmenuKeys.join('&')); //存储sessionStorage
      return {
        ...state,
        currSubmenuKeys
      };
    default:
      return state;
  }
}
export default menusData;