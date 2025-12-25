"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function ScrollNavigator() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  // 섹션 초기화
  useLayoutEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".page-section")
    );
    sectionsRef.current = sections;
    setTotalSections(sections.length);
  }, []);

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => {
      const middle = window.scrollY + window.innerHeight / 2;
      let newIndex = currentIndex;

      sectionsRef.current.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (middle >= top && middle < bottom) {
          newIndex = index;
        }
      });

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    const handleScroll = () => requestAnimationFrame(onScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const scrollTo = (index: number) => {
    const target = sectionsRef.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* 위로 가기 버튼 → footer 포함 */}
      {!isFirst && (
        <button
          type="button"
          onClick={() => scrollTo(currentIndex - 1)}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          ▲
        </button>
      )}

      {/* 아래로 가기 버튼 → hero에서만 */}
      {!isLast && (
        <button
          type="button"
          onClick={() => scrollTo(currentIndex + 1)}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          ▼
        </button>
      )}
    </div>
  );
}
