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
        <Link to="/">
          <img src={Logo} alt="" className="object-contain" />
        </Link>

        {/* Right Side */}
        <div className="items-center justify-between hidden gap-8 sm:flex">
          {MENU.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`${
                location.pathname === item.path
                  ? "border-b-2 border-gray-500 "
                  : ""
              } hover:text-primary-500 transition-colors duration-250`}
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
                  className="w-full rounded-full "
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
        <Button className="md:hidden" onClick={() => setToggle(!toggle)}>
          {toggle ? (
            <AiOutlineClose size={20} className="" />
          ) : (
            <HiMiniBars3BottomRight size={20} />
          )}
        </Button>
      </nav>
      {toggle && (
        <div
          className={`flex flex-col items-center justify-center gap-8 py-4 bg-primary-300 md:hidden rounded-b-3xl shadow-xl`}
        >
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
          <div className="flex flex-col gap-4">
            <Button>Sign Up</Button>
            <Button className="px-4 py-2 transition duration-300 rounded-md bg-secondary-500 hover:bg-primary-500 hover:text-white">
              Become a Member
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
