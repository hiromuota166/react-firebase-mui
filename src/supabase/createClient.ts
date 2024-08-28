import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl : string = process.env.REACT_APP_SUPABASE_URL || ""
const supabaseAnonKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase