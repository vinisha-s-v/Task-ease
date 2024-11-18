import { HiOutlineAcademicCap, HiOutlineCube, HiOutlineQuestionMarkCircle, HiOutlineUser, HiOutlineViewGrid,HiCog } from "react-icons/hi";

export const  DASHBOARD_SIDEBAR_LINKS =[
    {
        key:'dashboard',
        label:'Dashboard',
        path: '/admin/dashboard',
        icon:<HiOutlineViewGrid/>
    },
    {
        key:'tasks',
        label:'Tasks',
        path: '/tasks',
        icon:<HiOutlineCube/>
    },
    {
        key:'users',
        label:'Users',
        path: '/admin/users',
        icon:<HiOutlineUser/>
    },
    {
        key:'activity',
        label:'Activity',
        path: '/activity',
        icon:<HiOutlineAcademicCap/>
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key:'settings',
        label:'Settings',
        path:'/settings',
        icon:<HiCog />
    },
    {
        key:'support',
        label:'Help & Support',
        icon:<HiOutlineQuestionMarkCircle/>
    }


]

