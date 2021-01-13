import vl from 'vega-lite-api';
export const viz = vl
	.markCircle({ 
    opacity: 0.2, 
    size: 100 
  })
  .encode(
    vl.x().fieldQ('weight').scale({ zero: false }),
    vl.y().fieldQ('horsepower').scale({ zero: false }),
		vl.tooltip().fieldN('name'),
    vl.color().fieldN('origin'),
    vl.size().fieldQ('mpg')
  );