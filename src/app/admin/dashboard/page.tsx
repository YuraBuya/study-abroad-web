'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  School, 
  FileText, 
  Building, 
  GraduationCap,
  BarChart3,
  Clock,
  Plus,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KPI } from '@/components/admin/KPI';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '@/components/admin/AdminCard';

interface School {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  type: 'UNIVERSITY' | 'LANGUAGE_INSTITUTE' | 'GRADUATE_SCHOOL';
  logo?: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  id: string;
  type: 'school' | 'brochure';
  action: 'created' | 'updated';
  name: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [schools, setSchools] = useState<School[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch schools
      const schoolsResponse = await fetch('/api/admin/schools', {
        credentials: 'include'
      });
      
      if (schoolsResponse.ok) {
        const schoolsData = await schoolsResponse.json();
        setSchools(schoolsData);
        
        // Generate mock activity data based on schools
        const mockActivities: Activity[] = schoolsData.slice(0, 5).map((school: School) => ({
          id: school.id,
          type: 'school',
          action: Math.random() > 0.5 ? 'created' : 'updated',
          name: school.name,
          timestamp: school.updatedAt || school.createdAt,
        }));
        setActivities(mockActivities);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // KPI Data
  const stats = {
    totalSchools: schools.length,
    universities: schools.filter(s => s.type === 'UNIVERSITY').length,
    languageInstitutes: schools.filter(s => s.type === 'LANGUAGE_INSTITUTE').length,
    totalBrochures: 0, // In a real implementation, you would fetch this from an API
  };

  // Activity columns
  const activityColumns: ColumnDef<Activity>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.type === 'school' ? (
            <School className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <FileText className="h-4 w-4 mr-2 text-green-500" />
          )}
          <span className="capitalize">
            {row.original.type.replace('_', ' ')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <span className={`capitalize ${row.original.action === 'created' ? 'text-green-600' : 'text-blue-600'}`}>
          {row.original.action}
        </span>
      ),
    },
    {
      accessorKey: 'timestamp',
      header: 'Date',
      cell: ({ row }) => (
        <span>
          {format(new Date(row.original.timestamp), 'MMM dd, yyyy')}
        </span>
      ),
    },
  ];

  const quickActions = [
    {
      title: 'Add School',
      description: 'Add a new educational institution',
      icon: <Plus className="h-5 w-5" />,
      onClick: () => router.push('/admin/add-school'),
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Upload Brochure',
      description: 'Upload a new brochure',
      icon: <FileText className="h-5 w-5" />,
      onClick: () => router.push('/admin/brochures'),
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Manage Schools',
      description: 'View and edit all schools',
      icon: <Building className="h-5 w-5" />,
      onClick: () => router.push('/admin/schools'),
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'View Reports',
      description: 'Analytics and reports',
      icon: <BarChart3 className="h-5 w-5" />,
      onClick: () => router.push('/admin/reports'),
      color: 'from-purple-500 to-pink-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to your admin dashboard"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI
          title="Total Schools"
          value={stats.totalSchools}
          icon={<School className="h-5 w-5" />}
          trend="up"
          trendValue="12%"
        />
        <KPI
          title="Universities"
          value={stats.universities}
          icon={<Building className="h-5 w-5" />}
          description="Active institutions"
        />
        <KPI
          title="Language Institutes"
          value={stats.languageInstitutes}
          icon={<GraduationCap className="h-5 w-5" />}
          description="Teaching centers"
        />
        <KPI
          title="Total Brochures"
          value={stats.totalBrochures}
          icon={<FileText className="h-5 w-5" />}
          trend="up"
          trendValue="8%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AdminCard hoverEffect={true} className="h-full">
              <AdminCardContent className="flex flex-col h-full">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} mb-4`}>
                  <div className="text-white">
                    {action.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{action.description}</p>
                <Button 
                  variant="adminSecondary" 
                  size="adminSm" 
                  className="w-full"
                  onClick={action.onClick}
                >
                  Get Started
                </Button>
              </AdminCardContent>
            </AdminCard>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="flex items-center text-gray-800">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Recent Activity
          </AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <DataTable 
            columns={activityColumns} 
            data={activities} 
          />
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}