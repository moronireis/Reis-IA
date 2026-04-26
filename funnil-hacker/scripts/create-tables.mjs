import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://weirdpigeon-supabase.cloudfy.live',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM3Njg1MTYsImV4cCI6MTgwNTMwNDUxNn0.Hziwx8ocWnFVLHvt5DhT8nTkL2XVMa58ofjL-0hCMxw'
);

// Create tables one by one using rpc or direct SQL
// Since supabase-js doesn't support raw SQL, we'll verify by trying to select from each table
// and create via the REST management API

const tables = [
  'fh_projects',
  'fh_competitors',
  'fh_company_intel',
  'fh_pages',
  'fh_ads',
  'fh_funnel_nodes',
  'fh_funnel_edges',
  'fh_insights',
  'fh_techstack',
];

async function checkTables() {
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      console.log(`✅ ${table}: exists`);
    }
  }
}

// Try to create a test project to verify write access
async function testWrite() {
  const { data, error } = await supabase.from('fh_projects').insert({
    name: '__test__',
    mode: 'map_funnel',
    target_url: 'https://test.com',
    status: 'pending',
  }).select().single();

  if (error) {
    console.log(`\n❌ Write test failed: ${error.message}`);
    console.log('   Tables need to be created. Run the SQL from supabase/schema.sql in the Supabase SQL editor.');
  } else {
    console.log(`\n✅ Write test passed. Cleaning up...`);
    await supabase.from('fh_projects').delete().eq('id', data.id);
    console.log('✅ Cleanup done.');
  }
}

console.log('Checking tables...\n');
await checkTables();
await testWrite();
