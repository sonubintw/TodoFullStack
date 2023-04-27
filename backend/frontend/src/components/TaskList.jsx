//parent file

import loadImg from "../assets/loading.gif"
import { toast } from "react-toastify";
import Task from "./Task"
import TaskForm from "./TaskForm"
import { useState,useEffect } from "react";
import axios from "axios"
const url="http://localhost:8000"

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [completedTask,setCompletedTask]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [taskId,setTaskId]=useState("")

    const [formData, setFormData] = useState({
        name:"",
        completed:false
    });

    const {name}=formData

    const handleInputChange=(e)=>{
        
        const {value}=e.target
        setFormData({
            ...formData,name:value
        })
    }

    const getTasks=async ()=>{
        setIsLoading(true)
        try {
          const response=  await axios.get(`${url}/getall`)
          console.log(response.data)
          setTasks(response.data)
          setIsLoading(false)
        } catch (error) {
            toast.err(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
         getTasks()
    }, []);
    
    


    const createTask = async(e)=>{
        e.preventDefault()
        console.log(formData)
        // console.log(formData);
        if(!name){
            return toast.error("input Field cannot be empty")
        }
        try{
            await axios.post(`${url}/sendData`,formData)
            setFormData({...formData,name:""})
            toast.success("succesfully created tast mc lovede")
            getTasks()
        }
        catch(err){
            toast.error(err.message)
        }
    }

    const deleteTask= async(id)=>{
        try {
            await axios.delete(`${url}/deletData/${id}`)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getSingleTask=async(task)=>{
        setFormData({
            ...formData,
            name:task.name,completed:false
        })
        setTaskId(task._id)
        setIsEditing(true)
    
        // console.log(task)
    }
    
    const updateTask=async(e)=>{
        e.preventDefault()

        if(!name){
            return toast.error("input field is required")
        }

        try {
           await axios.patch(`${url}/update/${taskId}`,formData)
            setFormData({
                ...formData,name:""
            })
            setIsEditing(false)
            getTasks()
        } catch (error) {
            toast.error(error)
        }

    
    }
    const setToComplete = async(task)=>{
        const newFormData={
            name:task.name,
            completed:true
        }
        try {
           await axios.patch(`${url}/update/${task._id}`,newFormData)
           getTasks()
        } catch (error) {   
            toast.error(error.message)
        }
}
useEffect(()=>{
    const taskComp=tasks.filter((elem)=>{
        return elem.completed === true
    })
    setCompletedTask(taskComp)
},[tasks])


  return (
    <div>
    <h2>Task Manager</h2>
    <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
      <div className="--flex-between --pb">
            <p><b>Total Tasks:</b>{tasks.length}</p>
            <p><b>Completed Tasks:</b>{completedTask.length}</p>
        </div>
            <hr />
            {
                //conditional rendering if isLoading is true
            isLoading && (
                <div className="--flex-center">
                    <img src={loadImg} alt="spinner" height={"200px"}/>
                </div>
                )
            }

            {
            !isLoading && tasks.length === 0 ? (
                <span className="--py"> No task added mf</span>
            ) : (
                <span>{tasks.map((elem,i)=>{
                    return (
                        <Task key={elem._id} task={elem} index={i} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete}/>
                    )
                })}</span>
            )
            }
            
    </div>
  )
}

export default TaskList
