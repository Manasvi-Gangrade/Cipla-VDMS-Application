import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface MappingSuggestion {
  rawSku: string;
  suggestedSku: string;
  productName: string;
  confidence: number;
  status: "pending" | "accepted" | "rejected";
}

const SkuReconciliation = () => {
  const { toast } = useToast();

  const mappings: MappingSuggestion[] = [
    { rawSku: "PARA500-10S", suggestedSku: "CIPL-PARA-500-10", productName: "Paracetamol 500mg (10 strips)", confidence: 96, status: "pending" },
    { rawSku: "AMX250/15", suggestedSku: "CIPL-AMOX-250-15", productName: "Amoxicillin 250mg (15 strips)", confidence: 89, status: "pending" },
    { rawSku: "OMP20X20", suggestedSku: "CIPL-OMEP-20-20", productName: "Omeprazole 20mg (20 strips)", confidence: 94, status: "accepted" },
    { rawSku: "CETRIZ-10MG", suggestedSku: "CIPL-CETR-10-10", productName: "Cetirizine 10mg (10 strips)", confidence: 78, status: "pending" },
  ];

  const retailerMappings = [
    { raw: "Sharma Medical", suggested: "Sharma Medical Store", id: "RET-00234", confidence: 92, duplicates: [] },
    { raw: "Kumar Pharma", suggested: "Kumar Pharmacy", id: "RET-00189", confidence: 88, duplicates: ["Kumar Medical", "Kumar Stores"] },
    { raw: "City Drug Store", suggested: "City Drugs & Pharmacy", id: "RET-00567", confidence: 95, duplicates: [] },
  ];

  const handleAccept = (rawSku: string) => {
    toast({
      title: "Mapping accepted",
      description: `${rawSku} has been mapped successfully`,
    });
  };

  const handleReject = (rawSku: string) => {
    toast({
      title: "Mapping rejected",
      description: "Please provide correct SKU mapping",
      variant: "destructive"
    });
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="success">High: {confidence}%</Badge>;
    } else if (confidence >= 75) {
      return <Badge variant="warning">Medium: {confidence}%</Badge>;
    } else {
      return <Badge variant="destructive">Low: {confidence}%</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SKU Reconciliation & Mapping</h1>
        <p className="text-muted-foreground">AI-powered intelligent mapping using fuzzy matching & ML</p>
      </div>

      {/* Progress Overview */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mapping Progress</span>
              <span className="text-sm font-medium text-gray-700">3 of 4 SKUs mapped (75%)</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>1 Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span>3 Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>0 Rejected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SKU Mapping Suggestions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>SKU Mapping Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mappings.map((mapping, index) => (
              <div key={index} className="p-6 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Raw SKU</p>
                        <code className="text-sm bg-gray-100 px-3 py-1.5 rounded font-mono">{mapping.rawSku}</code>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary mt-5" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Suggested Standard SKU</p>
                        <code className="text-sm bg-primary-light text-primary px-3 py-1.5 rounded font-mono">{mapping.suggestedSku}</code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{mapping.productName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {getConfidenceBadge(mapping.confidence)}
                    {mapping.status === "pending" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleReject(mapping.rawSku)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          variant="success"
                          onClick={() => handleAccept(mapping.rawSku)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    )}
                    {mapping.status === "accepted" && (
                      <Badge className="bg-success text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Accepted
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retailer Identity Resolution */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Retailer Identity Resolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {retailerMappings.map((retailer, index) => (
              <div key={index} className="p-6 border border-border rounded-lg">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Input Name</p>
                        <p className="text-sm font-medium text-gray-700">{retailer.raw}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Matched Retailer</p>
                        <p className="text-sm font-medium text-primary">{retailer.suggested}</p>
                        <p className="text-xs text-muted-foreground mt-1">ID: {retailer.id}</p>
                      </div>
                    </div>
                    {retailer.duplicates.length > 0 && (
                      <div className="p-3 bg-warning-light rounded-md">
                        <p className="text-xs text-gray-700 mb-1">⚠️ Potential duplicates detected:</p>
                        <div className="flex gap-2 flex-wrap">
                          {retailer.duplicates.map((dup, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{dup}</Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="link" className="p-0 h-auto text-xs mt-2">
                          Merge duplicates
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {getConfidenceBadge(retailer.confidence)}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Override</Button>
                      <Button size="sm" variant="success">Accept</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ML Info Card */}
      <Card className="card-shadow bg-blue-light border-blue">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3">How ML-Powered Mapping Works</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Fuzzy Matching:</strong> Identifies similar SKUs even with typos or format variations</li>
            <li>• <strong>Confidence Scoring:</strong> Each suggestion includes a confidence level based on historical data</li>
            <li>• <strong>Learning:</strong> System improves accuracy as you accept/reject mappings</li>
            <li>• <strong>Duplicate Detection:</strong> Automatically identifies potential duplicate retailer entries</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkuReconciliation;
