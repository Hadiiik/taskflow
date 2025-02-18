import { createClient } from '@supabase/supabase-js'

// استرجاع المتغيرات من ملف البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Service Role Key');
}

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
