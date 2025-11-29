import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MyData() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [businessData, setBusinessData] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);

    // Load business profile
    const { data: business } = await supabase
      .from("business_data")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Load uploaded files
    const { data: uploadedFiles } = await supabase
      .from("uploaded_files")
      .select("*")
      .eq("user_id", user.id)
      .order("uploaded_at", { ascending: false });

    // Load reports
    const { data: generatedReports } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("generated_at", { ascending: false });

    setBusinessData(business);
    setFiles(uploadedFiles || []);
    setReports(generatedReports || []);
    setLoading(false);
  };

  const handleDeleteFile = async (fileId: string) => {
    const { error } = await supabase.from("uploaded_files").delete().eq("id", fileId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "File deleted successfully" });
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-card">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-2xl font-bold">My Data</h1>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Business Profile</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>Your current business configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {businessData ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Sector</p>
                          <p className="text-lg">{businessData.sector}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Scope</p>
                          <p className="text-lg">{businessData.scope}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Location</p>
                          <p className="text-lg">{businessData.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Description</p>
                          <p className="text-lg">{businessData.business_description}</p>
                        </div>
                        <Button onClick={() => navigate("/business-setup")}>
                          Update Profile
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No business profile yet</p>
                        <Button onClick={() => navigate("/business-setup")}>
                          Create Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Documents</CardTitle>
                    <CardDescription>Manage your compliance documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {files.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                    ) : (
                      <div className="space-y-6">
                        {/* Group files by type */}
                        {['ce_certificate', 'esg_reports', 'sustainability_certs'].map((fileType) => {
                          const typeFiles = files.filter(f => f.file_type === fileType);
                          if (typeFiles.length === 0) return null;
                          
                          const typeLabel = fileType.split('_').map(w => 
                            w.charAt(0).toUpperCase() + w.slice(1)
                          ).join(' ');
                          
                          return (
                            <div key={fileType} className="space-y-3">
                              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                {typeLabel}
                              </h3>
                              <div className="space-y-2">
                                {typeFiles.map((file) => (
                                  <div
                                    key={file.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                                      <div className="min-w-0 flex-1">
                                        <p className="font-medium truncate">{file.file_name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Uploaded {new Date(file.uploaded_at).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.open(file.file_url, "_blank")}
                                        title="Download"
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteFile(file.id)}
                                        title="Delete"
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Your compliance analysis reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reports.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No reports generated yet</p>
                        <Button onClick={() => navigate("/business-setup")}>
                          Generate First Report
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {reports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => navigate(`/reports/${report.id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{report.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Generated {new Date(report.generated_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
