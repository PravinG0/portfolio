import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DAILY_LIMIT = 5;

function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !message) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
  }

  const senderEmail = email || 'no-email@pravin-g.dev';

  // ── Rate limit check if Supabase is connected ──────────────────────────
  if (supabase) {
    try {
      const ip = getIP(request);
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('ip', ip)
        .gte('created_at', dayStart.toISOString());

      if (count && count >= DAILY_LIMIT) {
        return NextResponse.json(
          { error: `Too many messages. You can send up to ${DAILY_LIMIT} messages per day.` },
          { status: 429 }
        );
      }

      await supabase.from('inquiries').insert([{ name, email: senderEmail, message, ip }]);
    } catch (err) {
      console.warn('Supabase inquiry insert skipped/error:', err);
    }
  }

  // Send email if Resend is configured
  if (resend && process.env.ADMIN_EMAIL) {
    try {
      const { error: emailError } = await resend.emails.send({
        from: 'Portfolio Contact <support@pravin-g.dev>',
        to: process.env.ADMIN_EMAIL || 'pravin87ec@gmail.com',
        replyTo: senderEmail,
        subject: `New portfolio inquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#fff;padding:32px;border-radius:12px">
            <h2 style="color:#ff6b1a;margin:0 0 24px">New Message for Pravin G</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#999;width:80px">From</td><td style="padding:8px 0;color:#fff">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#999">Email</td><td style="padding:8px 0;color:#ff6b1a"><a href="mailto:${senderEmail}" style="color:#ff6b1a">${senderEmail}</a></td></tr>
            </table>
            <hr style="border:1px solid #222;margin:20px 0"/>
            <p style="color:#ccc;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
        `,
      });

      if (emailError) {
        console.warn('Resend error:', emailError);
      }
    } catch (err) {
      console.warn('Resend send exception:', err);
    }
  } else {
    console.log(`[Contact Submission] From: ${name} (${senderEmail}) - Message: ${message}`);
  }

  return NextResponse.json({ success: true });
}
