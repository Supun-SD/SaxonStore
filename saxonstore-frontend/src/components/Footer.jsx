import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 pb-5 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around">
          <div className="mb-6 sm:mb-0">
            <Link to="/">
              <div>
                <h3 className="font-serif text-6xl tracking-[0.1rem]">SAXON</h3>
                <h4 className="font-serif text-3xl tracking-[0.8em]">STORE</h4>
              </div>
            </Link>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-blue-600 transition-colors hover:text-blue-800"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-pink-600 transition-colors hover:text-pink-800"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-green-600 transition-colors hover:text-green-800"
              >
                <MessageCircle />
              </a>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:mb-0 sm:flex-row sm:space-x-10">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Categories</h3>
              <div className="grid grid-cols-2 gap-x-10">
                <ul className="space-y-1">
                  <li className="font-bold">Men&#39;s</li>
                  <li>
                    <Link to="/products?type=men&subtype=tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/products?type=men&subtype=bottoms">Bottoms</Link>
                  </li>
                  <li>
                    <Link to="/products?type=men&subtype=footwear">
                      Footwear
                    </Link>
                  </li>
                  <li>
                    <Link to="/products?type=men&subtype=accessories">
                      Accessories
                    </Link>
                  </li>
                </ul>

                <ul className="space-y-1">
                  <li className="font-bold">Women&#39;s</li>
                  <li>
                    <Link to="/products?type=women&subtype=tops">Tops</Link>
                  </li>
                  <li>
                    <Link to="/products?type=women&subtype=bottoms">
                      Bottoms
                    </Link>
                  </li>
                  <li>
                    <Link to="/products?type=women&subtype=footwear">
                      Footwear
                    </Link>
                  </li>
                  <li>
                    <Link to="/products?type=women&subtype=accessories">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/sign-in">Log in</Link>
              </li>
              <li>
                <Link to="/sign-up">Register</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="contactus">Contact us</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-300 pt-4 text-start text-sm">
          &copy; All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
