const Select = ({ name, label, value, onChange, selections, error }) => {
  const data = [];

  Object.keys(selections).forEach((s) => {
    data.push([s, selections[s]]);
  });

  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {data.map((d) => {
          return <option value={d[0]}>{d[1]}</option>;
        })}
      </select>
      {error && <div className="err-input">{error}</div>}
    </div>
  );
};

export default Select;
