
-- Create enum types for better data integrity
CREATE TYPE public.industry_type AS ENUM (
  'Technology',
  'Manufacturing',
  'Healthcare',
  'Finance',
  'Construction',
  'Education',
  'Retail',
  'Transportation',
  'Energy',
  'Agriculture',
  'Other'
);

CREATE TYPE public.tender_status AS ENUM (
  'active',
  'closed',
  'draft'
);

CREATE TYPE public.application_status AS ENUM (
  'pending',
  'accepted',
  'rejected'
);

-- Create companies table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  industry industry_type NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create goods_services table
CREATE TABLE public.goods_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tenders table
CREATE TABLE public.tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  budget DECIMAL(12,2),
  status tender_status DEFAULT 'active',
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id UUID REFERENCES public.tenders(id) ON DELETE CASCADE NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  proposal_text TEXT NOT NULL,
  proposed_budget DECIMAL(12,2),
  status application_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(tender_id, company_id)
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goods_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view all companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Users can create their own company" ON public.companies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own company" ON public.companies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own company" ON public.companies FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for goods_services
CREATE POLICY "Users can view all goods_services" ON public.goods_services FOR SELECT USING (true);
CREATE POLICY "Users can manage their company's goods_services" ON public.goods_services FOR ALL USING (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = goods_services.company_id AND companies.user_id = auth.uid())
);

-- RLS Policies for tenders
CREATE POLICY "Users can view all active tenders" ON public.tenders FOR SELECT USING (true);
CREATE POLICY "Users can create tenders for their company" ON public.tenders FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = tenders.company_id AND companies.user_id = auth.uid())
);
CREATE POLICY "Users can update their own tenders" ON public.tenders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = tenders.company_id AND companies.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own tenders" ON public.tenders FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = tenders.company_id AND companies.user_id = auth.uid())
);

-- RLS Policies for applications
CREATE POLICY "Users can view applications for their tenders" ON public.applications FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.tenders t 
    JOIN public.companies c ON t.company_id = c.id 
    WHERE t.id = applications.tender_id AND c.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.companies c 
    WHERE c.id = applications.company_id AND c.user_id = auth.uid()
  )
);
CREATE POLICY "Users can create applications for their company" ON public.applications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = applications.company_id AND companies.user_id = auth.uid())
);
CREATE POLICY "Users can update their own applications" ON public.applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.companies WHERE companies.id = applications.company_id AND companies.user_id = auth.uid())
);

-- Create storage bucket for company logos
INSERT INTO storage.buckets (id, name, public) VALUES ('company-logos', 'company-logos', true);

-- Create storage policy for company logos
CREATE POLICY "Anyone can view company logos" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');
CREATE POLICY "Authenticated users can upload company logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'company-logos' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their own company logos" ON storage.objects FOR UPDATE USING (bucket_id = 'company-logos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own company logos" ON storage.objects FOR DELETE USING (bucket_id = 'company-logos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better performance
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_companies_industry ON public.companies(industry);
CREATE INDEX idx_tenders_company_id ON public.tenders(company_id);
CREATE INDEX idx_tenders_status ON public.tenders(status);
CREATE INDEX idx_tenders_deadline ON public.tenders(deadline);
CREATE INDEX idx_applications_tender_id ON public.applications(tender_id);
CREATE INDEX idx_applications_company_id ON public.applications(company_id);
CREATE INDEX idx_goods_services_company_id ON public.goods_services(company_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER tenders_updated_at BEFORE UPDATE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER applications_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
