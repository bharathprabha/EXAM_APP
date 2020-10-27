import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "my description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-center">
          <h2 className="display-3 text-white">{title}</h2>
          <p className="lead text-white">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
