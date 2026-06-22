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

  it('documents Section 06 application structure with generated examples', () => {
    const component = docs.getComponentById('shell');

    expect(component?.api.specPath).toBe('spec/06-application-structure.md');
    expect(component?.examples.map((example) => example.preview)).toEqual([
      'application-dependencies',
      'application-shell-metadata',
      'application-page-hierarchy',
      'application-structure-tree',
      'shell-side',
      'shell-toolbar',
    ]);
  });

  it('documents Section 05 UI Concept Model with generated examples', () => {
    const component = docs.getComponentById('ui-concept-model');

    expect(component?.api.specPath).toBe('spec/05-ui-concept-model.md');
    expect(component?.examples.map((example) => example.preview)).toEqual([
      'ui-concept-building-blocks',
      'ui-concept-named-regions',
      'ui-concept-form-dialog',
      'ui-concept-relationships',
    ]);
    expect(component?.api.points.join(' ')).toContain('Controls are standalone renderable units');
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

    const densityExample = component?.examples.find((example) => example.id === 'page-density');
    expect(densityExample).toMatchObject({
      title: 'Density and spacing page',
      preview: 'page-density',
    });
    expect(densityExample?.description).toContain('spacing scale');
    expect(densityExample?.code).toContain('.density-page.compact');

    const dndExample = component?.examples.find((example) => example.id === 'page-dnd');
    expect(dndExample).toMatchObject({
      title: 'Drag-and-drop region page',
      preview: 'page-dnd',
    });
    expect(dndExample?.description).toContain('ordered region');
    expect(dndExample?.code).toContain('board-columns');
  });

  it('documents Section 10 state model with public defaults and derived state examples', () => {
    const component = docs.getComponentById('state');

    expect(component?.api.specPath).toBe('spec/10-state-model.md');
    expect(component?.examples.map((example) => example.preview)).toEqual([
      'state-public',
      'state-derived',
    ]);
    expect(component?.api.points.join(' ')).toContain('hidden state stays out of generated APIs');

    const publicExample = component?.examples.find((example) => example.id === 'state-public-defaults');
    expect(publicExample?.code).toContain("readonly text = input('Submit order')");
    expect(publicExample?.code).toContain('readonly enabled = input(true)');
    expect(publicExample?.code).toContain("readonly type = input<ButtonType>('Default')");
    expect(publicExample?.code).not.toContain('_lastMeasuredWidth');

    const derivedExample = component?.examples.find((example) => example.id === 'state-derived-validation');
    expect(derivedExample?.code).toContain('computed<ValueState>');
    expect(derivedExample?.code).toContain("? 'Error' : this.valueState()");
    expect(derivedExample?.code).not.toContain('_lastMeasuredWidth');
  });

  it('returns undefined for an unknown component id', () => {
    expect(docs.getComponentById('does-not-exist')).toBeUndefined();
  });
});
