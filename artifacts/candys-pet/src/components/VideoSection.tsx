export function VideoSection() {
  return (
    <div style={{ width: '100%', height: 'clamp(320px, 56.25vw, 560px)', lineHeight: 0 }}>
      <iframe
        src="/candys-pet-video/"
        allow="autoplay"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Candy's Pet"
      />
    </div>
  );
}
