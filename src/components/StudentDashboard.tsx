import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Code, 
  LogOut, 
  Home,
  User,
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Users,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { auth, db } from '../lib/supabase';

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  created_at: string;
};

type BootcampApplication = {
  id: string;
  address: string;
  school_university: string;
  current_course: string;
  education_level: string;
  programming_experience: string;
  web_dev_challenges: string;
  bootcamp_goals: string;
  previous_projects?: string;
  has_laptop: boolean;
  availability_confirmed: boolean;
  terms_agreed: boolean;
  application_status: string;
  submitted_at: string;
};

type StudentDashboardProps = {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
};

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [application, setApplication] = useState<BootcampApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await auth.getCurrentUser();
      if (!currentUser) {
        onNavigate('login');
        return;
      }

      setUser(currentUser);

      // Mocked Supabase calls (replace with actual implementation)
      const { data: profileData, error: profileError } = { data: { id: currentUser.id, first_name: 'John', last_name: 'Doe', phone: '+23212345678', gender: 'male', date_of_birth: '1995-05-15', created_at: new Date().toISOString() }, error: null };
      if (profileError) {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      const { data: applicationData, error: applicationError } = { data: { id: 'app1', address: 'Freetown, Sierra Leone', school_university: 'University of Sierra Leone', current_course: 'Computer Science', education_level: 'undergraduate', programming_experience: 'beginner', web_dev_challenges: 'Learning CSS', bootcamp_goals: 'Become a web developer', has_laptop: true, availability_confirmed: true, terms_agreed: true, application_status: 'pending', submitted_at: new Date().toISOString() }, error: null };
      if (applicationError) {
        console.error('Error loading application:', applicationError);
      } else {
        setApplication(applicationData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onNavigate('landing');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlePaymentUpload = async () => {
    if (!paymentImage) return;

    setUploadStatus('uploading');
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {profile?.first_name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your bootcamp application has been submitted successfully. Complete your payment to secure your spot.
          </p>
        </div>

        {/* Application Status */}
        <div className="mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Application Status</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Submitted on {application ? new Date(application.submitted_at).toLocaleDateString() : 'N/A'}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(application?.application_status || 'pending')}>
                {application?.application_status || 'pending'}
              </Badge>
            </CardHeader>
            <CardContent>
              {application?.application_status === 'pending' && (
                <Alert className="bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                  <AlertDescription className="text-yellow-700 dark:text-yellow-200">
                    Your application is under review. You'll receive an email notification once it's processed.
                  </AlertDescription>
                </Alert>
              )}
              {application?.application_status === 'approved' && (
                <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
                  <AlertDescription className="text-green-700 dark:text-green-200">
                    Congratulations! Your application has been approved. Please complete your payment to secure your spot.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-500 data-[state=active]:text-white rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="application" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <GraduationCap className="h-4 w-4 mr-2" />
              Application
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Personal Information</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Your registered profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {profile ? `${profile.first_name} ${profile.last_name}` : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{profile?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{profile?.gender || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application?.address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Tab */}
          <TabsContent value="application" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Educational Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">School/University</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application?.school_university || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Course</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application?.current_course || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Education Level</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{application?.education_level?.replace('-', ' ') || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Programming Experience</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{application?.programming_experience || 'N/A'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Goals & Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Web Development Challenges</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application?.web_dev_challenges || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Bootcamp Goals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application?.bootcamp_goals || 'N/A'}</p>
                  </div>
                  {application?.previous_projects && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous Projects</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.previous_projects}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Instructions
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Complete your payment to secure your spot in the bootcamp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    <AlertDescription className="text-blue-700 dark:text-blue-200">
                      <strong>Bootcamp Fee: Le 450.00</strong><br />
                      Please send payment via Orange Money and upload your receipt below.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg">
                      <h4 className="font-semibold text-orange-700 dark:text-orange-200 mb-2">Orange Money Payment</h4>
                      <p className="text-sm text-orange-800 dark:text-orange-300 mb-2">
                        Send Le 450.00 to: <strong>232 75053663</strong>
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        Reference: Your name + "Bootcamp Fee"
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Alternative Contact Methods</h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email: edwardbobkamara@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>WhatsApp: 075053663</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Payment Receipt
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Upload a screenshot of your payment confirmation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-receipt" className="text-gray-700 dark:text-gray-300 font-medium">
                      Payment Receipt/Screenshot
                    </Label>
                    <Input
                      id="payment-receipt"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPaymentImage(e.target.files?.[0] || null)}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Accepted formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>

                  {uploadStatus === 'success' && (
                    <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
                      <AlertDescription className="text-green-700 dark:text-green-200">
                        Payment receipt uploaded successfully! We'll review and confirm your payment within 24 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={handlePaymentUpload}
                    disabled={!paymentImage || uploadStatus === 'uploading'}
                    className="w-full bg-teal-500 text-white hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {uploadStatus === 'uploading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Receipt
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Need help? Contact us via email or WhatsApp above.
                    </p>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}