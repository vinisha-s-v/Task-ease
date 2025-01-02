import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
export const TASK_SIDEBAR_LINK=[
    {
        key:'profile',
        label:'Profile',
        path: '/task/profile-user',
        icon:<HiOutlineUserCircle />
    },{
        key: "completedTasks",
        label: "Completed Tasks",
        path: "/task/completed-tasks",
        icon: <AiOutlineCheckCircle />,
      },
      {
        key: "pendingTasks",
        label: "Pending Tasks",
        path: "/task/pending-tasks",
        icon: <AiOutlineClockCircle />,
      },
]