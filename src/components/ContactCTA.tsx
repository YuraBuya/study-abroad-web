export default function ContactCTA() {
  return (
    <section
      id="contact-cta"
      className="mt-6 mx-4 sm:mx-0"
      // NOTE: no "hidden" at base; visible by default
    >
      <div className="bg-sky-300 rounded-xl p-6 sm:p-8 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          Get Consultation Now!
        </h2>
        <p className="text-sm sm:text-xl text-blue-100 mb-5 sm:mb-6">
          전문 상담사가 당신의 유학 계획을 함께 세워드립니다
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="https://www.facebook.com/CCAgency.ub"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
          >
            무료 상담 신청 / Free Consultation
          </a>
          <a
            href="tel:+976-9411-3382"
            className="bg-blue-700 text-white px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 inline-flex items-center justify-center"
          >
            전화 상담 / Call Now
          </a>
        </div>
      </div>
    </section>
  );
}