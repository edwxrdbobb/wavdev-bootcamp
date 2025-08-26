'use client'
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
const bannerImage = '/banner.png';
import { 
  Code, 
  Users, 
  Clock, 
  Award, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Star, 
  Zap, 
  Target, 
  Globe,
  Figma,
  Database,
  Server,
  Palette,
  Settings,
  GitBranch,
  Terminal,
  Layers,
  FileCode,
  Smartphone,
  Monitor,
  Rocket,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Play,
  Download
} from 'lucide-react';

type LandingPageProps = {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  const tools = [
    { name: 'Figma', icon: Figma, category: 'Design', description: 'UI/UX Design & Prototyping' },
    { name: 'Git', icon: GitBranch, category: 'Version Control', description: 'Code versioning & collaboration' },
    { name: 'HTML5', icon: FileCode, category: 'Frontend', description: 'Modern markup language' },
    { name: 'CSS3', icon: Palette, category: 'Frontend', description: 'Styling & animations' },
    { name: 'Tailwind CSS', icon: Layers, category: 'Frontend', description: 'Utility-first CSS framework' },
    { name: 'JavaScript', icon: Code, category: 'Frontend', description: 'ES6+ & DOM manipulation' },
    { name: 'React', icon: Zap, category: 'Frontend', description: 'Component-based UI library' },
    { name: 'PHP', icon: Server, category: 'Backend', description: 'Server-side programming' },
    { name: 'SQL', icon: Database, category: 'Database', description: 'Database queries & management' },
    { name: 'Postman', icon: Play, category: 'API', description: 'API testing & development' },
    { name: 'Express.js', icon: Terminal, category: 'Backend', description: 'Node.js web framework' },
    { name: 'Bundlers', icon: Settings, category: 'Build Tools', description: 'Webpack, Vite & more' }
  ];

  const roadmapSteps = [
    { 
      phase: 'Foundation', 
      duration: 'Week 1', 
      title: 'Web Fundamentals & Design',
      skills: ['Web History & Evolution', 'Design Principles', 'UI/UX Basics', 'Project Planning'],
      color: 'from-purple-600 to-indigo-600'
    },
    { 
      phase: 'Development', 
      duration: 'Week 2', 
      title: 'Core Technologies',
      skills: ['HTML/CSS Mastery', 'JavaScript Fundamentals', 'DOM Manipulation', 'Server Basics'],
      color: 'from-green-500 to-teal-500'
    },
    { 
      phase: 'Framework', 
      duration: 'Week 3', 
      title: 'Modern Development',
      skills: ['React Development', 'State Management', 'API Integration', 'Backend APIs'],
      color: 'from-purple-600 to-indigo-600'
    },
    { 
      phase: 'Production', 
      duration: 'Week 4', 
      title: 'Full-Stack & Deployment',
      skills: ['Frontend-Backend Integration', 'Database Management', 'Deployment', 'Maintenance'],
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100/10 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Branding */}
              {/*<div className="space-y-2">
                 <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">CODE WITH WAV</div> 
                <div className="flex items-baseline space-x-4">
                  <div className="text-8xl font-black text-slate-900 dark:text-white">4</div>
                  <div className="">
                    <div className="text-xl font-bold text-slate-900 dark:text-white">WEEKS</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">IN-PERSON & ONLINE</div>
                  </div>
                </div>
              </div> */}

              {/* Main Title */}
              <div className="space-y-4">
                <div className="text-6xl lg:text-7xl font-black">
                  <span className="bg-gradient-to-r from-green-500 to-[#9ffc4d] bg-clip-text text-transparent">WEB</span>
                </div>
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  DEVELOPMENT
                </div>
                <div className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                  BOOTCAMP
                </div>
              </div>

              {/* Location Badge */}
              <Badge className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                <MapPin className="h-3 w-3 mr-1" />
                Freetown, Sierra Leone
              </Badge>

              {/* Features List */}
              <div className="space-y-2">
                {[
                  'UI/UX DESIGN',
                  'FRONTEND DEVELOPMENT',
                  'BACKEND DEVELOPMENT',
                  'FULLSTACK INTEGRATION',
                  'DEPLOYMENT & HOSTING'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('register')} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Apply Now
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onNavigate('login')}
                  className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white bg-slate-300/80 hover:bg-white/50 dark:hover:bg-slate-800/50 font-semibold py-6 px-8 rounded-xl transition-all duration-200"
                >
                  Student Login
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Tech Stack Circle */}
              <div className="absolute -left-20 top-20 w-48 h-48 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex flex-col items-center justify-center text-white z-10 animate-pulse shadow-xl">
                {/* <div className="text-xs font-bold mb-2">TECH STACK</div> */}
                <div className="text-2xl font-black mb-1">REACT</div>
                <div className="text-xl font-bold mb-1">JS</div>
                <div className="text-lg font-bold mb-1">HTML</div>
                <div className="text-lg font-bold mb-1">CSS</div>
                <div className="text-lg font-bold">SQL</div>
              </div>

              {/* Banner Image */}
              <div className="relative">
                <img 
                  src={bannerImage} 
                  alt="Web Development Bootcamp Banner" 
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Price Circle */}
              <div className="absolute -right-10 bottom-20 w-40 h-40 bg-gradient-to-r from-yellow-400 to-[#9ffc4d] rounded-full flex flex-col items-center justify-center text-black z-10 animate-pulse shadow-xl">
                <div className="text-xs font-bold">LE</div>
                <div className="text-3xl font-slate-500">450</div>
                <div className="text-xs font-bold text-center">FULL ACCESS</div>
                <div className="mt-2 text-xs font-bold">LE</div>
                <div className="text-xl font-slate-500">120</div>
                <div className="text-xs font-bold text-center">PER WEEK</div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="mt-16 text-center space-y-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">SEP 1 → OCT 3</div>
            <div className="text-5xl font-black bg-gradient-to-r from-green-500 to-[#9ffc4d] bg-clip-text text-transparent">2025</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">
              3+ DAYS A WEEK [MON, TUES, FRI & SAT]
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">12:30 PM - 3:30 PM</div>
            
            <div className="mt-8 space-y-2">
              <div className="text-sm text-slate-500 dark:text-slate-400">FOR MORE INFO:</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">WHATSAPP: +23275053663</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">EMAIL: edwardbobkamara@gmail.com</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100/20 dark:from-slate-900 dark:to-slate-800/20" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Why Choose Our Bootcamp?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Transform your career with our intensive, hands-on program designed for real-world success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Hands-on Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Build real projects from day one. Learn by doing with practical exercises and coding challenges that prepare you for the industry.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Expert Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Learn from experienced developers who work at top tech companies and startups. Get personalized guidance throughout your journey.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Job Placement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Land your first jobs. We provide career support and job placement assistance to ensure your success.
                </CardDescription>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Detailed Curriculum Section */}
      <section id="curriculum" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/20 to-slate-50 dark:from-slate-800/20 dark:to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">4-Week Detailed Curriculum</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From web fundamentals to full-stack deployment, our comprehensive curriculum covers everything you need to become a professional web developer
            </p>
          </div>

          <div className="space-y-12">
            {/* Week 1 */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="text-3xl font-black">WEEK 1</div>
                    <div className="text-xl font-bold">Web Fundamentals & Design Thinking</div>
                  </div>
                  <div className="text-4xl font-black opacity-50">01</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {[
                        'Understanding how websites evolved over the years',
                        'Introduction to web technologies and their history',
                        'Design principles and visual hierarchy',
                        'UI/UX fundamentals using Figma',
                        'User journey mapping and wireframing',
                        'Technology stack selection for projects'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-6
00 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Daily Breakdown</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 1: Web History & Evolution</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">How the web started, key milestones, modern web</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 2: Design Principles & Figma</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">UI/UX basics, design systems, prototyping</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 3: User Journeys & Tech Stack</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Planning projects, selecting technologies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week 2 */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                <div className="flex items-center justify-between text-black">
                  <div>
                    <div className="text-3xl font-black">WEEK 2</div>
                    <div className="text-xl font-bold">Core Web Technologies</div>
                  </div>
                  <div className="text-4xl font-black opacity-50">02</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {[
                        'Master HTML5 semantic markup and structure',
                        'Advanced CSS3 styling and responsive design',
                        'JavaScript fundamentals and ES6+ features',
                        'DOM manipulation and event handling',
                        'Introduction to server-side programming with PHP',
                        'Setting up development environments'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Daily Breakdown</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 1: HTML & CSS Mastery</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Semantic HTML, CSS Grid, Flexbox, animations</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 2: JavaScript & DOM</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">JS fundamentals, DOM manipulation, events</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 3: PHP Introduction</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Server-side basics, PHP syntax, form handling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week 3 */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="text-3xl font-black">WEEK 3</div>
                    <div className="text-xl font-bold">Modern Frontend & Backend</div>
                  </div>
                  <div className="text-4xl font-black opacity-50">03</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {[
                        'NPM package management and modern workflows',
                        'React component development and state management',
                        'Tailwind CSS for rapid UI development',
                        'Third-party library integration',
                        'Building RESTful APIs with PHP and Express',
                        'Frontend-backend communication patterns'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Daily Breakdown</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 1: React & NPM Ecosystem</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Components, hooks, state, package management</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 2: Advanced Frontend</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Tailwind CSS, libraries, API integration</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 3: Backend APIs</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">PHP endpoints, Express.js, REST principles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week 4 */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                <div className="flex items-center justify-between text-black">
                  <div>
                    <div className="text-3xl font-black">WEEK 4</div>
                    <div className="text-xl font-bold">Integration & Deployment</div>
                  </div>
                  <div className="text-4xl font-black opacity-50">04</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {[
                        'Full-stack application integration',
                        'Database design and SQL operations',
                        'Authentication and security best practices',
                        'Production deployment strategies',
                        'Performance optimization techniques',
                        'Application maintenance and monitoring'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Daily Breakdown</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 1: Frontend-Backend Integration</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Connecting React to APIs, state management</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 2: Database & Deployment</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">SQL operations, hosting platforms, CI/CD</div>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="font-medium text-sm text-slate-900 dark:text-white">Day 3: Portfolio & Maintenance</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Project showcase, monitoring, updates</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section id="tools" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100/20 dark:from-slate-900 dark:to-slate-800/20" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Tools & Technologies</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Master the essential tools and technologies used by professional developers worldwide
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">All</TabsTrigger>
              <TabsTrigger value="design" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">Design</TabsTrigger>
              <TabsTrigger value="frontend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">Frontend</TabsTrigger>
              <TabsTrigger value="backend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">Backend</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-black" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h4>
                      <Badge variant="outline" className="mb-2 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.filter(tool => tool.category === 'Design').map((tool, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h4>
                      <Badge variant="outline" className="mb-2 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.filter(tool => tool.category === 'Frontend').map((tool, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-black" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h4>
                      <Badge variant="outline" className="mb-2 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.filter(tool => ['Backend', 'Database', 'API'].includes(tool.category)).map((tool, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h4>
                      <Badge variant="outline" className="mb-2 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.filter(tool => ['Version Control', 'Build Tools'].includes(tool.category)).map((tool, index) => (
                  <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-black" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h4>
                      <Badge variant="outline" className="mb-2 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Learning Roadmap Section */}
      <section id="roadmap" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/20 to-slate-50 dark:from-slate-800/20 dark:to-slate-900" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Learning Roadmap</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Your journey from beginner to full-stack developer in 4 structured weeks
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full opacity-20"></div>
            
            <div className="space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-black">{index + 1}</span>
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-1 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                              {step.phase}
                            </Badge>
                            <div className="font-bold text-lg text-slate-900 dark:text-white">{step.title}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">{step.duration}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {step.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center space-x-2">
                              <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border-4 border-slate-50 dark:border-slate-900 z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 text-slate-600 dark:text-slate-400">
            Join the next cohort and transform your career in just 4 weeks
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex flex-col items-center justify-center">
                <div className="text-xs font-bold text-black">LE</div>
                <div className="text-2xl font-black text-black">120</div>
                <div className="text-xs font-bold text-black">PER WEEK</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Weekly Payment</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Pay as you learn, week by week</p>
              <Button onClick={() => onNavigate('register')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Choose Weekly
              </Button>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-blue-500 p-8 text-center relative hover:scale-105 transition-transform duration-300 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                RECOMMENDED
              </Badge>
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex flex-col items-center justify-center">
                <div className="text-xs font-bold text-black">LE</div>
                <div className="text-2xl font-black text-black">450</div>
                <div className="text-xs font-bold text-black text-center">FULL ACCESS</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Full Payment</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Save 6% with upfront payment</p>
              <Button onClick={() => onNavigate('register')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Choose Full Payment
              </Button>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('register')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
              Apply Now - Limited Spots
              <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 font-semibold py-3 px-8 rounded-xl transition-all duration-200">
              <BookOpen className="mr-2 h-5 w-5" />
              Download Syllabus
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">CODE WITH</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">WAV</div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Empowering the next generation of web developers in Sierra Leone through intensive, hands-on training and real-world projects.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <Star className="h-3 w-3 mr-1" />
                  4.9/5 Rating
                </Badge>
                <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <Users className="h-3 w-3 mr-1" />
                  50+ Graduates
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#curriculum" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Curriculum</a></li>
                <li><a href="#tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</a></li>
                <li><a href="#roadmap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Roadmap</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Contact</h4>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <p className="flex items-center"><MapPin className="h-3 w-3 mr-2" />Freetown, Sierra Leone</p>
                <p className="flex items-center"><Globe className="h-3 w-3 mr-2" />edwardbobkamara@gmail.com</p>
                <p className="flex items-center"><Users className="h-3 w-3 mr-2" />+23275053663</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; 2025 Code with WAV. All rights reserved. • Transforming careers through code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}