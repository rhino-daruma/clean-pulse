import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './lib/supabase';

const Icon = ({ d, className = "w-6 h-6", strokeWidth = 2 }) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const PlusIcon = (p) => <Icon {...p} strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />;
const UserGroupIcon = (p) => <Icon {...p} d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />;
const CalendarIcon = (p) => <Icon {...p} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />;
const CheckCircleIcon = (p) => <Icon {...p} strokeWidth={2.5} d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />;
const XCircleIcon = (p) => <Icon {...p} strokeWidth={2.5} d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />;
const TrashIcon = (p) => <Icon {...p} d="m14.74 9-.34 9m-4.78 0L9.26 9m9.96-1.11L18.45 20.25a2.25 2.25 0 0 1-2.245 2.25H7.795a2.25 2.25 0 0 1-2.245-2.25L4.785 7.89m12.637 0V4.5a2.25 2.25 0 0 0-2.25-2.25h-3.75a2.25 2.25 0 0 0-2.25 2.25v3.39m7.5 0H5.25" />;
const RefreshIcon = (p) => <Icon {...p} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />;
const HomeIcon = (p) => <Icon {...p} d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />;
const ClipboardIcon = (p) => <Icon {...p} d="M9 12h3.75M9 15h3.75M9 18h3.75m.75-12h1.125c.621 0 1.125.504 1.125 1.125v12c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125H5.625c-.621 0-1.125-.504-1.125-1.125v-12c0-.621.504-1.125 1.125-1.125H7.5M12 4.5V3.375c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125V4.5m4.5 0a1.5 1.5 0 0 1-1.5 1.5H8.25a1.5 1.5 0 0 1-1.5-1.5m4.5 0h-4.5" />;
const PencilIcon = (p) => <Icon {...p} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />;
const ArrowLeftIcon = (p) => <Icon {...p} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />;
const BookOpenIcon = (p) => <Icon {...p} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />;
const ChevronDownIcon = (p) => <Icon {...p} d="m19.5 8.25-7.5 7.5-7.5-7.5" />;
const CameraIcon = ({ className = "w-6 h-6" }) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);
const StarIcon = (p) => <Icon {...p} d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />;
const LineIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.074 9.436-6.975 1.763-1.928 2.548-3.926 2.548-6.068z" />
  </svg>
);

const LINE_CHANNEL_ID = '2008788577';
const RATING_LABELS = { worst: '最悪', dirty: '汚い', normal: '普通', clean: '綺麗' };

function getLineLoginUrl() {
  const baseUrl = window.location.origin;
  const callbackUrl = `${baseUrl}/api/auth/line-callback`;
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('line_auth_state', state);
  const params = new URLSearchParams({
    response_type: 'code', client_id: LINE_CHANNEL_ID, redirect_uri: callbackUrl, state, scope: 'profile openid',
  });
  return `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;
}

export default function App() {
  const [authPhase, setAuthPhase] = useState('loading');
  const [lineProfile, setLineProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState('top');
  const [facilityTab, setFacilityTab] = useState('next14');
  const [facilities, setFacilities] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selections, setSelections] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [reportingTask, setReportingTask] = useState(null);
  const [reportRating, setReportRating] = useState('normal');
  const [reportText, setReportText] = useState('');
  const [reportImages, setReportImages] = useState([]);
  const [editingFacilityId, setEditingFacilityId] = useState(null);
  const [newFacilityName, setNewFacilityName] = useState('');
  const [newIcalUrl, setNewIcalUrl] = useState('');
  const [newInventoryUrl, setNewInventoryUrl] = useState('');
  const [newManualUrl, setNewManualUrl] = useState('');

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth') === 'success' && params.get('line_id')) {
        const profile = { line_id: params.get('line_id'), line_name: params.get('line_name'), line_picture: params.get('line_picture') || '' };
        localStorage.setItem('line_profile', JSON.stringify(profile));
        window.history.replaceState({}, '', '/');
        setLineProfile(profile);
        const { data } = await supabase.from('users').select('*').eq('line_id', profile.line_id).single();
        if (data) { setCurrentUser(data); setAuthPhase('app'); } else { setAuthPhase('invite_code'); }
        return;
      }
      if (params.get('auth') === 'error') { window.history.replaceState({}, '', '/'); setAuthPhase('login'); return; }
      const saved = localStorage.getItem('line_profile');
      if (saved) {
        const profile = JSON.parse(saved);
        setLineProfile(profile);
        const { data } = await supabase.from('users').select('*').eq('line_id', profile.line_id).single();
        if (data) { setCurrentUser(data); setAuthPhase('app'); } else { setAuthPhase('invite_code'); }
        return;
      }
      setAuthPhase('login');
    };
    init();
  }, []);

  const handleLineLogin = () => { window.location.href = getLineLoginUrl(); };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    if (!inviteCode.trim() || !lineProfile) return;
    setIsSubmitting(true); setInviteError('');
    try {
      const { data: codeData, error: codeError } = await supabase.from('invite_codes').select('*').eq('code', inviteCode.trim()).single();
      if (codeError || !codeData) { setInviteError('無効な招待コードです'); setIsSubmitting(false); return; }
      const { data: userData, error: userError } = await supabase.from('users').insert({ line_id: lineProfile.line_id, line_name: lineProfile.line_name, line_picture_url: lineProfile.line_picture, role: codeData.role }).select().single();
      if (userError) {
        if (userError.code === '23505') {
          const { data: existing } = await supabase.from('users').select('*').eq('line_id', lineProfile.line_id).single();
          if (existing) { setCurrentUser(existing); setAuthPhase('app'); return; }
        }
        setInviteError('登録に失敗しました'); setIsSubmitting(false); return;
      }
      setCurrentUser(userData); setAuthPhase('app');
    } catch (err) { setInviteError('エラーが発生しました'); } finally { setIsSubmitting(false); }
  };

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      localStorage.removeItem('line_profile'); setCurrentUser(null); setLineProfile(null); setAuthPhase('login'); setView('top');
    }
  };

  useEffect(() => {
    if (authPhase !== 'app') return;
    const loadData = async () => {
      const { data: staffData } = await supabase.from('users').select('*');
      if (staffData) setStaffList(staffData.map(u => ({ id: u.line_id, name: u.line_name })));
      const { data: facData } = await supabase.from('facilities').select('*').order('created_at', { ascending: true });
      if (facData) setFacilities(facData.map(f => ({ id: f.id, name: f.name, icalUrl: f.ical_url || '', inventoryUrl: f.inventory_url || '', manualUrl: f.manual_url || '' })));
      const { data: selData } = await supabase.from('selections').select('*');
      if (selData) setSelections(selData.map(s => ({ dbId: s.id, facilityId: s.facility_id, eventId: s.event_id, staffId: s.staff_id, status: s.status, isCompleted: s.is_completed, completedAt: s.completed_at, rating: s.rating, reportText: s.report_text, reportImages: s.report_images || [], isVerified: s.is_verified })));
    };
    loadData();
  }, [authPhase]);

  const getDayLabel = (dateStr) => {
    const d = new Date(dateStr); const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    if (d.toDateString() === today.toDateString()) return '本日';
    if (d.toDateString() === tomorrow.toDateString()) return '明日';
    return null;
  };

  const isAdmin = currentUser?.role === 'admin';

  const parseIcal = (rawData) => {
    const unfolded = rawData.replace(/\r?\n[ \t]/g, '');
    const events = [];
    const blocks = unfolded.split('BEGIN:VEVENT');
    for (let i = 1; i < blocks.length; i++) {
      const b = blocks[i];
      const summary = b.match(/SUMMARY:(.*)/)?.[1]?.trim().replace(/\\n/gi, '\n').replace(/\\,/g, ',') || '予定';
      const dtMatch = b.match(/DTSTART[:;](?:VALUE=DATE:)?(\d{8}T\d{6}Z?|\d{8})/);
      const uid = b.match(/UID:(.*)/)?.[1]?.trim() || Math.random().toString();
      const desc = b.match(/DESCRIPTION:(.*)/)?.[1]?.trim().replace(/\\n/gi, '\n').replace(/\\,/g, ',') || '';
      if (dtMatch) {
        const d = dtMatch[1];
        const iso = d.length === 8
          ? new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T00:00:00Z`).toISOString()
          : new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}T${d.slice(9,11)}:${d.slice(11,13)}:${d.slice(13,15)}Z`).toISOString();
        events.push({ id: uid, title: summary, originalTitle: summary, start: iso, end: iso, description: desc });
      }
    }
    return events;
  };

  const syncFacilityCalendar = useCallback(async (facility) => {
    if (!facility.icalUrl) return;
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/ical-proxy?url=${encodeURIComponent(facility.icalUrl)}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.text();
      setCalendarEvents(prev => ({ ...prev, [facility.id]: parseIcal(data) }));
    } catch (e) { console.error(e); } finally { setIsSyncing(false); }
  }, []);

  const syncAllFacilities = useCallback(async () => {
    setIsSyncing(true);
    for (const f of facilities) await syncFacilityCalendar(f);
    setIsSyncing(false);
  }, [facilities, syncFacilityCalendar]);

  useEffect(() => {
    if (selectedFacilityId && !calendarEvents[selectedFacilityId]) {
      const f = facilities.find(fac => fac.id === selectedFacilityId);
      if (f && f.icalUrl) syncFacilityCalendar(f);
    }
  }, [selectedFacilityId, facilities, calendarEvents, syncFacilityCalendar]);

  const toggleAttendance = async (eventId, staffId) => {
    if (!selectedFacilityId) return;
    const existing = selections.find(s => s.eventId === eventId && s.staffId === staffId && s.facilityId === selectedFacilityId);
    if (existing?.status === 'available') {
      if (existing.dbId) await supabase.from('selections').delete().eq('id', existing.dbId);
      setSelections(prev => prev.filter(s => !(s.eventId === eventId && s.staffId === staffId && s.facilityId === selectedFacilityId)));
    } else {
      const { data } = await supabase.from('selections').insert({ facility_id: selectedFacilityId, event_id: eventId, staff_id: staffId, status: 'available' }).select().single();
      if (data) setSelections(prev => [...prev, { dbId: data.id, facilityId: data.facility_id, eventId: data.event_id, staffId: data.staff_id, status: data.status, isCompleted: data.is_completed, completedAt: data.completed_at, rating: data.rating, reportText: data.report_text, reportImages: data.report_images || [], isVerified: data.is_verified }]);
    }
  };

  const submitReport = async () => {
    if (!reportingTask || !selectedFacilityId) return;
    const existing = selections.find(s => s.eventId === reportingTask.eventId && s.staffId === reportingTask.staffId && s.facilityId === selectedFacilityId);
    const reportData = { is_completed: true, completed_at: new Date().toISOString(), rating: reportRating, report_text: reportText, report_images: reportImages, is_verified: false };
    if (existing?.dbId) {
      await supabase.from('selections').update(reportData).eq('id', existing.dbId);
      setSelections(prev => prev.map(s => (s.eventId === reportingTask.eventId && s.staffId === reportingTask.staffId && s.facilityId === selectedFacilityId) ? { ...s, isCompleted: true, completedAt: reportData.completed_at, rating: reportRating, reportText, reportImages, isVerified: false } : s));
    } else {
      const { data } = await supabase.from('selections').insert({ facility_id: selectedFacilityId, event_id: reportingTask.eventId, staff_id: reportingTask.staffId, status: 'available', ...reportData }).select().single();
      if (data) setSelections(prev => [...prev, { dbId: data.id, facilityId: data.facility_id, eventId: data.event_id, staffId: data.staff_id, status: data.status, isCompleted: true, completedAt: data.completed_at, rating: data.rating, reportText: data.report_text, reportImages: data.report_images || [], isVerified: false }]);
    }
    setReportingTask(null); setReportRating('normal'); setReportText(''); setReportImages([]);
  };

  const toggleVerify = async (eventId, staffId, facilityId) => {
    const sel = selections.find(s => s.eventId === eventId && s.staffId === staffId && s.facilityId === facilityId);
    if (!sel?.dbId) return;
    const nv = !sel.isVerified;
    await supabase.from('selections').update({ is_verified: nv }).eq('id', sel.dbId);
    setSelections(prev => prev.map(s => (s.eventId === eventId && s.staffId === staffId && s.facilityId === facilityId) ? { ...s, isVerified: nv } : s));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).slice(0, 10).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setReportImages(prev => [...prev, reader.result].slice(0, 10));
      reader.readAsDataURL(file);
    });
  };

  const handleSaveFacility = async (e) => {
    e.preventDefault();
    if (!newFacilityName.trim()) return;
    if (editingFacilityId) {
      const { data } = await supabase.from('facilities').update({ name: newFacilityName.trim(), ical_url: newIcalUrl.trim() || null, inventory_url: newInventoryUrl.trim() || null, manual_url: newManualUrl.trim() || null }).eq('id', editingFacilityId).select().single();
      if (data) setFacilities(prev => prev.map(f => f.id === editingFacilityId ? { id: data.id, name: data.name, icalUrl: data.ical_url || '', inventoryUrl: data.inventory_url || '', manualUrl: data.manual_url || '' } : f));
      setEditingFacilityId(null);
    } else {
      const { data } = await supabase.from('facilities').insert({ name: newFacilityName.trim(), ical_url: newIcalUrl.trim() || null, inventory_url: newInventoryUrl.trim() || null, manual_url: newManualUrl.trim() || null, created_by: currentUser?.line_id || '' }).select().single();
      if (data) setFacilities(prev => [...prev, { id: data.id, name: data.name, icalUrl: data.ical_url || '', inventoryUrl: data.inventory_url || '', manualUrl: data.manual_url || '' }]);
    }
    setNewFacilityName(''); setNewIcalUrl(''); setNewInventoryUrl(''); setNewManualUrl('');
  };

  const startEditingFacility = (f) => { setEditingFacilityId(f.id); setNewFacilityName(f.name); setNewIcalUrl(f.icalUrl || ''); setNewInventoryUrl(f.inventoryUrl || ''); setNewManualUrl(f.manualUrl || ''); };
  const removeFacility = async (id) => { if (confirm('施設を削除しますか？')) { await supabase.from('facilities').delete().eq('id', id); setFacilities(prev => prev.filter(f => f.id !== id)); } };
  const currentFacility = useMemo(() => facilities.find(f => f.id === selectedFacilityId), [facilities, selectedFacilityId]);
  const currentStaff = useMemo(() => staffList.find(s => s.id === selectedStaffId), [staffList, selectedStaffId]);

  if (authPhase === 'loading') return (<div className="min-h-screen bg-white flex flex-col items-center justify-center"><div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div><p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Loading...</p></div>);

  if (authPhase === 'login') return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-10 animate-pulse"><CalendarIcon className="w-12 h-12" /></div>
      <h1 className="text-3xl font-black tracking-tight mb-2">CLEAN PULSE</h1>
      <p className="text-sm text-slate-400 font-bold mb-16 uppercase tracking-widest">Smart Cleaning Logic</p>
      <button onClick={handleLineLogin} className="w-full max-w-sm flex items-center justify-center gap-4 py-5 rounded-2xl font-bold text-white shadow-2xl bg-[#06C755] hover:bg-[#05b14c] transition-all active:scale-[0.97]"><LineIcon className="w-7 h-7" />LINEでログイン</button>
    </div>
  );

  if (authPhase === 'invite_code') return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8"><CalendarIcon className="w-10 h-10" /></div>
      <h2 className="text-2xl font-black mb-2">ようこそ！</h2>
      <p className="text-sm text-slate-500 mb-2">{lineProfile?.line_name} さん</p>
      <p className="text-xs text-slate-400 mb-10">招待コードを入力して登録を完了してください</p>
      <form onSubmit={handleInviteSubmit} className="w-full max-w-sm space-y-4">
        <input type="text" value={inviteCode} onChange={(e) => { setInviteCode(e.target.value); setInviteError(''); }} placeholder="招待コードを入力" className="w-full text-center text-lg py-5 px-6 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" autoFocus />
        {inviteError && <p className="text-sm text-red-500 font-bold">{inviteError}</p>}
        <button type="submit" disabled={!inviteCode.trim() || isSubmitting} className="w-full py-5 bg-blue-600 text-white text-base font-bold rounded-2xl shadow-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-slate-300 disabled:shadow-none">{isSubmitting ? <span className="flex items-center justify-center gap-3"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>確認中...</span> : '登録する'}</button>
      </form>
      <button onClick={() => { localStorage.removeItem('line_profile'); setAuthPhase('login'); }} className="mt-8 text-xs text-slate-400 underline">別のアカウントでログイン</button>
    </div>
  );

  const renderTop = () => {
    const todayStr = new Date().toDateString();
    const todaySchedules = facilities.flatMap(f => { const events = calendarEvents[f.id] || []; return events.filter(e => new Date(e.start).toDateString() === todayStr).map(e => ({ facility: f, event: e })); });
    const formattedToday = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' });
    return (
      <div className="space-y-8 py-6">
        <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col mb-8"><span className="text-xs text-blue-600 font-bold tracking-widest uppercase mb-2">Today</span><h3 className="text-2xl font-black text-slate-900 tracking-tight">{formattedToday}</h3></div>
          <div className="space-y-4">
            {todaySchedules.length === 0 ? (<div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200"><p className="text-xs text-slate-400 font-bold">本日の清掃予定はありません</p></div>) : todaySchedules.map(({ facility, event }, i) => {
              const assigned = selections.find(s => s.facilityId === facility.id && s.eventId === event.id && s.status === 'available');
              const staff = assigned ? staffList.find(sl => sl.id === assigned.staffId) : null;
              return (<button key={i} onClick={() => { setSelectedFacilityId(facility.id); setView('facility_detail'); setFacilityTab('next14'); }} className="w-full text-left flex flex-col p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all active:scale-[0.98] shadow-sm"><div className="flex justify-between items-center mb-2 w-full"><span className="text-xs font-bold text-blue-600 uppercase">{facility.name}</span><span className={`text-xs font-bold px-3 py-1 rounded-full border ${staff ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>{staff ? staff.name : '未割当'}</span></div><p className="text-base font-bold text-slate-800 truncate">{event.title}</p></button>);
            })}
          </div>
        </section>
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => setView('facility_list')} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group text-left active:scale-[0.98]"><div className="flex items-center gap-4"><div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><HomeIcon className="w-6 h-6" /></div><div><p className="font-bold text-slate-800">清掃スケジュール</p><p className="text-xs text-slate-400">施設ごとの予定管理</p></div></div><ChevronDownIcon className="w-5 h-5 -rotate-90 text-slate-300" /></button>
          {isAdmin && (<>
            <button onClick={() => setView('staff_list')} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group text-left active:scale-[0.98]"><div className="flex items-center gap-4"><div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all"><UserGroupIcon className="w-6 h-6" /></div><div><p className="font-bold text-slate-800">スタッフ管理</p><p className="text-xs text-slate-400">登録スタッフの確認</p></div></div><ChevronDownIcon className="w-5 h-5 -rotate-90 text-slate-300" /></button>
            <button onClick={() => setView('facility_settings')} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group text-left active:scale-[0.98]"><div className="flex items-center gap-4"><div className="p-3 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all"><PlusIcon className="w-6 h-6" /></div><div><p className="font-bold text-slate-800">施設設定</p><p className="text-xs text-slate-400">施設の追加・編集</p></div></div><ChevronDownIcon className="w-5 h-5 -rotate-90 text-slate-300" /></button>
          </>)}
        </div>
      </div>
    );
  };

  const renderFacilityList = () => (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-4"><button onClick={() => setView('top')} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeftIcon className="w-6 h-6"/></button><h2 className="text-xl font-bold">施設を選択</h2></div>
      <div className="grid gap-4">
        {facilities.length === 0 ? (<div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-2xl"><p className="text-xs text-slate-400 font-bold mb-4">施設が登録されていません</p>{isAdmin && <button onClick={() => setView('facility_settings')} className="text-sm font-bold text-blue-600 underline">施設を追加</button>}</div>) : facilities.map(f => (
          <button key={f.id} onClick={() => { setSelectedFacilityId(f.id); setView('facility_detail'); setFacilityTab('next14'); }} className="w-full p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex justify-between items-center active:scale-[0.98] transition-all hover:shadow-lg group"><div className="flex flex-col text-left"><span className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{f.name}</span><span className="text-xs text-slate-400 mt-1">スケジュールを確認</span></div><ChevronDownIcon className="w-5 h-5 -rotate-90 text-slate-300" /></button>
        ))}
      </div>
    </div>
  );

  const renderFacilityDetail = () => {
    const rawEvents = (selectedFacilityId && calendarEvents[selectedFacilityId]) || [];
    const now = new Date(); const limit = new Date(); limit.setDate(now.getDate() + 14);
    const todayStart = new Date(now); todayStart.setHours(0,0,0,0);
    const filtered = rawEvents.filter(event => {
      const eDate = new Date(event.start);
      const isDone = selections.some(s => s.eventId === event.id && s.facilityId === selectedFacilityId && s.isCompleted);
      return facilityTab === 'next14' ? (!isDone && eDate >= todayStart && eDate <= limit) : isDone;
    });
    const sorted = [...filtered].sort((a, b) => facilityTab === 'next14' ? new Date(a.start) - new Date(b.start) : new Date(b.start) - new Date(a.start));
    return (
      <div className="space-y-6 pb-20 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><button onClick={() => setView('facility_list')} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeftIcon className="w-6 h-6"/></button><h2 className="text-lg font-bold truncate max-w-[160px]">{currentFacility?.name}</h2></div>
          <div className="flex items-center gap-2">
            <button onClick={() => currentFacility && currentFacility.icalUrl && syncFacilityCalendar(currentFacility)} className={`p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm ${isSyncing ? 'animate-spin text-blue-500' : 'text-slate-400'}`}><RefreshIcon className="w-5 h-5" /></button>
            {currentFacility?.inventoryUrl && <a href={currentFacility.inventoryUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100"><ClipboardIcon className="w-5 h-5" /></a>}
            {currentFacility?.manualUrl && <a href={currentFacility.manualUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-green-50 text-green-600 rounded-xl border border-green-100"><BookOpenIcon className="w-5 h-5" /></a>}
          </div>
        </div>
        <div className="flex p-1.5 bg-slate-100 rounded-xl">
          <button onClick={() => setFacilityTab('next14')} className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${facilityTab === 'next14' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>今後14日間</button>
          <button onClick={() => setFacilityTab('completed')} className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${facilityTab === 'completed' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>清掃完了</button>
        </div>
        <div className="space-y-4">
          {sorted.length === 0 ? (<div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200"><p className="text-xs text-slate-400 font-bold">{facilityTab === 'next14' ? (currentFacility?.icalUrl ? '今後14日間の予定はありません' : 'iCal URLが未設定です') : '完了した清掃はありません'}</p></div>) : sorted.map(event => {
            const date = new Date(event.start); const dayLabel = getDayLabel(event.start);
            const isExpanded = expandedEventId === event.id;
            const assigned = selections.filter(s => s.eventId === event.id && s.facilityId === selectedFacilityId && s.status === 'available');
            const completed = assigned.filter(s => s.isCompleted);
            const isFullyVerified = completed.length > 0 && completed.every(l => l.isVerified);
            return (
              <div key={event.id} className="space-y-1">
                {dayLabel && <div className="px-4 py-1"><span className="text-xs font-bold bg-blue-600 text-white px-3 py-1 rounded-full">{dayLabel}</span></div>}
                <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all ${isExpanded ? 'border-blue-200 ring-4 ring-blue-500/5' : 'border-slate-100'}`}>
                  <div className="p-5 cursor-pointer" onClick={() => setExpandedEventId(isExpanded ? null : event.id)}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{date.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })}</span>
                      {facilityTab === 'next14' ? (assigned.length > 0 ? assigned.map(a => <span key={a.staffId} className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">{staffList.find(s => s.id === a.staffId)?.name}</span>) : <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-400">未割当</span>) : <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${isFullyVerified ? 'bg-green-100 text-green-600 border-green-200' : 'bg-yellow-100 text-yellow-600 border-yellow-200'}`}>{isFullyVerified ? '確認済' : '未確認'}</span>}
                    </div>
                    <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-slate-800 truncate pr-6">{event.title}</h4><ChevronDownIcon className={`w-5 h-5 text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}/></div>
                  </div>
                  {isExpanded && (
                    <div className="px-5 pb-6 border-t border-slate-50 pt-5 space-y-5">
                      {facilityTab === 'next14' ? (
                        <div className="space-y-4">
                          {event.description && <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 font-bold mb-2">カレンダー詳細</p><p className="text-xs text-slate-600 whitespace-pre-wrap">{event.description}</p></div>}
                          <div className="space-y-3">
                            <p className="text-xs text-slate-400 font-bold">担当スタッフを選択</p>
                            <div className="flex flex-wrap gap-2">
                              {staffList.map(s => { const isSel = selections.some(sel => sel.eventId === event.id && sel.staffId === s.id && sel.facilityId === selectedFacilityId && sel.status === 'available'); return <button key={s.id} onClick={(e) => { e.stopPropagation(); toggleAttendance(event.id, s.id); }} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${isSel ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}>{s.name}</button>; })}
                            </div>
                            {assigned.filter(a => !a.isCompleted).map(a => { const s = staffList.find(st => st.id === a.staffId); if (!s) return null; return <button key={s.id} onClick={(e) => { e.stopPropagation(); setReportingTask({ eventId: event.id, staffId: s.id }); }} className="w-full flex items-center justify-center gap-3 py-4 bg-green-600 text-white text-sm font-bold rounded-xl shadow-lg active:scale-[0.98]"><CheckCircleIcon className="w-5 h-5" />{s.name} として完了報告</button>; })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {completed.map((s, idx) => (
                            <div key={idx} className="bg-slate-50 p-5 rounded-xl space-y-3 border border-slate-100">
                              <div className="flex justify-between items-center">
                                <div><p className="text-xs font-bold text-slate-700">担当: {staffList.find(st => st.id === s.staffId)?.name}</p><p className="text-xs text-slate-400 mt-1">完了: {new Date(s.completedAt || '').toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p></div>
                                {isAdmin && <button onClick={(e) => { e.stopPropagation(); toggleVerify(event.id, s.staffId, selectedFacilityId); }} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${s.isVerified ? 'bg-green-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>{s.isVerified ? '確認済み' : '確認する'}</button>}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 w-fit px-3 py-1 rounded-lg"><StarIcon className="w-3.5 h-3.5" /> ゲスト: {RATING_LABELS[s.rating || 'normal']}</div>
                              {s.reportText && <p className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-100">{s.reportText}</p>}
                              {s.reportImages?.length > 0 && <div className="grid grid-cols-4 gap-2">{s.reportImages.map((img, i) => <div key={i} className="aspect-square overflow-hidden rounded-lg bg-slate-200 border border-slate-100"><img src={img} className="w-full h-full object-cover" alt="" /></div>)}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFacilitySettings = () => (
    <div className="space-y-8 py-4">
      <div className="flex items-center gap-4"><button onClick={() => setView('top')} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeftIcon className="w-6 h-6"/></button><h2 className="text-xl font-bold">施設設定</h2></div>
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg space-y-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase">{editingFacilityId ? '施設を編集' : '新規施設'}</h3>
        <form onSubmit={handleSaveFacility} className="space-y-4">
          {[{ label: '施設名称', value: newFacilityName, set: setNewFacilityName, placeholder: '例: 新宿テラス 101号室' },{ label: 'iCal URL', value: newIcalUrl, set: setNewIcalUrl, placeholder: 'Googleカレンダー等のiCal URL' },{ label: '補充用URL', value: newInventoryUrl, set: setNewInventoryUrl, placeholder: '在庫表へのリンク' },{ label: 'マニュアルURL', value: newManualUrl, set: setNewManualUrl, placeholder: 'マニュアルリンク' }].map(({ label, value, set, placeholder }) => (
            <div key={label} className="space-y-1"><label className="text-xs font-bold text-slate-400 pl-1">{label}</label><input className="w-full text-sm p-4 rounded-xl bg-slate-50 border-none font-medium focus:ring-2 focus:ring-blue-500/20" value={value} onChange={e => set(e.target.value)} placeholder={placeholder} /></div>
          ))}
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-[0.98]">{editingFacilityId ? '更新' : '登録'}</button>
            {editingFacilityId && <button type="button" onClick={() => { setEditingFacilityId(null); setNewFacilityName(''); setNewIcalUrl(''); setNewInventoryUrl(''); setNewManualUrl(''); }} className="px-6 bg-slate-100 rounded-xl font-bold text-slate-400">取消</button>}
          </div>
        </form>
      </section>
      <div className="space-y-3 pb-20">
        <h3 className="text-xs font-bold text-slate-400 pl-1">登録済み ({facilities.length})</h3>
        {facilities.map(f => (<div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm"><p className="font-bold text-slate-800 truncate pr-4">{f.name}</p><div className="flex gap-1 flex-shrink-0"><button onClick={() => { setSelectedFacilityId(f.id); setView('facility_detail'); }} className="p-3 text-blue-400 hover:text-blue-600"><CalendarIcon className="w-5 h-5"/></button><button onClick={() => startEditingFacility(f)} className="p-3 text-slate-400 hover:text-blue-600"><PencilIcon className="w-5 h-5"/></button><button onClick={() => removeFacility(f.id)} className="p-3 text-red-400 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button></div></div>))}
      </div>
    </div>
  );

  const renderStaffList = () => (
    <div className="space-y-8 py-4">
      <div className="flex items-center gap-4"><button onClick={() => setView('top')} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeftIcon className="w-6 h-6"/></button><h2 className="text-xl font-bold">スタッフ管理</h2></div>
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"><p className="text-xs text-slate-400 mb-3">スタッフは招待コード <span className="font-bold text-blue-600">jomostay-clean</span> でLINEログインすると自動登録されます</p></div>
      <div className="grid gap-4 pb-20">
        {staffList.length === 0 ? (<div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200"><p className="text-xs text-slate-400 font-bold">まだスタッフが登録されていません</p></div>) : staffList.map(s => (
          <button key={s.id} onClick={() => { setSelectedStaffId(s.id); setView('staff_detail'); }} className="w-full p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex justify-between items-center group active:scale-[0.98]"><div className="flex items-center gap-4 text-left"><div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-bold">{s.name[0]}</div><span className="font-bold text-lg text-slate-800">{s.name}</span></div></button>
        ))}
      </div>
    </div>
  );

  const renderStaffDetail = () => {
    const upcomingSchedule = facilities.flatMap(f => { const events = calendarEvents[f.id] || []; return events.filter(e => { const isAssigned = selections.some(s => s.staffId === selectedStaffId && s.eventId === e.id && s.facilityId === f.id && s.status === 'available'); const isCompleted = selections.some(s => s.staffId === selectedStaffId && s.eventId === e.id && s.facilityId === f.id && s.isCompleted); return isAssigned && !isCompleted; }).map(e => ({ facility: f, event: e })); }).sort((a, b) => new Date(a.event.start) - new Date(b.event.start));
    const staffHistory = selections.filter(s => s.staffId === selectedStaffId && s.isCompleted);
    return (
      <div className="space-y-8 py-4">
        <div className="flex items-center gap-4"><button onClick={() => setView('staff_list')} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeftIcon className="w-6 h-6"/></button><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">{currentStaff?.name[0]}</div><h2 className="text-xl font-bold">{currentStaff?.name}</h2></div></div>
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 pl-1">今後の予定 ({upcomingSchedule.length})</h3>
          {upcomingSchedule.length === 0 ? (<div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200"><p className="text-xs text-slate-400 font-bold">予定なし</p></div>) : upcomingSchedule.map(({ facility, event }, i) => (<button key={i} onClick={() => { setSelectedFacilityId(facility.id); setView('facility_detail'); setFacilityTab('next14'); setExpandedEventId(event.id); }} className="w-full text-left flex flex-col p-5 bg-white rounded-xl border border-slate-100 shadow-sm active:scale-[0.98]"><div className="flex justify-between items-center mb-2 w-full"><span className="text-xs font-bold text-blue-600">{facility.name}</span><span className="text-xs text-slate-400">{new Date(event.start).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', weekday: 'short' })}</span></div><p className="text-sm font-bold text-slate-800 truncate">{event.title}</p></button>))}
        </section>
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 pl-1">完了履歴 ({staffHistory.length})</h3>
          {staffHistory.length === 0 ? (<div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200"><p className="text-xs text-slate-400 font-bold">履歴なし</p></div>) : staffHistory.map((h, i) => { const fac = facilities.find(f => f.id === h.facilityId); return <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"><span className="text-xs font-bold text-blue-600">{fac?.name || '削除済み'}</span><p className="text-sm font-bold text-slate-800 mt-1">{new Date(h.completedAt || '').toLocaleDateString('ja-JP')} 完了</p></div>; })}
        </section>
      </div>
    );
  };

  const renderReportModal = () => {
    if (!reportingTask) return null;
    const staff = staffList.find(s => s.id === reportingTask.staffId);
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md">
        <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl">
          <div className="p-8 space-y-6 overflow-y-auto max-h-[92vh] pb-16">
            <div className="flex items-center justify-between"><div><h3 className="text-xl font-bold">清掃完了報告</h3><p className="text-xs text-slate-400 font-bold mt-1">担当: {staff?.name}</p></div><button onClick={() => setReportingTask(null)} className="p-3 bg-slate-50 rounded-full text-slate-400"><XCircleIcon className="w-7 h-7" /></button></div>
            <section className="space-y-3"><label className="text-xs font-bold text-slate-400">ゲストの利用品質</label><div className="grid grid-cols-4 gap-2">{['worst', 'dirty', 'normal', 'clean'].map(r => (<button key={r} onClick={() => setReportRating(r)} className={`py-4 rounded-xl text-xs font-bold border transition-all ${reportRating === r ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>{RATING_LABELS[r]}</button>))}</div></section>
            <section className="space-y-3"><label className="text-xs font-bold text-slate-400">清掃後写真 (最大10枚)</label><div className="flex flex-wrap gap-3"><label className="w-20 h-20 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer text-slate-300"><CameraIcon className="w-8 h-8" /><input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} /></label>{reportImages.map((img, i) => (<div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover rounded-xl" alt="" /><button onClick={() => setReportImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><XCircleIcon className="w-3.5 h-3.5" /></button></div>))}</div></section>
            <section className="space-y-3"><label className="text-xs font-bold text-slate-400">特記事項</label><textarea className="w-full h-28 p-4 text-sm bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="忘れ物、備品不足など..." value={reportText} onChange={e => setReportText(e.target.value)} /></section>
            <button onClick={submitReport} className="w-full py-5 bg-blue-600 text-white font-bold rounded-xl shadow-xl active:scale-[0.98]">報告を送信する</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50 overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-16 flex items-center">
        <div className="max-w-md mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('top')}><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"><CalendarIcon className="w-5 h-5" /></div><div><h1 className="text-sm font-bold tracking-tight leading-none">CLEAN PULSE</h1><span className="text-xs text-slate-400">{currentUser?.line_name} ({isAdmin ? '管理者' : 'スタッフ'})</span></div></div>
          <div className="flex items-center gap-2"><button onClick={syncAllFacilities} className={`p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm ${isSyncing ? 'animate-spin' : ''}`}><RefreshIcon className="w-5 h-5" /></button><button onClick={handleLogout} className="text-xs text-slate-400 hover:text-red-500 px-2 py-1">ログアウト</button></div>
        </div>
      </header>
      <main className="max-w-md mx-auto px-6 pb-32 pt-2">
        {view === 'top' && renderTop()}
        {view === 'facility_list' && renderFacilityList()}
        {view === 'facility_detail' && renderFacilityDetail()}
        {view === 'facility_settings' && renderFacilitySettings()}
        {view === 'staff_list' && renderStaffList()}
        {view === 'staff_detail' && renderStaffDetail()}
      </main>
      {renderReportModal()}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-100 h-20 flex items-center justify-around px-8 rounded-t-2xl shadow-lg">
        <button onClick={() => setView('top')} className={`flex flex-col items-center gap-1 transition-all ${view === 'top' ? 'text-blue-600 scale-110' : 'text-slate-300'}`}><HomeIcon className="w-6 h-6" /><span className="text-xs font-bold">Home</span></button>
        <button onClick={() => setView('facility_list')} className={`flex flex-col items-center gap-1 transition-all ${['facility_list', 'facility_detail'].includes(view) ? 'text-blue-600 scale-110' : 'text-slate-300'}`}><CalendarIcon className="w-6 h-6" /><span className="text-xs font-bold">Sched</span></button>
        {isAdmin && <button onClick={() => setView('staff_list')} className={`flex flex-col items-center gap-1 transition-all ${['staff_list', 'staff_detail'].includes(view) ? 'text-blue-600 scale-110' : 'text-slate-300'}`}><UserGroupIcon className="w-6 h-6" /><span className="text-xs font-bold">Staff</span></button>}
      </nav>
    </div>
  );
}
