import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const subType = queryParams.get("subtype");

  return (
    <div className="flex-center h-screen flex-col justify-center">
      <div>Products</div>
      <div>
        {type}/{subType}
      </div>
    </div>
  );
}

export default Products;
