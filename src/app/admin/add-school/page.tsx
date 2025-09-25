'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { 
  School, 
  Upload, 
  Link as LinkIcon,
  Globe,
  Mail,
  Phone,
  FileText as FileTextIcon,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Temporarily using a custom textarea implementation due to import issues
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/admin/PageHeader';
import { FormField } from '@/components/admin/FormField';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '@/components/admin/AdminCard';
import { motion } from 'framer-motion';

const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  nameKorean: z.string().optional(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  type: z.enum(['UNIVERSITY', 'LANGUAGE_INSTITUTE', 'GRADUATE_SCHOOL']),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  coverImage: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: '',
      nameKorean: '',
      location: '',
      type: 'UNIVERSITY',
      website: '',
      email: '',
      phone: '',
      description: '',
      logo: '',
      coverImage: '',
      tags: [],
      status: 'active',
    },
  });

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/admin/upload-school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('School added successfully!');
        reset();
        // Redirect to the new school's detail page
        router.push(`/admin/schools/${result.id}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to add school');
      }
    } catch (error) {
      console.error('Error adding school:', error);
      toast.error('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New School"
        subtitle="Add a new educational institution to the system"
        showBackButton
      />

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>School Information</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* School Name */}
              <div className="sm:col-span-3">
                <FormField
                  label="School Name (English)"
                  error={errors.name?.message}
                  required
                >
                  <Input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="Harvard University"
                    className="rounded-lg"
                  />
                </FormField>
              </div>

              {/* Korean Name */}
              <div className="sm:col-span-3">
                <FormField
                  label="School Name (Korean)"
                  error={errors.nameKorean?.message}
                >
                  <Input
                    id="nameKorean"
                    type="text"
                    {...register('nameKorean')}
                    placeholder="하버드 대학교"
                    className="rounded-lg"
                  />
                </FormField>
              </div>

              {/* Location */}
              <div className="sm:col-span-4">
                <FormField
                  label="Location"
                  error={errors.location?.message}
                  required
                >
                  <Input
                    id="location"
                    type="text"
                    {...register('location')}
                    placeholder="Cambridge, MA, USA"
                    className="rounded-lg"
                  />
                </FormField>
              </div>

              {/* School Type */}
              <div className="sm:col-span-2">
                <FormField
                  label="School Type"
                  error={errors.type?.message}
                  required
                >
                  <select
                    id="type"
                    {...register('type')}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="UNIVERSITY">University</option>
                    <option value="LANGUAGE_INSTITUTE">Language Institute</option>
                    <option value="GRADUATE_SCHOOL">Graduate School</option>
                  </select>
                </FormField>
              </div>

              {/* Website */}
              <div className="sm:col-span-3">
                <FormField
                  label="Website"
                  error={errors.website?.message}
                  description="Official website URL"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="website"
                      type="text"
                      {...register('website')}
                      placeholder="https://example.com"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>

              {/* Email */}
              <div className="sm:col-span-3">
                <FormField
                  label="Email"
                  error={errors.email?.message}
                  description="Official contact email"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="contact@school.edu"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>

              {/* Phone */}
              <div className="sm:col-span-3">
                <FormField
                  label="Phone"
                  error={errors.phone?.message}
                  description="Official contact phone"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="text"
                      {...register('phone')}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>

              {/* Status */}
              <div className="sm:col-span-3">
                <FormField
                  label="Status"
                  error={errors.status?.message}
                >
                  <select
                    id="status"
                    {...register('status')}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </FormField>
              </div>

              {/* Description */}
              <div className="sm:col-span-6">
                <FormField
                  label="Description"
                  error={errors.description?.message}
                  description="Detailed description of the school"
                >
                  {/* Using a custom textarea implementation due to import issues */}
                  <textarea
                    id="description"
                    {...register('description')}
                    placeholder="Enter a detailed description of the school..."
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormField>
              </div>

              {/* Logo URL */}
              <div className="sm:col-span-3">
                <FormField
                  label="Logo URL"
                  error={errors.logo?.message}
                  description="URL to the school's logo image"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="logo"
                      type="text"
                      {...register('logo')}
                      placeholder="https://example.com/logo.png"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>

              {/* Cover Image URL */}
              <div className="sm:col-span-3">
                <FormField
                  label="Cover Image URL"
                  error={errors.coverImage?.message}
                  description="URL to the school's cover image"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="coverImage"
                      type="text"
                      {...register('coverImage')}
                      placeholder="https://example.com/cover.jpg"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>

              {/* Tags */}
              <div className="sm:col-span-6">
                <FormField
                  label="Tags"
                  error={errors.tags?.message}
                  description="Comma-separated tags (e.g., ivy-league, research, prestigious)"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="tags"
                      type="text"
                      {...register('tags')}
                      placeholder="ivy-league, research, prestigious"
                      className="pl-10 rounded-lg"
                    />
                  </div>
                </FormField>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="adminSecondary"
                  onClick={() => router.push('/admin/schools')}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="adminPrimary"
                  className="rounded-lg"
                >
                  {isSubmitting ? (
                    <>
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4"
                      >
                        ⏳
                      </motion.span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <School className="mr-2 h-4 w-4" />
                      Add School
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </AdminCardContent>
      </AdminCard>

      {/* Form Help Section */}
      <AdminCard className="bg-blue-50 border-blue-200">
        <AdminCardContent className="pt-6">
          <h3 className="text-sm font-medium text-blue-800">Form Tips</h3>
          <div className="mt-2 text-sm text-blue-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              <li>Fields marked with * are required</li>
              <li>Logo and cover image URLs should be valid image URLs (PNG, JPG, SVG)</li>
              <li>Tags should be comma-separated (e.g., "ivy-league, research, prestigious")</li>
              <li>Korean name is optional but recommended for Korean institutions</li>
            </ul>
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}