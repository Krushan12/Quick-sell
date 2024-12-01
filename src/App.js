import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css"; 

const App = () => {
  return (
    <div className="App">

        <h1>Kanban Board</h1>
   
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
};

export default App;
