import { FacilitiesProps } from "../types/Facilities";
import { SiHomeadvisor } from 'react-icons/si'
import { HiUserGroup } from 'react-icons/hi'
import { HiMiniAcademicCap } from 'react-icons/hi2'
export const facilities: FacilitiesProps[] = [
    {
        icon: <SiHomeadvisor className="h-6 w-6" />,
        title: "State of the Art Facilities",
        description:
            "Experience fitness at its finest with our state-of-the-art facilities.We have spared no expense in creating a cutting-edge.",
    },
    {
        icon: <HiUserGroup className="h-6 w-6" />,
        title: "100's of Diverse Classes",
        description:
            "Discover a world of fitness possibilities with our extensive selection of 100's of diverse classes.",
    },
    {
        icon: <HiMiniAcademicCap className="h-6 w-6" />,
        title: "Expert and Pro Trainers",
        description:
            "Elevate your fitness journey with the guidance and expertise of our team of expert and pro trainers.",
    },
];