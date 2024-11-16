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
        name: "Footwear",
        nav: "/products?type=men&subtype=footwear",
      },
      {
        name: "Footwear",
        nav: "/products?type=women&subtype=footwear",
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
