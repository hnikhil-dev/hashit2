-- Add auth_id column to users to map Supabase auth UUID to integer users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS auth_id uuid;

-- Make auth_id unique when present
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_auth_id_key') THEN
    ALTER TABLE public.users ADD CONSTRAINT users_auth_id_key UNIQUE (auth_id);
  END IF;
EXCEPTION WHEN duplicate_table THEN
  -- ignore
END$$;

-- Add an index to make lookups by auth_id fast
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON public.users (auth_id);
