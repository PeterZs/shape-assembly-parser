import Token from '../token/Token';
import SapError from '../error/SapError';
import Invocation from '../invocation/Invocation';

export default interface SapType<T> {
  parse(token: Token, blocksInScope: Invocation[]): T | SapError;
  name: string;
}