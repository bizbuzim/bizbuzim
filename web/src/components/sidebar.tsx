import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export const Sidebar: React.FC = () => {
  const { logout } = useAuth0();
  return (
    <ProSidebar>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>
            <Link to={"/"}>Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"expenses"}>Expenses</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"sources"}>Source</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <Button
          onClick={() => logout()}
          variant="contained"
          endIcon={<LogoutIcon />}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Log Out
        </Button>
      </SidebarFooter>
    </ProSidebar>
  );
};
