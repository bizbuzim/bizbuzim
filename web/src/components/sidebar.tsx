import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

export function Sidebar() {
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem>
          <Link to={"/"}>Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"expenses"}>Expenses</Link>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}
