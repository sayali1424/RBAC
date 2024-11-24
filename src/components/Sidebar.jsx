import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Tooltip } from "react-tooltip"; // React tooltip import
import './Sidebar.css'; // Adjust the path if necessary


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={isCollapsed ? collapsedSidebarStyle : sidebarStyle}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={toggleButtonStyle}
        aria-label="Toggle Sidebar"
      >
        <AiOutlineMenu />
      </button>

      {/* Sidebar Header */}
      {!isCollapsed && (
        <h2 style={sidebarHeaderStyle}>Admin Dashboard</h2>
      )}

      {/* Sidebar Links */}
      <ul style={sidebarListStyle}>
        <li style={sidebarItemStyle}>
          <NavLink
            to="/dashboard"
            style={sidebarLinkStyle}
            activeClassName="active-link" // Use activeClassName instead of activeStyle
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content={!isCollapsed ? "" : "Dashboard"}
            className="sidebar-link"
          >
            <RiDashboardLine style={iconStyle} />
            {!isCollapsed && "Dashboard"}
          </NavLink>
        </li>
        <li style={sidebarItemStyle}>
          <NavLink
            to="/user"
            style={sidebarLinkStyle}
            activeClassName="active-link" // Use activeClassName instead of activeStyle
            data-tooltip-id="user-tooltip"
            data-tooltip-content={!isCollapsed ? "" : "User Management"}
            className="sidebar-link"
          >
            <AiOutlineUsergroupAdd style={iconStyle} />
            {!isCollapsed && "User Management"}
          </NavLink>
        </li>
        <li style={sidebarItemStyle}>
          <NavLink
            to="/role"
            style={sidebarLinkStyle}
            activeClassName="active-link" // Use activeClassName instead of activeStyle
            data-tooltip-id="role-tooltip"
            data-tooltip-content={!isCollapsed ? "" : "Role Management"}
            className="sidebar-link"
          >
            <MdOutlineAdminPanelSettings style={iconStyle} />
            {!isCollapsed && "Role Management"}
          </NavLink>
        </li>
      </ul>

      {/* Tooltips */}
      {isCollapsed && (
        <>
          <Tooltip id="dashboard-tooltip" />
          <Tooltip id="user-tooltip" />
          <Tooltip id="role-tooltip" />
        </>
      )}
    </div>
  );
};

// Sidebar Styles
const sidebarStyle = {
  width: "250px",
  height: "100vh",
  background: "#1F2937", // Dark blue background
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
  position: "relative",
  transition: "width 0.3s ease",
};

const collapsedSidebarStyle = {
  ...sidebarStyle,
  width: "70px", // Collapsed width
};

const sidebarHeaderStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
  borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
  paddingBottom: "10px",
};

const sidebarListStyle = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
  flex: 1,
};

const sidebarItemStyle = {
  marginBottom: "15px",
};

const sidebarLinkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  borderRadius: "8px",
  transition: "background 0.3s ease, color 0.3s ease, transform 0.2s ease",
};

const iconStyle = {
  marginRight: "10px",
  fontSize: "22px",
  transition: "transform 0.2s ease", // Icon animation
};

const toggleButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "-20px",
  background: "#1F2937",
  color: "white",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
};

// Hover and Active Link Styles
const activeLinkStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  color: "#FFD700",
};

const hoverLinkStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Light hover effect
  color: "white", // Keep text white on hover
};

export default Sidebar;

