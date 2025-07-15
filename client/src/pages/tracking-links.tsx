import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertShortlinkSchema, type InsertShortlink, type Shortlink } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { 
  Link, 
  Plus, 
  Copy,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Chatbot } from "@/components/chatbot";
import { ContactForm } from "@/components/contact-form";

const createLinkSchema = insertShortlinkSchema.omit({ userId: true, slug: true });

type CreateLinkData = z.infer<typeof createLinkSchema>;

export default function TrackingLinksPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<CreateLinkData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      targetUrl: "",
      campaignName: "",
      description: "",
      isActive: true,
    },
  });

  const { data: shortlinks, isLoading: shortlinksLoading } = useQuery<Shortlink[]>({
    queryKey: ["/api/shortlinks"],
  });

  const createLinkMutation = useMutation({
    mutationFn: async (data: CreateLinkData) => {
      const res = await apiRequest("POST", "/api/shortlinks", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shortlinks"] });
      form.reset();
      toast({
        title: "Tracking link created",
        description: "Your secure tracking link has been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The tracking link has been copied to your clipboard.",
    });
  };

  const handleSubmit = (data: CreateLinkData) => {
    createLinkMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#0f172a] to-[#1e293b] text-slate-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Tracking Links</h2>
              <p className="text-slate-400">Create and manage your tracking links</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Live</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create Link Form */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Plus className="mr-2 h-5 w-5" />
                      Create New Link
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Generate a new tracking link for intelligence gathering
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="targetUrl" className="text-slate-300">
                          Target URL
                        </Label>
                        <Input
                          id="targetUrl"
                          type="url"
                          placeholder="https://example.com"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                          {...form.register("targetUrl")}
                        />
                        {form.formState.errors.targetUrl && (
                          <p className="text-red-400 text-sm">
                            {form.formState.errors.targetUrl.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaignName" className="text-slate-300">
                          Campaign Name
                        </Label>
                        <Input
                          id="campaignName"
                          placeholder="Investigation Alpha"
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                          {...form.register("campaignName")}
                        />
                        {form.formState.errors.campaignName && (
                          <p className="text-red-400 text-sm">
                            {form.formState.errors.campaignName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-300">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Track social media threats..."
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
                          {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                          <p className="text-red-400 text-sm">
                            {form.formState.errors.description.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        disabled={createLinkMutation.isPending}
                      >
                        {createLinkMutation.isPending ? (
                          <>
                            <Plus className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Link
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Links List */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Link className="mr-2 h-5 w-5" />
                      Active Links
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage your tracking links and monitor their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {shortlinksLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : shortlinks && shortlinks.length > 0 ? (
                      <div className="space-y-4">
                        {shortlinks.map((link) => (
                          <div
                            key={link.id}
                            className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-white">
                                    {link.campaignName || "Unnamed Campaign"}
                                  </h3>
                                  <div className="flex items-center">
                                    {link.isActive ? (
                                      <Eye className="h-4 w-4 text-green-400" />
                                    ) : (
                                      <EyeOff className="h-4 w-4 text-slate-400" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-400 mt-1">
                                  {link.description || "No description"}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <code className="text-sm bg-slate-800 px-2 py-1 rounded text-blue-400">
                                    {window.location.origin}/s/{link.slug}
                                  </code>
                                  <span className="text-xs text-slate-500">
                                    → {link.targetUrl}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-white"
                                  onClick={() =>
                                    copyToClipboard(`${window.location.origin}/s/${link.slug}`)
                                  }
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-white"
                                  onClick={() => window.open(`${window.location.origin}/s/${link.slug}`, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Link className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-400 mb-2">No tracking links yet</p>
                        <p className="text-slate-500 text-sm">
                          Create your first tracking link to start gathering intelligence
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
              {/* Chatbot */}
              <div className="mt-8">
                <Chatbot />
              </div>

            {/* Contact Form */}
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}