import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// 1. 인터페이스에 부모(App.tsx)로부터 받는 함수 타입을 정의합니다.
interface NavbarProps {
  onWalkClick: () => void;
  onShowSmokingMap: () => void; // 이 부분을 추가하여 에러를 해결합니다.
  onShowCrowdMap: () => void; // 이 부분도 함께 추가합니다.
}

export default function Navbar({ onWalkClick }: NavbarProps) {
  const [hide, setHide] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const updateNavbar = () => {
      const currentY = window.scrollY;
      // 최상단일 때 숨김, 스크롤 발생 시 노출
      if (currentY <= 10) {
        setHide(true);
      } else {
        setHide(false);
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateNavbar();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 1. 섹션 이동 함수: 모든 메뉴 클릭 시 해당 ID를 가진 섹션으로 이동합니다.
  const handleScrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      // 2. 부드러운 스크롤 이동을 지원하는 내장 함수입니다.
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const menuItems = [
    { name: "홈", target: "section-hero" },
    { name: "흡연구역", target: "section-smoking" },
    { name: "혼잡도", target: "section-crowd" },
    { name: "가이드", target: "section-guide" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        hide ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Logo 및 서비스 명 */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleScrollToSection("section-hero")}
          >
            <div className="w-10 h-10 overflow-hidden">
              <img
                src="/image/logo.png"
                alt="FLOW 로고"
                className="w-full h-full object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-bold text-2xl text-primary leading-none">
              FLOW
            </span>
          </div>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleScrollToSection(item.target)}
                className="cursor-pointer hover:text-primary transition font-medium text-gray-700"
              >
                {item.name}
              </li>
            ))}
            <button
              onClick={onWalkClick}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-transform font-medium"
            >
              산책 신청하기
            </button>
          </ul>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <ul className="flex flex-col items-center py-6 gap-4">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleScrollToSection(item.target)}
                  className="text-lg cursor-pointer hover:text-primary font-medium"
                >
                  {item.name}
                </li>
              ))}
              <button
                onClick={() => {
                  onWalkClick();
                  setMenuOpen(false);
                }}
                className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                산책 신청하기
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
