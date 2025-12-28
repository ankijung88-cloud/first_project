// 1. 가져오기(Import) 문법 오류 수정: useState와 useEffect 사이에 쉼표가 필요합니다.
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ScrollNavigator from "./components/ScrollNavigator";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Guide from "./components/Guide";
import SmokingBooth from "./components/SmokingBooth";
import Crowd from "./components/Crowd";
import Footer from "./components/footer";
import SmokingMap from "./components/SmokingMap";

export default function App() {
  const [showMap, setShowMap] = useState<boolean>(false);

  // 지도가 열릴 때 배경 스크롤을 방지하는 로직입니다.
  useEffect(() => {
    if (showMap) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMap]);

  return (
    <div className="relative w-full h-full">
      {/* 조건부 렌더링: 
        지도가 열려있을 때(showMap: true)와 아닐 때를 구분합니다. 
      */}
      {!showMap ? (
        <main className="w-full">
          <Navbar />

          <section id="section-0" className="page-section h-screen snap-start">
            <Hero />
          </section>

          <section className="page-section h-screen snap-start">
            <Intro />
          </section>

          <section className="page-section h-screen snap-start">
            {/* SmokingBooth 내부 버튼 클릭 시 setShowMap(true)가 실행되도록 
              Props를 올바르게 전달합니다. 
            */}
            <SmokingBooth onShowMap={() => setShowMap(true)} />
          </section>

          <section className="page-section h-screen snap-start">
            <Crowd />
          </section>

          <section className="page-section relative h-screen snap-start">
            <Guide />
            <div className="absolute bottom-0 left-0 w-full">
              <Footer />
            </div>
          </section>

          <ScrollNavigator />
        </main>
      ) : (
        /* 지도 컴포넌트 호출: 
          onBack 프롭스를 통해 지도를 닫는 기능을 연결합니다. 
        */
        <SmokingMap onBack={() => setShowMap(false)} />
      )}
    </div>
  );
}
