interface CrowdProps {
  onShowCrowdMap: () => void;
}

export default function Crowd({ onShowCrowdMap }: CrowdProps) {
  return (
    // 1. flex 및 items-center, justify-center를 추가하여 섹션 전체의 중앙을 잡습니다.
    <section className="w-full bg-primary/5 min-h-screen relative flex items-center justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* 2. lg:text-left를 text-center로 통일하여 텍스트 정렬을 중앙으로 맞춥니다. */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* LEFT - IMAGE 영역 */}
          <div className="flex-1 flex justify-center">
            <div className="rounded-2xl shadow-lg overflow-hidden w-full max-w-[420px]">
              <img
                src="/image/crowdArea.png"
                alt="혼잡아이콘"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* RIGHT - TEXT 영역 */}
          <div className="flex-1 text-center max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold">혼잡도 확인</h3>
            <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
              실시간 혼잡도 정보를 통해 가장 쾌적한 시간을 선택할 수 있습니다.
            </p>
            <button
              onClick={onShowCrowdMap}
              className="mt-6 sm:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base"
            >
              서비스 자세히 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
