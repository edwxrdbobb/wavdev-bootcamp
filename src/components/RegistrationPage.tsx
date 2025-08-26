import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { 
  Code, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Eye,
  EyeOff,
  Calendar,
  Users
} from 'lucide-react';
import { auth, db } from '../lib/supabase';

type RegistrationPageProps = {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'dashboard') => void;
};

interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
}

interface Step2Data {
  address: string;
  schoolUniversity: string;
  currentCourse: string;
  educationLevel: string;
  programmingExperience: string;
  webDevChallenges: string;
  bootcampGoals: string;
  previousProjects: string;
  hasLaptop: boolean;
  availabilityConfirmed: boolean;
  agreeTerms: boolean;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userId, setUserId] = useState<string | null>(null);

  const [step1Data, setStep1Data] = useState<Step1Data>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    address: '',
    schoolUniversity: '',
    currentCourse: '',
    educationLevel: '',
    programmingExperience: '',
    webDevChallenges: '',
    bootcampGoals: '',
    previousProjects: '',
    hasLaptop: false,
    availabilityConfirmed: false,
    agreeTerms: false,
  });

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!step1Data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!step1Data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!step1Data.email.trim()) newErrors.email = 'Email is required';
    else if (!step1Data.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!step1Data.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!step1Data.password) newErrors.password = 'Password is required';
    else if (step1Data.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!step1Data.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (step1Data.password !== step1Data.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!step1Data.gender) newErrors.gender = 'Please select your gender';
    if (!step1Data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!step2Data.address.trim()) newErrors.address = 'Address is required';
    if (!step2Data.schoolUniversity.trim()) newErrors.schoolUniversity = 'School/University is required';
    if (!step2Data.currentCourse.trim()) newErrors.currentCourse = 'Current course is required';
    if (!step2Data.educationLevel) newErrors.educationLevel = 'Education level is required';
    if (!step2Data.programmingExperience) newErrors.programmingExperience = 'Programming experience is required';
    if (!step2Data.webDevChallenges.trim()) newErrors.webDevChallenges = 'Please describe your challenges';
    if (!step2Data.bootcampGoals.trim()) newErrors.bootcampGoals = 'Please describe your goals';
    if (!step2Data.hasLaptop) newErrors.hasLaptop = 'Laptop access is required for the bootcamp';
    if (!step2Data.availabilityConfirmed) newErrors.availabilityConfirmed = 'Please confirm your availability';
    if (!step2Data.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1InputChange = (field: keyof Step1Data, value: string) => {
    setStep1Data(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleStep2InputChange = (field: keyof Step2Data, value: string | boolean) => {
    setStep2Data(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleStep1Submit = async () => {
    if (!validateStep1()) return;

    setIsLoading(true);
    try {
      // Create Supabase auth user
      const { data: authData, error: authError } = await auth.signUp(
        step1Data.email,
        step1Data.password,
        {
          first_name: step1Data.firstName,
          last_name: step1Data.lastName,
          phone: step1Data.phone,
          gender: step1Data.gender,
          date_of_birth: step1Data.dateOfBirth,
        }
      );

      if (authError) {
        // More user-friendly error messages
        let errorMessage = authError.message;
        if (authError.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else if (authError.message.includes('invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (authError.message.includes('weak password')) {
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
        }
        setErrors({ general: errorMessage });
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        setUserId(authData.user.id);

        // Store user profile data
        const profileData = {
          id: authData.user.id,
          first_name: step1Data.firstName,
          last_name: step1Data.lastName,
          phone: step1Data.phone,
          gender: step1Data.gender,
          date_of_birth: step1Data.dateOfBirth,
        };

        const { error: profileError } = await db.insertUserProfile(profileData);

        if (profileError) {
          console.error('Profile error:', profileError);
          let errorMessage = 'Failed to save profile data. Please try again.';
          if (profileError.message.includes('value too long')) {
            errorMessage = 'One of your entries is too long. Please shorten your phone number or other fields.';
          }
          setErrors({ general: errorMessage });
          setIsLoading(false);
          return;
        }

        // Move to step 2
        setCurrentStep(2);
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    if (!validateStep2() || !userId) return;

    setIsLoading(true);
    try {
      // Store bootcamp application data
      const applicationData = {
        user_id: userId,
        address: step2Data.address,
        school_university: step2Data.schoolUniversity,
        current_course: step2Data.currentCourse,
        education_level: step2Data.educationLevel,
        programming_experience: step2Data.programmingExperience,
        web_dev_challenges: step2Data.webDevChallenges,
        bootcamp_goals: step2Data.bootcampGoals,
        previous_projects: step2Data.previousProjects || null,
        has_laptop: step2Data.hasLaptop,
        availability_confirmed: step2Data.availabilityConfirmed,
        terms_agreed: step2Data.agreeTerms,
        application_status: 'pending',
      };

      const { error: applicationError } = await db.insertApplication(applicationData);

      if (applicationError) {
        setErrors({ general: 'Failed to submit application. Please try again.' });
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard instead of showing success page
      onNavigate('dashboard');
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Modern Background Effects */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
        
        <Card className="w-full max-w-md text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-2xl relative z-10 rounded-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Application Submitted!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Thank you for applying to Code with WAV. We'll review your application and get back to you within 2-3 business days.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => onNavigate('landing')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('login')}
                className="w-full border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 py-3 rounded-xl transition-all duration-200"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 relative overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Code className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">CODE WITH</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">WAV</div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Apply Now
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Join the next cohort of web developers</p>
        </div>

        {/* Modern Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
              Step {currentStep} of 2
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {currentStep === 1 ? 'Basic Information' : 'Application Assessment'}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${currentStep * 50}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-2xl rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                Basic Information
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
                Create your account and provide basic personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleStep1Submit(); }} className="space-y-6">
                {errors.general && (
                  <Alert className="bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800/50 rounded-xl">
                    {/* <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" /> */}
                    <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{errors.general}</AlertDescription>
                  </Alert>
                )}

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={step1Data.firstName}
                      onChange={(e) => handleStep1InputChange('firstName', e.target.value)}
                      className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.firstName ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={step1Data.lastName}
                      onChange={(e) => handleStep1InputChange('lastName', e.target.value)}
                      className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.lastName ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-slate-700 dark:text-slate-300 font-semibold text-sm">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={step1Data.email}
                    onChange={(e) => handleStep1InputChange('email', e.target.value)}
                    className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center text-foreground font-medium">
                    <Phone className="h-3 w-3 mr-1" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+232 XX XXX XXXX"
                    value={step1Data.phone}
                    onChange={(e) => handleStep1InputChange('phone', e.target.value)}
                    className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200
bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={step1Data.password}
                        onChange={(e) => handleStep1InputChange('password', e.target.value)}
                        className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200
bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 pr-10${errors.password ? 'border-destructive' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={step1Data.confirmPassword}
                        onChange={(e) => handleStep1InputChange('confirmPassword', e.target.value)}
                        className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200
bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Gender and Date of Birth */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center text-foreground font-medium">
                      <Users className="h-3 w-3 mr-1" />
                      Gender *
                    </Label>
                    <Select value={step1Data.gender} onValueChange={(value) => handleStep1InputChange('gender', value)}>
                      <SelectTrigger className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200
bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.gender ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-600 border-slate-500">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-sm text-destructive">{errors.gender}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="flex items-center text-foreground font-medium">
                      <Calendar className="h-3 w-3 mr-1" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={step1Data.dateOfBirth}
                      onChange={(e) => handleStep1InputChange('dateOfBirth', e.target.value)}
                      className={`bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200
bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 ${errors.dateOfBirth ? 'border-destructive' : ''}`}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Application Assessment */}
        {currentStep === 2 && (
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-2xl rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                Application Assessment
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
                Help us understand your background and goals for the bootcamp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleStep2Submit(); }} className="space-y-6">
                {errors.general && (
                  <Alert className="bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800/50 rounded-xl">
                    {/* <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" /> */}
                    <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{errors.general}</AlertDescription>
                  </Alert>
                )}


                {/* Education Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Educational Background</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schoolUniversity" className="text-foreground font-medium">School/University *</Label>
                    <Input
                      id="schoolUniversity"
                      placeholder="Name of your current or most recent school/university"
                      value={step2Data.schoolUniversity}
                      onChange={(e) => handleStep2InputChange('schoolUniversity', e.target.value)}
                      className={`bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${errors.schoolUniversity ? 'border-destructive' : ''}`}
                    />
                    {errors.schoolUniversity && (
                      <p className="text-sm text-destructive">{errors.schoolUniversity}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentCourse" className="text-foreground font-medium">Current Course/Program *</Label>
                    <Input
                      id="currentCourse"
                      placeholder="e.g., Computer Science, Business Administration, etc."
                      value={step2Data.currentCourse}
                      onChange={(e) => handleStep2InputChange('currentCourse', e.target.value)}
                      className={`bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${errors.currentCourse ? 'border-destructive' : ''}`}
                    />
                    {errors.currentCourse && (
                      <p className="text-sm text-destructive">{errors.currentCourse}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationLevel" className="text-foreground font-medium">Highest Education Level *</Label>
                    <Select value={step2Data.educationLevel} onValueChange={(value) => handleStep2InputChange('educationLevel', value)}>
                      <SelectTrigger className={`bg-input-background border-slate-500 text-foreground ${errors.educationLevel ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-600 border-slate-500">
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.educationLevel && (
                      <p className="text-sm text-destructive">{errors.educationLevel}</p>
                    )}
                  </div>
                </div>

                {/* Programming Experience */}
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Programming Background</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="programmingExperience" className="text-foreground font-medium">Programming Experience Level *</Label>
                    <Select value={step2Data.programmingExperience} onValueChange={(value) => handleStep2InputChange('programmingExperience', value)}>
                      <SelectTrigger className={`bg-input-background border-slate-500 text-foreground ${errors.programmingExperience ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-600 border-slate-500">
                        <SelectItem value="none">No experience</SelectItem>
                        <SelectItem value="beginner">Beginner (some tutorials/courses)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (built small projects)</SelectItem>
                        <SelectItem value="advanced">Advanced (professional experience)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.programmingExperience && (
                      <p className="text-sm text-destructive">{errors.programmingExperience}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webDevChallenges" className="text-foreground font-medium">Web Development Challenges *</Label>
                    <Textarea
                      id="webDevChallenges"
                      placeholder="What parts of web development have you found challenging or would like to learn more about?"
                      rows={3}
                      value={step2Data.webDevChallenges}
                      onChange={(e) => handleStep2InputChange('webDevChallenges', e.target.value)}
                      className={`bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${errors.webDevChallenges ? 'border-destructive' : ''}`}
                    />
                    {errors.webDevChallenges && (
                      <p className="text-sm text-destructive">{errors.webDevChallenges}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bootcampGoals" className="text-foreground font-medium">Bootcamp Goals *</Label>
                    <Textarea
                      id="bootcampGoals"
                      placeholder="What do you hope to achieve from this bootcamp? What are your career goals?"
                      rows={3}
                      value={step2Data.bootcampGoals}
                      onChange={(e) => handleStep2InputChange('bootcampGoals', e.target.value)}
                      className={`bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${errors.bootcampGoals ? 'border-destructive' : ''}`}
                    />
                    {errors.bootcampGoals && (
                      <p className="text-sm text-destructive">{errors.bootcampGoals}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousProjects" className="text-foreground font-medium">Previous Projects (Optional)</Label>
                    <Textarea
                      id="previousProjects"
                      placeholder="Describe any programming projects you've worked on (optional)"
                      rows={2}
                      value={step2Data.previousProjects}
                      onChange={(e) => handleStep2InputChange('previousProjects', e.target.value)}
                      className="bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center text-foreground font-medium">
                    <MapPin className="h-3 w-3 mr-1" />
                    Current Address *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Your current address in Freetown"
                    value={step2Data.address}
                    onChange={(e) => handleStep2InputChange('address', e.target.value)}
                    className={`bg-input-background border-slate-500 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${errors.address ? 'border-destructive' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Requirements</h3>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="hasLaptop"
                      checked={step2Data.hasLaptop}
                      onCheckedChange={(checked) => handleStep2InputChange('hasLaptop', checked as boolean)}
                      className={`border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.hasLaptop ? 'border-destructive' : ''}`}
                    />
                    <Label htmlFor="hasLaptop" className="text-sm text-foreground">
                      I have access to a laptop for the duration of the bootcamp *
                    </Label>
                  </div>
                  {errors.hasLaptop && (
                    <p className="text-sm text-destructive ml-6">{errors.hasLaptop}</p>
                  )}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="availabilityConfirmed"
                      checked={step2Data.availabilityConfirmed}
                      onCheckedChange={(checked) => handleStep2InputChange('availabilityConfirmed', checked as boolean)}
                      className={`border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.availabilityConfirmed ? 'border-destructive' : ''}`}
                    />
                    <Label htmlFor="availabilityConfirmed" className="text-sm text-foreground">
                      I confirm my availability for the bootcamp schedule (Mon, Tues, Fri & Sat, 12:30 PM - 3:30 PM) *
                    </Label>
                  </div>
                  {errors.availabilityConfirmed && (
                    <p className="text-sm text-destructive ml-6">{errors.availabilityConfirmed}</p>
                  )}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={step2Data.agreeTerms}
                      onCheckedChange={(checked) => handleStep2InputChange('agreeTerms', checked as boolean)}
                      className={`border-slate-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.agreeTerms ? 'border-destructive' : ''}`}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-foreground">
                      I agree to the terms and conditions and understand the bootcamp requirements *
                    </Label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-destructive ml-6">{errors.agreeTerms}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 py-3 px-6 rounded-xl font-medium transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Modern Program Details */}
        <Card className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white text-xl font-bold">Program Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-bold mb-3 text-slate-800 dark:text-slate-200 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Duration & Schedule
                </h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    4 weeks intensive program
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    3+ days a week (Mon, Tues, Fri & Sat)
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    12:30 PM - 3:30 PM
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    September 1 - October 3, 2025
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold mb-3 text-slate-800 dark:text-slate-200 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                  What's Included
                </h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                    Course materials
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                    Mentorship support
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                    Job placement assistance
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}