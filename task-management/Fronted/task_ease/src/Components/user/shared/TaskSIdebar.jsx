import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from 'react-icons/hi'; 
import { TASK_SIDEBAR_LINK } from '../../../lib/user/constants/navigation';
import classNames from 'classnames';
const TaskSIdebar = () => {
  const { pathname } = useLocation();

  const linkClasses =
  "flex items-center gap-2 font-light px-4 py-3 hover:bg-blue-300 hover:no-underline rounded-lg text-base transition duration-300";

  return (
    <div className="w-64 bg-blue-100 h-screen flex flex-col p-5">
   
    <div className="flex items-center gap-2 px-1 py-3">
      <HiOutlineUserCircle fontSize={24} />
      <span className="text-blue-900 font-bold text-xl">Task Ease</span>
    </div>

 
 
    <div className="flex-1 py-6 flex flex-col gap-2">
      {TASK_SIDEBAR_LINK.map((item) => (
        <Link
          key={item.key}
          to={item.path}
          className={classNames(
            pathname === item.path
              ? "bg-blue-300 text-blue-900 font-semibold" 
              : "text-blue-600", 
            linkClasses
          )}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  </div>

  );
}

export default TaskSIdebar;
