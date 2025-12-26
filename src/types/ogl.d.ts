/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext;
    constructor(options?: Record<string, any>);
    setSize(width: number, height: number): void;
    render(options: Record<string, any>): void;
  }

  export class Program {
    uniforms: Record<string, any>;
    constructor(gl: WebGLRenderingContext, options: Record<string, any>);
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options?: Record<string, any>);
    setParent(parent: any): void;
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Vec2 {
    constructor(x?: number, y?: number);
  }

  export class Color {
    constructor(...args: number[]);
  }

  export class Float32Array extends globalThis.Float32Array {}
}
