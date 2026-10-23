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
  if (!supabase) {
    return NextResponse.json(FALLBACK_PROJECTS || []);
  }

  const { searchParams } = new URL(request.url);
  const admin = await isAdmin();

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!(searchParams.get('all') === 'true' && admin)) {
      query = query.eq('visible', true);
    }

    const { data: projects } = await query;
    return NextResponse.json(projects && projects.length > 0 ? projects : FALLBACK_PROJECTS);
  } catch {
    return NextResponse.json(FALLBACK_PROJECTS || []);
  }
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const body = await request.json();
  const { data: project, error } = await supabase
    .from('projects')
    .insert([body])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(project, { status: 201 });
}
