export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/video-03.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 어두운 오버레이 (가독성용)
      <div className="absolute inset-0 bg-black/40" /> */}

      {/* 중앙 컨텐츠 */}
      <div className="relative z-10 flex items-center justify-center h-full"></div>
    </section>
  );
}
