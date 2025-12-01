import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qzkamrlhgiykbfifnihk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6a2FtcmxoZ2l5a2JmaWZuaWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDk3NzAsImV4cCI6MjA3ODI4NTc3MH0.sB3muoPN_xUqXtkSpMMCPu2PqFHvF4xnsZSUX_XC3yk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
