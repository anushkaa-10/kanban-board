import React from "react";
import "./Header.css"

const Header = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  return (
    <div className="header">
      <label>
        Group By:
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Sort By:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default Header;