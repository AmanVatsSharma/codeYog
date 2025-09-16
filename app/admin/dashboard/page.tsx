"use client";
import { AppShell } from "@/components/layout/AppShell";
import AdminDashboard from "@/components/admin/dashboard";

const AdminRoute = () => {
  return (
    <AppShell>
      <AdminDashboard />
    </AppShell>
  );
};

export default AdminRoute;

