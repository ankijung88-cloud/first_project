interface SmokingBoothProps {
  onShowMap: () => void;
}

export default function SmokingBooth({ onShowMap }: SmokingBoothProps) {
  return (
    <section className="w-full bg-[#E2F1EA] h-full pt-16 flex items-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* LEFT - TEXT */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              흡연부스 위치 확인
            </h3>
            <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
              주변 흡연부스 위치를 빠르게 확인하여 불필요한 이동과 혼잡을 줄일
              수 있습니다.
            </p>
            <button
              onClick={onShowMap}
              className="mt-6 sm:mt-8 bg-[#2D5A43] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
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
  );
}
