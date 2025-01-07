import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ProblemCreate() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [video, setVideo] = useState('');

  const queryClient = useQueryClient();

  // Definindo a mutação para criar problemas
  const createProblemMutation = useMutation(
    async (newProblem) => {
      // Simulando uma chamada de API com delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Enviado para o servidor:', newProblem);
      return newProblem;
    },
    {
      onSuccess: (newProblem) => {
        // Atualizando o cache local após sucesso
        queryClient.setQueryData(['problems'], (oldProblems = []) => [
          ...oldProblems,
          newProblem,
        ]);
        alert('Problema criado com sucesso!');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createProblemMutation.mutate({
      id: Date.now(),
      title,
      category,
      code,
      video,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Criar Problema</h2>
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={createProblemMutation.isLoading}
        >
          {createProblemMutation.isLoading ? 'Salvando...' : 'Criar Problema'}
        </button>
      </form>
    </div>
  );
}

export default ProblemCreate;
