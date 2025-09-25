"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  ChevronDown,
  Copy,
  Eye,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '@/components/admin/AdminCard';

export default function BrochureUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState<string>(""); 
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  // For brochure management
  const [brochures, setBrochures] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrochures, setFilteredBrochures] = useState<any[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // In a real implementation, you would fetch brochures from an API
    // For now, we'll use mock data
    const mockBrochures = [
      { id: 1, name: "Harvard University Brochure", slug: "harvard", url: "/pdfs/harvard.pdf", uploaded: "2023-05-15" },
      { id: 2, name: "MIT Brochure", slug: "mit", url: "/pdfs/mit.pdf", uploaded: "2023-06-22" },
      { id: 3, name: "Oxford Brochure", slug: "oxford", url: "/pdfs/oxford.pdf", uploaded: "2023-07-10" },
      { id: 4, name: "Gachon University Brochure", slug: "gachon", url: "/pdfs/gachon.pdf", uploaded: "2023-08-05" },
      { id: 5, name: "Korea University Brochure", slug: "korea", url: "/pdfs/korea.pdf", uploaded: "2023-09-12" },
      { id: 6, name: "Seoul National University Brochure", slug: "snu", url: "/pdfs/snu.pdf", uploaded: "2023-10-18" },
    ];
    setBrochures(mockBrochures);
    setFilteredBrochures(mockBrochures);
  }, []);

  useEffect(() => {
    filterBrochures();
  }, [brochures, searchTerm]);

  const filterBrochures = () => {
    let result = [...brochures];
    
    if (searchTerm) {
      result = result.filter(brochure => 
        brochure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brochure.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBrochures(result);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const totalPages = Math.ceil(filteredBrochures.length / itemsPerPage);
  
  const paginatedBrochures = filteredBrochures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setUrl("");
    
    if (!file) { 
      setError("Please select a PDF file.");
      toast.error("Please select a PDF file.");
      return; 
    }
    
    const fd = new FormData();
    fd.append("file", file);
    if (slug) fd.append("slug", slug);
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/upload-brochure", { method: "POST", body: fd });
      const data = await res.json();
      
      if (data.ok) {
        setUrl(data.url);
        toast.success("Brochure uploaded successfully!");
      } else {
        setError(data.error || "Upload failed.");
        toast.error(data.error || "Upload failed.");
      }
    } catch (err) {
      setError("Network error.");
      toast.error("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Brochures"
        subtitle="Upload and manage educational brochures"
        showBackButton
      />

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="flex items-center text-gray-800">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Upload New Brochure
          </AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <p className="text-sm text-gray-600 mb-6">
            Upload a PDF brochure for an institute. After upload, copy the URL and paste it into the institute configuration.
          </p>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="slug">
                  Institute slug (optional)
                </Label>
                <div className="mt-1">
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. gachon-kli"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="file">
                  PDF file *
                </Label>
                <div className="mt-1">
                  <Input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                variant="adminPrimary"
                size="admin"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Brochure
                  </>
                )}
              </Button>
            </div>
          </form>

          {url && (
            <div className="mt-6 border border-green-200 rounded-lg bg-green-50 p-4">
              <h4 className="text-sm font-medium text-green-800">Upload Successful!</h4>
              <p className="mt-1 text-sm text-green-700">
                Public URL for the brochure:
              </p>
              <div className="mt-2">
                <pre className="overflow-x-auto rounded bg-white p-3 text-sm">{url}</pre>
              </div>
              <p className="mt-3 text-sm text-green-700">
                Snippet for institute configuration:
              </p>
              <div className="mt-2">
                <pre className="overflow-x-auto rounded bg-white p-3 text-sm">{`brochureUrl: "${url}"`}</pre>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>

      {/* Brochures List with Search and Filter */}
      <AdminCard>
        <AdminCardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <AdminCardTitle className="flex items-center text-gray-800">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Existing Brochures
            </AdminCardTitle>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search brochures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 rounded-lg"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="adminSecondary" size="adminSm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg border border-gray-200">
                  <DropdownMenuItem className="py-2 px-3 hover:bg-gray-100 rounded-md">All</DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-3 hover:bg-gray-100 rounded-md">Recent</DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-3 hover:bg-gray-100 rounded-md">By Name</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </AdminCardHeader>
        <AdminCardContent>
          {filteredBrochures.length > 0 ? (
            <>
              <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brochure</TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</TableHead>
                      <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {paginatedBrochures.map((brochure, index) => (
                      <TableRow key={brochure.id} className={index % 2 === 0 ? "bg-white hover:bg-blue-50" : "bg-gray-50 hover:bg-blue-50"}>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{brochure.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{brochure.slug}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{brochure.uploaded}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button variant="adminSecondary" size="adminSm" asChild>
                              <a
                                href={brochure.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button 
                              variant="adminSecondary" 
                              size="adminSm" 
                              onClick={() => copyToClipboard(brochure.url)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-500">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBrochures.length)} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredBrochures.length)} of{' '}
                  {filteredBrochures.length} results
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="adminSecondary"
                    size="adminSm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="adminSecondary"
                    size="adminSm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No brochures found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by uploading a new brochure.
              </p>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}