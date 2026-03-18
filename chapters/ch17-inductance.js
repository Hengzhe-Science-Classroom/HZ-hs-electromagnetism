// === Chapter 17: Inductance ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Inductance',
    subtitle: 'Coils that store energy in magnetic fields, the RL circuit, and the transformer',
    sections: [
        // ============================================================
        // SECTION 1: Self-Inductance
        // ============================================================
        {
            id: 'ch17-sec01',
            title: 'Self-Inductance',
            content: `<h2>17.1 Self-Inductance</h2>

<div class="env-block intuition">
    <div class="env-title">Chapter Overview</div>
    <div class="env-body">
        <p>When the current through a coil changes, the coil's own changing magnetic field induces an EMF in <em>itself</em>. This self-induced EMF opposes the change in current (Lenz's law again). This property, called <strong>self-inductance</strong>, makes coils resist changes in current. It is the magnetic analog of inertia: just as a massive object resists changes in velocity, an inductor resists changes in current. We then build to RL circuits, energy storage, and transformers.</p>
    </div>
</div>

<p>Consider a coil carrying current \\(I\\). It creates a magnetic field, and some of this field passes through the coil itself, creating a flux \\(\\Phi_B\\) through each turn. If the current changes, so does the flux, and by Faraday's law, an EMF is induced.</p>

<div class="env-block definition">
    <div class="env-title">Self-Inductance</div>
    <div class="env-body">
        <p>The <strong>self-inductance</strong> \\(L\\) of a coil is defined by</p>
        \\[ N\\Phi_B = LI \\]
        <p>where \\(N\\Phi_B\\) is the total flux linkage (flux through one turn times the number of turns) and \\(I\\) is the current. The SI unit of inductance is the <strong>henry</strong> (H): \\(1\\,\\text{H} = 1\\,\\text{Wb/A} = 1\\,\\text{V}\\cdot\\text{s/A}\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Self-Induced EMF</div>
    <div class="env-body">
        <p>The EMF induced in a coil by its own changing current is</p>
        \\[ \\mathcal{E}_L = -L\\frac{dI}{dt} \\]
        <p>The negative sign (Lenz's law) means: if the current is increasing, the induced EMF opposes the increase; if the current is decreasing, the induced EMF opposes the decrease.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 17.1 &mdash; Inductance of a Solenoid</div>
    <div class="env-body">
        <p>A solenoid with \\(N\\) turns, length \\(\\ell\\), and cross-sectional area \\(A\\) has magnetic field \\(B = \\mu_0 n I = \\mu_0 (N/\\ell) I\\). The flux through each turn is \\(\\Phi_B = BA\\), so</p>
        \\[ L = \\frac{N\\Phi_B}{I} = \\frac{N \\cdot \\mu_0 (N/\\ell) I \\cdot A}{I} = \\frac{\\mu_0 N^2 A}{\\ell} \\]
        <p>For \\(N = 500\\), \\(A = 10\\,\\text{cm}^2 = 10^{-3}\\,\\text{m}^2\\), \\(\\ell = 0.25\\,\\text{m}\\):</p>
        \\[ L = \\frac{(4\\pi \\times 10^{-7})(500)^2(10^{-3})}{0.25} = 1.26 \\times 10^{-3}\\,\\text{H} = 1.26\\,\\text{mH} \\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Inductance as Electromagnetic Inertia</div>
    <div class="env-body">
        <p>Compare Newton's second law \\(F = ma = m\\,dv/dt\\) with the inductor equation \\(V = L\\,dI/dt\\). The inductance \\(L\\) plays the same role as mass \\(m\\): it measures resistance to change. A large inductor strongly resists changes in current, just as a large mass strongly resists changes in velocity.</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'The current through a \\(0.50\\,\\text{H}\\) inductor changes from \\(2.0\\,\\text{A}\\) to \\(0\\) in \\(0.01\\,\\text{s}\\). What is the magnitude of the self-induced EMF?',
                    hint: 'Use \\(|\\mathcal{E}_L| = L|dI/dt|\\).',
                    solution: '\\(|\\mathcal{E}_L| = L|\\Delta I/\\Delta t| = (0.50)(2.0/0.01) = 100\\,\\text{V}\\). This large voltage is why switching off inductive loads can create dangerous sparks.'
                }
            ]
        },
        // ============================================================
        // SECTION 2: The Inductor
        // ============================================================
        {
            id: 'ch17-sec02',
            title: 'The Inductor L',
            content: `<h2>17.2 The Inductor as a Circuit Element</h2>

<div class="env-block definition">
    <div class="env-title">Inductor</div>
    <div class="env-body">
        <p>An <strong>inductor</strong> is a circuit element (typically a coil of wire) designed to have a specific inductance \\(L\\). Its circuit symbol is a coil. The voltage across an inductor is</p>
        \\[ V_L = L\\frac{dI}{dt} \\]
        <p>An inductor passes DC freely (once current is established, \\(dI/dt = 0\\), so \\(V_L = 0\\)). But it opposes changes in current, so it resists AC signals, especially at high frequencies.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Inductor Behavior: Summary</div>
    <div class="env-body">
        <ul>
            <li><strong>Steady state (DC)</strong>: acts like a short circuit (just a wire); \\(V_L = 0\\)</li>
            <li><strong>Sudden change</strong>: acts like an open circuit, preventing instantaneous current change</li>
            <li><strong>The current through an inductor cannot change instantaneously.</strong> This is the cardinal rule. Just as a capacitor's voltage cannot jump, an inductor's current cannot jump.</li>
        </ul>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Why Inductors Are Dangerous</div>
    <div class="env-body">
        <p>If you try to suddenly stop current through an inductor (e.g., by opening a switch), the inductor "fights back" with a very large voltage spike (\\(L\\,dI/dt\\) with a very small \\(dt\\)). This can arc across switch contacts, damage electronics, or deliver a painful shock. This is why circuits with inductors always need <strong>flyback diodes</strong> or other protection circuits to provide a path for the current to decay safely.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 17.2 &mdash; Voltage Across an Inductor</div>
    <div class="env-body">
        <p>The current through a \\(10\\,\\text{mH}\\) inductor varies as \\(I(t) = 3t^2\\) (in amps, with \\(t\\) in seconds). Find the voltage at \\(t = 2\\,\\text{s}\\).</p>
        \\[ V_L = L\\frac{dI}{dt} = (0.010)(6t) = 0.06t \\]
        <p>At \\(t = 2\\,\\text{s}\\): \\(V_L = 0.06(2) = 0.12\\,\\text{V}\\).</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'An inductor has \\(L = 2.0\\,\\text{H}\\). If the voltage across it is \\(10\\,\\text{V}\\), at what rate is the current changing?',
                    hint: 'Use \\(V_L = L\\,dI/dt\\) and solve for \\(dI/dt\\).',
                    solution: '\\(dI/dt = V_L/L = 10/2.0 = 5.0\\,\\text{A/s}\\). The current increases by 5 amps every second.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: RL Circuits
        // ============================================================
        {
            id: 'ch17-sec03',
            title: 'RL Circuits',
            content: `<h2>17.3 RL Circuits</h2>

<p>When an inductor \\(L\\) and a resistor \\(R\\) are connected in series to a battery, the current does not jump instantly to its final value. Instead, it rises exponentially, governed by the <strong>time constant</strong> \\(\\tau = L/R\\).</p>

<div class="env-block theorem">
    <div class="env-title">RL Circuit: Current Growth</div>
    <div class="env-body">
        <p>When a battery of EMF \\(\\mathcal{E}\\) is connected to a series RL circuit at \\(t = 0\\):</p>
        \\[ I(t) = \\frac{\\mathcal{E}}{R}\\left(1 - e^{-t/\\tau}\\right), \\qquad \\tau = \\frac{L}{R} \\]
        <p>The current starts at zero and rises exponentially toward the steady-state value \\(I_\\infty = \\mathcal{E}/R\\). After one time constant (\\(t = \\tau\\)), the current has reached \\(63.2\\%\\) of its final value. After \\(5\\tau\\), it is within \\(0.7\\%\\) of the final value (effectively complete).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">RL Circuit: Current Decay</div>
    <div class="env-body">
        <p>If the battery is removed (and the circuit remains closed through \\(R\\)), the current decays exponentially:</p>
        \\[ I(t) = I_0\\, e^{-t/\\tau} \\]
        <p>where \\(I_0\\) is the initial current.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rl-circuit"></div>

<div class="env-block example">
    <div class="env-title">Example 17.3 &mdash; RL Time Constant</div>
    <div class="env-body">
        <p>An RL circuit has \\(R = 100\\,\\Omega\\) and \\(L = 2.0\\,\\text{H}\\).</p>
        \\[ \\tau = \\frac{L}{R} = \\frac{2.0}{100} = 0.020\\,\\text{s} = 20\\,\\text{ms} \\]
        <p>After \\(20\\,\\text{ms}\\), current reaches \\(63.2\\%\\) of final value. After \\(100\\,\\text{ms}\\) (\\(5\\tau\\)), it is essentially at steady state.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Physical Meaning of \\(\\tau = L/R\\)</div>
    <div class="env-body">
        <p>Large \\(L\\) means the inductor strongly opposes changes, so the current rises slowly (large \\(\\tau\\)). Large \\(R\\) means the final current is small and the inductor has less "work" to do, so the current rises quickly (small \\(\\tau\\)). The ratio \\(L/R\\) captures this balance.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-rl-circuit',
                    title: 'RL Circuit: Current Rise and Decay',
                    description: 'Flip the switch to connect the battery. Watch current rise exponentially with time constant L/R. The real-time I(t) curve, voltage across R and L, and energy stored are all shown. Disconnect to see exponential decay.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 50, originY: 50, height: 460 });
                        var ctx = viz.ctx;
                        var L = 2.0;
                        var R = 5.0;
                        var emf = 10.0;
                        var switchOn = false;
                        var current = 0;
                        var time = 0;
                        var iTrace = [];
                        var vRTrace = [];
                        var vLTrace = [];
                        var maxTrace = 350;
                        var maxTime = 5.0;

                        VizEngine.createSlider(controls, 'L (H) =', 0.2, 5.0, L, 0.2, function(v) { L = v; resetSim(); });
                        VizEngine.createSlider(controls, 'R (\u03a9) =', 1, 20, R, 0.5, function(v) { R = v; resetSim(); });
                        VizEngine.createSlider(controls, '\u03b5 (V) =', 1, 20, emf, 1, function(v) { emf = v; resetSim(); });
                        VizEngine.createButton(controls, 'Switch ON', function() { switchOn = true; });
                        VizEngine.createButton(controls, 'Switch OFF', function() { switchOn = false; });
                        VizEngine.createButton(controls, 'Reset', function() { resetSim(); });

                        function resetSim() {
                            current = 0;
                            time = 0;
                            iTrace = [];
                            vRTrace = [];
                            vLTrace = [];
                            switchOn = false;
                        }

                        function draw(ts) {
                            var dt = 0.016;
                            time += dt;

                            // Physics: dI/dt = (V - IR) / L
                            var tau = L / R;
                            var Ifinal = emf / R;

                            if (switchOn) {
                                var dIdt = (emf - current * R) / L;
                                current += dIdt * dt;
                            } else {
                                var dIdt2 = (-current * R) / L;
                                current += dIdt2 * dt;
                                if (current < 0.0001) current = 0;
                            }

                            var vR = current * R;
                            var vL = switchOn ? (emf - vR) : (-vR);

                            iTrace.push(current);
                            vRTrace.push(vR);
                            vLTrace.push(Math.abs(vL));
                            if (iTrace.length > maxTrace) { iTrace.shift(); vRTrace.shift(); vLTrace.shift(); }

                            viz.clear();
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            // === Circuit diagram (top left) ===
                            var cx = 30, cy = 30, cw = 200, ch = 150;
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(cx, cy, cw, ch);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(cx, cy, cw, ch);

                            // Battery
                            var bx = cx + 20, by = cy + ch / 2;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            // Battery symbol
                            ctx.beginPath();
                            ctx.moveTo(bx, by - 15); ctx.lineTo(bx, by + 15); ctx.stroke();
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(bx + 6, by - 10); ctx.lineTo(bx + 6, by + 10); ctx.stroke();
                            ctx.lineWidth = 2;
                            viz.screenText('\u03b5', bx + 3, by - 22, viz.colors.green, 10, 'center');

                            // Wires
                            ctx.strokeStyle = switchOn ? viz.colors.yellow : viz.colors.axis;
                            ctx.lineWidth = 2;
                            // Top wire: battery + -> switch -> R -> L -> back to battery -
                            ctx.beginPath();
                            ctx.moveTo(bx + 6, by - 10);
                            ctx.lineTo(bx + 6, cy + 20);
                            ctx.lineTo(cx + cw - 20, cy + 20);
                            ctx.lineTo(cx + cw - 20, by - 20);
                            ctx.stroke();

                            // Switch
                            var swx = bx + 40, swy = cy + 20;
                            if (switchOn) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(swx - 10, swy);
                                ctx.lineTo(swx + 10, swy);
                                ctx.stroke();
                            } else {
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(swx - 10, swy);
                                ctx.lineTo(swx + 8, swy - 10);
                                ctx.stroke();
                            }
                            ctx.fillStyle = switchOn ? viz.colors.yellow : viz.colors.red;
                            ctx.beginPath(); ctx.arc(swx - 10, swy, 3, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(swx + 10, swy, 3, 0, Math.PI * 2); ctx.fill();
                            viz.screenText(switchOn ? 'ON' : 'OFF', swx, swy - 14, switchOn ? viz.colors.green : viz.colors.red, 8, 'center');

                            // Resistor (zigzag)
                            var rx = cx + cw - 20, ry = by - 20;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rx, ry);
                            var rSteps = 6;
                            var rH = 40 / rSteps;
                            for (var rs = 0; rs < rSteps; rs++) {
                                var dir = (rs % 2 === 0) ? -8 : 8;
                                ctx.lineTo(rx + dir, ry + (rs + 1) * rH);
                            }
                            ctx.lineTo(rx, ry + 40);
                            ctx.stroke();
                            viz.screenText('R', rx + 14, ry + 20, viz.colors.orange, 10, 'center');

                            // Inductor (coils)
                            var lx = rx, ly = ry + 40;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            var nCoils = 4;
                            var coilH = 40 / nCoils;
                            ctx.beginPath();
                            ctx.moveTo(lx, ly);
                            for (var lc = 0; lc < nCoils; lc++) {
                                var cy2 = ly + lc * coilH + coilH / 2;
                                ctx.arc(lx - 6, cy2, coilH / 2, -Math.PI / 2, Math.PI / 2);
                            }
                            ctx.lineTo(lx, ly + 40);
                            ctx.stroke();
                            viz.screenText('L', lx - 18, ly + 20, viz.colors.teal, 10, 'center');

                            // Bottom wire back to battery
                            ctx.strokeStyle = switchOn ? viz.colors.yellow : viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rx, ly + 40);
                            ctx.lineTo(rx, cy + ch - 20);
                            ctx.lineTo(bx, cy + ch - 20);
                            ctx.lineTo(bx, by + 15);
                            ctx.stroke();

                            // Current arrow indicator
                            if (current > 0.01) {
                                var arrowAlpha = VizEngine.clamp(current / Ifinal, 0, 1);
                                ctx.fillStyle = 'rgba(255,215,0,' + arrowAlpha + ')';
                                var ax2 = bx + 80, ay = cy + 20;
                                ctx.beginPath();
                                ctx.moveTo(ax2, ay);
                                ctx.lineTo(ax2 - 6, ay - 5);
                                ctx.lineTo(ax2 - 6, ay + 5);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('I', ax2, ay + 12, viz.colors.yellow, 9, 'center');
                            }

                            // === I(t) plot ===
                            var plotX = 250, plotY = 30, plotW = w - plotX - 15, plotH = 110;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(plotX, plotY + plotH); ctx.lineTo(plotX + plotW, plotY + plotH); ctx.stroke();
                            ctx.setLineDash([]);

                            // Final value dashed line
                            if (switchOn || current > 0.01) {
                                var yFinal = plotY + plotH - (Ifinal / (Ifinal * 1.2)) * plotH;
                                ctx.strokeStyle = viz.colors.green + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(plotX, yFinal); ctx.lineTo(plotX + plotW, yFinal); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('I\u221e = \u03b5/R = ' + Ifinal.toFixed(2) + ' A', plotX + plotW - 60, yFinal - 8, viz.colors.green, 9, 'center');
                            }

                            // Plot current trace
                            var iMax = Math.max(Ifinal * 1.2, 0.5);
                            if (iTrace.length > 1) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i < iTrace.length; i++) {
                                    var px = plotX + i * plotW / maxTrace;
                                    var py = plotY + plotH - (iTrace[i] / iMax) * plotH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('I(t)', plotX + 20, plotY + 12, viz.colors.orange, 12, 'center');

                            // === V_R and V_L plot ===
                            var plot2Y = plotY + plotH + 20, plot2H = 100;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plot2Y, plotW, plot2H);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plot2Y, plotW, plot2H);

                            var vMax = emf * 1.2;
                            if (vRTrace.length > 1) {
                                // V_R (orange)
                                ctx.strokeStyle = viz.colors.orange + 'aa';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var j = 0; j < vRTrace.length; j++) {
                                    var px2 = plotX + j * plotW / maxTrace;
                                    var py2 = plot2Y + plot2H - (vRTrace[j] / vMax) * plot2H;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();

                                // V_L (teal)
                                ctx.strokeStyle = viz.colors.teal + 'aa';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var k = 0; k < vLTrace.length; k++) {
                                    var px3 = plotX + k * plotW / maxTrace;
                                    var py3 = plot2Y + plot2H - (vLTrace[k] / vMax) * plot2H;
                                    if (k === 0) ctx.moveTo(px3, py3);
                                    else ctx.lineTo(px3, py3);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('V_R', plotX + 20, plot2Y + 12, viz.colors.orange, 10, 'center');
                            viz.screenText('V_L', plotX + 50, plot2Y + 12, viz.colors.teal, 10, 'center');

                            // === Info panel ===
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(15, h - 155, 220, 143);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(15, h - 155, 220, 143);

                            viz.screenText('RL Circuit', 125, h - 140, viz.colors.white, 14, 'center');
                            viz.screenText('\u03c4 = L/R = ' + tau.toFixed(3) + ' s', 125, h - 118, viz.colors.teal, 12, 'center');
                            viz.screenText('I = ' + current.toFixed(3) + ' A', 125, h - 98, viz.colors.orange, 12, 'center');
                            viz.screenText('V_R = ' + vR.toFixed(2) + ' V', 125, h - 78, viz.colors.orange, 11, 'center');
                            viz.screenText('V_L = ' + Math.abs(vL).toFixed(2) + ' V', 125, h - 58, viz.colors.teal, 11, 'center');

                            // Energy stored
                            var energy = 0.5 * L * current * current;
                            viz.screenText('Energy = \u00bdLI\u00b2 = ' + energy.toFixed(3) + ' J', 125, h - 38, viz.colors.green, 11, 'center');
                            viz.screenText('Switch: ' + (switchOn ? 'ON' : 'OFF'), 125, h - 20, switchOn ? viz.colors.green : viz.colors.red, 11, 'center');

                            // Energy bar
                            var barX = 250, barY = h - 50, barW2 = plotW, barH2 = 30;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(barX, barY, barW2, barH2);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(barX, barY, barW2, barH2);

                            var maxEnergy = 0.5 * L * Ifinal * Ifinal;
                            var eFrac = maxEnergy > 0 ? energy / maxEnergy : 0;
                            var eGrad = ctx.createLinearGradient(barX, 0, barX + barW2 * eFrac, 0);
                            eGrad.addColorStop(0, viz.colors.teal);
                            eGrad.addColorStop(1, viz.colors.green);
                            ctx.fillStyle = eGrad;
                            ctx.fillRect(barX, barY, barW2 * eFrac, barH2);
                            ctx.save();
                            ctx.shadowColor = viz.colors.green;
                            ctx.shadowBlur = 8;
                            ctx.fillRect(barX + barW2 * eFrac - 3, barY, 3, barH2);
                            ctx.restore();
                            viz.screenText('Magnetic Energy: \u00bdLI\u00b2', barX + barW2 / 2, barY - 8, viz.colors.text, 10, 'center');
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'An RL circuit with \\(L = 0.50\\,\\text{H}\\) and \\(R = 10\\,\\Omega\\) is connected to a \\(20\\,\\text{V}\\) battery. (a) What is the time constant? (b) What is the current after \\(0.05\\,\\text{s}\\)? (c) What is the final steady-state current?',
                    hint: 'Use \\(\\tau = L/R\\), \\(I(t) = (\\mathcal{E}/R)(1 - e^{-t/\\tau})\\).',
                    solution: '(a) \\(\\tau = 0.50/10 = 0.050\\,\\text{s}\\). (b) \\(I(0.05) = (20/10)(1 - e^{-1}) = 2(1 - 0.368) = 1.264\\,\\text{A}\\). (c) \\(I_\\infty = \\mathcal{E}/R = 20/10 = 2.0\\,\\text{A}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Energy in Magnetic Fields
        // ============================================================
        {
            id: 'ch17-sec04',
            title: 'Energy in Magnetic Fields',
            content: `<h2>17.4 Energy Stored in a Magnetic Field</h2>

<p>An inductor carrying current stores energy in its magnetic field, just as a capacitor storing charge stores energy in its electric field.</p>

<div class="env-block theorem">
    <div class="env-title">Energy Stored in an Inductor</div>
    <div class="env-body">
        <p>The energy stored in an inductor carrying current \\(I\\) is</p>
        \\[ U_B = \\frac{1}{2}LI^2 \\]
        <p>This energy resides in the magnetic field created by the current. Compare with the capacitor energy \\(U_E = \\frac{1}{2}CV^2\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Derivation</div>
    <div class="env-body">
        <p>The power delivered to the inductor is \\(P = V_L I = LI\\,dI/dt\\). The total energy stored as current builds from 0 to \\(I\\) is</p>
        \\[ U_B = \\int_0^I LI'\\,dI' = \\frac{1}{2}LI^2 \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Magnetic Energy Density</div>
    <div class="env-body">
        <p>The energy per unit volume stored in a magnetic field is</p>
        \\[ u_B = \\frac{B^2}{2\\mu_0} \\]
        <p>Compare with the electric field energy density \\(u_E = \\frac{1}{2}\\epsilon_0 E^2\\). Both fields store energy.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 17.4 &mdash; Energy in an MRI Magnet</div>
    <div class="env-body">
        <p>An MRI machine has a superconducting solenoid with \\(L = 50\\,\\text{H}\\) carrying \\(I = 100\\,\\text{A}\\).</p>
        \\[ U_B = \\frac{1}{2}(50)(100)^2 = 250{,}000\\,\\text{J} = 250\\,\\text{kJ} \\]
        <p>This is a tremendous amount of stored energy (enough to lift a 2500 kg car to a height of 10 m). If the superconductor loses its superconductivity (a "quench"), this energy is rapidly released as heat, which is why MRI quenches are dangerous events requiring careful engineering safeguards.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">LC Analogy Table</div>
    <div class="env-body">
        <table style="width:100%; border-collapse: collapse; margin: 8px 0;">
            <tr style="border-bottom: 1px solid #30363d;">
                <th style="padding:4px 8px; text-align:left;">Capacitor</th>
                <th style="padding:4px 8px; text-align:left;">Inductor</th>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding:4px 8px;">Stores energy in E-field</td>
                <td style="padding:4px 8px;">Stores energy in B-field</td>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding:4px 8px;">\\(U = \\frac{1}{2}CV^2\\)</td>
                <td style="padding:4px 8px;">\\(U = \\frac{1}{2}LI^2\\)</td>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding:4px 8px;">\\(V\\) cannot jump</td>
                <td style="padding:4px 8px;">\\(I\\) cannot jump</td>
            </tr>
            <tr>
                <td style="padding:4px 8px;">\\(I = C\\,dV/dt\\)</td>
                <td style="padding:4px 8px;">\\(V = L\\,dI/dt\\)</td>
            </tr>
        </table>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'A \\(5.0\\,\\text{mH}\\) inductor carries a steady current of \\(3.0\\,\\text{A}\\). How much energy is stored? If the current doubles, by what factor does the stored energy increase?',
                    hint: 'Use \\(U = \\frac{1}{2}LI^2\\). Energy scales as \\(I^2\\).',
                    solution: '\\(U = \\frac{1}{2}(0.005)(3.0)^2 = 0.0225\\,\\text{J} = 22.5\\,\\text{mJ}\\). If \\(I\\) doubles, \\(U\\) increases by a factor of \\(2^2 = 4\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Mutual Inductance and Transformers
        // ============================================================
        {
            id: 'ch17-sec05',
            title: 'Mutual Inductance & Transformers',
            content: `<h2>17.5 Mutual Inductance and Transformers</h2>

<p>When two coils are close together, a changing current in one induces an EMF in the other. This coupling is called <strong>mutual inductance</strong>, and it is the principle behind the <strong>transformer</strong>.</p>

<div class="env-block definition">
    <div class="env-title">Mutual Inductance</div>
    <div class="env-body">
        <p>The mutual inductance \\(M\\) between two coils is defined by</p>
        \\[ \\mathcal{E}_2 = -M\\frac{dI_1}{dt} \\]
        <p>where a changing current \\(I_1\\) in coil 1 induces an EMF \\(\\mathcal{E}_2\\) in coil 2. By reciprocity, \\(M\\) is the same regardless of which coil carries the current.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">The Ideal Transformer</div>
    <div class="env-body">
        <p>An ideal transformer consists of two coils (primary and secondary) wound on a common iron core so that all the magnetic flux links both coils. The voltage and current ratios are</p>
        \\[ \\frac{V_s}{V_p} = \\frac{N_s}{N_p}, \\qquad \\frac{I_s}{I_p} = \\frac{N_p}{N_s} \\]
        <p>where \\(N_p\\) and \\(N_s\\) are the numbers of turns in the primary and secondary coils. Power is conserved: \\(V_p I_p = V_s I_s\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Step-Up vs. Step-Down</div>
    <div class="env-body">
        <ul>
            <li><strong>Step-up transformer</strong> (\\(N_s > N_p\\)): increases voltage, decreases current. Used at power plants to step up to high transmission voltages.</li>
            <li><strong>Step-down transformer</strong> (\\(N_s < N_p\\)): decreases voltage, increases current. Used in your phone charger to step down from mains voltage.</li>
        </ul>
        <p>Neither creates energy. If voltage goes up, current must go down by the same factor. \\(P = IV\\) is constant (in the ideal case).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-transformer"></div>

<div class="env-block example">
    <div class="env-title">Example 17.5 &mdash; Power Transmission</div>
    <div class="env-body">
        <p>A power plant generates \\(500\\,\\text{kW}\\) at \\(10{,}000\\,\\text{V}\\). A step-up transformer increases the voltage to \\(200{,}000\\,\\text{V}\\) for long-distance transmission.</p>
        \\[ \\text{Current at 10,000 V}: \\quad I = P/V = 500{,}000/10{,}000 = 50\\,\\text{A} \\]
        \\[ \\text{Current at 200,000 V}: \\quad I = 500{,}000/200{,}000 = 2.5\\,\\text{A} \\]
        <p>The power lost in the wires (\\(P_{\\text{loss}} = I^2 R\\)) is \\((50)^2/(2.5)^2 = 400\\) times smaller at the higher voltage. This is why we use high-voltage transmission.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-transformer',
                    title: 'Transformer with Adjustable Turns Ratio',
                    description: 'An AC current in the primary coil drives oscillating magnetic field lines through the iron core to the secondary coil. Adjust the turns ratio to step voltage up or down. Power is conserved.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 50, originY: 50, height: 460 });
                        var ctx = viz.ctx;
                        var Np = 10;
                        var Ns = 20;
                        var Vp = 120;
                        var freq = 2.0;
                        var time = 0;
                        var vpTrace = [];
                        var vsTrace = [];
                        var maxTrace = 250;

                        VizEngine.createSlider(controls, 'N_primary =', 2, 30, Np, 1, function(v) { Np = Math.round(v); });
                        VizEngine.createSlider(controls, 'N_secondary =', 2, 30, Ns, 1, function(v) { Ns = Math.round(v); });
                        VizEngine.createSlider(controls, 'V_p (V) =', 10, 240, Vp, 10, function(v) { Vp = v; });
                        VizEngine.createSlider(controls, 'freq (Hz) =', 0.5, 5, freq, 0.5, function(v) { freq = v; });

                        function draw(ts) {
                            var dt = 0.016;
                            time += dt;

                            var ratio = Ns / Np;
                            var vpNow = Vp * Math.sin(2 * Math.PI * freq * time);
                            var vsNow = vpNow * ratio;
                            var Vs = Vp * ratio;
                            var IpAmp = 1.0; // arbitrary unit for visualization
                            var IsAmp = IpAmp / ratio;
                            var ipNow = IpAmp * Math.sin(2 * Math.PI * freq * time);
                            var isNow = IsAmp * Math.sin(2 * Math.PI * freq * time);

                            vpTrace.push(vpNow);
                            vsTrace.push(vsNow);
                            if (vpTrace.length > maxTrace) { vpTrace.shift(); vsTrace.shift(); }

                            viz.clear();
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            // === Transformer visualization ===
                            var coreCx = w * 0.38, coreCy = 155;
                            var coreW = 160, coreH = 120;
                            var coreThick = 20;

                            // Iron core (rectangular frame)
                            ctx.fillStyle = '#4a4a6a';
                            // Top bar
                            ctx.fillRect(coreCx - coreW / 2, coreCy - coreH / 2, coreW, coreThick);
                            // Bottom bar
                            ctx.fillRect(coreCx - coreW / 2, coreCy + coreH / 2 - coreThick, coreW, coreThick);
                            // Left bar
                            ctx.fillRect(coreCx - coreW / 2, coreCy - coreH / 2, coreThick, coreH);
                            // Right bar
                            ctx.fillRect(coreCx + coreW / 2 - coreThick, coreCy - coreH / 2, coreThick, coreH);

                            // Core glow
                            ctx.save();
                            ctx.shadowColor = viz.colors.blue;
                            ctx.shadowBlur = 8;
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(coreCx - coreW / 2, coreCy - coreH / 2, coreW, coreH);
                            ctx.restore();
                            viz.screenText('Iron Core', coreCx, coreCy, viz.colors.text, 10, 'center');

                            // Animated magnetic field lines through core
                            var nFieldLines = 4;
                            var fieldPhase = time * freq * Math.PI * 2;
                            var fieldStrength = Math.sin(fieldPhase);

                            for (var fl = 0; fl < nFieldLines; fl++) {
                                var fy = coreCy - coreH / 2 + coreThick + (fl + 0.5) * (coreH - 2 * coreThick) / nFieldLines;
                                var alpha = 0.15 + 0.35 * Math.abs(fieldStrength);
                                var color = fieldStrength > 0 ? 'rgba(88,166,255,' + alpha + ')' : 'rgba(255,120,80,' + alpha + ')';
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;

                                // Top half: left to right through top bar
                                ctx.beginPath();
                                var xStart = coreCx - coreW / 2 + coreThick;
                                var xEnd = coreCx + coreW / 2 - coreThick;
                                ctx.moveTo(xStart, fy);
                                ctx.lineTo(xEnd, fy);
                                ctx.stroke();

                                // Arrowhead
                                var arrowDir = fieldStrength > 0 ? 1 : -1;
                                var arrowX = (xStart + xEnd) / 2 + arrowDir * 15;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(arrowX + arrowDir * 6, fy);
                                ctx.lineTo(arrowX - arrowDir * 3, fy - 3);
                                ctx.lineTo(arrowX - arrowDir * 3, fy + 3);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Primary coil (left side of core)
                            var pCoilX = coreCx - coreW / 2 + coreThick / 2;
                            var pCoilTop = coreCy - coreH / 2 + coreThick;
                            var pCoilBot = coreCy + coreH / 2 - coreThick;
                            var pCoilH = pCoilBot - pCoilTop;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            var npDraw = Math.min(Np, 15);
                            for (var pi = 0; pi < npDraw; pi++) {
                                var py = pCoilTop + (pi + 0.5) * pCoilH / npDraw;
                                ctx.beginPath();
                                ctx.ellipse(pCoilX, py, 12, pCoilH / npDraw / 2.5, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            viz.screenText('Primary', pCoilX - 20, coreCy + coreH / 2 + 18, viz.colors.orange, 11, 'center');
                            viz.screenText('N\u2081=' + Np, pCoilX - 20, coreCy + coreH / 2 + 32, viz.colors.orange, 10, 'center');

                            // Secondary coil (right side of core)
                            var sCoilX = coreCx + coreW / 2 - coreThick / 2;
                            var sCoilTop = coreCy - coreH / 2 + coreThick;
                            var sCoilBot = coreCy + coreH / 2 - coreThick;
                            var sCoilH = sCoilBot - sCoilTop;

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            var nsDraw = Math.min(Ns, 15);
                            for (var si = 0; si < nsDraw; si++) {
                                var sy = sCoilTop + (si + 0.5) * sCoilH / nsDraw;
                                ctx.beginPath();
                                ctx.ellipse(sCoilX, sy, 12, sCoilH / nsDraw / 2.5, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            viz.screenText('Secondary', sCoilX + 20, coreCy + coreH / 2 + 18, viz.colors.teal, 11, 'center');
                            viz.screenText('N\u2082=' + Ns, sCoilX + 20, coreCy + coreH / 2 + 32, viz.colors.teal, 10, 'center');

                            // Current indicators on coils
                            var pCurrAlpha = Math.abs(ipNow) * 0.8;
                            if (pCurrAlpha > 0.02) {
                                ctx.fillStyle = 'rgba(255,215,0,' + pCurrAlpha + ')';
                                var pDotY = pCoilTop + ((Math.sin(fieldPhase) + 1) / 2) * pCoilH;
                                ctx.beginPath();
                                ctx.arc(pCoilX - 12, pDotY, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                            var sCurrAlpha = Math.abs(isNow) * 0.8;
                            if (sCurrAlpha > 0.02) {
                                ctx.fillStyle = 'rgba(255,215,0,' + sCurrAlpha + ')';
                                var sDotY = sCoilTop + ((Math.sin(fieldPhase) + 1) / 2) * sCoilH;
                                ctx.beginPath();
                                ctx.arc(sCoilX + 12, sDotY, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // AC source symbol (left of primary)
                            var acX = pCoilX - 55, acY = coreCy;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(acX, acY, 15, 0, Math.PI * 2);
                            ctx.stroke();
                            // Sine wave inside
                            ctx.beginPath();
                            for (var sw = -10; sw <= 10; sw++) {
                                var sx2 = acX + sw;
                                var sy2 = acY - 6 * Math.sin(sw / 10 * Math.PI);
                                if (sw === -10) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();
                            // Wires to primary
                            ctx.beginPath();
                            ctx.moveTo(acX, acY - 15);
                            ctx.lineTo(acX, coreCy - coreH / 2 + coreThick);
                            ctx.lineTo(pCoilX - 12, pCoilTop);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(acX, acY + 15);
                            ctx.lineTo(acX, coreCy + coreH / 2 - coreThick);
                            ctx.lineTo(pCoilX - 12, pCoilBot);
                            ctx.stroke();

                            // Load symbol (right of secondary)
                            var loadX = sCoilX + 55, loadY = coreCy;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            // Lightbulb
                            ctx.beginPath();
                            ctx.arc(loadX, loadY, 12, 0, Math.PI * 2);
                            ctx.stroke();
                            // Brightness
                            var loadBright = Math.abs(vsNow) / (Vs > 0 ? Vs : 1);
                            var loadGlow = ctx.createRadialGradient(loadX, loadY, 2, loadX, loadY, 20);
                            loadGlow.addColorStop(0, 'rgba(255,215,0,' + (loadBright * 0.8) + ')');
                            loadGlow.addColorStop(1, 'rgba(255,215,0,0)');
                            ctx.fillStyle = loadGlow;
                            ctx.beginPath(); ctx.arc(loadX, loadY, 20, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = 'rgba(255,215,0,' + VizEngine.clamp(loadBright, 0.05, 1) + ')';
                            ctx.beginPath(); ctx.arc(loadX, loadY, 10, 0, Math.PI * 2); ctx.fill();
                            // Wires
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(loadX, loadY - 12);
                            ctx.lineTo(loadX, coreCy - coreH / 2 + coreThick);
                            ctx.lineTo(sCoilX + 12, sCoilTop);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(loadX, loadY + 12);
                            ctx.lineTo(loadX, coreCy + coreH / 2 - coreThick);
                            ctx.lineTo(sCoilX + 12, sCoilBot);
                            ctx.stroke();

                            // === Waveform plots ===
                            var plotX = 20, plotY2 = coreCy + coreH / 2 + 60, plotW = w - 40, plotH2 = 100;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY2, plotW, plotH2);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY2, plotW, plotH2);

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY2 + plotH2 / 2);
                            ctx.lineTo(plotX + plotW, plotY2 + plotH2 / 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            var vPlotMax = Math.max(Vp, Vs) * 1.3;
                            if (vPlotMax < 1) vPlotMax = 1;

                            // Primary voltage
                            if (vpTrace.length > 1) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var vi = 0; vi < vpTrace.length; vi++) {
                                    var px = plotX + vi * plotW / maxTrace;
                                    var py2 = plotY2 + plotH2 / 2 - (vpTrace[vi] / vPlotMax) * plotH2 / 2;
                                    if (vi === 0) ctx.moveTo(px, py2);
                                    else ctx.lineTo(px, py2);
                                }
                                ctx.stroke();
                            }

                            // Secondary voltage
                            if (vsTrace.length > 1) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var vj = 0; vj < vsTrace.length; vj++) {
                                    var px2 = plotX + vj * plotW / maxTrace;
                                    var py3 = plotY2 + plotH2 / 2 - (vsTrace[vj] / vPlotMax) * plotH2 / 2;
                                    if (vj === 0) ctx.moveTo(px2, py3);
                                    else ctx.lineTo(px2, py3);
                                }
                                ctx.stroke();
                            }

                            viz.screenText('V_p (orange)', plotX + 55, plotY2 + 12, viz.colors.orange, 10, 'center');
                            viz.screenText('V_s (teal)', plotX + 150, plotY2 + 12, viz.colors.teal, 10, 'center');

                            // === Info panel ===
                            var infoX = plotX, infoY = plotY2 + plotH2 + 12;
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(infoX, infoY, plotW, 65);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(infoX, infoY, plotW, 65);

                            var typeStr = ratio > 1 ? 'Step-UP' : (ratio < 1 ? 'Step-DOWN' : '1:1');
                            var typeColor = ratio > 1 ? viz.colors.green : (ratio < 1 ? viz.colors.red : viz.colors.text);
                            viz.screenText('Transformer: ' + typeStr + '  (ratio N\u2082/N\u2081 = ' + ratio.toFixed(2) + ')', w / 2, infoY + 14, typeColor, 12, 'center');
                            viz.screenText('V_p = ' + Vp.toFixed(0) + ' V   \u2192   V_s = N\u2082/N\u2081 \u00d7 V_p = ' + Vs.toFixed(0) + ' V', w / 2, infoY + 34, viz.colors.white, 11, 'center');

                            var Ip = 1.0; // normalized
                            var Is = Ip / ratio;
                            viz.screenText('Power conserved: V\u2081I\u2081 = V\u2082I\u2082 (if I\u2081=1 A, then I\u2082=' + Is.toFixed(2) + ' A)', w / 2, infoY + 52, viz.colors.text, 10, 'center');
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A transformer has 400 primary turns and 2000 secondary turns. If the primary voltage is \\(120\\,\\text{V}\\) and the primary current is \\(5.0\\,\\text{A}\\), find (a) the secondary voltage, (b) the secondary current, (c) the power delivered.',
                    hint: 'Use \\(V_s/V_p = N_s/N_p\\) and power conservation \\(V_p I_p = V_s I_s\\).',
                    solution: '(a) \\(V_s = V_p \\cdot N_s/N_p = 120 \\times 2000/400 = 600\\,\\text{V}\\). (b) \\(I_s = I_p \\cdot N_p/N_s = 5.0 \\times 400/2000 = 1.0\\,\\text{A}\\). (c) \\(P = V_p I_p = (120)(5.0) = 600\\,\\text{W}\\). Check: \\(V_s I_s = (600)(1.0) = 600\\,\\text{W}\\). Consistent.'
                }
            ]
        }
    ]
});
