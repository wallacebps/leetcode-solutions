import { useUser } from "./UserContext";
import Header from "./components/Header";
import ProblemList from "./components/ProblemList";
import Auth from "./Auth";

function App() {
  const { user } = useUser();

  return (
    <div className="App">
      <Header />
      <Auth />
      {user && <ProblemList />}
    </div>
  );
}
export default App;
