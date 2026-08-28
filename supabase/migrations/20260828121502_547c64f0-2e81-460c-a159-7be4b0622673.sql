CREATE TABLE public.devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  virtual_mac text NOT NULL UNIQUE,
  xtream_url text NOT NULL,
  xtream_user text NOT NULL,
  xtream_pass text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.devices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.devices TO authenticated;
GRANT ALL ON public.devices TO service_role;

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "devices_public_select" ON public.devices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "devices_public_insert" ON public.devices FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "devices_public_update" ON public.devices FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "devices_public_delete" ON public.devices FOR DELETE TO anon, authenticated USING (true);

CREATE TRIGGER devices_updated_at BEFORE UPDATE ON public.devices
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();