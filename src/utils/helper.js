export const groupTasks = (tasks, groupBy, orderBy) => {
  const grouped = tasks.reduce((acc, task) => {
    const key = task[groupBy.toLowerCase()] || "Ungrouped";
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  // Sort tasks in each group
  for (const key in grouped) {
    grouped[key].sort((a, b) => {
      if (orderBy === "Priority") return b.priority - a.priority;
      if (orderBy === "Title") return a.title.localeCompare(b.title);
      return 0;
    });
  }

  return grouped;
};