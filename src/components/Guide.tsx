interface GuideProps {
  onWalkClick: () => void;
}

export default function Guide({ onWalkClick }: GuideProps) {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-center bg-cover bg-center">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/image/guide_bg.png"
      />
      {/* 어두운 오버레이 (가독성용)
      <div className="absolute inset-0 bg-black/40" /> */}

      {/* 콘텐츠 */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white">Guide</h2>

        <p className="mt-4 text-gray-200">
          해당 서비스의 가이드 소개 부분입니다.
        </p>

        <button
          onClick={onWalkClick} // 클릭 시 WalkCourseList가 열리도록 함수 연결
          className="mt-8 bg-primary text-white px-8 py-3 rounded-full hover:scale-105 transition"
        >
          산책신청하기
        </button>
      </div>
    </div>
  );
}
