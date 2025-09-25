'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  School, 
  Building, 
  GraduationCap,
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '@/components/admin/AdminCard';

interface SchoolData {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  type: 'UNIVERSITY' | 'LANGUAGE_INSTITUTE' | 'GRADUATE_SCHOOL';
  logo?: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<SchoolData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<SchoolData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/admin/schools', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
        setFilteredSchools(data);
      } else {
        toast.error('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      toast.error('Error fetching schools');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;

    try {
      const response = await fetch(`/api/admin/schools/${schoolToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('School deleted successfully');
        fetchSchools(); // Refresh the list
      } else {
        toast.error('Failed to delete school');
      }
    } catch (error) {
      console.error('Error deleting school:', error);
      toast.error('Error deleting school');
    } finally {
      setDeleteDialogOpen(false);
      setSchoolToDelete(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'UNIVERSITY':
        return <Building className="h-4 w-4 text-blue-500" />;
      case 'LANGUAGE_INSTITUTE':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'GRADUATE_SCHOOL':
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      default:
        return <School className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'UNIVERSITY':
        return 'University';
      case 'LANGUAGE_INSTITUTE':
        return 'Language Institute';
      case 'GRADUATE_SCHOOL':
        return 'Graduate School';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
      case 'inactive':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Inactive</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  // School columns
  const schoolColumns: ColumnDef<SchoolData>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.logo ? (
            <img 
              src={row.original.logo} 
              alt={row.original.name} 
              className="h-10 w-10 rounded-lg object-cover mr-3 border border-gray-200"
            />
          ) : (
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3 border border-gray-200">
              <School className="h-4 w-4 text-gray-500" />
            </div>
          )}
          <div>
            <div className="font-medium">{row.original.name}</div>
            {row.original.nameKorean && (
              <div className="text-sm text-muted-foreground">{row.original.nameKorean}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <div className="flex items-center">
          {getTypeIcon(row.original.type)}
          <span className="ml-2">{getTypeLabel(row.original.type)}</span>
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: ({ row }) => (
        <span>{format(new Date(row.original.updatedAt), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="adminSecondary" 
            size="adminSm"
            onClick={() => router.push(`/admin/schools/${row.original.id}`)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="adminSm"
            onClick={() => router.push(`/admin/schools/${row.original.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="adminDestructive" 
            size="adminSm"
            onClick={() => {
              setSchoolToDelete(row.original);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      ),
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
        title="Schools"
        subtitle="Manage educational institutions"
        actions={
          <Button 
            variant="adminPrimary" 
            size="admin"
            onClick={() => router.push('/admin/add-school')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add School
          </Button>
        }
      />

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="flex items-center text-gray-800">
            <School className="h-5 w-5 mr-2 text-blue-600" />
            Schools Management
          </AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <DataTable 
            columns={schoolColumns} 
            data={filteredSchools} 
            searchField="name"
          />
        </AdminCardContent>
      </AdminCard>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete School"
        description={`Are you sure you want to delete "${schoolToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteSchool}
        confirmVariant="destructive"
      />
    </div>
  );
}