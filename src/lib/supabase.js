import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxyjogidvikheofgasiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWpvZ2lkdmlraGVvZmdhc2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDcxOTcsImV4cCI6MjA4NTc4MzE5N30.4wuRwo4URMW0H_TwIr3GyU8eO5cOER7_Lstun92d5H8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
