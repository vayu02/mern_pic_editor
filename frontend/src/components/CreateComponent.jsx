import React, { useState } from "react";
import Element from "./Element";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CreateComponente = ({
  info,
  current_component,
  removeComponent,
  selectItem,
  setSelectItem,
}) => {
  const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const [imageRef, setImageRef] = useState(null);

  const handleCrop = (crop) => {
    setCrop(crop);
  };

  const applyCrop = async () => {
    if (!imageRef) return;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const croppedImageUrl = canvas.toDataURL();
    setCroppedImage(croppedImageUrl);
    setCropMode(false);
  };

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
    html = (
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
          <Element id={info.id} info={info} exId={`${info.id}img`} />
        )}
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          className="overflow-hidden"
          id={`${info.id}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
      </div>
    );
  }

  {
    info.name === "image" && (
      <div
        id={info.id}
        onClick={() => setSelectItem(info.id)}
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
          <button
            className="absolute top-0 right-0 bg-white p-1 border"
            onClick={() => setCropMode(true)}
          >
            Crop
          </button>
        )}

        <div
          id={`${info.id}img`}
          className="overflow-hidden"
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          {cropMode ? (
            <ReactCrop
              src={info.image}
              crop={crop}
              onChange={handleCrop}
              onImageLoaded={setImageRef}
            />
          ) : (
            <img
              className="w-full h-full"
              src={croppedImage || info.image}
              alt="image"
            />
          )}
        </div>

        {cropMode && (
          <button
            className="absolute bottom-0 right-0 bg-green-500 text-white p-1"
            onClick={applyCrop}
          >
            Apply Crop
          </button>
        )}
      </div>
    );
  }

  return html;
};

export default CreateComponente;
