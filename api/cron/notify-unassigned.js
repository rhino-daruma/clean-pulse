import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxyjogidvikheofgasiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWpvZ2lkdmlraGVvZmdhc2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDcxOTcsImV4cCI6MjA4NTc4MzE5N30.4wuRwo4URMW0H_TwIr3GyU8eO5cOER7_Lstun92d5H8';

function parseIcal(rawData) {
  const unfolded = rawData.replace(/\r?\n[ \t]/g, '');
  const events = [];
  const blocks = unfolded.split('BEGIN:VEVENT');
  for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const summary = b.match(/SUMMARY:(.*)/)?.[1]?.trim().replace(/\\n/gi, '\n').replace(/\\,/g, ',') || '予定';
    const dtMatch = b.match(/DTSTART[:;](?:VALUE=DATE:)?(\d{8}T\d{6}Z?|\d{8})/);
    const uid = b.match(/UID:(.*)/)?.[1]?.trim() || Math.random().toString();
    if (dtMatch) {
      const d = dtMatch[1];
      const iso = d.length === 8
        ? new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T00:00:00Z`).toISOString()
        : new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${d.slice(9, 11)}:${d.slice(11, 13)}:${d.slice(13, 15)}Z`).toISOString();
      events.push({ id: uid, title: summary, start: iso });
    }
  }
  return events;
}

async function sendLineMessage(channelAccessToken, userId, messages) {
  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${channelAccessToken}`,
    },
    body: JSON.stringify({ to: userId, messages }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`LINE push failed for ${userId}:`, err);
  }
}

export default async function handler(req, res) {
  // Vercel Cron はGETで呼び出される。認証トークンで保護
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!channelAccessToken) {
    return res.status(500).json({ error: 'LINE_CHANNEL_ACCESS_TOKEN not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 施設一覧を取得
  const { data: facilities, error: facError } = await supabase
    .from('facilities').select('*');
  if (facError || !facilities) {
    return res.status(500).json({ error: 'Failed to fetch facilities' });
  }

  // 全selectionsを取得
  const { data: allSelections, error: selError } = await supabase
    .from('selections').select('*');
  if (selError) {
    return res.status(500).json({ error: 'Failed to fetch selections' });
  }
  const selectionsData = allSelections || [];

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekLater = new Date(todayStart);
  weekLater.setDate(weekLater.getDate() + 7);

  const unassignedList = [];

  // 各施設のiCalを取得し、1週間以内の未割り当てイベントを抽出
  for (const facility of facilities) {
    if (!facility.ical_url) continue;

    try {
      const icalRes = await fetch(facility.ical_url);
      if (!icalRes.ok) continue;
      const icalText = await icalRes.text();
      const events = parseIcal(icalText);

      for (const event of events) {
        const eventDate = new Date(event.start);
        if (eventDate < todayStart || eventDate >= weekLater) continue;

        // この予定に割り当てがあるか確認
        const hasAssignment = selectionsData.some(
          s => s.event_id === event.id && s.facility_id === facility.id && s.status === 'available'
        );
        if (!hasAssignment) {
          unassignedList.push({
            facilityName: facility.name,
            eventTitle: event.title,
            eventDate: eventDate,
          });
        }
      }
    } catch (e) {
      console.error(`Failed to fetch iCal for ${facility.name}:`, e.message);
    }
  }

  if (unassignedList.length === 0) {
    return res.status(200).json({ message: 'No unassigned events within 7 days' });
  }

  // 日付順にソート
  unassignedList.sort((a, b) => a.eventDate - b.eventDate);

  // メッセージを組み立て
  const lines = unassignedList.map(item => {
    const dateStr = item.eventDate.toLocaleDateString('ja-JP', {
      month: 'numeric', day: 'numeric', weekday: 'short',
    });
    return `・${dateStr} ${item.facilityName}\n  ${item.eventTitle}`;
  });

  const messageText = `【未割当の清掃予定】\n今後7日間に ${unassignedList.length} 件の未割当があります。\n\n${lines.join('\n\n')}`;

  // admin ユーザーに通知
  const { data: admins, error: adminError } = await supabase
    .from('users').select('*').eq('role', 'admin');
  if (adminError || !admins || admins.length === 0) {
    return res.status(200).json({ message: 'No admin users to notify', unassigned: unassignedList.length });
  }

  let sentCount = 0;
  for (const admin of admins) {
    if (!admin.line_id) continue;
    await sendLineMessage(channelAccessToken, admin.line_id, [
      { type: 'text', text: messageText },
    ]);
    sentCount++;
  }

  return res.status(200).json({
    message: `Notified ${sentCount} admin(s) about ${unassignedList.length} unassigned event(s)`,
  });
}
