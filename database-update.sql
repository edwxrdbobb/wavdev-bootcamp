-- Database Update Script for Bootcamp Website
-- Run this in your Supabase SQL editor to fix the phone field length issue

-- Update the phone field length in user_profiles table
ALTER TABLE user_profiles 
ALTER COLUMN phone TYPE VARCHAR(50);

-- If the table doesn't exist yet, you can run the full schema from database-schema.sql instead