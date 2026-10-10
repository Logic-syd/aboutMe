"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./sports-assessment-demo.module.css";

const DURATION = 12;
const PEOPLE = [
  { name: "Student 01", color: "#c2d7ba", score: 94 },
  { name: "Student 02", color: "#dcc0cd", score: 91 },
  { name: "Student 03", color: "#e9c5a4", score: 96 },
];
type Phase = "ready" | "running" | "paused" | "complete";
type Packet = { person: number; due: number };
type Session = { time: number; sent: Set<string>; queue: Packet[]; reps: number[] };
type View = { phase: Phase; time: number; pending: number; reps: number[] };
const freshSession = (): Session => ({ time: 0, sent: new Set(), queue: [], reps: [0, 0, 0] });
const freshView = (): View => ({ phase: "ready", time: 0, pending: 0, reps: [0, 0, 0] });
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const subscribeNothing = () => () => {};

type Point = [number, number];
function paint(canvas: HTMLCanvasElement, time: number, participants: number, overlay: boolean, reduced: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, 1120, 570);
  const background = ctx.createRadialGradient(560, 210, 20, 560, 300, 670);
  background.addColorStop(0, "#3f544b"); background.addColorStop(1, "#243930");
  ctx.fillStyle = background; ctx.fillRect(0, 0, 1120, 570);
  ctx.strokeStyle = "#c4d7c019"; ctx.lineWidth = 1;
  for (let y = 370; y <= 570; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1120, y); ctx.stroke(); }
  for (let x = -500; x < 1800; x += 160) { ctx.beginPath(); ctx.moveTo(560 + (x - 560) * .4, 370); ctx.lineTo(x, 570); ctx.stroke(); }
  ctx.fillStyle = "#d6e0cf48"; ctx.font = "12px monospace"; ctx.fillText("MOVEMENT STUDIO / JUMPING JACKS", 38, 38);
  ctx.textAlign = "right"; ctx.fillText("SYNTHETIC MOTION", 1082, 38); ctx.textAlign = "left";
  for (let i = 0; i < participants; i++) {
    const x = participants === 1 ? 560 : 260 + i * 300;
    const p = reduced ? .3 : (1 - Math.cos(Math.max(0, time - i * .22) * Math.PI * 2 / 1.8)) / 2;
    const lift = p * 12;
    const head: Point = [x, 160 - lift];
    const shoulders: Point[] = [[x - 34, 222 - lift], [x + 34, 222 - lift]];
    const hips: Point[] = [[x - 23, 337 - lift], [x + 23, 337 - lift]];
    const elbows: Point[] = [[x - 66 - p * 42, 280 - p * 116 - lift], [x + 66 + p * 42, 280 - p * 116 - lift]];
    const hands: Point[] = [[x - 83 + p * 18, 320 - p * 213 - lift], [x + 83 - p * 18, 320 - p * 213 - lift]];
    const knees: Point[] = [[x - 27 - p * 25, 408 - lift / 2], [x + 27 + p * 25, 408 - lift / 2]];
    const feet: Point[] = [[x - 29 - p * 46, 478], [x + 29 + p * 46, 478]];
    ctx.fillStyle = "#14271f55"; ctx.beginPath(); ctx.ellipse(x, 486, 96 + p * 15, 17, 0, 0, Math.PI * 2); ctx.fill();
    if (overlay) {
      ctx.strokeStyle = PEOPLE[i].color + "88"; ctx.lineWidth = 1; ctx.setLineDash([6, 7]); ctx.strokeRect(x - 126, 91, 252, 417); ctx.setLineDash([]);
      ctx.fillStyle = PEOPLE[i].color; ctx.font = "13px monospace"; ctx.fillText(`ID 0${i + 1} · TRACKED`, x - 124, 78);
      ctx.fillStyle = "#253a31"; ctx.fillRect(x - 80, 101, 160, 23);
    }
    const line = (points: Point[], color: string, width: number) => {
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); points.forEach(([a, b], index) => index ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.stroke();
    };
    for (let side = 0; side < 2; side++) {
      line([hips[side], knees[side], feet[side]], "#91a89b", 24);
      line([shoulders[side], elbows[side], hands[side]], PEOPLE[i].color, 22);
      line([feet[side], [feet[side][0] + (side ? 13 : -13), 478]], "#f2ead8", 13);
    }
    line([[x, 211 - lift], [x, 321 - lift]], PEOPLE[i].color, 72);
    ctx.fillStyle = "#b5c5ae"; ctx.beginPath(); ctx.arc(...head, 29, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#21372e"; ctx.beginPath(); ctx.arc(x, 153 - lift, 29, Math.PI, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#30483b"; ctx.font = "bold 26px monospace"; ctx.textAlign = "center"; ctx.fillText(`0${i + 1}`, x, 280 - lift); ctx.textAlign = "left";
    if (overlay) {
      const skeleton = "#fff8e199";
      line([shoulders[0], shoulders[1]], skeleton, 2);
      line([[x, 200 - lift], [x, 330 - lift]], skeleton, 2);
      for (let side = 0; side < 2; side++) {
        line([hands[side], elbows[side], shoulders[side], hips[side], knees[side], feet[side]], skeleton, 2);
      }
      for (const [a, b] of [...shoulders, ...elbows, ...hands, ...hips, ...knees, ...feet]) {
        ctx.beginPath(); ctx.arc(a, b, 4, 0, Math.PI * 2); ctx.fillStyle = "#fff5d8"; ctx.fill();
      }
      ctx.strokeStyle = "#f4e2ba"; ctx.lineWidth = 1; ctx.strokeRect(x - 22, 140 - lift, 44, 42);
    }
    ctx.font = "13px monospace"; ctx.textAlign = "center"; ctx.fillStyle = PEOPLE[i].color; ctx.fillText(PEOPLE[i].name.toUpperCase(), x, 540); ctx.textAlign = "left";
  }
}

export function SportsAssessmentDemo() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const session = useRef<Session>(freshSession());
  const [view, setView] = useState<View>(freshView);
  const [participants, setParticipants] = useState(3);
  const [overlay, setOverlay] = useState(true);
  const [delay, setDelay] = useState(400);
  const [audio, setAudio] = useState(false);
  const [speechNote, setSpeechNote] = useState("");
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const hasSpeech = useSyncExternalStore(subscribeNothing, () => "speechSynthesis" in window && "SpeechSynthesisUtterance" in window, () => false);
  const settings = useRef({ overlay, delay, reduced });
  useEffect(() => {
    settings.current = { overlay, delay, reduced };
    if (canvas.current) paint(canvas.current, Math.min(session.current.time, DURATION), participants, overlay, reduced);
  }, [overlay, delay, reduced, participants, view.phase]);

  useEffect(() => {
    const hide = () => { if (document.hidden) setView(current => current.phase === "running" ? { ...current, phase: "paused" } : current); };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, []);

  useEffect(() => {
    if (view.phase !== "running") return;
    let frame = 0, previous = performance.now(), published = previous;
    const tick = (now: number) => {
      const s = session.current;
      s.time += Math.min((now - previous) / 1000, .1); previous = now;
      for (let person = 0; person < participants; person++) for (let rep = 0; rep < 6; rep++) {
        const at = 1.8 * (rep + 1) + person * .22, id = `${person}:${rep}`;
        if (s.time >= at && !s.sent.has(id)) { s.sent.add(id); s.queue.push({ person, due: at + settings.current.delay / 1000 }); }
      }
      s.queue = s.queue.filter(packet => {
        if (packet.due > s.time) return true;
        s.reps[packet.person] += 1; return false;
      });
      const complete = s.time >= DURATION && s.queue.length === 0;
      if (canvas.current && (!settings.current.reduced || now - published >= 100)) paint(canvas.current, Math.min(s.time, DURATION), participants, settings.current.overlay, settings.current.reduced);
      if (now - published >= 80 || complete) {
        published = now; setView({ phase: complete ? "complete" : "running", time: Math.min(s.time, DURATION), pending: s.queue.length, reps: [...s.reps] });
      }
      if (!complete) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [view.phase, participants]);

  useEffect(() => {
    if (!audio || view.phase !== "complete" || !hasSpeech) return;
    const announcement = new SpeechSynthesisUtterance(`Training complete. ${PEOPLE.slice(0, participants).map(person => `${person.name}, ${person.score} points`).join(". ")}.`);
    announcement.lang = "en-US"; announcement.rate = .9;
    announcement.onerror = () => setSpeechNote("Audio could not play. Your scores are shown below.");
    window.speechSynthesis.speak(announcement);
    return () => { announcement.onerror = null; window.speechSynthesis.cancel(); };
  }, [audio, view.phase, hasSpeech, participants]);

  const reset = (count = participants) => {
    session.current = freshSession(); setView(freshView()); setParticipants(count); setSpeechNote("");
    if (hasSpeech) window.speechSynthesis.cancel();
    if (canvas.current) paint(canvas.current, 0, count, overlay, reduced);
  };
  const startPause = () => {
    if (view.phase === "complete") { session.current = freshSession(); setSpeechNote(""); setView({ ...freshView(), phase: "running" }); }
    else setView(current => ({ ...current, phase: current.phase === "running" ? "paused" : "running" }));
  };
  const receiving = view.phase === "running" && view.time >= DURATION;
  const status = receiving ? "Receiving final results" : { ready: "Ready when you are", running: "Session in progress", paused: "Session paused", complete: "Session complete" }[view.phase];
  const total = view.reps.slice(0, participants).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.demo} data-testid="sports-demo">
      <div className={styles.caption}><span>Interactive recreation · Sample data</span><span>01 / MOVEMENT → FEEDBACK</span></div>
      <div className={styles.console}>
        <div className={styles.toolbar}>
          <div><span className={styles.statusDot} data-running={view.phase === "running"} /><span role="status">{status}</span></div>
          <span className={styles.timer} aria-label={`${Math.floor(view.time)} of 12 seconds`}>{String(Math.floor(view.time)).padStart(2, "0")} <span>/ 12 SEC</span></span>
        </div>
        <div className={styles.viewport}>
          <canvas ref={canvas} width={1120} height={570} aria-label={`Animated jumping-jack demonstration with ${participants} sample students. Individual results are listed below.`} role="img" />
          {view.phase === "ready" && <button className={styles.stageStart} onClick={startPause}><span aria-hidden="true">▶</span> Start a 12-second session</button>}
          {view.phase === "paused" && <div className={styles.stageLabel}>PAUSED — YOUR RESULTS ARE SAVED</div>}
          {view.phase === "complete" && <div className={styles.stageLabel}>SESSION COMPLETE · {total} REPS RECEIVED</div>}
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Training progress" aria-valuemin={0} aria-valuemax={12} aria-valuenow={Math.floor(view.time)}><span style={{ width: `${view.time / DURATION * 100}%` }} /></div>
        <div className={styles.pipeline} aria-label="Simulated data pipeline">
          <span><i /> Movement</span><b aria-hidden="true">→</b><span>AI result simulation</span><b aria-hidden="true">→</b><span className={view.pending ? styles.waiting : ""}>{view.pending ? `${view.pending} in transit` : total > 0 ? "Results received" : "Waiting for movement"}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.transport}><button className={styles.primary} onClick={startPause}>{view.phase === "running" ? "Pause session" : view.phase === "paused" ? "Resume session" : view.phase === "complete" ? "Play again" : "Start session"}<span aria-hidden="true">{view.phase === "running" ? "Ⅱ" : "↗"}</span></button><button className={styles.reset} onClick={() => reset()} aria-label="Reset session">↺ Reset</button></div>
        <fieldset className={styles.participants}><legend>Participants <span>· changing resets</span></legend><div>{[1, 3].map(count => <button key={count} aria-pressed={participants === count} onClick={() => { if (count !== participants) reset(count); }}>{count === 1 ? "One student" : "Three students"}</button>)}</div></fieldset>
        <div className={styles.delay}><label htmlFor="sports-result-delay">Result delay <output htmlFor="sports-result-delay">{delay} ms</output></label><input id="sports-result-delay" type="range" min={0} max={1200} step={100} value={delay} onChange={event => setDelay(Number(event.target.value))} /><span>Increase it to see results arrive later.</span></div>
      </div>
      <div className={styles.options}>
        <label><input type="checkbox" checked={overlay} onChange={event => setOverlay(event.target.checked)} /> Tracking overlay</label>
        <label><input type="checkbox" checked={audio} disabled={!hasSpeech} onChange={event => { setAudio(event.target.checked); setSpeechNote(""); if (!event.target.checked && hasSpeech) window.speechSynthesis.cancel(); }} /> Announce final scores {hasSpeech ? "" : "(unavailable)"}</label>
        <span>{reduced ? "Reduced motion · static poses" : "No camera access needed"}</span>
      </div>
      <div className={styles.resultsHeading}><span>{view.phase === "complete" ? "YOUR SAMPLE SESSION REPORT" : "INDIVIDUAL RESULTS"}</span><span>{view.phase === "complete" ? "6 repetitions per student" : "Scores appear when the session ends"}</span></div>
      <div className={styles.results} data-participants={participants}>
        {PEOPLE.slice(0, participants).map((person, index) => <div className={styles.result} key={person.name} style={{ "--student-color": person.color } as React.CSSProperties}><div className={styles.student}><i /><span>{person.name}<small>Identity tracked separately</small></span></div><div className={styles.numbers}><span><strong data-testid={`reps-${index}`}>{view.reps[index]}</strong> reps received</span><span><strong>{view.phase === "complete" ? person.score : "—"}</strong> / 100<span className={styles.scoreLabel}>sample score</span></span></div></div>)}
      </div>
      {speechNote && <p className={styles.speechNote} role="status">{speechNote}</p>}
      <p className={styles.footnote}>Try three students, then raise the delay. Movement continues while each student’s results arrive independently. Scores illustrate the interface; they are not official exam criteria.</p>
    </div>
  );
}
