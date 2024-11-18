import sampleImage from "../assets/sample.jpg";

export default function OrderItem({ item }) {
  return (
    <>
      <div
        key={item.productName}
        className="grid grid-cols-2 items-center gap-4"
      >
        <div className="col-span-1 justify-start">
          <div className="h-16 w-16 overflow-hidden">
            <img
              src={sampleImage}
              alt="product image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-1">
            {item.productName} - {item.color} x {item.quantity}
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          {item.price * item.quantity}
        </div>
      </div>
      <hr className="my-4 border-t border-gray-300" />
    </>
  );
}
