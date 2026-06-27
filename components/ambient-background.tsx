export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden dark:block hidden"
      style={{ zIndex: 0 }}
    >
      {/* purple/violet glow - center-right */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '5%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(120,60,220,0.9) 0%, rgba(90,30,200,0.55) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* teal/cyan glow - bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,210,190,0.85) 0%, rgba(0,160,160,0.5) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}
