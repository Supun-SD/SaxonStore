export const Menus = [
  {
    name: "HOME",
    nav: "/",
  },
  {
    name: "PRODUCTS",
    subMenuHeading: ["Men's wear", "Women's wear"],
    subMenu: [
      {
        name: "Tops",
        nav: "/products?type=men&subtype=tops",
      },
      {
        name: "Tops",
        nav: "/products?type=women&subtype=tops",
      },
      {
        name: "Bottoms",
        nav: "/products?type=men&subtype=bottoms",
      },
      {
        name: "Bottoms",
        nav: "/products?type=women&subtype=bottoms",
      },
      {
        name: "Shoes",
        nav: "/products?type=men&subtype=shoes",
      },
      {
        name: "Shoes",
        nav: "/products?type=women&subtype=shoes",
      },
      {
        name: "Accessories",
        nav: "/products?type=men&subtype=accessories",
      },
      {
        name: "Accessories",
        nav: "/products?type=women&subtype=accessories",
      },
    ],
    gridCols: 2,
  },
  {
    name: "CONTACT US",
    nav: "/contactus",
  },
];
