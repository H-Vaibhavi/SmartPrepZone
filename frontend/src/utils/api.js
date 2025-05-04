// src/utils/api.js

export const fetchFilteredQuestions = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.section) params.append("section", filters.section);
  if (filters.topic) params.append("topic", filters.topic);
  if (filters.difficulty) params.append("difficulty", filters.difficulty);
  if (filters.year) params.append("year", filters.year);
  if (filters.shift) params.append("shift", filters.shift);
  if (filters.search) params.append("search", filters.search);

  // No page/limit = fetch all questions
  const response = await fetch(`http://localhost:5000/api/questions?${params.toString()}`);

  if (!response.ok) throw new Error("Failed to fetch questions");

  return await response.json();
};
