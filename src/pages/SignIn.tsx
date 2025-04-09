
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Sign in data:", data);
    
    // Simulate authentication
    setTimeout(() => {
      toast({
        title: "Sign in successful",
        description: "Welcome back to FloraSense!",
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-flex items-center mb-8">
              <div className="w-8 h-8 rounded-full flora-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold">FS</span>
              </div>
              <span className="text-xl font-bold flora-gradient-text">FloraSense</span>
            </Link>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to your dashboard</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-flora-green hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button type="submit" className="w-full flora-gradient border-0">
                Sign In
              </Button>

              <div className="text-center mt-4">
                <span className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-flora-green hover:underline">
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right section - Image/Design */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-flora-green/90 to-flora-blue/90">
        <div className="h-full flex flex-col items-center justify-center text-white p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Health Data, Redefined</h2>
            <p className="mb-8">
              FloraSense provides secure, AI-powered health monitoring and insights, all while keeping your data completely under your control.
            </p>
            <img 
              src="https://placehold.co/600x400/FFFFFF10/FFFFFF/png?text=Health+Monitoring" 
              alt="Health Monitoring" 
              className="rounded-lg shadow-xl opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
