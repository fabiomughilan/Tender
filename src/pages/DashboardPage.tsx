
import { useCompany } from '@/hooks/useCompany';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/components/Dashboard';
import CompanySetup from '@/components/CompanySetup';

const DashboardPage = () => {
  const { user } = useAuth();
  const { company, loading } = useCompany();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!company) {
    return <CompanySetup />;
  }

  return <Dashboard currentUser={{ ...user, companyName: company.name }} onLogout={() => {}} />;
};

export default DashboardPage;
