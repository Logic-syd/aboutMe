'use client';

import { useState } from 'react';
import { CaseChapter } from '@/components/case-chapter';
import { DataExportDemo } from '@/components/data-export-demo';

export function DataAccessChapter() {
  const [demo, setDemo] = useState(false);
  return <CaseChapter id="data-access" kicker="04 / ADDITIONAL WORK · EU DATA ACT" title={demo ? 'Follow a data request.' : 'Data access, within the wider platform.'} description="More recent work adds owner-facing data-access workflows to iSolarCloud, alongside the ongoing plant and device experience." layout={demo ? 'demo' : 'content'}>
    <div className="case-data-access"><div className="case-media-tabs" role="group" aria-label="Explore data access"><button type="button" aria-pressed={!demo} onClick={() => setDemo(false)}>The workflow</button><button type="button" aria-pressed={demo} onClick={() => setDemo(true)}>Try sample export</button></div>
      <div className="case-export-body" id="export-lab">{demo ? <DataExportDemo /> : <div className="case-data-overview"><p className="case-lead">My work connects authorization, privacy consent and scope selection with asynchronous export states and download handling.</p><p>Task state and link validity need separate recovery actions; API access and third-party sharing also need an explicit scope. The sample below illustrates the export flow.</p><ol className="case-export-steps">{['Choose scope', 'Confirm identity', 'Prepare data', 'Verify & download'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol><button className="button" type="button" onClick={() => setDemo(true)}>Try a sample data-access workflow <span aria-hidden="true">↗</span></button></div>}</div>
    </div>
  </CaseChapter>;
}
