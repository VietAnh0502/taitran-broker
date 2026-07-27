import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, Check, ChevronDown,
  CircleCheck, Database, GraduationCap, LineChart, Menu, MessageCircle,
  Phone, PieChart, Search, ShieldCheck, Sparkles, Target, TrendingUp,
  Users, WalletCards, X,
} from 'lucide-react'
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { SiZalo } from 'react-icons/si'
import { galleries, images } from './assets/images'
import { fetchMarketData, type MarketData } from './services/market'

const CONTACT = {
  phone: '0348634111',
  phoneHref: 'tel:0348634111',
  zalo: 'https://zalo.me/0348634111',
} as const

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
  ['Về Tài Trần', 'about'], ['HTG', 'htg'], ['Dịch vụ', 'services'],
  ['Góc nhìn', 'insights'], ['Kết nối', 'contact'],
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
          <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">Founder of HTG</span>
        </span>
      </a>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
        {nav.map(([label, id]) => <a key={id} className="nav-link" href={`#${id}`}>{label}</a>)}
        <div className="flex items-center gap-1 border-l border-slate-200 pl-4" aria-label="Mạng xã hội Tài Trần">
          {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">
            <Icon size={15} />
          </a>)}
        </div>
        <a href={CONTACT.zalo} target="_blank" rel="noreferrer" className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Liên hệ</a>
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
        <a href={CONTACT.zalo} target="_blank" rel="noreferrer" aria-label="Zalo" className="grid h-10 w-10 place-items-center rounded-full bg-[#0068ff] text-white"><SiZalo size={22} /></a>
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
          <Sparkles size={14} /> Founder of HTG
        </div>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-[-.045em] text-ink sm:text-6xl lg:text-[72px]">
          Đầu tư có chiến lược. <span className="text-emerald-600">Phát triển bằng giá trị thực.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Tài Trần – Founder của HTG, đồng hành cùng nhà đầu tư xây dựng danh mục phù hợp, quản trị rủi ro và tiếp cận thị trường chứng khoán bằng dữ liệu, kỷ luật và một quy trình rõ ràng.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={CONTACT.zalo}>Liên hệ</Button>
          <Button href="#htg" outline>Khám phá HTG</Button>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-emerald-950/10 pt-7">
          {['8 năm đầu tư thực chiến', 'Đã tư vấn hàng nghìn nhà đầu tư', 'Chuyên viên phân tích tại VPS & SSI'].map(x =>
            <span key={x} className="flex items-center gap-2 text-sm font-semibold text-slate-600"><CircleCheck size={17} className="text-emerald-600" />{x}</span>)}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="flex flex-col gap-4">
        <div className="relative min-h-[460px] sm:min-h-[520px]">
          <div className="absolute inset-x-4 bottom-0 top-12 rounded-[32px] bg-forest sm:inset-x-8 sm:rounded-[40px]" />
          <div className="absolute inset-x-8 bottom-8 top-0 rounded-[32px] border border-white/50 bg-gradient-to-br from-emerald-50 to-emerald-200 sm:inset-x-16 sm:rounded-[40px]" />
          <img src={images.founderCutout.src} alt={images.founderCutout.alt} className="absolute inset-0 h-full w-full object-contain object-bottom" fetchPriority="high" />
          <div className="absolute right-2 top-12 grid h-16 w-16 place-items-center rounded-full border-[6px] border-mist bg-white shadow-soft sm:right-0 sm:top-16 sm:h-24 sm:w-24 sm:border-8">
            <TrendingUp className="text-emerald-600" size={32} />
          </div>
        </div>
        <div className="relative mx-2 rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-soft sm:mx-8 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5 lg:mx-0">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-emerald-600">Chuyên môn cốt lõi</p>
          <p className="mt-2 font-extrabold text-ink sm:mt-0 sm:text-right">Kinh tế • Định lượng • Danh mục</p>
        </div>
      </motion.div>
    </Container>
  </section>
}

function BusinessCard() {
  return <section className="-mt-1 bg-white py-16">
    <Container>
      <motion.div {...reveal} className="overflow-hidden rounded-[32px] bg-forest shadow-soft">
        <div className="grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-80 overflow-hidden bg-emerald-900">
            <img src={images.founderSuit.src} alt={images.founderSuit.alt} className="absolute inset-0 h-full w-full object-cover object-top opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest/70" />
          </div>
          <div className="p-8 text-white sm:p-12">
            <p className="eyebrow text-emerald-300">Digital business card</p>
            <h2 className="text-4xl font-extrabold tracking-tight">Nguyễn Đức Tài</h2>
            <p className="mt-2 text-emerald-200">Tài Trần • Founder & Strategic Lead, HTG</p>
            <p className="mt-6 max-w-2xl leading-7 text-emerald-50/75">Chuyên gia phân tích kinh tế và phân tích định lượng với 8 năm đầu tư chứng khoán thực chiến. Tài có kinh nghiệm trong vai trò chuyên viên phân tích tại các công ty chứng khoán VPS và SSI, đồng thời đã trực tiếp tư vấn, chia sẻ phương pháp và đồng hành cùng hàng nghìn nhà đầu tư trên thị trường Việt Nam.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['8 năm', 'Thực chiến'],
                ['Hàng nghìn', 'Nhà đầu tư'],
                ['VPS · SSI', 'Kinh nghiệm'],
                ['Founder', 'HTG'],
              ].map(([value, label]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[.06] p-3">
                <p className="text-lg font-extrabold text-white">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-emerald-200/70">{label}</p>
              </div>)}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a className="contact-line" href={CONTACT.phoneHref}><Phone size={18} /> {CONTACT.phone}</a>
              <a className="contact-line" href={CONTACT.zalo} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Liên hệ qua Zalo</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6" aria-label="Mạng xã hội của Tài Trần">
              {SOCIALS.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2.5 text-xs font-bold text-emerald-50 transition hover:-translate-y-0.5 hover:bg-white/10">
                <Icon size={15} /> {label}
              </a>)}
            </div>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-forest">Kết nối cùng Tài <ArrowRight size={17} /></a>
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
  [Database, 'Giải pháp fintech', 'Công cụ dữ liệu và quy trình số hỗ trợ theo dõi, đánh giá và kỷ luật hóa quyết định đầu tư.'],
]

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
          <p className="mt-6 leading-8 text-slate-600">Nguyễn Đức Tài là chuyên gia phân tích kinh tế, phân tích định lượng và Founder của HTG. Trong 8 năm tham gia thị trường chứng khoán, anh tích lũy trải nghiệm từ cả hai phía: nghiên cứu chuyên nghiệp tại công ty chứng khoán và trực tiếp quản trị quyết định đầu tư trong những giai đoạn thị trường khác nhau.</p>
          <p className="mt-4 leading-8 text-slate-600">Tài có kinh nghiệm trong vai trò chuyên viên phân tích tại CTCK VPS và SSI. Môi trường làm việc này giúp anh xây dựng nền tảng về đọc báo cáo doanh nghiệp, đánh giá bối cảnh vĩ mô, chuẩn hóa dữ liệu và chuyển hóa thông tin thành những luận điểm có thể kiểm chứng.</p>
          <p className="mt-4 leading-8 text-slate-600">Qua quá trình tư vấn cho hàng nghìn nhà đầu tư, Tài nhận thấy kết quả bền vững không đến từ một mã cổ phiếu “nóng” hay dự đoán ngắn hạn, mà từ một hệ thống phù hợp: hiểu mục tiêu, kiểm soát rủi ro, đọc dữ liệu đúng cách và kiên trì với nguyên tắc.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Chuyên gia phân tích kinh tế & định lượng', '8 năm đầu tư chứng khoán thực chiến', 'Chuyên viên phân tích tại VPS & SSI', 'Đã tư vấn cho hàng nghìn nhà đầu tư'].map(item =>
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
              <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-600">HTG Investment</p>
              <p className="mt-3 text-xl font-bold leading-8 text-ink">Research → Advisory → Education → Technology</p>
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
      text: 'Kinh nghiệm làm việc trong vai trò chuyên viên phân tích tại CTCK VPS và SSI giúp Tài hình thành phương pháp nghiên cứu có cấu trúc: bắt đầu từ dữ liệu, kiểm tra giả định và luôn đặt luận điểm trong bối cảnh chu kỳ thị trường.',
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
      title: 'Founder của HTG',
      text: 'HTG được xây dựng để kết nối nghiên cứu, tư vấn, giáo dục và công nghệ tài chính trong một hệ sinh thái thống nhất, hướng tới năng lực ra quyết định độc lập và có trách nhiệm.',
    },
  ]

  const recognition = [
    {
      image: images.vpsAward,
      title: 'Nhân viên xuất sắc 2024',
      caption: 'Bằng khen hiển thị danh hiệu “Nhân viên xuất sắc 2024” mang tên Nguyễn Đức Tài.',
      contain: true,
    },
    {
      image: images.vpsRecognition,
      title: 'Dấu mốc nghề nghiệp tại VPS',
      caption: 'Tư liệu bảng vinh danh mang tên Nguyễn Đức Tài trong quá trình phát triển chuyên môn.',
      contain: true,
    },
    {
      image: images.ssiRecognition,
      title: 'Dấu mốc nghề nghiệp tại SSI',
      caption: 'Tư liệu ghi nhận mang tên Nguyễn Đức Tài, được lưu giữ trong bộ hồ sơ nghề nghiệp.',
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
              <p className="text-lg font-extrabold">Nguyễn Đức Tài</p>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">Chuyên gia phân tích kinh tế • Phân tích định lượng • Founder HTG</p>
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

function PhilosophyProcess() {
  const steps = [
    ['01', 'Lắng nghe', 'Xác định mục tiêu, thời hạn, kỳ vọng và trải nghiệm đầu tư.'],
    ['02', 'Chẩn đoán', 'Đánh giá danh mục, dòng tiền, mức độ tập trung và rủi ro.'],
    ['03', 'Thiết kế', 'Xây dựng kịch bản và nguyên tắc phân bổ phù hợp.'],
    ['04', 'Đồng hành', 'Theo dõi, rà soát và điều chỉnh khi bối cảnh thay đổi.'],
  ]
  return <>
    <section className="overflow-hidden bg-forest py-24 text-white">
      <Container className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <SectionTitle eyebrow="Triết lý đầu tư" title="Không chạy theo tiếng ồn. Tập trung vào xác suất và kỷ luật." text="HTG nhìn đầu tư như một quá trình quản trị quyết định: tìm kiếm biên an toàn, phân bổ hợp lý và luôn chuẩn bị cho những kịch bản không như kỳ vọng." light />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {[
            ['01', 'Dữ liệu trước cảm xúc'], ['02', 'Rủi ro trước lợi nhuận'],
            ['03', 'Quy trình trước dự đoán'], ['04', 'Dài hạn trước biến động'],
          ].map(([n, t]) => <div key={n} className="bg-forest p-7"><span className="text-sm font-bold text-emerald-300">{n}</span><p className="mt-8 text-xl font-bold">{t}</p></div>)}
        </div>
      </Container>
    </section>
    <section className="py-24">
      <Container>
        <SectionTitle eyebrow="Quy trình chuyên nghiệp" title="Một lộ trình rõ ràng cho từng quyết định tài chính." />
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-emerald-200 md:block" />
          {steps.map(([n, title, text]) => <div key={n} className="relative">
            <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-emerald-100 text-sm font-extrabold text-emerald-700">{n}</span>
            <h3 className="mt-6 text-lg font-extrabold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
          </div>)}
        </div>
      </Container>
    </section>
  </>
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
            <SectionTitle eyebrow="Market dashboard" title="Dữ liệu thị trường thật, với nguồn và thời điểm rõ ràng." text="Dashboard lấy dữ liệu VNINDEX trực tiếp từ hệ thống Finfo của VNDIRECT. Dữ liệu được đồng bộ qua máy chủ, có cache ngắn hạn và ghi rõ phiên giao dịch gần nhất." light />
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
        <SectionTitle eyebrow="HTG ecosystem" title="Nghiên cứu, cộng đồng và công nghệ cùng vận hành." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="overflow-hidden rounded-3xl border"><img src={images.researchLogo.src} alt={images.researchLogo.alt} loading="lazy" className="h-52 w-full bg-white object-contain p-5" /><div className="p-6"><h3 className="text-xl font-extrabold text-ink">HTG Research</h3><p className="mt-2 text-sm leading-6 text-slate-500">Nghiên cứu doanh nghiệp, thị trường và các mô hình định lượng hỗ trợ quyết định.</p></div></article>
          <article className="overflow-hidden rounded-3xl border"><img src={images.eventGroup.src} alt={images.eventGroup.alt} loading="lazy" className="h-52 w-full object-cover" /><div className="p-6"><h3 className="text-xl font-extrabold text-ink">Investor Education</h3><p className="mt-2 text-sm leading-6 text-slate-500">Hội thảo và chương trình giúp nhà đầu tư xây dựng năng lực độc lập.</p></div></article>
          <article className="overflow-hidden rounded-3xl border">
            <div className="flex h-52 items-center justify-center bg-forest p-5">
              <img src={images.communityLogo.src} alt={images.communityLogo.alt} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <div className="p-6"><h3 className="text-xl font-extrabold text-ink">HTG Community</h3><p className="mt-2 text-sm leading-6 text-slate-500">Không gian chia sẻ góc nhìn, quy trình và kỷ luật đầu tư có trách nhiệm.</p></div>
          </article>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <img src={images.eventStage.src} alt={images.eventStage.alt} loading="lazy" className="aspect-[16/8] w-full rounded-3xl object-cover" />
          <img src={images.eventPeople.src} alt={images.eventPeople.alt} loading="lazy" className="aspect-[16/8] w-full rounded-3xl object-cover object-top" />
        </div>
      </Container>
    </section>
    <section className="bg-mist py-24">
      <Container>
        <SectionTitle eyebrow="Phản hồi từ nhà đầu tư" title="Điều khách hàng trân trọng trong quá trình đồng hành." text="Để tránh tạo lời chứng thực không được xác minh, phần này mô tả các giá trị khách hàng thường tìm kiếm thay vì gán phát ngôn cho cá nhân cụ thể." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Rõ ràng hơn', 'Một quy trình giúp nhìn danh mục theo mục tiêu và rủi ro, thay vì chỉ theo biến động giá.'],
            ['Chủ động hơn', 'Nắm được lý do đằng sau mỗi quyết định và có kịch bản trước khi thị trường thay đổi.'],
            ['Kỷ luật hơn', 'Có nguyên tắc rà soát, phân bổ và điều chỉnh nhất quán theo thời gian.'],
          ].map(([title, text]) => <div key={title} className="rounded-3xl border border-emerald-950/10 bg-white p-7"><MessageCircle className="text-emerald-600" /><h3 className="mt-8 text-xl font-extrabold text-ink">{title}</h3><p className="mt-3 leading-7 text-slate-500">{text}</p></div>)}
        </div>
      </Container>
    </section>
  </>
}

function VisualStory() {
  const groups = [
    {
      eyebrow: 'Community events',
      title: 'Sự kiện & cộng đồng đầu tư',
      text: 'Các hoạt động chia sẻ kiến thức, kết nối diễn giả và giao lưu cùng cộng đồng nhà đầu tư.',
      photos: galleries.events,
      columns: 'lg:columns-3',
    },
    {
      eyebrow: 'Beyond the market',
      title: 'Phía sau những giờ phân tích',
      text: 'Một vài khoảnh khắc đời thường được chọn lọc, nơi công việc, trải nghiệm và sự cân bằng gặp nhau.',
      photos: galleries.personal,
      columns: 'lg:columns-4',
    },
  ]

  return <section className="py-24">
    <Container>
      <SectionTitle eyebrow="Thư viện hình ảnh" title="Một hành trình được kể bằng những khoảnh khắc thật." text="Hình ảnh được tuyển chọn từ các sự kiện cộng đồng và những khoảnh khắc đời thường của Tài Trần; mỗi nhóm được đặt đúng bối cảnh thay vì sử dụng như hình minh họa ngẫu nhiên." />
      <div className="mt-16 space-y-20">
        {groups.map(group => <div key={group.title}>
          <div className="mb-7 grid gap-3 border-l-2 border-emerald-500 pl-5 md:grid-cols-[.55fr_1fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-600">{group.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">{group.title}</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">{group.text}</p>
          </div>
          <div className={`columns-2 gap-4 ${group.columns}`}>
            {group.photos.map((photo, index) => <motion.figure {...reveal} transition={{ duration: .4, delay: index * .04 }} key={photo.src} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-mist">
              <img src={photo.src} alt={photo.alt} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-[1.025]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-12 text-xs font-semibold leading-5 text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">{photo.caption}</figcaption>
            </motion.figure>)}
          </div>
        </div>)}
      </div>
    </Container>
  </section>
}

const faqs = [
  ['HTG phù hợp với nhà đầu tư nào?', 'HTG phù hợp với nhà đầu tư muốn xây dựng quy trình bài bản, hiểu rủi ro và ra quyết định dựa trên dữ liệu. Mức độ phù hợp cụ thể sẽ được xác định sau buổi trao đổi nhu cầu.'],
  ['Tư vấn có cam kết lợi nhuận không?', 'Không. Đầu tư chứng khoán luôn có rủi ro. HTG tập trung vào phân tích, xây dựng kịch bản và quản trị danh mục; không cam kết hoặc bảo đảm mức sinh lời.'],
  ['Tôi có thể liên hệ với Tài Trần bằng cách nào?', 'Bạn có thể gọi trực tiếp số 0348634111 hoặc nhắn Zalo qua các nút Liên hệ trên website.'],
  ['HTG có cung cấp khuyến nghị mua bán tức thời?', 'Nội dung trên website mang tính thông tin và giáo dục. Mọi trao đổi chuyên sâu cần đặt trong bối cảnh mục tiêu, khẩu vị rủi ro và điều kiện của từng nhà đầu tư.'],
]

function FAQContact() {
  const [active, setActive] = useState(0)
  return <>
    <section className="py-24">
      <Container className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <SectionTitle eyebrow="FAQ" title="Những câu hỏi thường gặp." />
        <div>
          {faqs.map(([q, a], i) => <div key={q} className="border-b border-slate-200">
            <button onClick={() => setActive(active === i ? -1 : i)} className="flex w-full items-center justify-between gap-5 py-6 text-left font-extrabold text-ink" aria-expanded={active === i}>{q}<ChevronDown className={`shrink-0 transition ${active === i ? 'rotate-180 text-emerald-600' : ''}`} /></button>
            {active === i && <p className="pb-6 pr-10 leading-7 text-slate-500">{a}</p>}
          </div>)}
        </div>
      </Container>
    </section>
    <section id="contact" className="bg-forest py-24 text-white">
      <Container>
        <div className="grid items-center gap-10 rounded-[32px] border border-white/10 bg-white/[.05] p-8 shadow-2xl sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
          <SectionTitle eyebrow="Kết nối cùng HTG" title="Bắt đầu bằng một cuộc trao đổi rõ ràng." text="Chia sẻ mục tiêu hoặc vấn đề bạn đang quan tâm. HTG sẽ phản hồi để xác định bước tiếp theo phù hợp." light />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={CONTACT.zalo} target="_blank" rel="noreferrer" className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-forest transition hover:-translate-y-0.5"><MessageCircle size={19} /> Nhắn Zalo</a>
            <a href={CONTACT.phoneHref} className="inline-flex min-w-56 items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"><Phone size={19} /> {CONTACT.phone}</a>
          </div>
        </div>
      </Container>
    </section>
  </>
}

function FloatingContacts() {
  return <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
    <a href={CONTACT.phoneHref} aria-label={`Gọi ${CONTACT.phone}`} className="float-btn bg-emerald-600"><Phone size={20} /></a>
    <a href={CONTACT.zalo} target="_blank" rel="noreferrer" aria-label="Kết nối Zalo với Tài Trần" className="float-btn bg-[#0068ff]"><SiZalo size={25} /></a>
    <a href={SOCIALS[0].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên Facebook" className="float-btn bg-[#1877f2]"><FaFacebookF size={20} /></a>
    <a href={SOCIALS[1].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên YouTube" className="float-btn bg-[#ff0000]"><FaYoutube size={22} /></a>
    <a href={SOCIALS[2].href} target="_blank" rel="noreferrer" aria-label="Theo dõi Tài Trần trên TikTok" className="float-btn bg-black"><FaTiktok size={20} /></a>
  </div>
}

function Footer() {
  return <footer className="bg-[#04150F] py-12 text-slate-400">
    <Container>
      <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row">
        <div className="flex items-center gap-4"><img src={images.logo.src} alt={images.logo.alt} className="h-16 w-28 object-contain" /><div><p className="font-extrabold text-white">TÀI TRẦN × HTG</p><p className="mt-1 text-xs">Data • Discipline • Sustainable Value</p></div></div>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-6 text-sm"><a href="#about">Về Tài Trần</a><a href="#htg">HTG</a><a href="#services">Dịch vụ</a><a href="#contact">Liên hệ</a></div>
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
    <Navigation /><main><Hero /><BusinessCard /><About /><ProfileAndRecognition /><Services /><PhilosophyProcess /><InsightsDashboard /><EcosystemTestimonials /><VisualStory /><FAQContact /></main><Footer /><FloatingContacts />
  </div>
}
