import Navbar from "./components/Navbar";
import ScrollNavigator from "./components/ScrollNavigator";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Guide from "./components/Guide";
import SmokingBooth from "./components/SmokingBooth";
import Crowd from "./components/Crowd";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="section-0" className="page-section h-screen snap-start">
        <Hero />
      </section>

      {/* 나머지 섹션들 */}
      <section className="page-section h-screen snap-start">
        <Intro />
      </section>

      <section className="page-section h-screen snap-start">
        <SmokingBooth />
      </section>

      <section className="page-section h-screen snap-start">
        <Crowd />
      </section>

      {/* ✅ Guide + Footer 결합 섹션 */}
      <section className="page-section relative h-screen snap-start">
        <Guide />

        {/* Footer가 Guide 위에 겹쳐서 표시 */}
        <div className="absolute bottom-0 left-0 w-full">
          <Footer />
        </div>
      </section>

      {/* 스크롤 네비게이터는 항상 footer 위 */}
      <ScrollNavigator />
    </>
  );
}
