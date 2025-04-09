
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Activity, Upload, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navbar */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flora-gradient flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">FS</span>
          </div>
          <span className="text-2xl font-bold flora-gradient-text">FloraSense</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/signin" className="text-flora-dark hover:text-flora-green font-medium">Sign In</Link>
          <Link to="/signup">
            <Button className="flora-gradient border-0">Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="flora-gradient-text">Revolutionize</span> Your Health Monitoring
            </h1>
            <p className="text-lg text-gray-600">
              FloraSense combines AI technology with blockchain security to provide personalized health insights and decentralized data management.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="flora-gradient border-0 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 relative z-10 animate-fade-in-up">
              <img 
                src="https://placehold.co/600x400/4CAF50/FFFFFF/png?text=Health+Dashboard+Preview" 
                alt="Dashboard Preview" 
                className="rounded-lg shadow-sm"
              />
            </div>
            <div className="absolute w-full h-full top-6 left-6 bg-flora-green/10 rounded-2xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose FloraSense?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of tools to monitor, analyze, and secure your health data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-flora-green" />}
              title="AI-Powered Insights"
              description="Get personalized health recommendations powered by advanced machine learning algorithms."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-flora-blue" />}
              title="Decentralized Security"
              description="Your health data is secured using blockchain technology, ensuring complete privacy."
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-flora-red" />}
              title="Comprehensive Health Tracking"
              description="Monitor all aspects of your health including heart rate, sleep, stress, and more."
            />
            <FeatureCard 
              icon={<Activity className="h-8 w-8 text-flora-orange" />}
              title="Real-time Monitoring"
              description="Connect your wearable devices for continuous health tracking and instant alerts."
            />
            <FeatureCard 
              icon={<Upload className="h-8 w-8 text-indigo-500" />}
              title="Data Import & Export"
              description="Easily upload your existing health data or export it for use with other platforms."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Smart Notifications"
              description="Receive timely alerts about changes in your health metrics or scheduled activities."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 flora-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Health Monitoring?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of users who have already taken control of their health data with FloraSense.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-flora-green hover:bg-gray-100">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-full flora-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-lg font-bold flora-gradient-text">FloraSense</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-600">
              <a href="#" className="hover:text-flora-green">About</a>
              <a href="#" className="hover:text-flora-green">Features</a>
              <a href="#" className="hover:text-flora-green">Privacy</a>
              <a href="#" className="hover:text-flora-green">Terms</a>
              <a href="#" className="hover:text-flora-green">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FloraSense. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Landing;
