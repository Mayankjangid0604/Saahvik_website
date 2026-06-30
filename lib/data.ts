import type { LucideIcon } from "lucide-react";
import {
  UserPlus,
  IndianRupee,
  BedDouble,
  CalendarCheck,
  DoorOpen,
  CalendarDays,
  MessageSquareWarning,
  Wrench,
  Package,
  GraduationCap,
  MessagesSquare,
  BarChart3,
  ShieldCheck,
  Users,
  FolderArchive,
  LayoutGrid,
  CircleUserRound,
  Fingerprint,
  QrCode,
  ClipboardList,
  Boxes,
  Wallet,
  FileBarChart,
  Bell,
  MessageCircle,
  MessageSquare,
  CreditCard,
  KeyRound,
  Cloud,
  WifiOff,
  Sparkles,
  NotebookPen,
  Sheet,
  AppWindow,
  Files,
  Phone,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";

export type IconItem = { label: string; icon: LucideIcon };

/* ── Navigation ─────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Problems", href: "#problems" },
  { label: "Platform", href: "#platform" },
  { label: "Modules", href: "#modules" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#contact" },
];

/* ── 3 · Why We Are Building (legacy stack) ─────────────────── */
export const LEGACY_STACK: IconItem[] = [
  { label: "Registers", icon: NotebookPen },
  { label: "Excel Sheets", icon: Sheet },
  { label: "Disconnected Apps", icon: AppWindow },
  { label: "Manual Fee Tracking", icon: IndianRupee },
  { label: "Paper Records", icon: Files },
  { label: "Phone Calls", icon: Phone },
  { label: "WhatsApp", icon: MessageCircle },
];

/* ── 4 · Problems We Solve ──────────────────────────────────── */
export const PROBLEMS: IconItem[] = [
  { label: "Admissions", icon: UserPlus },
  { label: "Fee Management", icon: IndianRupee },
  { label: "Room Allocation", icon: BedDouble },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Visitor Management", icon: DoorOpen },
  { label: "Leave Management", icon: CalendarDays },
  { label: "Complaints", icon: MessageSquareWarning },
  { label: "Maintenance", icon: Wrench },
  { label: "Inventory", icon: Package },
  { label: "Student Records", icon: GraduationCap },
  { label: "Parent Communication", icon: MessagesSquare },
  { label: "Analytics", icon: BarChart3 },
  { label: "Security", icon: ShieldCheck },
  { label: "Staff Management", icon: Users },
  { label: "Document Management", icon: FolderArchive },
  { label: "And More...", icon: LayoutGrid },
];

/* ── 5 · Future Platform (device mockups) ───────────────────── */
export type DeviceMock = {
  title: string;
  status: "Coming Soon" | "In Development" | "Preview";
  icon: LucideIcon;
  span?: string;
};
export const DEVICES: DeviceMock[] = [
  { title: "Desktop Dashboard", status: "Preview", icon: Monitor, span: "lg:col-span-2 lg:row-span-2" },
  { title: "Administrator Portal", status: "In Development", icon: LayoutGrid },
  { title: "Warden App", status: "In Development", icon: ShieldCheck },
  { title: "Mobile App", status: "Preview", icon: Smartphone },
  { title: "Tablet", status: "Coming Soon", icon: Tablet },
  { title: "Student App", status: "Coming Soon", icon: GraduationCap },
  { title: "Parent App", status: "Coming Soon", icon: MessagesSquare },
];

/* ── 6 · Core Modules ───────────────────────────────────────── */
export const MODULES: IconItem[] = [
  { label: "Admission Management", icon: UserPlus },
  { label: "Room Management", icon: BedDouble },
  { label: "Fee Management", icon: IndianRupee },
  { label: "Student Profiles", icon: CircleUserRound },
  { label: "Biometric Integration", icon: Fingerprint },
  { label: "QR Check-in", icon: QrCode },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Leave Requests", icon: CalendarDays },
  { label: "Visitor Register", icon: ClipboardList },
  { label: "Inventory", icon: Boxes },
  { label: "Payroll", icon: Wallet },
  { label: "Complaint System", icon: MessageSquareWarning },
  { label: "Analytics", icon: BarChart3 },
  { label: "Reports", icon: FileBarChart },
  { label: "Document Management", icon: FolderArchive },
  { label: "Notifications", icon: Bell },
  { label: "WhatsApp Integration", icon: MessageCircle },
  { label: "SMS Integration", icon: MessageSquare },
  { label: "Payment Gateway", icon: CreditCard },
  { label: "Role-based Access", icon: KeyRound },
  { label: "Cloud Backup", icon: Cloud },
  { label: "Offline Support", icon: WifiOff },
];

/* ── 7 · Why Choose (comparison) ────────────────────────────── */
export const TRADITIONAL = [
  "Paper Registers",
  "Manual Work",
  "Data Errors",
  "Multiple Apps",
  "Difficult Reporting",
];
export const SAAHVIK_WAY = [
  "Smart Automation",
  "Modern Interface",
  "Secure Cloud",
  "Mobile Access",
  "Real-Time Reports",
];

/* ── 8 · Development Roadmap ────────────────────────────────── */
export type RoadmapPhase = {
  title: string;
  state: "done" | "current" | "next" | "future";
  badge?: string;
  items: string[];
};
export const ROADMAP: RoadmapPhase[] = [
  {
    title: "Foundation",
    state: "done",
    badge: "Completed",
    items: ["Brand Identity", "Research", "Architecture", "Planning"],
  },
  {
    title: "Software Development",
    state: "current",
    badge: "Current",
    items: ["Core Engine", "Module Build-out", "Design System"],
  },
  {
    title: "Private Beta",
    state: "next",
    badge: "Next",
    items: ["Pilot Hostels", "Feedback Loops", "Hardening"],
  },
  {
    title: "Launch & Scale",
    state: "future",
    badge: "Upcoming",
    items: ["Public Launch", "Enterprise Features", "Integrations"],
  },
];

/* ── 11 · Contact ───────────────────────────────────────────── */
export const CONTACT = {
  phone: "9530301131",
  whatsapp: "9530301131",
  whatsappLink: "https://wa.me/919530301131",
  email: "Coming Soon",
  website: "saahvik.com",
  location: "Jaipur, Rajasthan, India",
};

/* ============================================================
   FEATURE SUGGESTION WIZARD — option sets
   ============================================================ */
export const ROLES = ["Owner", "Warden", "Administrator", "Manager", "Staff", "Other"];

export const HOSTEL_TYPES = [
  "School Hostel",
  "College Hostel",
  "University Hostel",
  "Private Hostel",
  "PG Accommodation",
  "Other",
];

export const MGMT_METHODS = [
  "Register / Notebook",
  "Excel",
  "Tally",
  "Custom Software",
  "ERP",
  "Other Hostel Software",
  "No System",
];

export const CHALLENGES = [
  "Admissions",
  "Fee Collection",
  "Room Allocation",
  "Attendance",
  "Visitor Register",
  "Leave Management",
  "Complaints",
  "Maintenance",
  "Inventory",
  "Student Records",
  "Communication",
  "Reports",
  "Payroll",
  "Staff Management",
  "Security",
];

export const PRIORITY_MODULES = [
  "Fee Management",
  "Attendance",
  "Room Allocation",
  "Visitor Management",
  "Complaints & Maintenance",
  "Analytics & Reports",
];

export const DEMO_OPTIONS = ["Yes", "Maybe", "No"] as const;
