function ProblemDetails({ problem, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="text-red-500 font-bold float-right"
        >
          Fechar
        </button>
        <h2 className="text-xl font-bold mb-4">{problem.title}</h2>
        <pre className="bg-gray-100 p-4 rounded">{problem.code}</pre>
        <p className="mt-4 text-blue-500 underline">{problem.video}</p>
      </div>
    </div>
  );
}

export default ProblemDetails;
