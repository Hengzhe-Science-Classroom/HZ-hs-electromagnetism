// === Chapter 1: Electric Fields ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch01',
        number: 1,
        title: 'Electric Fields',
        subtitle: 'The invisible messenger that carries the force',
        file: 'ch01-electric-field',

        sections: [
            // ============================================================
            // Section 0: The Field Concept
            // ============================================================
            {
                id: 'field-concept',
                title: 'The Field Concept',
                content: `
<h2>Action at a Distance, or Something In Between?</h2>

<p>Coulomb's law says two charges exert forces on each other across empty space. But how does charge \\(q_1\\) "know" that charge \\(q_2\\) is there? Does the force travel instantaneously? And what happens when \\(q_2\\) is suddenly moved?</p>

<p>These questions troubled Michael Faraday in the 1830s. His answer was revolutionary: charge \\(q_1\\) does not act directly on \\(q_2\\). Instead, \\(q_1\\) creates a <strong>field</strong> that fills all of space. Charge \\(q_2\\) then responds to the field at its own location. The field is the intermediary.</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Field</div>
<div class="env-body">
<p>The <strong>electric field</strong> \\(\\vec{E}\\) at a point in space is defined as the force per unit positive test charge placed at that point:</p>
\\[\\vec{E} = \\frac{\\vec{F}}{q_0}\\]
<p>where \\(q_0\\) is a small positive test charge and \\(\\vec{F}\\) is the electrostatic force it experiences. Units: newtons per coulomb (N/C), or equivalently volts per meter (V/m).</p>
</div>
</div>

<p>The field is a <em>vector</em> at every point in space. It has a magnitude (how strong the force would be) and a direction (which way the force would push a positive charge). Crucially, the field exists whether or not a test charge is actually present. The source charge creates the field; the field acts on any other charge that enters it.</p>

<div class="env-block intuition">
<div class="env-title">Why bother with fields?</div>
<div class="env-body">
<p>For static charges, Coulomb's law and the field approach give identical answers. But fields become essential when charges move. Changes in the field propagate at the speed of light, not instantaneously. Fields carry energy and momentum. Electromagnetic waves (light, radio, X-rays) are oscillating electric and magnetic fields traveling through space. The field is not just a mathematical convenience; it is a physical entity.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An electron (charge \\(-1.6 \\times 10^{-19}\\,\\text{C}\\), mass \\(9.1 \\times 10^{-31}\\,\\text{kg}\\)) is placed in a uniform electric field of \\(1000\\,\\text{N/C}\\) pointing to the right. What is the magnitude and direction of the force on the electron? What is its acceleration?',
                        hint: '\\(\\vec{F} = q\\vec{E}\\). The electron has negative charge, so the force is opposite to \\(\\vec{E}\\).',
                        solution: '\\(F = |q|E = 1.6 \\times 10^{-19} \\times 1000 = 1.6 \\times 10^{-16}\\,\\text{N}\\), directed to the <strong>left</strong> (opposite to \\(\\vec{E}\\) because the electron is negative). Acceleration: \\(a = F/m = 1.6 \\times 10^{-16} / 9.1 \\times 10^{-31} = 1.76 \\times 10^{14}\\,\\text{m/s}^2\\) to the left.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Field of a Point Charge
            // ============================================================
            {
                id: 'point-charge-field',
                title: 'Field of a Point Charge',
                content: `
<h2>The Simplest Electric Field</h2>

<p>The electric field created by a single point charge \\(Q\\) at a distance \\(r\\) from the charge is found by dividing Coulomb's force by the test charge:</p>

<div class="env-block theorem">
<div class="env-title">Electric Field of a Point Charge</div>
<div class="env-body">
\\[\\vec{E} = k\\,\\frac{Q}{r^2}\\,\\hat{r}\\]
<p>where \\(\\hat{r}\\) points radially outward from \\(Q\\). If \\(Q > 0\\), the field points outward (away from the charge). If \\(Q < 0\\), the field points inward (toward the charge).</p>
<p>Magnitude: \\(E = k\\,\\frac{|Q|}{r^2}\\).</p>
</div>
</div>

<p>The field has spherical symmetry: at a given distance \\(r\\), the magnitude is the same in every direction. The direction is always radial. The field weakens as \\(1/r^2\\), just like gravity.</p>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body">
<p>Find the electric field at a distance of 0.5 m from a charge of \\(+3\\,\\mu\\text{C}\\).</p>
\\[E = (8.99 \\times 10^9)\\,\\frac{3 \\times 10^{-6}}{(0.5)^2} = (8.99 \\times 10^9)\\,\\frac{3 \\times 10^{-6}}{0.25} = 1.08 \\times 10^5\\,\\text{N/C}\\]
<p>The field points radially outward from the charge (since \\(Q > 0\\)).</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The test charge must be small</div>
<div class="env-body">
<p>The definition \\(\\vec{E} = \\vec{F}/q_0\\) assumes the test charge \\(q_0\\) is small enough that it does not disturb the source charges. If \\(q_0\\) is large, it will push the source charges around, changing the very field we are trying to measure. In practice, we take the mathematical limit \\(q_0 \\to 0\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'At what distance from a \\(+10\\,\\mu\\text{C}\\) charge is the electric field strength equal to \\(3.6 \\times 10^4\\,\\text{N/C}\\)?',
                        hint: 'Rearrange \\(E = kQ/r^2\\) to solve for \\(r\\).',
                        solution: '\\(r = \\sqrt{kQ/E} = \\sqrt{(8.99 \\times 10^9)(10 \\times 10^{-6})/(3.6 \\times 10^4)} = \\sqrt{2.50} = 1.58\\,\\text{m}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Field Visualization (SHOWPIECE)
            // ============================================================
            {
                id: 'field-visualization',
                title: 'Field Visualization',
                content: `
<h2>Making the Invisible Visible</h2>

<p>An electric field fills all of space around a charge, but we cannot see it directly. To visualize it, we sample the field at many points and draw an arrow at each one. The arrow's direction shows the field direction; its length (or color) shows the field strength.</p>

<p>The visualization below is a <strong>field vector map</strong>. A grid of arrows covers the plane, each showing the electric field at that location. The color encodes the field strength: <strong style="color:#f85149;">hot red = strong field</strong>, <strong style="color:#58a6ff;">cool blue = weak field</strong>. Drag the charges to reshape the field in real time.</p>

<div class="viz-placeholder" data-viz="viz-field-map"></div>

<div class="env-block intuition">
<div class="env-title">Reading the field map</div>
<div class="env-body">
<p>Near a positive charge, all arrows point outward. Near a negative charge, all arrows point inward. Between two opposite charges (a dipole), the arrows curve from the positive charge to the negative charge. The field is strongest where the arrows are longest and most red; it is weakest where the arrows are short and blue.</p>
</div>
</div>

<h3>The Dipole Field</h3>

<p>An <strong>electric dipole</strong> is a pair of equal and opposite charges separated by a small distance. The dipole field has a characteristic pattern: field lines emerge from the positive charge, curve through space, and terminate on the negative charge. This pattern appears everywhere in nature, from water molecules to radio antennas.</p>
`,
                visualizations: [
                    {
                        id: 'viz-field-map',
                        title: 'Interactive Electric Field Map',
                        description: 'Drag the charges to see the field update in real time. Use the buttons to add or remove charges. Arrow color: <strong style="color:#f85149;">red = strong</strong>, <strong style="color:#58a6ff;">blue = weak</strong>.',
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

                            var drags = [];
                            function rebuildDraggables() {
                                viz.draggables = [];
                                drags = charges.map(function (c, i) {
                                    return viz.addDraggable('q' + i, c.x, c.y, c.q > 0 ? viz.colors.red : viz.colors.blue, 12);
                                });
                            }
                            rebuildDraggables();

                            VizEngine.createButton(controls, 'Add +', function () {
                                charges.push({ x: Math.random() * 4 - 2, y: Math.random() * 4 - 2, q: 1 });
                                rebuildDraggables();
                            });
                            VizEngine.createButton(controls, 'Add \u2212', function () {
                                charges.push({ x: Math.random() * 4 - 2, y: Math.random() * 4 - 2, q: -1 });
                                rebuildDraggables();
                            });
                            VizEngine.createButton(controls, 'Dipole', function () {
                                charges = [{ x: -2, y: 0, q: 1 }, { x: 2, y: 0, q: -1 }];
                                rebuildDraggables();
                            });
                            VizEngine.createButton(controls, 'Two +', function () {
                                charges = [{ x: -2, y: 0, q: 1 }, { x: 2, y: 0, q: 1 }];
                                rebuildDraggables();
                            });
                            VizEngine.createButton(controls, 'Clear', function () {
                                charges = [];
                                rebuildDraggables();
                            });

                            var spacing = 0.7; // grid spacing in world units

                            function fieldAt(px, py) {
                                var Ex = 0, Ey = 0;
                                for (var i = 0; i < charges.length; i++) {
                                    var dx = px - charges[i].x;
                                    var dy = py - charges[i].y;
                                    var r2 = dx * dx + dy * dy;
                                    if (r2 < 0.15) r2 = 0.15;
                                    var r = Math.sqrt(r2);
                                    var E = charges[i].q / r2;
                                    Ex += E * dx / r;
                                    Ey += E * dy / r;
                                }
                                return [Ex, Ey];
                            }

                            function draw() {
                                // Sync draggables -> charges
                                for (var i = 0; i < charges.length; i++) {
                                    if (drags[i]) {
                                        charges[i].x = drags[i].x;
                                        charges[i].y = drags[i].y;
                                        drags[i].color = charges[i].q > 0 ? viz.colors.red : viz.colors.blue;
                                    }
                                }

                                viz.clear();

                                if (charges.length === 0) {
                                    viz.screenText('Add charges using the buttons above', w / 2, h / 2, viz.colors.text, 14);
                                    return;
                                }

                                // Compute field range for color normalization
                                var maxE = 0.1;
                                var xMin = -viz.originX / viz.scale;
                                var xMax = (w - viz.originX) / viz.scale;
                                var yMin = -(h - viz.originY) / viz.scale;
                                var yMax = viz.originY / viz.scale;

                                // Draw field arrows on grid
                                for (var gx = xMin + spacing * 0.5; gx < xMax; gx += spacing) {
                                    for (var gy = yMin + spacing * 0.5; gy < yMax; gy += spacing) {
                                        var E = fieldAt(gx, gy);
                                        var mag = Math.sqrt(E[0] * E[0] + E[1] * E[1]);
                                        if (mag > maxE) maxE = mag;
                                    }
                                }

                                for (var gx2 = xMin + spacing * 0.5; gx2 < xMax; gx2 += spacing) {
                                    for (var gy2 = yMin + spacing * 0.5; gy2 < yMax; gy2 += spacing) {
                                        // Skip if too close to a charge
                                        var tooClose = false;
                                        for (var ci = 0; ci < charges.length; ci++) {
                                            var ddx = gx2 - charges[ci].x;
                                            var ddy = gy2 - charges[ci].y;
                                            if (ddx * ddx + ddy * ddy < 0.35) { tooClose = true; break; }
                                        }
                                        if (tooClose) continue;

                                        var Ef = fieldAt(gx2, gy2);
                                        var emag = Math.sqrt(Ef[0] * Ef[0] + Ef[1] * Ef[1]);
                                        if (emag < 1e-6) continue;

                                        // Normalize arrow length
                                        var normMag = Math.log(1 + emag) / Math.log(1 + maxE);
                                        normMag = VizEngine.clamp(normMag, 0.05, 1.0);
                                        var arrowLen = spacing * 0.4 * normMag;
                                        var ux = Ef[0] / emag, uy = Ef[1] / emag;

                                        // Color: blue (weak) -> red (strong)
                                        var hue = (1 - normMag) * 240; // 240=blue, 0=red
                                        var color = VizEngine.hsl(hue, 90, 50 + normMag * 15);

                                        // Draw arrow from (gx2, gy2) in direction (ux, uy)
                                        var s = viz.toScreen(gx2, gy2);
                                        var ex = s[0] + ux * arrowLen * viz.scale;
                                        var ey = s[1] - uy * arrowLen * viz.scale;
                                        var angle = Math.atan2(ey - s[1], ex - s[0]);
                                        var headSize = 4 + normMag * 4;

                                        ctx.save();
                                        ctx.globalAlpha = 0.5 + normMag * 0.5;
                                        ctx.strokeStyle = color;
                                        ctx.lineWidth = 1 + normMag * 1.5;
                                        ctx.shadowColor = color;
                                        ctx.shadowBlur = normMag * 4;
                                        ctx.beginPath();
                                        ctx.moveTo(s[0], s[1]);
                                        ctx.lineTo(ex - Math.cos(angle) * headSize * 0.6, ey - Math.sin(angle) * headSize * 0.6);
                                        ctx.stroke();
                                        // Arrowhead
                                        ctx.fillStyle = color;
                                        ctx.beginPath();
                                        ctx.moveTo(ex, ey);
                                        ctx.lineTo(ex - headSize * Math.cos(angle - 0.4), ey - headSize * Math.sin(angle - 0.4));
                                        ctx.lineTo(ex - headSize * Math.cos(angle + 0.4), ey - headSize * Math.sin(angle + 0.4));
                                        ctx.closePath();
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }

                                // Draw charges on top
                                for (var ci2 = 0; ci2 < charges.length; ci2++) {
                                    var cc = charges[ci2].q > 0 ? viz.colors.red : viz.colors.blue;
                                    viz.drawBall(charges[ci2].x, charges[ci2].y, 0.25, cc, 3.5);
                                    viz.drawText(charges[ci2].q > 0 ? '+' : '\u2212', charges[ci2].x, charges[ci2].y, viz.colors.white, 16, 'center', 'middle');
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
                        question: 'In the field map of a dipole, where is the field strongest? Where is it weakest?',
                        hint: 'Look at the arrow colors and lengths. Think about what happens very close to the charges vs far away.',
                        solution: 'The field is strongest very close to either charge (the arrows are long and red). It is weakest along the perpendicular bisector of the dipole at large distances, and at the exact midpoint between the two charges the fields from each charge partially cancel (leaving a net field perpendicular to the dipole axis).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Superposition of Fields
            // ============================================================
            {
                id: 'superposition-fields',
                title: 'Superposition of Fields',
                content: `
<h2>Fields Add Like Vectors</h2>

<p>The principle of superposition applies to fields just as it does to forces. If multiple source charges are present, the total electric field at any point is the vector sum of the fields from each individual charge:</p>

<div class="env-block theorem">
<div class="env-title">Superposition of Electric Fields</div>
<div class="env-body">
\\[\\vec{E}_{\\text{total}} = \\vec{E}_1 + \\vec{E}_2 + \\cdots + \\vec{E}_N = \\sum_{i=1}^{N} k\\,\\frac{q_i}{r_i^2}\\,\\hat{r}_i\\]
<p>Each field \\(\\vec{E}_i\\) is calculated as if the other charges were absent.</p>
</div>
</div>

<p>This is computationally powerful. No matter how complex the charge distribution, we can always decompose the field into contributions from each piece and add them up.</p>

<div class="env-block example">
<div class="env-title">Example: Field at the Center of a Square</div>
<div class="env-body">
<p>Four charges sit at the corners of a square with side \\(a\\): \\(+q\\) at top-left and bottom-right, \\(-q\\) at top-right and bottom-left. What is the field at the center?</p>
<p>By symmetry, each charge is at distance \\(r = a\\sqrt{2}/2\\) from the center. The fields from the two positive charges point toward the center along their respective diagonals (wait, no: field of a positive charge points <em>away</em> from it). After careful vector addition, the fields from the four charges combine to give a net field pointing along one of the sides. The magnitude is:</p>
\\[E = \\frac{4kq}{a^2}\\]
<p>(Try working this out by drawing the four vectors!)</p>
</div>
</div>

<h3>Continuous Charge Distributions</h3>

<p>When charge is spread over a line, surface, or volume, we replace the sum with an integral:</p>

\\[\\vec{E} = \\int k\\,\\frac{dq}{r^2}\\,\\hat{r}\\]

<p>This is how we find the fields of charged rods, disks, and spheres. We will not do these integrals in this course, but the conceptual idea is the same: break the charge into tiny pieces, find the field from each piece, and add them all up.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two charges \\(q_1 = +4\\,\\mu\\text{C}\\) at \\(x = 0\\) and \\(q_2 = -4\\,\\mu\\text{C}\\) at \\(x = 1\\,\\text{m}\\). Find the point on the x-axis (outside the charges) where \\(E = 0\\).',
                        hint: 'The field can only be zero outside the pair (not between opposite charges, where the fields point the same way). Try the region \\(x < 0\\). Set \\(|E_1| = |E_2|\\) and solve for \\(x\\).',
                        solution: 'Let the point be at \\(x = -d\\) (to the left of \\(q_1\\)). Then \\(k(4)/(d^2) = k(4)/(1+d)^2\\). This gives \\(d^2 = (1+d)^2\\), so \\(d = 1+d\\), which has no solution. Actually, for opposite charges the zero-field point does not exist on the axis because the fields from the two charges always point in the same direction (both point to the right for \\(x < 0\\)). The net field is never zero on the axis. For equal and <em>same-sign</em> charges, the zero-field point would be at the midpoint.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Uniform Fields
            // ============================================================
            {
                id: 'uniform-fields',
                title: 'Uniform Fields',
                content: `
<h2>The Simplest Possible Field</h2>

<p>A <strong>uniform electric field</strong> has the same magnitude and direction at every point. No real field is perfectly uniform everywhere, but between two large parallel plates carrying equal and opposite charge, the field in the interior is very nearly uniform.</p>

<div class="env-block definition">
<div class="env-title">Definition: Uniform Electric Field</div>
<div class="env-body">
<p>A uniform electric field is one in which \\(\\vec{E}\\) has the same value (magnitude and direction) at all points. Between parallel plates with surface charge density \\(\\pm\\sigma\\):</p>
\\[E = \\frac{\\sigma}{\\varepsilon_0}\\]
<p>where \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\,\\text{C}^2/(\\text{N}\\cdot\\text{m}^2)\\) is the permittivity of free space.</p>
</div>
</div>

<p>The field points from the positive plate to the negative plate, perpendicular to both. Between the plates, a charged particle experiences a constant force and undergoes uniform acceleration, exactly like a ball in a gravitational field. This makes parallel plates very useful for deflecting and accelerating charged particles.</p>

<div class="viz-placeholder" data-viz="viz-uniform-field"></div>

<div class="env-block example">
<div class="env-title">Example: Deflection in a Uniform Field</div>
<div class="env-body">
<p>An electron enters a uniform field of \\(E = 2 \\times 10^4\\,\\text{N/C}\\) (pointing downward) with horizontal velocity \\(v_0 = 3 \\times 10^7\\,\\text{m/s}\\). The plates are 5 cm long. By how much is the electron deflected vertically as it crosses the plates?</p>
<p>The upward force on the electron: \\(F = eE = 1.6 \\times 10^{-19} \\times 2 \\times 10^4 = 3.2 \\times 10^{-15}\\,\\text{N}\\).</p>
<p>Upward acceleration: \\(a = F/m = 3.2 \\times 10^{-15}/9.1 \\times 10^{-31} = 3.52 \\times 10^{15}\\,\\text{m/s}^2\\).</p>
<p>Time to cross: \\(t = L/v_0 = 0.05/3 \\times 10^7 = 1.67 \\times 10^{-9}\\,\\text{s}\\).</p>
<p>Vertical deflection: \\(\\Delta y = \\frac{1}{2}at^2 = \\frac{1}{2}(3.52 \\times 10^{15})(1.67 \\times 10^{-9})^2 = 4.9 \\times 10^{-3}\\,\\text{m} = 4.9\\,\\text{mm}\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The parallel-plate geometry</div>
<div class="env-body">
<p>The uniform field approximation works well in the central region between the plates. Near the edges, the field "fringes" outward and is no longer uniform. In most textbook problems, we ignore fringe fields and treat the field as perfectly uniform between the plates and zero outside.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-uniform-field',
                        title: 'Uniform Field Between Parallel Plates',
                        description: 'A particle is launched horizontally between two charged plates. The uniform field deflects it like gravity deflects a projectile. Adjust the field strength and initial velocity.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 80, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var Efield = 2.0; // arbitrary units, pointing down
                            var v0 = 4.0;
                            var time = 0;
                            var trail = [];
                            var running = true;

                            VizEngine.createSlider(controls, 'E field (a.u.)', 0.5, 5, Efield, 0.5, function (v) {
                                Efield = v; time = 0; trail = [];
                            });
                            VizEngine.createSlider(controls, 'v\u2080 (m/s)', 1, 8, v0, 0.5, function (v) {
                                v0 = v; time = 0; trail = [];
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                time = 0; trail = [];
                            });

                            // Plates
                            var plateLeft = -1, plateRight = 9;
                            var plateTop = 3.5, plateBot = -3.5;

                            function draw() {
                                viz.clear();

                                // Draw plates
                                var slt = viz.toScreen(plateLeft, plateTop);
                                var slb = viz.toScreen(plateLeft, plateBot);
                                var srt = viz.toScreen(plateRight, plateTop);
                                var srb = viz.toScreen(plateRight, plateBot);

                                // Top plate (positive, red)
                                ctx.fillStyle = '#f8514933';
                                ctx.fillRect(slt[0], slt[1] - 8, srt[0] - slt[0], 8);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillRect(slt[0], slt[1] - 2, srt[0] - slt[0], 2);
                                // + signs
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var px = plateLeft + 0.5; px < plateRight; px += 1) {
                                    var sp = viz.toScreen(px, plateTop);
                                    ctx.fillText('+', sp[0], sp[1] - 12);
                                }

                                // Bottom plate (negative, blue)
                                ctx.fillStyle = '#58a6ff33';
                                ctx.fillRect(slb[0], slb[1], srb[0] - slb[0], 8);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(slb[0], slb[1], srb[0] - slb[0], 2);
                                ctx.fillStyle = viz.colors.blue;
                                for (var px2 = plateLeft + 0.5; px2 < plateRight; px2 += 1) {
                                    var sp2 = viz.toScreen(px2, plateBot);
                                    ctx.fillText('\u2212', sp2[0], sp2[1] + 18);
                                }

                                // Uniform field arrows between plates
                                for (var fx = plateLeft + 0.5; fx < plateRight; fx += 1.2) {
                                    for (var fy = plateBot + 0.8; fy < plateTop - 0.3; fy += 1.2) {
                                        var sf = viz.toScreen(fx, fy);
                                        var arrowLen = 22;
                                        ctx.save();
                                        ctx.globalAlpha = 0.25;
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(sf[0], sf[1] - arrowLen / 2);
                                        ctx.lineTo(sf[0], sf[1] + arrowLen / 2 - 4);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.orange;
                                        ctx.beginPath();
                                        ctx.moveTo(sf[0], sf[1] + arrowLen / 2);
                                        ctx.lineTo(sf[0] - 4, sf[1] + arrowLen / 2 - 6);
                                        ctx.lineTo(sf[0] + 4, sf[1] + arrowLen / 2 - 6);
                                        ctx.closePath();
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }
                                viz.screenText('E', srt[0] + 20, (slt[1] + slb[1]) / 2, viz.colors.orange, 13);

                                // Particle physics: positive charge launched from left
                                var dt = 0.025;
                                time += dt;
                                var px_p = v0 * time;
                                // Positive charge: force is downward (same as E direction)
                                var py_p = plateTop - 0.8 - 0.5 * Efield * time * time;

                                // Check bounds
                                if (px_p < plateRight + 1 && py_p > plateBot + 0.3 && py_p < plateTop - 0.3) {
                                    trail.push([px_p, py_p]);
                                    if (trail.length > 500) trail.shift();
                                } else if (trail.length > 0) {
                                    // Keep trail visible but stop adding
                                }

                                // Auto-reset
                                if (px_p > plateRight + 2 || py_p < plateBot) {
                                    time = 0;
                                    trail = [];
                                }

                                // Draw trail
                                viz.drawTrail(trail, viz.colors.cyan, 0.6);

                                // Draw particle
                                if (px_p < plateRight + 1 && py_p > plateBot && py_p < plateTop) {
                                    viz.drawBall(px_p, py_p, 0.18, viz.colors.cyan, 2.5);
                                    // Velocity vector
                                    var vy = -Efield * time;
                                    var vScale = 0.15;
                                    viz.drawVector(px_p, py_p, v0 * vScale, vy * vScale, viz.colors.green, '', 2, 8);
                                }

                                // Labels
                                viz.screenText('v\u2080 \u2192', 20, viz.toScreen(0, plateTop - 0.8)[1], viz.colors.green, 12, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two parallel plates are separated by 2 cm and have a potential difference of 500 V across them. What is the magnitude of the uniform electric field between them?',
                        hint: 'For a uniform field, \\(E = V/d\\).',
                        solution: '\\(E = 500\\,\\text{V} / 0.02\\,\\text{m} = 25{,}000\\,\\text{V/m} = 2.5 \\times 10^4\\,\\text{N/C}\\).'
                    },
                    {
                        question: 'A proton enters a uniform field between parallel plates. The field points downward. Does the proton deflect upward or downward? What about an electron?',
                        hint: 'A positive charge is pushed in the direction of \\(\\vec{E}\\). A negative charge is pushed opposite to \\(\\vec{E}\\).',
                        solution: 'The proton deflects <strong>downward</strong> (same direction as \\(\\vec{E}\\), since it is positive). The electron deflects <strong>upward</strong> (opposite to \\(\\vec{E}\\), since it is negative).'
                    }
                ]
            }
        ]
    });
})();
