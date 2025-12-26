import { useState, useRef, useEffect } from "react";

export default function Crowd() {
  const [showDetail, setShowDetail] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null); // TypeScript 타입 명시

  // 빈 페이지에서 스크롤 막기
  useEffect(() => {
    if (showDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetail]);

  // ================= 상세 페이지 컴포넌트 =================
  const DetailPage = () => (
    <div
      style={{
        height: sectionRef.current?.offsetHeight || "auto", // 옵셔널 체이닝
      }}
      className="absolute top-0 left-0 w-full bg-white z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="text-gray-400 text-lg mb-6">빈 페이지 (상세 내용)</div>
      <button
        onClick={() => setShowDetail(false)}
        className="bg-primary text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 text-sm sm:text-base"
      >
        BACK
      </button>
    </div>
  );

  // ================= 버튼 클릭 시 상세 페이지 렌더링 =================
  if (showDetail) return <DetailPage />;

  // ================= 기존 Crowd 섹션 =================
  return (
    <section
      ref={sectionRef}
      className="w-full bg-primary/5 min-h-screen pt-16 relative"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* LEFT - IMAGE */}
          <div className="flex-1 flex justify-center mb-8 lg:mb-0">
            <div className="rounded-2xl shadow-lg overflow-hidden w-full max-w-[420px]">
              <img
                src="/image/crowdArea.png"
                alt="혼잡아이콘"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* RIGHT - TEXT */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold">혼잡도 확인</h3>
            <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
              실시간 혼잡도 정보를 통해 가장 쾌적한 시간을 선택할 수 있습니다.
            </p>
            <button
              onClick={() => setShowDetail(true)}
              className="mt-6 sm:mt-8 bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base"
            >
              서비스 자세히 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
