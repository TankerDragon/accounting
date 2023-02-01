import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const Message = ({ message }) => {
  const [visible, setVisible] = useState(message.visible);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      message.visible = false;
    }, 7000);
  }, []);

  const messageVariant = {
    hidden: {
      opacity: 0,
      x: "200px",
    },
    visible: {
      opacity: 1,
      x: "0",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      x: "200px"
    },
  };

  return visible ? (
    <motion.p variants={messageVariant} whileHover={{ scale: 1.1 }} initial="hidden" animate="visible" exit="exit" className={"message " + message.type}>
      {message.content}
      <ImCross
        onClick={() => {
          setVisible(false);
        }}
      />
    </motion.p>
  ) : (
    <></>
  );
};

export default Message;
