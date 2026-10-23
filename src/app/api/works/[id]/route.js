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

export async function GET(request, { params }) {
  const { id } = await params;

  if (supabase) {
    try {
      const { data: work, error } = await supabase
        .from('works')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && work) {
        return NextResponse.json(work);
      }
    } catch (err) {
      console.warn('[GET /api/works/[id]] Supabase query failed:', err);
    }
  }

  // Lookup in static projects
  const staticWork = FALLBACK_PROJECTS.find(p => p.id === id || p.title.toLowerCase().includes(id.toLowerCase()));
  if (staticWork) {
    return NextResponse.json(staticWork);
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PATCH(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { id } = await params;
  const body = await request.json();
  const { data: work, error } = await supabase
    .from('works')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(work);
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { id } = await params;
  const { error } = await supabase.from('works').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
