import React, { useState } from 'react';

  function Home() {
    const [isShown, setIsShown] = useState(false);

    return (
      <div>
        <div className="energy-dotgov">
            <a
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            href="https://www.energy.gov/energysaver/planning-home-solar-electric-system"><div className="pv-system-diagram">{isShown && (
              <h6 className="energy-dotgov-text">Plan a residential, solar-electric system on energy.gov </h6>
            )}</div></a>


        </div>
      </div>
    )
  }

export default Home;
