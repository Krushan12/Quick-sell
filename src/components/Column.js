import React from "react";
import Card from "./Card";

const Column = ({ title, tasks }) => (
  <div className="column">
    <h2>{title} ({tasks.length})</h2>
    <div className="cards">
      {tasks.map((task) => (
        <Card key={task.id} task={task} />
      ))}
    </div>
  </div>
);

export default Column;