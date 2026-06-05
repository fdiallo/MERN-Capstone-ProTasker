
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetail({ token, user }) {
    const { id } = useParams();
    //console.log("Project ID: ", id)
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    // Form states
    const [projName, setProjName] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskStatus, setTaskStatus] = useState('To Do');


    async function getProjects() {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/projects/user/",
            //   "http://localhost:3000/api/projects/user/",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        const data = await response.json();
        setProjects(data.projects);
    }


    async function getTasks() {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}/tasks`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        const tasksData = await response.json();
        setTasks(tasksData.tasks);
    }

    const fetchProjectData = useCallback(async () => {
        //async function fetchProjectData() {
        try {
            // const pRes = await axios.get(`http://localhost:5000/api/projects/${id}`);
            // setProject(pRes.data);
            // setProjName(pRes.data.name);
            // setProjDesc(pRes.data.description);

            // const tRes = await axios.get(`http://localhost:5000/api/projects/${id}/tasks`);
            // setTasks(tRes.data);


            //console.log("Fetching Project Datail: ")
            const projectResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}`,
                { headers: { Authorization: "Bearer " + token, }, },
            );
            const projectData = await projectResponse.json();
            setProject(projectData.project);
            setProjName(projectData.project.name);
            setProjDesc(projectData.project.description);

            // console.log("Fetching Project Datail: ", projectData.project.description)

            // console.log("Project Datail: ", data.project)

            // const taskResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}/tasks`
            //     ,
            //     {
            //         headers: {
            //             Authorization: "Bearer " + token,
            //         },
            //     },
            // );
            // const taskData = await taskResponse.json();
            // console.log("Task Data: ", taskData.tasks)
            // setTasks(taskData.tasks);
            // console.log("Tasks List: ", taskData.tasks)




        } catch (err) {
            //alert('Error fetching dataset elements.');
            //navigate('/');
        }
        //}, [id, navigate]);
    }, [id]);


    useEffect(() => {
        fetchProjectData();
        getTasks()
    }, [fetchProjectData]);
    // useEffect(() => {
    //     fetchProjectData();
    // }, []);



    const handleUpdateProject = async (e) => {
        e.preventDefault();
        //await axios.put(`http://localhost:5000/api/projects/${id}`, { name: projName, description: projDesc });

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}`,
            {
                method: "PUT",
                headers: { Authorization: "Bearer " + token, },
                body: JSON.stringify({ name: projName, description: projDesc }),
            },
        );

        const updatedData = await response.json();

        console.log("Updating Project ....", updatedData.project.name)

        // 4. Handle successful response
        //setMessage(`Success! User updated to: ${updatedData.name}`);

        // await fetch(`/api/projects/${id}`, {
        //     method: "PUT",
        //     headers: { Authorization: "Bearer " + token, },
        //     body: JSON.stringify({ name: projName, description: projDesc }),
        // });

        //alert('Project updated!');
        fetchProjectData();
    };


    const handleDeleteProject = async () => {
        if (window.confirm('Delete this project and all its tasks?')) {
            // await axios.delete(`http://localhost:5000/api/projects/${id}`);


            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: "Bearer " + token, },
                    body: JSON.stringify({ name: projName, description: projDesc }),
                },
            );

            navigate('/');

        }
    };


    const handleCreateTask = async (e) => {
        e.preventDefault();
        // await axios.post(`http://localhost:5000/api/projects/${id}/tasks`, {
        //     title: taskTitle, description: taskDesc, status: taskStatus
        // });

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({ title: taskTitle, description: taskDesc, status: taskStatus }),
        });

        const data = await response.json()



        setTaskTitle('');
        setTaskDesc('');
        setTaskStatus('To Do');
        //fetchProjectData();
    };



    const handleUpdateTaskStatus = async (taskId, currentTask, newStatus) => {
        // await axios.put(`http://localhost:5000/api/projects/${id}/tasks/${taskId}`, {
        //     ...currentTask, status: newStatus
        // });

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}/tasks/${taskId}`,
            {
                method: "PUT",
                headers: { Authorization: "Bearer " + token, },
                body: JSON.stringify({ ...currentTask, status: newStatus }),
            },
        );

        fetchProjectData();
    };



    const handleDeleteTask = async (taskId) => {
        //await axios.delete(`http://localhost:5000/api/projects/${id}/tasks/${taskId}`);

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/projects/${id}/tasks/${taskId}`,
            {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token, },

            },
        );

        fetchProjectData();
    };





    return (
        <div style={{ padding: '20px' }}>
            <h2>Project Detail</h2><br />

            <div style={{ borderBottom: '2px solid #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
                {/* <h2>Manage Project: {project.name}</h2> */}
                {/* <h2>Manage Project</h2> */}
                <form onSubmit={handleUpdateProject}>
                    <input value={projName} onChange={e => setProjName(e.target.value)} required /><br />
                    <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} required /><br />
                    <button type="submit">Update Details</button>
                    <button type="button" onClick={handleDeleteProject} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Delete Project</button>
                </form>
            </div>


            <div>
                <h3>Tasks Management</h3>
                <form onSubmit={handleCreateTask} style={{ background: '#eee', padding: '10px', marginBottom: '15px' }}>
                    <h4>Add New Task</h4>
                    <input placeholder="Task Title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required />
                    <input placeholder="Task Description" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required />
                    <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button type="submit">Add Task</button>
                </form>

                <h4>Task List</h4>
                {tasks?.map(t => (
                    <div key={t._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '5px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{t.title}</strong> - {t.description} <em>({t.status})</em>
                        </div>
                        <div>
                            <select value={t.status} onChange={(e) => handleUpdateTaskStatus(t._id, t, e.target.value)}>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <button onClick={() => handleDeleteTask(t._id)} style={{ color: 'red', marginLeft: '10px' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )


}