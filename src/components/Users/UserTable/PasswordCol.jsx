import { Button, Input, Space } from "antd";
import React, { useState } from "react";

const PasswordCol = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Space direction="horizontal" className="password-col">
      <Input.Password
        disabled
        value={props.password}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
      <a
        style={{ color: "blue" }}
        onClick={(event) => {
          event.stopPropagation();
          setPasswordVisible((prevState) => !prevState);
        }}
      >
        {passwordVisible ? "Hide" : "Show"}
      </a>
    </Space>
  );
};

export default PasswordCol;
