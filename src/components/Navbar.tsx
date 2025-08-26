'use client'
import { Button } from './ui/button';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Code,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  HelpCircle,
  BookOpen,
  Home,
  GraduationCap,
  CreditCard,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle'
import { auth } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="border-b border-slate-500/30 border-slate-700 bg-background/80 dark:bg-slate-600/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">CODE WITH</div>
                <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">WAV</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              // Logged in user navigation
              <>
                <Link href="/dashboard" className="flex items-center text-foreground hover:text-primary transition-colors">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary flex items-center border border-slate-600 hover:bg-slate-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <Link href="#theme-toggle">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <ThemeToggle />
                  </Button>
                </Link>
              </>
            ) : (
              // Guest navigation
              <>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
                <a href="#curriculum" className="text-muted-foreground hover:text-primary transition-colors">Curriculum</a>
                <a href="#tools" className="text-muted-foreground hover:text-primary transition-colors">Tools</a>
                <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
                <Link href="/login">
                  <Button variant="ghost" className="border border-purple-600 text-purple-500 hover:text-white hover:bg-purple-600/50">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-[#9ffc4d]/80 to-[#9ffc4d] hover:from-green-600 hover:to-[#9ffc4d] text-slate-600 font-semibold">
                    Apply Now
                  </Button>
                </Link>
                <Link href="#theme-toggle">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <ThemeToggle />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}