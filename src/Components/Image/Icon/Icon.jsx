import React from "react";
import "./Icon.css";
import { Image } from "react-bootstrap";
import image from "Assets/Images/avatar_default.png";
const Icon = (props) => {
  const { width, url, className } = props;
  return (
    <div
      className={`image-square icon__bound ${className || ""}`}
      style={{ width: `${width}` }}
    >
      <Image
        src={url ? url : image}
        alt="Icon"
        roundedCircle
        className="icon__image"
      ></Image>
    </div>
  );
};

export default Icon;
