// Supabase Edge Function — send-meeting-email
// Triggered by a Database Webhook on INSERT to meeting_requests.
//
// Setup in Supabase Dashboard:
//   Database → Webhooks → Create Webhook
//     Table: meeting_requests
//     Events: INSERT
//     Type: Supabase Edge Functions
//     Function: send-meeting-email
//
// Required secret (Edge Functions → Secrets):
//   RESEND_API_KEY  — from resend.com
//
// Optional secrets (with defaults):
//   RECIPIENT_EMAIL — defaults to io@petra.ac.id
//   FROM_EMAIL      — defaults to noreply@yourdomain.com (must be a verified Resend sender)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RECIPIENT_EMAIL = Deno.env.get('RECIPIENT_EMAIL') ?? 'io@petra.ac.id'
const FROM_EMAIL      = Deno.env.get('FROM_EMAIL') ?? 'PCU Global <noreply@yourdomain.com>'
const RESEND_API_KEY  = Deno.env.get('RESEND_API_KEY') ?? ''

serve(async (req) => {
  try {
    const body = await req.json()
    // Supabase webhook sends { type, table, record, old_record }
    const record = body.record ?? body
    if (!record) return new Response('No record', { status: 400 })

    const { html, text } = buildEmail(record)
    const institution = record.institution || 'Unknown Institution'

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [RECIPIENT_EMAIL],
        subject: `[Meeting Request] ${institution}`,
        html,
        text,
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.text()
      console.error('Resend error:', err)
      return new Response('Email failed', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response('Internal error', { status: 500 })
  }
})

function fmt(val: unknown): string {
  return val ? String(val) : '—'
}

function buildEmail(r: Record<string, unknown>): { html: string; text: string } {
  const participants: Array<Record<string, string>> =
    Array.isArray(r.participants) ? r.participants : []
  const objectives: string[] = Array.isArray(r.objectives) ? r.objectives : []
  const departments: string[] = Array.isArray(r.departments) ? r.departments : []

  const picName = [r.pic_title, r.pic_given_name, r.pic_family_name]
    .filter(Boolean).join(' ') || '—'

  const submittedAt = r.submitted_at
    ? new Date(r.submitted_at as string).toLocaleString('en-US', {
        dateStyle: 'medium', timeStyle: 'short',
      })
    : '—'

  // ── Plain text ──────────────────────────────────────────────────────────
  const objTxt  = objectives.map((o, i) => `  ${i + 1}. ${o}`).join('\n') || '  —'
  const deptTxt = departments.map(d => `  - ${d}`).join('\n') || '  —'
  const partTxt = participants
    .filter(p => p.givenName || p.familyName)
    .map((p, i) => {
      const name = [p.title, p.givenName, p.familyName].filter(Boolean).join(' ')
      return `  ${i + 1}. ${name} | ${p.position || '—'} | ${p.division || '—'}`
    }).join('\n') || '  —'

  const text = `
MEETING REQUEST FORM — New Submission
======================================
Submitted: ${submittedAt}

SECTION 1: GUEST INSTITUTION DETAILS
Institution : ${fmt(r.institution)}
Address     : ${fmt(r.address)}
Country     : ${fmt(r.country)}
Website     : ${fmt(r.website)}
Field       : ${fmt(r.field)}

SECTION 2: MEETING DETAILS
Proposed Date 1 : ${fmt(r.date1)} at ${fmt(r.time1)} (${fmt(r.duration1)} min)
Proposed Date 2 : ${fmt(r.date2)} at ${fmt(r.time2)} (${fmt(r.duration2)} min)

Meeting Objectives:
${objTxt}

Departments / Offices:
${deptTxt}

SECTION 3: GUEST DETAILS
PIC
  Name     : ${picName}
  Position : ${fmt(r.pic_position)}
  Division : ${fmt(r.pic_division)}
  Email    : ${fmt(r.pic_email)}
  Phone    : ${fmt(r.pic_phone)}

Participants:
${partTxt}
`.trim()

  // ── HTML ────────────────────────────────────────────────────────────────
  const rowHtml = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 12px;color:#111827;font-size:13px">${value}</td>
    </tr>`

  const objHtml  = objectives.map(o => `<li style="margin-bottom:4px">${o}</li>`).join('') || '<li>—</li>'
  const deptHtml = departments.map(d => `<li style="margin-bottom:4px">${d}</li>`).join('') || '<li>—</li>'
  const partRows = participants
    .filter(p => p.givenName || p.familyName)
    .map((p, i) => {
      const name = [p.title, p.givenName, p.familyName].filter(Boolean).join(' ')
      return `<tr style="border-top:1px solid #f3f4f6">
        <td style="padding:8px 12px;color:#6b7280;font-size:13px">${i + 1}</td>
        <td style="padding:8px 12px;font-size:13px">${name}</td>
        <td style="padding:8px 12px;font-size:13px">${p.position || '—'}</td>
        <td style="padding:8px 12px;font-size:13px">${p.division || '—'}</td>
      </tr>`
    }).join('') || `<tr><td colspan="4" style="padding:8px 12px;color:#9ca3af;font-size:13px">—</td></tr>`

  const websiteVal = r.website
    ? `<a href="${r.website}" style="color:#8d4bb1">${r.website}</a>`
    : '—'

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'DM Sans',Arial,sans-serif">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#8d4bb1,#7c3aed);padding:32px 40px">
      <p style="margin:0 0 4px;color:rgba(255,255,255,.7);font-size:12px;text-transform:uppercase;letter-spacing:.1em">PCU Global — International Office</p>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700">New Meeting Request</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.75);font-size:13px">Submitted on ${submittedAt}</p>
    </div>
    <div style="padding:32px 40px">

      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:28px;height:28px;border-radius:50%;background:#8d4bb1;color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</div>
          <h2 style="margin:0;font-size:16px;font-weight:700;color:#8d4bb1">Guest Institution Details</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden">
          ${rowHtml('Institution', fmt(r.institution))}
          ${rowHtml('Address', fmt(r.address))}
          ${rowHtml('Country', fmt(r.country))}
          ${rowHtml('Website', websiteVal)}
          ${rowHtml('Field', fmt(r.field))}
        </table>
      </div>

      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:28px;height:28px;border-radius:50%;background:#8d4bb1;color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</div>
          <h2 style="margin:0;font-size:16px;font-weight:700;color:#8d4bb1">Meeting Details</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;margin-bottom:16px">
          ${rowHtml('Date Option 1', `${fmt(r.date1)} at ${fmt(r.time1)} &nbsp;·&nbsp; ${fmt(r.duration1)} min`)}
          ${rowHtml('Date Option 2', `${fmt(r.date2)} at ${fmt(r.time2)} &nbsp;·&nbsp; ${fmt(r.duration2)} min`)}
        </table>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Meeting Objectives</p>
        <ol style="margin:0 0 20px;padding-left:20px;color:#374151;font-size:13px">${objHtml}</ol>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Departments / Offices Requested</p>
        <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px">${deptHtml}</ul>
      </div>

      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:28px;height:28px;border-radius:50%;background:#8d4bb1;color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</div>
          <h2 style="margin:0;font-size:16px;font-weight:700;color:#8d4bb1">Guest Details</h2>
        </div>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Person-in-Charge (PIC)</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;margin-bottom:20px">
          ${rowHtml('Name', picName)}
          ${rowHtml('Position', fmt(r.pic_position))}
          ${rowHtml('Division', fmt(r.pic_division))}
          ${rowHtml('Email', r.pic_email ? `<a href="mailto:${r.pic_email}" style="color:#8d4bb1">${r.pic_email}</a>` : '—')}
          ${rowHtml('Phone', fmt(r.pic_phone))}
        </table>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Meeting Participants</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;font-size:13px">
          <tr style="background:#ede9fe">
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">#</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Name</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Position</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Division / Dept.</th>
          </tr>
          ${partRows}
        </table>
      </div>

    </div>
    <div style="padding:24px 40px;background:#f9fafb;border-top:1px solid #f3f4f6;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">PCU Global · Petra Christian University International Office · io@petra.ac.id</p>
    </div>
  </div>
</body></html>`

  return { html, text }
}
