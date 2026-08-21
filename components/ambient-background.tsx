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
          right: "-5%",
          top: "-5%",
          width: "850px",
          height: "850px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(79,70,229,0.28) 35%, transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "-8%",
          top: "8%",
          width: "620px",
          height: "620px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(56,189,248,0.12) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "5%",
          width: "720px",
          height: "720px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,184,166,0.4) 0%, rgba(6,182,212,0.18) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      
      <div
        style={{
          position: "absolute",
          left: "35%",
          top: "40%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
