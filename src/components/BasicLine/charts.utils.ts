import * as d3Scale from 'd3-scale';

export const scaleFunction = (domain: number[], range: number[]) =>
  d3Scale.scaleLinear().domain(domain).range(range);
