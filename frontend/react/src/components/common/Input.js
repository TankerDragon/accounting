import React from "react";
import { Style } from "../styles/Style.style";

const Input = ({ name, label, value, onChange, type, error }) => {
  return (
    <Style.InputField>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Style.InputField>
  );
};

export default Input;
