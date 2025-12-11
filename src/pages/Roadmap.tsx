import { Calendar, CheckCircle, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1: Foundation",
      duration: "Days 1-30",
      status: "completed",
      progress: 100,
      milestones: [
        { task: "Multimodal ingestion setup (API, File, Email, Voice)", completed: true },
        { task: "OCR pipeline with Tesseract + ML enhancement", completed: true },
        { task: "Basic ETL framework with validation rules", completed: true },
        { task: "Distributor onboarding portal", completed: true },
        { task: "Admin ingestion monitoring panel", completed: true }
      ],
      deliverables: "Working data ingestion from all sources with basic processing"
    },
    {
      phase: "Phase 2: Intelligence",
      duration: "Days 31-60",
      status: "in-progress",
      progress: 65,
      milestones: [
        { task: "AI-powered SKU reconciliation engine", completed: true },
        { task: "Fuzzy matching & ML-based mapping", completed: true },
        { task: "Retailer identity resolution system", completed: true },
        { task: "AI assistant for distributor guidance", completed: false },
        { task: "Automated insights & anomaly detection", completed: false }
      ],
      deliverables: "Intelligent data reconciliation with minimal manual intervention"
    },
    {
      phase: "Phase 3: Deployment",
      duration: "Days 61-90",
      status: "planned",
      progress: 0,
      milestones: [
        { task: "Gamification & incentive system rollout", completed: false },
        { task: "Mobile app for distributors (iOS/Android)", completed: false },
        { task: "Pilot with 50 distributors", completed: false },
        { task: "Feedback collection & iteration", completed: false },
        { task: "Performance optimization & scale testing", completed: false }
      ],
      deliverables: "Production-ready system deployed to pilot distributors"
    },
    {
      phase: "Phase 4: Enterprise Integration",
      duration: "Days 91-120",
      status: "planned",
      progress: 0,
      milestones: [
        { task: "Integration with existing Cipla BI tools", completed: false },
        { task: "SAP/Oracle ERP connectors", completed: false },
        { task: "Full distributor network rollout", completed: false },
        { task: "Advanced analytics & predictive models", completed: false },
        { task: "Training & support documentation", completed: false }
      ],
      deliverables: "Complete enterprise-wide deployment with full integration"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-white">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-warning text-white">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-600">Planned</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "in-progress":
        return <Clock className="h-6 w-6 text-warning" />;
      default:
        return <Target className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Implementation Roadmap</h1>
        <p className="text-muted-foreground">120-day rollout plan for enterprise deployment</p>
      </div>

      {/* Overall Progress */}
      <Card className="card-shadow bg-primary-light border-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Overall Project Progress</h3>
            <span className="text-2xl font-bold text-primary">41%</span>
          </div>
          <Progress value={41} className="h-3 mb-2" />
          <p className="text-sm text-gray-700">Phase 2 (Intelligence Layer) currently in progress</p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-6">
        {phases.map((phase, index) => (
          <Card key={index} className="card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(phase.status)}
                  <div>
                    <CardTitle>{phase.phase}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{phase.duration}</p>
                  </div>
                </div>
                {getStatusBadge(phase.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              {phase.status !== "planned" && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Phase Progress</span>
                    <span className="font-medium text-gray-700">{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>
              )}

              {/* Milestones */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Milestones</h4>
                <div className="space-y-2">
                  {phase.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-0.5">
                        {milestone.completed ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <p className={`text-sm ${milestone.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                        {milestone.task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="p-4 bg-blue-light rounded-lg border border-blue">
                <p className="text-xs font-semibold text-gray-700 mb-1">Expected Deliverable</p>
                <p className="text-sm text-gray-800">{phase.deliverables}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Success Metrics */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Success Metrics & KPIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Technical KPIs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  OCR accuracy: 95%+ target
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  SKU mapping confidence: 90%+ average
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  System uptime: 99.9%
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Processing time: &lt;2 minutes per invoice
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Business KPIs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Distributor adoption: 80%+ participation
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Visibility coverage: 90%+ of secondary sales
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Upload frequency: 5+ per week per distributor
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  ROI: Achieve positive ROI within 6 months
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation */}
      <Card className="card-shadow bg-warning-light border-warning">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning" />
            Risk Mitigation Strategy
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Low distributor adoption:</strong> Gamification, incentives, and AI assistant for ease of use</li>
            <li>• <strong>Data quality issues:</strong> Multi-stage validation, confidence scoring, and manual review workflows</li>
            <li>• <strong>Integration challenges:</strong> ERP-agnostic design with flexible adapters</li>
            <li>• <strong>Privacy concerns:</strong> Federated learning, encryption, and clear data governance policies</li>
            <li>• <strong>Scale limitations:</strong> Cloud-native architecture with auto-scaling capabilities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roadmap;
