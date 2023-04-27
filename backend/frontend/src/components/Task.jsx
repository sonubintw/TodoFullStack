import {FaEdit,FaCheckDouble,FaRegTrashAlt} from "react-icons/fa"


const Task = ({task,index,deleteTask,getSingleTask,setToComplete}) => {
  return (
    <div className={task.completed ? "task completed arrow" : "task"}>
       <span>
            <b>{index+1}. </b>  <p>{task.name}</p> 
       </span>
       <div className="task-icons">
        <FaCheckDouble color="green" onClick={()=>setToComplete(task)}/>
        <FaEdit color="purple" onClick={()=>getSingleTask(task)}/>
        <FaRegTrashAlt color="red" onClick={()=>deleteTask(task._id)}/>
       </div>
    </div>
  )
}

export default Task