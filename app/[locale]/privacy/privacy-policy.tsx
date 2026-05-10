import React from 'react';
import { useTranslations } from 'next-intl';

interface SectionProps {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}

export default function PrivacyPolicy() {
  const t = useTranslations('Privacy');

  const toc_items = [
    { num: '01', text: t('toc.s1'), id: 's1' },
    { num: '02', text: t('toc.s2'), id: 's2' },
    { num: '03', text: t('toc.s3'), id: 's3' },
    { num: '06', text: t('toc.s6'), id: 's6' },
    { num: '09', text: t('toc.s9'), id: 's9' },
    { num: '10', text: t('toc.s10'), id: 's10' },
    { num: '14', text: t('toc.s14'), id: 's14' },
  ];

  const dataCategories = t.raw('s1.dataCategories') as { category: string, data: string }[];
  const legalBasis = t.raw('s3.legalBasis') as { processing: string, basis: string }[];
  const subProcessors = t.raw('s6.subProcessors') as { name: string, purpose: string, data: string, policy: string }[];
  const retentionPeriods = t.raw('s10.retentionPeriods') as { dataType: string, period: string }[];

  return (
    <div className="bg-white text-slate-700 font-sans max-w-4xl mx-auto px-6 py-12">
      <div className="border-b border-violet-500 pb-8 mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">{t('title')}</h1>
        <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">{t('updated')}</p>
      </div>

      <div className="bg-violet-50 border border-violet-100 border-l-4 border-l-violet-600 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-xs font-bold tracking-widest uppercase text-violet-600 mb-6">{t('contents')}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {toc_items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-slate-600 hover:text-violet-600 text-sm transition-colors font-medium">
                <span className="text-violet-300 mr-2">{item.num}.</span> {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <Section number="01" title={t('s1.title')} id="s1">
        <p className="leading-relaxed">{t('s1.desc')}</p>
        <Table headers={t.raw('s1.headers')} rows={dataCategories.map(i => [i.category, i.data])} />
      </Section>

      <Section number="02" title={t('s2.title')} id="s2">
        <p className="leading-relaxed">{t('s2.desc')}</p>
        <ul className="space-y-4 my-6">
          <li className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-violet-600 font-bold">→</span>
            <span><strong className="text-slate-900">{t('s2.serviceDelivery.title')}</strong> {t('s2.serviceDelivery.desc')}</span>
          </li>
          <li className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-violet-600 font-bold">→</span>
            <span><strong className="text-slate-900">{t('s2.salesMarketing.title')}</strong> {t('s2.salesMarketing.desc')}</span>
          </li>
        </ul>
      </Section>

      <Section number="03" title={t('s3.title')} id="s3">
        <Table headers={t.raw('s3.headers')} rows={legalBasis.map(i => [i.processing, i.basis])} />
      </Section>

      <Section number="06" title={t('s6.title')} id="s6">
        <p className="leading-relaxed">{t('s6.desc')}</p>
        <Table
          headers={t.raw('s6.headers')}
          rows={subProcessors.map(i => [i.name, i.purpose, i.data, i.policy])}
        />
      </Section>

      <Section number="09" title={t('s9.title')} id="s9">
        <p className="leading-relaxed">{t('s9.desc')}</p>
        <Callout type="info">
          <strong>{t('s9.securityTitle')}</strong> {t('s9.securityDesc')}
        </Callout>
      </Section>

      <Section number="10" title={t('s10.title')} id="s10">
        <Table headers={t.raw('s10.headers')} rows={retentionPeriods.map(i => [i.dataType, i.period])} />
      </Section>

      <Section number="14" title={t('s14.title')} id="s14">
        <div className="bg-violet-600 text-white rounded-3xl p-8 shadow-xl shadow-violet-100">
          <h3 className="text-xl font-bold mb-4">{t('s14.questions')}</h3>
          <p className="opacity-90 mb-6 leading-relaxed">{t('s14.desc')}</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">Otomax Digital Solutions</p>
            <a href="mailto:info@otomax.tech" className="text-violet-200 hover:text-white transition-colors font-bold underline underline-offset-4">info@otomax.tech</a>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-2xl font-black text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-baseline gap-4">
        <span className="text-xs font-bold tracking-widest text-violet-600 uppercase">{number}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-slate-600">{children}</div>
    </section>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][]; }) {
  return (
    <div className="overflow-x-auto my-8 rounded-2xl border border-slate-100">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            {headers.map((h, i) => (
              <th key={i} className="text-slate-900 font-bold text-xs uppercase tracking-wider text-left px-4 py-4 border-b border-slate-100">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-violet-50/30 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-4 border-b border-slate-50 text-slate-600 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ type, children }: { type: 'warn' | 'info'; children: React.ReactNode; }) {
  return (
    <div className="bg-violet-50 border-l-4 border-violet-600 rounded-r-2xl px-6 py-5 my-8 text-slate-700 leading-relaxed shadow-sm">
      {children}
    </div>
  );
}
