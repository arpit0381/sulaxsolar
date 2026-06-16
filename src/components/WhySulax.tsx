import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Leaf, Landmark, ShieldCheck, Wrench, TrendingDown, Users,
  ArrowRight, CheckCircle
} from 'lucide-react';

const benefits = [
  {
    Icon: Leaf,
    accent: '#008080',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-100',
    iconRing: 'bg-teal-100 text-teal-700',
    title: 'Eco-Friendly Energy',
    description:
      'Reduce your carbon footprint with clean, renewable solar energy. Every unit generated keeps 0.82 kg of CO₂ out of our atmosphere.',
  },
  {
    Icon: Landmark,
    accent: '#0369a1',
    lightBg: 'bg-sky-50',
    borderColor: 'border-sky-100',
    iconRing: 'bg-sky-100 text-sky-700',
    title: 'PM Surya Ghar Yojana',
    description:
      'Eligible households get up to ₹78,000 in government subsidies. We handle all documentation and approvals end-to-end.',
  },
  {
    Icon: ShieldCheck,
    accent: '#b45309',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
    iconRing: 'bg-amber-100 text-amber-700',
    title: 'Tier-1 Solar Panels',
    description:
      'We install only Tier-1 certified panels from industry-leading brands — backed by a 25-year performance warranty.',
  },
  {
    Icon: Wrench,
    accent: '#7c3aed',
    lightBg: 'bg-violet-50',
    borderColor: 'border-violet-100',
    iconRing: 'bg-violet-100 text-violet-700',
    title: 'Lifetime Maintenance',
    description:
      'Comprehensive AMC plans covering cleaning, performance monitoring, and on-site repairs so your system runs at peak efficiency.',
  },
  {
    Icon: TrendingDown,
    accent: '#be123c',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-100',
    iconRing: 'bg-rose-100 text-rose-700',
    title: 'Up to 90% Bill Reduction',
    description:
      'Most clients see electricity bills slashed by 70–90%. Earn credits by selling surplus power back to the grid under net metering.',
  },
  {
    Icon: Users,
    accent: '#008080',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-100',
    iconRing: 'bg-teal-100 text-teal-700',
    title: 'Certified Expert Team',
    description:
      'MNRE-licensed engineers deliver your project on schedule — from free site survey through installation to after-sales support.',
  },
];

const stats = [
  { value: '15+', label: 'Years of Experience', pct: 95 },
  { value: '1000+', label: 'Residential Projects', pct: 85 },
  { value: '100+', label: 'Commercial Clients', pct: 70 },
  { value: '2000+', label: 'Happy Families', pct: 92 },
];

const trustPoints = [
  'MNRE Certified Engineers',
  'ISO 9001:2015 Company',
  '25-Year Panel Warranty',
  'Subsidy Processing Help',
  'Net Metering Assistance',
  '24×7 Customer Support',
];

const WhySulax = () => {
  return (
    <section className="relative bg-gray-50 py-24 overflow-hidden">

      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-50/80 border border-teal-100/60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-50/60 border border-amber-100/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ══ HEADER ══ */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full inline-block" />
              Why Sulax Solar?
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.08] tracking-tight">
              Trusted by{' '}
              <span className="text-primary">2,000+ Families</span>
              <br />Across North India
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-500 max-w-sm lg:text-right leading-relaxed text-base"
          >
            We're your long-term energy partners — from government subsidy paperwork to annual panel cleaning, we handle it all so you don't have to.
          </motion.p>
        </div>

        {/* ══ CARDS GRID ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((b, i) => {
            const Icon = b.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`group relative p-7 rounded-2xl bg-white border ${b.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default`}
              >
                {/* Top-left accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, ${b.accent}, transparent)` }}
                />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${b.iconRing} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-gray-900 font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>

                {/* Hover corner glow */}
                <div
                  className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"
                  style={{ background: b.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ══ STATS + TRUST STRIP ══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* Left — progress stats */}
            <div className="p-10 space-y-8">
              <p className="text-gray-900 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-[2px] bg-secondary rounded-full inline-block" />
                Our Track Record
              </p>
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-2.5">
                    <span className="text-gray-600 text-sm">{s.label}</span>
                    <span className="text-gray-900 font-black text-2xl">{s.value}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #008080, #F5C518)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.12, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right — trust list + CTA */}
            <div className="p-10 flex flex-col justify-between gap-8">
              <div>
                <p className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-primary rounded-full inline-block" />
                  Why Us at a Glance
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {trustPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="flex items-center gap-2.5 text-sm text-gray-600 group"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 group-hover:text-secondary transition-all duration-200" />
                      {point}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                  <span className="relative">Book Free Site Survey</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhySulax;
