import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, Check,
  CircleCheck, Database, GraduationCap, LineChart, Menu, MessageCircle,
  Phone, PieChart, Search, ShieldCheck, Sparkles, Target, TrendingUp,
  Users, WalletCards, X,
} from 'lucide-react'
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { SiZalo } from 'react-icons/si'
import { feedbacks, galleries, images } from './assets/images'
import { fetchMarketData, type MarketData } from './services/market'

const CONTACTS = [
  {
    name: 'Hải Anh HTG',
    phone: '039.383.5398',
    phoneHref: 'tel:0393835398',
    zalo: 'https://zalo.me/0393835398',
  },
  {
    name: 'Minh Hải HTG',
    phone: '097.102.5264',
    phoneHref: 'tel:0971025264',
    zalo: 'https://zalo.me/0971025264',
  },
] as const

const SOCIALS = [
  {
    label: 'Facebook',
    handle: 'Tài Trần Team',
    href: 'https://www.facebook.com/taitranteam',
    icon: FaFacebookF,
  },
  {
    label: 'YouTube',
    handle: '@taitranteam',
    href: 'https://www.youtube.com/@taitranteam',
    icon: FaYoutube,
  },
  {
    label: 'TikTok',
    handle: '@taitranchungkhoan',
    href: 'https://www.tiktok.com/@taitranchungkhoan',
    icon: FaTiktok,
  },
] as const

const nav = [
  ['Về Tài Trần', 'about'], ['HTG', 'htg'], ['Khóa học', 'courses'], ['Báo cáo', 'bao-cao'],
  ['Kết nối', 'contact'],
]

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: .55 },
}

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="max-w-3xl">
    <p className={`eyebrow ${light ? 'text-emerald-300' : ''}`}>{eyebrow}</p>
    <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
    {text && <p className={`mt-5 text-base leading-8 ${light ? 'text-emerald-50/70' : 'text-slate-600'}`}>{text}</p>}
  </div>
}

function Button({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  const external = href.startsWith('http')
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={outline ? 'btn-secondary' : 'btn-primary'}>
    {children}<ArrowRight size={18} aria-hidden="true" />
  </a>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-950/5 bg-white/90 backdrop-blur-xl">
    <Container className="flex h-20 items-center justify-between">
      <a href="#top" className="flex items-center gap-3" aria-label="Tài Trần HTG - Trang chủ">
        <img src={images.logoSmall.src} alt={images.logoSmall.alt} className="h-11 w-16 object-contain" />
        <span className="border-l border-slate-200 pl-3">
          <span className="block text-sm font-extrabold tracking-tight text-forest">TÀI TRẦN</span>
          <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">Nhà sáng lập HTG</span>
        </span>
      </a>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
        {nav.map(([label, id]) => <a key={id} className="nav-link" href={`#${id}`}>{label}</a>)}
        <div className="flex items-center gap-1 border-l border-slate-200 pl-4" aria-label="Mạng xã hội Tài Trần">
          {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon size={15} />
          </a>)}
        </div>
        <a href="#contact" className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Liên hệ</a>
      </nav>
      <button className="rounded-xl p-2 text-forest lg:hidden" onClick={() => setOpen(!open)} aria-label="Mở menu" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </Container>
    {open && <nav className="border-t bg-white px-5 py-5 lg:hidden">
      {nav.map(([label, id]) => <a key={id} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 font-semibold text-ink" href={`#${id}`}>{label}</a>)}
      <div className="mt-5 flex items-center gap-3">
        {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-mist text-forest">
          <Icon size={18} />
        </a>)}
        <a href="#contact" aria-label="Xem thông tin liên hệ" className="grid h-10 w-10 place-items-center rounded-full bg-[#0068ff] text-white"><SiZalo size={22} /></a>
      </div>
    </nav>}
  </header>
}

function Hero() {
  return <section id="top" className="relative overflow-hidden bg-mist pb-20 pt-32 lg:min-h-[820px] lg:pb-0 lg:pt-40">
    <div className="grid-pattern absolute inset-0 opacity-40" />
    <div className="absolute -right-32 top-16 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
    <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
      <motion.div {...reveal}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-emerald-700 shadow-sm">
          <Sparkles size={14} /> Nhà sáng lập HTG
        </div>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-[-.045em] text-ink sm:text-6xl lg:text-[72px]">
          Đầu tư bằng dữ liệu. <span className="text-emerald-600">Bứt phá bằng kỷ luật.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Tài Trần – Nhà sáng lập HTG, đồng hành cùng nhà đầu tư xây dựng danh mục phù hợp, quản trị rủi ro và tiếp cận thị trường bằng dữ liệu, kỷ luật cùng quy trình rõ ràng — dựa trên hệ tư duy và phương pháp đầu tư khác biệt, được HTG xây dựng riêng cho thị trường chứng khoán Việt Nam.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="#contact">Liên hệ</Button>
          <Button href="#htg" outline>Khám phá HTG</Button>
        </div>
        
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="mx-auto w-full max-w-[540px]">
        <div className="overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-soft sm:rounded-[40px]">
          <div className="relative min-h-[460px] overflow-hidden bg-emerald-100 sm:min-h-[540px]">
            <img src={images.founderSuit.src} alt={images.founderSuit.alt} className="absolute inset-0 h-full w-full object-cover object-top" fetchPriority="high" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forest/35 to-transparent" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-forest shadow-sm backdrop-blur sm:left-7 sm:top-7">
              <Sparkles size={14} className="text-emerald-600" /> Nhà sáng lập HTG
            </div>
          </div>
          <div className="grid gap-4 border-t border-emerald-950/10 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={23} />
            </div>
            <div className="sm:text-right">
              <p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-emerald-600">Chuyên môn cốt lõi</p>
              <p className="mt-1.5 text-lg font-extrabold text-ink">Kinh tế • Định lượng • Danh mục</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
}

function BusinessCard() {
  return <section className="-mt-1 bg-white py-16">
    <Container>
      <motion.div {...reveal} className="overflow-hidden rounded-[32px] bg-forest shadow-soft">
        <div className="grid items-center lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-emerald-900 flex items-center justify-center">
            <img src={images.businessCardPortrait.src} alt={images.businessCardPortrait.alt} className="max-h-full max-w-full object-contain lg:object-cover object-center" loading="lazy" />
          </div>
          <div className="p-6 text-white sm:p-8">
            <div className="max-w-xl">
              <p className="eyebrow text-emerald-300">Danh thiếp điện tử</p>
              <h2 className="text-4xl font-extrabold tracking-tight">Tài Trần</h2>
              <p className="mt-2 text-emerald-200">Tài Trần • Nhà sáng lập kiêm Giám đốc chiến lược HTG</p>
              <p className="mt-6 leading-7 text-emerald-50/75">Chuyên gia phân tích kinh tế và phân tích định lượng với 8 năm đầu tư chứng khoán thực chiến. Tài có kinh nghiệm trong vai trò chuyên gia phân tích tại các công ty chứng khoán VPS, SSI và VND, đồng thời đã trực tiếp tư vấn, chia sẻ phương pháp và đồng hành cùng hàng nghìn nhà đầu tư trên thị trường Việt Nam.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
}

const services = [
  [PieChart, 'Tư vấn danh mục', 'Thiết kế cấu trúc danh mục phù hợp với mục tiêu, khẩu vị rủi ro và khung thời gian của từng nhà đầu tư.'],
  [BarChart3, 'Phân tích thị trường', 'Kết hợp góc nhìn vĩ mô, doanh nghiệp và dữ liệu định lượng để xây dựng kịch bản thị trường.'],
  [GraduationCap, 'Đào tạo nhà đầu tư', 'Hệ thống hóa kiến thức, quy trình ra quyết định và năng lực tự quản trị tài sản.'],
  [Database, 'Giải pháp công nghệ tài chính', 'Công cụ dữ liệu và quy trình số hỗ trợ theo dõi, đánh giá và kỷ luật hóa quyết định đầu tư.'],
]

// Thêm khóa học mới bằng cách import ảnh trong assets/images.ts rồi thêm một mục vào mảng này.
const courses = [
  {
    image: images.coaching,
    badge: 'Coaching hội viên HTG',
    title: 'Đánh sóng 2026',
    description: 'Chương trình đồng hành chuyên sâu giúp học viên nhận diện chân sóng, xác định thời điểm và xây dựng quy mô vốn phù hợp để đầu tư an toàn, hiệu quả hơn.',
    lessons: ['Nhận diện chân sóng siêu cổ', 'Quy mô vốn hiệu suất cao nhất'],
    cta: 'Đăng ký tư vấn',
    href: '#contact',
  },
] as const

const reports = [
  {
    title: 'Chiến lược đầu tư tháng 7',
    subtitle: 'Định hướng chiến lược đồng bộ và kế hoạch phân bổ vốn.',
    href: new URL('../bao_cao/chien_luoc_dau_tu_thang_7.pdf', import.meta.url).href,
    thumbnail: images.reportStrategyJulyThumbnail,
    publishedAt: new Date('2026-07-01'),
  },
  {
    title: 'Báo cáo phân tích PC1 tháng 6',
    subtitle: 'Quan điểm giá trị và rủi ro trong kỳ tái cơ cấu tháng 6.',
    href: new URL('../bao_cao/bao_cao_phan_tich_pc1_t6.pdf', import.meta.url).href,
    thumbnail: images.reportPc1T6Thumbnail,
    publishedAt: new Date('2026-06-01'),
  },
  {
    title: 'Báo cáo phân tích PC1 quý 1',
    subtitle: 'Đánh giá kết quả và dự báo động lực tăng trưởng trong quý đầu năm.',
    href: new URL('../bao_cao/bao_cao_phan_tich_pc1_quy1.pdf', import.meta.url).href,
    thumbnail: images.reportPc1Q1Thumbnail,
    publishedAt: new Date('2026-04-01'),
  },
  {
    title: 'Báo cáo phân tích GAS',
    subtitle: 'Phân tích vận hành, định giá và kịch bản đầu tư cho cổ phiếu GAS.',
    href: new URL('../bao_cao/bao_cao_phan_tich_gas.pdf', import.meta.url).href,
    thumbnail: images.reportGasThumbnail,
    publishedAt: new Date('2026-05-01'),
  },
  {
    title: 'Báo cáo phân tích FPT',
    subtitle: 'Bóc tách động lực tăng trưởng và rủi ro công nghệ của FPT.',
    href: new URL('../bao_cao/bao_cao_phan_tich_fpt.pdf', import.meta.url).href,
    thumbnail: images.reportFptThumbnail,
    publishedAt: new Date('2026-05-29'),
  },
  {
    title: 'Báo cáo phân tích DCM',
    subtitle: 'Phân tích cơ bản và triển vọng giá cho DCM.',
    href: new URL('../bao_cao/bao_cao_phan_tich_dcm.pdf', import.meta.url).href,
    thumbnail: images.reportDcmThumbnail,
    publishedAt: new Date('2026-01-01'),
  },
] as const

function About() {
  return <>
    <section id="about" className="py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div {...reveal} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[32px] bg-slate-100">
            <img src={images.founderWorking.src} alt={images.founderWorking.alt} loading="lazy" className="h-full w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-7 -right-3 max-w-[250px] rounded-2xl border bg-white p-5 shadow-soft sm:-right-8">
            <p className="text-3xl font-extrabold text-forest">8 năm</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Trải nghiệm thực chiến trên thị trường chứng khoán Việt Nam</p>
          </div>
        </motion.div>
        <motion.div {...reveal}>
          <SectionTitle eyebrow="Về Tài Trần" title="Kinh nghiệm thị trường, được hệ thống hóa bằng dữ liệu." />
          <p className="mt-6 leading-8 text-slate-600">Tài Trần là chuyên gia phân tích kinh tế, phân tích định lượng và Nhà sáng lập HTG. Trong 8 năm tham gia thị trường chứng khoán, anh tích lũy trải nghiệm từ cả hai phía: nghiên cứu chuyên nghiệp tại công ty chứng khoán và trực tiếp quản trị quyết định đầu tư trong những giai đoạn thị trường khác nhau.</p>
          <p className="mt-4 leading-8 text-slate-600">Tài có kinh nghiệm trong vai trò chuyên gia phân tích tại CTCK VPS, SSI và VND. Môi trường làm việc này giúp anh xây dựng nền tảng về đọc báo cáo doanh nghiệp, đánh giá bối cảnh vĩ mô, chuẩn hóa dữ liệu và chuyển hóa thông tin thành những luận điểm có thể kiểm chứng.</p>
          <p className="mt-4 leading-8 text-slate-600">Qua quá trình tư vấn cho hàng nghìn nhà đầu tư, Tài nhận thấy kết quả bền vững không đến từ một mã cổ phiếu “nóng” hay dự đoán ngắn hạn, mà từ một hệ thống phù hợp: hiểu mục tiêu, kiểm soát rủi ro, đọc dữ liệu đúng cách và kiên trì với nguyên tắc.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Chuyên gia phân tích kinh tế & định lượng', '8 năm đầu tư chứng khoán thực chiến', 'Chuyên gia phân tích tại VPS & SSI & VND', 'Đã tư vấn cho hàng nghìn nhà đầu tư'].map(item =>
              <div key={item} className="flex gap-3 rounded-xl bg-mist p-4 text-sm font-bold text-ink"><Check className="shrink-0 text-emerald-600" size={19} />{item}</div>)}
          </div>
        </motion.div>
      </Container>
    </section>

    <section id="htg" className="bg-mist py-24">
      <Container>
        <motion.div {...reveal} className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <SectionTitle eyebrow="Về HTG" title="Một hệ sinh thái đầu tư lấy năng lực nhà đầu tư làm trung tâm." text="HTG phát triển các dịch vụ phân tích, tư vấn, đào tạo và công nghệ nhằm giúp nhà đầu tư tiếp cận thị trường theo một quy trình rõ ràng hơn." />
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {[[ShieldCheck, 'Minh bạch'], [Target, 'Thực tiễn'], [LineChart, 'Dựa trên dữ liệu']].map(([Icon, label]) => {
                const I = Icon as typeof ShieldCheck
                return <div key={String(label)} className="rounded-2xl border border-emerald-950/10 bg-white p-5"><I className="text-emerald-600" /><p className="mt-4 font-bold text-ink">{String(label)}</p></div>
              })}
            </div>
          </div>
          <div className="rounded-[32px] border border-emerald-950/10 bg-white p-8 shadow-soft">
            <img src={images.logo.src} alt={images.logo.alt} loading="lazy" className="mx-auto h-44 w-full object-contain" />
            <div className="mt-6 border-t pt-6">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-600">Đầu tư HTG</p>
              <p className="mt-3 text-xl font-bold leading-8 text-ink">Nghiên cứu → Tư vấn → Đào tạo → Công nghệ</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  </>
}

function ProfileAndRecognition() {
  const milestones = [
    {
      icon: Search,
      title: 'Nền tảng phân tích chuyên nghiệp',
      text: 'Kinh nghiệm làm việc trong vai trò chuyên gia phân tích tại CTCK VPS, SSI và VND giúp Tài hình thành phương pháp nghiên cứu có cấu trúc: bắt đầu từ dữ liệu, kiểm tra giả định và luôn đặt luận điểm trong bối cảnh chu kỳ thị trường.',
    },
    {
      icon: LineChart,
      title: '8 năm đầu tư chứng khoán thực chiến',
      text: 'Trải nghiệm trực tiếp qua nhiều trạng thái thị trường giúp phương pháp không dừng ở lý thuyết. Mỗi quyết định đều được nhìn qua ba lớp: tiềm năng, xác suất và mức tổn thất có thể chấp nhận.',
    },
    {
      icon: Users,
      title: 'Tư vấn cho hàng nghìn nhà đầu tư',
      text: 'Quá trình làm việc với nhiều nhóm nhà đầu tư giúp Tài hiểu rằng không có một danh mục phù hợp cho tất cả. Giải pháp cần xuất phát từ mục tiêu, nguồn lực, thời gian và khả năng chịu biến động của từng người.',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Nhà sáng lập HTG',
      text: 'HTG được xây dựng để kết nối nghiên cứu, tư vấn, giáo dục và công nghệ tài chính trong một hệ sinh thái thống nhất, hướng tới năng lực ra quyết định độc lập và có trách nhiệm.',
    },
  ]

  const recognition = [
    {
      image: images.vpsAward,
      title: 'Nhân viên xuất sắc 2024',
      caption: 'Bằng khen hiển thị danh hiệu “Nhân viên xuất sắc 2024” mang tên Tài Trần.',
      contain: true,
    },
    {
      image: images.vpsRecognition,
      title: 'Dấu mốc nghề nghiệp tại VPS',
      caption: 'Tư liệu bảng vinh danh mang tên Tài Trần trong quá trình phát triển chuyên môn.',
      contain: true,
    },
    {
      image: images.ssiRecognition,
      title: 'Dấu mốc nghề nghiệp tại SSI',
      caption: 'Tư liệu ghi nhận mang tên Tài Trần, được lưu giữ trong bộ hồ sơ nghề nghiệp.',
      contain: true,
    },
    {
      image: images.awardsCollection,
      title: 'Hành trình học tập và ghi nhận',
      caption: 'Góc trưng bày sách chuyên môn, cúp và các kỷ vật gắn với quá trình làm nghề.',
      contain: false,
    },
  ]

  return <section className="py-24">
    <Container>
      <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <SectionTitle eyebrow="Hồ sơ năng lực" title="Kinh nghiệm không chỉ nằm ở số năm, mà ở chất lượng của mỗi quyết định." text="Hồ sơ của Tài Trần được xây dựng trên sự giao thoa giữa phân tích kinh tế, dữ liệu định lượng, kinh nghiệm tổ chức và va chạm thực tế với nhu cầu của nhà đầu tư." />
          <div className="mt-9 overflow-hidden rounded-3xl bg-forest">
            <img src={images.founderAward.src} alt={images.founderAward.alt} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
            <div className="p-6 text-white">
              <p className="text-lg font-extrabold">Tài Trần</p>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">Chuyên gia phân tích kinh tế • Phân tích định lượng • Nhà sáng lập HTG</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {milestones.map(({ icon: Icon, title, text }, index) => <motion.article {...reveal} key={title} className="grid gap-5 py-7 sm:grid-cols-[52px_1fr]">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon size={22} /></div>
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-extrabold text-ink">{title}</h3>
                <span className="text-xs font-extrabold text-emerald-600">0{index + 1}</span>
              </div>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          </motion.article>)}
        </div>
      </div>

      <div className="mt-24">
        <SectionTitle eyebrow="Danh hiệu & ghi nhận" title="Những dấu mốc được lưu lại bằng tư liệu thật." text="Các hình ảnh dưới đây được chọn trực tiếp từ kho ảnh gốc. Phần mô tả chỉ phản ánh nội dung có thể quan sát trên tư liệu, không diễn giải thành giấy phép hành nghề, xếp hạng đầu tư hay cam kết về năng lực sinh lời." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recognition.map(({ image, title, caption, contain }, index) => <motion.article {...reveal} transition={{ duration: .45, delay: index * .06 }} key={title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-soft">
            <div className="flex aspect-[4/3] items-center justify-center bg-mist p-3">
              <img src={image.src} alt={image.alt} loading="lazy" className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'}`} />
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-emerald-600"><ShieldCheck size={15} /> Tư liệu nghề nghiệp</div>
              <h3 className="text-lg font-extrabold leading-7 text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{caption}</p>
            </div>
          </motion.article>)}
        </div>
      </div>
    </Container>
  </section>
}

function Services() {
  return <section id="services" className="py-24">
    <Container>
      <SectionTitle eyebrow="Chuyên môn & dịch vụ" title="Từ hiểu thị trường đến làm chủ quyết định." text="Mỗi giải pháp được thiết kế quanh bối cảnh thực tế, mục tiêu tài chính và năng lực chịu rủi ro của nhà đầu tư." />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {services.map(([Icon, title, text], i) => {
          const I = Icon as typeof PieChart
          return <motion.article {...reveal} transition={{ duration: .45, delay: i * .07 }} key={String(title)} className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><I /></div>
            <h3 className="mt-6 text-xl font-extrabold text-ink">{String(title)}</h3>
            <p className="mt-3 leading-7 text-slate-600">{String(text)}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">Tìm hiểu giải pháp <ArrowRight size={16} /></span>
          </motion.article>
        })}
      </div>
    </Container>
  </section>
}

function Courses() {
  return <section id="courses" className="overflow-hidden bg-mist py-24">
    <Container>
      <SectionTitle eyebrow="Chương trình đào tạo" title="Khóa học giúp nhà đầu tư nâng cấp năng lực thực chiến." text="Nội dung được xây dựng theo hướng cô đọng, thực tiễn và có quy trình để học viên có thể áp dụng vào quyết định đầu tư của mình." />
      <div className="mt-12 grid gap-7 lg:grid-cols-2">
        {courses.map((course, index) => <motion.article {...reveal} transition={{ duration: .5, delay: index * .08 }} key={course.title} className="group overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-soft">
          <div className="relative aspect-video overflow-hidden bg-forest">
            <img src={course.image.src} alt={course.image.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-forest/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-emerald-200 backdrop-blur">{course.badge}</span>
          </div>
          <div className="p-7 sm:p-8">
            <h3 className="text-3xl font-extrabold tracking-tight text-ink">{course.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{course.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {course.lessons.map(lesson => <div key={lesson} className="flex items-start gap-3 rounded-xl bg-mist p-4 text-sm font-bold text-ink"><BookOpen className="mt-0.5 shrink-0 text-emerald-600" size={18} />{lesson}</div>)}
            </div>
            <a href={course.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700">{course.cta}<ArrowRight size={17} /></a>
          </div>
        </motion.article>)}
      </div>
    </Container>
  </section>
}

function Reports() {
  const sortedReports = [...reports].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())

  return <section id="bao-cao" className="overflow-hidden py-24">
    <Container>
      <SectionTitle eyebrow="Báo cáo phân tích" title="Báo cáo phân tích cổ phiếu và chiến lược mới nhất." text="Các báo cáo sắp xếp theo thứ tự thời gian, mỗi nội dung hiển thị thumbnail trang đầu để bạn xem trước nhanh hơn." />
      <div className="mt-12 grid gap-7 lg:grid-cols-3">
        {sortedReports.map((report, index) => <motion.article {...reveal} transition={{ duration: .5, delay: index * .06 }} key={report.title} className="group overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-soft">
          <div className="overflow-hidden bg-slate-100">
            <img src={report.thumbnail.src} alt={report.thumbnail.alt} loading="lazy" className="h-[260px] w-full object-contain transition duration-500" />
          </div>
          <div className="p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">{new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(report.publishedAt)}</p>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{report.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{report.subtitle}</p>
            <a href={report.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700">Xem báo cáo<ArrowRight size={17} /></a>
          </div>
        </motion.article>)}
      </div>
    </Container>
  </section>
}

function PhilosophyProcess() {
  return <>
    <section className="overflow-hidden bg-forest py-24 text-white">
      <Container>
        <SectionTitle eyebrow="Triết lý đầu tư" title="Nền tảng kinh điển, được nội địa hóa cho thị trường Việt Nam." light />
        <div className="mt-12 grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[.05] shadow-2xl lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-emerald-950 lg:min-h-full">
            <img src={images.warrenBuffett.src} alt={images.warrenBuffett.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest/50" />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-forest/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-emerald-200 backdrop-blur">Warren Buffett</div>
          </div>
          <div className="p-8 sm:p-12">
            <div className="space-y-5 text-base leading-8 text-emerald-50/80">
              <p>Khóa học này dựa trên nền tảng lý luận cực kỳ vững chắc. Hệ thống mang 70%–80% hồn cốt từ triết lý đầu tư kinh điển của Warren Buffett.</p>
              <p className="border-l-2 border-emerald-400 pl-5 text-xl font-extrabold leading-8 text-white">Đó là tư duy sở hữu doanh nghiệp, lợi thế cạnh tranh và biên độ an toàn bất biến.</p>
              <p>Tuy nhiên, thị trường Mỹ rất khác Việt Nam về quy mô, cấu trúc và tâm lý đám đông. Một lý thuyết hoàn hảo ở Phố Wall nếu áp dụng nguyên bản về nước ta sẽ rất dễ vấp ngã.</p>
              <p>Vì vậy, bằng kinh nghiệm thực chiến, chúng tôi đã tinh chỉnh và nội địa hóa hệ thống này. Chúng tôi giữ nguyên tư duy cốt lõi của Buffett để đánh giá giá trị gốc của doanh nghiệp, nhưng linh hoạt cách đi tiền, chọn thời điểm theo chu kỳ và dòng tiền Việt Nam.</p>
              <p>Đây không phải lý thuyết giáo điều, mà là bản đồ thực chiến dành riêng cho bạn. Chúc các nhà đầu tư làm chủ phương pháp và bứt phá tài sản bền vững cùng chúng tôi.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>
}

function Insights() {
  return <section id="insights" className="py-24">
    <Container>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle eyebrow="Góc nhìn thị trường" title="Góc nhìn để đọc thị trường sâu hơn." />
        <a href="#contact" className="inline-flex items-center gap-2 font-bold text-emerald-700">Nhận bản tin phân tích <ArrowRight size={17} /></a>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          ['Vĩ mô', 'Đọc chu kỳ: Khi thanh khoản quan trọng hơn những tiêu đề nóng', 'Khung phân tích'],
          ['Chiến lược', 'Ba câu hỏi cần trả lời trước khi tăng tỷ trọng cổ phiếu', 'Quản trị danh mục'],
          ['Định lượng', 'Dùng dữ liệu để phân biệt xu hướng và nhiễu ngắn hạn', 'Phân tích định lượng'],
        ].map(([tag, title, meta], i) => <article key={title} className="group rounded-3xl border border-slate-200 p-7 transition hover:shadow-soft">
          <div className="mb-10 flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{tag}</span><span className="text-xs text-slate-400">0{i + 1}</span></div>
          <h3 className="text-xl font-extrabold leading-8 text-ink">{title}</h3>
          <p className="mt-5 text-sm text-slate-400">{meta} • 6 phút đọc</p>
        </article>)}
      </div>
    </Container>
  </section>
}

function InsightsDashboard() {
  const [market, setMarket] = useState<MarketData | null>(null)
  const [marketError, setMarketError] = useState('')
  const [marketLoading, setMarketLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setMarketLoading(true)
    setMarketError('')
    fetchMarketData('VNINDEX', controller.signal)
      .then(setMarket)
      .catch(error => {
        if (error instanceof Error && error.name !== 'AbortError') setMarketError(error.message)
      })
      .finally(() => setMarketLoading(false))
    return () => controller.abort()
  }, [reloadKey])

  const chart = useMemo(() => {
    if (!market?.candles.length) return []
    const closes = market.candles.map(item => item.close)
    const min = Math.min(...closes)
    const max = Math.max(...closes)
    const range = max - min || 1
    return market.candles.map(item => ({
      ...item,
      height: 18 + ((item.close - min) / range) * 82,
    }))
  }, [market])

  const formatNumber = (value: number, maximumFractionDigits = 2) =>
    new Intl.NumberFormat('vi-VN', { maximumFractionDigits }).format(value)

  return <>
    <section id="insights" className="py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Market insights" title="Góc nhìn để đọc thị trường sâu hơn." />
          <a href="#contact" className="inline-flex items-center gap-2 font-bold text-emerald-700">Nhận bản tin phân tích <ArrowRight size={17} /></a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            ['Vĩ mô', 'Đọc chu kỳ: Khi thanh khoản quan trọng hơn những tiêu đề nóng', 'Khung phân tích'],
            ['Chiến lược', 'Ba câu hỏi cần trả lời trước khi tăng tỷ trọng cổ phiếu', 'Quản trị danh mục'],
            ['Định lượng', 'Dùng dữ liệu để phân biệt xu hướng và nhiễu ngắn hạn', 'Dữ liệu thị trường'],
          ].map(([tag, title, meta], i) => <article key={title} className="group rounded-3xl border border-slate-200 p-7 transition hover:shadow-soft">
            <div className="mb-10 flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{tag}</span><span className="text-xs text-slate-400">0{i + 1}</span></div>
            <h3 className="text-xl font-extrabold leading-8 text-ink">{title}</h3>
            <p className="mt-5 text-sm text-slate-400">{meta} • 6 phút đọc</p>
          </article>)}
        </div>
      </Container>
    </section>
    <section className="bg-[#071E17] py-24 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionTitle eyebrow="Bảng dữ liệu thị trường" title="Dữ liệu thị trường thật, với nguồn và thời điểm rõ ràng." text="Bảng dữ liệu lấy chỉ số VNINDEX trực tiếp từ hệ thống Finfo của VNDIRECT. Dữ liệu được đồng bộ qua máy chủ, có bộ nhớ đệm ngắn hạn và ghi rõ phiên giao dịch gần nhất." light />
            <div className="mt-8 flex items-center gap-2 text-xs text-emerald-300"><span className={`h-2 w-2 rounded-full ${market ? 'bg-emerald-400' : 'bg-amber-400'}`} /> {market ? `${market.source} • ĐÃ ĐỒNG BỘ` : marketLoading ? 'ĐANG ĐỒNG BỘ DỮ LIỆU' : 'NGUỒN DỮ LIỆU CHƯA SẴN SÀNG'}</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[.06] p-6 shadow-2xl">
            {marketLoading ? <div className="grid min-h-[380px] place-items-center">
              <div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" /><p className="mt-4 text-sm text-slate-400">Đang tải dữ liệu từ VNDIRECT Finfo…</p></div>
            </div> : marketError || !market ? <div className="grid min-h-[380px] place-items-center text-center">
              <div className="max-w-md">
                <Database className="mx-auto text-amber-400" size={40} />
                <h3 className="mt-5 text-xl font-extrabold">Chưa thể hiển thị dữ liệu thị trường</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{marketError || 'Không nhận được dữ liệu từ nguồn.'}</p>
                <button onClick={() => setReloadKey(key => key + 1)} className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-forest">Thử đồng bộ lại</button>
              </div>
            </div> : <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">{market.symbol} • phiên {new Date(`${market.latest.tradingDate}T00:00:00`).toLocaleDateString('vi-VN')}</p>
                  <p className="mt-1 text-3xl font-extrabold">{formatNumber(market.latest.close)}
                    <span className={`ml-2 text-sm ${market.latest.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {market.latest.change >= 0 ? '+' : ''}{formatNumber(market.latest.change)} ({market.latest.changePercent >= 0 ? '+' : ''}{formatNumber(market.latest.changePercent)}%)
                    </span>
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">30 phiên gần nhất</div>
              </div>
              <div className="mt-8 flex h-52 items-end gap-1" aria-label="Biểu đồ đóng cửa VNINDEX trong 30 phiên gần nhất">
                {chart.map(item => <div key={item.tradingDate} title={`${item.tradingDate}: ${formatNumber(item.close)}`} className="flex-1 rounded-t bg-gradient-to-t from-emerald-800 to-emerald-400 transition hover:to-lime" style={{ height: `${item.height}%` }} />)}
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['Mở cửa', formatNumber(market.latest.open)],
                  ['Cao nhất', formatNumber(market.latest.high)],
                  ['Thấp nhất', formatNumber(market.latest.low)],
                  ['Độ rộng', `${market.latest.advances} tăng / ${market.latest.declines} giảm`],
                ].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-sm font-bold">{value}</p></div>)}
              </div>
              <p className="mt-5 text-[11px] leading-5 text-slate-500">Nguồn: {market.source}. Đồng bộ lúc {new Date(market.fetchedAt).toLocaleString('vi-VN')}. Dữ liệu thị trường không cấu thành khuyến nghị đầu tư.</p>
            </>}
          </div>
        </div>
      </Container>
    </section>
  </>
}

function EcosystemTestimonials() {
  return <>
    <section className="py-24">
      <Container>
        <SectionTitle eyebrow="Hệ sinh thái HTG" title="Nghiên cứu, cộng đồng và công nghệ cùng vận hành." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="overflow-hidden rounded-3xl border"><img src={images.researchLogo.src} alt={images.researchLogo.alt} loading="lazy" className="h-52 w-full bg-white object-contain p-5" /><div className="p-6"><h3 className="text-xl font-extrabold text-ink">Nghiên cứu HTG</h3><p className="mt-2 text-sm leading-6 text-slate-500">Nghiên cứu doanh nghiệp, thị trường và các mô hình định lượng hỗ trợ quyết định.</p></div></article>
          <article className="overflow-hidden rounded-3xl border"><img src={images.eventPeople.src} alt={images.eventPeople.alt} loading="lazy" className="h-52 w-full object-cover object-top" /><div className="p-6"><h3 className="text-xl font-extrabold text-ink">Đào tạo nhà đầu tư</h3><p className="mt-2 text-sm leading-6 text-slate-500">Hội thảo và chương trình giúp nhà đầu tư xây dựng năng lực độc lập.</p></div></article>
          <article className="overflow-hidden rounded-3xl border">
            <div className="flex h-52 items-center justify-center bg-forest p-5">
              <img src={images.communityLogo.src} alt={images.communityLogo.alt} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <div className="p-6"><h3 className="text-xl font-extrabold text-ink">Cộng đồng HTG</h3><p className="mt-2 text-sm leading-6 text-slate-500">Không gian chia sẻ góc nhìn, quy trình và kỷ luật đầu tư có trách nhiệm.</p></div>
          </article>
        </div>
      </Container>
    </section>
    <section className="bg-mist py-24">
      <Container>
        <SectionTitle eyebrow="Phản hồi từ nhà đầu tư" title="Những chia sẻ thực tế trong quá trình đồng hành." />
        <div className="mt-12 columns-1 gap-5 md:columns-2">
          {feedbacks.map(feedback => <motion.figure {...reveal} key={feedback.src} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-2 shadow-sm">
            <img src={feedback.src} alt={feedback.alt} loading="lazy" className="h-auto w-full rounded-xl" />
          </motion.figure>)}
        </div>
      </Container>
    </section>
  </>
}

function VisualStory() {
  const groups = [
    {
      eyebrow: 'Sự kiện cộng đồng',
      title: 'Sự kiện & cộng đồng đầu tư',
      text: 'Các hoạt động chia sẻ kiến thức, kết nối diễn giả và giao lưu cùng cộng đồng nhà đầu tư.',
      photos: galleries.events,
    },
    {
      eyebrow: 'Ngoài thị trường',
      title: 'Phía sau những giờ phân tích',
      text: 'Một vài khoảnh khắc đời thường được chọn lọc, nơi công việc, trải nghiệm và sự cân bằng gặp nhau.',
      photos: galleries.personal,
    },
  ]

  return <section className="py-24">
    <Container>
      <SectionTitle eyebrow="Thư viện hình ảnh" title="Một hành trình được kể bằng những khoảnh khắc thật." text="Hình ảnh được tuyển chọn từ các sự kiện cộng đồng và những khoảnh khắc đời thường của Tài Trần; mỗi nhóm được đặt đúng bối cảnh thay vì sử dụng như hình minh họa ngẫu nhiên." />
      <div className="mt-16 space-y-20">
        {groups.map(group => <div key={group.title}>
          <div className="mb-7 grid gap-3 border-l-2 border-emerald-500 pl-5 md:grid-cols-[.55fr_1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-600">{group.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">{group.title}</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">{group.text}</p>
            <span className="hidden rounded-full border border-emerald-900/10 bg-mist px-3 py-1.5 text-xs font-bold text-forest md:inline-flex">{group.photos.length} khoảnh khắc</span>
          </div>
          <BalancedMasonry photos={group.photos} />
        </div>)}
      </div>
    </Container>
  </section>
}

type GalleryPhoto = (typeof galleries.events)[number] | (typeof galleries.personal)[number]

function balancePhotos(photos: readonly GalleryPhoto[], columnCount: number) {
  const columns: GalleryPhoto[][] = Array.from({ length: columnCount }, () => [])
  const heights = Array.from({ length: columnCount }, () => 0)

  // Xếp ảnh cao trước rồi luôn thêm ảnh tiếp theo vào cột ngắn nhất.
  // Cách này giữ chất masonry tự nhiên nhưng cân được chân của các cột.
  ;[...photos].sort((a, b) => b.ratio - a.ratio).forEach(photo => {
    const shortest = heights.indexOf(Math.min(...heights))
    columns[shortest].push(photo)
    heights[shortest] += photo.ratio
  })

  return columns
}

function BalancedMasonry({ photos }: { photos: readonly GalleryPhoto[] }) {
  const [columnCount, setColumnCount] = useState(() => window.matchMedia('(min-width: 1024px)').matches ? 3 : 2)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const updateColumns = () => setColumnCount(media.matches ? 3 : 2)
    media.addEventListener('change', updateColumns)
    return () => media.removeEventListener('change', updateColumns)
  }, [])

  const columns = useMemo(() => balancePhotos(photos, columnCount), [photos, columnCount])

  return <div className="grid grid-cols-2 items-start gap-4 lg:grid-cols-3">
    {columns.map((column, columnIndex) => <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
      {column.map((photo, index) => <motion.figure {...reveal} transition={{ duration: .4, delay: (columnIndex + index) * .04 }} key={photo.src} className="group relative overflow-hidden rounded-2xl border border-emerald-950/10 bg-mist shadow-sm">
        <img src={photo.src} alt={photo.alt} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-[1.025]" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-4 pb-4 pt-16 text-xs font-semibold leading-5 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">{photo.caption}</figcaption>
      </motion.figure>)}
    </div>)}
  </div>
}

function FAQContact() {
  return <>
    <section id="contact" className="bg-forest py-24 text-white">
      <Container>
        <div className="grid items-center gap-10 rounded-[32px] border border-white/10 bg-white/[.05] p-8 shadow-2xl sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
          <SectionTitle eyebrow="Kết nối cùng HTG" title="Bắt đầu bằng một cuộc trao đổi rõ ràng." text="Chia sẻ mục tiêu hoặc vấn đề bạn đang quan tâm. HTG sẽ phản hồi để xác định bước tiếp theo phù hợp." light />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACTS.map(contact => <div key={contact.phone} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <p className="mb-3 text-center text-sm font-extrabold text-emerald-200">{contact.name}</p>
              <div className="flex flex-col gap-3">
                <a href={contact.zalo} target="_blank" rel="noreferrer" className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-forest transition hover:-translate-y-0.5"><MessageCircle size={19} /> Nhắn Zalo</a>
                <a href={contact.phoneHref} className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"><Phone size={19} /> {contact.phone}</a>
              </div>
            </div>)}
          </div>
        </div>
      </Container>
    </section>
  </>
}

function FloatingContacts() {
  return <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
    <a href={SOCIALS[0].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên Facebook" className="float-btn bg-[#1877f2]"><FaFacebookF size={20} /></a>
    <a href={SOCIALS[1].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên YouTube" className="float-btn bg-[#ff0000]"><FaYoutube size={22} /></a>
    <a href={SOCIALS[2].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên TikTok" className="float-btn bg-black"><FaTiktok size={20} /></a>
  </div>
}

function Footer() {
  return <footer className="bg-[#04150F] py-12 text-slate-400">
    <Container>
      <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row">
        <div className="flex items-center gap-4"><img src={images.logo.src} alt={images.logo.alt} className="h-16 w-28 object-contain" /><div><p className="font-extrabold text-white">TÀI TRẦN × HTG</p><p className="mt-1 text-xs">Dữ liệu • Kỷ luật • Giá trị bền vững</p></div></div>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-6 text-sm"><a href="#about">Về Tài Trần</a><a href="#htg">HTG</a><a href="#courses">Khóa học</a><a href="#contact">Liên hệ</a></div>
          <div className="flex flex-wrap gap-3" aria-label="Theo dõi Tài Trần">
            {SOCIALS.map(({ label, handle, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" title={`${label}: ${handle}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-300">
              <Icon size={17} /><span className="sr-only">{label}: {handle}</span>
            </a>)}
          </div>
        </div>
      </div>
      <div className="pt-8 text-xs leading-6">
        <p><strong className="text-slate-300">Cảnh báo rủi ro:</strong> Đầu tư chứng khoán có thể dẫn đến thua lỗ một phần hoặc toàn bộ vốn. Nội dung trên website chỉ nhằm mục đích cung cấp thông tin và giáo dục, không cấu thành lời chào mời, cam kết lợi nhuận hoặc khuyến nghị đầu tư cá nhân. Nhà đầu tư cần tự đánh giá và chịu trách nhiệm với quyết định của mình.</p>
        <p className="mt-6">© {new Date().getFullYear()} Tài Trần & HTG. Bảo lưu mọi quyền.</p>
      </div>
    </Container>
  </footer>
}

export default function App() {
  return <div className="min-h-screen bg-white text-ink">
    <Navigation />
    <main className="pt-20">
      <Hero />
      <BusinessCard />
      <About />
      <Courses />
      <Reports />
      <PhilosophyProcess />
      <EcosystemTestimonials />
      <VisualStory />
      <FAQContact />
    </main>
    <Footer />
    <FloatingContacts />
  </div>
}
