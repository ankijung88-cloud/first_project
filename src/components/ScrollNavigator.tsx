"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function ScrollNavigator() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useLayoutEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".page-section")
    );
    sectionsRef.current = sections;
    setTotalSections(sections.length);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // 최상단 예외 처리
      if (scrollY < 10) {
        if (currentIndex !== 0) setCurrentIndex(0);
        return;
      }

      // 뷰포트 중앙보다 약간 위쪽을 기준으로 판단하여 스냅 직전에 인덱스 변경 방지
      const triggerPoint = scrollY + window.innerHeight * 0.4;
      let newIndex = currentIndex;

      sectionsRef.current.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (triggerPoint >= top && triggerPoint < bottom) {
          newIndex = index;
        }
      });

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          onScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const scrollTo = (index: number) => {
    const target = sectionsRef.current[index];
    if (!target) return;

    // 요소의 절대 위치를 계산하여 브라우저 창을 해당 위치로 직접 이동시킵니다.
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {!isFirst && (
        <button
          type="button"
          onClick={() => scrollTo(currentIndex - 1)}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          ▲
        </button>
      )}

      {!isLast && (
        <button
          type="button"
          onClick={() => scrollTo(currentIndex + 1)}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          ▼
        </button>
      )}
    </div>
  );
}
