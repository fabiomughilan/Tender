
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Company {
  id: string;
  name: string;
  industry: string;
  description?: string;
  logo_url?: string;
  website?: string;
  phone?: string;
  address?: string;
  user_id: string;
}

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCompany = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
      toast({
        title: "Error",
        description: "Failed to load company profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (companyData: Omit<Company, 'id' | 'user_id'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([{ ...companyData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setCompany(data);
      toast({
        title: "Success!",
        description: "Company profile created successfully.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating company:', error);
      return { data: null, error };
    }
  };

  const updateCompany = async (updates: Partial<Company>) => {
    if (!company || !user) return { error: 'Company or user not found' };

    try {
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', company.id)
        .select()
        .single();

      if (error) throw error;
      setCompany(data);
      toast({
        title: "Success!",
        description: "Company profile updated successfully.",
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error updating company:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [user]);

  return {
    company,
    loading,
    createCompany,
    updateCompany,
    refetch: fetchCompany
  };
};
