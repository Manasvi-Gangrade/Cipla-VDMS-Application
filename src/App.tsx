import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import OcrPreview from "./pages/OcrPreview";
import AdminIngestion from "./pages/AdminIngestion";
import SkuReconciliation from "./pages/SkuReconciliation";
import Analytics from "./pages/Analytics";
import AiAssistant from "./pages/AiAssistant";
import Gamification from "./pages/Gamification";
import Architecture from "./pages/Architecture";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ocr-preview" element={<OcrPreview />} />
            <Route path="/admin-ingestion" element={<AdminIngestion />} />
            <Route path="/sku-reconciliation" element={<SkuReconciliation />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
