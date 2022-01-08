import { useLoadMessages } from "../../../hooks/useChat";
import { useFirebaseAuthentication } from "../../../hooks/useFirebaseAuthentication";
import { Name, Date } from "./styles";

const Messages = () => {
  const { authUser, signIn } = useFirebaseAuthentication();
  const { messages } = useLoadMessages();

  if (!authUser) {
    return (
      <>
        <button onClick={signIn}>Please log in</button>
        <h1>usuario no logueado</h1>
      </>
    );
  }

  return (
    <>
      {messages?.map((message) => (
        <div key={message.id}>
          <Name>{message.name}</Name> {message.message}
          <Date>{message.date}</Date>
        </div>
      ))}
    </>
  );
};

export default Messages;
