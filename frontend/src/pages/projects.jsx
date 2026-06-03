import Project from "../components/Project.jsx";
import AddProject from "../components/AddProject.jsx";
import { useEffect, useState } from "react";

function Projects({ token, user }) {

    const [projects, setProjects] = useState([]);

    async function getProjects() {
        const response = await fetch(
            //import.meta.env.VITE_BACKEND_URL + "/api/projects/user/",
              "http://localhost:3000/api/projects/user/",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        const data = await response.json();
        setProjects(data.projects);
    }

    async function handleProject(newProjectInfo) {
        //newProjectInfo.completed = false;
        newProjectInfo.user = user._id;
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/projects/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(newProjectInfo),
            },
        );
        const data = await response.json();
        const newProjects = projects.map((project) => {
            return { ...project };
        });
        newProjects.push(data.project);
        setProjects(newProjects);
    }

    async function handleEdit(editProjectInfo) {
        // console.log(editBookInfo)
        // console.log(import.meta.env.VITE_BACKEND_URL + "/api/books/"+editBookInfo._id)
        if (!editProjectInfo.delete) {
            const response = await fetch(
                //import.meta.env.VITE_BACKEND_URL + "/api/projects/" + editProjectInfo._id,
               "http://localhost:3000/api/projects/" + editProjectInfo._id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(editProjectInfo),
                },
            );
            const data = await response.json();
            if (data.project._id) {
                const newProjects = projecs.map((project) =>
                    project._id !== data._id ? project : data,
                );
                setProjects(newProjects);
            }
        } else {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/projects/" + editProjectInfo._id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            );
            const data = await response.json()
            setProjects(projects.filter(project => project._id !== data.project._id))
        }
    }
    useEffect(() => {
        getProjects();
    }, []);
    
    return (
        <>
            <h1>Projects</h1>

            {projects.map((project) => (
                <Project key={project._id} project={project} checkProject={handleEdit} />
            ))}

            <AddProject addProject={handleProject} />
        </>
    );
}

export default Projects;
