import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@nextui-org/button";
import Logo from '../assets/Logo.png';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';

type MenuItemProps = {
    name: string;
    path: string;
};

const MENU: MenuItemProps[] = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Find a Trainer",
        path: "/trainers"
    },
    {
        name: "Services",
        path: "/services"
    },
    {
        name: "Contact",
        path: "/contact"
    }
];

const Navbar = () => {
    const [toggle, setToggle] = useState<Boolean>(false);
    const [scrolled, setScrolled] = useState<Boolean>(false);
    const location = useLocation();

    const closeMenu = () => {
        setToggle(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`w-full fixed z-50 top-0 left-0 right-0 ${scrolled ? "bg-primary-300 shadow-md" : "bg-transparent"}`}>
            <nav className='flex items-center justify-between w-5/6 py-4 mx-auto'>
                {/* Left side */}
                <Link to="/">
                    <img src={Logo} alt="" className='object-contain' />
                </Link>

                {/* Right Side */}
                <div className='items-center justify-between hidden gap-8 md:flex'>
                    {MENU.map((item, index) => (
                        <Link to={item.path} key={index} className={`${location.pathname === item.path ? "border-b-2 border-gray-500 " : ""} hover:text-primary-500 transition-colors duration-250`} onClick={closeMenu}>
                            {item.name}
                        </Link>
                    ))}
                    <div className='flex items-center gap-4 ml-4'>
                        <Link to='/login' className='transition-colors hover:text-primary-500 duration-250' onClick={closeMenu}>
                            <Button>
                                Sign In
                            </Button>
                        </Link>
                        <Link to='/register' className='px-4 py-2 transition-colors rounded-md hover:text-white duration-250 bg-secondary-500 hover:bg-primary-500 ' onClick={closeMenu}>
                            <Button color="success" >
                                Become a Member
                            </Button>
                        </Link>
                    </div>
                </div>
                <Button className='md:hidden' onClick={() => setToggle(!toggle)}>
                    {toggle ?
                        <AiOutlineClose size={20} className='' /> :
                        <HiMiniBars3BottomRight size={20} />
                    }
                </Button>
            </nav>
            {toggle && <div className={`flex flex-col items-center justify-center gap-8 py-4 bg-primary-300 md:hidden rounded-b-3xl shadow-xl`}>
                {MENU.map((item, index) => (
                    <Link to={item.path} key={index} className={`${location.pathname === item.path ? "border-b-2 border-gray-500" : ""}`} onClick={closeMenu}>
                        {item.name}
                    </Link>
                ))}
                <div className='flex flex-col gap-4'>
                    <Button color="success" >
                        Sign Up
                    </Button>
                    <Button className='px-4 py-2 transition duration-300 rounded-md bg-secondary-500 hover:bg-primary-500 hover:text-white' >
                        Become a Member
                    </Button>
                </div>
            </div>}
        </header>
    );
}

export default Navbar;
