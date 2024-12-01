import React from "react";
import { ReactComponent as HighPriorityIcon } from "../assets/icons/Img - High Priority.svg";
import { ReactComponent as LowPriorityIcon } from "../assets/icons/Img - Low Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../assets/icons/Img - Medium Priority.svg";
import { ReactComponent as UrgentPriorityIcon } from "../assets/icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as NoPriorityIcon } from "../assets/icons/No-priority.svg";
import { ReactComponent as ThreeDotMenu } from "../assets/icons/3 dot menu.svg";

const Card = ({ task }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 3: // High
        return <HighPriorityIcon />;
      case 2: // Medium
        return <MediumPriorityIcon />;
      case 1: // Low
        return <LowPriorityIcon />;
      case 4: // Urgent
        return <UrgentPriorityIcon />;
      default:
        return <NoPriorityIcon />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{task.id}</span>
        <div className="priority-icon">
          {getPriorityIcon(task.priority)}
        </div>
        <div className="menu-icon">
          <ThreeDotMenu />
        </div>
      </div>
      <div className="card-title">{task.title}</div>
      <div className="card-tags">
        {task.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Card;