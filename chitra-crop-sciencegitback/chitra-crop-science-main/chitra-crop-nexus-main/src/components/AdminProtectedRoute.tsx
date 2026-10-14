import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export function AdminProtectedRoute({ children }: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } catch (e) {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
