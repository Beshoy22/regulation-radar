import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Upload, BarChart3, Clock } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    businessProfiles: 0,
    documentsUploaded: 0,
    reportsGenerated: 0,
  });
  const [recentReports, setRecentReports] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    // Load business data count
    const { count: businessCount } = await supabase
      .from("business_data")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Load documents count
    const { count: documentsCount } = await supabase
      .from("uploaded_files")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    // Load reports count and recent reports
    const { count: reportsCount } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    const { data: reports } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("generated_at", { ascending: false })
      .limit(3);

    setStats({
      businessProfiles: businessCount || 0,
      documentsUploaded: documentsCount || 0,
      reportsGenerated: reportsCount || 0,
    });

    setRecentReports(reports || []);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-card">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-2xl font-bold">Dashboard</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Business Profiles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.businessProfiles}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active configurations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.documentsUploaded}</div>
                  <p className="text-xs text-muted-foreground mt-1">Compliance certificates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.reportsGenerated}</div>
                  <p className="text-xs text-muted-foreground mt-1">Analysis reports</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button onClick={() => navigate("/business-setup")}>
                  Set Up Business Profile
                </Button>
                <Button variant="outline" onClick={() => navigate("/my-data")}>
                  View My Data
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your latest compliance analyses</CardDescription>
              </CardHeader>
              <CardContent>
                {recentReports.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No reports generated yet. Create your first report by setting up your business profile.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => navigate(`/reports/${report.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(report.generated_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
