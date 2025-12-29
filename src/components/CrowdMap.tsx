import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface CrowdMapProps {
  onBack: () => void;
}

export default function CrowdMap({ onBack }: CrowdMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [keyword, setKeyword] = useState("");
  const circlesRef = useRef<any[]>([]);

  // 혼잡도 데이터를 생성하는 함수 (Circle 객체 사용)
  const renderCrowdData = (map: any) => {
    circlesRef.current.forEach((circle) => circle.setMap(null));
    circlesRef.current = [];

    const center = map.getCenter();
    const dummyCrowd = [
      {
        lat: center.getLat() + 0.001,
        lng: center.getLng() + 0.001,
        level: "high",
      },
      {
        lat: center.getLat() - 0.001,
        lng: center.getLng() - 0.002,
        level: "mid",
      },
      {
        lat: center.getLat() + 0.002,
        lng: center.getLng() - 0.001,
        level: "low",
      },
    ];

    dummyCrowd.forEach((data) => {
      const color =
        data.level === "high"
          ? "#FF0000"
          : data.level === "mid"
          ? "#FFA500"
          : "#00FF00";
      const circle = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(data.lat, data.lng),
        radius: 100, // 반지름 (미터)
        strokeWeight: 1,
        strokeColor: color,
        strokeOpacity: 0.8,
        fillColor: color,
        fillOpacity: 0.4,
      });
      circle.setMap(map);
      circlesRef.current.push(circle);
    });
  };

  useEffect(() => {
    const initializeMap = (lat: number, lng: number) => {
      window.kakao.maps.load(() => {
        if (!mapContainerRef.current) return;
        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        });
        mapRef.current = map;
        window.kakao.maps.event.addListener(map, "idle", () =>
          renderCrowdData(map)
        );
        renderCrowdData(map);
      });
    };

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=7eb77dd1772e545a47f6066b2de87d8f&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => initializeMap(pos.coords.latitude, pos.coords.longitude),
          () => initializeMap(37.5665, 126.978)
        );
      } else {
        initializeMap(37.5665, 126.978);
      }
    };
    document.head.appendChild(script);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(data[0].y, data[0].x)
        );
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 p-4">
      <div className="w-[1024px] mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            실시간 지역 혼잡도
          </h2>
          <p className="text-sm text-gray-500">
            붉은색 영역일수록 사람이 많습니다.
          </p>
        </div>
        <form
          onSubmit={onSearch}
          className="flex gap-2 bg-white p-2 rounded-lg shadow-sm border"
        >
          <input
            className="px-3 py-1 outline-none text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="지역 검색"
          />
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
            검색
          </button>
        </form>
      </div>
      <div
        className="relative shadow-2xl border rounded-xl overflow-hidden"
        style={{ width: "1024px", height: "600px" }}
      >
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
      <button
        onClick={onBack}
        className="mt-6 bg-gray-900 text-white px-10 py-3 rounded-full"
      >
        종료하기
      </button>
    </div>
  );
}
