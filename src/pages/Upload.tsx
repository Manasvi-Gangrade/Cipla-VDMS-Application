import { useState } from "react";
import { Upload, Camera, FileText, Mic, Image as ImageIcon, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
      toast({
        title: "File selected",
        description: `${file.name} ready to upload`,
      });
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      toast({
        title: "Upload started",
        description: "Your file is being processed...",
      });
      // Simulate upload
      setTimeout(() => {
        toast({
          title: "Upload successful",
          description: "OCR extraction in progress",
        });
      }, 1500);
    }
  };

  const uploadMethods = [
    {
      icon: FileText,
      title: "PDF Invoice",
      description: "Upload invoice in PDF format",
      color: "bg-blue-light text-blue",
    },
    {
      icon: Camera,
      title: "Camera Capture",
      description: "Take a photo of the invoice",
      color: "bg-primary-light text-primary",
    },
    {
      icon: ImageIcon,
      title: "Gallery/Files",
      description: "Select from your device",
      color: "bg-success-light text-success",
    },
    {
      icon: Mic,
      title: "Voice Note",
      description: "Record retailer count/SKU summary",
      color: "bg-warning-light text-warning",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Submit Secondary Sales Data</h1>
        <p className="text-muted-foreground">Choose your preferred method to upload invoice data</p>
      </div>

      {/* Upload Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {uploadMethods.map((method, index) => (
          <Card key={index} className="card-shadow card-hover cursor-pointer" onClick={() => document.getElementById('file-input')?.click()}>
            <CardContent className="p-6 text-center">
              <div className={`h-16 w-16 mx-auto rounded-full ${method.color} flex items-center justify-center mb-4`}>
                <method.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Input (Hidden) */}
      <input
        id="file-input"
        type="file"
        accept="image/*,application/pdf,.xlsx,.xls"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Preview Section */}
      {selectedFile && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>File Preview</CardTitle>
            <CardDescription>Review your file before processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {previewUrl ? (
                <div className="flex justify-center">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-96 rounded-lg border border-border"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                  <File className="h-12 w-12 text-primary" />
                  <div>
                    <p className="font-medium text-gray-800">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} variant="success">
                  <Upload className="mr-2 h-4 w-4" />
                  Process File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Tips */}
      <Card className="card-shadow bg-blue-light border-blue">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Tips for Better OCR Accuracy</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Ensure good lighting and clear focus when capturing images</li>
            <li>• Use PDF format when available for best results</li>
            <li>• Make sure all text is readable and not blurred</li>
            <li>• Include the complete invoice with all details visible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
