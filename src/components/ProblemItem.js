function ProblemItem({ title, category, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{category}</p>
    </div>
  );
}

export default ProblemItem;
