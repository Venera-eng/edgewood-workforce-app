import React, { useState } from "react";

function ClockIn() {
  const [location, setLocation] = useState(null);

  const handleClockIn = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Send clock-in data to the server
        const response = await fetch("http://localhost:5000/clock-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        });

        const result = await response.json();
        alert(result.message);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <h1>Clock In</h1>
      <button onClick={handleClockIn}>Clock In</button>
      {location && (
        <p>
          Your location: {location.latitude}, {location.longitude}
        </p>
      )}
    </div>
  );
}

export default ClockIn;
