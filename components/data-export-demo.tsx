'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styles from './data-export-demo.module.css';

type Status = 'draft' | 'queued' | 'processing' | 'ready' | 'partial' | 'failed' | 'expired';
type Config = { devices: string[]; fields: string[]; days: number; format: 'csv' | 'json'; scenario: 'success' | 'partial' | 'failure' };
const initial: Config = { devices: ['inverter'], fields: ['energy', 'status'], days: 7, format: 'csv', scenario: 'success' };
const devices = [{ id: 'inverter', name: 'Rooftop inverter', type: 'Solar' }, { id: 'battery', name: 'Home battery', type: 'Storage' }];
const fields = [{ id: 'energy', name: 'Energy readings' }, { id: 'status', name: 'Device status' }, { id: 'alerts', name: 'Alerts' }];
const labels: Record<Status, string> = { draft: 'Choose your data', queued: 'Request queued', processing: 'Preparing your data', ready: 'Your sample is ready', partial: 'Ready with missing data', failed: 'Data source unavailable', expired: 'Export no longer available' };

function sampleRecords(config: Config) {
  return config.devices.flatMap((device, index) => [0, 1].map(reading => {
    const missing = config.scenario === 'partial' && index === config.devices.length - 1 && reading === 1;
    return {
      device: `sample-${device}`, timestamp: `2026-01-05T12:${reading === 0 ? '00' : '05'}:00+01:00`,
      ...(config.fields.includes('energy') ? { energy_kwh: missing ? null : 18.6 + index * 2 + reading } : {}),
      ...(config.fields.includes('status') ? { status: missing ? null : 'online' } : {}),
      ...(config.fields.includes('alerts') ? { alert_count: missing ? null : 0 } : {}),
    };
  }));
}

export function DataExportDemo() {
  const [config, setConfig] = useState<Config>(initial);
  const [status, setStatus] = useState<Status>('draft');
  const [task, setTask] = useState<Config | null>(null);
  const [verification, setVerification] = useState<'none' | 'request' | 'download'>('none');
  const [linkExpired, setLinkExpired] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>[]>([]);
  const revision = useRef(0);
  const result = useRef<HTMLDivElement>(null);
  const id = useId();
  const estimate = config.devices.length * config.fields.length * config.days / 15;
  const invalid = !config.devices.length ? 'Select at least one device.' : !config.fields.length ? 'Select at least one data category.' : estimate > 12 ? 'This sample exceeds the demo limit. Use fewer devices, fewer categories or a shorter period.' : '';
  const available = status === 'ready' || status === 'partial';
  const busy = status === 'queued' || status === 'processing';

  const cancel = () => { revision.current += 1; timer.current.forEach(clearTimeout); timer.current = []; };
  const clear = () => { cancel(); setStatus('draft'); setTask(null); setVerification('none'); setLinkExpired(false); setDownloaded(false); };
  const update = (next: Config) => { clear(); setConfig(next); };
  const toggle = (key: 'devices' | 'fields', value: string) => update({ ...config, [key]: config[key].includes(value) ? config[key].filter(item => item !== value) : [...config[key], value] });
  const reveal = () => {
    if (window.matchMedia('(max-width: 700px)').matches) {
      requestAnimationFrame(() => result.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
    }
  };
  useEffect(() => () => { revision.current += 1; timer.current.forEach(clearTimeout); }, []);

  const start = (selection: Config) => {
    cancel();
    const version = revision.current;
    setTask({ ...selection, devices: [...selection.devices], fields: [...selection.fields] });
    setVerification('none'); setLinkExpired(false); setDownloaded(false); setStatus('queued');
    timer.current.push(setTimeout(() => { if (revision.current === version) setStatus('processing'); }, 350));
    timer.current.push(setTimeout(() => {
      if (revision.current === version) setStatus(selection.scenario === 'failure' ? 'failed' : selection.scenario === 'partial' ? 'partial' : 'ready');
    }, 1800));
    reveal();
  };
  const download = () => {
    if (!task || !available || verification !== 'download') return;
    const records = sampleRecords(task);
    const manifest = { sample: true, selected_devices: task.devices, selected_categories: task.fields, period_days: task.days, missing_data: task.scenario === 'partial', timestamps: 'ISO 8601 with timezone', records };
    const keys = Object.keys(records[0]);
    const body = task.format === 'json' ? JSON.stringify(manifest, null, 2) : '\uFEFF' + [keys.join(','), ...records.map(record => keys.map(key => {
      const value = record[key as keyof typeof record];
      return value === null ? 'null' : JSON.stringify(value);
    }).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([body], { type: task.format === 'json' ? 'application/json' : 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `sample-energy-export.${task.format}`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setLinkExpired(false); setDownloaded(true); setVerification('none');
  };
  const progress = status === 'draft' ? verification === 'request' ? 1 : 0 : busy ? 2 : 3;

  return <div className={styles.demo}>
    <div className={styles.bar}><span>MY DATA <i>/</i> EXPORT WORKSPACE</span><span className={styles.sample}>LOCAL DEMO</span><button type="button" onClick={() => { clear(); setConfig(initial); }}>Reset demo</button></div>
    <ol className={styles.steps} aria-label="Export workflow">{['Choose scope', 'Confirm identity', 'Prepare data', 'Verify & download'].map((step, index) => <li key={step} data-current={index === progress} data-complete={index < progress}><span aria-hidden="true">{index < progress ? '✓' : `0${index + 1}`}</span>{step}</li>)}</ol>
    <div className={styles.workspace}>
      <form className={styles.controls} onSubmit={event => { event.preventDefault(); if (!invalid && status === 'draft') { setVerification('request'); reveal(); } }}>
        <p className={styles.kicker}>01 / SELECT A SCOPE</p>
        <fieldset><legend>Your devices</legend>{devices.map(device => <label key={device.id} className={styles.checkbox}><input type="checkbox" checked={config.devices.includes(device.id)} onChange={() => toggle('devices', device.id)} /><span>{device.name}<small>{device.type} · Sample device</small></span></label>)}<label className={`${styles.checkbox} ${styles.restricted}`}><input type="checkbox" disabled /><span>Shared site inverter<small>Not owned by this sample account</small></span></label></fieldset>
        <fieldset><legend>Data categories</legend><div className={styles.categories}>{fields.map(field => <label key={field.id}><input type="checkbox" checked={config.fields.includes(field.id)} onChange={() => toggle('fields', field.id)} />{field.name}</label>)}</div></fieldset>
        <div className={styles.selects}>
          <div><label htmlFor={`${id}-period`}>Time range</label><select id={`${id}-period`} value={config.days} onChange={event => update({ ...config, days: Number(event.target.value) })}>{[7, 30, 90].map(days => <option key={days} value={days}>Last {days} days</option>)}</select></div>
          <div><label htmlFor={`${id}-format`}>File format</label><select id={`${id}-format`} value={config.format} onChange={event => update({ ...config, format: event.target.value as Config['format'] })}><option value="csv">CSV</option><option value="json">JSON</option></select></div>
        </div>
        <div className={styles.scenario}><label htmlFor={`${id}-outcome`}>Try an outcome</label><select id={`${id}-outcome`} value={config.scenario} onChange={event => update({ ...config, scenario: event.target.value as Config['scenario'] })}><option value="success">All data available</option><option value="partial">Some data missing</option><option value="failure">Data source unavailable</option></select></div>
        <div className={styles.estimate}><span>Illustrative file estimate</span><strong>{estimate.toFixed(1)} <small>MB</small></strong><p>Demo limit: 12 MB. These are sample figures, not production limits.</p></div>
        <p id={`${id}-validation`} className={styles.validation} aria-live="polite">{invalid || 'Read-only data. Change any selection to start a new demo request.'}</p>
        <button className={styles.primary} type="submit" disabled={!!invalid || status !== 'draft' || verification !== 'none'} aria-describedby={`${id}-validation`}>Request sample export <span aria-hidden="true">↗</span></button>
      </form>

      <div ref={result} className={styles.result}>
        <div className={styles.resultHeader}><p className={styles.kicker}>02 / REQUEST & DELIVERY</p><span className={styles.status} data-status={status} role="status">{verification === 'request' ? 'Confirm before creating a task' : verification === 'download' ? 'Confirm again before downloading' : labels[status]}</span></div>
        {task && <p className={styles.snapshot}>{task.devices.length} device{task.devices.length > 1 ? 's' : ''} · {task.fields.length} categories · {task.days} days · {task.format.toUpperCase()}</p>}
        {verification !== 'none' ? <div className={styles.verify}>
          <span className={styles.icon} aria-hidden="true">◎</span><h3>{verification === 'request' ? 'Confirm the request is yours.' : 'Your data needs a fresh confirmation.'}</h3>
          <p>{verification === 'request' ? 'In the proposed product flow, identity is checked before a task is created.' : 'A prepared file and a valid download link have different lifetimes. Confirm again to obtain a fresh link.'}</p>
          <small>Demo confirmation only. No email, password or code is collected.</small>
          <button type="button" className={styles.primary} onClick={() => verification === 'request' ? start(config) : download()}>{verification === 'request' ? 'Simulate confirmation & create task' : `Confirm & download sample ${task?.format.toUpperCase()}`}<span aria-hidden="true">↗</span></button>
          <button type="button" className={styles.textButton} onClick={() => setVerification('none')}>Cancel confirmation</button>
        </div> : status === 'draft' ? <div className={styles.empty}><span aria-hidden="true">{'↳'}</span><h3>Your data. Your scope.</h3><p>Select what belongs to you, then follow a request all the way to a downloadable sample.</p><div className={styles.paperStack} aria-hidden="true"><span>energy readings</span><span>device status</span><span>field dictionary</span></div></div>
        : busy ? <div className={styles.preparing} aria-busy="true"><span className={styles.loading} aria-hidden="true" /><h3>{status === 'queued' ? 'Waiting to begin.' : 'Preparing selected records.'}</h3><p>Preparation happens asynchronously. The request keeps its original scope while the task runs.</p><small>Time is compressed for this demonstration.</small><button type="button" className={styles.textButton} onClick={clear}>Cancel demo task</button></div>
        : status === 'failed' ? <div className={styles.failure}><span className={styles.icon} aria-hidden="true">!</span><h3>A recoverable failure.</h3><p>The sample data source is unavailable. Retry with the original selection after the simulated source recovers.</p><button type="button" className={styles.primary} onClick={() => { if (task) { const recovered = { ...task, scenario: 'success' as const }; setConfig(recovered); start(recovered); } }}>Restore source & retry <span aria-hidden="true">↗</span></button></div>
        : status === 'expired' ? <div className={styles.failure}><span className={styles.icon} aria-hidden="true">↻</span><h3>This task has expired.</h3><p>A fresh download link cannot recover an expired export. Create a new task using the same scope.</p><button type="button" className={styles.primary} onClick={() => { setVerification('request'); reveal(); }}>Request again <span aria-hidden="true">↗</span></button></div>
        : <div className={styles.ready}>
          {status === 'partial' && <div className={styles.partial}><strong>Useful data is still available.</strong><p>A sample device has missing readings. They remain <code>null</code>, with a missing-data flag in the JSON manifest.</p></div>}
          <div className={styles.file}><span className={styles.fileIcon} aria-hidden="true">{'{ }'}</span><div><strong>sample-energy-export.{task?.format}</strong><p>{downloaded ? 'Sample downloaded · Original scope retained' : 'Read-only sample · Ready for delivery'}</p></div></div>
          <details className={styles.contents}><summary>Inspect sample contents <span aria-hidden="true">+</span></summary><pre tabIndex={0} aria-label="Sample records">{task ? JSON.stringify(sampleRecords(task), null, 2) : ''}</pre><p>Illustrative records with units and timezone-aware timestamps. The product design calls for a packaged export with metadata; this demo downloads a small CSV or JSON sample.</p></details>
          <div className={styles.downloadState}><span data-expired={linkExpired}>{linkExpired ? 'Download link expired' : downloaded ? 'Download complete' : 'Identity confirmation required'}</span><button type="button" className={styles.primary} onClick={() => { setVerification('download'); reveal(); }}>{linkExpired ? 'Verify & renew link' : downloaded ? 'Verify & download again' : 'Verify & download sample'}<span aria-hidden="true">↓</span></button></div>
          <div className={styles.boundaries} aria-label="Try lifecycle boundaries"><span>Explore the boundaries</span><button type="button" disabled={linkExpired} onClick={() => { setLinkExpired(true); setDownloaded(false); }}>Expire download link</button><button type="button" onClick={() => { setStatus('expired'); setVerification('none'); setLinkExpired(true); setDownloaded(false); }}>Expire export task</button></div>
        </div>}
        <div className={styles.footerNote}><span aria-hidden="true">↳</span><p>Scope validation, task progress and fresh download verification are separate UI concerns. Backend services perform actual identity, ownership and access checks.</p></div>
      </div>
    </div>
    <p className={styles.caption}>Interactive workflow reconstruction · Synthetic data · No live service calls.</p>
  </div>;
}
