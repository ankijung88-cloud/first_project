import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface SmokingMapProps {
  onBack: () => void;
}

export default function SmokingMap({ onBack }: SmokingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [keyword, setKeyword] = useState("");
  const markersRef = useRef<any[]>([]);

  const generateDataAtLocation = (lat: number, lng: number) => {
    const dummyData = [];
    const step = 0.005;
    const range = 5; // 성능을 위해 범위를 소폭 조정했습니다.

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        dummyData.push({
          latitude: (lat + i * step).toFixed(6),
          longitude: (lng + j * step).toFixed(6),
        });
      }
    }
    return dummyData;
  };

  const renderMarkers = (map: any) => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const center = map.getCenter();
    const data = generateDataAtLocation(center.getLat(), center.getLng());

    const markerImage = new window.kakao.maps.MarkerImage(
      "/image/marker_smoke.png",
      new window.kakao.maps.Size(35, 35)
    );

    data.forEach((item) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(item.latitude, item.longitude),
        image: markerImage,
        map: map,
      });
      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    const initializeMap = (lat: number, lng: number) => {
      window.kakao.maps.load(() => {
        if (mapContainerRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 4,
          };
          const map = new window.kakao.maps.Map(
            mapContainerRef.current,
            options
          );
          mapRef.current = map;

          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map: map,
          });

          window.kakao.maps.event.addListener(map, "idle", () => {
            renderMarkers(map);
          });

          renderMarkers(map);
        }
      });
    };

    const startApp = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => initializeMap(pos.coords.latitude, pos.coords.longitude),
          () => initializeMap(37.5665, 126.978)
        );
      } else {
        initializeMap(37.5665, 126.978);
      }
    };

    const scriptId = "kakao-map-sdk";
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      startApp();
    } else {
      const existingScript = document.getElementById(scriptId);
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=7eb77dd1772e545a47f6066b2de87d8f&autoload=false&libraries=services`;
        script.async = true;
        script.onload = startApp;
        document.head.appendChild(script);
      }
    }
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !mapRef.current) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const moveLatLng = new window.kakao.maps.LatLng(data[0].y, data[0].x);
        mapRef.current.setCenter(moveLatLng);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 p-4">
      {/* 1. 상단 검색 바 영역 (지도 프레임 밖) */}
      <div className="w-[1024px] mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            실시간 흡연구역 위치 확인
          </h2>
          <p className="text-sm text-gray-500">
            지도에 흡연구역 마커가 표시됩니다.
          </p>
        </div>
        <form
          onSubmit={onSearch}
          className="flex gap-2 p-3 bg-white rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="지역 검색 (예: 강남역)"
            className="flex-1 px-4 py-2 outline-none border rounded-md focus:border-blue-500 text-base"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* 2. 지도 프레임 (1024 * 800) */}
      <div
        className="relative shadow-2xl border border-gray-200 rounded-xl overflow-hidden"
        style={{ width: "1024px", height: "600px" }}
      >
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* 3. 하단 버튼 영역 */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onBack}
          className="bg-gray-900 hover:bg-black text-white px-10 py-3 rounded-full shadow-lg transition-transform active:scale-95"
        >
          종료하기
        </button>
      </div>
    </div>
  );
}
