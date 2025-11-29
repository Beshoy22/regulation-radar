-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create business_data table
CREATE TABLE public.business_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  sector text,
  scope text,
  location text,
  business_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create uploaded_files table
CREATE TABLE public.uploaded_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_data_id uuid REFERENCES public.business_data(id) ON DELETE CASCADE,
  file_type text,
  file_name text,
  file_url text,
  uploaded_at timestamp with time zone DEFAULT now()
);

-- Create reports table
CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_data_id uuid REFERENCES public.business_data(id) ON DELETE CASCADE,
  title text,
  report_markdown text,
  report_image_url text,
  generated_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create business_data policies
CREATE POLICY "Users can view their own business data"
  ON public.business_data FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own business data"
  ON public.business_data FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own business data"
  ON public.business_data FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own business data"
  ON public.business_data FOR DELETE
  USING (user_id = auth.uid());

-- Create uploaded_files policies
CREATE POLICY "Users can view their own files"
  ON public.uploaded_files FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can upload their own files"
  ON public.uploaded_files FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own files"
  ON public.uploaded_files FOR DELETE
  USING (user_id = auth.uid());

-- Create reports policies
CREATE POLICY "Users can view their own reports"
  ON public.reports FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own reports"
  ON public.reports FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Trigger function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', new.email),
    now(),
    now()
  );
  RETURN new;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_data_updated_at
  BEFORE UPDATE ON public.business_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();