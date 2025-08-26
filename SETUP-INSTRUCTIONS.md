# Bootcamp Website - 2-Step Registration Setup Instructions

## Overview
This implementation provides a complete 2-step registration system with Supabase authentication, database integration, and a student dashboard with payment instructions for the bootcamp website.

## Features Implemented

### 🔐 Authentication System
- **Step 1**: User account creation with Supabase Auth
- **Step 2**: Detailed application assessment data collection
- Secure login with email/password
- Password visibility toggle
- Form validation and error handling

### 📝 Registration Flow
**Step 1 - Basic Information:**
- First Name, Last Name
- Email Address (becomes login credential)
- Phone Number
- Password with confirmation
- Gender selection
- Date of Birth

**Step 2 - Application Assessment:**
- Current Address
- School/University information
- Current course/program of study
- Education level
- Programming experience level
- Web development challenges
- Bootcamp goals and expectations
- Previous projects (optional)
- Laptop access confirmation
- Availability confirmation
- Terms and conditions agreement

### 🎨 UI/UX Features
- Progress indicator showing step completion (Step 1 of 2, Step 2 of 2)
- Responsive design for all devices
- Loading states during API calls
- Real-time form validation with color-coded error messages (red for errors)
- Error handling with user-friendly messages
- Student dashboard with profile and payment information
- Step navigation (Next/Previous buttons)
- Automatic redirect to dashboard after successful registration

### 💳 Payment Integration
- **Student Dashboard**: Shows profile information and application details
- **Payment Instructions**: Orange Money payment details (232 75053663)
- **Payment Upload**: File upload for payment receipts/screenshots
- **Alternative Contact**: Email (edwardbobkamara@gmail.com) and WhatsApp (075053663)
- **Payment Status Tracking**: Visual status indicators for payment confirmation

## Setup Instructions

### 1. Database Setup in Supabase

1. **Login to your Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Navigate to your project dashboard

2. **Run the Database Schema**
   - Go to the SQL Editor in your Supabase dashboard
   - **If you're setting up for the first time**: Copy and paste the contents of `database-schema.sql`
   - **If you already have tables but getting phone field errors**: Copy and paste the contents of `database-update.sql`
   - Click "Run" to execute the SQL commands

   This will create:
   - `user_profiles` table for extended user information (with VARCHAR(50) for phone field)
   - `bootcamp_applications` table for application data
   - Row Level Security (RLS) policies
   - Indexes for performance
   - Triggers for automatic timestamp updates

3. **Verify Tables Created**
   - Go to Table Editor in Supabase
   - Confirm both tables exist with proper columns
   - Verify the phone field in user_profiles is VARCHAR(50)

### 2. Environment Variables

Your `.env.local` file should contain:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install Dependencies

Make sure you have the required Supabase client installed:
```bash
npm install @supabase/supabase-js
```

### 4. Test the Implementation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test Registration Flow:**
   - Navigate to `/register`
   - Fill out Step 1 (Basic Information) - should create Supabase auth user
   - Should automatically proceed to Step 2 (Application Assessment)
   - Complete Step 2 and submit
   - Should redirect to `/dashboard` showing student portal

3. **Test Login Flow:**
   - Navigate to `/login`
   - Use credentials from registration
   - Should redirect to `/dashboard` with user's profile and application data

4. **Test Dashboard Features:**
   - View profile information and application details
   - Test payment upload functionality
   - Verify all contact information is displayed correctly

## Database Schema Details

### user_profiles Table
```sql
- id (UUID, Primary Key, References auth.users)
- first_name (VARCHAR(100))
- last_name (VARCHAR(100))
- phone (VARCHAR(50)) -- Updated to handle longer phone numbers
- gender (VARCHAR(50))
- date_of_birth (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### bootcamp_applications Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- address (TEXT)
- school_university (VARCHAR)
- current_course (VARCHAR)
- education_level (VARCHAR)
- programming_experience (VARCHAR)
- web_dev_challenges (TEXT)
- bootcamp_goals (TEXT)
- previous_projects (TEXT, Optional)
- has_laptop (BOOLEAN)
- availability_confirmed (BOOLEAN)
- terms_agreed (BOOLEAN)
- application_status (VARCHAR, Default: 'pending')
- submitted_at (TIMESTAMP)
- reviewed_at (TIMESTAMP, Optional)
- reviewer_notes (TEXT, Optional)
```

## Security Features

### Row Level Security (RLS)
- Users can only access their own profile data
- Users can only view/modify their own applications
- Automatic user ID validation on all operations

### Data Validation
- Client-side validation for immediate feedback
- Server-side validation through Supabase
- Required field enforcement
- Email format validation
- Password strength requirements

## API Integration

### Authentication Functions
- `auth.signUp()` - Create new user account
- `auth.signIn()` - User login
- `auth.signOut()` - User logout
- `auth.getCurrentUser()` - Get current user
- `auth.getCurrentSession()` - Get current session

### Database Functions
- `db.insertUserProfile()` - Store user profile data
- `db.getUserProfile()` - Retrieve user profile
- `db.updateUserProfile()` - Update user profile
- `db.insertApplication()` - Store application data
- `db.getUserApplication()` - Retrieve user application
- `db.updateApplication()` - Update application data

## Error Handling

The implementation includes comprehensive error handling for:
- Network connectivity issues
- Supabase authentication errors
- Database constraint violations
- Form validation errors
- User-friendly error messages

## Next Steps

After setup, you can:
1. Implement actual file upload to Supabase Storage for payment receipts
2. Add email verification workflow
3. Implement admin dashboard for reviewing applications
4. Add automated email notifications for application status changes
5. Integrate with actual Orange Money API for payment verification
6. Add application status tracking and approval workflow
7. Implement payment confirmation system
8. Add course progress tracking once students are enrolled

## Troubleshooting

### Common Issues:

1. **"Failed to save profile data" error with phone field:**
   - Run the `database-update.sql` script to increase phone field length
   - Or recreate tables using the updated `database-schema.sql`

2. **Step 1 to Step 2 transition fails:**
   - Check browser console for detailed error messages
   - Verify Supabase Auth user was created successfully
   - Ensure user_profiles table exists and has correct schema

3. **Database connection errors:**
   - Verify environment variables are correct
   - Check Supabase project status

4. **RLS policy errors:**
   - Ensure user is authenticated before database operations
   - Verify RLS policies are properly configured

5. **Dashboard not loading user data:**
   - Check if user is authenticated
   - Verify both user_profiles and bootcamp_applications tables have data
   - Check browser console for API errors

6. **Payment upload not working:**
   - This is currently a demo implementation
   - File upload functionality can be extended with Supabase Storage

## Support

For additional support:
- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Verify React component implementations