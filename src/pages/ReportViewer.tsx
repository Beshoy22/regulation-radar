import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Printer } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReportViewer() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && reportId) {
      loadReport();
    }
  }, [user, reportId]);

  const loadReport = async () => {
    if (!user || !reportId) return;

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", reportId)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error loading report:", error);
    } else {
      setReport(data);
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Report not found</h2>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-card print:hidden">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center">
                <SidebarTrigger />
                <h1 className="ml-4 text-2xl font-bold">Report Viewer</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print/PDF
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 max-w-5xl mx-auto">
            <Card className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
                <p className="text-muted-foreground">
                  Generated on {new Date(report.generated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Strategic Plot Image */}
              {report.report_image_url && (
                <div className="mb-8">
                  <img
                    src={report.report_image_url}
                    alt="Strategic Risk Radar & Financial Liability Projection"
                    className="w-full rounded-lg border"
                  />
                  <p className="text-sm text-muted-foreground italic text-center mt-2">
                    Figure 1: Strategic Risk Radar & Financial Liability Projection
                  </p>
                </div>
              )}

              {/* Markdown Analysis */}
              <div className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-bold 
                prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-foreground
                prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                prose-p:text-base prose-p:leading-relaxed prose-p:my-3
                prose-strong:font-semibold prose-strong:text-foreground
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-2 prose-li:text-foreground
                prose-table:w-full prose-table:border-collapse prose-table:my-6
                prose-th:border prose-th:border-border prose-th:p-3 prose-th:bg-muted prose-th:font-semibold prose-th:text-left
                prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-foreground
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
                prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-hr:my-8 prose-hr:border-border">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-primary" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-foreground" {...props} />,
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-6">
                        <table {...props} />
                      </div>
                    ),
                  }}
                >
                  {report.report_markdown}
                </ReactMarkdown>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
