// === Chapter 6: Series & Parallel Circuits ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Series & Parallel Circuits',
    subtitle: 'How components share voltage and current',
    sections: [
        // ======================== Section 1 ========================
        {
            id: 'series-circuits',
            title: 'Series Circuits',
            content: `
<h2>Series Circuits</h2>

<div class="env-block env-intuition">
<div class="env-header">One Path, One Current</div>
<div class="env-body">
<p>Imagine a single-lane road with tollbooths along the way. Every car must pass through every tollbooth in sequence. In a series circuit, all components are connected end-to-end along a single path. The same current flows through every component, just as every car passes every tollbooth.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 6.1 — Series Connection</div>
<div class="env-body">
<p>Components are in <strong>series</strong> if they share exactly the same current. The current has only one path, so the same \\(I\\) flows through each component.</p>
</div>
</div>

<h3>Key Rules for Series Resistors</h3>

<div class="env-block env-theorem">
<div class="env-header">Series Resistors</div>
<div class="env-body">
<p>For \\(n\\) resistors in series:</p>
<ul>
<li><strong>Same current:</strong> \\(I_1 = I_2 = \\cdots = I_n = I\\)</li>
<li><strong>Voltages add:</strong> \\(V_{\\text{total}} = V_1 + V_2 + \\cdots + V_n\\)</li>
<li><strong>Equivalent resistance:</strong> \\(R_{\\text{eq}} = R_1 + R_2 + \\cdots + R_n\\)</li>
</ul>
</div>
</div>

<p>The derivation is straightforward. Applying Ohm's law to each resistor: \\(V_i = IR_i\\). The total voltage is \\(V = \\sum V_i = I \\sum R_i\\), so \\(R_{\\text{eq}} = \\sum R_i\\).</p>

<div class="viz-placeholder" data-viz="series-circuit-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 6.1</div>
<div class="env-body">
<p>Three resistors (\\(10\\;\\Omega\\), \\(20\\;\\Omega\\), \\(30\\;\\Omega\\)) are connected in series to a 12 V battery. Find the current and the voltage across each resistor.</p>
<p><strong>Solution.</strong> \\(R_{\\text{eq}} = 10 + 20 + 30 = 60\\;\\Omega\\). \\(I = 12/60 = 0.2\\) A. \\(V_1 = 0.2 \\times 10 = 2\\) V, \\(V_2 = 0.2 \\times 20 = 4\\) V, \\(V_3 = 0.2 \\times 30 = 6\\) V. Check: \\(2 + 4 + 6 = 12\\) V.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">The Weakest Link</div>
<div class="env-body">
<p>In a series circuit, if any component breaks (open circuit), the entire circuit stops working, since there is only one path for current. This is why old-style Christmas lights (wired in series) would all go out when one bulb failed.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A \\(100\\;\\Omega\\) and a \\(300\\;\\Omega\\) resistor are in series with a 20 V source. Find \\(I\\), \\(V_1\\), \\(V_2\\), and the power dissipated in each resistor.',
                    hint: 'Find \\(I\\) first from \\(R_{\\text{eq}}\\). Then \\(V = IR\\) and \\(P = I^2R\\) for each.',
                    solution: '\\(R_{\\text{eq}} = 400\\;\\Omega\\). \\(I = 20/400 = 0.05\\) A. \\(V_1 = 5\\) V, \\(V_2 = 15\\) V. \\(P_1 = (0.05)^2 \\times 100 = 0.25\\) W, \\(P_2 = (0.05)^2 \\times 300 = 0.75\\) W. Total power: 1 W \\(= V \\cdot I\\).'
                },
                {
                    question: 'You have a 9 V battery and need 3 V across an LED. What series resistor do you need if the LED requires 20 mA?',
                    hint: 'The resistor must drop \\(9 - 3 = 6\\) V at \\(I = 20\\) mA.',
                    solution: '\\(R = V/I = 6/0.02 = 300\\;\\Omega\\).'
                }
            ],
            visualizations: [
                {
                    id: 'series-circuit-viz',
                    title: 'Interactive Series Circuit',
                    description: 'Adjust the battery voltage and resistor values. Watch electrons flow (speed proportional to current) and each resistor glow in proportion to the power it dissipates. Voltage drops are shown in real time.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var W = viz.width, H = viz.height;
                        var params = { Vbat: 12, R1: 10, R2: 20, R3: 30 };
                        var t0 = null;

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var t = (timestamp - t0) / 1000;
                            viz.clear();
                            var ctx = viz.ctx;

                            var Req = params.R1 + params.R2 + params.R3;
                            var I = Req > 0 ? params.Vbat / Req : 0;
                            var V1 = I * params.R1;
                            var V2 = I * params.R2;
                            var V3 = I * params.R3;
                            var P1 = I * I * params.R1;
                            var P2 = I * I * params.R2;
                            var P3 = I * I * params.R3;
                            var Pmax = Math.max(P1, P2, P3, 0.01);

                            // Circuit layout
                            var mx = 60, my = 60; // margins
                            var cw = W - 2 * mx, ch = H - 2 * my;

                            // Battery on the left side (vertical)
                            var batX = mx;
                            var batY1 = my + ch * 0.3;
                            var batY2 = my + ch * 0.7;

                            // Resistors along the top
                            var topY = my;
                            var botY = my + ch;
                            var r1x1 = mx + cw * 0.15, r1x2 = mx + cw * 0.35;
                            var r2x1 = mx + cw * 0.40, r2x2 = mx + cw * 0.60;
                            var r3x1 = mx + cw * 0.65, r3x2 = mx + cw * 0.85;

                            // Draw wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;

                            // Battery top wire
                            ctx.beginPath();
                            ctx.moveTo(batX, batY1);
                            ctx.lineTo(batX, topY);
                            ctx.lineTo(r1x1, topY);
                            ctx.stroke();

                            // Between R1 and R2
                            ctx.beginPath(); ctx.moveTo(r1x2, topY); ctx.lineTo(r2x1, topY); ctx.stroke();
                            // Between R2 and R3
                            ctx.beginPath(); ctx.moveTo(r2x2, topY); ctx.lineTo(r3x1, topY); ctx.stroke();
                            // R3 to right and down
                            ctx.beginPath();
                            ctx.moveTo(r3x2, topY);
                            ctx.lineTo(mx + cw, topY);
                            ctx.lineTo(mx + cw, botY);
                            ctx.lineTo(batX, botY);
                            ctx.lineTo(batX, batY2);
                            ctx.stroke();

                            // Draw battery
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(batX - 12, batY1); ctx.lineTo(batX + 12, batY1); ctx.stroke();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(batX - 7, batY2); ctx.lineTo(batX + 7, batY2); ctx.stroke();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+', batX - 20, batY1 + 4);
                            ctx.fillText('\u2013', batX - 20, batY2 + 4);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(params.Vbat.toFixed(0) + ' V', batX, (batY1 + batY2) / 2 + 4);

                            // Draw resistors as glowing blocks
                            var resistors = [
                                { x1: r1x1, x2: r1x2, R: params.R1, V: V1, P: P1, label: 'R\u2081' },
                                { x1: r2x1, x2: r2x2, R: params.R2, V: V2, P: P2, label: 'R\u2082' },
                                { x1: r3x1, x2: r3x2, R: params.R3, V: V3, P: P3, label: 'R\u2083' }
                            ];
                            var rColors = [viz.colors.orange, viz.colors.teal, viz.colors.purple];

                            for (var ri = 0; ri < resistors.length; ri++) {
                                var r = resistors[ri];
                                var rc = rColors[ri];
                                var rw = r.x2 - r.x1;
                                var rh = 24;
                                var ry = topY - rh / 2;
                                var glow = VizEngine.clamp(r.P / Pmax, 0, 1);

                                // Glow
                                ctx.save();
                                ctx.shadowColor = rc;
                                ctx.shadowBlur = 5 + glow * 25;
                                ctx.fillStyle = rc;
                                ctx.globalAlpha = 0.3 + glow * 0.7;
                                ctx.fillRect(r.x1, ry, rw, rh);
                                ctx.restore();
                                ctx.globalAlpha = 1;

                                // Border
                                ctx.strokeStyle = rc;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(r.x1, ry, rw, rh);

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(r.label + '=' + r.R.toFixed(0) + '\u03a9', (r.x1 + r.x2) / 2, ry - 8);

                                // Voltage drop
                                ctx.fillStyle = rc;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(r.V.toFixed(2) + ' V', (r.x1 + r.x2) / 2, ry + rh + 16);

                                // Power
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(r.P.toFixed(2) + ' W', (r.x1 + r.x2) / 2, ry + rh + 30);
                            }

                            // Animated electrons
                            var speed = I * 80; // px/s proportional to current
                            var nDots = 12;
                            ctx.globalAlpha = 0.85;

                            // Define path segments for electron flow
                            // Path: bat_top -> top_left -> R1 -> R2 -> R3 -> top_right -> bot_right -> bot_left -> bat_bot
                            var path = [
                                { x: batX, y: batY1 },      // 0
                                { x: batX, y: topY },        // 1
                                { x: r1x1, y: topY },        // 2
                                { x: r1x2, y: topY },        // 3
                                { x: r2x1, y: topY },        // 4
                                { x: r2x2, y: topY },        // 5
                                { x: r3x1, y: topY },        // 6
                                { x: r3x2, y: topY },        // 7
                                { x: mx + cw, y: topY },     // 8
                                { x: mx + cw, y: botY },     // 9
                                { x: batX, y: botY },        // 10
                                { x: batX, y: batY2 }        // 11
                            ];

                            // Compute total path length
                            var segLens = [];
                            var totalLen = 0;
                            for (var si = 0; si < path.length; si++) {
                                var ni = (si + 1) % path.length;
                                var dx = path[ni].x - path[si].x;
                                var dy = path[ni].y - path[si].y;
                                var sl = Math.sqrt(dx * dx + dy * dy);
                                segLens.push(sl);
                                totalLen += sl;
                            }

                            for (var di = 0; di < nDots; di++) {
                                var phase = ((speed * t + di * totalLen / nDots) % totalLen);
                                if (phase < 0) phase += totalLen;
                                // Find which segment
                                var acc = 0;
                                for (var sj = 0; sj < segLens.length; sj++) {
                                    if (acc + segLens[sj] >= phase) {
                                        var frac = (phase - acc) / segLens[sj];
                                        var nj = (sj + 1) % path.length;
                                        var ex = path[sj].x + frac * (path[nj].x - path[sj].x);
                                        var ey = path[sj].y + frac * (path[nj].y - path[sj].y);
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.cyan;
                                        ctx.shadowBlur = 8;
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath();
                                        ctx.arc(ex, ey, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                        break;
                                    }
                                    acc += segLens[sj];
                                }
                            }
                            ctx.globalAlpha = 1;

                            // Current readout
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(W - 185, H - 60, 175, 50);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(W - 185, H - 60, 175, 50);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('I = ' + I.toFixed(3) + ' A', W - 175, H - 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('R_eq = ' + Req.toFixed(0) + ' \u03a9', W - 175, H - 22);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'Battery V', 1, 30, params.Vbat, 1, function(v) { params.Vbat = v; });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03a9)', 5, 100, params.R1, 5, function(v) { params.R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03a9)', 5, 100, params.R2, 5, function(v) { params.R2 = v; });
                        VizEngine.createSlider(controls, 'R\u2083 (\u03a9)', 5, 100, params.R3, 5, function(v) { params.R3 = v; });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 2 ========================
        {
            id: 'parallel-circuits',
            title: 'Parallel Circuits',
            content: `
<h2>Parallel Circuits</h2>

<div class="env-block env-intuition">
<div class="env-header">Multiple Paths, Shared Voltage</div>
<div class="env-body">
<p>Now imagine a highway with multiple lanes. Cars (charges) can take any lane, and more lanes means more total traffic flow. In a parallel circuit, components are connected across the same two nodes, so they share the same voltage. The current splits among the branches, with more current flowing through paths of lower resistance.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 6.2 — Parallel Connection</div>
<div class="env-body">
<p>Components are in <strong>parallel</strong> if they are connected between the same pair of nodes. They share the same voltage \\(V\\), and the total current splits among the branches.</p>
</div>
</div>

<h3>Key Rules for Parallel Resistors</h3>

<div class="env-block env-theorem">
<div class="env-header">Parallel Resistors</div>
<div class="env-body">
<p>For \\(n\\) resistors in parallel:</p>
<ul>
<li><strong>Same voltage:</strong> \\(V_1 = V_2 = \\cdots = V_n = V\\)</li>
<li><strong>Currents add:</strong> \\(I_{\\text{total}} = I_1 + I_2 + \\cdots + I_n\\)</li>
<li><strong>Equivalent resistance:</strong> \\(\\displaystyle\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots + \\frac{1}{R_n}\\)</li>
</ul>
<p>For two resistors: \\(R_{\\text{eq}} = \\dfrac{R_1 R_2}{R_1 + R_2}\\).</p>
</div>
</div>

<p>The equivalent resistance of a parallel combination is always <em>less</em> than the smallest individual resistance. Adding more paths always makes it easier for current to flow.</p>

<div class="viz-placeholder" data-viz="parallel-circuit-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 6.2</div>
<div class="env-body">
<p>A \\(6\\;\\Omega\\) and a \\(12\\;\\Omega\\) resistor are connected in parallel across a 12 V battery. Find the total current and the current through each resistor.</p>
<p><strong>Solution.</strong> \\(R_{\\text{eq}} = (6 \\times 12)/(6 + 12) = 72/18 = 4\\;\\Omega\\). Total \\(I = 12/4 = 3\\) A. \\(I_1 = 12/6 = 2\\) A, \\(I_2 = 12/12 = 1\\) A. Check: \\(2 + 1 = 3\\) A.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Parallel Advantage</div>
<div class="env-body">
<p>In parallel, each component operates independently. If one branch fails (open circuit), the others continue to work. This is why household wiring is parallel: turning off one light does not affect the others.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Three \\(60\\;\\Omega\\) resistors are in parallel. What is \\(R_{\\text{eq}}\\)?',
                    hint: '\\(1/R_{\\text{eq}} = 3/60\\).',
                    solution: '\\(R_{\\text{eq}} = 60/3 = 20\\;\\Omega\\). For \\(n\\) identical resistors in parallel, \\(R_{\\text{eq}} = R/n\\).'
                },
                {
                    question: 'A \\(10\\;\\Omega\\) and \\(40\\;\\Omega\\) resistor are in parallel across a 20 V source. Find \\(R_{\\text{eq}}\\), \\(I_{\\text{total}}\\), \\(I_1\\), and \\(I_2\\). Verify that \\(I_{\\text{total}} = I_1 + I_2\\).',
                    hint: 'Product-over-sum for two resistors. Then \\(I_i = V/R_i\\).',
                    solution: '\\(R_{\\text{eq}} = (10 \\times 40)/(10 + 40) = 400/50 = 8\\;\\Omega\\). \\(I_{\\text{total}} = 20/8 = 2.5\\) A. \\(I_1 = 20/10 = 2\\) A, \\(I_2 = 20/40 = 0.5\\) A. Check: \\(2 + 0.5 = 2.5\\) A.'
                }
            ],
            visualizations: [
                {
                    id: 'parallel-circuit-viz',
                    title: 'Interactive Parallel Circuit',
                    description: 'Two resistors in parallel. Electron speed in each branch is proportional to the branch current. Resistor glow intensity shows power dissipation.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var W = viz.width, H = viz.height;
                        var params = { Vbat: 12, R1: 10, R2: 30 };
                        var t0 = null;

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var t = (timestamp - t0) / 1000;
                            viz.clear();
                            var ctx = viz.ctx;

                            var Req = (params.R1 * params.R2) / (params.R1 + params.R2);
                            var Itot = params.Vbat / Req;
                            var I1 = params.Vbat / params.R1;
                            var I2 = params.Vbat / params.R2;
                            var P1 = I1 * I1 * params.R1;
                            var P2 = I2 * I2 * params.R2;
                            var Pmax = Math.max(P1, P2, 0.01);

                            // Layout: battery left, two branches top and bottom
                            var mx = 70, my = 50;
                            var cw = W - 2 * mx, ch = H - 2 * my;

                            // Nodes
                            var nodeL = { x: mx + cw * 0.2, y: my + ch * 0.5 };
                            var nodeR = { x: mx + cw * 0.8, y: my + ch * 0.5 };

                            var topY = my + ch * 0.2;
                            var botY = my + ch * 0.8;

                            // Battery
                            var batX = mx;
                            var batY = my + ch * 0.5;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(batX, batY - 25); ctx.lineTo(batX, my); ctx.lineTo(nodeL.x, my); ctx.lineTo(nodeL.x, nodeL.y); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(batX, batY + 25); ctx.lineTo(batX, my + ch); ctx.lineTo(nodeL.x, my + ch); ctx.lineTo(nodeL.x, nodeL.y); ctx.stroke();

                            // Battery symbol
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(batX - 12, batY - 25); ctx.lineTo(batX + 12, batY - 25); ctx.stroke();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(batX - 7, batY + 25); ctx.lineTo(batX + 7, batY + 25); ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(params.Vbat.toFixed(0) + ' V', batX, batY + 5);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('+', batX + 18, batY - 22);
                            ctx.fillText('\u2013', batX + 18, batY + 28);

                            // Node dots
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(nodeL.x, nodeL.y, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(nodeR.x, nodeR.y, 4, 0, Math.PI * 2); ctx.fill();

                            // Top branch (R1)
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(nodeL.x, nodeL.y); ctx.lineTo(nodeL.x, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeL.x, topY); ctx.lineTo(nodeL.x + cw * 0.15, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeR.x - cw * 0.15, topY); ctx.lineTo(nodeR.x, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeR.x, topY); ctx.lineTo(nodeR.x, nodeR.y); ctx.stroke();

                            // Bottom branch (R2)
                            ctx.beginPath(); ctx.moveTo(nodeL.x, nodeL.y); ctx.lineTo(nodeL.x, botY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeL.x, botY); ctx.lineTo(nodeL.x + cw * 0.15, botY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeR.x - cw * 0.15, botY); ctx.lineTo(nodeR.x, botY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeR.x, botY); ctx.lineTo(nodeR.x, nodeR.y); ctx.stroke();

                            // Right wire back
                            ctx.beginPath(); ctx.moveTo(nodeR.x, nodeR.y); ctx.lineTo(mx + cw, nodeR.y); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mx + cw, nodeR.y); ctx.lineTo(mx + cw, my); ctx.lineTo(nodeL.x, my); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mx + cw, nodeR.y); ctx.lineTo(mx + cw, my + ch); ctx.lineTo(nodeL.x, my + ch); ctx.stroke();

                            // Draw resistors
                            var rData = [
                                { cx: (nodeL.x + nodeR.x) / 2, cy: topY, R: params.R1, I: I1, P: P1, label: 'R\u2081', color: viz.colors.orange },
                                { cx: (nodeL.x + nodeR.x) / 2, cy: botY, R: params.R2, I: I2, P: P2, label: 'R\u2082', color: viz.colors.teal }
                            ];

                            for (var ri = 0; ri < rData.length; ri++) {
                                var rd = rData[ri];
                                var rw = cw * 0.3;
                                var rh = 24;
                                var rx = rd.cx - rw / 2;
                                var ry = rd.cy - rh / 2;
                                var glow = VizEngine.clamp(rd.P / Pmax, 0, 1);

                                // Wire through resistor
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(nodeL.x + cw * 0.15, rd.cy); ctx.lineTo(rx, rd.cy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(rx + rw, rd.cy); ctx.lineTo(nodeR.x - cw * 0.15, rd.cy); ctx.stroke();

                                // Glow block
                                ctx.save();
                                ctx.shadowColor = rd.color;
                                ctx.shadowBlur = 5 + glow * 25;
                                ctx.fillStyle = rd.color;
                                ctx.globalAlpha = 0.3 + glow * 0.7;
                                ctx.fillRect(rx, ry, rw, rh);
                                ctx.restore();
                                ctx.globalAlpha = 1;
                                ctx.strokeStyle = rd.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(rx, ry, rw, rh);

                                // Labels
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(rd.label + '=' + rd.R.toFixed(0) + '\u03a9', rd.cx, ry - 8);
                                ctx.fillStyle = rd.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('I=' + rd.I.toFixed(3) + ' A', rd.cx, ry + rh + 16);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(rd.P.toFixed(2) + ' W', rd.cx, ry + rh + 30);
                            }

                            // Animated electrons in top branch
                            var nDots = 6;
                            var topPath = [
                                { x: nodeL.x, y: nodeL.y },
                                { x: nodeL.x, y: topY },
                                { x: nodeR.x, y: topY },
                                { x: nodeR.x, y: nodeR.y }
                            ];
                            var botPath = [
                                { x: nodeL.x, y: nodeL.y },
                                { x: nodeL.x, y: botY },
                                { x: nodeR.x, y: botY },
                                { x: nodeR.x, y: nodeR.y }
                            ];

                            function drawElectronsOnPath(pathArr, current, nE) {
                                var lens = [];
                                var totLen = 0;
                                for (var k = 0; k < pathArr.length - 1; k++) {
                                    var ddx = pathArr[k + 1].x - pathArr[k].x;
                                    var ddy = pathArr[k + 1].y - pathArr[k].y;
                                    var ll = Math.sqrt(ddx * ddx + ddy * ddy);
                                    lens.push(ll);
                                    totLen += ll;
                                }
                                var spd = current * 60;
                                for (var ei = 0; ei < nE; ei++) {
                                    var ph = ((spd * t + ei * totLen / nE) % totLen);
                                    if (ph < 0) ph += totLen;
                                    var ac = 0;
                                    for (var sk = 0; sk < lens.length; sk++) {
                                        if (ac + lens[sk] >= ph) {
                                            var fr = (ph - ac) / lens[sk];
                                            var exx = pathArr[sk].x + fr * (pathArr[sk + 1].x - pathArr[sk].x);
                                            var eyy = pathArr[sk].y + fr * (pathArr[sk + 1].y - pathArr[sk].y);
                                            ctx.save();
                                            ctx.shadowColor = viz.colors.cyan;
                                            ctx.shadowBlur = 6;
                                            ctx.fillStyle = viz.colors.cyan;
                                            ctx.beginPath();
                                            ctx.arc(exx, eyy, 3.5, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.restore();
                                            break;
                                        }
                                        ac += lens[sk];
                                    }
                                }
                            }

                            drawElectronsOnPath(topPath, I1, Math.max(2, Math.round(I1 / Itot * 10)));
                            drawElectronsOnPath(botPath, I2, Math.max(2, Math.round(I2 / Itot * 10)));

                            // Readout
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(W - 185, H - 52, 175, 44);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(W - 185, H - 52, 175, 44);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('I_total = ' + Itot.toFixed(3) + ' A', W - 175, H - 32);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('R_eq = ' + Req.toFixed(2) + ' \u03a9', W - 175, H - 16);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'Battery V', 1, 30, params.Vbat, 1, function(v) { params.Vbat = v; });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03a9)', 5, 100, params.R1, 5, function(v) { params.R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03a9)', 5, 100, params.R2, 5, function(v) { params.R2 = v; });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 3 ========================
        {
            id: 'voltage-divider',
            title: 'Voltage Divider',
            content: `
<h2>The Voltage Divider</h2>

<div class="env-block env-intuition">
<div class="env-header">Splitting Voltage Proportionally</div>
<div class="env-body">
<p>One of the most useful circuits in electronics is the <strong>voltage divider</strong>: two resistors in series that split the source voltage into a desired fraction. It appears everywhere, from sensor circuits to audio volume controls.</p>
</div>
</div>

<h3>Derivation</h3>

<p>Two resistors \\(R_1\\) and \\(R_2\\) in series across a voltage \\(V_{\\text{in}}\\). The current is \\(I = V_{\\text{in}}/(R_1 + R_2)\\). The voltage across \\(R_2\\) is:</p>

<div class="env-block env-theorem">
<div class="env-header">Voltage Divider Formula</div>
<div class="env-body">
\\[V_{\\text{out}} = V_{\\text{in}} \\cdot \\frac{R_2}{R_1 + R_2}\\]
<p>The output voltage is a fraction of the input, determined entirely by the ratio of resistances.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="voltage-divider-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 6.3</div>
<div class="env-body">
<p>You need 3.3 V from a 5 V supply. Using \\(R_2 = 10\\text{ k}\\Omega\\), find \\(R_1\\).</p>
<p><strong>Solution.</strong> \\(3.3 = 5 \\times 10/(R_1 + 10)\\). So \\(R_1 + 10 = 50/3.3 = 15.15\\), giving \\(R_1 = 5.15\\text{ k}\\Omega\\). Use the nearest standard value: \\(5.1\\text{ k}\\Omega\\).</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Loading Effect</div>
<div class="env-body">
<p>The voltage divider formula assumes no current is drawn from the output (open-circuit load). If you connect a load \\(R_L\\) across \\(R_2\\), the effective lower resistance becomes \\(R_2 \\| R_L\\), and the output voltage drops. For the divider to work well, \\(R_L \\gg R_2\\).</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 6.4</div>
<div class="env-body">
<p>A potentiometer (variable resistor) acts as a continuously adjustable voltage divider. If a 10 k\\(\\Omega\\) potentiometer is connected across 9 V and the wiper is at 30% from the bottom, what is the output voltage?</p>
<p><strong>Solution.</strong> \\(R_2 = 0.3 \\times 10 = 3\\text{ k}\\Omega\\), \\(R_1 = 7\\text{ k}\\Omega\\). \\(V_{\\text{out}} = 9 \\times 3/10 = 2.7\\) V.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Design a voltage divider using standard resistors to produce approximately 2 V from a 12 V supply. The current should be about 1 mA.',
                    hint: 'Total resistance \\(R_1 + R_2 = V/I = 12000\\;\\Omega\\). Then \\(R_2/(R_1+R_2) = 2/12\\).',
                    solution: '\\(R_1 + R_2 = 12\\text{ k}\\Omega\\). \\(R_2 = 12000 \\times (2/12) = 2\\text{ k}\\Omega\\) and \\(R_1 = 10\\text{ k}\\Omega\\). Standard values: \\(R_1 = 10\\text{ k}\\Omega\\), \\(R_2 = 2.2\\text{ k}\\Omega\\) gives \\(V_{\\text{out}} \\approx 2.16\\) V.'
                },
                {
                    question: 'A sensor has resistance that varies from \\(1\\text{ k}\\Omega\\) (cold) to \\(10\\text{ k}\\Omega\\) (hot). It is placed as \\(R_2\\) in a voltage divider with \\(R_1 = 5\\text{ k}\\Omega\\) and \\(V_{\\text{in}} = 5\\) V. What is the voltage range at the output?',
                    hint: 'Calculate \\(V_{\\text{out}}\\) at both extremes of \\(R_2\\).',
                    solution: 'Cold: \\(V_{\\text{out}} = 5 \\times 1/(5+1) = 0.83\\) V. Hot: \\(V_{\\text{out}} = 5 \\times 10/(5+10) = 3.33\\) V. Output ranges from 0.83 V to 3.33 V.'
                }
            ],
            visualizations: [
                {
                    id: 'voltage-divider-viz',
                    title: 'Voltage Divider Explorer',
                    description: 'Adjust \\(R_1\\) and \\(R_2\\) to see how the output voltage changes. The bar on the right shows the voltage "staircase" from \\(V_{\\text{in}}\\) down to 0.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var W = viz.width, H = viz.height;
                        var params = { Vin: 12, R1: 10, R2: 10 };

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var Rtot = params.R1 + params.R2;
                            var I = Rtot > 0 ? params.Vin / Rtot : 0;
                            var Vout = params.Vin * params.R2 / Rtot;
                            var V1 = I * params.R1;

                            // Circuit schematic (left side)
                            var cx = 140, topN = 50, botN = H - 50;
                            var midN = topN + (botN - topN) * (params.R1 / Rtot);

                            // Top wire
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx, topN); ctx.lineTo(cx, topN + 20); ctx.stroke();

                            // R1
                            var r1y1 = topN + 25, r1y2 = midN - 15;
                            var rw = 40, rxL = cx - rw / 2;
                            var glow1 = VizEngine.clamp(V1 / params.Vin, 0, 1);
                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 5 + glow1 * 20;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.globalAlpha = 0.3 + glow1 * 0.7;
                            ctx.fillRect(rxL, r1y1, rw, r1y2 - r1y1);
                            ctx.restore();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(rxL, r1y1, rw, r1y2 - r1y1);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('R\u2081=' + params.R1.toFixed(0) + ' k\u03a9', rxL - 8, (r1y1 + r1y2) / 2 + 4);

                            // Middle node + Vout tap
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx, r1y2); ctx.lineTo(cx, midN + 15); ctx.stroke();

                            // Tap line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(cx, midN); ctx.lineTo(cx + 100, midN); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(cx, midN, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V_out = ' + Vout.toFixed(2) + ' V', cx + 108, midN + 5);

                            // R2
                            var r2y1 = midN + 15, r2y2 = botN - 25;
                            var glow2 = VizEngine.clamp(Vout / params.Vin, 0, 1);
                            ctx.save();
                            ctx.shadowColor = viz.colors.teal;
                            ctx.shadowBlur = 5 + glow2 * 20;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.globalAlpha = 0.3 + glow2 * 0.7;
                            ctx.fillRect(rxL, r2y1, rw, r2y2 - r2y1);
                            ctx.restore();
                            ctx.globalAlpha = 1;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(rxL, r2y1, rw, r2y2 - r2y1);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('R\u2082=' + params.R2.toFixed(0) + ' k\u03a9', rxL - 8, (r2y1 + r2y2) / 2 + 4);

                            // Bottom wire
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx, r2y2); ctx.lineTo(cx, botN); ctx.stroke();

                            // Ground symbol
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx - 15, botN); ctx.lineTo(cx + 15, botN); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx - 10, botN + 5); ctx.lineTo(cx + 10, botN + 5); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx - 5, botN + 10); ctx.lineTo(cx + 5, botN + 10); ctx.stroke();

                            // Vin label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V_in = ' + params.Vin.toFixed(0) + ' V', cx, topN - 10);

                            // Voltage bar (right side)
                            var barX = W - 90, barW2 = 40;
                            var barTop = topN, barBot = botN;
                            var barH = barBot - barTop;

                            // Full bar background
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barX, barTop, barW2, barH);

                            // V1 section (top, orange)
                            var v1H = (V1 / params.Vin) * barH;
                            ctx.fillStyle = viz.colors.orange + '66';
                            ctx.fillRect(barX, barTop, barW2, v1H);

                            // V2 section (bottom, teal)
                            ctx.fillStyle = viz.colors.teal + '66';
                            ctx.fillRect(barX, barTop + v1H, barW2, barH - v1H);

                            // Divider line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(barX - 5, barTop + v1H); ctx.lineTo(barX + barW2 + 5, barTop + v1H); ctx.stroke();

                            // Labels on bar
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V\u2081=' + V1.toFixed(1), barX + barW2 / 2, barTop + v1H / 2 + 4);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('V\u2082=' + Vout.toFixed(1), barX + barW2 / 2, barTop + v1H + (barH - v1H) / 2 + 4);

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'center';
                            ctx.fillText(params.Vin.toFixed(0) + 'V', barX + barW2 / 2, barTop - 10);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('0V', barX + barW2 / 2, barBot + 16);

                            // Formula
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var ratio = (params.R2 / Rtot * 100).toFixed(1);
                            ctx.fillText('R\u2082/(R\u2081+R\u2082) = ' + ratio + '%', cx + 108, midN + 25);
                            ctx.fillStyle = viz.colors.cyan;
                            ctx.fillText('I = ' + (I * 1000).toFixed(2) + ' mA', cx + 108, midN + 43);
                        }

                        draw();
                        VizEngine.createSlider(controls, 'V_in (V)', 1, 30, params.Vin, 1, function(v) { params.Vin = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2081 (k\u03a9)', 1, 50, params.R1, 1, function(v) { params.R1 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2082 (k\u03a9)', 1, 50, params.R2, 1, function(v) { params.R2 = v; draw(); });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 4 ========================
        {
            id: 'current-divider',
            title: 'Current Divider',
            content: `
<h2>The Current Divider</h2>

<div class="env-block env-intuition">
<div class="env-header">Splitting Current Inversely</div>
<div class="env-body">
<p>Just as a voltage divider splits voltage among series resistors, a <strong>current divider</strong> splits current among parallel branches. The key insight: more current flows through the branch with <em>less</em> resistance. Current takes the path of least resistance (though not exclusively; it flows through all available paths).</p>
</div>
</div>

<h3>Derivation</h3>

<p>Two resistors \\(R_1\\) and \\(R_2\\) in parallel share the same voltage \\(V\\). The total current \\(I\\) splits as \\(I_1 = V/R_1\\) and \\(I_2 = V/R_2\\). Since \\(V = I \\cdot R_{\\text{eq}} = I \\cdot \\frac{R_1 R_2}{R_1 + R_2}\\):</p>

<div class="env-block env-theorem">
<div class="env-header">Current Divider Formula</div>
<div class="env-body">
\\[I_1 = I_{\\text{total}} \\cdot \\frac{R_2}{R_1 + R_2}, \\qquad I_2 = I_{\\text{total}} \\cdot \\frac{R_1}{R_1 + R_2}\\]
<p>Notice the "cross" pattern: the current through \\(R_1\\) depends on \\(R_2\\), and vice versa. The smaller resistor carries more current.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Voltage Divider vs. Current Divider</div>
<div class="env-body">
<p>Voltage divider (series): \\(V_{\\text{out}} = V_{\\text{in}} \\cdot R_2 / (R_1 + R_2)\\). The "same" resistor appears.</p>
<p>Current divider (parallel): \\(I_1 = I \\cdot R_2 / (R_1 + R_2)\\). The "other" resistor appears.</p>
<p>This cross-pattern is easy to confuse, so be careful!</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 6.5</div>
<div class="env-body">
<p>A total current of 6 A enters a parallel combination of \\(R_1 = 4\\;\\Omega\\) and \\(R_2 = 12\\;\\Omega\\). Find \\(I_1\\) and \\(I_2\\).</p>
<p><strong>Solution.</strong> \\(I_1 = 6 \\times 12/(4+12) = 72/16 = 4.5\\) A. \\(I_2 = 6 \\times 4/16 = 1.5\\) A. Check: \\(4.5 + 1.5 = 6\\) A. The smaller resistor (4 \\(\\Omega\\)) carries three times more current.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 6.6</div>
<div class="env-body">
<p>Three identical resistors \\(R\\) are in parallel. A total current \\(I\\) enters. What fraction flows through each?</p>
<p><strong>Solution.</strong> By symmetry, each carries \\(I/3\\). This is obvious, but the formula confirms it: \\(R_{\\text{eq}} = R/3\\), and \\(I_k = V/R = (I \\cdot R/3)/R = I/3\\).</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A 10 A current splits between a \\(5\\;\\Omega\\) and a \\(20\\;\\Omega\\) resistor in parallel. Find the current through each.',
                    hint: 'Use the current divider: \\(I_1 = I_{\\text{total}} \\cdot R_2/(R_1+R_2)\\).',
                    solution: '\\(I_1 = 10 \\times 20/25 = 8\\) A through the 5 \\(\\Omega\\). \\(I_2 = 10 \\times 5/25 = 2\\) A through the 20 \\(\\Omega\\). The smaller resistor carries four times as much current.'
                },
                {
                    question: 'Why does the current divider formula have the "other" resistor in the numerator, while the voltage divider has the "same" resistor?',
                    hint: 'Think about what happens when \\(R_1 \\to 0\\) in each case.',
                    solution: 'In a voltage divider, if \\(R_1 \\to 0\\), then \\(V_{\\text{out}} \\to V_{\\text{in}}\\) (no drop across \\(R_1\\)). The formula \\(V_{\\text{out}} = V_{\\text{in}} R_2/(R_1+R_2) \\to V_{\\text{in}}\\) correctly reflects this. In a current divider, if \\(R_1 \\to 0\\), all current flows through \\(R_1\\) (a short). The formula \\(I_1 = I \\cdot R_2/(R_1+R_2) \\to I\\) correctly gives all the current to \\(R_1\\). The cross-pattern ensures the physics is right.'
                }
            ],
            visualizations: []
        },
        // ======================== Section 5 ========================
        {
            id: 'complex-combinations',
            title: 'Complex Combinations',
            content: `
<h2>Complex Combinations</h2>

<div class="env-block env-intuition">
<div class="env-header">Nested Networks</div>
<div class="env-body">
<p>Real circuits rarely consist of purely series or purely parallel connections. More often, we encounter <em>combinations</em> of both. The strategy is always the same: identify series and parallel groups, simplify them step by step from the inside out, until you reach a single equivalent resistance.</p>
</div>
</div>

<h3>Strategy for Simplification</h3>

<ol>
<li><strong>Identify</strong> resistors that are in series (same current) or parallel (same voltage across them).</li>
<li><strong>Combine</strong> the identified group into a single equivalent resistor.</li>
<li><strong>Redraw</strong> the simplified circuit and repeat until one resistance remains.</li>
<li><strong>Back-substitute</strong> to find individual voltages and currents.</li>
</ol>

<div class="env-block env-example">
<div class="env-header">Example 6.7</div>
<div class="env-body">
<p>Find \\(R_{\\text{eq}}\\) for the following network connected to a 24 V battery: \\(R_1 = 6\\;\\Omega\\) in series with the parallel combination of \\(R_2 = 12\\;\\Omega\\) and \\(R_3 = 4\\;\\Omega\\).</p>
<p><strong>Step 1:</strong> \\(R_{23} = (12 \\times 4)/(12 + 4) = 48/16 = 3\\;\\Omega\\).</p>
<p><strong>Step 2:</strong> \\(R_{\\text{eq}} = R_1 + R_{23} = 6 + 3 = 9\\;\\Omega\\).</p>
<p><strong>Step 3:</strong> \\(I = 24/9 = 2.667\\) A. \\(V_1 = 2.667 \\times 6 = 16\\) V. \\(V_{23} = 24 - 16 = 8\\) V. \\(I_2 = 8/12 = 0.667\\) A, \\(I_3 = 8/4 = 2\\) A.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="complex-circuit-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 6.8</div>
<div class="env-body">
<p>A more complex network: \\(R_1 = 10\\;\\Omega\\) in series with [\\(R_2 = 20\\;\\Omega\\) in parallel with (\\(R_3 = 10\\;\\Omega\\) in series with \\(R_4 = 10\\;\\Omega\\))]. Source: 20 V.</p>
<p><strong>Step 1:</strong> \\(R_{34} = 10 + 10 = 20\\;\\Omega\\) (series).</p>
<p><strong>Step 2:</strong> \\(R_{234} = (20 \\times 20)/(20 + 20) = 10\\;\\Omega\\) (parallel).</p>
<p><strong>Step 3:</strong> \\(R_{\\text{eq}} = 10 + 10 = 20\\;\\Omega\\).</p>
<p>\\(I = 20/20 = 1\\) A. \\(V_1 = 10\\) V, \\(V_{234} = 10\\) V. \\(I_2 = 10/20 = 0.5\\) A, \\(I_{34} = 10/20 = 0.5\\) A.</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">When Series-Parallel Fails</div>
<div class="env-body">
<p>Not every circuit can be reduced by series-parallel combination alone. Some networks (like a Wheatstone bridge with unequal arms) have resistors that are neither in series nor in parallel. For those, you need <strong>Kirchhoff's laws</strong> (Chapter 7).</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Systematic Approach</div>
<div class="env-body">
<p>When facing a complex circuit:</p>
<ol>
<li>Label all nodes (junctions where wires meet).</li>
<li>Identify which resistors share the same pair of nodes (parallel) or carry the same current (series).</li>
<li>Start from the innermost group and work outward.</li>
<li>Always verify: do the branch currents sum to the total? Do the voltage drops sum to the source?</li>
</ol>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Find \\(R_{\\text{eq}}\\) for: \\(R_1 = 8\\;\\Omega\\) in series with [\\(R_2 = 6\\;\\Omega\\) in parallel with \\(R_3 = 3\\;\\Omega\\)], all in series with \\(R_4 = 4\\;\\Omega\\).',
                    hint: 'First combine the parallel pair, then add all series resistances.',
                    solution: '\\(R_{23} = (6 \\times 3)/(6+3) = 2\\;\\Omega\\). \\(R_{\\text{eq}} = 8 + 2 + 4 = 14\\;\\Omega\\).'
                },
                {
                    question: 'A 48 V battery is connected to the network in the previous exercise. Find the current through each resistor and the power dissipated in \\(R_3\\).',
                    hint: 'Find total \\(I\\), then voltage across each group, then branch currents.',
                    solution: '\\(I = 48/14 = 3.43\\) A through \\(R_1\\) and \\(R_4\\) (series). \\(V_{23} = 3.43 \\times 2 = 6.86\\) V. \\(I_2 = 6.86/6 = 1.14\\) A, \\(I_3 = 6.86/3 = 2.29\\) A. \\(P_3 = I_3^2 R_3 = (2.29)^2 \\times 3 = 15.7\\) W.'
                }
            ],
            visualizations: [
                {
                    id: 'complex-circuit-viz',
                    title: 'Build and Analyze: Series-Parallel Combinations',
                    description: 'Set 4 resistor values and a battery voltage. The circuit shows R1 in series with (R2 parallel with (R3 series R4)). Watch the step-by-step reduction and all currents/voltages.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var W = viz.width, H = viz.height;
                        var params = { Vbat: 24, R1: 6, R2: 12, R3: 4, R4: 8 };

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Compute
                            var R34 = params.R3 + params.R4;
                            var R234 = (params.R2 * R34) / (params.R2 + R34);
                            var Req = params.R1 + R234;
                            var Itot = Req > 0 ? params.Vbat / Req : 0;
                            var V1 = Itot * params.R1;
                            var V234 = Itot * R234;
                            var I2 = R34 > 0 ? V234 / params.R2 : 0;
                            var I34 = params.R2 > 0 ? V234 / R34 : 0;
                            var V3 = I34 * params.R3;
                            var V4 = I34 * params.R4;

                            // Layout
                            var mx = 50, my = 30;
                            var cw = W - 2 * mx, ch = H - 2 * my;

                            // Battery on far left
                            var batX = mx;
                            var batYc = my + ch / 2;

                            // Node A (after R1)
                            var nodeAx = mx + cw * 0.35;
                            // Node B (end of parallel)
                            var nodeBx = mx + cw * 0.82;

                            var topY = my + ch * 0.2;
                            var botY = my + ch * 0.8;
                            var midY = my + ch / 2;

                            // Wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;

                            // Battery to R1
                            ctx.beginPath();
                            ctx.moveTo(batX, batYc - 18);
                            ctx.lineTo(batX, my);
                            ctx.lineTo(mx + cw * 0.1, my);
                            ctx.stroke();

                            // R1 position
                            var r1x1 = mx + cw * 0.1, r1x2 = mx + cw * 0.3;
                            ctx.beginPath(); ctx.moveTo(r1x2, my); ctx.lineTo(nodeAx, my); ctx.lineTo(nodeAx, midY); ctx.stroke();

                            // Battery bottom wire
                            ctx.beginPath();
                            ctx.moveTo(batX, batYc + 18);
                            ctx.lineTo(batX, my + ch);
                            ctx.lineTo(nodeBx + 30, my + ch);
                            ctx.lineTo(nodeBx + 30, midY);
                            ctx.lineTo(nodeBx, midY);
                            ctx.stroke();

                            // Node A splits to top (R2) and bottom (R3+R4)
                            ctx.beginPath(); ctx.moveTo(nodeAx, midY); ctx.lineTo(nodeAx, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeAx, midY); ctx.lineTo(nodeAx, botY); ctx.stroke();

                            // Top branch wire to R2
                            ctx.beginPath(); ctx.moveTo(nodeAx, topY); ctx.lineTo(nodeAx + 10, topY); ctx.stroke();

                            // R2
                            var r2x1 = nodeAx + 15, r2x2 = nodeBx - 15;
                            ctx.beginPath(); ctx.moveTo(r2x2, topY); ctx.lineTo(nodeBx, topY); ctx.stroke();

                            // Node B top
                            ctx.beginPath(); ctx.moveTo(nodeBx, topY); ctx.lineTo(nodeBx, midY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(nodeBx, botY); ctx.lineTo(nodeBx, midY); ctx.stroke();

                            // Bottom branch: R3 then R4
                            var r3x1 = nodeAx + 15, r3x2 = (nodeAx + nodeBx) / 2 - 10;
                            var r4x1 = (nodeAx + nodeBx) / 2 + 10, r4x2 = nodeBx - 15;
                            ctx.beginPath(); ctx.moveTo(nodeAx, botY); ctx.lineTo(r3x1, botY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(r3x2, botY); ctx.lineTo(r4x1, botY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(r4x2, botY); ctx.lineTo(nodeBx, botY); ctx.stroke();

                            // Battery symbol
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(batX - 10, batYc - 18); ctx.lineTo(batX + 10, batYc - 18); ctx.stroke();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(batX - 6, batYc + 18); ctx.lineTo(batX + 6, batYc + 18); ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(params.Vbat.toFixed(0) + ' V', batX, batYc + 5);

                            // Node dots
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(nodeAx, midY, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(nodeBx, midY, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('A', nodeAx, midY + 16);
                            ctx.fillText('B', nodeBx, midY + 16);

                            // Draw resistor blocks
                            var allR = [
                                { x1: r1x1, x2: r1x2, y: my, R: params.R1, V: V1, I: Itot, label: 'R\u2081', color: viz.colors.orange },
                                { x1: r2x1, x2: r2x2, y: topY, R: params.R2, V: V234, I: I2, label: 'R\u2082', color: viz.colors.teal },
                                { x1: r3x1, x2: r3x2, y: botY, R: params.R3, V: V3, I: I34, label: 'R\u2083', color: viz.colors.purple },
                                { x1: r4x1, x2: r4x2, y: botY, R: params.R4, V: V4, I: I34, label: 'R\u2084', color: viz.colors.pink }
                            ];
                            var Pmax = Math.max.apply(null, allR.map(function(r) { return r.I * r.I * r.R; }));
                            Pmax = Math.max(Pmax, 0.01);

                            for (var ri = 0; ri < allR.length; ri++) {
                                var rd = allR[ri];
                                var rw = rd.x2 - rd.x1;
                                var rh = 22;
                                var ry = rd.y - rh / 2;
                                var P = rd.I * rd.I * rd.R;
                                var glow = VizEngine.clamp(P / Pmax, 0, 1);

                                ctx.save();
                                ctx.shadowColor = rd.color;
                                ctx.shadowBlur = 5 + glow * 20;
                                ctx.fillStyle = rd.color;
                                ctx.globalAlpha = 0.3 + glow * 0.7;
                                ctx.fillRect(rd.x1, ry, rw, rh);
                                ctx.restore();
                                ctx.globalAlpha = 1;
                                ctx.strokeStyle = rd.color;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(rd.x1, ry, rw, rh);

                                // Label above
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(rd.label + '=' + rd.R.toFixed(0) + '\u03a9', (rd.x1 + rd.x2) / 2, ry - 6);

                                // Values below
                                ctx.fillStyle = rd.color;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(rd.V.toFixed(2) + 'V  ' + rd.I.toFixed(3) + 'A', (rd.x1 + rd.x2) / 2, ry + rh + 14);
                            }

                            // Step-by-step reduction panel
                            var panelX = 10, panelY = H - 85;
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(panelX, panelY, W - 20, 78);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(panelX, panelY, W - 20, 78);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Step 1: R\u2083 + R\u2084 = ' + params.R3 + ' + ' + params.R4 + ' = ' + R34.toFixed(1) + ' \u03a9 (series)', panelX + 8, panelY + 14);
                            ctx.fillText('Step 2: R\u2082 || R\u2083\u2084 = (' + params.R2 + ' \u00d7 ' + R34.toFixed(1) + ')/(' + params.R2 + ' + ' + R34.toFixed(1) + ') = ' + R234.toFixed(2) + ' \u03a9', panelX + 8, panelY + 30);
                            ctx.fillText('Step 3: R_eq = R\u2081 + R\u2082\u2083\u2084 = ' + params.R1 + ' + ' + R234.toFixed(2) + ' = ' + Req.toFixed(2) + ' \u03a9', panelX + 8, panelY + 46);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('I_total = ' + params.Vbat + ' / ' + Req.toFixed(2) + ' = ' + Itot.toFixed(3) + ' A', panelX + 8, panelY + 66);
                        }

                        draw();
                        VizEngine.createSlider(controls, 'V_bat (V)', 1, 48, params.Vbat, 1, function(v) { params.Vbat = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2081 (\u03a9)', 1, 50, params.R1, 1, function(v) { params.R1 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03a9)', 1, 50, params.R2, 1, function(v) { params.R2 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2083 (\u03a9)', 1, 50, params.R3, 1, function(v) { params.R3 = v; draw(); });
                        VizEngine.createSlider(controls, 'R\u2084 (\u03a9)', 1, 50, params.R4, 1, function(v) { params.R4 = v; draw(); });

                        return viz;
                    }
                }
            ]
        }
    ]
});
