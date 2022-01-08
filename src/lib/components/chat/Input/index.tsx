import { useState } from "react";
import { saveMessage } from "../../../config";

const Input = () => {
  const [message, setMessage] = useState("");

  const handlerKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      saveMessage(message);
      setMessage("");
    }
  };
  return (
    <input
      type="text"
      placeholder="Speak to the world..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyDown={handlerKeyDown}
    />
  );
};

export default Input;
