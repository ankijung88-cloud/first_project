import { useEffect, useRef } from "react";

export default function WalkCourseMap({
  course,
  onBack,
}: {
  course: any;
  onBack: () => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=7eb77dd1772e545a47f6066b2de87d8f&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(course.lat, course.lng),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(course.lat, course.lng),
            map: map,
          });
        }
      });
    };
    document.head.appendChild(script);
  }, [course]);

  return (
    <div className="fixed inset-0 bg-white z-[10000] flex flex-col items-center">
      <div className="w-full max-w-[1024px] p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{course.name} 지도</h2>
        <button onClick={onBack} className="text-gray-500 hover:text-black">
          닫기
        </button>
      </div>
      <div
        ref={mapRef}
        style={{ width: "1024px", height: "700px" }}
        className="rounded-2xl shadow-2xl border"
      />
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-4">{course.desc}</p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-12 py-3 rounded-full shadow-lg"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
}
