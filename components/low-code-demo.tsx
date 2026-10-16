'use client';

import { useRef, useState, type DragEvent, type FormEvent } from 'react';
import { componentTypes, flattenBlocks, initialBlocks, placeBlock, removeBlock, updateBlock, type AppBlock, type BlockKind } from '@/lib/low-code-demo';
import styles from './low-code-demo.module.css';

type DragItem = { kind: BlockKind } | { id: string };
const themes = ['Forest', 'Plum', 'Ocean'] as const;

export function LowCodeDemo() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedId, setSelectedId] = useState('site');
  const [theme, setTheme] = useState<(typeof themes)[number]>('Forest');
  const [preview, setPreview] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('Drag a component, or click to add it.');
  const [receipt, setReceipt] = useState<{ label: string; value: string }[] | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef<DragItem | null>(null);
  const sequence = useRef(0);
  const all = flattenBlocks(blocks);
  const selected = all.find(({ block }) => block.id === selectedId);
  const fields = all.filter(({ block }) => block.kind === 'text' || block.kind === 'select');

  function insert(item: DragItem, parentId: string | null, beforeId?: string) {
    const block: AppBlock | undefined = 'id' in item ? all.find(entry => entry.block.id === item.id)?.block : {
      id: `block-${++sequence.current}`, kind: item.kind,
      label: componentTypes.find(type => type.kind === item.kind)!.label,
      required: false, children: [],
    };
    if (!block) return;
    const result = placeBlock(blocks, block, parentId, beforeId);
    if (result.error) { setMessage(result.error); return; }
    setBlocks(result.blocks); setSelectedId(block.id); setReceipt(null);
    setMessage(`${'id' in item ? 'Moved' : 'Added'} ${block.label} ${parentId ? 'inside ' + all.find(entry => entry.block.id === parentId)?.block.label : 'on the page'}.`);
  }
  function beginDrag(event: DragEvent, item: DragItem) {
    event.stopPropagation(); dragItem.current = item; setDragging(true);
    event.dataTransfer.effectAllowed = 'id' in item ? 'move' : 'copy';
    event.dataTransfer.setData('text/plain', 'id' in item ? item.id : item.kind);
  }
  function endDrag() { dragItem.current = null; setDragging(false); }
  function drop(event: DragEvent, parentId: string | null, beforeId?: string) {
    event.preventDefault(); event.stopPropagation();
    if (dragItem.current) insert(dragItem.current, parentId, beforeId);
    endDrag();
  }
  function allowDrop(event: DragEvent) { if (dragItem.current) { event.preventDefault(); event.stopPropagation(); } }
  function moveSelected(direction: -1 | 1) {
    if (!selected) return;
    const siblings = selected.parentId ? all.find(entry => entry.block.id === selected.parentId)!.block.children : blocks;
    const index = siblings.findIndex(block => block.id === selectedId);
    if (index + direction < 0 || index + direction >= siblings.length) return;
    insert({ id: selectedId }, selected.parentId, direction === -1 ? siblings[index - 1].id : siblings[index + 2]?.id);
  }
  function reset() {
    setBlocks(initialBlocks); setSelectedId('site'); setTheme('Forest'); setPreview(false);
    setValues({}); setReceipt(null); sequence.current = 0; endDrag(); setMessage('Sample page restored.');
  }
  function edit(patch: Partial<Pick<AppBlock, 'label' | 'required'>>) {
    setBlocks(updateBlock(blocks, selectedId, patch)); setReceipt(null);
  }
  function deleteSelected() {
    if (!selected) return;
    const removed = new Set(flattenBlocks([selected.block]).map(({ block }) => block.id));
    setBlocks(removeBlock(blocks, selectedId));
    setValues(Object.fromEntries(Object.entries(values).filter(([id]) => !removed.has(id))));
    setSelectedId(selected.parentId ?? ''); setReceipt(null); setMessage(`Removed ${selected.block.label} and its contents.`);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    setReceipt(fields.map(({ block }) => ({ label: block.label, value: values[block.id] || 'Not provided' })));
    setMessage('Sample submitted. Your values stay in this preview.');
  }
  function renderField(block: AppBlock, live: boolean) {
    if (block.kind === 'heading') return <h3 className={styles.appHeading}>{block.label || 'Untitled heading'}</h3>;
    const id = `sample-${block.id}`;
    return <div className={styles.field}>
      <label htmlFor={id}>{block.label || 'Untitled field'}{block.required && <span aria-label="required"> *</span>}</label>
      {block.kind === 'text' ? <input id={id} required={live && block.required} readOnly={!live} tabIndex={live ? 0 : -1} value={values[block.id] ?? ''} placeholder="Enter a value" onChange={event => { setValues({ ...values, [block.id]: event.target.value }); setReceipt(null); }} /> :
        <select id={id} required={live && block.required} disabled={!live} value={values[block.id] ?? ''} onChange={event => { setValues({ ...values, [block.id]: event.target.value }); setReceipt(null); }}><option value="">Choose an option</option><option>Routine</option><option>Normal</option><option>Urgent</option></select>}
    </div>;
  }
  function renderLive(list: AppBlock[]) {
    return list.map(block => block.kind === 'group' ? <fieldset key={block.id} className={styles.appGroup}><legend>{block.label || 'Untitled group'}</legend>{renderLive(block.children)}</fieldset> : <div key={block.id}>{renderField(block, true)}</div>);
  }
  function renderEditor(list: AppBlock[], parentId: string | null = null) {
    return list.map(block => <div key={block.id} className={`${styles.block} ${selectedId === block.id ? styles.selected : ''}`} data-block-id={block.id} onDragOver={allowDrop} onDrop={event => drop(event, parentId, block.id)}>
      <div className={styles.blockBar}>
        <button type="button" className={styles.dragHandle} draggable onDragStart={event => beginDrag(event, { id: block.id })} onDragEnd={endDrag} onClick={() => setSelectedId(block.id)} aria-label={`Move ${block.label}`}>⠿</button>
        <button type="button" className={styles.selectBlock} aria-pressed={selectedId === block.id} onClick={() => setSelectedId(block.id)}>{block.kind === 'group' ? block.label || 'Untitled group' : componentTypes.find(type => type.kind === block.kind)!.label}<span>{block.kind === 'group' ? `${block.children.length} items` : 'Edit'}</span></button>
      </div>
      {block.kind === 'group' ? <div className={styles.groupBody} onDragOver={allowDrop} onDrop={event => drop(event, block.id)}>{renderEditor(block.children, block.id)}<div className={styles.dropHint} data-testid={`drop-${block.id}`}>Drop inside {block.label || 'this group'}</div></div> : <div className={styles.sampleField} onClick={() => setSelectedId(block.id)}>{renderField(block, false)}</div>}
    </div>);
  }
  const siblingList = selected?.parentId ? all.find(entry => entry.block.id === selected.parentId)!.block.children : blocks;
  const selectedIndex = siblingList.findIndex(block => block.id === selectedId);

  return <div className={styles.demo} data-case-demo="low-code">
    <div className={styles.toolbar}><div className={styles.mode} role="group" aria-label="Builder mode"><button type="button" aria-pressed={!preview} onClick={() => setPreview(false)}>Build</button><button type="button" aria-pressed={preview} onClick={() => { setPreview(true); endDrag(); setMessage('Try the app you just assembled.'); }}>Try your app</button></div>
      <div className={styles.themes} role="group" aria-label="App theme">{themes.map(item => <button key={item} type="button" data-color={item} aria-label={`${item} theme`} aria-pressed={theme === item} onClick={() => setTheme(item)}><i />{item}</button>)}</div><button type="button" className={styles.reset} onClick={reset}>Reset</button></div>
    <div className={styles.workspace}>
      <aside className={styles.palette}><p className={styles.eyebrow}>01 / COMPONENTS</p><p className={styles.hint}>Drag in, or click to add.</p><div className={styles.componentList}>{componentTypes.map(type => <button type="button" key={type.kind} draggable={!preview} disabled={preview} onDragStart={event => beginDrag(event, { kind: type.kind })} onDragEnd={endDrag} onClick={() => insert({ kind: type.kind }, selected?.block.kind === 'group' ? selectedId : null)} aria-label={`Add ${type.label}`}><span>{type.symbol}</span>{type.label}<b>+</b></button>)}</div><p className={styles.hint}>Field groups hold other components. Select a group to add inside it.</p></aside>
      <div className={styles.canvas} data-theme={theme} data-dragging={dragging}>
        <div className={styles.canvasHeader}><span>FIELD NOTES</span><span>{preview ? 'YOUR APP' : 'LIVE CANVAS'}</span></div>
        <div className={styles.canvasBody}>
          {preview ? <form className={styles.appForm} onSubmit={submit}>{renderLive(blocks)}<button type="submit" className={styles.submit}>Submit sample</button></form> : <div className={styles.editor}>{renderEditor(blocks)}<div className={styles.pageDrop} data-testid="drop-page" onDragOver={allowDrop} onDrop={event => drop(event, null)}>+ Drop a component on the page</div></div>}
        </div>
      </div>
      <aside className={styles.inspector}>
        <p className={styles.eyebrow}>{preview ? '03 / TRY IT OUT' : '03 / PROPERTIES'}</p>
        {preview ? <><h3>A page of your own.</h3><p className={styles.hint}>Fill the fields and submit a sample. Switch themes without losing your inputs.</p>{receipt && <dl className={styles.receipt} aria-label="Submitted sample">{receipt.map((item, index) => <div key={index}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}</> : selected ? <>
          <label className={styles.property}>Label<input maxLength={48} value={selected.block.label} onChange={event => edit({ label: event.target.value })} /></label>
          {(selected.block.kind === 'text' || selected.block.kind === 'select') && <label className={styles.required}><input type="checkbox" checked={selected.block.required} onChange={event => edit({ required: event.target.checked })} />Required field</label>}
          <label className={styles.property}>Place inside<select value={selected.parentId ?? ''} onChange={event => insert({ id: selectedId }, event.target.value || null)}><option value="">Page root</option>{all.filter(({ block }) => block.kind === 'group' && !flattenBlocks([selected.block]).some(item => item.block.id === block.id)).map(({ block, depth }) => <option key={block.id} value={block.id}>{'— '.repeat(depth)}{block.label || 'Untitled group'}</option>)}</select></label>
          <div className={styles.reorder}><button type="button" disabled={selectedIndex <= 0} onClick={() => moveSelected(-1)}>Move up ↑</button><button type="button" disabled={selectedIndex < 0 || selectedIndex === siblingList.length - 1} onClick={() => moveSelected(1)}>Move down ↓</button></div>
          <button type="button" className={styles.remove} onClick={deleteSelected}>Remove component</button><p className={styles.hint}>Drag onto a component to place before it. Use “Place inside” to change its parent without dragging.</p>
        </> : <p className={styles.hint}>Select a component on the canvas to change its properties.</p>}
      </aside>
    </div>
    <div className={styles.status}><span role="status">{message}</span><span>{all.length}/10 components</span></div>
    <p className={styles.disclosure}>Interactive reconstruction · Sample components and local data.</p>
  </div>;
}
