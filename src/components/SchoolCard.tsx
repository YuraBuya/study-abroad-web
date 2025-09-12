import Image from 'next/image';

interface School {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  logo: string;
  pdfUrl: string;
}

interface SchoolCardProps {
  school: School;
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const handleLogoClick = () => {
    window.open(school.pdfUrl, '_blank');
  };

  return (
    <div className="card group w-full">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div
          className="w-20 h-20 mb-3 cursor-pointer transition-transform duration-300 group-hover:scale-110 touch-target"
          onClick={handleLogoClick}
        >
          <Image
            src={school.logo}
            alt={`${school.name} logo`}
            width={80}
            height={80}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* School Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 px-2">
          {school.name}
        </h3>
        
        {/* Korean Name if available */}
        {school.nameKorean && (
          <p className="text-sm text-gray-600 mb-2 px-2">
            {school.nameKorean}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center text-gray-500 mb-4 px-2">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{school.location}</span>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleLogoClick}
          className="btn w-full touch-target py-2 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SchoolCard;