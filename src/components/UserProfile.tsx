
import React from 'react';
import { User, Shield, Lock, Key, Download, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const UserProfile = () => {
  return (
    <div className="py-8 max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flora-gradient p-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Smith" />
              <AvatarFallback className="text-2xl">JS</AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-2xl font-bold text-white">John Smith</h1>
            <div className="mt-1 text-white/80">john@example.com</div>
            <div className="mt-2 flex space-x-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">Premium User</Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">Data Protected</Badge>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85/100</div>
                <Progress value={85} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Active Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/30</div>
                <Progress value={80} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-lg font-medium mb-4">Your Health Data Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Blockchain Protected</h3>
                <p className="text-sm text-gray-600">Your data is stored on a decentralized blockchain</p>
              </div>
              <Badge className="ml-auto" variant="outline">Active</Badge>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600">All communications are fully encrypted</p>
              </div>
              <Badge className="ml-auto" variant="outline">Active</Badge>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full">
                <Key className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Private Key Access</h3>
                <p className="text-sm text-gray-600">Only you control access to your data</p>
              </div>
              <Badge className="ml-auto" variant="outline">Active</Badge>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share with Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
