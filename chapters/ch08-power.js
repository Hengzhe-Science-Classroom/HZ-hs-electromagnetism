// === Chapter 8: Power & Joule Heating ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Power & Joule Heating',
    subtitle: 'How electrical energy transforms into heat, light, and motion',
    sections: [
        // ============================================================
        // SECTION 1: Electrical Power
        // ============================================================
        {
            id: 'ch08-sec01',
            title: 'Electrical Power',
            content: `<h2>8.1 Electrical Power</h2>

<div class="env-block intuition">
    <div class="env-title">Energy Flow in a Circuit</div>
    <div class="env-body">
        <p>A battery lifts charges to higher potential; those charges then surrender their potential energy as they pass through resistors, bulbs, and motors. <strong>Power</strong> is the rate at which this energy transfer happens. Understanding power is essential for everything from sizing a battery to designing a power grid.</p>
    </div>
</div>

<h3>Deriving the Power Formula</h3>

<p>When a charge \\(q\\) moves through a potential difference \\(V\\), the energy transferred is \\(W = qV\\). The rate of energy transfer (power) is:</p>

\\[P = \\frac{dW}{dt} = \\frac{dq}{dt} \\cdot V = IV\\]

<div class="env-block definition">
    <div class="env-title">Electrical Power</div>
    <div class="env-body">
        \\[P = IV\\]
        <p>where \\(P\\) is power in watts (W), \\(I\\) is current in amperes (A), and \\(V\\) is the potential difference in volts (V).</p>
        <p>One watt equals one joule per second: \\(1\\,\\text{W} = 1\\,\\text{J/s} = 1\\,\\text{A} \\cdot \\text{V}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Power in Batteries vs. Resistors</div>
    <div class="env-body">
        <p>For a battery, \\(P = I\\mathcal{E}\\) is the rate at which chemical energy is converted to electrical energy. For a resistor, \\(P = IV\\) is the rate at which electrical energy is converted to thermal energy. The battery <em>supplies</em> power; the resistor <em>dissipates</em> it.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 8.1 &mdash; Power of a Light Bulb</div>
    <div class="env-body">
        <p>A 60 W light bulb operates at 120 V. What current does it draw?</p>
        <p><strong>Solution.</strong> \\(P = IV \\Rightarrow I = P/V = 60/120 = 0.5\\,\\text{A}\\).</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'A phone charger delivers 5 V at 2 A. What power does it supply? How much energy in 1 hour?',
                    hint: 'Use \\(P = IV\\) and \\(E = Pt\\).',
                    solution: '\\(P = 5 \\times 2 = 10\\,\\text{W}\\). In 1 hour: \\(E = 10 \\times 3600 = 36{,}000\\,\\text{J} = 36\\,\\text{kJ}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 2: P = IV = I²R = V²/R
        // ============================================================
        {
            id: 'ch08-sec02',
            title: 'P = IV = I\u00B2R = V\u00B2/R',
            content: `<h2>8.2 Three Faces of Power: \\(P = IV = I^2R = V^2/R\\)</h2>

<div class="env-block intuition">
    <div class="env-title">One Law, Three Forms</div>
    <div class="env-body">
        <p>By combining \\(P = IV\\) with Ohm's law \\(V = IR\\), we get three equivalent expressions for the power dissipated in a resistor. Each form is most convenient in different situations.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Power Dissipated in a Resistor</div>
    <div class="env-body">
        \\[P = IV = I^2 R = \\frac{V^2}{R}\\]
        <p>Use \\(P = I^2R\\) when current is known; use \\(P = V^2/R\\) when voltage is known.</p>
    </div>
</div>

<h3>Which Form to Use?</h3>

<ul>
    <li><strong>Series circuit</strong> (same \\(I\\)): Use \\(P = I^2R\\). Larger resistance dissipates more power.</li>
    <li><strong>Parallel circuit</strong> (same \\(V\\)): Use \\(P = V^2/R\\). <em>Smaller</em> resistance dissipates more power.</li>
</ul>

<div class="env-block warning">
    <div class="env-title">A Subtle Trap</div>
    <div class="env-body">
        <p>In series, the larger resistor gets more power. In parallel, the <em>smaller</em> resistor gets more power. Students who memorize only \\(P = I^2R\\) and forget \\(P = V^2/R\\) often get parallel circuits wrong. Always ask: what quantity is the same across the components?</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 8.2 &mdash; Series vs. Parallel Bulbs</div>
    <div class="env-body">
        <p>Two bulbs, \\(R_1 = 100\\,\\Omega\\) and \\(R_2 = 200\\,\\Omega\\), connected to 120 V.</p>
        <p><strong>In series:</strong> \\(I = 120/300 = 0.4\\,\\text{A}\\). \\(P_1 = 0.4^2 \\times 100 = 16\\,\\text{W}\\), \\(P_2 = 0.4^2 \\times 200 = 32\\,\\text{W}\\). The 200 \\(\\Omega\\) bulb is brighter.</p>
        <p><strong>In parallel:</strong> \\(P_1 = 120^2/100 = 144\\,\\text{W}\\), \\(P_2 = 120^2/200 = 72\\,\\text{W}\\). Now the 100 \\(\\Omega\\) bulb is brighter!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-power-comparison"></div>`,
            visualizations: [
                {
                    id: 'viz-power-comparison',
                    title: 'Series vs. Parallel: Which Bulb is Brighter?',
                    description: 'Compare power dissipation in series and parallel. Bulb glow intensity reflects power. Notice how the "winner" flips between series and parallel.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 200 });
                        var ctx = viz.ctx;
                        var R1 = 100, R2 = 200, Vsrc = 120;

                        VizEngine.createSlider(controls, 'R\u2081 (\u03A9)', 20, 400, R1, 10, function(v) { R1 = v; });
                        VizEngine.createSlider(controls, 'R\u2082 (\u03A9)', 20, 400, R2, 10, function(v) { R2 = v; });
                        VizEngine.createSlider(controls, 'V (V)', 10, 240, Vsrc, 10, function(v) { Vsrc = v; });

                        function drawBulb(sx, sy, radius, power, maxP, color, label) {
                            var brightness = VizEngine.clamp(power / maxP, 0, 1);
                            // Glow
                            if (brightness > 0.01) {
                                var grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * (1 + brightness * 2));
                                grad.addColorStop(0, color + Math.round(brightness * 200).toString(16).padStart(2, '0'));
                                grad.addColorStop(0.4, color + Math.round(brightness * 80).toString(16).padStart(2, '0'));
                                grad.addColorStop(1, color + '00');
                                ctx.fillStyle = grad;
                                ctx.beginPath();
                                ctx.arc(sx, sy, radius * (1 + brightness * 2), 0, Math.PI * 2);
                                ctx.fill();
                            }
                            // Bulb body
                            var h = brightness * 60 + 20;
                            var s = 80;
                            var l = 20 + brightness * 60;
                            ctx.fillStyle = VizEngine.hsl(h, s, l);
                            ctx.beginPath();
                            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                            ctx.fill();
                            // Highlight
                            ctx.fillStyle = 'rgba(255,255,255,' + (0.1 + brightness * 0.4) + ')';
                            ctx.beginPath();
                            ctx.arc(sx - radius * 0.2, sy - radius * 0.2, radius * 0.3, 0, Math.PI * 2);
                            ctx.fill();
                            // Label
                            viz.screenText(label, sx, sy + radius + 15, viz.colors.text, 11, 'center');
                            viz.screenText(power.toFixed(1) + ' W', sx, sy + radius + 30, color, 12, 'center');
                        }

                        function draw(timestamp) {
                            viz.clear();

                            // Series calculations
                            var Iseries = Vsrc / (R1 + R2);
                            var Ps1 = Iseries * Iseries * R1;
                            var Ps2 = Iseries * Iseries * R2;
                            var PsTot = Ps1 + Ps2;

                            // Parallel calculations
                            var Pp1 = Vsrc * Vsrc / R1;
                            var Pp2 = Vsrc * Vsrc / R2;
                            var PpTot = Pp1 + Pp2;

                            var maxP = Math.max(Ps1, Ps2, Pp1, Pp2, 1);

                            // Section titles
                            viz.screenText('SERIES (same I)', viz.width / 4, 22, viz.colors.white, 15, 'center');
                            viz.screenText('PARALLEL (same V)', 3 * viz.width / 4, 22, viz.colors.white, 15, 'center');

                            // Divider
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(viz.width / 2, 10); ctx.lineTo(viz.width / 2, viz.height - 10); ctx.stroke();
                            ctx.setLineDash([]);

                            // Series circuit drawing
                            var sLeft = 30, sRight = viz.width / 2 - 30;
                            var sMid = (sLeft + sRight) / 2;
                            var sTop = 70, sBot = 180;

                            // Battery
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(sLeft, sTop); ctx.lineTo(sLeft, sBot); ctx.stroke();
                            viz.screenText('E=' + Vsrc + 'V', sLeft - 5, (sTop + sBot) / 2, viz.colors.green, 10, 'right');

                            // Wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(sLeft, sTop); ctx.lineTo(sRight, sTop); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sLeft, sBot); ctx.lineTo(sRight, sBot); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sRight, sTop); ctx.lineTo(sRight, sBot); ctx.stroke();

                            // Series bulbs
                            var b1x = sLeft + (sRight - sLeft) * 0.35;
                            var b2x = sLeft + (sRight - sLeft) * 0.7;
                            drawBulb(b1x, sTop, 16, Ps1, maxP, viz.colors.orange, 'R\u2081=' + R1.toFixed(0));
                            drawBulb(b2x, sTop, 16, Ps2, maxP, viz.colors.blue, 'R\u2082=' + R2.toFixed(0));

                            viz.screenText('I = ' + Iseries.toFixed(2) + ' A', sMid, sBot + 15, viz.colors.yellow, 11, 'center');
                            viz.screenText('P = I\u00B2R', sMid, sBot + 30, viz.colors.text, 10, 'center');

                            // Parallel circuit drawing
                            var pLeft = viz.width / 2 + 30, pRight = viz.width - 30;
                            var pMid = (pLeft + pRight) / 2;

                            // Battery
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pLeft, sTop); ctx.lineTo(pLeft, sBot); ctx.stroke();
                            viz.screenText('E=' + Vsrc + 'V', pLeft - 5, (sTop + sBot) / 2, viz.colors.green, 10, 'right');

                            // Wires and branches
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pLeft, sTop); ctx.lineTo(pRight, sTop); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(pLeft, sBot); ctx.lineTo(pRight, sBot); ctx.stroke();
                            // Two parallel branches
                            var pb1x = pMid - 30, pb2x = pMid + 30;
                            ctx.beginPath(); ctx.moveTo(pb1x, sTop); ctx.lineTo(pb1x, sBot); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(pb2x, sTop); ctx.lineTo(pb2x, sBot); ctx.stroke();

                            drawBulb(pb1x, (sTop + sBot) / 2, 16, Pp1, maxP, viz.colors.orange, 'R\u2081=' + R1.toFixed(0));
                            drawBulb(pb2x, (sTop + sBot) / 2, 16, Pp2, maxP, viz.colors.blue, 'R\u2082=' + R2.toFixed(0));

                            viz.screenText('V = ' + Vsrc + ' V across each', pMid, sBot + 15, viz.colors.yellow, 11, 'center');
                            viz.screenText('P = V\u00B2/R', pMid, sBot + 30, viz.colors.text, 10, 'center');

                            // Power bar chart at bottom
                            var barTop = 220, barH = 100;
                            var barW = 35;
                            var maxBar = Math.max(PsTot, PpTot, 1);

                            // Series bars
                            var sbx = sLeft + 30;
                            function drawPowerBar(x, val, max, color, label) {
                                var h = VizEngine.clamp(val / max, 0, 1) * barH;
                                ctx.fillStyle = color + '33';
                                ctx.fillRect(x, barTop + barH - h, barW, h);
                                ctx.save();
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 8;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x, barTop + barH - h, barW, h);
                                ctx.restore();
                                viz.screenText(label, x + barW / 2, barTop + barH + 14, viz.colors.text, 9, 'center');
                                viz.screenText(val.toFixed(1) + 'W', x + barW / 2, barTop + barH - h - 10, color, 10, 'center');
                            }

                            viz.screenText('Power Comparison', viz.width / 2, barTop - 8, viz.colors.white, 13, 'center');

                            drawPowerBar(sbx, Ps1, maxBar, viz.colors.orange, 'R\u2081 ser');
                            drawPowerBar(sbx + barW + 8, Ps2, maxBar, viz.colors.blue, 'R\u2082 ser');
                            drawPowerBar(sbx + 2 * (barW + 8), PsTot, maxBar, viz.colors.green, 'Total');

                            // Parallel bars
                            var pbxBar = pLeft + 10;
                            drawPowerBar(pbxBar, Pp1, maxBar, viz.colors.orange, 'R\u2081 par');
                            drawPowerBar(pbxBar + barW + 8, Pp2, maxBar, viz.colors.blue, 'R\u2082 par');
                            drawPowerBar(pbxBar + 2 * (barW + 8), PpTot, maxBar, viz.colors.green, 'Total');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A \\(50\\,\\Omega\\) resistor has 2 A flowing through it. What power does it dissipate? What is the voltage across it?',
                    hint: 'Use \\(P = I^2R\\) for power and \\(V = IR\\) for voltage.',
                    solution: '\\(P = 2^2 \\times 50 = 200\\,\\text{W}\\). \\(V = 2 \\times 50 = 100\\,\\text{V}\\).'
                },
                {
                    question: 'Two resistors, \\(10\\,\\Omega\\) and \\(40\\,\\Omega\\), are connected in parallel across 20 V. Which dissipates more power, and by what factor?',
                    hint: 'Use \\(P = V^2/R\\) since voltage is the same across parallel resistors.',
                    solution: '\\(P_{10} = 400/10 = 40\\,\\text{W}\\), \\(P_{40} = 400/40 = 10\\,\\text{W}\\). The smaller resistor dissipates 4 times more.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Joule Heating
        // ============================================================
        {
            id: 'ch08-sec03',
            title: 'Joule Heating',
            content: `<h2>8.3 Joule Heating</h2>

<div class="env-block definition">
    <div class="env-title">Joule's Law of Heating</div>
    <div class="env-body">
        <p>When current \\(I\\) flows through a resistor \\(R\\) for time \\(t\\), the thermal energy produced is:</p>
        \\[Q = I^2 R t = P t\\]
        <p>This is <strong>Joule heating</strong> (also called resistive heating or ohmic heating). The electrical energy is irreversibly converted to heat.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">The Microscopic Picture</div>
    <div class="env-body">
        <p>Free electrons, driven by the electric field, collide with the metal lattice ions. Each collision transfers kinetic energy from the electron to the ion, making the ion vibrate more vigorously. This increased vibration <em>is</em> thermal energy (heat). More current means more collisions per second; more resistance means each collision transfers more energy.</p>
    </div>
</div>

<h3>Applications of Joule Heating</h3>

<ul>
    <li><strong>Heating elements:</strong> toasters, electric kettles, space heaters, hairdryers</li>
    <li><strong>Incandescent bulbs:</strong> the filament heats to ~2700 K and glows</li>
    <li><strong>Electric welding:</strong> intense local heating joins metals</li>
    <li><strong>Fuses and circuit breakers:</strong> safety devices that exploit excessive heating</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example 8.3 &mdash; Electric Kettle</div>
    <div class="env-body">
        <p>A 2000 W kettle heats 1.5 kg of water from 20 &deg;C to 100 &deg;C. How long does it take? (Assume all energy goes to heating water; \\(c = 4186\\,\\text{J/(kg}\\cdot\\text{K)}\\).)</p>
        <p><strong>Solution.</strong></p>
        \\[Q = mc\\Delta T = 1.5 \\times 4186 \\times 80 = 502{,}320\\,\\text{J}\\]
        \\[t = Q/P = 502{,}320 / 2000 \\approx 251\\,\\text{s} \\approx 4.2\\,\\text{min}\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-glowing-resistor"></div>`,
            visualizations: [
                {
                    id: 'viz-glowing-resistor',
                    title: 'Glowing Resistor: Power Controls Temperature',
                    description: 'Increase current with the slider. Watch the resistor glow brighter, shifting from dark red through orange to white-hot. The color temperature faithfully tracks dissipated power.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 180 });
                        var ctx = viz.ctx;
                        var current = 2;
                        var R = 10;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'I (A)', 0, 10, current, 0.2, function(v) { current = v; });
                        VizEngine.createSlider(controls, 'R (\u03A9)', 1, 50, R, 1, function(v) { R = v; });

                        // Heat particles
                        var particles = [];

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;
                            var dt = 0.016;
                            var P = current * current * R;
                            var maxP = 10 * 10 * 50; // max possible power
                            var intensity = VizEngine.clamp(P / 500, 0, 1);

                            // Color temperature: dark -> red -> orange -> yellow -> white
                            var tempK = 300 + intensity * 5700; // 300K to 6000K
                            var rr, gg, bb;
                            if (tempK < 1000) { rr = 40 + intensity * 100; gg = 0; bb = 0; }
                            else if (tempK < 2000) { rr = 180 + (tempK - 1000) / 1000 * 75; gg = (tempK - 1000) / 1000 * 80; bb = 0; }
                            else if (tempK < 4000) { rr = 255; gg = 80 + (tempK - 2000) / 2000 * 175; bb = (tempK - 2000) / 2000 * 100; }
                            else { rr = 255; gg = 255; bb = 100 + (tempK - 4000) / 2000 * 155; }
                            rr = Math.round(VizEngine.clamp(rr, 0, 255));
                            gg = Math.round(VizEngine.clamp(gg, 0, 255));
                            bb = Math.round(VizEngine.clamp(bb, 0, 255));
                            var glowColor = 'rgb(' + rr + ',' + gg + ',' + bb + ')';

                            // Spawn heat particles
                            if (intensity > 0.05 && Math.random() < intensity * 2) {
                                var px = viz.width / 2 + (Math.random() - 0.5) * 120;
                                var py = 160;
                                particles.push({
                                    x: px, y: py,
                                    vx: (Math.random() - 0.5) * 40,
                                    vy: -30 - Math.random() * 60 * intensity,
                                    life: 1.0,
                                    size: 2 + Math.random() * 3 * intensity
                                });
                            }

                            // Update particles
                            for (var i = particles.length - 1; i >= 0; i--) {
                                var p = particles[i];
                                p.x += p.vx * dt;
                                p.y += p.vy * dt;
                                p.vy -= 10 * dt; // float up
                                p.life -= dt * (0.8 + intensity * 0.5);
                                if (p.life <= 0) particles.splice(i, 1);
                            }
                            if (particles.length > 200) particles.splice(0, particles.length - 200);

                            viz.clear();

                            // Resistor body (centered)
                            var rx = viz.width / 2 - 60, ry = 130, rw = 120, rh = 50;

                            // Large glow behind resistor
                            if (intensity > 0.02) {
                                var glowR = 60 + intensity * 100;
                                var grad = ctx.createRadialGradient(viz.width / 2, 155, 0, viz.width / 2, 155, glowR);
                                grad.addColorStop(0, 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (intensity * 0.5) + ')');
                                grad.addColorStop(0.5, 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (intensity * 0.15) + ')');
                                grad.addColorStop(1, 'rgba(' + rr + ',' + gg + ',' + bb + ',0)');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(viz.width / 2, 155, glowR, 0, Math.PI * 2); ctx.fill();
                            }

                            // Wire connections
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(40, 155); ctx.lineTo(rx, 155); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rx + rw, 155); ctx.lineTo(viz.width - 40, 155); ctx.stroke();

                            // Resistor body
                            ctx.save();
                            ctx.shadowColor = glowColor;
                            ctx.shadowBlur = intensity > 0.02 ? 20 + intensity * 30 : 0;
                            ctx.fillStyle = intensity > 0.02 ? glowColor : '#333355';
                            ctx.fillRect(rx, ry, rw, rh);
                            ctx.strokeStyle = intensity > 0.1 ? glowColor : viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(rx, ry, rw, rh);
                            ctx.restore();

                            // Resistance bands (decorative)
                            if (intensity < 0.6) {
                                for (var b = 0; b < 4; b++) {
                                    var bx = rx + 20 + b * 22;
                                    var bandColors = [viz.colors.orange, viz.colors.red, viz.colors.yellow, viz.colors.green];
                                    ctx.fillStyle = bandColors[b] + Math.round((1 - intensity) * 180).toString(16).padStart(2, '0');
                                    ctx.fillRect(bx, ry + 3, 8, rh - 6);
                                }
                            }

                            // Draw heat particles
                            for (var j = 0; j < particles.length; j++) {
                                var pp = particles[j];
                                var alpha = pp.life * 0.8;
                                ctx.fillStyle = 'rgba(' + rr + ',' + Math.round(gg * 0.7) + ',' + Math.round(bb * 0.3) + ',' + alpha + ')';
                                ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size, 0, Math.PI * 2); ctx.fill();
                                // Glow
                                ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (alpha * 0.2) + ')';
                                ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size * 3, 0, Math.PI * 2); ctx.fill();
                            }

                            // Power meter
                            var meterX = 25, meterY = 240, meterW = viz.width - 50, meterH = 30;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(meterX, meterY, meterW, meterH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(meterX, meterY, meterW, meterH);

                            var fillW = VizEngine.clamp(P / 1000, 0, 1) * meterW;
                            var meterGrad = ctx.createLinearGradient(meterX, 0, meterX + meterW, 0);
                            meterGrad.addColorStop(0, '#331100');
                            meterGrad.addColorStop(0.3, viz.colors.red);
                            meterGrad.addColorStop(0.6, viz.colors.orange);
                            meterGrad.addColorStop(0.85, viz.colors.yellow);
                            meterGrad.addColorStop(1, viz.colors.white);
                            ctx.fillStyle = meterGrad;
                            ctx.fillRect(meterX, meterY, fillW, meterH);

                            viz.screenText('Power: ' + P.toFixed(1) + ' W', viz.width / 2, meterY + meterH / 2, viz.colors.white, 13, 'center');

                            // Info display
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, 10, 220, 95);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, 10, 220, 95);

                            viz.screenText('I = ' + current.toFixed(1) + ' A', 20, 30, viz.colors.cyan, 13, 'left');
                            viz.screenText('R = ' + R.toFixed(0) + ' \u03A9', 20, 48, viz.colors.orange, 13, 'left');
                            viz.screenText('V = IR = ' + (current * R).toFixed(1) + ' V', 20, 66, viz.colors.yellow, 13, 'left');
                            viz.screenText('P = I\u00B2R = ' + P.toFixed(1) + ' W', 20, 84, viz.colors.white, 13, 'left');

                            // Temperature label
                            if (intensity > 0.02) {
                                viz.screenText('~' + Math.round(tempK) + ' K', viz.width / 2, ry - 15, glowColor, 14, 'center');
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A \\(1000\\,\\text{W}\\) heater runs for 5 minutes. How much thermal energy is produced?',
                    hint: 'Convert time to seconds and use \\(Q = Pt\\).',
                    solution: '\\(Q = 1000 \\times 300 = 300{,}000\\,\\text{J} = 300\\,\\text{kJ}\\).'
                },
                {
                    question: 'A nichrome wire carries 3 A and has resistance 8 \\(\\Omega\\). How much heat is generated in 1 minute?',
                    hint: 'Use \\(Q = I^2Rt\\).',
                    solution: '\\(Q = 3^2 \\times 8 \\times 60 = 9 \\times 480 = 4320\\,\\text{J}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Household Electricity
        // ============================================================
        {
            id: 'ch08-sec04',
            title: 'Household Electricity',
            content: `<h2>8.4 Household Electricity</h2>

<div class="env-block intuition">
    <div class="env-title">From Power Plant to Your Home</div>
    <div class="env-body">
        <p>Your home receives AC electricity at a standard voltage (120 V in North America, 220-240 V in most of the world). All outlets on a floor are wired in <strong>parallel</strong>, so each appliance gets the full mains voltage regardless of what else is plugged in. Understanding power ratings, kilowatt-hours, and circuit limits is essential practical knowledge.</p>
    </div>
</div>

<h3>The Kilowatt-Hour</h3>

<div class="env-block definition">
    <div class="env-title">Kilowatt-Hour (kWh)</div>
    <div class="env-body">
        <p>The commercial unit of electrical energy:</p>
        \\[1\\,\\text{kWh} = 1000\\,\\text{W} \\times 3600\\,\\text{s} = 3.6 \\times 10^6\\,\\text{J} = 3.6\\,\\text{MJ}\\]
        <p>Your electricity bill charges per kWh consumed.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 8.4 &mdash; Monthly Electricity Cost</div>
    <div class="env-body">
        <p>A 100 W light bulb runs 8 hours per day for 30 days. At $0.12/kWh, what is the cost?</p>
        \\[E = 0.1\\,\\text{kW} \\times 8 \\times 30 = 24\\,\\text{kWh}\\]
        \\[\\text{Cost} = 24 \\times 0.12 = \\$2.88\\]
    </div>
</div>

<h3>Why Parallel Wiring?</h3>

<p>Household outlets are in parallel for two reasons:</p>
<ol>
    <li>Each appliance gets the <strong>full mains voltage</strong> (e.g., 120 V), independent of other appliances.</li>
    <li>If one appliance is turned off or fails, others continue to operate.</li>
</ol>

<div class="env-block warning">
    <div class="env-title">Circuit Overloading</div>
    <div class="env-body">
        <p>Since appliances are in parallel, adding more appliances <em>increases</em> the total current drawn from the wall: \\(I_{\\text{total}} = P_{\\text{total}}/V\\). A 15 A circuit at 120 V can deliver at most \\(15 \\times 120 = 1800\\,\\text{W}\\). Plugging in too many appliances exceeds this limit, potentially overheating the wires. This is where fuses and circuit breakers come in (next section).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 8.5 &mdash; Can the Circuit Handle It?</div>
    <div class="env-body">
        <p>A 15 A, 120 V circuit powers: a 1200 W microwave, a 300 W blender, and a 500 W toaster oven.</p>
        \\[P_{\\text{total}} = 1200 + 300 + 500 = 2000\\,\\text{W}\\]
        \\[I_{\\text{total}} = 2000/120 \\approx 16.7\\,\\text{A} > 15\\,\\text{A}\\]
        <p>The circuit is overloaded! The breaker will trip (or the fuse will blow).</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'An air conditioner draws 10 A at 240 V. What is its power rating? If it runs 6 hours per day for 30 days at $0.10/kWh, what is the monthly cost?',
                    hint: 'Use \\(P = IV\\), then \\(E = Pt\\) in kWh.',
                    solution: '\\(P = 10 \\times 240 = 2400\\,\\text{W} = 2.4\\,\\text{kW}\\). Energy = \\(2.4 \\times 6 \\times 30 = 432\\,\\text{kWh}\\). Cost = \\(432 \\times 0.10 = \\$43.20\\).'
                },
                {
                    question: 'A 20 A breaker protects a 120 V circuit. What is the maximum total power you can draw?',
                    hint: 'Use \\(P_{\\max} = IV\\).',
                    solution: '\\(P_{\\max} = 20 \\times 120 = 2400\\,\\text{W}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Fuses and Safety
        // ============================================================
        {
            id: 'ch08-sec05',
            title: 'Fuses & Safety',
            content: `<h2>8.5 Fuses and Electrical Safety</h2>

<div class="env-block intuition">
    <div class="env-title">The Weakest Link, by Design</div>
    <div class="env-body">
        <p>A fuse is a thin wire deliberately made the weakest point in a circuit. When current exceeds the safe limit, Joule heating melts the fuse wire, breaking the circuit before the house wiring can overheat and start a fire. It sacrifices itself to protect everything else.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Fuse</div>
    <div class="env-body">
        <p>A <strong>fuse</strong> is a safety device containing a thin conductor that melts and opens the circuit when the current exceeds its rated value. Once blown, a fuse must be replaced. A <strong>circuit breaker</strong> does the same job but can be reset by flipping a switch.</p>
    </div>
</div>

<h3>How a Fuse Works</h3>

<p>The fuse wire has a small cross-section and specific melting point. By \\(Q = I^2Rt\\), the temperature rise depends on \\(I^2\\). At the rated current, thermal equilibrium keeps the fuse cool. Above the rated current, Joule heating exceeds the fuse's ability to dissipate heat, temperature rises until the wire melts, and the circuit opens.</p>

<div class="env-block theorem">
    <div class="env-title">Fuse Selection Rule</div>
    <div class="env-body">
        <p>Choose a fuse with a rating <strong>slightly above</strong> the normal operating current, but <strong>below</strong> the wire's safe current capacity:</p>
        \\[I_{\\text{operating}} < I_{\\text{fuse}} < I_{\\text{wire safe}}\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 8.6 &mdash; Choosing a Fuse</div>
    <div class="env-body">
        <p>A circuit normally draws 8 A and the wiring is rated for 20 A. What fuse should you use?</p>
        <p><strong>Solution.</strong> A 10 A or 13 A fuse. It will not blow during normal operation (8 A < 10 A) but will blow well before the wires overheat (10 A < 20 A).</p>
    </div>
</div>

<h3>Electrical Safety Principles</h3>

<ul>
    <li><strong>Grounding:</strong> The metal case of an appliance is connected to Earth ground, so a fault current flows to ground and trips the breaker, rather than through a person.</li>
    <li><strong>Double insulation:</strong> Appliances with plastic cases need no ground wire (marked with a square-in-square symbol).</li>
    <li><strong>RCD/GFCI:</strong> Detects mismatch between live and neutral currents (indicating leakage, possibly through a person) and cuts power within milliseconds.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-fuse-blow"></div>`,
            visualizations: [
                {
                    id: 'viz-fuse-blow',
                    title: 'Fuse Wire: From Cool to Blown',
                    description: 'Slowly increase the current. The fuse wire heats (glows red, then orange, then white). Beyond the fuse rating, it melts and the circuit breaks with a spark!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 180 });
                        var ctx = viz.ctx;
                        var current = 0;
                        var fuseRating = 10;
                        var fuseTemp = 0; // 0 = cold, 1 = melting point
                        var blown = false;
                        var blownTime = 0;
                        var sparkParticles = [];
                        var phase = 0;

                        VizEngine.createSlider(controls, 'I (A)', 0, 20, current, 0.5, function(v) { current = v; });
                        VizEngine.createSlider(controls, 'Fuse Rating (A)', 5, 20, fuseRating, 1, function(v) { fuseRating = v; blown = false; fuseTemp = 0; sparkParticles = []; });
                        VizEngine.createButton(controls, 'Replace Fuse', function() { blown = false; fuseTemp = 0; sparkParticles = []; });

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;
                            var dt = 0.016;

                            if (!blown) {
                                // Temperature model: heating proportional to I^2, cooling proportional to temp
                                var heating = (current / fuseRating) * (current / fuseRating);
                                var cooling = fuseTemp * 0.5;
                                fuseTemp += (heating - cooling) * dt * 2;
                                fuseTemp = VizEngine.clamp(fuseTemp, 0, 2);

                                if (fuseTemp >= 1.5) {
                                    blown = true;
                                    blownTime = phase;
                                    // Spawn spark particles
                                    for (var s = 0; s < 40; s++) {
                                        var angle = Math.random() * Math.PI * 2;
                                        var speed = 50 + Math.random() * 200;
                                        sparkParticles.push({
                                            x: viz.width / 2,
                                            y: 155,
                                            vx: Math.cos(angle) * speed,
                                            vy: Math.sin(angle) * speed - 50,
                                            life: 0.5 + Math.random() * 1.0,
                                            size: 1 + Math.random() * 3
                                        });
                                    }
                                }
                            }

                            // Update spark particles
                            for (var i = sparkParticles.length - 1; i >= 0; i--) {
                                var p = sparkParticles[i];
                                p.x += p.vx * dt;
                                p.y += p.vy * dt;
                                p.vy += 200 * dt; // gravity
                                p.life -= dt;
                                if (p.life <= 0) sparkParticles.splice(i, 1);
                            }

                            viz.clear();

                            // Fuse holder
                            var fuseL = viz.width / 2 - 80, fuseR = viz.width / 2 + 80;
                            var fuseY = 155;

                            // Wires leading to fuse
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 5;
                            ctx.beginPath(); ctx.moveTo(30, fuseY); ctx.lineTo(fuseL, fuseY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(fuseR, fuseY); ctx.lineTo(viz.width - 30, fuseY); ctx.stroke();

                            // Fuse holder body
                            ctx.fillStyle = '#2a2a40';
                            ctx.fillRect(fuseL - 10, fuseY - 25, 20, 50);
                            ctx.fillRect(fuseR - 10, fuseY - 25, 20, 50);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(fuseL - 10, fuseY - 25, 20, 50);
                            ctx.strokeRect(fuseR - 10, fuseY - 25, 20, 50);

                            // Glass tube
                            ctx.fillStyle = 'rgba(200,220,255,0.08)';
                            ctx.fillRect(fuseL + 10, fuseY - 15, fuseR - fuseL - 20, 30);
                            ctx.strokeStyle = 'rgba(200,220,255,0.2)';
                            ctx.strokeRect(fuseL + 10, fuseY - 15, fuseR - fuseL - 20, 30);

                            if (!blown) {
                                // Fuse wire
                                var intensity = VizEngine.clamp(fuseTemp, 0, 1.5);
                                var wireColor;
                                if (intensity < 0.3) {
                                    wireColor = viz.colors.text;
                                } else if (intensity < 0.6) {
                                    var t = (intensity - 0.3) / 0.3;
                                    wireColor = 'rgb(' + Math.round(100 + t * 155) + ',' + Math.round(80 * (1 - t)) + ',0)';
                                } else if (intensity < 1.0) {
                                    var t2 = (intensity - 0.6) / 0.4;
                                    wireColor = 'rgb(255,' + Math.round(t2 * 180) + ',' + Math.round(t2 * 60) + ')';
                                } else {
                                    var t3 = (intensity - 1.0) / 0.5;
                                    wireColor = 'rgb(255,' + Math.round(180 + t3 * 75) + ',' + Math.round(60 + t3 * 195) + ')';
                                }

                                // Wire glow
                                if (intensity > 0.2) {
                                    ctx.save();
                                    ctx.shadowColor = wireColor;
                                    ctx.shadowBlur = 10 + intensity * 25;
                                    ctx.strokeStyle = wireColor;
                                    ctx.lineWidth = 2 + intensity;
                                    ctx.beginPath();
                                    // Slightly wavy wire for visual interest
                                    ctx.moveTo(fuseL + 10, fuseY);
                                    var wireLen = fuseR - fuseL - 20;
                                    for (var w = 0; w <= wireLen; w += 3) {
                                        var wx = fuseL + 10 + w;
                                        var wy = fuseY + Math.sin(w * 0.1 + phase * 3) * intensity * 2;
                                        ctx.lineTo(wx, wy);
                                    }
                                    ctx.stroke();
                                    ctx.restore();
                                } else {
                                    ctx.strokeStyle = wireColor;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(fuseL + 10, fuseY);
                                    ctx.lineTo(fuseR - 10, fuseY);
                                    ctx.stroke();
                                }

                                // Electron flow
                                if (current > 0.1) {
                                    var nElec = Math.round(VizEngine.clamp(current, 1, 15));
                                    for (var e = 0; e < nElec; e++) {
                                        var frac = ((e / nElec) + phase * current * 0.05) % 1;
                                        var ex = 30 + frac * (viz.width - 60);
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.cyan;
                                        ctx.shadowBlur = 5;
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath(); ctx.arc(ex, fuseY, 2.5, 0, Math.PI * 2); ctx.fill();
                                        ctx.restore();
                                    }
                                }
                            } else {
                                // Blown fuse: gap in the wire
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([2, 3]);
                                ctx.beginPath();
                                ctx.moveTo(fuseL + 10, fuseY);
                                ctx.lineTo(viz.width / 2 - 15, fuseY);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(viz.width / 2 + 15, fuseY);
                                ctx.lineTo(fuseR - 10, fuseY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Melted blob on each end
                                ctx.fillStyle = '#888';
                                ctx.beginPath(); ctx.arc(viz.width / 2 - 12, fuseY, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(viz.width / 2 + 12, fuseY, 4, 0, Math.PI * 2); ctx.fill();

                                // Char marks
                                ctx.fillStyle = 'rgba(80,60,40,0.3)';
                                ctx.beginPath(); ctx.arc(viz.width / 2, fuseY, 20, 0, Math.PI * 2); ctx.fill();
                            }

                            // Draw spark particles
                            for (var j = 0; j < sparkParticles.length; j++) {
                                var sp = sparkParticles[j];
                                var alpha = sp.life;
                                ctx.save();
                                ctx.shadowColor = viz.colors.yellow;
                                ctx.shadowBlur = 8;
                                ctx.fillStyle = 'rgba(255,' + Math.round(200 * alpha) + ',50,' + alpha + ')';
                                ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                            }

                            // Flash on blow
                            if (blown && (phase - blownTime) < 0.3) {
                                var flashAlpha = (0.3 - (phase - blownTime)) / 0.3;
                                ctx.fillStyle = 'rgba(255,255,200,' + (flashAlpha * 0.5) + ')';
                                ctx.fillRect(0, 0, viz.width, viz.height);
                            }

                            // Status display
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, 10, 250, 90);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, 10, 250, 90);

                            viz.screenText('Current: ' + current.toFixed(1) + ' A', 20, 28, viz.colors.cyan, 13, 'left');
                            viz.screenText('Fuse Rating: ' + fuseRating.toFixed(0) + ' A', 20, 46, viz.colors.orange, 13, 'left');
                            viz.screenText('P(fuse) = I\u00B2R \u221D ' + (current * current / (fuseRating * fuseRating) * 100).toFixed(0) + '% of limit', 20, 64, viz.colors.text, 11, 'left');

                            if (blown) {
                                viz.screenText('FUSE BLOWN! Circuit open.', 20, 82, viz.colors.red, 13, 'left');
                                // Big label
                                ctx.save();
                                ctx.shadowColor = viz.colors.red;
                                ctx.shadowBlur = 15;
                                viz.screenText('BLOWN', viz.width / 2, 230, viz.colors.red, 28, 'center');
                                ctx.restore();
                            } else if (current > fuseRating * 0.8) {
                                viz.screenText('WARNING: Approaching fuse limit!', 20, 82, viz.colors.yellow, 12, 'left');
                            } else {
                                viz.screenText('Normal operation', 20, 82, viz.colors.green, 12, 'left');
                            }

                            // Temperature bar
                            var tbx = 30, tby = viz.height - 50, tbw = viz.width - 60, tbh = 18;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(tbx, tby, tbw, tbh);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(tbx, tby, tbw, tbh);

                            var tempFill = VizEngine.clamp(fuseTemp / 1.5, 0, 1) * tbw;
                            var tempGrad = ctx.createLinearGradient(tbx, 0, tbx + tbw, 0);
                            tempGrad.addColorStop(0, '#113');
                            tempGrad.addColorStop(0.4, viz.colors.red);
                            tempGrad.addColorStop(0.7, viz.colors.orange);
                            tempGrad.addColorStop(1, viz.colors.white);
                            ctx.fillStyle = tempGrad;
                            ctx.fillRect(tbx, tby, tempFill, tbh);

                            // Melting point marker
                            var meltX = tbx + tbw * (1 / 1.5);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(meltX, tby - 5); ctx.lineTo(meltX, tby + tbh + 5); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('melt', meltX, tby - 10, viz.colors.red, 9, 'center');

                            viz.screenText('Fuse Temperature', viz.width / 2, tby + tbh + 15, viz.colors.text, 10, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why is a fuse always connected in <strong>series</strong> with the appliance it protects, never in parallel?',
                    hint: 'Think about what happens when a fuse blows (opens). What should happen to the current through the appliance?',
                    solution: 'A blown fuse must cut off all current to the appliance. In series, opening the fuse breaks the only path for current. In parallel, current would simply bypass the blown fuse and continue through the appliance, providing no protection.'
                },
                {
                    question: 'A fuse is rated at 13 A. A 240 V circuit powers a 2500 W heater and a 500 W TV. Will the fuse blow?',
                    hint: 'Find total current: \\(I = P_{\\text{total}}/V\\).',
                    solution: '\\(P_{\\text{total}} = 3000\\,\\text{W}\\). \\(I = 3000/240 = 12.5\\,\\text{A} < 13\\,\\text{A}\\). The fuse will not blow, but there is very little margin.'
                }
            ]
        }
    ]
});
