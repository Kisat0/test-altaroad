import { BrowserRouter, Route, Routes } from "react-router-dom";

import ViewOne from "./pages/view1/view1";
import ViewTwo from "./pages/view2/view2";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewOne />} />
        <Route path="/details/:id" element={<ViewTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
