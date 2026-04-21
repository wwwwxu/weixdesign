export default function TreeShadow() {
  return (
    <video
      src="/bg-video.mp4"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}
