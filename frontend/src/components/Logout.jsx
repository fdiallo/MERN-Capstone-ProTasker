export default function Logout({logOut}){
    function handleSubmit(e){
        logOut()
    }
    return (
        <button onClick={handleSubmit}>
            Log Out
        </button>
    )
}