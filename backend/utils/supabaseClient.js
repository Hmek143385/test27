const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qzntxmcfmjjonnpcmnyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;