import { Link, useNavigate } from "react-router-dom";
import DesktopMenu from "./DesktopMenu";
import { Menus } from "./Menus";
import MobMenu from "./MobMenu";
import { Search, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  return (
    <div>
      <header className="fixed inset-0 z-50 flex h-20 bg-white text-[15px] shadow-lg">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <ul className="hidden gap-x-4 lg:flex">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>
          <Link to="/">
            <div>
              <h3 className="font-serif text-3xl tracking-[0.1rem]">SAXON</h3>
              <h4 className="text-md font-serif tracking-[0.9em]">STORE</h4>
            </div>
          </Link>

          <div className="flex items-center gap-x-8">
            <Link to="search" className="flex-center gap-x-3 lg:hidden">
              <Search size={20} />
            </Link>
            <div className="lg:hidden">
              <MobMenu Menus={Menus} />
            </div>
            <div className="hidden gap-x-16 lg:flex">
              <Link to="search" className="flex-center gap-x-3">
                <Search size={18} />
                Search
              </Link>
              {isLoggedIn ? (
                userRole === "ADMIN" ? (
                  <>
                    <Link to="admin/orders">Orders</Link>
                    <Link to="admin/my-products">My Products</Link>
                  </>
                ) : (
                  <>
                    <Link to="cart">Cart</Link>
                    <Link to="my-account">My Account</Link>
                  </>
                )
              ) : (
                <>
                  <Link to="cart" className="flex-center gap-x-3">
                    <ShoppingCart size={18} />
                    Cart
                  </Link>
                  <Link to="sign-in">Sign In</Link>
                </>
              )}
              {isLoggedIn && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/sign-in");
                  }}
                >
                  <LogOut size={18} />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
