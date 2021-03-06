import TranspilerInverse from '../TranspilerInverse';

const TEST_PROGRAM = `
Assembly Program_0 {
	bbox = Cuboid(1.543, 0.506, 1.419, True)
	Program_1 = Cuboid(1.268, 0.46, 1.265, True)
	Program_2 = Cuboid(1.543, 0.105, 1.404, True)
	attach(Program_1, bbox, 0.5, 0.0, 0.5, 0.504, 0.001, 0.553)
	attach(Program_2, bbox, 0.5, 1.0, 0.5, 0.5, 1.0, 0.495)
	attach(Program_1, Program_2, 0.5, 1.0, 0.5, 0.504, 0.573, 0.559)
}
Assembly Program_1 {
	bbox = Cuboid(1.268, 0.46, 1.265, True)
	Program_3 = Cuboid(0.172, 0.402, 1.238, True)
	cube1 = Cuboid(1.02, 0.046, 0.101, True)
	attach(Program_3, bbox, 0.5, 0.0, 0.5, 0.067, 0.001, 0.489)
	attach(cube1, Program_3, 0.0, 0.5, 0.5, 0.718, 0.935, 0.06)
	reflect(Program_3, X)
	reflect(cube1, Z)
}
Assembly Program_2 {
	bbox = Cuboid(1.543, 0.105, 1.404, True)
	cube0 = Cuboid(1.437, 0.08, 1.337, True)
	cube1 = Cuboid(0.078, 0.043, 1.388, True)
	cube2 = Cuboid(1.477, 0.043, 0.069, True)
	attach(cube0, bbox, 0.5, 0.0, 0.5, 0.505, 0.0, 0.513)
	attach(cube1, bbox, 0.5, 1.0, 0.5, 0.025, 1.0, 0.494)
	attach(cube2, bbox, 0.5, 1.0, 0.5, 0.521, 1.0, 0.025)
	attach(cube1, cube0, 0.804, 0.217, 0.52, 0.001, 0.9, 0.502)
	attach(cube2, cube0, 0.488, 0.192, 0.778, 0.505, 0.887, 0.001)
	reflect(cube1, X)
	reflect(cube2, Z)
}
Assembly Program_3 {
	bbox = Cuboid(0.172, 0.402, 1.238, True)
	cube0 = Cuboid(0.172, 0.402, 0.135, True)
	cube1 = Cuboid(0.05, 0.042, 0.978, True)
	squeeze(cube0, bbox, bbox, top, 0.5, 0.055)
	attach(cube1, bbox, 0.5, 1.0, 0.5, 0.366, 0.994, 0.5)
	attach(cube1, cube0, 0.5, 0.5, 0.0, 0.366, 0.94, 0.961)
	reflect(cube0, Z)
}
`;

describe('TranspilerInverse Unit Tests', () => {
  let transpiler: TranspilerInverse;

  beforeEach(() => {
    transpiler = new TranspilerInverse();
  });

  test('newline is not whitespace', () => {
    const result = transpiler.transpile(TEST_PROGRAM);
    expect(result).toMatchSnapshot();
  });
});
