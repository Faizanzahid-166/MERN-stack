import {Link} from 'react-router'

export default function ProjectCard({ title, desc, img, codelink, projectlink }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out">
      {/* Image */}
      <img 
        src={img} 
        alt={title} 
        className="w-full h-50 mx-auto object-fit"
      />

      {/* Details */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        
        {/* Link */}
        <div className="flex flex-row gap-2 mx-auto">
        <Link 
          to={codelink} 
          target="_blank" 
          rel="noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          🔗 View Code
        </Link>
        <Link 
          to={projectlink} 
          target="_blank" 
          rel="noreferrer"
          className="inline-block px-3 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          🔗 View Project
        </Link>
        </div>
      </div>
    </div>
  );
}
