import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function MobMenu({ Menus }) {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div>
      <button className="relative z-[999] lg:hidden" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed left-0 right-0 top-20 h-full overflow-y-auto bg-white p-6 pb-20 text-black backdrop-blur"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map(({ name, subMenu, nav }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = subMenu?.length;
            return (
              <li key={name} className="">
                <Link to={nav}>
                  <span
                    className="flex-center-between relative cursor-pointer rounded-md p-4 hover:bg-white/5"
                    onClick={() => setClicked(isClicked ? null : i)}
                  >
                    {name}
                    {hasSubMenu && (
                      <ChevronDown
                        className={`ml-auto ${isClicked && "rotate-180"} `}
                      />
                    )}
                  </span>
                </Link>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="font-bold">Men&apos;s Wear</div>
                      <div className="font-bold">Women&apos;s wear</div>
                    </div>
                    <div className="my-6 grid grid-cols-2 gap-4">
                      {subMenu.map(({ name, nav, key }) => (
                        <Link key={key} to={nav}>
                          <div className="cursor-pointer">{name}</div>
                        </Link>
                      ))}
                    </div>
                  </motion.ul>
                )}
              </li>
            );
          })}
          {isLoggedIn ? (
            userRole === "admin" ? (
              <>
                <li className="flex-center-between relative cursor-pointer p-4">
                  <Link to="admin/orders">Orders</Link>
                </li>
                <li className="flex-center-between relative cursor-pointer p-4">
                  <Link to="admin/my-products">My Products</Link>
                </li>
              </>
            ) : (
              <>
                <li className="flex-center-between relative cursor-pointer p-4">
                  <Link to="cart">Cart</Link>
                </li>
                <li className="flex-center-between relative cursor-pointer p-4">
                  <Link to="my-account">My Account</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li className="flex-center-between relative cursor-pointer p-4">
                <Link to="cart" className="flex-center gap-x-3">
                  <ShoppingCart size={18} />
                  Cart
                </Link>
              </li>
              <li className="flex-center-between relative cursor-pointer p-4">
                <Link to="sign-in">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
