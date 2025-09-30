import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Competitions from "./pages/Competitions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Details from "./competitions/Details";
import UserDashboard from "./user/UserDashboard";
import MatchHub from "./pages/MatchHub";
import Fixtures from "./pages/Fixtures";
import Register from "./pages/Register";
import OrganizerDashboard from "./organizer/pages/OrganizerDashboard";
import FixtureOrganizer from "./organizer/pages/FixtureOrganizer";
import Paymentsuccess from "./pages/Paymentsuccess";
import Paymenterror from "./pages/Paymenterror";
function App() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Landingpage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path="/competitions"
          element={<Competitions active={active} setActive={setActive} />}
        ></Route>
        <Route
          path="/matchhub"
          element={<MatchHub active={active} setActive={setActive} />}
        ></Route>
        <Route path="/fixtures/:id" element={<Fixtures />}></Route>
        <Route
          path="/about"
          element={<About active={active} setActive={setActive} />}
        ></Route>
        <Route
          path="/contact"
          element={<Contact active={active} setActive={setActive} />}
        ></Route>
        <Route path="/competitiondetails/:id" element={<Details />}></Route>
        <Route path="/userdashboard" element={<UserDashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/organizerdashboard"
          element={<OrganizerDashboard />}
        ></Route>
        <Route
          path="/fixtureorganizer/:id"
          element={<FixtureOrganizer />}
        ></Route>
        <Route path="/paymentsuccess" element={<Paymentsuccess />}></Route>
        <Route path="/paymenterror" element={<Paymenterror />}></Route>
      </Routes>
    </div>
  );
}

export default App;
