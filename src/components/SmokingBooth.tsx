"use client";

import { useState } from "react";

export default function SmokingBooth() {
  const [showBlank, setShowBlank] = useState(false);

  return (
    <div className="relative">
      {/* ================= 기존 SmokingBooth 섹션 ================= */}
      <section className={"w-full bg-[#E2F1EA] min-h-screen pt-16"}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* LEFT - TEXT */}
            <div className="flex-1 text-center lg:text-left max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold">
                흡연부스 위치 확인
              </h3>
              <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                주변 흡연부스 위치를 빠르게 확인하여 불필요한 이동과 혼잡을 줄일
                수 있습니다.
              </p>
              <button
                onClick={() => setShowBlank(true)}
                className="mt-6 sm:mt-8 bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base"
              >
                서비스 자세히 보기
              </button>
            </div>

            {/* RIGHT - IMAGE */}
            <div className="flex-1 flex justify-center mt-8 lg:mt-0">
              <div className="rounded-2xl shadow-lg overflow-hidden w-full max-w-[420px]">
                <img
                  src="/image/smokeArea.png"
                  alt="지역아이콘"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 빈 페이지 오버레이 ================= */}
      {showBlank && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="text-gray-400 text-lg">빈 페이지</div>
          <button
            onClick={() => setShowBlank(false)}
            className="fixed bottom-6 right-20 bg-primary text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 text-sm sm:text-base"
          >
            BACK
          </button>
        </div>
      )}
    </div>
  );
}
