"use client";

import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Edit,
  FileText,
  CreditCard,
  Save,
  X,
  Pencil,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import { DataStore, Student, LessonSchedule } from "@/lib/data-store";
import { getStudentDetail, addLessonSchedule, deleteLessonSchedule, updateStudent, getTeachers } from "@/lib/actions/admin";
import { Teacher as DBTeacher } from "@prisma/client";

const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function StudentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("lessons");
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentSchedule, setStudentSchedule] = useState<LessonSchedule[]>([]);
  const [teachers, setTeachers] = useState<DBTeacher[]>([]);

  // Scheduling States
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [targetDates, setTargetDates] = useState<string[]>([]);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [newLesson, setNewLesson] = useState<{
    time: string;
    endTime: string;
    course: string;
    type: string;
    teacherName: string;
  }>({
    time: "14:00",
    endTime: "14:50",
    course: "英語",
    type: "General",
    teacherName: "",
  });

  // Editing States
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  // Modal Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<Partial<Student>>({});

  const fetchStudentData = async () => {
    setIsLoading(true);
    const detail = await getStudentDetail(resolvedParams.id);
    if (detail) {
      setStudent(detail as any);
      setNoteDraft(detail.internalNote || "");

      const VALID_COURSES = [
        "英語",
        "中一英語",
        "中二英語",
        "中三英語",
        "数学",
        "中一数学",
        "中二数学",
        "中三数学",
      ];
      const initialCourse = VALID_COURSES.includes(detail.course)
        ? detail.course
        : "英語";

      setNewLesson((prev) => ({
        ...prev,
        course: initialCourse,
      }));

      // Set schedule sorting
      setStudentSchedule(
        (detail.schedules || []).sort((a: any, b: any) =>
          `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
        ) as any,
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStudentData();
    getTeachers().then(data => {
      const teacherList = data as unknown as DBTeacher[];
      setTeachers(teacherList);
      if (teacherList.length > 0) {
        setNewLesson(prev => ({ ...prev, teacherName: teacherList[0].name }));
      }
    });
  }, [resolvedParams.id]);

  const refreshSchedule = () => {
    fetchStudentData();
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    // Calculate duration string
    const start = new Date(`2000-01-01T${newLesson.time}`);
    const end = new Date(`2000-01-01T${newLesson.endTime}`);
    const diff = (end.getTime() - start.getTime()) / 60000;
    const durationStr = `${diff}m`;

    // Create a lesson for EACH target date
    const promises = targetDates.map((date) => {
      return addLessonSchedule({
        studentId: student.id,
        studentName: student.name,
        teacherName: newLesson.teacherName || (teachers.length > 0 ? teachers[0].name : ""),
        date: date,
        time: newLesson.time,
        duration: durationStr,
        course: newLesson.course, // Use the simple selected course name
        type: "General"
      });
    });

    await Promise.all(promises);

    setIsScheduleModalOpen(false);
    setTargetDates([]); // Reset to empty
    refreshSchedule();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If list is empty, just set it. If not, don't auto-replace unless intended (simplified: just replace first if only 1, or push?)
    // Let's make it simple: The input controls a temporary date, and there's an "Add" button?
    // Or simpler: The input updates the LATEST date, or adds a new one?
    // Let's stick to: Input changes the LAST date in the list or acts as a picker for a NEW date.
  };

  const handleDeleteSchedule = async (id: string) => {
    if (confirm("予約をキャンセルしますか？")) {
      await deleteLessonSchedule(id, resolvedParams.id);
      refreshSchedule();
    }
  };

  const handleSaveNote = async () => {
    if (!student) return;
    const updated = { ...student, internalNote: noteDraft };
    await updateStudent(student.id, updated);
    setStudent(updated as any);
    setIsEditingNote(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    const updated = { ...student, ...editDraft } as Student;
    // もしパスワードが空欄なら変更せず元の値を維持
    if (!editDraft.password || editDraft.password.trim() === "") {
      updated.password = student.password;
    }
    await updateStudent(student.id, updated);
    setStudent(updated as any);
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    if (!student) return;
    setEditDraft({ ...student }); // パスワードを表示させる
    setIsEditModalOpen(true);
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (!student) return <div className="p-10">Student not found</div>;

  // Calculate real skill averages from database records
  const recentRecords = (student as any).records || [];
  const getAverage = (skill: string) => {
    if (recentRecords.length === 0) return 50;
    const sum = recentRecords.reduce((acc: number, r: any) => acc + (r[skill] || 50), 0);
    return Math.round(sum / recentRecords.length);
  };

  const skills = [
    { label: "文法 (Grammar)", percent: getAverage('grammar'), color: "bg-red-500" },
    { label: "語彙 (Vocabulary)", percent: getAverage('vocab'), color: "bg-indigo-600" },
    { label: "発音 (Pronunciation)", percent: getAverage('pronunciation'), color: "bg-amber-500" },
    { label: "流暢さ (Fluency)", percent: getAverage('fluency'), color: "bg-emerald-600" },
  ];

  // Derived Stats
  const nextLesson = studentSchedule.find((s) => {
    const now = new Date();
    const lessonDate = new Date(`${s.date}T${s.time}`);
    return lessonDate >= now;
  });

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/students"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={22} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              {student.name}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-all flex items-center gap-2 shadow-sm"
          >
            <Calendar size={18} />
            新規予約
          </button>
          <button
            onClick={openEditModal}
            className="px-5 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm"
          >
            <Edit size={18} />
            基本情報を編集
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatSmall
              label="累計レッスン"
              value={`${student.totalLessons || 0}回`}
              icon={BookOpen}
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
            <StatSmall
              label="進捗率"
              value={`${student.progress}%`}
              icon={TrendingUp}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            />
            <StatSmall
              label="最終授業"
              value={student.lastLesson || "---"}
              icon={Calendar}
              color="text-amber-600"
              bgColor="bg-amber-50"
            />
            <StatSmall
              label="次回予定"
              value={
                nextLesson
                  ? `${nextLesson.date.split("-")[1]}月${nextLesson.date.split("-")[2]}日 ${nextLesson.time}`
                  : "なし"
              }
              icon={Clock}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tab Navigation */}
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1.5 flex gap-1.5">
                <TabButton
                  active={activeTab === "lessons"}
                  onClick={() => setActiveTab("lessons")}
                  label="レッスン履歴"
                />
                <TabButton
                  active={activeTab === "schedule"}
                  onClick={() => setActiveTab("schedule")}
                  label="予約管理"
                />
              </div>

              {/* Tab Content: Lessons */}
              {activeTab === "lessons" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-xl text-slate-900">
                        レッスン履歴
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {((student as any).records || []).length > 0 ? (
                        ((student as any).records || []).sort((a: any, b: any) => b.date.localeCompare(a.date)).map((record: any) => (
                          <div
                            key={record.id}
                            className="flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm min-w-[70px]">
                                  <p className="text-[10px] font-black text-indigo-600 uppercase mb-0.5">
                                    {record.date.split("-")[1]}月
                                  </p>
                                  <p className="text-lg font-black text-slate-900">
                                    {record.date.split("-")[2]}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-slate-900">
                                    {record.title}
                                  </h4>
                                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                                    担当: {record.teacher}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-500">
                                  完了報告
                                </span>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 text-sm text-slate-700">
                              <p className="font-bold text-xs text-slate-400 mb-1">
                                フィードバック:
                              </p>
                              {record.feedback}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                          <p className="text-sm font-bold text-slate-400">
                            レッスン記録はまだありません
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content: Schedule */}
              {activeTab === "schedule" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-xl text-slate-900">
                        今後の授業予定
                      </h3>
                      <button
                        onClick={() => setIsScheduleModalOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:bg-indigo-700 transition-all"
                      >
                        <Plus size={16} />
                        予約を追加
                      </button>
                    </div>

                    <div className="space-y-3">
                      {studentSchedule.length > 0 ? (
                        studentSchedule
                          .filter((s) => s.status === "Scheduled")
                          .map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group"
                            >
                              <div className="flex items-center gap-6">
                                <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm min-w-[70px]">
                                  <p className="text-[10px] font-black text-indigo-600 uppercase mb-0.5">
                                    {item.date.split("-")[1]}月
                                  </p>
                                  <p className="text-lg font-black text-slate-900">
                                    {item.date.split("-")[2]}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-black text-slate-900">
                                    {item.time} ({item.duration})
                                  </p>
                                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                                    講師: {item.teacherName} • {item.course}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteSchedule(item.id)}
                                className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ))
                      ) : (
                        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                          <p className="text-sm font-bold text-slate-400">
                            予定されている授業はありません
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative group">
                <h3 className="font-black text-xs uppercase tracking-[0.15em] text-slate-400 mb-6">
                  連絡先・基本情報
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-1.5xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider">
                        メールアドレス
                      </p>
                      <p className="text-sm font-black text-slate-900 truncate mt-0.5">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-1.5xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider">
                        電話番号
                      </p>
                      <p className="text-sm font-black text-slate-900 mt-0.5">
                        {student.phone || "未設定"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h2 className="text-xl font-black text-slate-900">
                基本情報の編集
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <form
              onSubmit={handleSaveProfile}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto p-10 space-y-8 min-h-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      氏名
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                      value={editDraft.name || ""}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                      value={editDraft.email || ""}
                      onChange={(e) =>
                        setEditDraft({ ...editDraft, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                        value={editDraft.phone || ""}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        受講コース
                      </label>
                      <select
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                        value={editDraft.course || ""}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, course: e.target.value })
                        }
                      >
                        <option value="英語">英語</option>
                        <option value="中一英語">中一英語</option>
                        <option value="中二英語">中二英語</option>
                        <option value="中三英語">中三英語</option>
                        <option value="数学">数学</option>
                        <option value="中一数学">中一数学</option>
                        <option value="中二数学">中二数学</option>
                        <option value="中三数学">中三数学</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        目標 (Target)
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                        value={editDraft.target || ""}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, target: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        ログイン ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                        value={editDraft.loginId || ""}
                        onChange={(e) =>
                          setEditDraft({
                            ...editDraft,
                            loginId: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        パスワード
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-sm font-black text-slate-900 transition-all"
                        value={editDraft.password || ""}
                        onChange={(e) =>
                          setEditDraft({
                            ...editDraft,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 pt-4 flex gap-4 shrink-0 bg-white border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-all text-sm uppercase tracking-widest"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all text-sm uppercase tracking-widest active:scale-95"
                >
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h2 className="text-xl font-black text-slate-900">
                授業予約 (新規追加)
              </h2>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={24} />
              </button>
            </div>
            <form
              onSubmit={handleAddSchedule}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto p-10 pt-8 space-y-8 min-h-0">
                <div className="space-y-6">
                  {/* Custom Inline Calendar */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      日付を選択 (複数選択可)
                    </label>

                    <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 overflow-hidden">
                      <div className="flex justify-between items-center mb-6">
                        <button
                          type="button"
                          onClick={() => {
                            const newDate = new Date(calendarViewDate);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setCalendarViewDate(newDate);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <div className="text-sm font-black text-slate-900">
                          {calendarViewDate.getFullYear()}年{" "}
                          {calendarViewDate.getMonth() + 1}月
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newDate = new Date(calendarViewDate);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setCalendarViewDate(newDate);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                        {["日", "月", "火", "水", "木", "金", "土"].map(
                          (d, i) => (
                            <div
                              key={d}
                              className={`text-[10px] font-black ${i === 0 ? "text-rose-400" : i === 6 ? "text-blue-400" : "text-slate-400"}`}
                            >
                              {d}
                            </div>
                          ),
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {/* Blanks */}
                        {Array.from({
                          length: new Date(
                            calendarViewDate.getFullYear(),
                            calendarViewDate.getMonth(),
                            1,
                          ).getDay(),
                        }).map((_, i) => (
                          <div key={`blank-${i}`} />
                        ))}

                        {/* Days */}
                        {Array.from({
                          length: new Date(
                            calendarViewDate.getFullYear(),
                            calendarViewDate.getMonth() + 1,
                            0,
                          ).getDate(),
                        }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = `${calendarViewDate.getFullYear()}-${String(calendarViewDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                          const isSelected = targetDates.includes(dateStr);
                          const isToday = dateStr === getTodayStr();

                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setTargetDates(
                                    targetDates.filter((d) => d !== dateStr),
                                  );
                                } else {
                                  setTargetDates(
                                    [...targetDates, dateStr].sort(),
                                  );
                                }
                              }}
                              className={`
                                                                aspect-square rounded-xl text-sm font-black flex items-center justify-center transition-all relative
                                                                ${isSelected
                                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 z-10"
                                  : "text-slate-700 hover:bg-slate-100 hover:scale-110"
                                }
                                                            `}
                            >
                              {day}
                              {isSelected && (
                                <div className="absolute -top-1 -right-1 bg-white text-indigo-600 rounded-full p-[2px] shadow-sm">
                                  <Check size={8} strokeWidth={4} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Dates List */}
                    <div className="flex flex-wrap gap-2 mt-4 min-h-[40px]">
                      {targetDates.length > 0 ? (
                        targetDates.map((date, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 animate-in fade-in zoom-in duration-200 shadow-lg shadow-slate-800/10"
                          >
                            {date}
                            <button
                              type="button"
                              onClick={() =>
                                setTargetDates(
                                  targetDates.filter((_, i) => i !== idx),
                                )
                              }
                              className="hover:bg-slate-700 rounded-full p-0.5 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs font-bold text-slate-400 py-2">
                          日付が選択されていません
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        開始時間
                      </label>
                      <select
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-slate-200 focus:border-indigo-600 outline-none text-sm font-black text-slate-900 shadow-sm"
                        value={newLesson.time}
                        onChange={(e) => {
                          // Default to +50 mins
                          const start = new Date(
                            `2000-01-01T${e.target.value}`,
                          );
                          const end = new Date(start.getTime() + 50 * 60000);
                          const hours = end
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const mins = end
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          setNewLesson({
                            ...newLesson,
                            time: e.target.value,
                            endTime: `${hours}:${mins}`,
                          });
                        }}
                      >
                        {Array.from({ length: 97 }).map((_, i) => {
                          // 09:00 to 25:00
                          const totalMins = 9 * 60 + i * 10;
                          const h = Math.floor(totalMins / 60);
                          const m = totalMins % 60;
                          const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                          return (
                            <option key={timeStr} value={timeStr}>
                              {timeStr}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        終了時間
                      </label>
                      <select
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-slate-200 focus:border-indigo-600 outline-none text-sm font-black text-slate-900 shadow-sm"
                        value={newLesson.endTime}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            endTime: e.target.value,
                          })
                        }
                      >
                        {Array.from({ length: 97 }).map((_, i) => {
                          // 09:00 to 25:00
                          const totalMins = 9 * 60 + i * 10;
                          const h = Math.floor(totalMins / 60);
                          const m = totalMins % 60;
                          const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                          return (
                            <option key={timeStr} value={timeStr}>
                              {timeStr}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      担当講師
                    </label>
                    <select
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-slate-200 focus:border-indigo-600 outline-none text-sm font-black text-slate-900 shadow-sm"
                      value={newLesson.teacherName}
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          teacherName: e.target.value,
                        })
                      }
                    >
                      {teachers.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      学習コース (科目)
                    </label>
                    <select
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-slate-200 focus:border-indigo-600 outline-none text-sm font-black text-slate-900 shadow-sm"
                      value={newLesson.course}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, course: e.target.value })
                      }
                    >
                      <option value="英語">英語</option>
                      <option value="中一英語">中一英語</option>
                      <option value="中二英語">中二英語</option>
                      <option value="中三英語">中三英語</option>
                      <option value="数学">数学</option>
                      <option value="中一数学">中一数学</option>
                      <option value="中二数学">中二数学</option>
                      <option value="中三数学">中三数学</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-10 pt-4 flex gap-4 shrink-0 bg-white border-t border-slate-50 mt-auto">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="flex-1 py-4 font-black text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={targetDates.length === 0}
                  className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {targetDates.length}件を予約
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function StatSmall({ label, value, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-2xl ${bgColor} ${color} transition-transform group-hover:scale-110`}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
            {label}
          </p>
          <p className="text-xl font-black text-slate-900 leading-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-5 text-sm font-black rounded-xl transition-all ${active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
        }`}
    >
      {label}
    </button>
  );
}

function HistoryItem({ date, title, teacher, rating }: any) {
  return (
    <div className="flex items-center justify-between p-5 border border-slate-100 bg-slate-50/30 rounded-2xl hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md">
      <div className="flex items-center gap-5">
        <div className="text-center min-w-[55px] px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-indigo-600 uppercase mb-0.5">
            {date.split("/")[1]}月
          </p>
          <p className="text-xl font-black text-slate-900 leading-none">
            {date.split("/")[2]}
          </p>
        </div>
        <div>
          <h4 className="font-black text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h4>
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1">
            担当: <span className="text-slate-900">{teacher}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-100">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i < rating ? "bg-indigo-500" : "bg-slate-200"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
