import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // It's useful to log this during development; don't throw to avoid breaking imports in non-browser environments
  // Replace or remove in production as needed.
  // eslint-disable-next-line no-console
  console.warn('Supabase keys are not set. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your frontend/.env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
