import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard";
import { fetchTickets } from "../utils/api";

const KanbanBoard = ({ groupBy, sortBy }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      const data = await fetchTickets();
      setTickets(data);
      setLoading(false);
    };
    getTickets();
  }, []);

  const groupTickets = () => {
    if (!tickets.length) return {};

    return tickets.reduce((groups, ticket) => {
      const key =
        groupBy === "status"
          ? ticket.status
          : groupBy === "user"
          ? ticket.assigned_user
          : ticket.priority;

      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);

      return groups;
    }, {});
  };

  const groupedTickets = groupTickets();

  const sortedTickets = (group) => {
    return group.sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  return (
    <div className="kanban-board">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        Object.entries(groupedTickets).map(([group, tickets]) => (
          <div className="kanban-column" key={group}>
            <h2>{group}</h2>
            {sortedTickets(tickets).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default KanbanBoard;
