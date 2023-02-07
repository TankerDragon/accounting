import useMessage from "../../hooks/useMessage";
import Message from "./Message";

const MessageBar = () => {
  const { messages } = useMessage();

  return (
    <div className="message-bar">
      {messages.map((msg) => {
        return <Message message={msg} />;
      })}
    </div>
  );
};

export default MessageBar;
