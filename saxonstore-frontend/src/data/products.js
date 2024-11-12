const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    description:
      "A comfortable and stylish t-shirt made from 100% cotton, ideal for everyday wear.",
    price: 2800.0,
    category: "Men",
    subcategory: "Tops",
    created_at: "2024-10-20T14:30:00Z",
    updated_at: "2024-11-10T08:45:00Z",
    variants: [
      {
        productVariantId: 101,
        color: { id: 1, name: "Black", hex_value: "#000000" },
        size: { id: 1, name: "S" },
        quantity: 20,
        sku: "CT-BLK-S-101",
      },
      {
        productVariantId: 102,
        color: { id: 1, name: "Black", hex_value: "#000000" },
        size: { id: 2, name: "M" },
        quantity: 30,
        sku: "CT-BLK-M-102",
      },
    ],
  },
  {
    id: 2,
    name: "Leather Jacket",
    description:
      "A durable leather jacket, perfect for outdoor adventures and chilly weather.",
    price: 9500.0,
    category: "Men",
    subcategory: "Tops",
    created_at: "2024-09-15T10:45:00Z",
    updated_at: "2024-10-05T18:25:00Z",
    variants: [
      {
        productVariantId: 201,
        color: { id: 2, name: "Brown", hex_value: "#8B4513" },
        size: { id: 3, name: "L" },
        quantity: 10,
        sku: "LJ-BRN-L-201",
      },
      {
        productVariantId: 202,
        color: { id: 2, name: "Brown", hex_value: "#8B4513" },
        size: { id: 4, name: "XL" },
        quantity: 5,
        sku: "LJ-BRN-XL-202",
      },
    ],
  },
  {
    id: 3,
    name: "Skinny Jeans",
    description:
      "Classic skinny jeans with a slim fit, designed for both style and comfort.",
    price: 5000.0,
    category: "Women",
    subcategory: "Bottoms",
    created_at: "2024-09-12T08:20:00Z",
    updated_at: "2024-11-05T09:15:00Z",
    variants: [
      {
        productVariantId: 301,
        color: { id: 3, name: "Blue", hex_value: "#0000FF" },
        size: { id: 2, name: "M" },
        quantity: 15,
        sku: "SJ-BLU-M-301",
      },
      {
        productVariantId: 302,
        color: { id: 3, name: "Blue", hex_value: "#0000FF" },
        size: { id: 3, name: "L" },
        quantity: 20,
        sku: "SJ-BLU-L-302",
      },
    ],
  },
  {
    id: 4,
    name: "Running Shoes",
    description:
      "Lightweight running shoes with excellent grip and comfort, suitable for daily runs.",
    price: 6500.0,
    category: "Men",
    subcategory: "Footwear",
    created_at: "2024-10-01T11:00:00Z",
    updated_at: "2024-10-15T16:00:00Z",
    variants: [
      {
        productVariantId: 401,
        color: { id: 4, name: "White", hex_value: "#FFFFFF" },
        size: { id: 5, name: "10" },
        quantity: 25,
        sku: "RS-WHT-10-401",
      },
      {
        productVariantId: 402,
        color: { id: 4, name: "White", hex_value: "#FFFFFF" },
        size: { id: 6, name: "11" },
        quantity: 20,
        sku: "RS-WHT-11-402",
      },
    ],
  },
  {
    id: 5,
    name: "Maxi Dress",
    description:
      "A flowing maxi dress that combines elegance with comfort for any occasion.",
    price: 7200.0,
    category: "Women",
    subcategory: "Tops",
    created_at: "2024-08-25T09:00:00Z",
    updated_at: "2024-10-01T07:45:00Z",
    variants: [
      {
        productVariantId: 501,
        color: { id: 5, name: "Red", hex_value: "#FF0000" },
        size: { id: 1, name: "S" },
        quantity: 12,
        sku: "MD-RED-S-501",
      },
      {
        productVariantId: 502,
        color: { id: 5, name: "Red", hex_value: "#FF0000" },
        size: { id: 2, name: "M" },
        quantity: 10,
        sku: "MD-RED-M-502",
      },
    ],
  },
  {
    id: 6,
    name: "Wool Scarf",
    description:
      "A warm wool scarf, perfect for cold weather and adding a touch of style.",
    price: 1500.0,
    category: "Women",
    subcategory: "Accessories",
    created_at: "2024-10-20T12:00:00Z",
    updated_at: "2024-11-03T14:15:00Z",
    variants: [
      {
        productVariantId: 601,
        color: { id: 6, name: "Gray", hex_value: "#808080" },
        size: { id: 7, name: "One Size" },
        quantity: 30,
        sku: "WS-GRY-OS-601",
      },
    ],
  },
  {
    id: 7,
    name: "Ankle Boots",
    description:
      "Stylish and durable ankle boots, ideal for casual and semi-formal outings.",
    price: 8200.0,
    category: "Women",
    subcategory: "Footwear",
    created_at: "2024-07-15T10:45:00Z",
    updated_at: "2024-08-30T09:00:00Z",
    variants: [
      {
        productVariantId: 701,
        color: { id: 7, name: "Black", hex_value: "#000000" },
        size: { id: 5, name: "7" },
        quantity: 18,
        sku: "AB-BLK-7-701",
      },
      {
        productVariantId: 702,
        color: { id: 7, name: "Black", hex_value: "#000000" },
        size: { id: 6, name: "8" },
        quantity: 15,
        sku: "AB-BLK-8-702",
      },
    ],
  },
  {
    id: 8,
    name: "Cargo Pants",
    description:
      "Durable cargo pants with multiple pockets, designed for comfort and utility.",
    price: 3400.0,
    category: "Men",
    subcategory: "Bottoms",
    created_at: "2024-05-10T13:00:00Z",
    updated_at: "2024-07-20T17:30:00Z",
    variants: [
      {
        productVariantId: 801,
        color: { id: 8, name: "Olive", hex_value: "#808000" },
        size: { id: 3, name: "L" },
        quantity: 20,
        sku: "CP-OLV-L-801",
      },
      {
        productVariantId: 802,
        color: { id: 8, name: "Olive", hex_value: "#808000" },
        size: { id: 4, name: "XL" },
        quantity: 12,
        sku: "CP-OLV-XL-802",
      },
    ],
  },
];

export default products;
