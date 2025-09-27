import App from './App.jsx'

 import {NotFound, Home, About, 
         RepoManager,Form,Projectlayout,GitHubRepo,GitHubMoro,
         Docs, Frontend, Backend, Database, Github, Contact} from './pages/00_index.js'

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
            { index: true, element: <RepoManager /> },
            { path: "/projects/repomanager", element: <RepoManager /> },
            { path: "/projects/form", element: <Form /> },
            { path: "/projects/githubrepo", element: <GitHubRepo /> },
            { path: "/projects/githubmoro", element: <GitHubMoro /> }
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
    ],
  },
]);

export default routers;
