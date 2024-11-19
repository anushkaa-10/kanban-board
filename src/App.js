import React, { useState, useEffect } from "react";
import TicketCard from "./components/TicketCard";
import "./App.css"

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("priority");
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const groupTickets = (tickets, groupBy) => {
    const grouped = {};
    const groupMap = {
      priority: {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No Priority",
      },
      status: {
        "To Do": "To Do",
        "In Progress": "In Progress",
        "Backlog": "Backlog",
      },
    };

    tickets.forEach((ticket) => {
      let groupKey;
      if (groupBy === "priority") groupKey = groupMap.priority[ticket.priority];
      else if (groupBy === "status") groupKey = groupMap.status[ticket.status] || ticket.status;
      else if (groupBy === "user") groupKey = ticket.user;

      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(ticket);
    });

    if (groupBy === "priority") {
      const orderedKeys = ["Low", "Medium", "High", "Urgent", "No Priority"];
      const sortedGrouped = {};
      orderedKeys.forEach((key) => {
        if (grouped[key]) sortedGrouped[key] = grouped[key];
      });
      return sortedGrouped;
    }

    return grouped;
  };

  const sortTickets = (tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      "Low": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkpjuuD-Mhi6mBEfWHBX-dCRwEjYNEyDKc_A&s",
      "Medium": "https://static-00.iconduck.com/assets.00/medium-priority-icon-512x512-kpm2vacr.png",
      "High": "https://static-00.iconduck.com/assets.00/high-priority-icon-512x512-fk4ioedw.png",
      "Urgent": "https://media.istockphoto.com/id/827247322/vector/danger-sign-vector-icon-attention-caution-illustration-business-concept-simple-flat-pictogram.jpg?s=612x612&w=0&k=20&c=BvyScQEVAM94DrdKVybDKc_s0FBxgYbu-Iv6u7yddbs=",
      "No Priority": "https://static.thenounproject.com/png/980840-200.png",
    };
    return icons[priority];
  };

  const getStatusIcon = (status) => {
    const icons = {
      "To Do": "https://cdn-icons-png.flaticon.com/512/2387/2387635.png",
      "In Progress": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQckP6-9kgJoeqFEE7NLGLnoR9mjkFlyExw&s",
      "Backlog": "https://cdn-icons-png.flaticon.com/512/5360/5360758.png",
    };
    return icons[status];
  };

  const groupedTickets = groupTickets(tickets, grouping);

  return (
    <div className="app-container">
      {/* Display Options */}
      <div className="display-options">
        <div>
          <label>Group by:</label>
          <select onChange={(e) => setGrouping(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label>Order by:</label>
          <select onChange={(e) => setOrdering(e.target.value)}>
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board-container">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h2>
              <img
                src={grouping === "priority" ? getPriorityIcon(group) : getStatusIcon(group)}
                alt={`${group} Icon`}
                style={{ width: "20px", marginRight: "10px" }}
              />
              {group}
            </h2>
            {(ordering
              ? sortTickets(groupedTickets[group], ordering)
              : groupedTickets[group]
            ).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;