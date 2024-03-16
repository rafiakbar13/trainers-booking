import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import Logo from "../assets/Logo.png";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { MENU } from "../constant/Menu";
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";

const Navbar = () => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [scrolled, setScrolled] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const toggleMenu = () => {
    setToggle(!toggle);
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const { user, role, token } = useContext(authContext);
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
    <motion.header
      className={`w-full fixed z-50 top-0 left-0 right-0 ${
        scrolled ? "bg-primary-300 shadow-md" : "bg-transparent"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.5,
          },
        },
      }}
    >
      <nav className="flex items-center justify-between w-5/6 py-4 mx-auto">
        {/* Left side */}
        <Link to="/" className="">
          <img src={Logo} alt="" className="object-cover" />
        </Link>

        {/* Right Side */}
        <div className="items-center justify-between hidden gap-8 lg:flex whitespace-nowrap">
          {MENU.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`${
                location.pathname === item.path
                  ? "border-b-2 border-gray-500 "
                  : ""
              } hover:text-primary-500 transition-colors  duration-250`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          {token && user ? (
            <Link
              to={`${
                role === "trainer"
                  ? "/trainer/profile/me"
                  : "/member/profile/me"
              }`}
            >
              <figure className="w-10 h-10 pt-1 rounded-full cursor-pointer">
                <img
                  src={user?.photo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </Link>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/login" className="" onClick={closeMenu}>
                <Button className="transition-colors bg-transparent hover:text-primary-500 duration-250">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" className="" onClick={closeMenu}>
                <Button className="transition-colors rounded-md hover:text-white duration-250 bg-secondary-500 hover:bg-primary-500 ">
                  Become a Member
                </Button>
              </Link>
            </div>
          )}
        </div>
        {/* Navigation Mobile Menu */}
        <button
          className="relative top-0 right-0 z-20 flex w-10 h-10 text-black cursor-pointer lg:hidden focus:outline-none "
          onClick={toggleMenu}
        >
          <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span
              className={`absolute h-0.5 w-5 bg-black  transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 bg-black  transform transition-all duration-200 ease-in-out ${
                isOpen ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-5 bg-black  transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
        {/* Navigation Mobile Menu */}
      </nav>
      {/* Mobile Menu  */}
      <nav
        className={`fixed flex top-0 left-0 w-full p-10 z-10 h-screen bg-[#f8f8ef] text-primary-500 bg-opacity-100 transform delay-100 transition-all duration-300 shadow-2xl  ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center justify-center gap-y-5">
            {MENU.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`${
                  location.pathname === item.path
                    ? "border-b-2 border-gray-500"
                    : ""
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            {token && user ? (
              <Link
                to={`${
                  role === "trainer"
                    ? "/trainer/profile/me"
                    : "/member/profile/me"
                }`}
              >
                <figure className="w-10 h-10 pt-1 rounded-full cursor-pointer">
                  <img
                    src={user?.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </Link>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <Link to="/login" className="" onClick={closeMenu}>
                  <Button className="transition-colors bg-transparent hover:text-primary-500 duration-250">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" className="" onClick={closeMenu}>
                  <Button className="transition-colors rounded-md hover:text-white duration-250 bg-secondary-500 hover:bg-primary-500 ">
                    Become a Member
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
