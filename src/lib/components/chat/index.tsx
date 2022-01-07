import { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatIcon, CloseIcon } from "./Icons";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) {
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
    <div className={`chat-wrapper ${close}`}>
      <div className="chat-container">
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
      </div>
      <ChatIcon handlerParent={() => setClose(true)} />
    </div>,
    document.body
  );
};

export default Chat;
