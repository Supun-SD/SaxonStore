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
        key: "MTops",
      },
      {
        name: "Tops",
        nav: "/products?type=women&subtype=tops",
        key: "WTops",
      },
      {
        name: "Bottoms",
        nav: "/products?type=men&subtype=bottoms",
        key: "MBottoms",
      },
      {
        name: "Bottoms",
        nav: "/products?type=women&subtype=bottoms",
        key: "WBottoms",
      },
      {
        name: "Footwear",
        nav: "/products?type=men&subtype=footwear",
        key: "MFootwear",
      },
      {
        name: "Footwear",
        nav: "/products?type=women&subtype=footwear",
        key: "WFootwear",
      },
      {
        name: "Accessories",
        nav: "/products?type=men&subtype=accessories",
        key: "MAccessories",
      },
      {
        name: "Accessories",
        nav: "/products?type=women&subtype=accessories",
        key: "WAccessories",
      },
    ],
    gridCols: 2,
  },
  {
    name: "CONTACT US",
    nav: "/contactus",
  },
];
