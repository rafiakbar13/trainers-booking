import { QuickLinks } from "../types/quickLinks";
import { RiLinkedinFill } from "react-icons/ri";
import {
    AiFillYoutube,
    AiFillGithub,
    AiOutlineInstagram,
} from "react-icons/ai";

export const socialLinks: QuickLinks[] = [
    {
        path: "https://www.linkedin.com/in/muhammad-rafi-akbar-a8b67b148/",
        icon: <RiLinkedinFill className="w-5 h-5 group-hover:text-white" />,
    },
    {
        path: "#",
        icon: <AiFillYoutube className="w-5 h-5 group-hover:text-white" />,
    },
    {
        path: "#",
        icon: <AiOutlineInstagram className="w-5 h-5 group-hover:text-white" />,
    },
    {
        path: "https://github.com/rafiakbar13",
        icon: <AiFillGithub className="w-5 h-5 group-hover:text-white" />,
    },
];


export const quickLinks: QuickLinks[] = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/about",
        name: "About Us",
    },
    {
        path: "/services",
        name: "Services",
    },
    {
        path: "/",
        name: "Blog",
    },
];

export const quickLinks2: QuickLinks[] = [
    {
        path: "/",
        name: "Find a Trainer",
    },
    {
        path: "/",
        name: "Request an Appointment",
    },
];

export const quickLinks3: QuickLinks[] = [
    {
        path: "/",
        name: "Donate",
    },
    {
        path: "/contact",
        name: "Contact Us",
    },
];
