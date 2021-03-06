import Token from '../token/Token';
import Statement from './Statement';
import SapError from '../error/SapError';
import TabError from '../error/TabError';
import IndentationError from '../error/IndentationError';

export default class StatementParser {
  public static readonly SPACES_PER_INDENTATION = 4;

  public parseStatements(tokens: Token[]): { statements: Statement[]; errors: SapError[] } {
    const lines = this.separateIntoLines(tokens);
    const statements: Statement[] = [];
    const errors: SapError[] = [];
    lines.forEach((line) => {
      let indentation = 0;
      if (line[0].isWhitespace) {
        // Validate indentation.
        if (line[0].text.includes('\t')) {
          errors.push(new TabError(line[0]));
          return;
        } else if (line[0].text.length % StatementParser.SPACES_PER_INDENTATION) {
          errors.push(new IndentationError(line[0], StatementParser.SPACES_PER_INDENTATION, line[0].text.length));
          return;
        } else {
          indentation = line[0].text.length / StatementParser.SPACES_PER_INDENTATION;
        }
      }
      statements.push(
        new Statement(
          line.filter((token) => !token.isWhitespace),
          indentation,
        ),
      );
    });
    return { statements, errors };
  }

  // Split tokens into non-whitespace lines.
  private separateIntoLines(tokens: Token[]): Token[][] {
    const lines: Token[][] = [];
    let line: Token[] = [];
    tokens.forEach((token) => {
      if (token.isNewline) {
        this.pushLineIfValid(line, lines);
        line = [];
      } else {
        line.push(token);
      }
    });
    this.pushLineIfValid(line, lines);
    return lines;
  }

  // A valid line contains non-whitespace tokens.
  private pushLineIfValid(line: Token[], lines: Token[][]) {
    if (line.some((token) => !token.isWhitespace)) {
      lines.push(line);
    }
  }
}
