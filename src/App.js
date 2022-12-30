import "./App.css";
import ChatRouter from "./routing/ChatRouter";
import CustomTheme from "./theme/CustomTheme";

function App() {
  return (
    <div className="App">
      <CustomTheme>
        <ChatRouter />
      </CustomTheme>
    </div>
  );
}

export default App;
