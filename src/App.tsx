import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SmokingMap from "./components/SmokingMap";
import CrowdMap from "./components/CrowdMap";
import WalkCourseList from "./components/WalkCourseList";
import WalkCourseMap from "./components/WalkCourseMap";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import SmokingBooth from "./components/SmokingBooth";
import Crowd from "./components/Crowd";
import Guide from "./components/Guide";
import Footer from "./components/footer";
import ScrollNavigator from "./components/ScrollNavigator";

export default function App() {
  const [showMap, setShowMap] = useState(false);
  const [showCrowdMap, setShowCrowdMap] = useState(false);
  const [showWalkList, setShowWalkList] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    if (showMap || showCrowdMap || showWalkList || selectedCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMap, showCrowdMap, showWalkList, selectedCourse]);

  // 1. 지도를 닫을 때 특정 섹션으로 복귀하는 핸들러
  const handleCloseSmokingMap = () => {
    setShowMap(false);
    setTimeout(() => {
      document
        .getElementById("section-smoking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCloseCrowdMap = () => {
    setShowCrowdMap(false);
    setTimeout(() => {
      document
        .getElementById("section-crowd")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // 조건부 렌더링: 지도가 열려있을 때
  if (selectedCourse)
    return (
      <WalkCourseMap
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  if (showWalkList)
    return (
      <WalkCourseList
        onBack={() => setShowWalkList(false)}
        onSelect={(course) => setSelectedCourse(course)}
      />
    );
  if (showMap) return <SmokingMap onBack={handleCloseSmokingMap} />;
  if (showCrowdMap) return <CrowdMap onBack={handleCloseCrowdMap} />;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden scroll-smooth bg-white">
      <main className="w-full">
        {/* Navbar 연동: 정상 작동하는 Navbar의 Props에 맞춰 함수 전달 */}
        <Navbar
          onWalkClick={() => setShowWalkList(true)}
          onShowSmokingMap={() => setShowMap(true)}
          onShowCrowdMap={() => setShowCrowdMap(true)}
        />

        {/* 각 섹션 ID 부여: Navbar의 handleMenuAction과 일치해야 합니다. */}
        <section id="section-hero" className="page-section h-screen">
          <Hero />
        </section>

        <section id="section-intro" className="page-section h-screen">
          <Intro />
        </section>

        <section id="section-smoking" className="page-section h-screen">
          <SmokingBooth onShowMap={() => setShowMap(true)} />
        </section>

        <section id="section-crowd" className="page-section h-screen">
          <Crowd onShowCrowdMap={() => setShowCrowdMap(true)} />
        </section>

        <section id="section-guide" className="page-section relative h-screen">
          <div className="w-full h-full flex items-center justify-center">
            <Guide onWalkClick={() => setShowWalkList(true)} />
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <Footer />
          </div>
        </section>

        <ScrollNavigator />
      </main>
    </div>
  );
}
