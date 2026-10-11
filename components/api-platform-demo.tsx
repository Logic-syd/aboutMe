'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styles from './api-platform-demo.module.css';

type Language = 'en' | 'zh';
type Site = 'eu' | 'cn' | 'international' | 'au' | 'in';
type Endpoint = 'summary' | 'devices';
type Phase = 'idle' | 'permission' | 'gateway' | 'complete' | 'denied' | 'timeout';
type SampleResponse = { result_code: '1'; result_data: Record<string, string | number> };

const sites: { id: Site; en: string; zh: string }[] = [
  { id: 'eu', en: 'Europe', zh: '欧洲' },
  { id: 'cn', en: 'China', zh: '中国' },
  { id: 'international', en: 'International', zh: '国际' },
  { id: 'au', en: 'Australia', zh: '澳洲' },
  { id: 'in', en: 'India', zh: '印度' },
];

const copy = {
  en: {
    title: 'Developer playground', sample: 'SAMPLE MODE', language: 'Interface language',
    configuration: '01 / CONFIGURE', site: 'Business site', app: 'Sample application',
    authorized: 'Authorized app', restricted: 'No API permission',
    endpoint: 'Example endpoint', summary: 'Plant summary', devices: 'Device status',
    scenario: 'Gateway condition', healthy: 'Healthy response', delayed: 'Simulate a timeout',
    run: 'Run sample request', running: 'Running sample…', reset: 'Reset',
    request: 'REQUEST PREVIEW', credentials: 'Synthetic application credentials',
    route: '02 / FOLLOW THE REQUEST', permission: 'App permission', gateway: 'Site gateway', response: 'Raw response',
    ready: 'Ready to explore', checking: 'Checking application permission…', routing: 'Waiting for the selected gateway…',
    complete: 'Sample response received', denied: 'Request stopped before the gateway', timeout: 'The sample gateway timed out',
    idleHint: 'Choose a site, then run a request to see how access, routing and the response fit together.',
    deniedHint: 'This sample application cannot access the selected endpoint. No business request was sent to the gateway.',
    deniedAction: 'Use authorized app & retry',
    timeoutHint: 'The simulated request exceeded its time limit. A timed-out POST is not automatically replayed.',
    retry: 'Retry with a recovered gateway',
    granted: 'Granted', checkingShort: 'Checking', deniedShort: 'Denied', waiting: 'Waiting', notReached: 'Not reached',
    received: 'Received', timedOut: 'Timed out', selected: 'Selected', readyShort: 'Ready',
    successLabel: 'SAMPLE PLANT / 001', today: 'Energy today', power: 'Current power', capacity: 'Installed capacity',
    online: 'Online devices', offline: 'Offline devices', availability: 'Availability',
    json: 'Inspect raw JSON', responseNote: 'Illustrative fields inside the documented response envelope.',
    protocolTitle: 'One request layer. Two different contracts.',
    protocol: 'The API debugger uses application credentials and shows the raw response. Ordinary portal calls can use encrypted payloads and unwrap the result. This reconstruction simulates the debugger; it performs no encryption.',
    local: 'Local simulation', gatewayLabel: 'gateway', statusIdle: 'Ready',
  },
  zh: {
    title: '开发者调试台', sample: '示例模式', language: '界面语言',
    configuration: '01 / 配置请求', site: '业务站点', app: '示例应用',
    authorized: '已授权应用', restricted: '无接口权限',
    endpoint: '示例接口', summary: '电站概览', devices: '设备状态',
    scenario: '网关状态', healthy: '正常响应', delayed: '模拟超时',
    run: '运行示例请求', running: '请求运行中…', reset: '重置',
    request: '请求预览', credentials: '虚构的应用凭据',
    route: '02 / 追踪请求', permission: '应用权限', gateway: '站点网关', response: '原始响应',
    ready: '准备就绪', checking: '正在检查应用权限…', routing: '正在等待所选网关响应…',
    complete: '已收到示例响应', denied: '请求在进入网关前被阻止', timeout: '示例网关响应超时',
    idleHint: '选择站点并运行请求，观察权限检查、站点路由与响应展示如何衔接。',
    deniedHint: '该示例应用没有所选接口的访问权限，因此不会向业务网关发送请求。',
    deniedAction: '切换已授权应用并重试',
    timeoutHint: '模拟请求已超过等待时限。超时的 POST 请求不会被自动重发。',
    retry: '模拟网关恢复并手动重试',
    granted: '已授权', checkingShort: '检查中', deniedShort: '已拒绝', waiting: '等待中', notReached: '未执行',
    received: '已接收', timedOut: '已超时', selected: '已选定', readyShort: '就绪',
    successLabel: '示例电站 / 001', today: '今日发电', power: '当前功率', capacity: '装机容量',
    online: '在线设备', offline: '离线设备', availability: '在线率',
    json: '查看原始 JSON', responseNote: '响应结构来自文档；内部业务字段为演示示例。',
    protocolTitle: '共用请求层，不同的接口约定。',
    protocol: 'API 调试器使用应用凭据，并展示原始响应。普通门户请求可使用加密载荷，并提取业务结果。本演示重现调试流程，不执行加密。',
    local: '本地模拟', gatewayLabel: '网关', statusIdle: '就绪',
  },
};

function createSample(site: Site, endpoint: Endpoint): SampleResponse {
  const region = sites.find((item) => item.id === site)!.en;
  return {
    result_code: '1',
    result_data: endpoint === 'summary'
      ? { plant_id: 'demo-plant-001', site: region, energy_today_kwh: 286.4, current_power_kw: 42.8, capacity_kwp: 60 }
      : { plant_id: 'demo-plant-001', site: region, online_devices: 11, offline_devices: 1, availability_percent: 91.7 },
  };
}

export function ApiPlatformDemo() {
  const [language, setLanguage] = useState<Language>('en');
  const [site, setSite] = useState<Site>('eu');
  const [application, setApplication] = useState<'authorized' | 'restricted'>('authorized');
  const [endpoint, setEndpoint] = useState<Endpoint>('summary');
  const [scenario, setScenario] = useState<'healthy' | 'timeout'>('healthy');
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<SampleResponse | null>(null);
  const runVersion = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inspector = useRef<HTMLDivElement>(null);
  const id = useId();
  const t = copy[language];
  const currentSite = sites.find((item) => item.id === site)!;
  const busy = phase === 'permission' || phase === 'gateway';
  const path = endpoint === 'summary' ? '/demo/plant-summary' : '/demo/device-status';

  const cancel = () => {
    runVersion.current += 1;
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const clearRun = () => {
    cancel();
    setPhase('idle');
    setResult(null);
  };
  useEffect(() => () => {
    runVersion.current += 1;
    timers.current.forEach(clearTimeout);
  }, []);

  const run = (recovered = false, selectedApplication = application) => {
    cancel();
    const version = runVersion.current;
    setResult(null);
    setPhase('permission');
    if (window.matchMedia('(max-width: 700px)').matches) {
      inspector.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    if (recovered) setScenario('healthy');
    const later = (callback: () => void, delay: number) => {
      timers.current.push(setTimeout(() => {
        if (runVersion.current === version) callback();
      }, delay));
    };
    later(() => {
      if (selectedApplication === 'restricted') {
        setPhase('denied');
        return;
      }
      setPhase('gateway');
      later(() => {
        if (!recovered && scenario === 'timeout') {
          setPhase('timeout');
          return;
        }
        setResult(createSample(site, endpoint));
        setPhase('complete');
      }, !recovered && scenario === 'timeout' ? 1500 : 750);
    }, 450);
  };

  const status = phase === 'idle' ? t.ready : phase === 'permission' ? t.checking : phase === 'gateway' ? t.routing : phase === 'complete' ? t.complete : phase === 'denied' ? t.denied : t.timeout;
  const steps = [
    { label: t.permission, detail: phase === 'idle' ? t.readyShort : phase === 'permission' ? t.checkingShort : phase === 'denied' ? t.deniedShort : t.granted, state: phase === 'permission' ? 'active' : phase === 'denied' ? 'error' : phase === 'idle' ? 'idle' : 'done' },
    { label: t.gateway, detail: phase === 'denied' ? t.notReached : phase === 'timeout' ? t.timedOut : currentSite[language], state: phase === 'gateway' ? 'active' : phase === 'timeout' ? 'error' : phase === 'complete' ? 'done' : 'idle' },
    { label: t.response, detail: phase === 'complete' ? t.received : phase === 'denied' || phase === 'timeout' ? t.notReached : t.waiting, state: phase === 'complete' ? 'done' : 'idle' },
  ];
  const metrics = endpoint === 'summary'
    ? [{ label: t.today, value: result?.result_data.energy_today_kwh, unit: 'kWh' }, { label: t.power, value: result?.result_data.current_power_kw, unit: 'kW' }, { label: t.capacity, value: result?.result_data.capacity_kwp, unit: 'kWp' }]
    : [{ label: t.online, value: result?.result_data.online_devices, unit: '' }, { label: t.offline, value: result?.result_data.offline_devices, unit: '' }, { label: t.availability, value: result?.result_data.availability_percent, unit: '%' }];

  return (
    <div className={styles.demo}>
      <div className={styles.console} lang={language === 'en' ? 'en' : 'zh-CN'}>
        <div className={styles.toolbar}>
          <div className={styles.identity}><span className={styles.logo} aria-hidden="true">↗</span><span>{t.title}</span><span className={styles.sample}>{t.sample}</span></div>
          <div className={styles.language} role="group" aria-label={t.language}>
            <button type="button" aria-pressed={language === 'en'} onClick={() => { clearRun(); setLanguage('en'); }}>EN</button>
            <button type="button" aria-pressed={language === 'zh'} onClick={() => { clearRun(); setLanguage('zh'); }}>中文</button>
          </div>
        </div>
        <div className={styles.workspace}>
          <div className={styles.configuration}>
            <p className={styles.eyebrow}>{t.configuration}</p>
            <div className={styles.fields}>
              <div><label htmlFor={`${id}-site`}>{t.site}</label><select id={`${id}-site`} value={site} onChange={(event) => { clearRun(); setSite(event.target.value as Site); }}>{sites.map((item) => <option key={item.id} value={item.id}>{item[language]}</option>)}</select></div>
              <div><label htmlFor={`${id}-app`}>{t.app}</label><select id={`${id}-app`} value={application} onChange={(event) => { clearRun(); setApplication(event.target.value as 'authorized' | 'restricted'); }}><option value="authorized">{t.authorized}</option><option value="restricted">{t.restricted}</option></select></div>
              <div><label htmlFor={`${id}-endpoint`}>{t.endpoint}</label><select id={`${id}-endpoint`} value={endpoint} onChange={(event) => { clearRun(); setEndpoint(event.target.value as Endpoint); }}><option value="summary">{t.summary}</option><option value="devices">{t.devices}</option></select></div>
              <div><label htmlFor={`${id}-scenario`}>{t.scenario}</label><select id={`${id}-scenario`} value={scenario} onChange={(event) => { clearRun(); setScenario(event.target.value as 'healthy' | 'timeout'); }}><option value="healthy">{t.healthy}</option><option value="timeout">{t.delayed}</option></select></div>
            </div>
            <div className={styles.requestPreview}>
              <span>{t.request}</span>
              <p><b>POST</b><code>{path}</code></p>
              <div><span>{currentSite[language]} {t.gatewayLabel}</span><span>↓</span></div>
              <code>appkey: {application === 'authorized' ? 'demo-app-001' : 'demo-app-002'}</code>
              <small>{t.credentials}</small>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.run} disabled={busy} onClick={() => run()}>{busy ? t.running : t.run}<span aria-hidden="true">{busy ? '···' : '↗'}</span></button>
              <button type="button" className={styles.reset} onClick={() => { clearRun(); setSite('eu'); setApplication('authorized'); setEndpoint('summary'); setScenario('healthy'); }}>{t.reset}</button>
            </div>
          </div>
          <div className={styles.inspector} ref={inspector}>
            <div className={styles.inspectorHeading}><p className={styles.eyebrow}>{t.route}</p><span>{t.local}</span></div>
            <ol className={styles.trace} aria-label={t.route}>
              {steps.map((step, index) => <li key={index} data-state={step.state}><span className={styles.stepNumber} aria-hidden="true">{step.state === 'done' ? '✓' : step.state === 'error' ? '!' : `0${index + 1}`}</span><span>{step.label}<small>{step.detail}</small></span></li>)}
            </ol>
            <div className={styles.status} data-phase={phase} role="status" aria-live="polite"><i aria-hidden="true" />{status}</div>
            {phase === 'complete' && result ? (
              <div className={styles.result}>
                <div className={styles.plantHeader}><span>{t.successLabel}</span><span>{currentSite[language]} <i aria-hidden="true">·</i> {endpoint === 'summary' ? t.summary : t.devices}</span></div>
                <div className={styles.metrics}>{metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><p>{metric.value}<small>{metric.unit}</small></p></div>)}</div>
                <details className={styles.json}><summary>{t.json}<span aria-hidden="true">{'{ }'}</span></summary><pre tabIndex={0} aria-label={t.json}>{JSON.stringify(result, null, 2)}</pre><p>{t.responseNote}</p></details>
              </div>
            ) : phase === 'denied' || phase === 'timeout' ? (
              <div className={styles.errorState}><span className={styles.errorIcon} aria-hidden="true">{phase === 'denied' ? '⊘' : '↻'}</span><p>{phase === 'denied' ? t.deniedHint : t.timeoutHint}</p><button type="button" onClick={() => { if (phase === 'denied') { setApplication('authorized'); run(false, 'authorized'); } else run(true); }}>{phase === 'denied' ? t.deniedAction : t.retry}<span aria-hidden="true">↗</span></button></div>
            ) : (
              <div className={styles.emptyState} data-running={busy} aria-hidden={busy ? 'true' : undefined}>
                <div className={styles.routeVisual} aria-hidden="true"><span>{'{ }'}</span><i /><div><b>{currentSite[language]}</b><small>{t.gatewayLabel}</small></div><i /><span>↗</span></div>
                <p>{t.idleHint}</p>
              </div>
            )}
            <div className={styles.protocol}><span aria-hidden="true">↳</span><div><strong>{t.protocolTitle}</strong><p>{t.protocol}</p></div></div>
          </div>
        </div>
      </div>
      <p className={styles.caption}>Interactive reconstruction · Sample data · No live requests.</p>
    </div>
  );
}
