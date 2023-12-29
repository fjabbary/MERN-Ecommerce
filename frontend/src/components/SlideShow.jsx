import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  height: "400px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const properties = {
  transitionDuration: 500,
  easing: "ease",
};

const Slideshow = ({ slideImages }) => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {slideImages?.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage})`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
