"use client";

export default function SimulationVideoStream() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Simulation Video Stream</h2>
      <img
        src="http://localhost:8000/video_feed"
        alt="Drone Camera Feed"
        style={{ width: "800px", height: "600px", border: "2px solid #000" }}
      />
    </div>
  );
}
