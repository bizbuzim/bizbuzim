import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SourceIcon from "@mui/icons-material/Source";

export const Sidebar: React.FC = () => {
  const { logout } = useAuth0();
  const [collapsed, setCollapsed] = useState(false);
  const collapsedExpendIcon = collapsed ? (
    <ArrowRightIcon fontSize="large" onClick={() => setCollapsed(false)} />
  ) : (
    <ArrowLeftIcon fontSize="large" onClick={() => setCollapsed(true)} />
  );
  return (
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader style={{ display: "flex", justifyContent: "flex-end" }}>
        {collapsedExpendIcon}
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<HomeIcon />}>
            <Link to={"/"}>Home</Link>
          </MenuItem>
          <MenuItem icon={<AccountBalanceIcon />}>
            <Link to={"expenses"}>Expenses</Link>
          </MenuItem>
          <MenuItem icon={<SourceIcon />}>
            <Link to={"sources"}>Source</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <Logout collapsed={collapsed} onClick={logout} />
      <SidebarFooter style={{ textAlign: "center" }}></SidebarFooter>
    </ProSidebar>
  );
};

const Logout: React.FC<{ collapsed: boolean; onClick(): void }> = ({
  collapsed,
  onClick,
}) => {
  if (collapsed) {
    return <LogoutIcon onClick={() => onClick()} />;
  }
  return (
    <Button
      onClick={() => onClick()}
      variant="contained"
      endIcon={<LogoutIcon />}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      Log Out
    </Button>
  );
};
