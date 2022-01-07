import { useLoadMessages } from "../../hooks/useChat";
import { useFirebaseAuthentication } from "../../hooks/useFirebaseAuthentication";

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
          <span className="name">{message.name}</span> {message.message}
          <span className="date">{message.date}</span>
        </div>
      ))}
    </>
  );
};

export default Messages;
