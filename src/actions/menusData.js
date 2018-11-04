export const SELECT_MENU = 'SELECT_MENU';
export const SELECT_SUBMENU = 'SELECT_SUBMENU';

export function selectMenu(menuTagName){
  return {
    type: SELECT_MENU,
    menuTagName
  };
}
export function selectSubmenu(submenuTagName){
  return {
    type: SELECT_SUBMENU,
    submenuTagName
  };
}