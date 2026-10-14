import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      // Mock login for testing (without backend)
      if (username.trim() === "admin@chitra.com" && password === "admin123") {
        const mockUser = {
          id: 1,
          name: "Admin User",
          role: "admin",
          email: "admin@chitra.com"
        };
        localStorage.setItem("admin_access_token", "mock_token_12345");
        localStorage.setItem("admin_refresh_token", "mock_refresh_12345");
        localStorage.setItem("admin_user", JSON.stringify(mockUser));
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      } else {
        // Try real backend login
        const base = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_DJANGO_API_URL || 'http://127.0.0.1:8000/api/';
        const loginUrl = `${base.replace(/\/$/, '')}/login/`;
        const response = await axios.post(loginUrl, {
          email: username.trim(),
          password,
        });
        if (response.data?.user?.role !== "admin") {
          toast.error("Invalid credentials or unauthorized");
          return;
        }
        localStorage.setItem("admin_access_token", response.data.access);
        localStorage.setItem("admin_refresh_token", response.data.refresh);
        localStorage.setItem("admin_user", JSON.stringify(response.data.user));
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials or unauthorized");
      } else {
          toast.error("Login failed. Check server connection.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <img src="/logo.png" alt="Chitra Crop Science Logo" className="h-10 w-auto" />
          <span className="font-serif text-xl font-bold text-green-800">Chitra Crop Science</span>
        </Link>

        <div className="mb-8 text-center flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to manage the business dashboard.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="username" className="text-gray-700 font-semibold">Email / Username</Label>
            <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1.5 p-3 rounded-xl border-gray-300 focus:ring-green-500" required placeholder="admin@chitra.com" />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 p-3 rounded-xl border-gray-300 focus:ring-green-500" required placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="w-full bg-green-600 text-white hover:bg-green-700 py-6 rounded-xl font-bold text-lg transition-all shadow-md">
            {loading ? "Authenticating..." : "Secure Login"}
          </Button>
        </form>
      </div>
    </section>
  );
}
