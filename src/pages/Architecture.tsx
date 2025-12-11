import { Database, Cloud, Cpu, Lock, BarChart, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Architecture = () => {
  const layers = [
    {
      title: "Multimodal Ingestion Layer",
      icon: Layers,
      color: "bg-primary-light text-primary",
      components: [
        "File Upload (PDF, Excel, Images)",
        "API Integration (REST/GraphQL)",
        "Email Parsing Engine",
        "Voice-to-Text Transcription",
        "Camera Capture OCR"
      ]
    },
    {
      title: "OCR & ETL Pipeline",
      icon: Cpu,
      color: "bg-blue-light text-blue",
      components: [
        "Advanced OCR Engine (Tesseract + ML)",
        "Document Classification",
        "Field Extraction & Validation",
        "Data Transformation Rules",
        "Quality Scoring Engine"
      ]
    },
    {
      title: "AI Reconciliation Layer",
      icon: Cpu,
      color: "bg-success-light text-success",
      components: [
        "Fuzzy Matching Algorithm",
        "SKU Standardization ML Model",
        "Retailer Identity Resolution",
        "Duplicate Detection",
        "Confidence Scoring"
      ]
    },
    {
      title: "Privacy & Compliance Layer",
      icon: Lock,
      color: "bg-warning-light text-warning",
      components: [
        "Federated Learning Framework",
        "Data Anonymization",
        "Encryption at Rest & Transit",
        "Access Control (RBAC)",
        "Audit Logging"
      ]
    },
    {
      title: "Data Warehouse",
      icon: Database,
      color: "bg-gray-200 text-gray-700",
      components: [
        "Normalized Sales Data",
        "Distributor Profiles",
        "SKU Master Database",
        "Retailer Registry",
        "Historical Trends Storage"
      ]
    },
    {
      title: "Analytics & Reporting",
      icon: BarChart,
      color: "bg-primary-light text-primary",
      components: [
        "Real-time Dashboards",
        "Predictive Analytics",
        "Automated Insights Engine",
        "Custom Report Builder",
        "AI Assistant Interface"
      ]
    }
  ];

  const integrations = [
    { name: "Existing Cipla BI Tools", status: "Connected", type: "primary" },
    { name: "ERP Systems (SAP, Oracle)", status: "API Ready", type: "secondary" },
    { name: "Power BI / Tableau", status: "Export Available", type: "secondary" },
    { name: "Email Servers", status: "Integrated", type: "primary" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Architecture</h1>
        <p className="text-muted-foreground">Technical overview of the VDMS platform</p>
      </div>

      {/* Architecture Diagram */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            End-to-End Architecture Layers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {layers.map((layer, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg ${layer.color} flex items-center justify-center flex-shrink-0`}>
                    <layer.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-3">{layer.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {layer.components.map((component, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {component}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < layers.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Diagram */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Simplified Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 bg-gray-50 rounded-lg">
            {[
              "Distributor Upload",
              "VDMS Ingestion",
              "OCR Extraction",
              "ML Reconciliation",
              "Data Warehouse",
              "Analytics Dashboard"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                    {index + 1}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{step}</p>
                </div>
                {index < 5 && (
                  <div className="hidden lg:block text-primary text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Points */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>External System Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span className="text-sm font-medium text-gray-800">{integration.name}</span>
                <Badge 
                  className={integration.type === "primary" ? "bg-success text-white" : "bg-blue-light text-blue"}
                >
                  {integration.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center mb-4">
              <Cloud className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Cloud-Native</h3>
            <p className="text-sm text-muted-foreground">
              Built on scalable cloud infrastructure with auto-scaling capabilities to handle enterprise workloads.
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-warning-light flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Privacy-First</h3>
            <p className="text-sm text-muted-foreground">
              Federated learning ensures distributor data privacy while enabling collective intelligence.
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-blue-light flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-blue" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Machine learning models continuously improve accuracy of SKU matching and insights generation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Stack */}
      <Card className="card-shadow bg-primary-light border-primary">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="font-medium text-gray-700 mb-2">Frontend</p>
              <ul className="space-y-1 text-gray-600">
                <li>• React.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Backend</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Node.js / Python</li>
                <li>• FastAPI / Express</li>
                <li>• Redis Cache</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">AI/ML</p>
              <ul className="space-y-1 text-gray-600">
                <li>• TensorFlow</li>
                <li>• Tesseract OCR</li>
                <li>• Scikit-learn</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Data</p>
              <ul className="space-y-1 text-gray-600">
                <li>• PostgreSQL</li>
                <li>• MongoDB</li>
                <li>• Apache Kafka</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Architecture;
