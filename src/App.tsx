import Chat from "./lib/components/chat";
import { useFirebaseAuthentication } from "./lib/hooks/useFirebaseAuthentication";

function App() {
  const { authUser, signIn, signOutUser } = useFirebaseAuthentication();

  return (
    <div className="App">
      <header className="App-header">
        {authUser ? (
          <button onClick={signOutUser}>Logout</button>
        ) : (
          <button onClick={signIn}>Login</button>
        )}
        <Chat />
      </header>
    </div>
  );
}

export default App;
