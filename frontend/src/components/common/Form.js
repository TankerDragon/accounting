import { motion } from "framer-motion";

const Form = ({children}) => {
  const inputErrorVariant = {
    hidden: {
      opacity: 0,
      top: "0%",
      left: "50%",
    },
    visible: {
      opacity: 1,
      top: "50%",
      left: "50%",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      top: "100%",
      left: "50%",
    },
  };
    
  return (
    <motion.div variants={inputErrorVariant} initial="hidden" animate="visible" exit="exit" className="form">
        {children}
    </motion.div>
  )
}

export default Form;