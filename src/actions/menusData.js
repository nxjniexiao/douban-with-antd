export const SELECT_MENU = 'SELECT_MENU';
export const SELECT_SUBMENU = 'SELECT_SUBMENU';

export function selectMenu(tagName){
  return {
    type: SELECT_MENU,
    tagName
  };
}
export function selectSubmenu(key){
  return {
    type: SELECT_SUBMENU,
    key
  };
}