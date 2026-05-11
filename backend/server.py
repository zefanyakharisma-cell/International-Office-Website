import os
import json
import sqlite3
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["*"])

DB_PATH = os.path.join(os.path.dirname(__file__), "submissions.db")
RECIPIENT_EMAIL = "zefanya.kharisma@gmail.com"
SMTP_EMAIL    = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_HOST     = os.getenv("SMTP_HOST", "smtp.office365.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS meeting_requests (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                submitted_at    TEXT    NOT NULL,
                institution     TEXT,
                address         TEXT,
                country         TEXT,
                website         TEXT,
                field           TEXT,
                date1           TEXT,
                time1           TEXT,
                duration1       TEXT,
                date2           TEXT,
                time2           TEXT,
                duration2       TEXT,
                objectives      TEXT,
                departments     TEXT,
                pic_title       TEXT,
                pic_given_name  TEXT,
                pic_family_name TEXT,
                pic_position    TEXT,
                pic_division    TEXT,
                pic_email       TEXT,
                pic_phone       TEXT,
                participants    TEXT
            )
        """)
        conn.commit()


def send_email(subject, html_body, text_body):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print("WARNING: SMTP credentials not configured — email not sent.")
        return False
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = SMTP_EMAIL
        msg["To"]      = RECIPIENT_EMAIL
        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, RECIPIENT_EMAIL, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


def build_email(data):
    institution  = data.get("institutionName", "—")
    address      = data.get("address", "—")
    country      = data.get("country", "—")
    website      = data.get("website", "—")
    fields       = data.get("fields", [])
    other_field  = data.get("fieldOtherText", "")
    field_str    = ", ".join(fields + ([f"Other: {other_field}"] if other_field else [])) or "—"

    date1     = data.get("date1", "—")
    time1     = data.get("time1", "—")
    dur1      = data.get("duration1", "—")
    date2     = data.get("date2", "—")
    time2     = data.get("time2", "—")
    dur2      = data.get("duration2", "—")
    objectives = data.get("objectives", [])
    depts      = data.get("departments", [])

    pic           = data.get("pic", {})
    pic_name      = " ".join(filter(None, [pic.get("title"), pic.get("givenName"), pic.get("familyName")])) or "—"
    pic_position  = pic.get("position", "—")
    pic_division  = pic.get("division", "—")
    pic_email     = pic.get("email", "—")
    pic_phone     = pic.get("phone", "—")
    participants  = data.get("participants", [])

    # ── Plain text ─────────────────────────────────────────────────────────────
    objectives_txt = "\n".join(f"  {i+1}. {o}" for i, o in enumerate(objectives)) or "  —"
    depts_txt      = "\n".join(f"  - {d}" for d in depts) or "  —"
    parts_txt      = "\n".join(
        f"  {i+1}. {' '.join(filter(None, [p.get('title'), p.get('givenName'), p.get('familyName')]))} | "
        f"{p.get('position','—')} | {p.get('division','—')}"
        for i, p in enumerate(participants)
        if p.get("givenName") or p.get("familyName")
    ) or "  —"

    text = f"""
MEETING REQUEST FORM — New Submission
======================================
Submitted: {data.get('submittedAt', '—')}

SECTION 1: GUEST INSTITUTION DETAILS
Institution : {institution}
Address     : {address}
Country     : {country}
Website     : {website}
Field       : {field_str}

SECTION 2: MEETING DETAILS
Proposed Date 1 : {date1} at {time1} ({dur1} min)
Proposed Date 2 : {date2} at {time2} ({dur2} min)

Meeting Objectives:
{objectives_txt}

Departments / Offices:
{depts_txt}

SECTION 3: GUEST DETAILS
PIC
  Name     : {pic_name}
  Position : {pic_position}
  Division : {pic_division}
  Email    : {pic_email}
  Phone    : {pic_phone}

Participants:
{parts_txt}
""".strip()

    # ── HTML ───────────────────────────────────────────────────────────────────
    def row(label, value):
        return f"""
        <tr>
          <td style="padding:6px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">{label}</td>
          <td style="padding:6px 12px;color:#111827;font-size:13px">{value}</td>
        </tr>"""

    obj_html  = "".join(f"<li style='margin-bottom:4px'>{o}</li>" for o in objectives) or "<li>—</li>"
    dept_html = "".join(f"<li style='margin-bottom:4px'>{d}</li>" for d in depts) or "<li>—</li>"
    part_rows = ""
    for i, p in enumerate(participants):
        if p.get("givenName") or p.get("familyName"):
            name = " ".join(filter(None, [p.get("title"), p.get("givenName"), p.get("familyName")]))
            part_rows += f"""
            <tr style="border-top:1px solid #f3f4f6">
              <td style="padding:8px 12px;color:#6b7280;font-size:13px">{i+1}</td>
              <td style="padding:8px 12px;font-size:13px">{name}</td>
              <td style="padding:8px 12px;font-size:13px">{p.get('position','—')}</td>
              <td style="padding:8px 12px;font-size:13px">{p.get('division','—')}</td>
            </tr>"""
    if not part_rows:
        part_rows = "<tr><td colspan='4' style='padding:8px 12px;color:#9ca3af;font-size:13px'>—</td></tr>"

    section = lambda title, num: f"""
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:28px;height:28px;border-radius:50%;background:#8d4bb1;color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">{num}</div>
          <h2 style="margin:0;font-size:16px;font-weight:700;color:#8d4bb1">{title}</h2>
        </div>"""

    html = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'DM Sans',Arial,sans-serif">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#8d4bb1,#7c3aed);padding:32px 40px">
      <p style="margin:0 0 4px;color:rgba(255,255,255,.7);font-size:12px;text-transform:uppercase;letter-spacing:.1em">PCU Global — International Office</p>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700">New Meeting Request</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.75);font-size:13px">Submitted on {data.get('submittedAt','—')}</p>
    </div>
    <div style="padding:32px 40px">

      {section('Guest Institution Details', 1)}
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden">
          {row('Institution', institution)}
          {row('Address', address or '—')}
          {row('Country', country or '—')}
          {row('Website', f'<a href="{website}" style="color:#8d4bb1">{website}</a>' if website and website != '—' else '—')}
          {row('Field', field_str)}
        </table>
      </div>

      {section('Meeting Details', 2)}
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;margin-bottom:16px">
          {row('Date Option 1', f'{date1} at {time1} &nbsp;·&nbsp; {dur1} min')}
          {row('Date Option 2', f'{date2} at {time2} &nbsp;·&nbsp; {dur2} min')}
        </table>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Meeting Objectives</p>
        <ol style="margin:0 0 20px;padding-left:20px;color:#374151;font-size:13px">{obj_html}</ol>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Departments / Offices Requested</p>
        <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px">{dept_html}</ul>
      </div>

      {section('Guest Details', 3)}
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Person-in-Charge (PIC)</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;margin-bottom:20px">
          {row('Name', pic_name)}
          {row('Position', pic_position or '—')}
          {row('Division', pic_division or '—')}
          {row('Email', f'<a href="mailto:{pic_email}" style="color:#8d4bb1">{pic_email}</a>')}
          {row('Phone', pic_phone or '—')}
        </table>
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151">Meeting Participants</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;font-size:13px">
          <tr style="background:#ede9fe">
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">#</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Name</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Position</th>
            <th style="padding:8px 12px;text-align:left;color:#8d4bb1;font-size:12px">Division / Dept.</th>
          </tr>
          {part_rows}
        </table>
      </div>

    </div>
    <div style="padding:24px 40px;background:#f9fafb;border-top:1px solid #f3f4f6;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">PCU Global · Petra Christian University International Office · io@petra.ac.id</p>
    </div>
  </div>
</body>
</html>
""".strip()

    return text, html


@app.route("/api/submit-meeting-request", methods=["POST"])
def submit_meeting_request():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No data received"}), 400

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        data["submittedAt"] = now

        pic          = data.get("pic", {})
        objectives   = data.get("objectives", [])
        departments  = data.get("departments", [])
        participants = data.get("participants", [])
        fields       = data.get("fields", [])
        other_field  = data.get("fieldOtherText", "")
        field_str    = ", ".join(fields + ([f"Other: {other_field}"] if other_field else []))

        with get_db() as conn:
            conn.execute("""
                INSERT INTO meeting_requests (
                    submitted_at, institution, address, country, website,
                    field, date1, time1, duration1, date2, time2, duration2,
                    objectives, departments,
                    pic_title, pic_given_name, pic_family_name,
                    pic_position, pic_division, pic_email, pic_phone,
                    participants
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """, (
                now,
                data.get("institutionName"), data.get("address"),
                data.get("country"), data.get("website"), field_str,
                data.get("date1"), data.get("time1"), data.get("duration1"),
                data.get("date2"), data.get("time2"), data.get("duration2"),
                json.dumps(objectives), json.dumps(departments),
                pic.get("title"), pic.get("givenName"), pic.get("familyName"),
                pic.get("position"), pic.get("division"),
                pic.get("email"), pic.get("phone"),
                json.dumps(participants),
            ))
            conn.commit()

        text_body, html_body = build_email(data)
        institution = data.get("institutionName", "Unknown Institution")
        sent = send_email(
            subject=f"[Meeting Request] {institution}",
            html_body=html_body,
            text_body=text_body,
        )

        return jsonify({"success": True, "emailSent": sent}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/submissions", methods=["GET"])
def list_submissions():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM meeting_requests ORDER BY submitted_at DESC"
        ).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    init_db()
    print("PCU Meeting Request backend running on http://localhost:3001")
    app.run(host="0.0.0.0", port=3001, debug=True)
