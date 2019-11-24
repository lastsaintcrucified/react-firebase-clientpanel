import React from "react";
import classNames from "classnames";

const Alert = props => {
  const { message, messageType } = props;
  return (
    <div
      className={classNames("alert", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {message}
    </div>
  );
};

export default Alert;
