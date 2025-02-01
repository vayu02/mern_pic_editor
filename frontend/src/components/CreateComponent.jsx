/* eslint-disable react/prop-types */
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Element from "./Element";

const CreateComponente = ({
  info,
  current_component,
  removeComponent,
  selectItem,
  setSelectItem,
  cropMode,
  setCropMode,
  crop,
  setCrop,
  imageRef,
  setImageRef,
  handleCrop,
}) => {
  let html = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => {
          info.setCurrentComponent(info);
          setSelectItem("");
        }}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img className="w-full h-full" src={info.image} alt="image" />
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}r`} />
        )}

        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}r`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}c`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "trangle") {
    html = (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <Element id={info.id} info={info} exId={`${info.id}t`} />
        )}

        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          id={`${info.id}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
      </div>
    );
  }

  if (info.name === "text") {
    html = (
      <div onClick={() => info.setCurrentComponent(info)}>
        <div
          id={info.id}
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
            padding: info.padding + "px",
            color: info.color,
            opacity: info.opacity,
          }}
          className={`absolute group hover:border-[2px] ${
            info.id === selectItem ? "border-[2px]" : ""
          } border-indigo-500`}
        >
          {selectItem === info.id && (
            <Element id={info.id} info={info} exId="" />
          )}
          <div onMouseDown={() => info.moveElement(info.id, info)}>
            <h2
              style={{ fontSize: info.font + "px", fontWeight: info.weight }}
              className="w-full h-full"
            >
              {info.title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (info.name === "image") {
    return (
      <div
        id={info.id}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        className={`absolute group hover:border-[2px] ${
          info.id === selectItem ? "border-[2px]" : ""
        } border-indigo-500`}
      >
        {selectItem === info.id && (
          <>
            <Element id={info.id} info={info} exId={`${info.id}img`} />
            {cropMode && (
              <div className="absolute bottom-0 right-0 flex gap-2 p-2 bg-white">
                <button
                  className="px-2 py-1 text-sm bg-red-500 text-white"
                  onClick={() => setCropMode(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-1 text-sm bg-green-500 text-white"
                  onClick={() => handleCrop(info.id, crop)}
                >
                  Apply
                </button>
              </div>
            )}
          </>
        )}

        <div
          className="overflow-hidden"
          id={`${info.id}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          {cropMode ? (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onImageLoaded={setImageRef}
            >
              <img
                src={info.image}
                alt="image"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </ReactCrop>
          ) : (
            <img className="w-full h-full" src={info.image} alt="image" />
          )}
        </div>
      </div>
    );
  }

  return html;
};

export default CreateComponente;
