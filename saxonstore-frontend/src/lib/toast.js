import { toast } from "../hooks/use-toast";

export const showToast = ({ type, description }) => {
  const typeStyles = {
    error: "rounded-lg p-4 bg-red-500 text-white",
    success: "rounded-lg p-4 bg-green-500 text-white",
    warning: "rounded-lg p-4 bg-yellow-500 text-black",
  };

  toast({
    description,
    className:
      typeStyles[type] || "rounded-lg p-4 bg-gray-500 text-white font-bold",
  });
};
