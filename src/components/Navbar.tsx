import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [hide, setHide] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY === 0) {
        setHide(true); // 첫화면 숨김
        setMenuOpen(true); // 스크롤 시 모바일 메뉴 닫기
      } else {
        setHide(window.scrollY < 50);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menus = ["홈", "흡연구역", "혼잡도", "가이드"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hide ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-white/90 backdrop-blur shadow-sm">
        {/* 최대폭 1280px로 간격제한 -> 실무기준추천세팅 */}
        <div className="flex justify-between items-center px-8 py-0.8 max-w-7xl mx-auto">
          {/* <div className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto"> 최대폭 1440px로 간격제한*/}
          {/* <div className="flex justify-between items-center px-8 py-4"> 화면폭에 맞춤 */}

          {/* Logo */}
          <div className="font-bold text-xl text-primary flex items-center gap-3 mb-4 mt-4">
            <div className="w-10 h-10">
              <img
                src="/image/logo.png"
                alt="AI Partner 로고"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-2xl text-primary leading-none">
              FLOW
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {menus.map((menu) => (
              <li
                key={menu}
                className="cursor-pointer hover:text-primary transition"
              >
                {menu}
              </li>
            ))}
            <button className="bg-primary text-white px-5 py-2 rounded-full hover:scale-105 transition-transform">
              산책 신청하기
            </button>
          </ul>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <ul className="flex flex-col items-center py-6 gap-4">
              {menus.map((menu) => (
                <li
                  key={menu}
                  className="text-lg cursor-pointer hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {menu}
                </li>
              ))}
              <button className="mt-2 bg-primary text-white px-6 py-2 rounded-full">
                산책 신청하기
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
