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

  // 1. 특정 좌표를 기준으로 주변 데이터를 생성하는 함수
  const generateDataAtLocation = (lat: number, lng: number) => {
    const dummyData = [];
    const step = 0.005; // 약 500m 간격
    const range = 20; // 중심 반경 20개씩 (0.001기준 총 1,600개 - 성능을 위해 조정)

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

  // 2. 현재 지도 화면에 마커를 그리는 핵심 함수
  const renderMarkers = (map: any) => {
    // 기존 마커 제거
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

          // 내 현재 위치 표시
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            map: map,
          });

          // 지도가 멈출 때마다 마커 새로 그리기
          window.kakao.maps.event.addListener(map, "idle", () => {
            renderMarkers(map);
          });

          // 초기 실행
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
        // 이동 후 자동으로 idle 이벤트가 발생하며 renderMarkers가 실행됩니다.
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999]">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-5 left-5 z-[10001] w-72">
        <form
          onSubmit={onSearch}
          className="flex gap-2 p-2 bg-white rounded-lg shadow-lg"
        >
          <input
            type="text"
            placeholder="지역 검색 (예: 강남역)"
            className="flex-1 px-3 py-2 outline-none border-b focus:border-blue-500 text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            검색
          </button>
        </form>
      </div>
      <button
        onClick={onBack}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-3 rounded-full shadow-2xl z-[10000]"
      >
        종료하기
      </button>
    </div>
  );
}
