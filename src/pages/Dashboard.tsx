import { Upload, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatRelativeTime } from "@/lib/formatters";

const Dashboard = () => {
  const navigate = useNavigate();

  const recentUploads = [
    { id: 1, name: "INV-2024-0315.pdf", date: new Date(Date.now() - 2 * 3600000), status: "completed" },
    { id: 2, name: "Secondary_Sales_Mar.xlsx", date: new Date(Date.now() - 5 * 3600000), status: "processing" },
    { id: 3, name: "Retailer_Invoice_0234.jpg", date: new Date(Date.now() - 86400000), status: "completed" },
  ];

  const alerts = [
    { id: 1, message: "5 invoices pending review", type: "warning" },
    { id: 2, message: "New SKU mapping suggestions available", type: "info" },
    { id: 3, message: "Weekly upload target achieved!", type: "success" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Distributor</h1>
        <p className="text-muted-foreground">Here's your secondary sales visibility overview</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button 
          size="lg" 
          variant="premium"
          onClick={() => navigate('/upload')}
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Invoice
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          onClick={() => navigate('/ai-assistant')}
        >
          Get Help
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Visibility Score"
          value="87%"
          icon={TrendingUp}
          trend={{ value: "12% from last month", isPositive: true }}
          tooltip="Percentage of secondary sales data captured vs total estimated market"
        />
        <StatCard
          title="Uploads This Month"
          value="48"
          icon={Upload}
          subtitle="Target: 50"
          tooltip="Number of invoices uploaded this month. Target: 50 to achieve maximum visibility."
        />
        <StatCard
          title="Pending Reviews"
          value="5"
          icon={Clock}
          tooltip="Invoices that require manual review or verification"
        />
        <StatCard
          title="Data Quality"
          value="94%"
          icon={CheckCircle}
          trend={{ value: "3% improvement", isPositive: true }}
          tooltip="Overall accuracy of OCR extraction and data completeness"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Uploads */}
        <Card className="lg:col-span-2 card-shadow">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{upload.name}</p>
                    <p className="text-sm text-muted-foreground">{formatRelativeTime(upload.date)}</p>
                  </div>
                  <Badge 
                    variant={upload.status === "completed" ? "success" : "warning"}
                  >
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className={`h-5 w-5 flex-shrink-0 ${
                    alert.type === 'warning' ? 'text-warning' :
                    alert.type === 'success' ? 'text-success' :
                    'text-blue'
                  }`} />
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Monthly Upload Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">48 of 50 uploads completed</span>
              <span className="font-medium text-gray-700">96%</span>
            </div>
            <Progress value={96} className="h-3" />
            <p className="text-xs text-muted-foreground">Keep it up! Just 2 more uploads to reach your monthly target.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
