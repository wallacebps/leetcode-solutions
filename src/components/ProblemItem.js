import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ProblemItem({ id, title, category, onClick }) {
  const queryClient = useQueryClient();

  const deleteProblemMutation = useMutation(
    async (problemId) => {
      // Simulando exclusão no servidor
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Problema excluído no servidor:', problemId);
    },
    {
      onSuccess: (problemId) => {
        queryClient.setQueryData(['problems'], (oldProblems = []) =>
          oldProblems.filter((problem) => problem.id !== problemId)
        );
        alert('Problema excluído com sucesso!');
      },
    }
  );

  const handleDelete = (e) => {
    e.stopPropagation(); // Impede a propagação do clique para o onClick do item
    if (window.confirm('Tem certeza que deseja excluir este problema?')) {
      deleteProblemMutation.mutate(id);
    }
  };

  return (
    <div 
      onClick={onClick} 
      className="p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
      <button 
        onClick={handleDelete} 
        className="text-red-500 hover:underline"
      >
        Excluir
      </button>
    </div>
  );
}

export default ProblemItem;
