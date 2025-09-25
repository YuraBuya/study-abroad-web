'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Shield, Link, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/admin/PageHeader';
import { motion } from 'framer-motion';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '@/components/admin/AdminCard';

interface SettingsData {
  agencyName: string;
  defaultLocale: string;
  supportEmail: string;
  supportPhone: string;
  facebookUrl: string;
  consultationUrl: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<SettingsData>({
    agencyName: '',
    defaultLocale: 'en',
    supportEmail: '',
    supportPhone: '',
    facebookUrl: '',
    consultationUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        credentials: "include", // Include cookies
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to load settings');
      }
      
      const data = await res.json();
      setFormData(data.settings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (data.error && typeof data.error === 'object' && data.error.fieldErrors) {
          // Handle validation errors
          const fieldErrors: Record<string, string> = {};
          Object.keys(data.error.fieldErrors).forEach(field => {
            fieldErrors[field] = data.error.fieldErrors[field].join(', ');
          });
          setErrors(fieldErrors);
        }
        throw new Error(data.error || 'Failed to save settings');
      }
      
      setFormData(data.settings);
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'links', label: 'Links/CTA', icon: Link },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your agency settings and preferences"
        showBackButton
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <AdminCard>
            <AdminCardHeader>
              <AdminCardTitle>Settings Menu</AdminCardTitle>
            </AdminCardHeader>
            <AdminCardContent>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.div
                      key={tab.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "adminPrimary" : "adminSecondary"}
                        className={`w-full justify-start rounded-lg h-11 ${activeTab === tab.id ? '' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </Button>
                    </motion.div>
                  );
                })}
              </nav>
            </AdminCardContent>
          </AdminCard>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit}>
            {activeTab === 'general' && (
              <AdminCard>
                <AdminCardHeader>
                  <AdminCardTitle>General Settings</AdminCardTitle>
                  <p className="text-sm text-gray-600">
                    Update your agency information and default preferences.
                  </p>
                </AdminCardHeader>
                <AdminCardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="agencyName">Agency Name *</Label>
                      <Input
                        id="agencyName"
                        name="agencyName"
                        value={formData.agencyName}
                        onChange={handleChange}
                        placeholder="Enter agency name"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.agencyName && (
                        <p className="text-sm text-red-500">{errors.agencyName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="defaultLocale">Default Locale *</Label>
                      <Input
                        id="defaultLocale"
                        name="defaultLocale"
                        value={formData.defaultLocale}
                        onChange={handleChange}
                        placeholder="e.g. en, ko"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.defaultLocale && (
                        <p className="text-sm text-red-500">{errors.defaultLocale}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email *</Label>
                      <Input
                        id="supportEmail"
                        name="supportEmail"
                        type="email"
                        value={formData.supportEmail}
                        onChange={handleChange}
                        placeholder="support@agency.com"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.supportEmail && (
                        <p className="text-sm text-red-500">{errors.supportEmail}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportPhone">Support Phone</Label>
                      <Input
                        id="supportPhone"
                        name="supportPhone"
                        value={formData.supportPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.supportPhone && (
                        <p className="text-sm text-red-500">{errors.supportPhone}</p>
                      )}
                    </div>
                  </div>
                </AdminCardContent>
              </AdminCard>
            )}

            {activeTab === 'links' && (
              <AdminCard>
                <AdminCardHeader>
                  <AdminCardTitle>Links & Call-to-Action</AdminCardTitle>
                  <p className="text-sm text-gray-600">
                    Configure links used across the admin panel.
                  </p>
                </AdminCardHeader>
                <AdminCardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebookUrl">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Facebook Page URL
                        </div>
                      </Label>
                      <Input
                        id="facebookUrl"
                        name="facebookUrl"
                        type="url"
                        value={formData.facebookUrl}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourpage"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.facebookUrl && (
                        <p className="text-sm text-red-500">{errors.facebookUrl}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="consultationUrl">
                        <div className="flex items-center">
                          <Link className="mr-2 h-4 w-4" />
                          Consultation Link
                        </div>
                      </Label>
                      <Input
                        id="consultationUrl"
                        name="consultationUrl"
                        type="url"
                        value={formData.consultationUrl}
                        onChange={handleChange}
                        placeholder="https://youragency.com/consultation"
                        className="rounded-lg h-11"
                        disabled={saving}
                      />
                      {errors.consultationUrl && (
                        <p className="text-sm text-red-500">{errors.consultationUrl}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Used for quick actions throughout the admin panel
                      </p>
                    </div>
                  </div>
                </AdminCardContent>
              </AdminCard>
            )}

            {activeTab === 'security' && (
              <AdminCard>
                <AdminCardHeader>
                  <AdminCardTitle>Security Settings</AdminCardTitle>
                  <p className="text-sm text-gray-600">
                    Update your security preferences. Note: Authentication uses adminAuth cookie.
                  </p>
                </AdminCardHeader>
                <AdminCardContent className="space-y-6">
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex">
                      <Shield className="h-5 w-5 text-yellow-600" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Security Note</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Authentication is handled via the adminAuth cookie.
                            To rotate your admin password, update the environment variable and restart the application.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AdminCardContent>
              </AdminCard>
            )}

            <div className="flex justify-end pt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  disabled={saving} 
                  variant="adminPrimary"
                  className="rounded-lg h-11 min-h-[44px] min-w-[44px]"
                >
                  {saving ? (
                    <>
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4"
                      >
                        ⏳
                      </motion.span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}