export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden dark:block hidden"
      style={{ zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          right: "0%",
          top: "0%",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,60,220,0.55) 0%, rgba(90,30,200,0.3) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "30%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,210,190,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,210,190,0.45) 0%, rgba(0,160,160,0.25) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
