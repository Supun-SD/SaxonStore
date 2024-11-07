import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DesktopMenu({ menu }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.li
      className="group/link"
      onHoverStart={() => {
        toggleHoverMenu();
      }}
      onHoverEnd={toggleHoverMenu}
      key={menu.name}
    >
      <Link to={menu.nav}>
        <span className="flex-center cursor-pointer gap-1 rounded-xl px-3 py-1 hover:bg-white/5">
          {menu.name}
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] duration-200 group-hover/link:rotate-180" />
          )}
        </span>
      </Link>
      {hasSubMenu && (
        <motion.div
          className="sub-menu shadow-md"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
            }`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i}>
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p className="mb-4 text-sm text-gray-500">
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )}
                  <div className="flex-center group/menubox gap-x-4">
                    <Link to={submenu.nav}>
                      <div>
                        <h6 className="font-semibold">{submenu.name}</h6>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
