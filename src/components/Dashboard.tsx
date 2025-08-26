import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageWithFallback from './figma/ImageWithFallback'; // Corrected import
import { 
  Code, 
  Calendar, 
  BookOpen, 
  Users, 
  LogOut, 
  Home,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Download,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

type DashboardProps = {
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
};

export function Dashboard({ user, onLogout, onNavigate }: DashboardProps) {
  const [activeWeek, setActiveWeek] = useState(2);

  const weeklyProgress = [
    { week: 1, title: 'HTML & CSS Fundamentals', completed: true, progress: 100 },
    { week: 2, title: 'JavaScript Essentials', completed: false, progress: 75 },
    { week: 3, title: 'React Development', completed: false, progress: 0 },
    { week: 4, title: 'Full-Stack Project', completed: false, progress: 0 },
  ];

  const upcomingAssignments = [
    { title: 'JavaScript DOM Project', dueDate: '2025-01-25', status: 'pending' },
    { title: 'API Integration Exercise', dueDate: '2025-01-27', status: 'submitted' },
    { title: 'React Components Challenge', dueDate: '2025-02-01', status: 'upcoming' },
  ];

  const resources = [
    { title: 'Week 2 - JavaScript Guide', type: 'PDF', size: '2.4 MB' },
    { title: 'DOM Manipulation Examples', type: 'Code', size: '1.1 MB' },
    { title: 'API Integration Tutorial', type: 'Video', size: '45 min' },
    { title: 'Practice Exercises', type: 'ZIP', size: '3.2 MB' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'upcoming': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#006D77] to-[#FF6F61] rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">CODE WITH</div>
                  <div className="text-lg font-bold text-foreground">WAV</div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Student Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarFallback className="bg-muted text-foreground">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-foreground hover:text-primary">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" onClick={onLogout} className="border-border text-foreground hover:bg-muted">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2 text-foreground">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">
            You're currently in Week {activeWeek} of the bootcamp. Keep up the great work!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Overall Progress</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-[#006D77] to-[#FF6F61] rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">44%</div>
              <Progress value={44} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Week 2 of 4 completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Assignments</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-[#006D77] to-[#FF6F61] rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8/12</div>
              <p className="text-xs text-muted-foreground">
                Completed this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Attendance</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-[#006D77] to-[#FF6F61] rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">95%</div>
              <p className="text-xs text-muted-foreground">
                9/10 days attended
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Next Class</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-[#006D77] to-[#FF6F61] rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12:30</div>
              <p className="text-xs text-muted-foreground">
                Tomorrow (APIs & Fetch)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="bg-muted border border-border">
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Weekly Progress</TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Assignments</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Resources</TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Community</TabsTrigger>
          </TabsList>

          {/* Weekly Progress */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Course Timeline</h3>
                {weeklyProgress.map((week) => (
                  <Card key={week.week} className={`bg-card border-border ${week.week === activeWeek ? 'ring-2 ring-primary' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base text-foreground">Week {week.week}</CardTitle>
                          <CardDescription className="text-muted-foreground">{week.title}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {week.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : week.week === activeWeek ? (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                          )}
                          <Badge variant={week.week === activeWeek ? 'default' : 'secondary'} className={week.week === activeWeek ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}>
                            {week.progress}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={week.progress} className="mb-4" />
                      {week.week === activeWeek && (
                        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Current Week: JavaScript Essentials</h3>
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="JavaScript coding"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      fallbackSrc="/fallback-image.jpg" // Ensure this fallback image exists
                    />
                    <h4 className="font-bold mb-2 text-foreground">This Week's Focus</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• ES6+ Features and Modern JavaScript</li>
                      <li>• DOM Manipulation and Event Handling</li>
                      <li>• Asynchronous Programming (Promises, Async/Await)</li>
                      <li>• Working with APIs and Fetch</li>
                    </ul>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Study Materials
                      </Button>
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Assignments */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-bold text-foreground">Upcoming Assignments</h3>
              {upcomingAssignments.map((assignment, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-foreground">{assignment.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">Due: {assignment.dueDate}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(assignment.status)}`} />
                        <Badge variant="outline" className="capitalize border-border text-foreground">
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      {assignment.status === 'pending' && (
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Submit Assignment</Button>
                      )}
                      <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-bold text-foreground">Learning Resources</h3>
              {resources.map((resource, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded">
                        {resource.type === 'PDF' && <BookOpen className="h-4 w-4 text-primary" />}
                        {resource.type === 'Code' && <Code className="h-4 w-4 text-primary" />}
                        {resource.type === 'Video' && <Play className="h-4 w-4 text-primary" />}
                        {resource.type === 'ZIP' && <Download className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Users className="h-5 w-5 mr-2" />
                    Classmates
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Connect with your fellow students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Ahmed Kanu', 'Fatima Sesay', 'Mohamed Bangura', 'Adama Conteh'].map((name, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-muted text-foreground">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">Week 2 - JavaScript</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-border text-foreground hover:bg-muted">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Class Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Study Groups</CardTitle>
                  <CardDescription className="text-muted-foreground">Join or create study sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded bg-muted/20">
                      <p className="font-medium text-sm text-foreground">JavaScript Study Group</p>
                      <p className="text-xs text-muted-foreground">Today 7:00 PM • 5 members</p>
                    </div>
                    <div className="p-3 border border-border rounded bg-muted/20">
                      <p className="font-medium text-sm text-foreground">DOM Practice Session</p>
                      <p className="text-xs text-muted-foreground">Tomorrow 6:00 PM • 3 members</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-border text-foreground hover:bg-muted">
                    Create Study Group
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}