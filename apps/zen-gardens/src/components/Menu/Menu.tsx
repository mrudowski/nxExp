import {Menu as MantineMenu, MenuProps} from '@mantine/core';

const Menu = (props: MenuProps) => {
  return <MantineMenu withArrow offset={0} arrowSize={8} width={240} {...props} />;
};

Menu.Target = MantineMenu.Target;
Menu.Label = MantineMenu.Label;
Menu.Dropdown = MantineMenu.Dropdown;
Menu.Item = MantineMenu.Item;

export default Menu;
