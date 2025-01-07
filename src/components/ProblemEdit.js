import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ProblemEdit({ problem, onClose }) {
  const [title, setTitle] = useState(problem.title);
  const [category, setCategory] = useState(problem.category);
  const [code, setCode] = useState(problem.code);
  const [video, setVideo] = useState(problem.video);

  const queryClient = useQueryClient();

  const updateProblemMutation = useMutation(
    async (updatedProblem) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Problema atualizado no servidor:', updatedProblem);
      return updatedProblem;
    },
    {
      onSuccess: (updatedProblem) => {
        queryClient.setQueryData(['problems'], (oldProblems = []) =>
          oldProblems.map((problem) =>
            problem.id === updatedProblem.id ? updatedProblem : problem
          )
        );
        alert('Problema atualizado com sucesso!');
        onClose();
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProblemMutation.mutate({
      id: problem.id,
      title,
      category,
      code,
      video,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Editar Problema</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold">
              Título:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-lg font-semibold">
              Categoria:
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-lg font-semibold">
              Código:
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="video" className="block text-lg font-semibold">
              Link do Vídeo:
            </label>
            <input
              id="video"
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={updateProblemMutation.isLoading}
            >
              {updateProblemMutation.isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemEdit;
