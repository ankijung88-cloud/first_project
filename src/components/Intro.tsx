export default function Intro() {
  return (
    <section className="w-full h-full bg-primary/5 py-24">
      <div className="w-full py-16 px-4 sm:px-6 lg:px-16 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mt-12">
          {/* 텍스트 영역 */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary font-semibold text-sm sm:text-base">
              스마트 위험 감지 시스템
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-snug">
              보이지 않는 위험,
              <br />
              가장 먼저 감지합니다
            </h2>
            <br />
            <h4 className="text-gray-700 text-sm sm:text-base md:text-lg">
              보이지 않는 위험까지 놓치지 않고 가장 먼저 감지합니다.
              <br />
              당신의 안전을 지키는 든든한 첫 번째 방패가 되겠습니다.
            </h4>

            <button className="mt-6 sm:mt-8 bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base">
              서비스 자세히 보기
            </button>

            {/* 아이콘 + 설명 (수평 배치, 모바일에서는 세로) */}
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 sm:gap-10">
              {/* 아이콘 1 */}
              <div className="flex items-start gap-2 sm:gap-3">
                <img
                  src="/image/smokeIcon.png"
                  alt="연기아이콘"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-xs sm:text-sm">PM 1.0</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    초미세먼지 감지
                  </p>
                </div>
              </div>

              {/* 아이콘 2 */}
              <div className="flex items-start gap-2 sm:gap-3">
                <img
                  src="/image/signalIcon.png"
                  alt="신호아이콘"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-xs sm:text-sm">0.1초</p>
                  <p className="text-gray-500 text-xs sm:text-sm">반응속도</p>
                </div>
              </div>
            </div>
          </div>

          {/* 영상 박스 영역 */}
          <div className="flex-1 flex justify-center mt-8 lg:mt-0">
            <div className="w-full max-w-[630px] h-[280px] sm:h-[360px] lg:h-[420px] bg-white rounded-xl shadow-md overflow-hidden">
              <video
                src="/video/video-03.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
