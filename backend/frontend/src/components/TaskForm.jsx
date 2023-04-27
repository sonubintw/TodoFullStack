const TaskForm = ({createTask,name,handleInputChange,isEditing,updateTask}) => {
 

  return (
    <form className="task-form" onSubmit={isEditing? updateTask : createTask}>
        <input id="red" type="text" placeholder={isEditing ? name:"Add task"} value={name}  onChange={handleInputChange}/>
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm