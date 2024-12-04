import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CompletedTask = () => {

    const[tasks,setTasks]=useState([]);

    useEffect(()=>{
        const fetchTasks =async () =>{
            try{
                const response = await axios.get("http://localhost:8080/tasks",{
                    params:{status:"completed"},
                });
                setTasks(response.data);
            }catch(error){
                console.error("Error fetching completed tasks:",error);
            }
        }
        fetchTasks();
    },[])
    return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
          <ul className="list-disc pl-6">
            {tasks.map((task) => (
              <li key={task.id}>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    

export default CompletedTask;
