'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  School, 
  Building, 
  GraduationCap,
  FileText,
  Edit,
  Trash2,
  Calendar,
  User,
  Link as LinkIcon,
  MapPin,
  Globe,
  Phone,
  Mail,
  Tag,
  Image as ImageIcon,
  FileText as FileTextIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/admin/PageHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface SchoolData {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  type: 'UNIVERSITY' | 'LANGUAGE_INSTITUTE' | 'GRADUATE_SCHOOL';
  logo?: string;
  coverImage?: string;
  pdfUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

export default function SchoolDetailPage({ params }: { params: { id: string } }) {
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSchool();
  }, [params.id]);

  const fetchSchool = async () => {
    try {
      const response = await fetch(`/api/admin/schools/${params.id}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSchool(data);
      } else {
        toast.error('Failed to fetch school details');
        router.push('/admin/schools');
      }
    } catch (error) {
      console.error('Error fetching school:', error);
      toast.error('Error fetching school details');
      router.push('/admin/schools');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchool = async () => {
    if (!school) return;

    try {
      const response = await fetch(`/api/admin/schools/${school.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('School deleted successfully');
        router.push('/admin/schools');
      } else {
        toast.error('Failed to delete school');
      }
    } catch (error) {
      console.error('Error deleting school:', error);
      toast.error('Error deleting school');
    } finally {
      setDeleteDialogOpen(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <School className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">School not found</h3>
          <p className="mt-1 text-sm text-gray-500">The requested school could not be found.</p>
          <div className="mt-6">
            <Button onClick={() => router.push('/admin/schools')}>
              Back to Schools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={school.name}
        subtitle={school.nameKorean}
        showBackButton
        actions={
          <div className="flex space-x-2">
            <Button onClick={() => router.push(`/admin/schools/${school.id}/edit`)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setDeleteDialogOpen(true)}
              className="rounded-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        }
      />

      <Card className="admin-card">
        <CardContent className="p-0">
          {school.coverImage && (
            <div className="h-48 w-full bg-gray-200 relative rounded-t-xl overflow-hidden">
              <img 
                src={school.coverImage} 
                alt={school.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-start">
                {school.logo ? (
                  <img 
                    src={school.logo} 
                    alt={school.name} 
                    className="h-16 w-16 rounded-lg object-cover mr-4 border border-gray-200"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center mr-4 border border-gray-200">
                    <School className="h-8 w-8 text-gray-500" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{school.name}</h2>
                  {school.nameKorean && (
                    <p className="text-lg text-gray-600">{school.nameKorean}</p>
                  )}
                  <div className="flex items-center mt-2">
                    {getTypeIcon(school.type)}
                    <span className="ml-2 text-gray-700">{getTypeLabel(school.type)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {school.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="programs" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Programs</TabsTrigger>
                <TabsTrigger value="brochures" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Brochures</TabsTrigger>
                <TabsTrigger value="seo" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">SEO</TabsTrigger>
                <TabsTrigger value="media" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Media</TabsTrigger>
                <TabsTrigger value="audit" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Audit Trail</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Card className="admin-card">
                    <CardHeader className="admin-card-header">
                      <CardTitle className="flex items-center admin-card-title">
                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                        Location & Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Address</p>
                          <p className="text-sm text-gray-600">{school.location}</p>
                        </div>
                      </div>
                      {school.website && (
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Website</p>
                            <a 
                              href={school.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {school.website}
                            </a>
                          </div>
                        </div>
                      )}
                      {school.email && (
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Email</p>
                            <a 
                              href={`mailto:${school.email}`} 
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {school.email}
                            </a>
                          </div>
                        </div>
                      )}
                      {school.phone && (
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Phone</p>
                            <a 
                              href={`tel:${school.phone}`} 
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {school.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="admin-card">
                    <CardHeader className="admin-card-header">
                      <CardTitle className="flex items-center admin-card-title">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {school.description ? (
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                          {school.description}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No description provided
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {school.tags && school.tags.length > 0 && (
                    <Card className="md:col-span-2 admin-card">
                      <CardHeader className="admin-card-header">
                        <CardTitle className="flex items-center admin-card-title">
                          <Tag className="h-5 w-5 mr-2 text-blue-600" />
                          Tags
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {school.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="programs">
                <div className="p-4">
                  <p className="text-gray-600">Program information will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="brochures">
                <div className="p-4">
                  <p className="text-gray-600">Brochure information will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="seo">
                <div className="p-4">
                  <p className="text-gray-600">SEO information will be displayed here.</p>
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="admin-card">
                      <CardHeader className="admin-card-header">
                        <CardTitle className="flex items-center admin-card-title">
                          <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Logo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {school.logo ? (
                          <div className="flex items-center">
                            <img 
                              src={school.logo} 
                              alt="Logo" 
                              className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-700">Logo URL</p>
                              <p className="text-sm text-gray-600 break-all">{school.logo}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No logo uploaded</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="admin-card">
                      <CardHeader className="admin-card-header">
                        <CardTitle className="flex items-center admin-card-title">
                          <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Cover Image
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {school.coverImage ? (
                          <div>
                            <img 
                              src={school.coverImage} 
                              alt="Cover" 
                              className="h-32 w-full object-cover rounded-lg border border-gray-200"
                            />
                            <p className="text-sm font-medium text-gray-700 mt-2">Cover Image URL</p>
                            <p className="text-sm text-gray-600 break-all">{school.coverImage}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No cover image uploaded</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audit">
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Created</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(school.createdAt), 'MMMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Last Updated</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(school.updatedAt), 'MMMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete School"
        description={`Are you sure you want to delete "${school.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteSchool}
        confirmVariant="destructive"
      />
    </div>
  );
}