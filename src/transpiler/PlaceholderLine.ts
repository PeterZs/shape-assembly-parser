import Placeholder from './Placeholder';
import Invocation from '../invocation/Invocation';
import ExpressionNode from '../expression/ExpressionNode';

type PlaceholderComponent = string | Placeholder;

export default class PlaceholderLine {
  constructor(
    private content: PlaceholderComponent[] = [],
    public argumentExpressions: ExpressionNode[],
    public readonly invocation?: Invocation,
  ) {}

  public add(...components: PlaceholderComponent[]): void {
    this.content.push(...components);
  }

  public replacePlaceholder(find: Placeholder, replace: PlaceholderComponent): void {
    this.content.forEach((entry, index) => {
      if (entry === find) {
        this.content[index] = replace;
      }
    });
  }

  public getAssignmentPlaceholder(): Placeholder | undefined {
    if (this.content.length >= 3 && this.content[1] instanceof Placeholder && this.content[2] === ' = ') {
      return this.content[1];
    }
    return undefined;
  }

  public fillPlaceholders(placeholderToText: Map<Placeholder, string>): void {
    this.content.forEach((entry) => {
      if (entry instanceof Placeholder) {
        entry.fill(placeholderToText.get(entry) ?? 'bbox');
      }
    });
  }

  public firstAssemblyPlaceholder(): Placeholder {
    const placeholder = this.content.find((entry) => entry instanceof Placeholder && entry.forAssembly);
    if (!placeholder || !(placeholder instanceof Placeholder)) {
      throw new Error('No assembly placeholder found.');
    }
    return placeholder;
  }

  public containsPlaceholder(placeholder: Placeholder): boolean {
    return this.content.some((entry) => entry === placeholder);
  }

  public copy(): PlaceholderLine {
    return new PlaceholderLine([...this.content], this.argumentExpressions);
  }

  public evaluate(): string {
    let line = '';
    for (const component of this.content) {
      if (component instanceof Placeholder) {
        line += component.getText();
      } else {
        line += component;
      }
    }
    return line;
  }
}
