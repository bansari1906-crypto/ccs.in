
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function AdminProtectedRoute({ children }: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    if (token) {
      setAuthenticated(true);
    } else {
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
