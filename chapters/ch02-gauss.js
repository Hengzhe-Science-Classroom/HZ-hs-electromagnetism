// === Chapter 2: Field Lines & Gauss's Law Intuition ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch02',
        number: 2,
        title: "Field Lines & Gauss's Law",
        subtitle: 'Tracing the invisible and counting what crosses a surface',
        file: 'ch02-gauss',

        sections: [
            // ============================================================
            // Section 0: Drawing Field Lines
            // ============================================================
            {
                id: 'drawing-field-lines',
                title: 'Drawing Field Lines',
                content: `
<h2>Faraday's Brilliant Invention</h2>

<p>Michael Faraday could not do advanced calculus, but he had something better: extraordinary physical intuition. He invented <strong>electric field lines</strong> as a way to visualize electric fields. A field line is an imaginary curve in space that is everywhere tangent to the electric field vector.</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Field Line</div>
<div class="env-body">
<p>An <strong>electric field line</strong> is a curve such that the tangent to the curve at every point gives the direction of \\(\\vec{E}\\) at that point. Field lines are drawn so that their density (the number of lines per unit area perpendicular to the lines) is proportional to the field strength \\(|\\vec{E}|\\).</p>
</div>
</div>

<p>For a single positive charge, the field lines are straight rays pointing radially outward, like the spines of a sea urchin. For a negative charge, they point radially inward. The lines are closer together near the charge (where the field is strong) and spread apart far away (where the field is weak).</p>

<div class="env-block intuition">
<div class="env-title">How to trace a field line</div>
<div class="env-body">
<p>Start at a point near a positive charge. Look at the local \\(\\vec{E}\\) direction. Take a tiny step in that direction. At the new point, look at \\(\\vec{E}\\) again. Take another tiny step. Continue. The path you trace is a field line. This is exactly what our visualization does, using a numerical integrator (RK4) to follow the field with high accuracy.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-field-lines"></div>

<h3>What Field Lines Tell You</h3>

<ul>
<li><strong>Direction of \\(\\vec{E}\\)</strong>: tangent to the line at each point.</li>
<li><strong>Strength of \\(\\vec{E}\\)</strong>: where lines are densely packed, the field is strong. Where they are sparse, the field is weak.</li>
<li><strong>No crossing</strong>: field lines never cross. If they did, the field would have two directions at the crossing point, which is impossible (the field is a unique vector at each point).</li>
</ul>
`,
                visualizations: [
                    {
                        id: 'viz-field-lines',
                        title: 'Electric Field Lines (RK4 Traced)',
                        description: 'Smooth field lines traced from source charges using a high-accuracy integrator. Drag charges to reshape the field pattern in real time. Lines start from positive charges and end on negative charges.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var charges = [
                                { x: -3, y: 0, q: 1 },
                                { x: 3, y: 0, q: -1 }
                            ];
                            var numLines = 16;

                            var drags = [];
                            function rebuildDrags() {
                                viz.draggables = [];
                                drags = charges.map(function (c, i) {
                                    return viz.addDraggable('q' + i, c.x, c.y, c.q > 0 ? viz.colors.red : viz.colors.blue, 12);
                                });
                            }
                            rebuildDrags();

                            VizEngine.createButton(controls, 'Dipole', function () {
                                charges = [{ x: -3, y: 0, q: 1 }, { x: 3, y: 0, q: -1 }];
                                rebuildDrags();
                            });
                            VizEngine.createButton(controls, 'Two +', function () {
                                charges = [{ x: -2.5, y: 0, q: 1 }, { x: 2.5, y: 0, q: 1 }];
                                rebuildDrags();
                            });
                            VizEngine.createButton(controls, 'Quad', function () {
                                charges = [
                                    { x: -2, y: 2, q: 1 }, { x: 2, y: 2, q: -1 },
                                    { x: -2, y: -2, q: -1 }, { x: 2, y: -2, q: 1 }
                                ];
                                rebuildDrags();
                            });
                            VizEngine.createButton(controls, '+2/\u22121', function () {
                                charges = [{ x: -2.5, y: 0, q: 2 }, { x: 2.5, y: 0, q: -1 }];
                                rebuildDrags();
                            });

                            var linesSlider = VizEngine.createSlider(controls, 'Lines per +1', 8, 24, numLines, 2, function (v) { numLines = Math.round(v); });

                            function fieldAt(px, py) {
                                var Ex = 0, Ey = 0;
                                for (var i = 0; i < charges.length; i++) {
                                    var dx = px - charges[i].x;
                                    var dy = py - charges[i].y;
                                    var r2 = dx * dx + dy * dy;
                                    if (r2 < 0.04) r2 = 0.04;
                                    var r = Math.sqrt(r2);
                                    var E = charges[i].q / r2;
                                    Ex += E * dx / r;
                                    Ey += E * dy / r;
                                }
                                return [Ex, Ey];
                            }

                            function traceFieldLine(x0, y0, direction, maxSteps) {
                                var pts = [[x0, y0]];
                                var x = x0, y = y0;
                                var ds = 0.06 * direction; // step size
                                var xBound = viz.originX / viz.scale + 2;
                                var yBound = viz.originY / viz.scale + 2;

                                for (var s = 0; s < maxSteps; s++) {
                                    // RK4 integration of dx/ds = Ex/|E|, dy/ds = Ey/|E|
                                    var derivs = function (state) {
                                        var E = fieldAt(state[0], state[1]);
                                        var m = Math.sqrt(E[0] * E[0] + E[1] * E[1]);
                                        if (m < 1e-8) return [0, 0];
                                        return [E[0] / m, E[1] / m];
                                    };

                                    var k1 = derivs([x, y]);
                                    var k2 = derivs([x + 0.5 * ds * k1[0], y + 0.5 * ds * k1[1]]);
                                    var k3 = derivs([x + 0.5 * ds * k2[0], y + 0.5 * ds * k2[1]]);
                                    var k4 = derivs([x + ds * k3[0], y + ds * k3[1]]);

                                    x += (ds / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
                                    y += (ds / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);

                                    // Boundary check
                                    if (Math.abs(x) > xBound || Math.abs(y) > yBound) break;

                                    // Termination: hit a negative charge
                                    var terminated = false;
                                    for (var ci = 0; ci < charges.length; ci++) {
                                        var ddx = x - charges[ci].x;
                                        var ddy = y - charges[ci].y;
                                        if (ddx * ddx + ddy * ddy < 0.15) {
                                            terminated = true;
                                            break;
                                        }
                                    }

                                    pts.push([x, y]);
                                    if (terminated) break;
                                }
                                return pts;
                            }

                            function draw() {
                                for (var i = 0; i < charges.length; i++) {
                                    if (drags[i]) {
                                        charges[i].x = drags[i].x;
                                        charges[i].y = drags[i].y;
                                        drags[i].color = charges[i].q > 0 ? viz.colors.red : viz.colors.blue;
                                    }
                                }

                                viz.clear();

                                // Trace field lines from positive charges
                                for (var ci = 0; ci < charges.length; ci++) {
                                    if (charges[ci].q <= 0) continue;
                                    var nLines = Math.round(numLines * Math.abs(charges[ci].q));
                                    var startR = 0.35;
                                    for (var li = 0; li < nLines; li++) {
                                        var angle = (2 * Math.PI * li) / nLines;
                                        var sx = charges[ci].x + startR * Math.cos(angle);
                                        var sy = charges[ci].y + startR * Math.sin(angle);
                                        var pts = traceFieldLine(sx, sy, 1, 600);

                                        // Draw the line with gradient
                                        if (pts.length < 2) continue;
                                        ctx.lineWidth = 1.8;
                                        for (var pi = 1; pi < pts.length; pi++) {
                                            var t = pi / pts.length;
                                            var alpha = 0.2 + 0.6 * (1 - t * 0.5);
                                            // Color gradient: warm near +, cool near -
                                            var hue = t * 200; // 0=red -> 200=cyan
                                            ctx.strokeStyle = 'hsla(' + hue + ',80%,60%,' + alpha + ')';
                                            ctx.beginPath();
                                            var p1 = viz.toScreen(pts[pi - 1][0], pts[pi - 1][1]);
                                            var p2 = viz.toScreen(pts[pi][0], pts[pi][1]);
                                            ctx.moveTo(p1[0], p1[1]);
                                            ctx.lineTo(p2[0], p2[1]);
                                            ctx.stroke();
                                        }

                                        // Arrowhead at midpoint
                                        var mid = Math.floor(pts.length * 0.4);
                                        if (mid > 0 && mid < pts.length - 1) {
                                            var pm = viz.toScreen(pts[mid][0], pts[mid][1]);
                                            var pn = viz.toScreen(pts[mid + 1][0], pts[mid + 1][1]);
                                            var adx = pn[0] - pm[0], ady = pn[1] - pm[1];
                                            var alen = Math.sqrt(adx * adx + ady * ady);
                                            if (alen > 2) {
                                                var aAngle = Math.atan2(ady, adx);
                                                var hs = 6;
                                                ctx.fillStyle = 'hsla(100,80%,60%,0.7)';
                                                ctx.beginPath();
                                                ctx.moveTo(pm[0] + hs * Math.cos(aAngle), pm[1] + hs * Math.sin(aAngle));
                                                ctx.lineTo(pm[0] + hs * Math.cos(aAngle - 2.5), pm[1] + hs * Math.sin(aAngle - 2.5));
                                                ctx.lineTo(pm[0] + hs * Math.cos(aAngle + 2.5), pm[1] + hs * Math.sin(aAngle + 2.5));
                                                ctx.closePath();
                                                ctx.fill();
                                            }
                                        }
                                    }
                                }

                                // If there are only negative charges, trace lines inward
                                var hasPositive = charges.some(function (c) { return c.q > 0; });
                                if (!hasPositive) {
                                    for (var ci2 = 0; ci2 < charges.length; ci2++) {
                                        if (charges[ci2].q >= 0) continue;
                                        var nLines2 = Math.round(numLines * Math.abs(charges[ci2].q));
                                        for (var li2 = 0; li2 < nLines2; li2++) {
                                            var angle2 = (2 * Math.PI * li2) / nLines2;
                                            var sx2 = charges[ci2].x + 0.35 * Math.cos(angle2);
                                            var sy2 = charges[ci2].y + 0.35 * Math.sin(angle2);
                                            var pts2 = traceFieldLine(sx2, sy2, -1, 600);
                                            if (pts2.length < 2) continue;
                                            ctx.lineWidth = 1.8;
                                            for (var pi2 = 1; pi2 < pts2.length; pi2++) {
                                                var t2 = pi2 / pts2.length;
                                                ctx.strokeStyle = 'hsla(220,80%,60%,' + (0.2 + 0.6 * (1 - t2 * 0.5)) + ')';
                                                ctx.beginPath();
                                                var pp1 = viz.toScreen(pts2[pi2 - 1][0], pts2[pi2 - 1][1]);
                                                var pp2 = viz.toScreen(pts2[pi2][0], pts2[pi2][1]);
                                                ctx.moveTo(pp1[0], pp1[1]);
                                                ctx.lineTo(pp2[0], pp2[1]);
                                                ctx.stroke();
                                            }
                                        }
                                    }
                                }

                                // Draw charges
                                for (var ci3 = 0; ci3 < charges.length; ci3++) {
                                    var cc = charges[ci3].q > 0 ? viz.colors.red : viz.colors.blue;
                                    viz.drawBall(charges[ci3].x, charges[ci3].y, 0.3, cc, 3);
                                    viz.drawText(charges[ci3].q > 0 ? '+' + Math.abs(charges[ci3].q) : '\u2212' + Math.abs(charges[ci3].q),
                                        charges[ci3].x, charges[ci3].y, viz.colors.white, 14, 'center', 'middle');
                                }

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Can two electric field lines ever cross each other? Explain.',
                        hint: 'What would it mean for the electric field direction at the crossing point?',
                        solution: 'No. At a crossing point, the field would have to point in two different directions simultaneously (tangent to both lines). Since \\(\\vec{E}\\) is a unique vector at each point, this is impossible.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Rules for Field Lines
            // ============================================================
            {
                id: 'field-line-rules',
                title: 'Rules for Field Lines',
                content: `
<h2>The Grammar of Field Lines</h2>

<p>Field lines are not arbitrary curves. They obey strict rules that encode the physics of electric fields:</p>

<div class="env-block theorem">
<div class="env-title">Rules for Electric Field Lines</div>
<div class="env-body">
<ol>
<li><strong>Start and end</strong>: Field lines originate on positive charges and terminate on negative charges. If there is an excess of one sign, some lines extend to infinity.</li>
<li><strong>Never cross</strong>: Two field lines never intersect.</li>
<li><strong>Number is proportional to charge</strong>: The number of lines leaving a charge \\(+q\\) (or entering a charge \\(-q\\)) is proportional to \\(|q|\\). A charge of \\(+2q\\) has twice as many lines as \\(+q\\).</li>
<li><strong>Density encodes strength</strong>: The number of field lines per unit area perpendicular to the lines is proportional to \\(|\\vec{E}|\\).</li>
<li><strong>Symmetry</strong>: The field line pattern reflects the symmetry of the charge distribution.</li>
</ol>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Asymmetric Charges</div>
<div class="env-body">
<p>A charge of \\(+2q\\) is placed near a charge of \\(-q\\). If we draw 16 lines from the \\(+2q\\), then 8 of them must terminate on \\(-q\\) (proportional to its magnitude), and the remaining 8 lines escape to infinity. Try the "+2/&minus;1" preset in the visualization above to see this pattern.</p>
</div>
</div>

<h3>Field Lines and Conductors</h3>

<p>At the surface of a conductor in electrostatic equilibrium:</p>
<ul>
<li>Field lines are perpendicular to the surface.</li>
<li>The field inside the conductor is zero (if it were not, the free charges would move until it became zero).</li>
<li>All excess charge resides on the surface.</li>
</ul>

<div class="env-block remark">
<div class="env-title">Field lines are a visualization tool</div>
<div class="env-body">
<p>Field lines are a powerful way to think about fields, but they are a human invention. The field itself is a continuous vector quantity at every point. We choose to draw a finite number of lines for clarity. The choice of how many lines to draw is a convention (e.g., "16 lines per microcoulomb"), not a physical fact.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A charge of \\(+3q\\) is near a charge of \\(-q\\). If we draw 12 field lines from the positive charge, how many terminate on the negative charge and how many go to infinity?',
                        hint: 'The number of lines is proportional to the magnitude of the charge.',
                        solution: 'The negative charge has magnitude \\(q\\), which is \\(1/3\\) of the positive charge. So \\(12 \\times (1/3) = 4\\) lines terminate on \\(-q\\). The remaining \\(12 - 4 = 8\\) lines escape to infinity.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Electric Flux Intuition
            // ============================================================
            {
                id: 'electric-flux',
                title: 'Electric Flux Intuition',
                content: `
<h2>Counting Field Lines Through a Surface</h2>

<p>Imagine holding a hula hoop in a region of space filled with electric field lines. How many lines pass through the hoop? This "flow" of field lines through a surface is called <strong>electric flux</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Flux</div>
<div class="env-body">
<p>The <strong>electric flux</strong> \\(\\Phi_E\\) through a surface is:</p>
\\[\\Phi_E = \\int \\vec{E} \\cdot d\\vec{A}\\]
<p>For a uniform field passing through a flat surface of area \\(A\\) at angle \\(\\theta\\) to the normal:</p>
\\[\\Phi_E = EA\\cos\\theta\\]
<p>Units: N&middot;m&sup2;/C (or V&middot;m).</p>
</div>
</div>

<p>The flux depends on three things:</p>
<ol>
<li><strong>Field strength</strong>: stronger field, more flux.</li>
<li><strong>Surface area</strong>: larger surface, more flux.</li>
<li><strong>Orientation</strong>: if the surface is perpendicular to the field (\\(\\theta = 0\\)), flux is maximized. If parallel to the field (\\(\\theta = 90°\\)), no field lines pass through and the flux is zero.</li>
</ol>

<div class="env-block intuition">
<div class="env-title">The rain analogy</div>
<div class="env-body">
<p>Think of rain falling vertically. A bucket held upright catches the most rain (maximum flux). Tilt the bucket and it catches less. Turn it sideways and it catches none. The "flux of rain" through the bucket opening depends on the angle between the rain and the bucket, just as electric flux depends on the angle between \\(\\vec{E}\\) and the surface normal.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body">
<p>A uniform field \\(E = 500\\,\\text{N/C}\\) passes through a rectangular surface of area \\(0.04\\,\\text{m}^2\\). The field makes an angle of \\(30°\\) with the surface normal.</p>
\\[\\Phi_E = EA\\cos\\theta = 500 \\times 0.04 \\times \\cos 30° = 500 \\times 0.04 \\times 0.866 = 17.3\\,\\text{N}\\cdot\\text{m}^2/\\text{C}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A uniform electric field of magnitude \\(200\\,\\text{N/C}\\) passes through a circular surface of radius 0.1 m. The surface normal is parallel to the field. What is the flux?',
                        hint: '\\(\\Phi = EA\\cos\\theta\\). What is \\(\\theta\\) when the normal is parallel to the field?',
                        solution: '\\(\\theta = 0\\), so \\(\\cos\\theta = 1\\). Area \\(A = \\pi(0.1)^2 = 0.0314\\,\\text{m}^2\\). Flux: \\(\\Phi = 200 \\times 0.0314 \\times 1 = 6.28\\,\\text{N}\\cdot\\text{m}^2/\\text{C}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Gauss's Law (Qualitative)
            // ============================================================
            {
                id: 'gauss-law',
                title: "Gauss's Law (Qualitative)",
                content: `
<h2>The Total Flux Through a Closed Surface</h2>

<p>Now consider a <em>closed</em> surface (a surface that completely encloses a volume, like a sphere or a cube). Count the net number of field lines leaving the surface: lines going out count as positive, lines going in count as negative.</p>

<div class="env-block theorem">
<div class="env-title">Gauss's Law</div>
<div class="env-body">
<p>The net electric flux through any closed surface is proportional to the total charge enclosed:</p>
\\[\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}\\]
<p>where \\(Q_{\\text{enc}}\\) is the total charge inside the surface and \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\,\\text{C}^2/(\\text{N}\\cdot\\text{m}^2)\\).</p>
</div>
</div>

<p>This is a profound result. It does not matter what shape the closed surface is, how large it is, or what charges are outside it. The only thing that determines the net flux is the charge enclosed.</p>

<div class="viz-placeholder" data-viz="viz-gauss-surface"></div>

<div class="env-block intuition">
<div class="env-title">Why Gauss's law works</div>
<div class="env-body">
<p>Every field line that starts on a positive charge inside the surface must eventually cross the surface on its way out (contributing +1 to the count). Every field line from a negative charge inside must cross inward (contributing &minus;1). Field lines from charges <em>outside</em> the surface enter and then exit, contributing zero net flux. So the net count is simply proportional to the enclosed charge.</p>
</div>
</div>

<h3>The Gaussian Surface</h3>

<p>The closed surface in Gauss's law is called a <strong>Gaussian surface</strong>. It is a mathematical construct, not a physical object. You choose it to exploit symmetry. Common choices:</p>

<ul>
<li><strong>Sphere</strong> centered on a point charge: \\(\\vec{E}\\) is constant on the surface and perpendicular to it, so \\(\\Phi = E \\times 4\\pi r^2\\).</li>
<li><strong>Cylinder</strong> around an infinite line of charge: exploits cylindrical symmetry.</li>
<li><strong>Pill box</strong> straddling a charged plane: exploits planar symmetry.</li>
</ul>
`,
                visualizations: [
                    {
                        id: 'viz-gauss-surface',
                        title: "Gauss's Law: Flux Through a Closed Surface",
                        description: 'A Gaussian surface (dashed circle) encloses some charges. Field lines cross the surface. The net flux counter shows lines out minus lines in. Drag charges inside or outside the surface to see Gauss\'s law in action.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var charges = [
                                { x: -1, y: 0.5, q: 1 },
                                { x: 1, y: -0.5, q: -1 },
                                { x: 4.5, y: 2, q: 1 }
                            ];

                            var gaussR = 3.0; // Gaussian surface radius in world units
                            var numLines = 12;

                            var drags = [];
                            function rebuildDrags() {
                                viz.draggables = [];
                                drags = charges.map(function (c, i) {
                                    return viz.addDraggable('q' + i, c.x, c.y, c.q > 0 ? viz.colors.red : viz.colors.blue, 12);
                                });
                            }
                            rebuildDrags();

                            VizEngine.createSlider(controls, 'Surface radius', 1.5, 5.5, gaussR, 0.5, function (v) { gaussR = v; });
                            VizEngine.createButton(controls, 'Add + inside', function () {
                                charges.push({ x: 0, y: 0, q: 1 }); rebuildDrags();
                            });
                            VizEngine.createButton(controls, 'Add \u2212 inside', function () {
                                charges.push({ x: 0, y: 0, q: -1 }); rebuildDrags();
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                charges = [{ x: -1, y: 0.5, q: 1 }, { x: 1, y: -0.5, q: -1 }, { x: 4.5, y: 2, q: 1 }];
                                rebuildDrags();
                            });

                            function fieldAt(px, py) {
                                var Ex = 0, Ey = 0;
                                for (var i = 0; i < charges.length; i++) {
                                    var dx = px - charges[i].x;
                                    var dy = py - charges[i].y;
                                    var r2 = dx * dx + dy * dy;
                                    if (r2 < 0.04) r2 = 0.04;
                                    var r = Math.sqrt(r2);
                                    var E = charges[i].q / r2;
                                    Ex += E * dx / r;
                                    Ey += E * dy / r;
                                }
                                return [Ex, Ey];
                            }

                            function traceFieldLine(x0, y0, dir, maxSteps) {
                                var pts = [[x0, y0]];
                                var x = x0, y = y0;
                                var ds = 0.06 * dir;
                                var bound = 10;
                                for (var s = 0; s < maxSteps; s++) {
                                    var derivs = function (state) {
                                        var E = fieldAt(state[0], state[1]);
                                        var m = Math.sqrt(E[0] * E[0] + E[1] * E[1]);
                                        if (m < 1e-8) return [0, 0];
                                        return [E[0] / m, E[1] / m];
                                    };
                                    var k1 = derivs([x, y]);
                                    var k2 = derivs([x + 0.5 * ds * k1[0], y + 0.5 * ds * k1[1]]);
                                    var k3 = derivs([x + 0.5 * ds * k2[0], y + 0.5 * ds * k2[1]]);
                                    var k4 = derivs([x + ds * k3[0], y + ds * k3[1]]);
                                    x += (ds / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
                                    y += (ds / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
                                    if (x * x + y * y > bound * bound) break;
                                    var terminated = false;
                                    for (var ci = 0; ci < charges.length; ci++) {
                                        var ddx = x - charges[ci].x;
                                        var ddy = y - charges[ci].y;
                                        if (ddx * ddx + ddy * ddy < 0.12) { terminated = true; break; }
                                    }
                                    pts.push([x, y]);
                                    if (terminated) break;
                                }
                                return pts;
                            }

                            function draw() {
                                for (var i = 0; i < charges.length; i++) {
                                    if (drags[i]) {
                                        charges[i].x = drags[i].x;
                                        charges[i].y = drags[i].y;
                                        drags[i].color = charges[i].q > 0 ? viz.colors.red : viz.colors.blue;
                                    }
                                }

                                viz.clear();

                                // Draw Gaussian surface (dashed circle with glow)
                                var sc = viz.toScreen(0, 0);
                                var sR = gaussR * viz.scale;
                                ctx.save();
                                var gGlow = ctx.createRadialGradient(sc[0], sc[1], sR - 5, sc[0], sc[1], sR + 10);
                                gGlow.addColorStop(0, 'rgba(63,185,80,0)');
                                gGlow.addColorStop(0.5, 'rgba(63,185,80,0.08)');
                                gGlow.addColorStop(1, 'rgba(63,185,80,0)');
                                ctx.fillStyle = gGlow;
                                ctx.beginPath(); ctx.arc(sc[0], sc[1], sR + 10, 0, Math.PI * 2); ctx.fill();

                                // Interior tint
                                ctx.fillStyle = 'rgba(63,185,80,0.03)';
                                ctx.beginPath(); ctx.arc(sc[0], sc[1], sR, 0, Math.PI * 2); ctx.fill();

                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([8, 6]);
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], sR, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.restore();

                                // Trace field lines from positive charges
                                for (var ci = 0; ci < charges.length; ci++) {
                                    if (charges[ci].q <= 0) continue;
                                    var nLines = Math.round(numLines * Math.abs(charges[ci].q));
                                    for (var li = 0; li < nLines; li++) {
                                        var angle = (2 * Math.PI * li) / nLines;
                                        var sx = charges[ci].x + 0.3 * Math.cos(angle);
                                        var sy = charges[ci].y + 0.3 * Math.sin(angle);
                                        var pts = traceFieldLine(sx, sy, 1, 500);
                                        if (pts.length < 2) continue;
                                        ctx.lineWidth = 1.5;
                                        for (var pi = 1; pi < pts.length; pi++) {
                                            var tt = pi / pts.length;
                                            ctx.strokeStyle = 'hsla(' + (tt * 200) + ',75%,55%,' + (0.3 + 0.5 * (1 - tt * 0.5)) + ')';
                                            ctx.beginPath();
                                            var p1 = viz.toScreen(pts[pi - 1][0], pts[pi - 1][1]);
                                            var p2 = viz.toScreen(pts[pi][0], pts[pi][1]);
                                            ctx.moveTo(p1[0], p1[1]);
                                            ctx.lineTo(p2[0], p2[1]);
                                            ctx.stroke();
                                        }
                                    }
                                }

                                // If only negative charges, trace backward
                                var hasPos = charges.some(function (c) { return c.q > 0; });
                                if (!hasPos) {
                                    for (var ci2 = 0; ci2 < charges.length; ci2++) {
                                        if (charges[ci2].q >= 0) continue;
                                        var nL2 = Math.round(numLines * Math.abs(charges[ci2].q));
                                        for (var li2 = 0; li2 < nL2; li2++) {
                                            var a2 = (2 * Math.PI * li2) / nL2;
                                            var sx2 = charges[ci2].x + 0.3 * Math.cos(a2);
                                            var sy2 = charges[ci2].y + 0.3 * Math.sin(a2);
                                            var pts2 = traceFieldLine(sx2, sy2, -1, 500);
                                            if (pts2.length < 2) continue;
                                            ctx.lineWidth = 1.5;
                                            for (var pi2 = 1; pi2 < pts2.length; pi2++) {
                                                ctx.strokeStyle = 'hsla(220,75%,55%,' + (0.3 + 0.4 * (1 - pi2 / pts2.length)) + ')';
                                                ctx.beginPath();
                                                var pp1 = viz.toScreen(pts2[pi2 - 1][0], pts2[pi2 - 1][1]);
                                                var pp2 = viz.toScreen(pts2[pi2][0], pts2[pi2][1]);
                                                ctx.moveTo(pp1[0], pp1[1]);
                                                ctx.lineTo(pp2[0], pp2[1]);
                                                ctx.stroke();
                                            }
                                        }
                                    }
                                }

                                // Compute enclosed charge
                                var Qenc = 0;
                                for (var ci3 = 0; ci3 < charges.length; ci3++) {
                                    var dist = Math.sqrt(charges[ci3].x * charges[ci3].x + charges[ci3].y * charges[ci3].y);
                                    if (dist < gaussR) {
                                        Qenc += charges[ci3].q;
                                    }
                                }

                                // Draw charges
                                for (var ci4 = 0; ci4 < charges.length; ci4++) {
                                    var cc = charges[ci4].q > 0 ? viz.colors.red : viz.colors.blue;
                                    viz.drawBall(charges[ci4].x, charges[ci4].y, 0.25, cc, 2.5);
                                    viz.drawText(charges[ci4].q > 0 ? '+' : '\u2212', charges[ci4].x, charges[ci4].y, viz.colors.white, 14, 'center', 'middle');
                                }

                                // Display enclosed charge and flux info
                                var infoColor = Qenc > 0 ? viz.colors.red : Qenc < 0 ? viz.colors.blue : viz.colors.green;
                                viz.screenText('Gaussian Surface', w / 2, 16, viz.colors.green, 13);
                                viz.screenText('Q_enc = ' + (Qenc > 0 ? '+' : '') + Qenc.toFixed(0) + 'q', w / 2, h - 36, infoColor, 14);
                                viz.screenText('\u03A6 = Q_enc/\u03B5\u2080 ' + (Qenc > 0 ? '> 0 (net outward)' : Qenc < 0 ? '< 0 (net inward)' : '= 0 (balanced)'), w / 2, h - 18, infoColor, 12);

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A closed spherical surface contains a charge of \\(+5\\,\\mu\\text{C}\\) and a charge of \\(-3\\,\\mu\\text{C}\\). What is the net electric flux through the surface?',
                        hint: 'Gauss\'s law: \\(\\Phi = Q_{\\text{enc}}/\\varepsilon_0\\).',
                        solution: '\\(Q_{\\text{enc}} = +5 - 3 = +2\\,\\mu\\text{C} = 2 \\times 10^{-6}\\,\\text{C}\\). Flux: \\(\\Phi = 2 \\times 10^{-6} / 8.85 \\times 10^{-12} = 2.26 \\times 10^5\\,\\text{N}\\cdot\\text{m}^2/\\text{C}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications of Gauss's Law
            // ============================================================
            {
                id: 'gauss-applications',
                title: "Applications of Gauss's Law",
                content: `
<h2>Exploiting Symmetry</h2>

<p>Gauss's law is always true, but it is only <em>useful</em> for calculating \\(\\vec{E}\\) when the charge distribution has enough symmetry that we can pull \\(E\\) out of the integral. The three classic cases are:</p>

<h3>1. Spherical Symmetry (Point Charge or Uniform Sphere)</h3>

<p>For a point charge \\(Q\\), choose a Gaussian sphere of radius \\(r\\) centered on the charge. By symmetry, \\(\\vec{E}\\) is radial and constant on the sphere, so:</p>

\\[\\Phi = E \\cdot 4\\pi r^2 = \\frac{Q}{\\varepsilon_0} \\quad \\Rightarrow \\quad E = \\frac{Q}{4\\pi\\varepsilon_0 r^2} = \\frac{kQ}{r^2}\\]

<p>This recovers Coulomb's law. But Gauss's law also works for a uniform sphere of charge: outside the sphere, the field is identical to that of a point charge at the center.</p>

<h3>2. Cylindrical Symmetry (Infinite Line Charge)</h3>

<p>An infinitely long line of charge with linear charge density \\(\\lambda\\) (charge per unit length). Choose a cylindrical Gaussian surface of radius \\(r\\) and length \\(L\\) centered on the line. By symmetry, \\(\\vec{E}\\) is radial and constant on the curved surface; flux through the end caps is zero.</p>

\\[E \\cdot 2\\pi r L = \\frac{\\lambda L}{\\varepsilon_0} \\quad \\Rightarrow \\quad E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}\\]

<p>The field falls off as \\(1/r\\), not \\(1/r^2\\). This makes sense: for an infinite line, the "source" extends in one dimension, so you lose one power of distance.</p>

<h3>3. Planar Symmetry (Infinite Charged Plane)</h3>

<p>An infinite plane with surface charge density \\(\\sigma\\). Use a "pill box" (small cylinder) straddling the plane. By symmetry, the field is perpendicular to the plane and the same on both sides:</p>

\\[2EA = \\frac{\\sigma A}{\\varepsilon_0} \\quad \\Rightarrow \\quad E = \\frac{\\sigma}{2\\varepsilon_0}\\]

<p>The field is <strong>independent of distance</strong> from the plane. (For parallel plates with charges \\(\\pm\\sigma\\), the fields add between the plates and cancel outside, giving \\(E = \\sigma/\\varepsilon_0\\) between and zero outside.)</p>

<div class="env-block remark">
<div class="env-title">When NOT to use Gauss's law</div>
<div class="env-body">
<p>Gauss's law is not helpful for computing \\(\\vec{E}\\) when the charge distribution lacks symmetry (e.g., a finite line segment, an irregular blob of charge). In those cases, you must integrate Coulomb's law directly, or use numerical methods. Gauss's law is still <em>true</em>, but you cannot extract \\(E\\) from the integral without symmetry.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Field Inside a Uniform Sphere</div>
<div class="env-body">
<p>A solid sphere of radius \\(R\\) has uniform charge density \\(\\rho\\). Find \\(E\\) inside the sphere at distance \\(r < R\\) from the center.</p>
<p>Gaussian sphere of radius \\(r\\): enclosed charge \\(Q_{\\text{enc}} = \\rho \\cdot \\frac{4}{3}\\pi r^3\\).</p>
\\[E \\cdot 4\\pi r^2 = \\frac{\\rho \\cdot \\frac{4}{3}\\pi r^3}{\\varepsilon_0} \\quad \\Rightarrow \\quad E = \\frac{\\rho\\,r}{3\\varepsilon_0}\\]
<p>Inside the sphere, \\(E\\) grows linearly with \\(r\\). Outside, it falls as \\(1/r^2\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An infinitely long wire carries a linear charge density of \\(\\lambda = 5 \\times 10^{-9}\\,\\text{C/m}\\). What is the electric field at a distance of 0.1 m from the wire?',
                        hint: 'Use the result for cylindrical symmetry: \\(E = \\lambda/(2\\pi\\varepsilon_0 r)\\).',
                        solution: '\\(E = \\frac{5 \\times 10^{-9}}{2\\pi(8.85 \\times 10^{-12})(0.1)} = \\frac{5 \\times 10^{-9}}{5.56 \\times 10^{-12}} = 899\\,\\text{N/C}\\).'
                    },
                    {
                        question: 'A conducting sphere of radius 10 cm carries a total charge of \\(+8\\,\\mu\\text{C}\\). What is the electric field (a) at the surface, (b) at 5 cm from the center (inside), and (c) at 20 cm from the center?',
                        hint: 'For a conductor: \\(E = 0\\) inside; outside, treat as a point charge.',
                        solution: '(a) At surface (\\(r = 0.1\\,\\text{m}\\)): \\(E = kQ/r^2 = 8.99 \\times 10^9 \\times 8 \\times 10^{-6}/0.01 = 7.19 \\times 10^6\\,\\text{N/C}\\). (b) Inside (\\(r = 0.05\\,\\text{m}\\)): \\(E = 0\\) (it is a conductor). (c) At \\(r = 0.2\\,\\text{m}\\): \\(E = 8.99 \\times 10^9 \\times 8 \\times 10^{-6}/0.04 = 1.80 \\times 10^6\\,\\text{N/C}\\).'
                    }
                ]
            }
        ]
    });
})();
