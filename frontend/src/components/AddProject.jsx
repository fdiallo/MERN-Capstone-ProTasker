export default function AddProject({ addProject }) {
    
    function handleSubmit(e){
        e.preventDefault()
        const projectInfo = {
            name: e.target[0].value,
            description: e.target[1].value
        }
        e.target[0].value=""
        e.target[1].value=""
        addProject(projectInfo)
    }
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input name="name"></input><br />
        <label htmlFor="description">Description: </label>
        <input name="description"></input><br /><br />
        <button type="submit">Add New Project</button>
      </form>
    )
}