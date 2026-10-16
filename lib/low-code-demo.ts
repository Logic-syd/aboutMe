export type BlockKind = 'heading' | 'text' | 'select' | 'group';
export type AppBlock = { id: string; kind: BlockKind; label: string; required: boolean; children: AppBlock[] };
export const componentTypes: { kind: BlockKind; label: string; symbol: string }[] = [
  { kind: 'heading', label: 'Heading', symbol: 'T' },
  { kind: 'text', label: 'Text field', symbol: 'Aa' },
  { kind: 'select', label: 'Select field', symbol: '⌄' },
  { kind: 'group', label: 'Field group', symbol: '▤' },
];
export const initialBlocks: AppBlock[] = [
  { id: 'title', kind: 'heading', label: 'A better day in the field.', required: false, children: [] },
  { id: 'visit', kind: 'group', label: 'Site visit', required: false, children: [
    { id: 'site', kind: 'text', label: 'Site name', required: true, children: [] },
    { id: 'priority', kind: 'select', label: 'Priority', required: false, children: [] },
  ] },
];
export function flattenBlocks(blocks: AppBlock[], parentId: string | null = null, depth = 0): { block: AppBlock; parentId: string | null; depth: number }[] {
  return blocks.flatMap(block => [{ block, parentId, depth }, ...flattenBlocks(block.children, block.id, depth + 1)]);
}
export function updateBlock(blocks: AppBlock[], id: string, patch: Partial<Pick<AppBlock, 'label' | 'required'>>): AppBlock[] {
  return blocks.map(block => block.id === id ? { ...block, ...patch } : { ...block, children: updateBlock(block.children, id, patch) });
}
export function removeBlock(blocks: AppBlock[], id: string): AppBlock[] {
  return blocks.filter(block => block.id !== id).map(block => ({ ...block, children: removeBlock(block.children, id) }));
}
export function placeBlock(blocks: AppBlock[], item: AppBlock, parentId: string | null, beforeId?: string): { blocks: AppBlock[]; error?: string } {
  const unchanged = (error: string) => ({ blocks, error });
  const all = flattenBlocks(blocks);
  if (beforeId === item.id) return { blocks };
  if (parentId && flattenBlocks([item]).some(({ block }) => block.id === parentId)) return unchanged('A group cannot be placed inside itself or its children.');
  if (parentId && !all.some(({ block }) => block.id === parentId && block.kind === 'group')) return unchanged('Choose the page or a field group as the destination.');
  if (!all.some(({ block }) => block.id === item.id) && all.length >= 10) return unchanged('This sample supports 10 components. Remove one to add another.');
  const remaining = removeBlock(blocks, item.id);
  function insert(list: AppBlock[]): AppBlock[] {
    const index = beforeId ? list.findIndex(block => block.id === beforeId) : list.length;
    const result = [...list]; result.splice(index < 0 ? result.length : index, 0, item); return result;
  }
  function into(list: AppBlock[]): AppBlock[] {
    return list.map(block => block.id === parentId ? { ...block, children: insert(block.children) } : { ...block, children: into(block.children) });
  }
  const next = parentId ? into(remaining) : insert(remaining);
  if (flattenBlocks(next).some(({ block, depth }) => depth > 2 || (block.kind === 'group' && depth > 1))) return unchanged('Keep this sample to two nested field groups.');
  return { blocks: next };
}
