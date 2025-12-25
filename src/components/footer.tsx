export default function Footer() {
  return (
    <footer className="h-100 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* LOGO & DESCRIPTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8">
                <img
                  src="/image/logo.png"
                  alt="AI Partner 로고"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">FLOW</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              가족의 건강을 위한
              <br />
              AI 산책 파트너
            </p>
          </div>

          {/* SERVICE */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  서비스 소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  요금제
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  고객사례
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  이용가이드
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 1588-0000</li>
              <li>📧 support@flow.com</li>
              <li>🕐 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-5 pt-5 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 FORKAST RESTAURANT ANALYTICS. All rights reserved.</p>

          <div className="flex gap-">
            <a href="#" className="hover:text-white transition">
              이용약관
            </a>
            <a href="#" className="hover:text-white transition">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-white transition">
              사업자정보
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
