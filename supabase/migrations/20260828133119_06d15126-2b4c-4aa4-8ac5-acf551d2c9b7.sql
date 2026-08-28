ALTER TABLE public.devices ADD COLUMN output_format text NOT NULL DEFAULT 'ts';

COMMENT ON COLUMN public.devices.output_format IS 'Formato de saída do streaming: ts (MPEG-TS) ou m3u8 (HLS)';