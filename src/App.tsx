import { useState } from "react";
import "./App.css";
import UpcomingLaunch from "./modules/UpcomingLaunch/UpcomingLaunch";

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
        {activeSection === SECTIONS.LAUNCHES && <div>Launches List</div>}
      </div>
    </div>
  );
}

export default App;
