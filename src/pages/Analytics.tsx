import { TrendingUp, TrendingDown, MapPin, Package, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/StatCard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { formatIndianNumber } from "@/lib/formatters";

const Analytics = () => {
  const visibilityTrendData = [
    { week: "Week 1", visibility: 65 },
    { week: "Week 2", visibility: 72 },
    { week: "Week 3", visibility: 78 },
    { week: "Week 4", visibility: 87 },
  ];

  const regionData = [
    { region: "Mumbai", sales: 1250000, retailers: 234 },
    { region: "Delhi", sales: 980000, retailers: 189 },
    { region: "Bangalore", sales: 1150000, retailers: 267 },
    { region: "Pune", sales: 780000, retailers: 145 },
    { region: "Hyderabad", sales: 890000, retailers: 178 },
  ];

  const skuPerformance = [
    { sku: "CIPL-PARA-500", units: 45000, revenue: 2250000 },
    { sku: "CIPL-AMOX-250", units: 32000, revenue: 1920000 },
    { sku: "CIPL-OMEP-20", units: 28000, revenue: 1680000 },
    { sku: "CIPL-CETR-10", units: 25000, revenue: 1250000 },
    { sku: "CIPL-METF-500", units: 38000, revenue: 1900000 },
  ];

  const distributorContribution = [
    { name: "Mumbai Dist-01", value: 28 },
    { name: "Delhi Dist-03", value: 22 },
    { name: "Bangalore Dist-07", value: 18 },
    { name: "Pune Dist-12", value: 16 },
    { name: "Others", value: 16 },
  ];

  const COLORS = ['hsl(180, 65%, 42%)', 'hsl(210, 85%, 52%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(215, 16%, 47%)'];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Leadership view - Secondary sales insights and forecasting</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Secondary Sales"
          value="₹94.5L"
          icon={DollarSign}
          trend={{ value: "15.3% vs last month", isPositive: true }}
          tooltip="Total secondary sales value across all distributors this month"
        />
        <StatCard
          title="Active Retailers"
          value="1,013"
          icon={Users}
          trend={{ value: "8.2% growth", isPositive: true }}
          tooltip="Number of unique retailers with recorded transactions"
        />
        <StatCard
          title="SKUs in Market"
          value="127"
          icon={Package}
          subtitle="Across all distributors"
          tooltip="Total unique Cipla SKUs actively sold in the market"
        />
        <StatCard
          title="Avg Visibility Score"
          value="87%"
          icon={TrendingUp}
          trend={{ value: "12% improvement", isPositive: true }}
          tooltip="Average data visibility score across all regions"
        />
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="trends">Visibility Trends</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="skus">SKU Performance</TabsTrigger>
          <TabsTrigger value="distributors">Distributor Contribution</TabsTrigger>
        </TabsList>

        {/* Visibility Trends */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Weekly Visibility Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visibilityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visibility" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Analysis */}
        <TabsContent value="regions" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Region-wise Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Regional Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-800">{region.region}</p>
                        <p className="text-sm text-muted-foreground">{region.retailers} retailers</p>
                      </div>
                    </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{formatIndianNumber(region.sales)}</p>
                        <p className="text-xs text-muted-foreground">Secondary sales</p>
                      </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SKU Performance */}
        <TabsContent value="skus" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Top Performing SKUs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU Code</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Units Sold</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuPerformance.map((sku, index) => (
                      <tr key={index} className="border-b border-border hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{sku.sku}</code>
                        </td>
                        <td className="py-4 px-4 text-right font-medium">{sku.units.toLocaleString('en-IN')}</td>
                        <td className="py-4 px-4 text-right font-medium">{formatIndianNumber(sku.revenue)}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-success flex items-center justify-end gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {(Math.random() * 20 + 5).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distributor Contribution */}
        <TabsContent value="distributors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Distributor Contribution Share</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distributorContribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributorContribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Distributor Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {distributorContribution.slice(0, 4).map((dist, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white`}
                           style={{ backgroundColor: COLORS[index] }}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{dist.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${dist.value * 3}%`,
                              backgroundColor: COLORS[index]
                            }}
                          />
                        </div>
                      </div>
                      <span className="font-semibold text-gray-700">{dist.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Forecasting Card */}
      <Card className="card-shadow bg-primary-light border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <TrendingUp className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Forecast</h3>
              <p className="text-sm text-gray-700 mb-3">
                Based on current trends and historical data, we forecast:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Next month sales:</strong> Projected ₹108.3L (+14.6% growth)</li>
                <li>• <strong>Retailer penetration:</strong> Expected to reach 1,150 retailers</li>
                <li>• <strong>Top growth region:</strong> Bangalore showing 23% MoM increase</li>
                <li>• <strong>Visibility score:</strong> On track to achieve 92% by month-end</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
