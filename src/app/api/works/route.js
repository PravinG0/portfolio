import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';
import { FALLBACK_PROJECTS } from '@/app/work/content';

async function isAdmin() {
  const store = await cookies();
  const token = store.get('admin_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (supabase) {
    try {
      const admin = await isAdmin();
      let query = supabase
        .from('works')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!(searchParams.get('all') === 'true' && admin)) {
        query = query.eq('visible', true);
      }

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data: works, error } = await query;
      if (!error && works && works.length > 0) {
        return NextResponse.json(works);
      }
    } catch (err) {
      console.warn('[GET /api/works] Supabase error, falling back to static projects:', err);
    }
  }

  // Fallback to Pravin G's rich project data
  let filtered = FALLBACK_PROJECTS;
  if (category && category !== 'All' && category !== 'ALL') {
    filtered = filtered.filter(p =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return NextResponse.json(filtered);
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { data: work, error } = await supabase
    .from('works')
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(work, { status: 201 });
}
