const fs = require('fs');

function parseDotEnv(path) {
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const out = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    out[key] = val;
  }
  return out;
}

(async () => {
  try {
    const env = parseDotEnv('.env');
    const { createClient } = require('@supabase/supabase-js');

    const url = env.REACT_APP_SUPABASE_URL;
    const key = env.REACT_APP_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY in .env');
      process.exit(1);
    }

    const supabase = createClient(url, key);

    const testName = `node-test-${Date.now()}`;
    console.log('Inserting user...', testName);
    const { data: users, error: userError } = await supabase.from('users').insert({ name: testName }).select();
    if (userError) throw userError;
    const user = Array.isArray(users) ? users[0] : users;
    console.log('Inserted user:', user);

    // generate simple 4-digit code
    const genCode = () => Math.floor(1000 + Math.random() * 9000).toString();
    let code = genCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase.from('rooms').select('room_id').eq('room_code', code).limit(1);
      if (!existing || existing.length === 0) break;
      code = genCode();
      attempts += 1;
    }

    console.log('Creating room with code', code);
    const { data: rooms, error: roomError } = await supabase.from('rooms').insert({ room_code: code, total_years: 5 }).select();
    if (roomError) throw roomError;
    const room = Array.isArray(rooms) ? rooms[0] : rooms;
    console.log('Created room:', room);

    console.log('Inserting room_player...');
    const { data: rp, error: rpError } = await supabase.from('room_players').insert({ room_id: room.room_id ?? room.id, user_id: user.user_id ?? user.id }).select();
    if (rpError) throw rpError;
    console.log('Inserted room_player:', rp[0] || rp);

    console.log('Test create completed successfully. Room code:', code);
  } catch (err) {
    console.error('Test create failed:', err.message || err);
    process.exit(1);
  }
})();
