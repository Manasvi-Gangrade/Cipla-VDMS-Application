import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon?: ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
}

const MetricCard = ({ label, value, change, icon, variant = "default" }: MetricCardProps) => {
  const variantClasses = {
    default: "bg-card",
    primary: "bg-gradient-to-br from-primary to-primary-dark text-white",
    success: "bg-gradient-to-br from-success to-green-600 text-white",
    warning: "bg-gradient-to-br from-warning to-yellow-600 text-white",
  };

  const textClass = variant === "default" ? "text-gray-800" : "text-white";
  const subtextClass = variant === "default" ? "text-muted-foreground" : "text-white opacity-90";

  return (
    <Card className={`card-shadow card-hover ${variantClasses[variant]}`}>
      <CardContent className="p-6 text-center">
        {icon && <div className="mb-3">{icon}</div>}
        <h3 className={`text-3xl font-bold mb-1 ${textClass}`}>{value}</h3>
        <p className={`text-sm ${subtextClass}`}>{label}</p>
        {change && (
          <p className={`text-xs mt-2 font-medium ${
            variant === "default" 
              ? (change.isPositive ? "text-success" : "text-destructive")
              : "text-white opacity-80"
          }`}>
            {change.isPositive ? '↑' : '↓'} {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
