
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Sign up data:", data);
    
    // Simulate account creation
    setTimeout(() => {
      toast({
        title: "Account created",
        description: "Welcome to FloraSense! Your account has been created successfully.",
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Image/Design */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-flora-blue/90 to-flora-green/90">
        <div className="h-full flex flex-col items-center justify-center text-white p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Health Revolution</h2>
            <p className="mb-8">
              Take control of your health data with advanced AI insights and blockchain security.
            </p>
            <img 
              src="https://placehold.co/600x400/FFFFFF10/FFFFFF/png?text=Secure+Health+Data" 
              alt="Secure Health Data" 
              className="rounded-lg shadow-xl opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-flex items-center mb-8">
              <div className="w-8 h-8 rounded-full flora-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold">FS</span>
              </div>
              <span className="text-xl font-bold flora-gradient-text">FloraSense</span>
            </Link>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-gray-600 mt-2">Start your journey to better health monitoring</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <a href="#" className="text-flora-green hover:underline">
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-flora-green hover:underline">
                          privacy policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full flora-gradient border-0 mt-6">
                Create Account
              </Button>

              <div className="text-center mt-4">
                <span className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-flora-green hover:underline">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
