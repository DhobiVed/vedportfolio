const Roles = ({ category }) => {
  return (
    <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 text-xs font-semibold hover:bg-purple-600 hover:text-white transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Roles;
