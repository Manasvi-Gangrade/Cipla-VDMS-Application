import { RefreshCw, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const AdminIngestion = () => {
  const incomingFiles = [
    { 
      id: 1, 
      filename: "INV_2024_0315.pdf", 
      source: "File Upload", 
      status: "Completed", 
      timestamp: "10:30 AM",
      distributor: "Mumbai Dist-01"
    },
    { 
      id: 2, 
      filename: "Secondary_Sales_API.json", 
      source: "API", 
      status: "Processing", 
      timestamp: "10:28 AM",
      distributor: "Delhi Dist-03"
    },
    { 
      id: 3, 
      filename: "IMG_Invoice_2024.jpg", 
      source: "Image Upload", 
      status: "Pending", 
      timestamp: "10:25 AM",
      distributor: "Bangalore Dist-07"
    },
    { 
      id: 4, 
      filename: "Email_Forward_Sales.eml", 
      source: "Email", 
      status: "Failed", 
      timestamp: "10:20 AM",
      distributor: "Pune Dist-12"
    },
    { 
      id: 5, 
      filename: "Voice_Note_Retailer_Count.mp3", 
      source: "Voice", 
      status: "Completed", 
      timestamp: "10:15 AM",
      distributor: "Hyderabad Dist-05"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-warning" />;
      case "Failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variantMap: Record<string, "success" | "warning" | "destructive" | "info"> = {
      "Completed": "success",
      "Processing": "warning",
      "Failed": "destructive",
      "Pending": "info"
    };
    return <Badge variant={variantMap[status] || "default"}>{status}</Badge>;
  };

  const getSourceBadge = (source: string) => {
    const colors: Record<string, string> = {
      "File Upload": "bg-primary-light text-primary",
      "API": "bg-blue-light text-blue",
      "Image Upload": "bg-success-light text-success",
      "Email": "bg-gray-200 text-gray-700",
      "Voice": "bg-warning-light text-warning"
    };
    return <Badge variant="outline" className={colors[source] || ""}>{source}</Badge>;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ERP-Agnostic Ingestion Panel</h1>
        <p className="text-muted-foreground">Monitor and manage incoming data from all sources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Files Today"
          value="127"
          icon={Clock}
          trend={{ value: "18% from yesterday", isPositive: true }}
          tooltip="Total number of files ingested across all sources today"
        />
        <StatCard
          title="Successfully Processed"
          value="114"
          icon={CheckCircle}
          tooltip="Files that completed processing without errors"
        />
        <StatCard
          title="Currently Processing"
          value="8"
          icon={RefreshCw}
          tooltip="Files currently being processed by the OCR and ETL pipeline"
        />
        <StatCard
          title="Failed/Errors"
          value="5"
          icon={AlertCircle}
          tooltip="Files that encountered errors during processing"
        />
      </div>

      {/* Incoming Files Table */}
      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Ingestion Activity</CardTitle>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Filename</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Distributor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomingFiles.map((file) => (
                  <tr key={file.id} className="border-b border-border hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <span className="text-sm font-medium text-gray-700">{file.filename}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getSourceBadge(file.source)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{file.distributor}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{file.timestamp}</td>
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(file.status)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm">View</Button>
                        {file.status === "Failed" && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Error Logs */}
      <Card className="card-shadow border-destructive bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Recent Errors & Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-destructive">
              <p className="text-sm font-medium text-gray-800 mb-1">Email parsing failed - INV_Email_2024.eml</p>
              <p className="text-xs text-muted-foreground mb-2">Error: Unable to extract structured data from email body</p>
              <Button variant="outline" size="sm">Reprocess with Manual Review</Button>
            </div>
            <div className="p-4 bg-white rounded-lg border border-warning">
              <p className="text-sm font-medium text-gray-800 mb-1">Low confidence OCR - IMG_2024_0312.jpg</p>
              <p className="text-xs text-muted-foreground mb-2">Warning: Confidence score 62% - Manual verification recommended</p>
              <Button variant="outline" size="sm">Review Extraction</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIngestion;
