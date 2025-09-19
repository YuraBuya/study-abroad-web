import React from 'react';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBackground?: string; // Optional background color class
};

export default function ServiceCard({ icon, title, description, iconBackground = "bg-blue-100" }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 ${iconBackground} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}