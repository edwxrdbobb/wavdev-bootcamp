import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get current session
  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}

// Database functions
export const db = {
  // Insert user profile
  insertUserProfile: async (profileData: any) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profileData])
      .select()
    return { data, error }
  },

  // Get user profile
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Insert bootcamp application
  insertApplication: async (applicationData: any) => {
    const { data, error } = await supabase
      .from('bootcamp_applications')
      .insert([applicationData])
      .select()
    return { data, error }
  },

  // Get user's application
  getUserApplication: async (userId: string) => {
    const { data, error } = await supabase
      .from('bootcamp_applications')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Update application
  updateApplication: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('bootcamp_applications')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  }
}
