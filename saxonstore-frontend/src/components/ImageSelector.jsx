import { useState } from "react";

function ImageSelector({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0].imageUrl);
  return (
    <>
      <div className="h-[400px] w-full overflow-hidden">
        <img
          src={selectedImage}
          alt="product image"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="mt-2 flex cursor-pointer gap-2">
        {images.map((image) => (
          <div className="h-16 w-16 overflow-hidden" key={image}>
            <img
              src={image.imageUrl}
              alt="product image"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              onClick={() => setSelectedImage(image.imageUrl)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageSelector;
