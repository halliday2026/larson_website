/**
 * Single source of truth for all page copy.
 *
 * Text is carried over verbatim from the original WordPress site
 * (wlarson12.sardaritskillshare.com). Components render from this module —
 * never hardcode copy in markup. See PORTING-NOTES.md.
 */

export type IconName =
  | 'shield-alt'
  | 'file-alt'
  | 'chart-line'
  | 'battle-net'
  | 'user-shield'
  | 'handshake'
  | 'check'
  | 'phone-alt'
  | 'envelope'
  | 'map-marker-alt'
  | 'arrow-right'
  | 'plus'
  | 'minus'
  | 'menu-bar'
  | 'close'
  | 'verified-badge';

export const site = {
  name: 'Larson Safety LLC.',
  title: 'Larson Safety LLC.',
  description:
    'Workplace safety and environmental compliance consulting for small and mid-sized employers in Northeast Florida. OSHA/EPA regulatory compliance, written safety programs, audits, and fractional safety support.',
  phone: '(904) 517-2187',
  phoneHref: 'tel:+19045172187',
  phoneLabel: 'Call 904-517-2187',
  email: 'bill@larsonsafe.com',
  location: 'Northeast Florida',
};

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Free Assessment', href: '#assessment' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#cta' },
];

export const hero = {
  eyebrow: 'Occupational Safety, Environmental & Regulatory Compliance.',
  title: 'Trusted Safety & Environmental Compliance Consulting for NE Florida',
  // Leads with direct self-recognition ("no safety department? that's who
  // we work with") rather than burying it at the end of the paragraph —
  // per client direction, proactive/due-diligence framing only, no
  // incident/urgency language.
  body: 'No in-house safety department? That’s exactly who we work with. Larson Safety helps small and mid-sized Industrial/Manufacturing businesses meet and exceed regulatory requirements, reduce injury risk, and build sustainable risk management and compliance programs – without the cost of full-time safety staff.',
  primaryCta: { label: 'Request a Free Workplace Assessment', href: '#cta' },
  secondaryCta: { label: 'View Our Services', href: '#services' },
};

export const stats = [
  { value: '30+', label: 'Years of EHS Leadership' },
  { value: 'CSP', label: 'Board Certified Safety Professional' },
  { value: 'Multiple', label: 'General Industries/Manufacturing Sector Expertise' },
  { value: 'OSHA/EPA', label: 'Regulatory Compliance' },
];

// The interactive quiz at public/assessment/larson-safety-risk-assessment.html —
// a separate static page, not part of the Astro build. Distinct from
// hero.primaryCta ("Request a Free Workplace Assessment"), which is a
// consultant-led, on-site assessment requested via the contact form; this is
// a free, instant, self-serve score the visitor can take right now.
export const selfAssessment = {
  eyebrow: 'Free Self-Assessment',
  title: 'How would your programs hold up under an audit tomorrow?',
  body: 'Get an instant, private read on your safety, environmental, and risk programs — 20 quick questions across the areas most often tested by an OSHA or EPA inspector, or your insurance carrier. Nothing is shared with us unless you choose to send us your results.',
  categories: [
    'Occupational Safety & Health',
    'Environmental Management',
    'Insurance & Loss Control',
    'Regulatory & Agency Readiness',
  ],
  facts: [
    { value: '20', label: 'Questions' },
    { value: '5 min', label: 'To complete' },
    { value: 'Free', label: 'No obligation' },
  ],
  cta: { label: 'Start the Free Assessment', href: '/assessment/larson-safety-risk-assessment.html' },
};

export const services = {
  eyebrow: 'What We Do',
  title: 'Practical safety and environmental management built to last',
  body: 'Larson Safety targets its approach solely on the unique needs of its general industry customers. Larson Safety expertise specifically in the manufacturing sector allows us to customize our support in a timely and most cost-effective manner.',
  items: [
    {
      icon: 'shield-alt' as IconName,
      title: 'Regulatory Compliance (OSHA/EPA)',
      body: 'Comprehensive assessment of all OSHA/EPA compliance requirements such as: program review, records, reports, training programs as well as proactive agency pre and post interactions and preparations.',
    },
    {
      icon: 'file-alt' as IconName,
      title: 'Written Safety Program Development',
      body: 'Custom written programs for Hazard Communication, Fall Protection, Emergency Management, Heat Stress, Lockout/Tagout, Job Hazard Analysis, and more — tailored to your operations, not generic templates.',
    },
    {
      icon: 'chart-line' as IconName,
      title: 'Safety & Environmental Program Audits',
      body: 'We audit your existing programs against current OSHA standards, identify gaps, and deliver a prioritized action plan — not just a report.',
    },
    {
      icon: 'battle-net' as IconName,
      title: 'Insurance Risk Management',
      body: 'Assess your property and worker compensation risks and advise you on property protections, general liability and workers compensation costs mitigation strategies.',
    },
    {
      icon: 'user-shield' as IconName,
      title: 'Environmental Health & Safety Management Platform',
      body: 'A hosted application that allows customers to manage all their regulatory reports, training records, permits, insurance records, and incident data in real time — all supported by Larson Safety.',
    },
    {
      icon: 'handshake' as IconName,
      title: 'Fractional Safety Support',
      body: 'From short-term coverage to ongoing fractional safety and environmental support, Larson Safety provides experienced expertise on your schedule — without permanent overhead.',
    },
  ],
};

// Revived per PORTING-NOTES.md, section "The hidden 'How We Work' section" —
// present in the original WordPress source but hidden on every breakpoint
// there, so it never rendered on the live site. Copy is the exact content
// preserved in that file; no incident/urgency language added (checked
// against the client's 2026-09-29 correction — none of this was
// crisis-framed to begin with).
export const howWeWork = {
  eyebrow: 'How We Work',
  title: 'From first walkthrough to lasting compliance',
  body: 'A straightforward, four-step engagement — so you always know where you stand and what happens next.',
  steps: [
    {
      number: '01',
      title: 'Free Workplace Assessment',
      body: 'We walk your facility, review your current programs and documentation, and identify the gaps an OSHA inspector would find — before they do.',
    },
    {
      number: '02',
      title: 'Prioritized Action Plan',
      body: 'You receive a clear, plain-language report ranked by risk and regulatory exposure — what to fix first, what it takes, and what it protects.',
    },
    {
      number: '03',
      title: 'Program Build-Out',
      body: 'We write and implement the programs, training, and recordkeeping systems your operation needs — tailored to your industry, not templated.',
    },
    {
      number: '04',
      title: 'Ongoing Support',
      body: 'Fractional safety leadership, audit follow-ups, and real-time access to your compliance records through the LSS hosted EHS platform.',
    },
  ],
};

export const industries = {
  eyebrow: 'INDUSTRIES WE SERVE',
  title: 'Industries we serve',
  body: 'Bill Larson brings 30+ years of hands-on leadership experience across a number of business sectors — understanding the specific hazards, OSHA/EPA standards, and compliance pressures each one faces.',
  general: {
    title: 'General Industry',
    items: [
      'Building Facilities Management,',
      'Hospitality, Industrial Services',
      'Distribution and Warehousing.',
    ],
  },
  manufacturing: {
    title: 'Manufacturing expertise',
    columns: [
      ['Metal', 'Plastics', 'Packaging'],
      ['Printing', 'Truck/auto upfitting and repair', 'Boat manufacturing'],
    ],
  },
};

// Strengthened per client direction (2026-09-29) to overcome a first-time
// visitor's unfamiliarity with the firm — stresses four specific things the
// client asked to be foregrounded: 30+ years of experience, holding multiple
// professional certifications (CSP chief among them), manufacturing-specific
// expertise, and genuine small-business fit. `points` was fully rewritten,
// one bullet per theme, replacing the previous four (flexible engagement /
// OSHA penalty documentation) — those are still true and still covered
// elsewhere (FAQ, Services), just no longer repeated here.
export const whyUs = {
  eyebrow: 'Why Larson Safety',
  title: 'Big-Firm Expertise. Small-Firm Attention',
  credentialLabel: 'Principal Credential',
  credentialTitle: 'Board Certified Safety Professional (CSP)',
  credentialBody:
    'Larson Safety is owned and operated by a Board Certified Safety Professional (CSP) — the profession’s premier, board-administered credential, and one of several professional safety certifications held — with over 30 years of industrial EHS leadership experience. He will work directly with you and your team to identify, develop, and implement environmental, health, and safety programs that fit your needs and budget.',
  statValue: '30+',
  // The source has a literal newline here, which HTML collapses to a space —
  // it renders on one line. Do not reintroduce a <br>.
  statLabel: 'Years of direct EHS leadership',
  lead: 'Larson Safety was built for employers who need real expertise without the overhead of a full-time safety director.',
  points: [
    'Over 30 years of hands-on industrial safety and environmental leadership — not theoretical or classroom-only experience.',
    'Multiple professional safety certifications, led by the Board Certified Safety Professional (CSP) — the field’s premier, board-administered credential.',
    'Specific, hands-on expertise across manufacturing — metal, plastics, packaging, printing, and more — not generic compliance advice applied to any industry.',
    'A genuine understanding of small and mid-sized business needs and resources: realistic budgets, lean teams, and programs sized to match.',
  ],
};

export const faq = {
  eyebrow: 'Common Questions',
  title: 'What employers ask us first',
  body: 'Straight answers about OSHA compliance, costs, and how consulting works. Still unsure? Call us — the first conversation is free.',
  items: [
    {
      q: 'Do small businesses really need OSHA compliance programs?',
      a: 'Yes. OSHA standards apply to nearly every employer regardless of size, and penalties apply the same way. Small and mid-sized employers are actually inspected frequently — often triggered by an employee complaint, an incident, or a referral. A written program and documented training are your first line of defense.',
    },
    {
      q: "What happens if OSHA shows up and we're not ready?",
      a: 'Citations can carry penalties of over $16,000 per serious violation — and far more for willful or repeated ones. LSS helps you prepare before an inspection and, if one has already occurred, supports post-inspection cost mitigation and documents good-faith efforts that may reduce penalties.',
    },
    {
      q: 'How is fractional safety support different from hiring a safety manager?',
      a: 'A full-time safety director can cost $80k–$120k+ per year in salary and benefits. Fractional support gives you the same certified expertise — a Board Certified Safety Professional — on a schedule and budget that fits your operation, scaling up or down as needs change.',
    },
    {
      q: 'Do you work with businesses outside Northeast Florida?',
      a: 'We work with business across the U.S.',
    },
  ],
};

export const contact = {
  eyebrow: 'Contact Us',
  title: 'Is your workplace ready for an OSHA inspection?',
  body: 'Most employers don’t know what they’re missing until an inspector arrives. Contact Larson Safety today for a free workplace assessment — get a clear picture of where you stand and what to fix first.',
  // Neutral, due-diligence-appropriate context field — not an urgency triage.
  // Matches how the client described their actual lead channels.
  hearAboutUsLabel: 'How did you hear about us?',
  hearAboutUsOptions: ['Referral / word of mouth', 'Online search', 'Social media', 'Other'],
  confidentialityNote: 'Reaching out doesn’t commit you to anything — we’ll just talk through where you stand.',
  submitLabel: 'Request a Free Assessment',
  // A Formspree form ID is not a secret — it's visible in every page's HTML
  // source the moment the form renders. No env var needed; change it here.
  formEndpoint: 'https://formspree.io/f/xyezzqgv',
};

export const footer = {
  blurb:
    'Workplace safety and environmental compliance consulting for small and mid-sized employers in Northeast Florida.',
  columns: [
    {
      title: 'Services',
      items: [
        { label: 'Regulatory Compliance (OSHA/EPA)', href: '#services' },
        { label: 'Written Safety Programs', href: '#services' },
        { label: 'Safety & Environmental Audits', href: '#services' },
        { label: "Workers' Compensation Support", href: '#services' },
        { label: 'Fractional Safety Support', href: '#services' },
      ],
    },
    {
      title: 'Industries',
      items: [
        { label: 'Manufacturing', href: '#industries' },
        { label: 'Hospitality', href: '#industries' },
        { label: 'Building Services', href: '#industries' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'Home', href: '#top' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Industries', href: '#industries' },
        { label: 'Contact', href: '#cta' },
      ],
    },
  ],
  copyright: '© 2026 Larson Safety. All rights reserved.',
  credential:
    'Principal consultant holds the Board Certified Safety Professional (CSP) designation issued by the Board of Certified Safety Professionals (BCSP).',
};
