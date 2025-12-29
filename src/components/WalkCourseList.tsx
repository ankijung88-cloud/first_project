interface Course {
  id: number;
  name: string;
  dist: string;
  lat: number;
  lng: number;
  desc: string;
}

export default function WalkCourseList({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (c: Course) => void;
}) {
  // 가상의 추천 산책로 데이터 (실제 서비스 시 API 연동 가능)
  const courses: Course[] = [
    {
      id: 1,
      name: "숲길 산책로",
      dist: "800m",
      lat: 37.5665,
      lng: 126.978,
      desc: "나무가 울창한 힐링 코스입니다.",
    },
    {
      id: 2,
      name: "강변 조깅 코스",
      dist: "1.2km",
      lat: 37.5675,
      lng: 126.979,
      desc: "시원한 강바람을 맞으며 걷기 좋습니다.",
    },
    {
      id: 3,
      name: "도심 야경길",
      dist: "500m",
      lat: 37.5655,
      lng: 126.977,
      desc: "밤에 걷기 좋은 분위기 있는 길입니다.",
    },
    {
      id: 4,
      name: "정적 정원길",
      dist: "300m",
      lat: 37.5685,
      lng: 126.976,
      desc: "조용히 명상하며 걷기 좋은 정원입니다.",
    },
    {
      id: 5,
      name: "테마 파크웨이",
      dist: "1.5km",
      lat: 37.5645,
      lng: 126.98,
      desc: "다양한 볼거리가 있는 산책길입니다.",
    },
    {
      id: 6,
      name: "비밀의 숲길",
      dist: "2km",
      lat: 37.5695,
      lng: 126.981,
      desc: "사람이 적어 한적하게 산책할 수 있습니다.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 z-[9999] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">근처 추천 산책로</h2>
        <p className="text-gray-600 mb-8">
          현재 위치 기반으로 선정된 가장 쾌적한 산책로입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${course.id}/400/300`}
                    alt="산책로"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{course.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">
                  내 위치에서 {course.dist}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {course.desc}
                </p>
              </div>
              <button
                onClick={() => onSelect(course)}
                className="mt-6 w-full py-3 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-xl transition-colors font-semibold"
              >
                산책로 보기
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-12 block mx-auto px-10 py-3 bg-gray-900 text-white rounded-full"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
