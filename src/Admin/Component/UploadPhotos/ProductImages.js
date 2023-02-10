const ProductImages = ({ setPhotos, photos }) => {
  const photoHandler = (e) => {
    setPhotos((prev) => {
      const tempArr = [...prev, ...e.target.files];

      return tempArr;
    });
  };

  const swapLeft = (photoIndex) => {
    if (photoIndex === 0) {
      return;
    }

    setPhotos((prev) => {
      const prevArr = [...prev];
      const toSwapPhoto = prevArr[photoIndex];

      prevArr[photoIndex] = prevArr[photoIndex - 1];
      prevArr[photoIndex - 1] = toSwapPhoto;

      return prevArr;
    });
  };

  const swapRight = (photoIndex) => {
    if (photoIndex === photos.length - 1) {
      return;
    }

    setPhotos((prev) => {
      const prevArr = [...prev];
      const toSwapPhoto = prevArr[photoIndex];

      prevArr[photoIndex] = prevArr[photoIndex + 1];
      prevArr[photoIndex + 1] = toSwapPhoto;

      return prevArr;
    });
  };

  const removePhotos = (photoIndex) => {
    setPhotos((prev) => {
      const prevArr = [...prev];

      console.log(prevArr);
      if (prevArr.length === 1) {
        return [];
      }

      return prevArr.filter((_, i) => i !== photoIndex);
    });
  };

  return (
    <div>
      <input
        className="w-full h-56 file cursor-pointer"
        type="file"
        multiple
        accept="image/png, image/jpg, image/jpeg, image/webp"
        onChange={photoHandler}
      />
      <div className="pt-9">
        <h1 className="text-2xl">Preview</h1>
        <div className="mt-5 flex w-full gap-20 flex-wrap py-3 px-4">
          {photos.length > 0 &&
            photos.map((el, photoIndex, photosArr) => (
              <div className="py-5 px-5 bg-slate-200 relative">
                {photoIndex > 0 && (
                  <button
                    className="absolute top-1/2 -translate-x-full -translate-y-1/2 bg-slate-400 rounded-full p-2 text-black"
                    onClick={() => {
                      swapLeft(photoIndex);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>
                )}
                <div
                  className="min-h-[200px] min-w-[200px] bg-center"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(el)})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                {photoIndex < photosArr.length - 1 && (
                  <button
                    className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full p-2 text-black"
                    onClick={() => swapRight(photoIndex)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                )}
                <button
                  className="absolute top-0 left-full -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full p-2 text-black"
                  onClick={() => removePhotos(photoIndex)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          {!photos.length && <p>There is no product images to preview!</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
