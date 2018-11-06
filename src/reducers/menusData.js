import { SELECT_MENU, SELECT_SUBMENU } from '../actions/menusData';

// 获取sessionStorage
const storageCurrMenuKeyName = sessionStorage.getItem('currMenuKeyName');
let storageCurrSubmenuObj = sessionStorage.getItem('currSubmenuObj');
if (storageCurrSubmenuObj) {
  storageCurrSubmenuObj = JSON.parse(storageCurrSubmenuObj);
}
const initSubmenuObj = {
  movie: { keyName: 'in_theaters', title: '正在热映' },
  music: { keyName: 'china', title: '华语' },
  book: { keyName: 'novel', title: '小说' }
};
const currMenuKeyName = storageCurrMenuKeyName || 'movie';
const currSubmenuObj = storageCurrSubmenuObj || initSubmenuObj;
const initMenusData = {
  currMenuKeyName,// 'movie'
  currSubmenuObj,
  menus: [
    {
      title: '电影',
      keyName: 'movie',
      submenus: [
        { title: '正在热映', keyName: 'in_theaters' },
        { title: '即将上映', keyName: 'coming_soon' },
        { title: '高分电影', keyName: 'top250' },
        { title: '华语', keyName: 'china' },
        { title: '欧美', keyName: 'europeUS' },
        { title: '韩国', keyName: 'korean' },
        { title: '日本', keyName: 'japan' }
      ]
    },
    {
      title: '音乐',
      keyName: 'music',
      submenus: [
        { title: '华语', keyName: 'china' },
        { title: '欧美', keyName: 'europeUS' },
        { title: '粤语', keyName: 'cantonese' },
        { title: '韩语', keyName: 'korean' },
        { title: '日语', keyName: 'japan' }
      ]
    },
    {
      title: '图书',
      keyName: 'book',
      submenus: [
        { title: '小说', keyName: 'novel' },
        { title: '文学', keyName: 'literature' },
        { title: '历史', keyName: 'history' },
        { title: '随笔', keyName: 'essay' },
        { title: '漫画', keyName: 'comic' }
      ]
    },
  ]
};
const menusData = (state = initMenusData, action) => {
  const type = action.type;
  switch (type) {
    case SELECT_MENU:
      sessionStorage.setItem('currMenuKeyName', action.menuKeyName); //存储sessionStorage
      return {
        ...state,
        currMenuKeyName: action.menuKeyName
      };
    case SELECT_SUBMENU:
      const newcurrSubmenuObj = _handleSubmenu(state, action);
      return {
        ...state,
        currSubmenuObj: newcurrSubmenuObj
      };
    default:
      return state;
  }
}
function _handleSubmenu(state, action) {
  const currMenuKeyName = state.currMenuKeyName;// 当前一级标题的 keyName
  const currSubmenuObj = state.currSubmenuObj;// 当前二级标题( 对象:{movie:{},music:{},book:{}} )
  const newSubmenuKeyName = action.submenuKeyName;// 新二级标题的 keyName
  const menus = state.menus;// 所有一级、二级标题
  const currMenuObj = _getObjByKeyName(menus, currMenuKeyName);
  const newSubmenuObj = _getObjByKeyName(currMenuObj.submenus, newSubmenuKeyName);
  // const newcurrSubmenuObj = Object.assign({}, currSubmenuObj, { [menuKeyName]: newSubmenuKeyName});
  const newcurrSubmenuObj = {
    ...currSubmenuObj,
    [currMenuKeyName]: newSubmenuObj
  };
  sessionStorage.setItem('currSubmenuObj', JSON.stringify(newcurrSubmenuObj)); //存储sessionStorage
  return newcurrSubmenuObj;
}
// 根据keyName取出数组中的一个对象
function _getObjByKeyName(arr, keyName){
  for(let i = 0; i<arr.length; i++){
    if(arr[i].keyName === keyName){
      return arr[i];
    }
  }
}
export default menusData;