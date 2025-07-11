import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const loginSchema = insertUserSchema.pick({ email: true, password: true });
const registerSchema = insertUserSchema;

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const handleLogin = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const handleRegister = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex">
      {/* Left Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-cyber-blue rounded-lg flex items-center justify-center mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TraceIntel</h1>
              <p className="text-sm text-slate-400">Intelligence Platform</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-cyber-gray">
              <TabsTrigger value="login" className="data-[state=active]:bg-cyber-blue">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-cyber-blue">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-cyber-gray border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Welcome back</CardTitle>
                  <CardDescription className="text-slate-400">
                    Sign in to your TraceIntel account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400"
                        {...loginForm.register("email")}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-red-400 text-sm">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400 pr-10"
                          {...loginForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-red-400 text-sm">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-cyber-blue hover:bg-blue-600"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Lock className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-cyber-gray border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Create Account</CardTitle>
                  <CardDescription className="text-slate-400">
                    Join TraceIntel to start tracking intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400"
                        {...registerForm.register("email")}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-red-400 text-sm">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-slate-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="bg-cyber-dark border-slate-600 text-white placeholder-slate-400 pr-10"
                          {...registerForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-red-400 text-sm">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-cyber-blue hover:bg-blue-600"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Lock className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="flex-1 bg-cyber-gray flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-cyber-blue" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Advanced Threat Intelligence
          </h2>
          <p className="text-slate-400 mb-6">
            Track suspicious actors with precision geolocation, browser fingerprinting, and real-time intelligence gathering.
          </p>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
              Secure link generation
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-cyber-blue rounded-full mr-2"></div>
              Real-time geolocation tracking
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-cyber-amber rounded-full mr-2"></div>
              Advanced analytics dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
