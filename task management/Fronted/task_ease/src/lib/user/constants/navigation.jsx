import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
export const TASK_SIDEBAR_LINK=[
    {
        key:'profile',
        label:'Profile',
        path: '/profile',
        icon:<HiOutlineUserCircle />
    },{
        key: "completedTasks",
        label: "Completed Tasks",
        path: "/completed-tasks",
        icon: <AiOutlineCheckCircle />,
      },
      {
        key: "pendingTasks",
        label: "Pending Tasks",
        path: "/pending-tasks",
        icon: <AiOutlineClockCircle />,
      },
]