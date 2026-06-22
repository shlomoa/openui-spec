import { DocumentationItems } from './documentation-items';

describe('DocumentationItems', () => {
  const docs = new DocumentationItems();

  it('groups components into categories', () => {
    const categories = docs.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.map((category) => category.id)).toContain('application-structure');
  });

  it('exposes every documented component by id', () => {
    const all = docs.getAllComponents();
    expect(all.length).toBeGreaterThan(0);
    for (const component of all) {
      expect(docs.getComponentById(component.id)).toBe(component);
    }
  });

  it('provides more than one example per component', () => {
    for (const component of docs.getAllComponents()) {
      expect(component.examples.length).toBeGreaterThan(1);
    }
  });

  it('derives API content from a spec document and provides styling', () => {
    for (const component of docs.getAllComponents()) {
      expect(component.api.specPath).toMatch(/^spec\/\d{2}-.*\.md$/);
      expect(component.api.points.length).toBeGreaterThan(0);
      expect(component.styling.notes.length).toBeGreaterThan(0);
      expect(component.styling.code.length).toBeGreaterThan(0);
    }
  });

  it('documents Section 22 acceptance criteria with runnable examples', () => {
    const component = docs.getComponentById('acceptance-criteria');

    expect(component?.api.specPath).toBe('spec/22-test-acceptance-criteria.md');
    expect(component?.examples.map((example) => example.preview)).toEqual([
      'acceptance-traceability',
      'acceptance-projection',
      'acceptance-evidence',
    ]);
  });

  it('documents Section 07 layout-system concepts with runnable examples', () => {
    const component = docs.getComponentById('page');

    expect(component?.api.specPath).toBe('spec/07-layout-system.md');
    expect(component?.examples.map((example) => example.preview)).toEqual([
      'page-card',
      'page-split',
      'page-responsive',
      'page-density',
      'page-dnd',
    ]);
  });

  it('returns undefined for an unknown component id', () => {
    expect(docs.getComponentById('does-not-exist')).toBeUndefined();
  });
});
