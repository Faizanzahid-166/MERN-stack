import { Outlet, Link } from "react-router"; // make sure it's react-router-dom

export default function ProjectsLayout() {
  const navLinks = [
    { name: "GitHub Repository Lists", path: "/projects/repositoryLists" },
    { name: "GitHub Repository Projects", path: "/projects/repositoryProjects" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-2 py-10">
      {/* Navigation */}
      <ul className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-3/4 lg:w-2/3 mx-auto">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="px-4 py-2 block rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Render child routes */}
      <div className="mt-8">
        <Outlet />
      </div>
    </section>
  );
}
