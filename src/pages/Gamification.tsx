import { Trophy, Award, Star, TrendingUp, Calendar, Target, Zap, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MetricCard from "@/components/MetricCard";

const Gamification = () => {
  const achievements = [
    { 
      icon: Trophy, 
      title: "Upload Champion", 
      description: "Complete 50 uploads in a month",
      progress: 48,
      total: 50,
      unlocked: false,
      color: "text-warning"
    },
    { 
      icon: Target, 
      title: "Perfect Week", 
      description: "7 consecutive days of uploads",
      progress: 7,
      total: 7,
      unlocked: true,
      color: "text-success"
    },
    { 
      icon: Star, 
      title: "Quality Master", 
      description: "Achieve 95%+ data quality for a month",
      progress: 94,
      total: 95,
      unlocked: false,
      color: "text-blue"
    },
    { 
      icon: Zap, 
      title: "Early Bird", 
      description: "Upload before 9 AM, 10 times",
      progress: 10,
      total: 10,
      unlocked: true,
      color: "text-primary"
    },
  ];

  const timeline = [
    { date: "Today", event: "Invoice uploaded - INV-2024-0315", type: "upload", points: 10 },
    { date: "Yesterday", event: "Achieved 7-day streak!", type: "achievement", points: 50 },
    { date: "2 days ago", event: "3 invoices uploaded", type: "upload", points: 30 },
    { date: "3 days ago", event: "Quality score: 96%", type: "quality", points: 25 },
    { date: "5 days ago", event: "Invoice uploaded - Early Bird bonus", type: "upload", points: 15 },
    { date: "1 week ago", event: "Perfect week achievement unlocked", type: "achievement", points: 100 },
  ];

  const leaderboard = [
    { rank: 1, name: "Mumbai Dist-01", score: 2450, streak: 28 },
    { rank: 2, name: "Bangalore Dist-07", score: 2380, streak: 25 },
    { rank: 3, name: "Delhi Dist-03", score: 2290, streak: 22 },
    { rank: 4, name: "You (Distributor)", score: 2150, streak: 18 },
    { rank: 5, name: "Hyderabad Dist-05", score: 2080, streak: 20 },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "upload": return <Calendar className="h-4 w-4 text-primary" />;
      case "achievement": return <Trophy className="h-4 w-4 text-warning" />;
      case "quality": return <Star className="h-4 w-4 text-success" />;
      default: return <Award className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements & Timeline</h1>
        <p className="text-muted-foreground">Track your progress and compete with other distributors</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          label="Total Points"
          value="2,150"
          icon={<TrendingUp className="h-10 w-10 mx-auto opacity-90" />}
          variant="primary"
        />
        <MetricCard
          label="Day Streak"
          value="18"
          icon={<Zap className="h-10 w-10 mx-auto opacity-90" />}
          variant="warning"
        />
        <MetricCard
          label="Achievements"
          value="2/4"
          icon={<Trophy className="h-10 w-10 mx-auto opacity-90" />}
          variant="success"
        />
        <MetricCard
          label="Leaderboard Rank"
          value="#4"
          icon={<Target className="h-10 w-10 mx-auto opacity-90" />}
          variant="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full ${achievement.unlocked ? 'bg-success-light' : 'bg-gray-100'} flex items-center justify-center`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.unlocked ? achievement.color : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        {achievement.unlocked && (
                          <Badge variant="success">Unlocked</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.total}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Distributor Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`p-4 rounded-lg border ${entry.name.includes('You') ? 'border-primary bg-primary-light' : 'border-border bg-gray-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${
                      entry.rank === 1 ? 'bg-warning' :
                      entry.rank === 2 ? 'bg-gray-400' :
                      entry.rank === 3 ? 'bg-amber-600' :
                      'bg-gray-300 text-gray-700'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{entry.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" /> {entry.score} pts
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" /> {entry.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Your Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center">
                    {getEventIcon(item.type)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">{item.event}</p>
                    <Badge variant="outline" className="text-xs">
                      +{item.points} pts
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incentives Info */}
      <Card className="card-shadow bg-gradient-to-r from-primary-light to-blue-light border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Gift className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Upcoming Rewards</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Bronze Tier (2,500 pts):</strong> 5% cashback on next order</li>
                <li>• <strong>Silver Tier (5,000 pts):</strong> Priority support + 10% cashback</li>
                <li>• <strong>Gold Tier (10,000 pts):</strong> Exclusive distributor events + 15% cashback</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">Keep uploading consistently to unlock rewards!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Gamification;
