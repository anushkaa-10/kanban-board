import React from "react";
import "./TicketCard.css"

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        <img
          src={ticket.userImage || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
          alt="User Avatar"
          className="user-avatar"
        />
      </div>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-footer">
        <span className="ticket-icon">❗</span>
        <span className="ticket-label">{ticket.status}</span>
      </div>
    </div>
  );
};

export default TicketCard;
