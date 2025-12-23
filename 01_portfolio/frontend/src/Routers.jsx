import App from './App.jsx'

 import {NotFound, Home, About, 
         Projectlayout,RepositoryLists,RepositoryProjects,ProjectPage,InsertProjects,InsertRepository,
         Docs, Frontend, Backend, Database, Github, Contact,
         Login,Signup,Dashboard
        
        } from './pages/00_index.js'

import {createBrowserRouter, createHashRouter} from 'react-router'
// import ProtectedRoute from './components/ProtectedRoute.jsx';


const routers = createBrowserRouter([
 {
    path: "/",
    element: <App />,
    children: [
      
       { path: "*", element: <NotFound /> },
   
     

      // pages /home,about,project
       { path: "/", element: <Home /> },
       { path: "/about", element: <About /> },

       // pages /nested routes add, display and catch
       { path: "/projects", element: <Projectlayout />,  children: [
            { index: true, element: <ProjectPage /> },
            { path: "/projects/repositoryLists", element: <RepositoryLists /> },
            { path: "/projects/repositoryProjects", element: <RepositoryProjects /> },
            { path: "/projects/insertProjects", element: <InsertProjects /> },
             { path: "/projects/insertRepository", element: <InsertRepository /> }
       ]
       },
   
       // pages /nested docs
       { path: "/docs", element: <Docs />,  children: [
         { index: true, element: <Frontend /> },
        { path: "/docs/frontend", element: <Frontend /> },
        { path: "/docs/backend", element: <Backend /> },
        { path: "/docs/database", element: <Database /> },
        { path: "/docs/github", element: <Github /> },
       ] },

       // Contact
       { path: "/contact", element: <Contact /> },

       //Authetication
       { path: "/auth/login", element: <Login /> },
       { path: "/auth/signup", element: <Signup /> },
        { path: "/auth/dashboard", element: <Dashboard /> },


    ],
  },
]);

export default routers;
