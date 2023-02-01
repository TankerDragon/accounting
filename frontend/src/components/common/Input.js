import { motion } from "framer-motion";

const Input = ({ name, label, value, onChange, type, error }) => {

  const inputErrorVariant = {
    hidden: {
      opacity: 0,
      y: "-20px",
    },
    visible: {
      opacity: 1,
      y: "0",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: "-20px"
    },
  };
  

  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} className={error ? "red-border" : ""} />
      {error &&
        <motion.div variants={inputErrorVariant} initial="hidden" animate="visible" exit="exit" className="err-input">
          {error}
        </motion.div>}
    </div>
  );
};

export default Input;
