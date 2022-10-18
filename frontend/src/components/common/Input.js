const Input = ({ name, label, value, onChange, type, error }) => {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} />
      {error && <div className="err-input">{error}</div>}
    </div>
  );
};

export default Input;
