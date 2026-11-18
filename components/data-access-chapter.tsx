'use client';

import { useState } from 'react';
import { CaseChapter } from '@/components/case-chapter';
import { DataExportDemo } from '@/components/data-export-demo';

export function DataAccessChapter() {
  const [demo, setDemo] = useState(false);
  return <CaseChapter id="data-access" kicker="EU Data Act" title={demo ? 'Sample data export' : 'Owner data-access workflows'} description="I also work on owner-facing data access within iSolarCloud, including authorization, privacy consent and exports." layout={demo ? 'demo' : 'content'}>
    <div className="case-data-access"><div className="case-media-tabs" role="group" aria-label="Explore data access"><button type="button" aria-pressed={!demo} onClick={() => setDemo(false)}>The workflow</button><button type="button" aria-pressed={demo} onClick={() => setDemo(true)}>Try sample export</button></div>
      <div className="case-export-body" id="export-lab">{demo ? <DataExportDemo /> : <div className="case-data-overview"><p className="case-lead">My work connects authorization, privacy consent and scope selection with asynchronous export states and download handling.</p><p>Task state and link validity need separate recovery actions; API access and third-party sharing also need an explicit scope. The sample below illustrates the export flow.</p><ol className="case-export-steps">{['Choose scope', 'Confirm identity', 'Prepare data', 'Verify & download'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol><button className="button" type="button" onClick={() => setDemo(true)}>Try a sample data-access workflow</button></div>}</div>
    </div>
  </CaseChapter>;
}
