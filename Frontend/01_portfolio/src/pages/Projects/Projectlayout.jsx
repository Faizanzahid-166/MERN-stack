import { Outlet, Link } from "react-router";

export default function ProjectsLayout() {
     const navLinks = [
    { name: "More Projects", path: "/projects/repomanager" },
    { name: "Git Hub Repo", path: "/projects/githubrepo" },
     { name: "Git Projects", path: "/projects/githubmoro" },
     ]
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">

        <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className="hover:text-red-500 cursor-pointer">
              {link.name}
            </Link>
          </li>
          
        ))}
      </ul>
      
      <Outlet />
    </section>
  );
}
