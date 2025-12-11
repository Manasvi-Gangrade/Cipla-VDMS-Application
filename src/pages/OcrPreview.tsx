import { useState } from "react";
import { Check, Edit2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  editable: boolean;
}

const OcrPreview = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [fields, setFields] = useState<ExtractedField[]>([
    { label: "Retailer Name", value: "Sharma Medical Store", confidence: 95, editable: true },
    { label: "Invoice Number", value: "INV-2024-0312", confidence: 98, editable: true },
    { label: "Invoice Date", value: "2024-03-15", confidence: 92, editable: true },
    { label: "Total Amount", value: "₹45,230", confidence: 88, editable: true },
  ]);

  const skuItems = [
    { sku: "CIPL-PARA-500-10", name: "Paracetamol 500mg (10 strips)", qty: 50, confidence: 94 },
    { sku: "CIPL-AMOX-250-15", name: "Amoxicillin 250mg (15 strips)", qty: 30, confidence: 89 },
    { sku: "CIPL-OMEP-20-20", name: "Omeprazole 20mg (20 strips)", qty: 25, confidence: 96 },
  ];

  const handleApprove = () => {
    toast({
      title: "Data approved",
      description: "Invoice data has been validated and saved",
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
      <PageHeader
        title="OCR Extraction Preview"
        description="Review and correct extracted invoice data"
        actions={
          <>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? "Cancel Edit" : "Edit Fields"}
            </Button>
            <Button onClick={handleApprove} variant="success">
              <Check className="mr-2 h-4 w-4" />
              Approve & Submit
            </Button>
          </>
        }
      />

      {/* Alert Banner */}
      <Card className="border-warning bg-warning-light">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <p className="text-sm text-gray-700">
            2 fields have confidence below 90%. Please review before submitting.
          </p>
        </CardContent>
      </Card>

      {/* Extracted Fields */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Invoice Header Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">{field.label}</Label>
                  {getConfidenceBadge(field.confidence)}
                </div>
                {isEditing && field.editable ? (
                  <Input 
                    value={field.value} 
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].value = e.target.value;
                      setFields(newFields);
                    }}
                    className="font-mono"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="font-mono text-gray-800">{field.value}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SKU Items Table */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Extracted SKU Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product Name</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {skuItems.map((item, index) => (
                  <tr key={index} className="border-b border-border hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{item.name}</td>
                    <td className="py-4 px-4 text-right text-sm font-medium">{item.qty}</td>
                    <td className="py-4 px-4 text-right">
                      {getConfidenceBadge(item.confidence)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Auto-suggestions */}
      <Card className="card-shadow bg-blue-light border-blue">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Check className="h-5 w-5 text-blue" />
            Auto-Correction Suggestions
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• SKU "CIPL-AMOX-250-15" matched to "Amoxicillin 250mg" with 98% similarity</li>
            <li>• Retailer "Sharma Medical" identified as registered retailer ID: RET-00234</li>
            <li>• Invoice date format auto-corrected from "15/03/2024" to "2024-03-15"</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OcrPreview;
