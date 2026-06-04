
export default function Project({ project, checkProject }) {
    function handleCheck({target}){
        checkProject(project)
    }
    function handleDelete({target}){
        project.delete = true
        checkProject(project)
    }
    return (
        <div>

            <h2>Name: {project.name}</h2>
            <h3>Description: {project.description}</h3>
            
            <button onClick={handleDelete}>X</button>
        </div>
    )
}