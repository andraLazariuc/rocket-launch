import { useState } from "react";

import Launches from "./modules/Launches/Launches";
import UpcomingLaunch from "./modules/UpcomingLaunch/UpcomingLaunch";

import "./App.css";

export const SECTIONS = { UPCOMING_LAUNCH: 1, LAUNCHES: 2 };

function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS.UPCOMING_LAUNCH);

  return (
    <div className="App">
      <div className="App-section">
        {activeSection === SECTIONS.UPCOMING_LAUNCH && (
          <UpcomingLaunch
            onNavIconClick={() => setActiveSection(SECTIONS.LAUNCHES)}
          />
        )}
        {activeSection === SECTIONS.LAUNCHES && (
          <Launches
            onNavIconClick={() => setActiveSection(SECTIONS.UPCOMING_LAUNCH)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
