// === Chapter 7: Kirchhoff's Laws ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: "Kirchhoff's Laws",
    subtitle: 'Systematic tools for analyzing any circuit, no matter how complex',
    sections: [
        // ============================================================
        // SECTION 1: The Junction Rule (KCL)
        // ============================================================
        {
            id: 'ch07-sec01',
            title: 'Junction Rule (KCL)',
            content: `<h2>7.1 The Junction Rule (Kirchhoff's Current Law)</h2>

<div class="env-block intuition">
    <div class="env-title">Why We Need Kirchhoff</div>
    <div class="env-body">
        <p>Series and parallel combinations can solve simple circuits, but many real circuits cannot be reduced to those patterns. A circuit with multiple batteries, or a bridge network, requires more powerful tools. Gustav Kirchhoff provided two rules (1845) that, together, can solve <em>any</em> circuit. The first is about charge conservation at junctions.</p>
    </div>
</div>

<h3>Charge Conservation at a Junction</h3>

<p>A <strong>junction</strong> (or node) is any point where three or more wires meet. Electric charge is conserved: it is never created or destroyed. Therefore, the total current flowing into a junction must equal the total current flowing out.</p>

<div class="env-block definition">
    <div class="env-title">Kirchhoff's Current Law (KCL)</div>
    <div class="env-body">
        <p>At any junction in a circuit, the sum of currents entering equals the sum of currents leaving:</p>
        \\[\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\]
        <p>Equivalently, if we assign signs (positive for in, negative for out):</p>
        \\[\\sum_{k} I_k = 0\\]
    </div>
</div>

<p>Think of it like water at a pipe junction: whatever flows in must flow out. No water accumulates at the junction (in steady state), and no water vanishes.</p>

<div class="env-block example">
    <div class="env-title">Example 7.1 &mdash; Three-Wire Junction</div>
    <div class="env-body">
        <p>At a junction, currents \\(I_1 = 3\\,\\text{A}\\) and \\(I_2 = 2\\,\\text{A}\\) flow in. What is the outgoing current \\(I_3\\)?</p>
        <p><strong>Solution.</strong> By KCL: \\(I_1 + I_2 = I_3\\), so \\(I_3 = 3 + 2 = 5\\,\\text{A}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 7.2 &mdash; Four-Wire Junction</div>
    <div class="env-body">
        <p>Currents at a node: \\(I_1 = 5\\,\\text{A}\\) in, \\(I_2 = 2\\,\\text{A}\\) out, \\(I_3 = 1\\,\\text{A}\\) in, \\(I_4\\) unknown (out). Find \\(I_4\\).</p>
        <p><strong>Solution.</strong> \\(5 + 1 = 2 + I_4 \\Rightarrow I_4 = 4\\,\\text{A}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-kcl-junction"></div>

<div class="env-block remark">
    <div class="env-title">Sign Convention</div>
    <div class="env-body">
        <p>When solving circuits, you choose a direction for each current. If your final answer is negative, it means the actual current flows opposite to your chosen direction. This is perfectly fine; the algebra handles it automatically.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-kcl-junction',
                    title: 'Kirchhoff\'s Current Law: Animated Junction',
                    description: 'Watch electrons split at the junction. Adjust incoming currents and see KCL enforced in real time. The number of electrons per second entering equals those leaving.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 280, originY: 200 });
                        var ctx = viz.ctx;
                        var I1 = 5, I2 = 3;
                        var I3 = I1 + I2;
                        var electrons = [];
                        var t0 = null;
                        var spawnTimers = { w1: 0, w2: 0 };

                        VizEngine.createSlider(controls, 'I\u2081 (in)', 1, 8, I1, 0.5, function(v) { I1 = v; I3 = I1 + I2; });
                        VizEngine.createSlider(controls, 'I\u2082 (in)', 1, 8, I2, 0.5, function(v) { I2 = v; I3 = I1 + I2; });

                        // Wire paths in screen coords
                        // Wire1: left-top to center (incoming)
                        // Wire2: left-bottom to center (incoming)
                        // Wire3: center to right (outgoing)
                        var jx = 280, jy = 200;

                        function wirePos(wire, frac) {
                            if (wire === 1) return { x: jx - 220 + frac * 220, y: jy - 100 + frac * 100 };
                            if (wire === 2) return { x: jx - 220 + frac * 220, y: jy + 100 - frac * 100 };
                            if (wire === 3) return { x: jx + frac * 240, y: jy };
                            return { x: 0, y: 0 };
                        }

                        function spawnElectron(wire) {
                            electrons.push({ wire: wire, frac: 0, speed: 0.4 + Math.random() * 0.15 });
                        }

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var dt = 0.016;

                            // Spawn electrons proportional to current
                            spawnTimers.w1 += dt * I1 * 1.5;
                            spawnTimers.w2 += dt * I2 * 1.5;
                            while (spawnTimers.w1 >= 1) { spawnElectron(1); spawnTimers.w1 -= 1; }
                            while (spawnTimers.w2 >= 1) { spawnElectron(2); spawnTimers.w2 -= 1; }

                            // Update electrons
                            for (var i = electrons.length - 1; i >= 0; i--) {
                                var e = electrons[i];
                                e.frac += e.speed * dt;
                                if (e.wire <= 2 && e.frac >= 1) {
                                    // At junction, switch to wire 3
                                    e.wire = 3;
                                    e.frac = 0;
                                }
                                if (e.wire === 3 && e.frac >= 1) {
                                    electrons.splice(i, 1);
                                }
                            }

                            viz.clear();

                            // Draw wires with glow
                            ctx.lineWidth = 4;
                            ctx.shadowBlur = 8;

                            // Wire 1 (top-left)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.shadowColor = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(jx - 220, jy - 100);
                            ctx.lineTo(jx, jy);
                            ctx.stroke();

                            // Wire 2 (bottom-left)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.shadowColor = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(jx - 220, jy + 100);
                            ctx.lineTo(jx, jy);
                            ctx.stroke();

                            // Wire 3 (right)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.shadowColor = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(jx, jy);
                            ctx.lineTo(jx + 240, jy);
                            ctx.stroke();

                            ctx.shadowBlur = 0;

                            // Draw junction node
                            ctx.save();
                            ctx.shadowColor = viz.colors.white;
                            ctx.shadowBlur = 15;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(jx, jy, 8, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();

                            // Draw electrons
                            for (var j = 0; j < electrons.length; j++) {
                                var el = electrons[j];
                                var pos = wirePos(el.wire, el.frac);
                                var eColor = el.wire === 1 ? viz.colors.blue : (el.wire === 2 ? viz.colors.teal : viz.colors.orange);

                                ctx.save();
                                ctx.shadowColor = eColor;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = eColor;
                                ctx.beginPath();
                                ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
                                ctx.fill();
                                // Inner bright spot
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.arc(pos.x - 1, pos.y - 1, 1.5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                            }

                            // Direction arrows
                            var arrowLen = 18;
                            function drawArrow(x1, y1, x2, y2, color) {
                                var dx = x2 - x1, dy = y2 - y1;
                                var len = Math.sqrt(dx * dx + dy * dy);
                                var ux = dx / len, uy = dy / len;
                                var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(mx - ux * arrowLen, my - uy * arrowLen);
                                ctx.lineTo(mx + ux * arrowLen, my + uy * arrowLen);
                                ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(mx + ux * arrowLen, my + uy * arrowLen);
                                ctx.lineTo(mx + ux * arrowLen - arrowLen * 0.4 * (ux - uy * 0.5), my + uy * arrowLen - arrowLen * 0.4 * (uy + ux * 0.5));
                                ctx.lineTo(mx + ux * arrowLen - arrowLen * 0.4 * (ux + uy * 0.5), my + uy * arrowLen - arrowLen * 0.4 * (uy - ux * 0.5));
                                ctx.closePath();
                                ctx.fill();
                            }

                            drawArrow(jx - 220, jy - 100, jx, jy, viz.colors.blue);
                            drawArrow(jx - 220, jy + 100, jx, jy, viz.colors.teal);
                            drawArrow(jx, jy, jx + 240, jy, viz.colors.orange);

                            // Labels
                            viz.screenText('I\u2081 = ' + I1.toFixed(1) + ' A', jx - 170, jy - 80, viz.colors.blue, 14, 'left');
                            viz.screenText('I\u2082 = ' + I2.toFixed(1) + ' A', jx - 170, jy + 95, viz.colors.teal, 14, 'left');
                            viz.screenText('I\u2083 = ' + I3.toFixed(1) + ' A', jx + 130, jy - 20, viz.colors.orange, 14, 'left');

                            // KCL equation
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, 10, 260, 50);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, 10, 260, 50);
                            viz.screenText('KCL: I\u2081 + I\u2082 = I\u2083', 140, 28, viz.colors.white, 15, 'center');
                            viz.screenText(I1.toFixed(1) + ' + ' + I2.toFixed(1) + ' = ' + I3.toFixed(1) + ' A', 140, 48, viz.colors.yellow, 13, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At a junction, three wires carry currents \\(I_1 = 4\\,\\text{A}\\) (in), \\(I_2 = 6\\,\\text{A}\\) (out), and \\(I_3\\) (unknown direction). Find \\(I_3\\) and state its direction.',
                    hint: 'Apply KCL: \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\).',
                    solution: '\\(4 = 6 + I_3\\) if \\(I_3\\) is out, giving \\(I_3 = -2\\,\\text{A}\\), so \\(I_3 = 2\\,\\text{A}\\) flowing <em>in</em>.'
                },
                {
                    question: 'Five wires meet at a junction. Four carry: \\(2\\,\\text{A}\\) in, \\(5\\,\\text{A}\\) out, \\(3\\,\\text{A}\\) in, \\(1\\,\\text{A}\\) in. Find the fifth current.',
                    hint: 'Sum all entering (positive) and leaving (negative) currents. The fifth must balance.',
                    solution: 'In: \\(2+3+1 = 6\\,\\text{A}\\). Out: \\(5\\,\\text{A}\\). Fifth current = \\(6 - 5 = 1\\,\\text{A}\\) out.'
                }
            ]
        },
        // ============================================================
        // SECTION 2: The Loop Rule (KVL)
        // ============================================================
        {
            id: 'ch07-sec02',
            title: 'Loop Rule (KVL)',
            content: `<h2>7.2 The Loop Rule (Kirchhoff's Voltage Law)</h2>

<div class="env-block intuition">
    <div class="env-title">The Gravitational Analogy</div>
    <div class="env-body">
        <p>Imagine hiking a loop trail on a mountain. You go up some hills, down others, but when you return to your starting point, your net elevation change is zero. Electric potential works the same way: if you trace a closed loop through a circuit, the total voltage rise must equal the total voltage drop.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Kirchhoff's Voltage Law (KVL)</div>
    <div class="env-body">
        <p>Around any closed loop in a circuit, the algebraic sum of all potential differences is zero:</p>
        \\[\\sum_{\\text{loop}} \\Delta V = 0\\]
        <p>Equivalently, the sum of EMFs equals the sum of voltage drops across resistors:</p>
        \\[\\sum \\mathcal{E} = \\sum IR\\]
    </div>
</div>

<h3>Sign Conventions for Loop Traversal</h3>

<p>When traversing a loop, adopt a consistent direction (clockwise or counterclockwise), then:</p>

<ul>
    <li><strong>Battery (- to +):</strong> voltage <em>rises</em> by \\(+\\mathcal{E}\\)</li>
    <li><strong>Battery (+ to -):</strong> voltage <em>drops</em> by \\(-\\mathcal{E}\\)</li>
    <li><strong>Resistor (in direction of current):</strong> voltage <em>drops</em> by \\(-IR\\)</li>
    <li><strong>Resistor (against direction of current):</strong> voltage <em>rises</em> by \\(+IR\\)</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example 7.3 &mdash; Single-Loop Circuit</div>
    <div class="env-body">
        <p>A 12 V battery is connected to a \\(3\\,\\Omega\\) and a \\(6\\,\\Omega\\) resistor in series. Find the current and voltage across each resistor.</p>
        <p><strong>Solution.</strong> By KVL around the loop:</p>
        \\[12 - I(3) - I(6) = 0 \\quad \\Rightarrow \\quad 12 = 9I \\quad \\Rightarrow \\quad I = \\frac{4}{3} \\approx 1.33\\,\\text{A}\\]
        <p>Voltage drops: \\(V_1 = IR_1 = 4\\,\\text{V}\\), \\(V_2 = IR_2 = 8\\,\\text{V}\\). Check: \\(4 + 8 = 12\\) V. \\(\\checkmark\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-kvl-waterfall"></div>

<div class="env-block warning">
    <div class="env-title">Common Mistake</div>
    <div class="env-body">
        <p>Students often forget to include the sign of the EMF when traversing a battery from + to -. Always walk the loop systematically, applying sign rules at every component.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-kvl-waterfall',
                    title: 'Voltage Waterfall: Potential Around a Loop',
                    description: 'Watch the electric potential rise at the battery and drop across each resistor. The "waterfall" always returns to zero around a complete loop.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 60, originY: 340 });
                        var ctx = viz.ctx;
                        var emf = 12, R1 = 3, R2 = 6;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'EMF (V)', 3, 24, emf, 1, function(v) { emf = v; });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 1, 12, R1, 0.5, function(v) { R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 1, 12, R2, 0.5, function(v) { R2 = v; });

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;
                            var I = emf / (R1 + R2);
                            var V1 = I * R1;
                            var V2 = I * R2;

                            viz.clear();

                            // Waterfall chart area
                            var chartL = 60, chartR = viz.width - 40;
                            var chartT = 40, chartB = 210;
                            var chartW = chartR - chartL;
                            var chartH = chartB - chartT;

                            // Background panel
                            ctx.fillStyle = '#0e0e28';
                            ctx.fillRect(chartL - 10, chartT - 30, chartW + 20, chartH + 55);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(chartL - 10, chartT - 30, chartW + 20, chartH + 55);

                            viz.screenText('Potential Around the Loop', (chartL + chartR) / 2, chartT - 15, viz.colors.white, 14, 'center');

                            // Y-axis: voltage
                            var maxV = Math.max(emf * 1.1, 5);
                            function vToY(v) { return chartB - (v / maxV) * chartH; }

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gv = 0; gv <= maxV; gv += 3) {
                                var gy = vToY(gv);
                                ctx.beginPath(); ctx.moveTo(chartL, gy); ctx.lineTo(chartR, gy); ctx.stroke();
                                viz.screenText(gv.toFixed(0) + 'V', chartL - 8, gy, viz.colors.text, 10, 'right');
                            }

                            // The waterfall path: start at 0V, battery rises to emf, R1 drops, R2 drops back to 0
                            var segments = [
                                { x: 0, v: 0, label: 'Start' },
                                { x: 0.25, v: emf, label: '+Battery' },
                                { x: 0.55, v: emf - V1, label: '-R\u2081' },
                                { x: 0.85, v: 0, label: '-R\u2082' },
                                { x: 1.0, v: 0, label: 'Return' }
                            ];

                            // Animated highlight position
                            var loopPos = (phase * 0.3) % 1.0;

                            // Draw waterfall bars and connections
                            for (var s = 0; s < segments.length - 1; s++) {
                                var s0 = segments[s], s1 = segments[s + 1];
                                var sx0 = chartL + s0.x * chartW;
                                var sx1 = chartL + s1.x * chartW;
                                var sy0 = vToY(s0.v);
                                var sy1 = vToY(s1.v);

                                // Horizontal line at current voltage
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sx1, sy0); ctx.stroke();
                                ctx.setLineDash([]);

                                // Vertical bar (the change)
                                var barX = sx1 - 25;
                                var barW = 50;
                                var isRise = s1.v > s0.v;
                                var barColor;
                                if (s === 0) barColor = viz.colors.green;       // battery rise
                                else if (s === 1) barColor = viz.colors.orange;  // R1 drop
                                else barColor = viz.colors.blue;                 // R2 drop

                                ctx.fillStyle = barColor + '44';
                                var barTop = Math.min(sy0, sy1);
                                var barHt = Math.abs(sy1 - sy0);
                                ctx.fillRect(barX, barTop, barW, barHt);
                                ctx.strokeStyle = barColor;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barX, barTop, barW, barHt);

                                // Glow on bar
                                ctx.save();
                                ctx.shadowColor = barColor;
                                ctx.shadowBlur = 12;
                                ctx.strokeRect(barX, barTop, barW, barHt);
                                ctx.restore();

                                // Arrow on bar
                                var arrowY = isRise ? barTop + 8 : barTop + barHt - 8;
                                var arrowDir = isRise ? -1 : 1;
                                ctx.fillStyle = barColor;
                                ctx.beginPath();
                                ctx.moveTo(barX + barW / 2, arrowY - arrowDir * 10);
                                ctx.lineTo(barX + barW / 2 - 8, arrowY);
                                ctx.lineTo(barX + barW / 2 + 8, arrowY);
                                ctx.closePath();
                                ctx.fill();

                                // Delta-V label on bar
                                var dv = s1.v - s0.v;
                                var dvStr = (dv >= 0 ? '+' : '') + dv.toFixed(1) + 'V';
                                viz.screenText(dvStr, barX + barW / 2, (sy0 + sy1) / 2, barColor, 12, 'center');

                                // Segment label
                                viz.screenText(s1.label, barX + barW / 2, chartB + 15, viz.colors.text, 10, 'center');
                            }

                            // Animated electron dot traveling along the potential profile
                            var dotSeg = 0;
                            var dotLocal = loopPos * (segments.length - 1);
                            dotSeg = Math.min(Math.floor(dotLocal), segments.length - 2);
                            var dotFrac = dotLocal - dotSeg;
                            var sA = segments[dotSeg], sB = segments[dotSeg + 1];
                            var dotX = chartL + VizEngine.lerp(sA.x, sB.x, dotFrac) * chartW;
                            var dotV = VizEngine.lerp(sA.v, sB.v, dotFrac);
                            var dotY = vToY(dotV);

                            ctx.save();
                            ctx.shadowColor = viz.colors.yellow;
                            ctx.shadowBlur = 15;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();

                            // Circuit schematic below
                            var cy = 290;
                            var cLeft = 100, cRight = viz.width - 100;
                            var cMid = (cLeft + cRight) / 2;
                            var cTop = cy - 40, cBot = cy + 40;

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            // Top wire
                            ctx.beginPath(); ctx.moveTo(cLeft, cTop); ctx.lineTo(cRight, cTop); ctx.stroke();
                            // Bottom wire
                            ctx.beginPath(); ctx.moveTo(cLeft, cBot); ctx.lineTo(cRight, cBot); ctx.stroke();
                            // Left wire (battery)
                            ctx.beginPath(); ctx.moveTo(cLeft, cTop); ctx.lineTo(cLeft, cBot); ctx.stroke();
                            // Right wire
                            ctx.beginPath(); ctx.moveTo(cRight, cTop); ctx.lineTo(cRight, cBot); ctx.stroke();

                            // Battery symbol on left
                            var battY = cy;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(cLeft - 10, battY - 12); ctx.lineTo(cLeft + 10, battY - 12); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(cLeft - 6, battY - 4); ctx.lineTo(cLeft + 6, battY - 4); ctx.stroke();
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(cLeft - 10, battY + 4); ctx.lineTo(cLeft + 10, battY + 4); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(cLeft - 6, battY + 12); ctx.lineTo(cLeft + 6, battY + 12); ctx.stroke();
                            viz.screenText(emf.toFixed(0) + 'V', cLeft - 25, battY, viz.colors.green, 12, 'right');

                            // R1 on top
                            var r1cx = cMid - 60;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(r1cx - 30, cTop - 8, 60, 16);
                            viz.screenText('R\u2081=' + R1.toFixed(1) + '\u03A9', r1cx, cTop - 18, viz.colors.orange, 11, 'center');

                            // R2 on bottom or right
                            var r2cx = cMid + 60;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(r2cx - 30, cBot - 8, 60, 16);
                            viz.screenText('R\u2082=' + R2.toFixed(1) + '\u03A9', r2cx, cBot + 22, viz.colors.blue, 11, 'center');

                            // Current arrow
                            var arrX = cMid + 30;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(arrX + 8, cTop + 1);
                            ctx.lineTo(arrX - 4, cTop - 6);
                            ctx.lineTo(arrX - 4, cTop + 8);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I = ' + I.toFixed(2) + ' A', cMid + 60, cTop - 18, viz.colors.yellow, 11, 'center');

                            // Summary
                            viz.screenText('\u03A3\u0394V = +' + emf.toFixed(1) + ' - ' + V1.toFixed(1) + ' - ' + V2.toFixed(1) + ' = 0  \u2714', viz.width / 2, viz.height - 15, viz.colors.white, 13, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A \\(9\\,\\text{V}\\) battery drives current through resistors \\(R_1 = 2\\,\\Omega\\), \\(R_2 = 4\\,\\Omega\\), \\(R_3 = 3\\,\\Omega\\) in series. Find the current and the voltage across each resistor.',
                    hint: 'Total resistance in series is \\(R_1 + R_2 + R_3\\). Apply KVL.',
                    solution: '\\(I = 9/(2+4+3) = 1\\,\\text{A}\\). \\(V_1 = 2\\,\\text{V}\\), \\(V_2 = 4\\,\\text{V}\\), \\(V_3 = 3\\,\\text{V}\\). Sum = 9 V. \\(\\checkmark\\)'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Solving Simple Circuits
        // ============================================================
        {
            id: 'ch07-sec03',
            title: 'Solving Simple Circuits',
            content: `<h2>7.3 Solving Simple Circuits with Kirchhoff's Laws</h2>

<div class="env-block intuition">
    <div class="env-title">A Systematic Approach</div>
    <div class="env-body">
        <p>Kirchhoff's laws convert a circuit diagram into a system of linear equations. The procedure is mechanical: label currents, write KCL at junctions and KVL around loops, then solve. This section develops that skill step by step.</p>
    </div>
</div>

<h3>Step-by-Step Method</h3>

<ol>
    <li><strong>Label all unknown currents.</strong> Assign a direction (your best guess). If the answer comes out negative, the actual direction is opposite.</li>
    <li><strong>Identify junctions</strong> and write a KCL equation for each independent junction. (If there are \\(n\\) junctions, you need \\(n - 1\\) KCL equations.)</li>
    <li><strong>Identify loops</strong> and write a KVL equation for each independent loop.</li>
    <li><strong>Solve the system</strong> of equations for the unknown currents.</li>
</ol>

<div class="env-block theorem">
    <div class="env-title">Number of Independent Equations</div>
    <div class="env-body">
        <p>For a circuit with \\(b\\) branches (each carrying a separate current), \\(n\\) nodes, and \\(\\ell\\) independent loops:</p>
        \\[b = (n - 1) + \\ell\\]
        <p>You need \\(n - 1\\) KCL equations and \\(\\ell\\) KVL equations to solve for all \\(b\\) unknowns.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 7.4 &mdash; Two-Battery Circuit</div>
    <div class="env-body">
        <p>A circuit has two batteries: \\(\\mathcal{E}_1 = 12\\,\\text{V}\\) with internal resistance \\(r_1 = 1\\,\\Omega\\), and \\(\\mathcal{E}_2 = 6\\,\\text{V}\\) with \\(r_2 = 0.5\\,\\Omega\\), connected by a \\(R = 5\\,\\Omega\\) external resistor. Both batteries drive current in the same direction. Find the current.</p>
        <p><strong>Solution.</strong> Single loop, one current \\(I\\). By KVL:</p>
        \\[\\mathcal{E}_1 + \\mathcal{E}_2 - I r_1 - I r_2 - I R = 0\\]
        \\[12 + 6 = I(1 + 0.5 + 5) \\quad \\Rightarrow \\quad I = \\frac{18}{6.5} \\approx 2.77\\,\\text{A}\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 7.5 &mdash; Opposing Batteries</div>
    <div class="env-body">
        <p>Same setup, but \\(\\mathcal{E}_2\\) is reversed (opposing \\(\\mathcal{E}_1\\)). Now KVL gives:</p>
        \\[12 - 6 = I(1 + 0.5 + 5) \\quad \\Rightarrow \\quad I = \\frac{6}{6.5} \\approx 0.92\\,\\text{A}\\]
        <p>Current flows in the direction driven by the larger EMF.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-simple-circuit"></div>

<div class="env-block remark">
    <div class="env-title">Sanity Checks</div>
    <div class="env-body">
        <p>After solving, verify: (1) KCL is satisfied at every junction. (2) KVL is satisfied around every loop. (3) All powers are positive (resistors dissipate energy). A negative power for a resistor signals an error.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-simple-circuit',
                    title: 'Two-Battery Circuit Solver',
                    description: 'Adjust the EMFs and resistances. Watch the current and voltage drops update in real time. Flip the second battery to see opposing EMFs.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 180 });
                        var ctx = viz.ctx;
                        var E1 = 12, E2 = 6, R = 5, r1 = 1, r2 = 0.5;
                        var flipped = false;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'E\u2081 (V)', 1, 24, E1, 1, function(v) { E1 = v; });
                        VizEngine.createSlider(controls, 'E\u2082 (V)', 1, 24, E2, 1, function(v) { E2 = v; });
                        VizEngine.createSlider(controls, 'R (\u03A9)', 1, 20, R, 0.5, function(v) { R = v; });
                        VizEngine.createButton(controls, 'Flip E\u2082', function() { flipped = !flipped; });

                        var electrons = [];

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;

                            var effectiveE2 = flipped ? -E2 : E2;
                            var I = (E1 + effectiveE2) / (r1 + r2 + R);
                            var dt = 0.016;

                            viz.clear();

                            // Circuit layout (rectangular loop)
                            var L = 80, Ri = viz.width - 80, T = 60, B = 260;
                            var midTop = (L + Ri) / 2;

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            // Top wire
                            ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(Ri, T); ctx.stroke();
                            // Right wire
                            ctx.beginPath(); ctx.moveTo(Ri, T); ctx.lineTo(Ri, B); ctx.stroke();
                            // Bottom wire
                            ctx.beginPath(); ctx.moveTo(Ri, B); ctx.lineTo(L, B); ctx.stroke();
                            // Left wire
                            ctx.beginPath(); ctx.moveTo(L, B); ctx.lineTo(L, T); ctx.stroke();

                            // Battery 1 (left side)
                            var b1y = (T + B) / 2;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(L - 15, b1y - 20, 30, 40);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(L - 12, b1y - 8); ctx.lineTo(L + 12, b1y - 8); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(L - 7, b1y + 4); ctx.lineTo(L + 7, b1y + 4); ctx.stroke();
                            viz.screenText('+', L + 16, b1y - 10, viz.colors.green, 12, 'left');
                            viz.screenText('-', L + 16, b1y + 6, viz.colors.green, 12, 'left');
                            viz.screenText('E\u2081=' + E1.toFixed(0) + 'V', L - 35, b1y, viz.colors.green, 11, 'right');

                            // Battery 2 (right side)
                            var b2y = (T + B) / 2;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(Ri - 15, b2y - 20, 30, 40);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            if (!flipped) {
                                ctx.beginPath(); ctx.moveTo(Ri - 12, b2y - 8); ctx.lineTo(Ri + 12, b2y - 8); ctx.stroke();
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(Ri - 7, b2y + 4); ctx.lineTo(Ri + 7, b2y + 4); ctx.stroke();
                                viz.screenText('+', Ri - 16, b2y - 10, viz.colors.teal, 12, 'right');
                                viz.screenText('-', Ri - 16, b2y + 6, viz.colors.teal, 12, 'right');
                            } else {
                                ctx.beginPath(); ctx.moveTo(Ri - 12, b2y + 4); ctx.lineTo(Ri + 12, b2y + 4); ctx.stroke();
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(Ri - 7, b2y - 8); ctx.lineTo(Ri + 7, b2y - 8); ctx.stroke();
                                viz.screenText('-', Ri - 16, b2y - 10, viz.colors.red, 12, 'right');
                                viz.screenText('+', Ri - 16, b2y + 6, viz.colors.red, 12, 'right');
                            }
                            viz.screenText('E\u2082=' + E2.toFixed(0) + 'V' + (flipped ? ' (flipped)' : ''), Ri + 35, b2y, viz.colors.teal, 11, 'left');

                            // Resistor R (top)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(midTop - 40, T - 10, 80, 20);
                            viz.screenText('R=' + R.toFixed(1) + '\u03A9', midTop, T - 18, viz.colors.orange, 11, 'center');

                            // Animate electrons around the loop
                            var speed = Math.abs(I) * 8;
                            var dir = I >= 0 ? 1 : -1;

                            // Draw animated dots along the loop perimeter
                            var perimeter = 2 * (Ri - L) + 2 * (B - T);
                            var nDots = 16;
                            for (var d = 0; d < nDots; d++) {
                                var frac = ((d / nDots) + phase * 0.15 * dir * (Math.abs(I) / 3)) % 1;
                                if (frac < 0) frac += 1;
                                var dist = frac * perimeter;
                                var dx2, dy2;
                                var seg1 = Ri - L, seg2 = seg1 + (B - T), seg3 = seg2 + (Ri - L);
                                if (dist < seg1) {
                                    dx2 = L + dist; dy2 = T;
                                } else if (dist < seg2) {
                                    dx2 = Ri; dy2 = T + (dist - seg1);
                                } else if (dist < seg3) {
                                    dx2 = Ri - (dist - seg2); dy2 = B;
                                } else {
                                    dx2 = L; dy2 = B - (dist - seg3);
                                }
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 8;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.arc(dx2, dy2, 3.5, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                            }

                            // Current info
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(15, viz.height - 75, 280, 65);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(15, viz.height - 75, 280, 65);

                            viz.screenText('I = (E\u2081' + (flipped ? ' - ' : ' + ') + 'E\u2082) / (r\u2081+r\u2082+R)', 25, viz.height - 60, viz.colors.text, 11, 'left');
                            viz.screenText('I = (' + E1.toFixed(0) + (flipped ? ' - ' : ' + ') + E2.toFixed(0) + ') / (' + r1 + '+' + r2 + '+' + R.toFixed(1) + ')', 25, viz.height - 42, viz.colors.white, 12, 'left');
                            viz.screenText('I = ' + I.toFixed(3) + ' A' + (I < 0 ? '  (reversed)' : ''), 25, viz.height - 22, viz.colors.yellow, 14, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two batteries \\(\\mathcal{E}_1 = 10\\,\\text{V}\\) and \\(\\mathcal{E}_2 = 4\\,\\text{V}\\) oppose each other through a \\(3\\,\\Omega\\) resistor. Find the current.',
                    hint: 'Opposing EMFs: net EMF = \\(\\mathcal{E}_1 - \\mathcal{E}_2\\).',
                    solution: '\\(I = (10 - 4)/3 = 2\\,\\text{A}\\), flowing in the direction of the larger EMF.'
                },
                {
                    question: 'In a single loop with \\(\\mathcal{E} = 15\\,\\text{V}\\), \\(R_1 = 3\\,\\Omega\\), \\(R_2 = 2\\,\\Omega\\), and an unknown \\(R_3\\), the current is \\(1.5\\,\\text{A}\\). Find \\(R_3\\).',
                    hint: 'Use KVL: \\(\\mathcal{E} = I(R_1 + R_2 + R_3)\\).',
                    solution: '\\(15 = 1.5(3 + 2 + R_3) \\Rightarrow R_3 = 10 - 5 = 5\\,\\Omega\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Multi-Loop Circuits
        // ============================================================
        {
            id: 'ch07-sec04',
            title: 'Multi-Loop Circuits',
            content: `<h2>7.4 Multi-Loop Circuits</h2>

<div class="env-block intuition">
    <div class="env-title">Beyond a Single Loop</div>
    <div class="env-body">
        <p>When a circuit has branches and multiple loops, a single KVL equation is no longer sufficient. We need both KCL (at junctions) and KVL (around each independent loop), producing a system of simultaneous equations. This is where Kirchhoff's laws truly shine.</p>
    </div>
</div>

<h3>Worked Example: Two-Loop Circuit</h3>

<div class="env-block example">
    <div class="env-title">Example 7.6 &mdash; Classic Two-Loop Problem</div>
    <div class="env-body">
        <p>Consider a circuit with two loops sharing a middle branch:</p>
        <ul>
            <li>Left loop: \\(\\mathcal{E}_1 = 10\\,\\text{V}\\), \\(R_1 = 2\\,\\Omega\\)</li>
            <li>Right loop: \\(\\mathcal{E}_2 = 6\\,\\text{V}\\), \\(R_2 = 4\\,\\Omega\\)</li>
            <li>Middle branch: \\(R_3 = 3\\,\\Omega\\)</li>
        </ul>
        <p>Label currents: \\(I_1\\) (left), \\(I_2\\) (right), \\(I_3\\) (middle, downward).</p>
        <p><strong>KCL at top junction:</strong> \\(I_1 = I_2 + I_3\\) (equivalently, \\(I_3 = I_1 - I_2\\))</p>
        <p><strong>KVL, left loop (clockwise):</strong></p>
        \\[10 - 2I_1 - 3I_3 = 0 \\quad \\Rightarrow \\quad 10 - 2I_1 - 3(I_1 - I_2) = 0\\]
        \\[10 = 5I_1 - 3I_2 \\quad \\cdots (1)\\]
        <p><strong>KVL, right loop (clockwise):</strong></p>
        \\[-6 + 4I_2 + 3I_3 = 0 \\quad \\Rightarrow \\quad -6 + 4I_2 + 3(I_1 - I_2) = 0\\]
        \\[6 = 3I_1 + I_2 \\quad \\cdots (2)\\]
        <p>Solving (1) and (2): From (2), \\(I_2 = 6 - 3I_1\\). Substituting into (1):</p>
        \\[10 = 5I_1 - 3(6 - 3I_1) = 14I_1 - 18 \\quad \\Rightarrow \\quad I_1 = 2\\,\\text{A}\\]
        \\[I_2 = 6 - 6 = 0\\,\\text{A}, \\quad I_3 = 2\\,\\text{A}\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-multi-loop"></div>

<div class="env-block remark">
    <div class="env-title">Mesh Current Method (Preview)</div>
    <div class="env-body">
        <p>In more advanced courses, you will learn the <strong>mesh current method</strong>: assign a circulating current to each independent loop, then write KVL directly in terms of mesh currents. This automatically satisfies KCL and reduces the number of unknowns. For now, the branch-current method above is clear and general.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-multi-loop',
                    title: 'Interactive Two-Loop Circuit',
                    description: 'Adjust E\u2081, E\u2082, and all three resistances. The solver displays the three branch currents in real time, with animated electron flow.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 200 });
                        var ctx = viz.ctx;
                        var E1 = 10, E2 = 6, R1 = 2, R2 = 4, R3 = 3;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'E\u2081 (V)', 1, 20, E1, 1, function(v) { E1 = v; });
                        VizEngine.createSlider(controls, 'E\u2082 (V)', 1, 20, E2, 1, function(v) { E2 = v; });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 1, 10, R1, 0.5, function(v) { R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 1, 10, R2, 0.5, function(v) { R2 = v; });
                        VizEngine.createSlider(controls, 'R\u2083 (\u03A9)', 1, 10, R3, 0.5, function(v) { R3 = v; });

                        function solve() {
                            // 5*I1 - 3*I2 = E1, 3*I1 + I2 = E2
                            // In general: (R1+R3)*I1 - R3*I2 = E1, R3*I1 + (R2+R3)*I2 = E2... wait
                            // Actually let me redo: KVL left: E1 - R1*I1 - R3*I3 = 0 with I3 = I1 - I2
                            // E1 = R1*I1 + R3*(I1-I2) = (R1+R3)*I1 - R3*I2  ... (1)
                            // KVL right: -E2 + R2*I2 + R3*I3 = 0 => -E2 + R2*I2 + R3*(I1-I2) = 0
                            // E2 = R3*I1 + (R2-R3)*I2 ... wait, R2*I2 + R3*(I1-I2) = R3*I1 + (R2-R3)*I2
                            // Hmm. Actually: -E2 + R2*I2 + R3*(I1 - I2) = 0
                            // R3*I1 + (R2 - R3)*I2 = E2
                            var a11 = R1 + R3, a12 = -R3;
                            var a21 = R3, a22 = R2 - R3;
                            // Wait, let me recheck. KVL right loop clockwise from top junction going right:
                            // Going down through R2 (in direction of I2): voltage drop = -R2*I2 ... hmm
                            // Let me be careful. Top junction: I1 enters from left, I2 exits right, I3 goes down.
                            // I1 = I2 + I3, so I3 = I1 - I2.
                            // Left loop CW from top-left: +E1, then across R1 drops -I1*R1, then down R3 drops -I3*R3
                            // E1 - I1*R1 - I3*R3 = 0 => E1 = I1*R1 + (I1-I2)*R3 = (R1+R3)*I1 - R3*I2
                            // Right loop CW from top junction: down R3 rises +I3*R3 (going against I3? depends on direction)
                            // Actually in right loop CW: from top junction go right, down through E2/R2, back up through R3.
                            // Down R2 branch: -E2 then drop -I2*R2... hmm direction matters.
                            // Let me just use: left loop: E1 = (R1+R3)*I1 - R3*I2
                            // Right loop: E2 = -R3*I1 + (R2+R3)*I2
                            // This is the standard result. Let me fix.
                            a11 = R1 + R3; a12 = -R3;
                            a21 = -R3; a22 = R2 + R3;
                            var det = a11 * a22 - a12 * a21;
                            var i1 = (E1 * a22 - E2 * a12) / det;
                            var i2 = (a11 * E2 - a21 * E1) / det;
                            var i3 = i1 - i2;
                            return { I1: i1, I2: i2, I3: i3 };
                        }

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;
                            var sol = solve();

                            viz.clear();

                            // Two-loop circuit layout
                            var L = 50, M = viz.width / 2, Ri = viz.width - 50;
                            var T = 55, B = 250;

                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;

                            // Top wires
                            ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(M, T); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(M, T); ctx.lineTo(Ri, T); ctx.stroke();
                            // Bottom wires
                            ctx.beginPath(); ctx.moveTo(L, B); ctx.lineTo(M, B); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(M, B); ctx.lineTo(Ri, B); ctx.stroke();
                            // Left side
                            ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.stroke();
                            // Right side
                            ctx.beginPath(); ctx.moveTo(Ri, T); ctx.lineTo(Ri, B); ctx.stroke();
                            // Middle branch
                            ctx.beginPath(); ctx.moveTo(M, T); ctx.lineTo(M, B); ctx.stroke();

                            // Junction dots
                            ctx.save();
                            ctx.fillStyle = viz.colors.white;
                            ctx.shadowColor = viz.colors.white;
                            ctx.shadowBlur = 10;
                            ctx.beginPath(); ctx.arc(M, T, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(M, B, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.restore();

                            // Battery E1 (left side)
                            var by1 = (T + B) / 2;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(L - 12, by1 - 16, 24, 32);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(L - 10, by1 - 6); ctx.lineTo(L + 10, by1 - 6); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(L - 6, by1 + 6); ctx.lineTo(L + 6, by1 + 6); ctx.stroke();
                            viz.screenText('E\u2081=' + E1.toFixed(0) + 'V', L - 8, by1 + 25, viz.colors.green, 11, 'center');

                            // Battery E2 (right side)
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(Ri - 12, by1 - 16, 24, 32);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(Ri - 10, by1 - 6); ctx.lineTo(Ri + 10, by1 - 6); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(Ri - 6, by1 + 6); ctx.lineTo(Ri + 6, by1 + 6); ctx.stroke();
                            viz.screenText('E\u2082=' + E2.toFixed(0) + 'V', Ri + 8, by1 + 25, viz.colors.teal, 11, 'center');

                            // Resistor R1 (top-left)
                            var r1x = (L + M) / 2;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(r1x - 25, T - 8, 50, 16);
                            viz.screenText('R\u2081=' + R1.toFixed(1), r1x, T - 16, viz.colors.orange, 10, 'center');

                            // Resistor R2 (top-right)
                            var r2x = (M + Ri) / 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(r2x - 25, T - 8, 50, 16);
                            viz.screenText('R\u2082=' + R2.toFixed(1), r2x, T - 16, viz.colors.blue, 10, 'center');

                            // Resistor R3 (middle)
                            var r3y = (T + B) / 2;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(M - 8, r3y - 25, 16, 50);
                            viz.screenText('R\u2083=' + R3.toFixed(1), M + 20, r3y, viz.colors.purple, 10, 'left');

                            // Animate electrons along each branch
                            function animDots(x1, y1, x2, y2, current, color, count) {
                                var sp = Math.abs(current) * 0.12;
                                var dir = current >= 0 ? 1 : -1;
                                for (var k = 0; k < count; k++) {
                                    var frac = ((k / count) + phase * sp * dir) % 1;
                                    if (frac < 0) frac += 1;
                                    var ex = x1 + frac * (x2 - x1);
                                    var ey = y1 + frac * (y2 - y1);
                                    ctx.save();
                                    ctx.shadowColor = color;
                                    ctx.shadowBlur = 6;
                                    ctx.fillStyle = color;
                                    ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }
                            }

                            // I1 top left (left to right along top)
                            animDots(L, T, M, T, sol.I1, viz.colors.orange, 6);
                            // I1 left side (top to bottom through battery)
                            animDots(L, B, L, T, sol.I1, viz.colors.orange, 6);
                            // I1 bottom left
                            animDots(M, B, L, B, sol.I1, viz.colors.orange, 6);

                            // I2 top right
                            animDots(M, T, Ri, T, sol.I2, viz.colors.blue, 6);
                            // I2 right side
                            animDots(Ri, T, Ri, B, sol.I2, viz.colors.blue, 6);
                            // I2 bottom right
                            animDots(Ri, B, M, B, sol.I2, viz.colors.blue, 6);

                            // I3 middle (downward)
                            animDots(M, T, M, B, sol.I3, viz.colors.purple, 5);

                            // Current labels
                            viz.screenText('I\u2081 = ' + sol.I1.toFixed(2) + ' A', r1x, T + 26, viz.colors.orange, 12, 'center');
                            viz.screenText('I\u2082 = ' + sol.I2.toFixed(2) + ' A', r2x, T + 26, viz.colors.blue, 12, 'center');
                            viz.screenText('I\u2083 = ' + sol.I3.toFixed(2) + ' A', M - 25, r3y + 35, viz.colors.purple, 12, 'center');

                            // KCL check
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, viz.height - 45, viz.width - 20, 38);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, viz.height - 45, viz.width - 20, 38);
                            viz.screenText('KCL: I\u2081 = I\u2082 + I\u2083 \u2192 ' + sol.I1.toFixed(2) + ' = ' + sol.I2.toFixed(2) + ' + ' + sol.I3.toFixed(2) + '  \u2714', viz.width / 2, viz.height - 26, viz.colors.white, 12, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the two-loop circuit of Example 7.6, what happens to \\(I_3\\) if \\(E_2\\) is increased to 10 V (with \\(E_1 = 10\\,\\text{V}\\))?',
                    hint: 'When \\(E_1 = E_2\\), by symmetry consider what the middle branch current should be (if \\(R_1 = R_2\\) it would be zero).',
                    solution: 'With \\(E_1 = E_2 = 10\\,\\text{V}\\): from (R1+R3)*I1 - R3*I2 = 10 and -R3*I1 + (R2+R3)*I2 = 10, solving gives \\(I_1 = 10(R2+R3)/D\\), \\(I_2 = 10(R1+R3)/D\\) where \\(D = (R1+R3)(R2+R3)-R3^2\\). With R1=2, R2=4, R3=3: \\(I_1 = 70/29 \\approx 2.41\\) A, \\(I_2 = 50/29 \\approx 1.72\\) A, \\(I_3 = 20/29 \\approx 0.69\\) A. The middle current decreases but does not vanish because \\(R_1 \\neq R_2\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: The Wheatstone Bridge
        // ============================================================
        {
            id: 'ch07-sec05',
            title: 'Wheatstone Bridge',
            content: `<h2>7.5 The Wheatstone Bridge</h2>

<div class="env-block intuition">
    <div class="env-title">Precision Measurement Through Balance</div>
    <div class="env-body">
        <p>The Wheatstone bridge is an elegant circuit that measures an unknown resistance with extraordinary precision. The key idea: when the bridge is <strong>balanced</strong>, no current flows through the galvanometer, and the unknown resistance can be read directly from a ratio. This null-measurement technique avoids errors from the meter's own resistance.</p>
    </div>
</div>

<h3>The Bridge Circuit</h3>

<p>The Wheatstone bridge consists of four resistors arranged in a diamond pattern, with a galvanometer (sensitive current meter) across the middle. A battery drives current through the diamond.</p>

<div class="env-block definition">
    <div class="env-title">Wheatstone Bridge Balance Condition</div>
    <div class="env-body">
        <p>The bridge is balanced (galvanometer reads zero) when:</p>
        \\[\\frac{R_1}{R_2} = \\frac{R_3}{R_4}\\]
        <p>or equivalently, \\(R_1 R_4 = R_2 R_3\\). If three resistances are known, the fourth is:</p>
        \\[R_x = R_3 \\cdot \\frac{R_2}{R_1}\\]
    </div>
</div>

<h3>Derivation of Balance</h3>

<p>When no current flows through the galvanometer, points B and D (the two middle nodes) are at the same potential. This means:</p>

\\[V_A - V_B = V_A - V_D \\quad \\Rightarrow \\quad I_1 R_1 = I_2 R_3\\]
\\[V_B - V_C = V_D - V_C \\quad \\Rightarrow \\quad I_1 R_2 = I_2 R_4\\]

<p>Dividing these two equations:</p>
\\[\\frac{R_1}{R_2} = \\frac{R_3}{R_4}\\]

<div class="env-block example">
    <div class="env-title">Example 7.7 &mdash; Finding Unknown Resistance</div>
    <div class="env-body">
        <p>In a Wheatstone bridge, \\(R_1 = 100\\,\\Omega\\), \\(R_2 = 200\\,\\Omega\\), \\(R_3 = 150\\,\\Omega\\). The bridge balances. Find \\(R_x\\) (= \\(R_4\\)).</p>
        <p><strong>Solution.</strong> \\(R_1/R_2 = R_3/R_x \\Rightarrow R_x = R_3 \\cdot R_2 / R_1 = 150 \\times 200/100 = 300\\,\\Omega\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-wheatstone"></div>

<div class="env-block remark">
    <div class="env-title">Applications</div>
    <div class="env-body">
        <p>Wheatstone bridges are used in strain gauges (structural engineering), temperature sensors (RTDs), and precision instrumentation. The bridge principle also extends to AC circuits (impedance bridges) for measuring capacitance and inductance.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-wheatstone',
                    title: 'Wheatstone Bridge: Galvanometer Deflection',
                    description: 'Adjust R\u2081 through R\u2084 and watch the galvanometer needle. When the bridge is balanced, the needle centers at zero. The closer to balance, the smaller the deflection.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 200 });
                        var ctx = viz.ctx;
                        var R1 = 100, R2 = 200, R3 = 150, R4 = 300;
                        var phase = 0;
                        var emf = 10;

                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 10, 500, R1, 10, function(v) { R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 10, 500, R2, 10, function(v) { R2 = v; });
                        VizEngine.createSlider(controls, 'R\u2083 (\u03A9)', 10, 500, R3, 10, function(v) { R3 = v; });
                        VizEngine.createSlider(controls, 'R\u2084 (\u03A9)', 10, 500, R4, 10, function(v) { R4 = v; });

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;

                            // Solve the bridge: galvanometer current
                            // For bridge with galvanometer Rg -> 0 (ideal), Ig = emf * (R1*R4 - R2*R3) / denominator
                            // More precisely, with Rg galvanometer:
                            // Simplified: Vb - Vd = emf * (R3/(R1+R3) - R4/(R2+R4))
                            var Vbd = emf * (R3 / (R1 + R3) - R4 / (R2 + R4));
                            var Ig = Vbd / 50; // assume Rg = 50 ohm
                            var balanced = Math.abs(R1 * R4 - R2 * R3) < 1;

                            viz.clear();

                            // Diamond layout
                            // A = left, C = right, B = top, D = bottom
                            var cx = viz.width / 2, cy = 160;
                            var dx = 160, dy = 90;
                            var Ax = cx - dx, Ay = cy;
                            var Cx = cx + dx, Cy = cy;
                            var Bx = cx, By = cy - dy;
                            var Dx = cx, Dy = cy + dy;

                            // Wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            // A-B (R1)
                            ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke();
                            // B-C (R2)
                            ctx.beginPath(); ctx.moveTo(Bx, By); ctx.lineTo(Cx, Cy); ctx.stroke();
                            // A-D (R3)
                            ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Dx, Dy); ctx.stroke();
                            // D-C (R4)
                            ctx.beginPath(); ctx.moveTo(Dx, Dy); ctx.lineTo(Cx, Cy); ctx.stroke();
                            // B-D (galvanometer)
                            ctx.strokeStyle = balanced ? viz.colors.green : viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(Bx, By); ctx.lineTo(Dx, Dy); ctx.stroke();

                            // Node labels
                            ctx.save();
                            ctx.fillStyle = viz.colors.white;
                            ctx.shadowColor = viz.colors.white;
                            ctx.shadowBlur = 8;
                            ctx.beginPath(); ctx.arc(Ax, Ay, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(Bx, By, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(Cx, Cy, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(Dx, Dy, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.restore();

                            viz.screenText('A', Ax - 14, Ay, viz.colors.white, 13, 'right');
                            viz.screenText('B', Bx, By - 14, viz.colors.white, 13, 'center');
                            viz.screenText('C', Cx + 14, Cy, viz.colors.white, 13, 'left');
                            viz.screenText('D', Dx, Dy + 18, viz.colors.white, 13, 'center');

                            // Resistor labels on diamond edges
                            var abmx = (Ax + Bx) / 2 - 15, abmy = (Ay + By) / 2;
                            viz.screenText('R\u2081=' + R1.toFixed(0), abmx, abmy - 6, viz.colors.orange, 11, 'right');
                            var bcmx = (Bx + Cx) / 2 + 15, bcmy = (By + Cy) / 2;
                            viz.screenText('R\u2082=' + R2.toFixed(0), bcmx, bcmy - 6, viz.colors.blue, 11, 'left');
                            var admx = (Ax + Dx) / 2 - 15, admy = (Ay + Dy) / 2;
                            viz.screenText('R\u2083=' + R3.toFixed(0), admx, admy + 6, viz.colors.teal, 11, 'right');
                            var dcmx = (Dx + Cx) / 2 + 15, dcmy = (Dy + Cy) / 2;
                            viz.screenText('R\u2084=' + R4.toFixed(0), dcmx, dcmy + 6, viz.colors.purple, 11, 'left');

                            // Resistor boxes
                            function drawResBox(x1, y1, x2, y2, color) {
                                var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
                                ctx.save();
                                ctx.translate(mx, my);
                                var angle = Math.atan2(y2 - y1, x2 - x1);
                                ctx.rotate(angle);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(-20, -6, 40, 12);
                                ctx.fillStyle = color + '22';
                                ctx.fillRect(-20, -6, 40, 12);
                                ctx.restore();
                            }
                            drawResBox(Ax, Ay, Bx, By, viz.colors.orange);
                            drawResBox(Bx, By, Cx, Cy, viz.colors.blue);
                            drawResBox(Ax, Ay, Dx, Dy, viz.colors.teal);
                            drawResBox(Dx, Dy, Cx, Cy, viz.colors.purple);

                            // Galvanometer in the center
                            var gx = cx, gy = cy;
                            var galvR = 28;
                            ctx.save();
                            ctx.fillStyle = '#1a1a40';
                            ctx.strokeStyle = balanced ? viz.colors.green : viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(gx, gy, galvR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                            // Galvanometer needle
                            var needleAngle = VizEngine.clamp(Ig * 30, -Math.PI / 3, Math.PI / 3);
                            var needleLen = galvR - 5;
                            var nx = gx + Math.sin(needleAngle) * needleLen;
                            var ny = gy - Math.cos(needleAngle) * needleLen;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(gx, gy + 3); ctx.lineTo(nx, ny); ctx.stroke();
                            // Needle tip
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(nx, ny, 3, 0, Math.PI * 2); ctx.fill();
                            // Center pivot
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(gx, gy, 3, 0, Math.PI * 2); ctx.fill();
                            // Scale marks
                            for (var sm = -3; sm <= 3; sm++) {
                                var sa = sm * (Math.PI / 9);
                                var smx = gx + Math.sin(sa) * (galvR - 2);
                                var smy = gy - Math.cos(sa) * (galvR - 2);
                                var smx2 = gx + Math.sin(sa) * (galvR + 2);
                                var smy2 = gy - Math.cos(sa) * (galvR + 2);
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(smx, smy); ctx.lineTo(smx2, smy2); ctx.stroke();
                            }
                            viz.screenText('G', gx, gy + galvR + 14, viz.colors.text, 10, 'center');
                            ctx.restore();

                            // Battery between A and C (shown below)
                            viz.screenText('+', Ax + 10, Ay + 18, viz.colors.green, 11, 'center');
                            viz.screenText('E=' + emf + 'V', cx, Dy + 40, viz.colors.green, 12, 'center');

                            // Animated electron flow along branches (when not balanced, also through galv)
                            var Itop = emf / (R1 + R2);
                            var Ibot = emf / (R3 + R4);

                            function animEdge(x1, y1, x2, y2, cur, color, n) {
                                var sp = Math.abs(cur) * 300;
                                var dir = cur >= 0 ? 1 : -1;
                                for (var k = 0; k < n; k++) {
                                    var frac = ((k / n) + phase * sp * dir * 0.0001) % 1;
                                    if (frac < 0) frac += 1;
                                    var ex = x1 + frac * (x2 - x1);
                                    var ey = y1 + frac * (y2 - y1);
                                    ctx.save();
                                    ctx.shadowColor = color;
                                    ctx.shadowBlur = 5;
                                    ctx.fillStyle = color;
                                    ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }
                            }

                            animEdge(Ax, Ay, Bx, By, Itop, viz.colors.cyan, 5);
                            animEdge(Bx, By, Cx, Cy, Itop, viz.colors.cyan, 5);
                            animEdge(Ax, Ay, Dx, Dy, Ibot, viz.colors.cyan, 5);
                            animEdge(Dx, Dy, Cx, Cy, Ibot, viz.colors.cyan, 5);
                            if (Math.abs(Ig) > 0.001) {
                                animEdge(Bx, By, Dx, Dy, Ig, viz.colors.yellow, 3);
                            }

                            // Info panel
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, viz.height - 65, viz.width - 20, 55);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, viz.height - 65, viz.width - 20, 55);

                            var ratio1 = R1 / R2, ratio2 = R3 / R4;
                            viz.screenText('R\u2081/R\u2082 = ' + ratio1.toFixed(3) + '    R\u2083/R\u2084 = ' + ratio2.toFixed(3), viz.width / 2, viz.height - 48, viz.colors.text, 12, 'center');

                            if (balanced) {
                                viz.screenText('BALANCED! Ig = 0    R\u2081/R\u2082 = R\u2083/R\u2084  \u2714', viz.width / 2, viz.height - 26, viz.colors.green, 14, 'center');
                            } else {
                                var diff = Math.abs(ratio1 - ratio2);
                                viz.screenText('V_BD = ' + Vbd.toFixed(3) + ' V    Ig = ' + (Ig * 1000).toFixed(1) + ' mA    |imbalance| = ' + diff.toFixed(3), viz.width / 2, viz.height - 26, viz.colors.yellow, 12, 'center');
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A Wheatstone bridge has \\(R_1 = 120\\,\\Omega\\), \\(R_2 = 80\\,\\Omega\\), \\(R_3 = 150\\,\\Omega\\). Find \\(R_4\\) for balance.',
                    hint: 'Use \\(R_1 R_4 = R_2 R_3\\).',
                    solution: '\\(R_4 = R_2 R_3 / R_1 = 80 \\times 150 / 120 = 100\\,\\Omega\\).'
                },
                {
                    question: 'Why is a Wheatstone bridge more accurate than simply measuring resistance with an ohmmeter?',
                    hint: 'Think about what the galvanometer measures at balance.',
                    solution: 'At balance, the galvanometer reads <em>zero</em> current, so its internal resistance does not affect the measurement. An ohmmeter must draw current and its accuracy depends on its own calibration and internal resistance. The bridge is a <em>null</em> measurement, which is inherently more precise.'
                }
            ]
        }
    ]
});
