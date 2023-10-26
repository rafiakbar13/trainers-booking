import { ProgramProps } from "../types/Program";
import {
    FaRunning as Cardio,
    FaDumbbell as BodyWeight,
    FaHeart as Mental,
    FaRegFutbol as Fitness

} from "react-icons/fa";

import { GrYoga as Yoga } from "react-icons/gr";
import { BsHospitalFill as Rehabilitasi } from "react-icons/bs";

export const ProgramData: ProgramProps[] = [
    {
        icon: <Cardio />,
        program: 'Cardio Training',
        description: 'Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.'
    },
    {
        icon: <BodyWeight />,
        program: 'Body Weight Training',
        description: 'Strength training is a type of physical exercise specializing in the use of resistance to induce muscular contraction which builds the strength, anaerobic endurance, and size of skeletal muscles.'
    },
    {
        icon: <Mental />,
        program: 'Mental Health',
        description: 'Mental health is the level of psychological well-being or an absence of mental illness. It is the state of someone who is "functioning at a satisfactory level of emotional and behavioral adjustment".'
    },
    {
        icon: <Fitness />,
        program: 'Fitness Training',
        description: 'Kebugaran adalah kondisi tubuh yang sehat dan kuat, yang dapat menanggung beban fisik dan mental tanpa merasa lelah.'
    },
    {
        icon: <Yoga />,
        program: 'Yoga',
        description: 'Yoga combines physical postures, movements, and controlled breathing techniques. It improves flexibility, balance, and mental relaxation.'
    },
    {
        icon: <Rehabilitasi />,
        program: 'Rehabilitasi',
        description: 'Rehabilitation training is designed for physical recovery following injury or surgery. It features specific exercises to strengthen weakened or injured muscles, restore flexibility, and enhance mobility.'
    }
]