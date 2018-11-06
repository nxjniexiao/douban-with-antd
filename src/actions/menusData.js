export const SELECT_MENU = 'SELECT_MENU';
export const SELECT_SUBMENU = 'SELECT_SUBMENU';

export function selectMenu(menuKeyName){
  return {
    type: SELECT_MENU,
    menuKeyName
  };
}
export function selectSubmenu(submenuKeyName){
  return {
    type: SELECT_SUBMENU,
    submenuKeyName
  };
}