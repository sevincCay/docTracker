import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const user = useSelector((state) => state.loggedInUser.role);
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Doc Management</Link>
        </li>
        {user !== "user" ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
