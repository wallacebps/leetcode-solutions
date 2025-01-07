import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProblemItem from "./ProblemItem";
import ProblemDetails from "./ProblemDetails";

function fetchProblems() {
  return fetch("http://localhost:5000/problems").then((res) => res.json());
}

function ProblemList() {
  const { data: problems = [], isLoading, error } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Array", "Linked List", "String"];

  const openDetails = (problem) => {
    setSelectedProblem(problem);
  };

  const closeDetails = () => {
    setSelectedProblem(null);
  };

  const filteredProblems = problems.filter(
    (problem) =>
      (selectedCategory === "All" || problem.category === selectedCategory) &&
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Problemas Resolvidos</h2>
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-semibold mb-2">
          Filtrar por Categoria:
        </label>
        <select
          id="category"
          className="p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="search" className="block text-lg font-semibold mb-2">
          Buscar Problema:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Digite o título do problema..."
          className="p-2 border rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-4">
        {filteredProblems.map((problem) => (
          <ProblemItem
            key={problem.id}
            title={problem.title}
            category={problem.category}
            onClick={() => openDetails(problem)}
          />
        ))}
      </div>
      {selectedProblem && (
        <ProblemDetails problem={selectedProblem} onClose={closeDetails} />
      )}
    </div>
  );
}

export default ProblemList;
