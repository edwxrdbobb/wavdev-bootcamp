-- Database Schema for Bootcamp Website
-- Run these commands in your Supabase SQL editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bootcamp_applications table
CREATE TABLE IF NOT EXISTS bootcamp_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  address TEXT NOT NULL,
  school_university VARCHAR(200) NOT NULL,
  current_course VARCHAR(200) NOT NULL,
  education_level VARCHAR(100) NOT NULL,
  programming_experience VARCHAR(50) NOT NULL,
  web_dev_challenges TEXT NOT NULL,
  bootcamp_goals TEXT NOT NULL,
  previous_projects TEXT,
  has_laptop BOOLEAN NOT NULL DEFAULT false,
  availability_confirmed BOOLEAN NOT NULL DEFAULT false,
  terms_agreed BOOLEAN NOT NULL DEFAULT false,
  application_status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bootcamp_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for bootcamp_applications
CREATE POLICY "Users can view own application" ON bootcamp_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own application" ON bootcamp_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own application" ON bootcamp_applications
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_bootcamp_applications_user_id ON bootcamp_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_bootcamp_applications_status ON bootcamp_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_bootcamp_applications_submitted_at ON bootcamp_applications(submitted_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();