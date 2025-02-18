// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// استرجاع المتغيرات من ملف البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
