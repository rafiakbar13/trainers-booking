import React, { useState, useContext } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
  setTab,
  tab,
}: {
  navItems: {
    name: string;
    tab?: string;
    icon?: JSX.Element;
  }[];
  setTab: (tab: string) => void;
  tab: string;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const setTabs = (tab: string) => {
    setTab(tab);
  };
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.02) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-20 inset-x-0 mx-auto border border-transparent bg-primary-500 rounded-full  z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <button
            onClick={() => setTabs(navItem.tab)}
            key={idx}
            className={`${
              navItem.tab === `${tab}`
                ? " text-gray-500"
                : "bg-transparent text-gray-800"
            } w-full mt-0 bg-primary-100 rounded-full py-3 px-3`}
          >
            {navItem.name}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="relative px-4 py-2 text-sm font-medium text-black rounded-full bg-primary-100"
        >
          <span>Logout</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
