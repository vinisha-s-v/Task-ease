import React from 'react';

import { Outlet } from 'react-router-dom';
import TaskSIdebar from '../shared/TaskSIdebar';

const TaskLayout = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-full overflow-hidden">
   <div>Hai Siri</div>

    <TaskSIdebar /> 
    
    <div className="flex-1">
     
      <div>{<Outlet />}</div>
    </div>
  </div>
  );
}

export default TaskLayout;
