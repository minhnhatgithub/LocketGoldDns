export interface NavItem {
  id: string;
  title: string;
  badge?: string;
  badgeType?: 'default' | 'gold' | 'new';
  hasDot?: boolean;
  action?: 'scroll' | 'modal';
  target?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon?: string;
}

export interface ResellerPlan {
  id: string;
  name: string;
  duration: string;
  originalPrice: string;
  price: string;
  resellerPrice: string;
  popular?: boolean;
  features: string[];
}

export interface LocketFrame {
  id: string;
  name: string;
  tag: string;
  color: string;
  borderColor: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'reseller',
    title: 'Mua Gold · Reseller',
    badge: 'Từ 5k',
    badgeType: 'gold',
    action: 'modal',
    target: 'reseller',
  },
  {
    id: 'step-1',
    title: '1. Nhận Gold',
    badge: '5d',
    badgeType: 'gold',
    action: 'scroll',
    target: 'section-step-1',
  },
  {
    id: 'step-2',
    title: '2. Cài DNS',
    action: 'scroll',
    target: 'section-step-2',
  },
  {
    id: 'step-3',
    title: '3. Kiểm tra kích hoạt',
    action: 'scroll',
    target: 'section-step-3',
  },
  {
    id: 'frames',
    title: 'Khung Locket',
    badge: 'Mới',
    badgeType: 'new',
    action: 'scroll',
    target: 'section-frames',
  },
  {
    id: 'checkin',
    title: 'Điểm danh mỗi ngày',
    hasDot: true,
    action: 'scroll',
    target: 'section-checkin',
  },
];

export interface InstallStepGuide {
  step: number;
  title: string;
  desc: string;
  highlightText: string;
  image: string;
}

const base = import.meta.env.BASE_URL || '/';
const cleanBase = base.endsWith('/') ? base : `${base}/`;

export const INSTALL_STEPS_GUIDE: InstallStepGuide[] = [
  {
    step: 1,
    title: 'Cho phép tải hồ sơ cấu hình',
    desc: 'Khi Safari hiện thông báo yêu cầu tải hồ sơ, nhấn chọn nút "Cho phép".',
    highlightText: 'Nút "Cho phép" ở góc phải hộp thoại',
    image: `${cleanBase}assets/steps/step1.jpg`,
  },
  {
    step: 2,
    title: 'Vào Quản lý VPN & thiết bị',
    desc: 'Mở ứng dụng Cài đặt trên iPhone → vào Cài đặt chung → chọn "Quản lý VPN & thiết bị".',
    highlightText: 'Dòng "Quản lý VPN & thiết bị"',
    image: `${cleanBase}assets/steps/step2.jpg`,
  },
  {
    step: 3,
    title: 'Chọn hồ sơ MinhNhat Locket Gold',
    desc: 'Tại mục "Hồ sơ đã tải về", nhấn vào hồ sơ "MinhNhat Locket Gold".',
    highlightText: 'Dòng hồ sơ "MinhNhat Locket Gold"',
    image: `${cleanBase}assets/steps/step3.jpg`,
  },
  {
    step: 4,
    title: 'Nhấn Cài đặt hồ sơ',
    desc: 'Tại màn hình Cài đặt hồ sơ, nhấn nút "Cài đặt" màu xanh ở góc trên cùng bên phải.',
    highlightText: 'Nút "Cài đặt" góc trên phải (nhập mã máy nếu có)',
    image: `${cleanBase}assets/steps/step4.jpg`,
  },
  {
    step: 5,
    title: 'Xác nhận Cài đặt cảnh báo',
    desc: 'Khi hiện thông báo cảnh báo chứng nhận gốc, tiếp tục nhấn nút "Cài đặt" ở góc trên cùng bên phải.',
    highlightText: 'Nút "Cài đặt" góc trên phải xác nhận',
    image: `${cleanBase}assets/steps/step5.jpg`,
  },
  {
    step: 6,
    title: 'Vào Giới thiệu thiết bị',
    desc: 'Quay lại màn hình Cài đặt chung → nhấn chọn dòng "Giới thiệu" ở đầu danh sách.',
    highlightText: 'Dòng "Giới thiệu"',
    image: `${cleanBase}assets/steps/step6.jpg`,
  },
  {
    step: 7,
    title: 'Chọn Cài đặt tin cậy chứng nhận',
    desc: 'Cuộn xuống dưới cùng của trang Giới thiệu → nhấn chọn "Cài đặt tin cậy chứng nhận".',
    highlightText: 'Dòng "Cài đặt tin cậy chứng nhận" ở dưới cùng',
    image: `${cleanBase}assets/steps/step7.jpg`,
  },
  {
    step: 8,
    title: 'Bật công tắc MinhNhat Root CA',
    desc: 'Tại mục "Bật tin cậy đầy đủ cho chứng nhận gốc", gạt công tắc "MinhNhat Root CA" sang màu xanh.',
    highlightText: 'Công tắc bật "MinhNhat Root CA"',
    image: `${cleanBase}assets/steps/step8.jpg`,
  },
];

export const STEP_ITEMS = [
  {
    number: 1,
    title: 'Nhận Gold',
    subtitle: 'Nhập username',
    targetId: 'section-step-1',
  },
  {
    number: 2,
    title: 'Cài DNS',
    subtitle: 'Làm theo hướng dẫn',
    targetId: 'section-step-2',
  },
  {
    number: 3,
    title: 'Mở Locket',
    subtitle: 'Kiểm tra kích hoạt',
    targetId: 'section-step-3',
  },
];

export const RESELLER_PLANS: ResellerPlan[] = [
  {
    id: '1m',
    name: 'Gói 1 Tháng',
    duration: '30 ngày',
    originalPrice: '35.000đ',
    price: '15.000đ',
    resellerPrice: 'Từ 5.000đ/code',
    features: ['Không giới hạn video 30s', 'Huy hiệu Gold Profile', 'Đổi icon ứng dụng VIP', 'Hỗ trợ iOS 15 - 18+'],
  },
  {
    id: '3m',
    name: 'Gói 3 Tháng',
    duration: '90 ngày',
    originalPrice: '89.000đ',
    price: '35.000đ',
    resellerPrice: 'Từ 12.000đ/code',
    popular: true,
    features: ['Toàn bộ tính năng Gold', 'Tặng 1 khung Avatar giới hạn', 'Ưu tiên kết nối máy chủ VIP', 'Bảo hành trọn thời gian'],
  },
  {
    id: '6m',
    name: 'Gói 6 Tháng',
    duration: '180 ngày',
    originalPrice: '169.000đ',
    price: '65.000đ',
    resellerPrice: 'Từ 20.000đ/code',
    features: ['Tiết kiệm hơn 60%', 'Kho 50+ khung độc quyền', 'Hỗ trợ 1-1 cài đặt nhanh', 'Không mất streak khi đổi máy'],
  },
  {
    id: '12m',
    name: 'Gói 1 Năm',
    duration: '365 ngày',
    originalPrice: '299.000đ',
    price: '110.000đ',
    resellerPrice: 'Từ 35.000đ/code',
    features: ['Giá tốt nhất cả năm', 'Full đặc quyền Locket Gold VIP', 'Tự động gia hạn không gián đoạn', 'Quà tặng huy hiệu đặc biệt'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-pc',
    question: 'Đang mở trang trên máy tính hoặc trình duyệt khác?',
    answer: 'Nếu bạn đang duyệt trên PC hoặc Chrome/Cốc Cốc, hãy quét mã QR hiển thị để mở trực tiếp bằng Safari trên iPhone, vì iOS chỉ cho phép tải cấu hình DNS qua trình duyệt Safari.',
  },
  {
    id: 'faq-nogold',
    question: 'Cài rồi nhưng chưa có Gold?',
    answer: 'Sau khi tải hồ sơ: 1. Vào Cài đặt iPhone -> ấn "Đã tải về hồ sơ" ở đầu trang -> Bấm "Cài đặt" góc trên. 2. Đóng hẳn ứng dụng Locket (vuốt tắt từ đa nhiệm) rồi mở lại. 3. Nếu vẫn chưa thấy, bật chế độ máy bay 5 giây rồi tắt đi.',
  },
  {
    id: 'faq-video',
    question: 'Cần xem từng thao tác? Mở video hướng dẫn cài đặt trên iPhone',
    answer: 'Video ngắn 45 giây hướng dẫn chi tiết từ lúc ấn nút Tải hồ sơ đến khi kích hoạt thành công trên iPhone 11/12/13/14/15/16.',
    icon: 'youtube',
  },
];

export const STREAK_DAYS = [
  { day: 1, label: 'N1', reward: '+1', icon: 'gift', reached: true },
  { day: 2, label: 'N2', reward: '+1', icon: 'gift', reached: true },
  { day: 3, label: 'N3', reward: '+2', icon: 'star', reached: false },
  { day: 4, label: 'N4', reward: '+2', icon: 'star', reached: false },
  { day: 5, label: 'N5', reward: '+2', icon: 'star', reached: false },
  { day: 6, label: 'N6', reward: '+2', icon: 'star', reached: false },
  { day: 7, label: 'N7', reward: '+3', icon: 'crown', special: true, reached: false },
];

export const LOCKET_FRAMES: LocketFrame[] = [
  { id: 'frame-gold', name: 'Gold Luxury', tag: 'VIP', color: 'from-amber-400 to-yellow-600', borderColor: '#f59e0b', icon: '👑' },
  { id: 'frame-sunset', name: 'Sunset Heart', tag: 'Hot', color: 'from-rose-400 to-amber-400', borderColor: '#fb7185', icon: '💖' },
  { id: 'frame-neon', name: 'Cyber Neon', tag: 'Mới', color: 'from-cyan-400 to-blue-600', borderColor: '#38bdf8', icon: '⚡' },
  { id: 'frame-lavender', name: 'Pastel Dream', tag: 'Cute', color: 'from-purple-400 to-pink-400', borderColor: '#c084fc', icon: '✨' },
  { id: 'frame-minimal', name: 'Minimal Glow', tag: 'Hot', color: 'from-emerald-400 to-teal-500', borderColor: '#34d399', icon: '🌿' },
];
