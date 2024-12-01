import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Column from "./Column";

// Utility function to group and sort tasks
const groupTasks = (tasks, groupBy, orderBy) => {
  if (!tasks.tickets) return {};

  // First, group tasks
  const groupedTasks = tasks.tickets.reduce((acc, ticket) => {
    let groupKey;
    switch (groupBy) {
      case "Status":
        groupKey = ticket.status;
        break;
      case "User":
        groupKey = tasks.users.find(user => user.id === ticket.userId)?.name || "Unassigned";
        break;
      case "Priority":
        const priorityMap = {
          0: "No Priority",
          1: "Low",
          2: "Medium", 
          3: "High",
          4: "Urgent"
        };
        groupKey = priorityMap[ticket.priority];
        break;
      default:
        groupKey = ticket.status;
    }

    // Create group if it doesn't exist
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(ticket);
    return acc;
  }, {});

  // Then sort within each group
  Object.keys(groupedTasks).forEach(group => {
    groupedTasks[group].sort((a, b) => {
      if (orderBy === "Priority") {
        return b.priority - a.priority;
      }
      if (orderBy === "Title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return groupedTasks;
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ tickets: [], users: [] });
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem('groupBy') || "Status"
  );
  const [orderBy, setOrderBy] = useState(
    localStorage.getItem('orderBy') || "Priority"
  );

  useEffect(() => {
    // Fetch data from API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Save group and order preferences to local storage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('orderBy', orderBy);
  }, [groupBy, orderBy]);

  // Group and sort tasks based on user selection
  const groupedTasks = groupTasks(tasks, groupBy, orderBy);

  return (
    <div className="kanban-board">
      <header className="kanban-header">
        <div className="dropdown-container">
          <Dropdown
            label="Grouping"
            options={["Status", "User", "Priority"]}
            value={groupBy}
            onChange={setGroupBy}
          />
          <Dropdown
            label="Ordering"
            options={["Priority", "Title"]}
            value={orderBy}
            onChange={setOrderBy}
          />
        </div>
      </header>
      <div className="columns">
        {Object.entries(groupedTasks).map(([group, tasks]) => (
          <Column key={group} title={group} tasks={tasks} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;