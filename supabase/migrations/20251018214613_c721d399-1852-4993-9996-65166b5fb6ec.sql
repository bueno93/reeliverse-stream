-- Add blocked status to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_blocked boolean DEFAULT false;

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan plan_type NOT NULL,
  amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  stripe_payment_id text,
  stripe_session_id text,
  payment_date timestamp with time zone DEFAULT now(),
  valid_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
  ON public.payments
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for payments updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add plan prices as a reference table
CREATE TABLE IF NOT EXISTS public.plan_pricing (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan plan_type NOT NULL UNIQUE,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  duration_days integer NOT NULL DEFAULT 30,
  description text,
  features jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on plan_pricing
ALTER TABLE public.plan_pricing ENABLE ROW LEVEL SECURITY;

-- Plan pricing policies
CREATE POLICY "Anyone can view plan pricing"
  ON public.plan_pricing
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage plan pricing"
  ON public.plan_pricing
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for plan_pricing updated_at
CREATE TRIGGER update_plan_pricing_updated_at
  BEFORE UPDATE ON public.plan_pricing
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plan pricing (only basic and premium for now)
INSERT INTO public.plan_pricing (plan, name, price, duration_days, description, features)
VALUES 
  ('basic', 'Plano Básico', 19.90, 30, 'Acesso a conteúdo básico', '["Catálogo básico", "Qualidade SD", "1 dispositivo"]'::jsonb),
  ('premium', 'Plano Premium', 39.90, 30, 'Acesso a conteúdo premium', '["Catálogo completo", "Qualidade HD", "2 dispositivos", "Downloads"]'::jsonb)
ON CONFLICT (plan) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  duration_days = EXCLUDED.duration_days,
  description = EXCLUDED.description,
  features = EXCLUDED.features;