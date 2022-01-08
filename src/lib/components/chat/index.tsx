import { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatIcon, CloseIcon } from "./Icons";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { $ChatWrapper, $ChatContainer } from "./styles";

function ErrorFallback({ error }: { error: any }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={() => {}}>Try again</button>
    </div>
  );
}

const Chat = () => {
  const [close, setClose] = useState(false);

  return ReactDOM.createPortal(
    <$ChatWrapper close={close}>
      <$ChatContainer>
        <header>
          <span>World chat by Xabier</span>
          <CloseIcon handlerParent={() => setClose(false)} />
        </header>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <main>
            <Messages />
          </main>
          <footer>
            <Input />
          </footer>
        </ErrorBoundary>
      </$ChatContainer>
      <ChatIcon handlerParent={() => setClose(true)} />
    </$ChatWrapper>,
    document.body
  );
};

export default Chat;
