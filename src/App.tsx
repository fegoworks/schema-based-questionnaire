import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Questionnaire } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Questionnaire />} />
      </Route>
    </Routes>
  );
}

export default App;
