// === Chapter 9: RC Circuits ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'RC Circuits',
    subtitle: 'Capacitors and resistors together: exponential charging, discharging, and the time constant',
    sections: [
        // ============================================================
        // SECTION 1: Charging a Capacitor
        // ============================================================
        {
            id: 'ch09-sec01',
            title: 'Charging a Capacitor',
            content: `<h2>9.1 Charging a Capacitor Through a Resistor</h2>

<div class="env-block intuition">
    <div class="env-title">Why Not Instant?</div>
    <div class="env-body">
        <p>Connect an uncharged capacitor directly to a battery and (in theory) infinite current would flow for an instant. In practice, every circuit has resistance, and this resistance limits the current. The result: the capacitor charges gradually, following a beautiful exponential curve. The interplay of \\(R\\) and \\(C\\) determines how fast.</p>
    </div>
</div>

<h3>Deriving the Charging Equation</h3>

<p>Consider a series RC circuit: a battery \\(\\mathcal{E}\\), resistor \\(R\\), and initially uncharged capacitor \\(C\\). At the moment the switch closes, applying KVL around the loop:</p>

\\[\\mathcal{E} - IR - \\frac{q}{C} = 0\\]

<p>Since \\(I = dq/dt\\):</p>

\\[\\mathcal{E} = R\\frac{dq}{dt} + \\frac{q}{C}\\]

<p>This is a first-order linear ODE. Solving with initial condition \\(q(0) = 0\\):</p>

<div class="env-block theorem">
    <div class="env-title">RC Charging Equations</div>
    <div class="env-body">
        \\[q(t) = C\\mathcal{E}\\left(1 - e^{-t/RC}\\right)\\]
        \\[V_C(t) = \\mathcal{E}\\left(1 - e^{-t/RC}\\right)\\]
        \\[I(t) = \\frac{\\mathcal{E}}{R}\\,e^{-t/RC}\\]
        <p>The voltage across the capacitor rises from 0 toward \\(\\mathcal{E}\\), while the current starts at \\(\\mathcal{E}/R\\) and decays to zero.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Physical Interpretation</div>
    <div class="env-body">
        <p>Initially the capacitor is empty, so it acts like a short circuit; all the battery voltage drops across \\(R\\), giving maximum current \\(I_0 = \\mathcal{E}/R\\). As charge accumulates on the capacitor, its back-voltage \\(V_C = q/C\\) opposes the battery, reducing the net driving voltage and hence the current. Eventually \\(V_C \\to \\mathcal{E}\\), current drops to zero, and charging stops.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 9.1 &mdash; Charging an RC Circuit</div>
    <div class="env-body">
        <p>\\(\\mathcal{E} = 12\\,\\text{V}\\), \\(R = 1\\,\\text{k}\\Omega\\), \\(C = 100\\,\\mu\\text{F}\\). Find the time constant and the voltage at \\(t = 0.1\\,\\text{s}\\).</p>
        <p><strong>Solution.</strong> \\(\\tau = RC = 1000 \\times 100 \\times 10^{-6} = 0.1\\,\\text{s}\\).</p>
        \\[V_C(0.1) = 12(1 - e^{-1}) = 12(1 - 0.368) = 12 \\times 0.632 \\approx 7.58\\,\\text{V}\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rc-charge"></div>`,
            visualizations: [
                {
                    id: 'viz-rc-charge',
                    title: 'RC Charging: Voltage Rise and Electron Flow',
                    description: 'Flip the switch to start charging. Watch electrons flow, the capacitor voltage rise exponentially, and the current decay. The time constant marker shows where V reaches 63.2% of maximum.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 340, originY: 300 });
                        var ctx = viz.ctx;

                        var emf = 12, R = 5, C = 2; // tau = R*C = 10 (time units for display)
                        var charging = false;
                        var t = 0;
                        var history = [];

                        VizEngine.createSlider(controls, 'EMF (V)', 3, 24, emf, 1, function(v) { emf = v; });
                        VizEngine.createSlider(controls, 'R (arb)', 1, 10, R, 0.5, function(v) { R = v; resetSim(); });
                        VizEngine.createSlider(controls, 'C (arb)', 0.5, 5, C, 0.25, function(v) { C = v; resetSim(); });
                        VizEngine.createButton(controls, 'Charge', function() { if (!charging) { charging = true; t = 0; history = []; } });
                        VizEngine.createButton(controls, 'Reset', function() { resetSim(); });

                        function resetSim() {
                            charging = false;
                            t = 0;
                            history = [];
                        }

                        function draw(timestamp) {
                            var dt = 0.016;
                            var tau = R * C;

                            if (charging) {
                                t += dt * 3; // speed up time for display
                            }

                            var Vc = charging ? emf * (1 - Math.exp(-t / tau)) : 0;
                            var Ic = charging ? (emf / R) * Math.exp(-t / tau) : 0;

                            if (charging && t < tau * 6) {
                                history.push({ t: t, Vc: Vc, Ic: Ic });
                                if (history.length > 500) history.shift();
                            }

                            viz.clear();

                            // --- Circuit diagram (left portion) ---
                            var circL = 20, circR = 200, circT = 30, circB = 170;

                            // Wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(circL, circT); ctx.lineTo(circR, circT); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(circL, circB); ctx.lineTo(circR, circB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(circL, circT); ctx.lineTo(circL, circB); ctx.stroke();

                            // Switch (top-right to capacitor)
                            var swX = 140;
                            if (charging) {
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(swX, circT); ctx.lineTo(circR, circT); ctx.stroke();
                            } else {
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(swX, circT); ctx.lineTo(swX + 30, circT - 20); ctx.stroke();
                                // Contact point
                                ctx.fillStyle = viz.colors.text;
                                ctx.beginPath(); ctx.arc(swX, circT, 3, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(circR, circT, 3, 0, Math.PI * 2); ctx.fill();
                            }
                            viz.screenText('S', swX + 15, circT - 22, charging ? viz.colors.green : viz.colors.red, 10, 'center');

                            // Battery (left side)
                            var batY = (circT + circB) / 2;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(circL - 8, batY - 8); ctx.lineTo(circL + 8, batY - 8); ctx.stroke();
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(circL - 5, batY + 2); ctx.lineTo(circL + 5, batY + 2); ctx.stroke();
                            viz.screenText(emf.toFixed(0) + 'V', circL - 18, batY, viz.colors.green, 10, 'right');

                            // Resistor (top)
                            var resX = (circL + swX) / 2;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(resX - 20, circT - 8, 40, 16);
                            viz.screenText('R', resX, circT - 16, viz.colors.orange, 10, 'center');

                            // Capacitor (right side)
                            var capY = (circT + circB) / 2;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(circR, circT); ctx.lineTo(circR, capY - 8); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(circR - 12, capY - 8); ctx.lineTo(circR + 12, capY - 8); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(circR - 12, capY + 8); ctx.lineTo(circR + 12, capY + 8); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(circR, capY + 8); ctx.lineTo(circR, circB); ctx.stroke();

                            // Capacitor charge fill
                            if (Vc > 0.1) {
                                var fillFrac = Vc / emf;
                                var capFillH = fillFrac * 14;
                                ctx.fillStyle = viz.colors.blue + Math.round(fillFrac * 180).toString(16).padStart(2, '0');
                                ctx.fillRect(circR - 10, capY - 6, 20, capFillH);

                                // Glow
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = fillFrac * 15;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(circR - 12, capY - 8); ctx.lineTo(circR + 12, capY - 8); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(circR - 12, capY + 8); ctx.lineTo(circR + 12, capY + 8); ctx.stroke();
                                ctx.restore();
                            }
                            viz.screenText('C', circR + 18, capY, viz.colors.blue, 10, 'left');

                            // Electron flow animation
                            if (charging && Ic > 0.05) {
                                var nElec = Math.round(VizEngine.clamp(Ic * 2, 1, 12));
                                var speed = Ic * 0.1;
                                // Around the loop: left-top, across resistor, down to capacitor
                                var perimeter = (circR - circL) + (circB - circT) + (circR - circL) + (circB - circT);
                                for (var e = 0; e < nElec; e++) {
                                    var frac = ((e / nElec) + t * speed) % 1;
                                    var ex, ey;
                                    var seg1 = circR - circL, seg2 = seg1 + (circB - circT), seg3 = seg2 + (circR - circL);
                                    var dist = frac * perimeter;
                                    if (dist < seg1) {
                                        ex = circL + dist; ey = circT;
                                    } else if (dist < seg2) {
                                        ex = circR; ey = circT + (dist - seg1);
                                    } else if (dist < seg3) {
                                        ex = circR - (dist - seg2); ey = circB;
                                    } else {
                                        ex = circL; ey = circB - (dist - seg3);
                                    }
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.cyan;
                                    ctx.shadowBlur = 6;
                                    ctx.fillStyle = viz.colors.cyan;
                                    ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }
                            }

                            // --- V(t) graph (right portion) ---
                            var gL = 250, gR = viz.width - 25, gT = 20, gB = 150;
                            var gW = gR - gL, gH = gB - gT;
                            var maxT = tau * 5;

                            // Graph background
                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(gL, gT, gW, gH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(gL, gT, gW, gH);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 1; gx <= 5; gx++) {
                                var lx = gL + (gx / 5) * gW;
                                ctx.beginPath(); ctx.moveTo(lx, gT); ctx.lineTo(lx, gB); ctx.stroke();
                                viz.screenText((gx * tau / 5 * 5 / tau).toFixed(0) + '\u03C4', lx, gB + 12, viz.colors.text, 9, 'center');
                            }
                            for (var gy = 0; gy <= 4; gy++) {
                                var ly = gB - (gy / 4) * gH;
                                ctx.beginPath(); ctx.moveTo(gL, ly); ctx.lineTo(gR, ly); ctx.stroke();
                                viz.screenText((gy / 4 * emf).toFixed(0), gL - 8, ly, viz.colors.text, 9, 'right');
                            }

                            viz.screenText('V\u209c (V)', gL + gW / 2, gT - 8, viz.colors.blue, 12, 'center');
                            viz.screenText('t', gR + 10, gB, viz.colors.text, 10, 'left');

                            // EMF asymptote
                            ctx.strokeStyle = viz.colors.green + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            var emfY = gB - gH;
                            ctx.beginPath(); ctx.moveTo(gL, emfY); ctx.lineTo(gR, emfY); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03B5 = ' + emf.toFixed(0), gR + 5, emfY, viz.colors.green, 9, 'left');

                            // 63.2% marker
                            var y632 = gB - 0.632 * gH;
                            var x632 = gL + (tau / maxT) * gW;
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(gL, y632); ctx.lineTo(x632, y632); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(x632, y632); ctx.lineTo(x632, gB); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('63.2%', gL - 8, y632, viz.colors.yellow, 9, 'right');
                            viz.screenText('\u03C4', x632, gB + 12, viz.colors.yellow, 10, 'center');

                            // Theoretical curve
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var px = 0; px <= gW; px++) {
                                var tt = (px / gW) * maxT;
                                var vv = emf * (1 - Math.exp(-tt / tau));
                                var py = gB - (vv / emf) * gH;
                                if (px === 0) ctx.moveTo(gL + px, py);
                                else ctx.lineTo(gL + px, py);
                            }
                            ctx.stroke();

                            // Plotted history
                            if (history.length > 1) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var h = 0; h < history.length; h++) {
                                    var hx = gL + (history[h].t / maxT) * gW;
                                    var hy = gB - (history[h].Vc / emf) * gH;
                                    if (hx > gR) break;
                                    if (h === 0) ctx.moveTo(hx, hy);
                                    else ctx.lineTo(hx, hy);
                                }
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = 6;
                                ctx.stroke();
                                ctx.restore();

                                // Current dot on curve
                                var curHx = gL + (t / maxT) * gW;
                                var curHy = gB - (Vc / emf) * gH;
                                if (curHx <= gR) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.yellow;
                                    ctx.shadowBlur = 10;
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.arc(curHx, curHy, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }
                            }

                            // --- I(t) graph below ---
                            var iT = 175, iB = 280, iH = iB - iT;

                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(gL, iT, gW, iH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(gL, iT, gW, iH);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var igx = 1; igx <= 5; igx++) {
                                var ilx = gL + (igx / 5) * gW;
                                ctx.beginPath(); ctx.moveTo(ilx, iT); ctx.lineTo(ilx, iB); ctx.stroke();
                            }

                            viz.screenText('I(t)', gL + gW / 2, iT - 8, viz.colors.orange, 12, 'center');

                            var I0 = emf / R;
                            // Theoretical I curve
                            ctx.strokeStyle = viz.colors.orange + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var px2 = 0; px2 <= gW; px2++) {
                                var tt2 = (px2 / gW) * maxT;
                                var ii = I0 * Math.exp(-tt2 / tau);
                                var py2 = iB - (ii / I0) * iH;
                                if (px2 === 0) ctx.moveTo(gL + px2, py2);
                                else ctx.lineTo(gL + px2, py2);
                            }
                            ctx.stroke();

                            // Plotted I history
                            if (history.length > 1) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var h2 = 0; h2 < history.length; h2++) {
                                    var ihx = gL + (history[h2].t / maxT) * gW;
                                    var ihy = iB - (history[h2].Ic / I0) * iH;
                                    if (ihx > gR) break;
                                    if (h2 === 0) ctx.moveTo(ihx, ihy);
                                    else ctx.lineTo(ihx, ihy);
                                }
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 6;
                                ctx.stroke();
                                ctx.restore();
                            }

                            // Info panel
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, viz.height - 60, 230, 50);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, viz.height - 60, 230, 50);

                            viz.screenText('\u03C4 = RC = ' + tau.toFixed(2) + ' s', 20, viz.height - 44, viz.colors.yellow, 12, 'left');
                            viz.screenText('V\u209c = ' + Vc.toFixed(2) + ' V   I = ' + Ic.toFixed(2) + ' A', 20, viz.height - 26, viz.colors.white, 12, 'left');

                            if (!charging) {
                                viz.screenText('Press "Charge" to begin', viz.width / 2, viz.height / 2, viz.colors.text, 14, 'center');
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'An RC circuit has \\(R = 2\\,\\text{k}\\Omega\\) and \\(C = 47\\,\\mu\\text{F}\\). What is \\(\\tau\\)? How long until the capacitor reaches 99% of the supply voltage?',
                    hint: '\\(\\tau = RC\\). For 99%: solve \\(1 - e^{-t/\\tau} = 0.99\\).',
                    solution: '\\(\\tau = 2000 \\times 47 \\times 10^{-6} = 0.094\\,\\text{s}\\). For 99%: \\(e^{-t/\\tau} = 0.01\\), so \\(t = \\tau \\ln 100 \\approx 4.6\\tau \\approx 0.43\\,\\text{s}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 2: The Time Constant tau
        // ============================================================
        {
            id: 'ch09-sec02',
            title: 'The Time Constant \u03C4',
            content: `<h2>9.2 The Time Constant \\(\\tau = RC\\)</h2>

<div class="env-block definition">
    <div class="env-title">Time Constant</div>
    <div class="env-body">
        <p>The <strong>time constant</strong> of an RC circuit is:</p>
        \\[\\tau = RC\\]
        <p>Unit: seconds (since \\(\\Omega \\cdot \\text{F} = \\text{s}\\)).</p>
        <p>After one time constant, the capacitor voltage has reached \\(1 - e^{-1} \\approx 63.2\\%\\) of its final value during charging (or dropped to \\(e^{-1} \\approx 36.8\\%\\) during discharging).</p>
    </div>
</div>

<h3>Key Time Milestones</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #333;"><th style="text-align:left;padding:6px;">Time</th><th style="text-align:left;padding:6px;">Charging \\(V_C/\\mathcal{E}\\)</th><th style="text-align:left;padding:6px;">Discharging \\(V_C/V_0\\)</th></tr>
<tr><td style="padding:6px;">\\(1\\tau\\)</td><td style="padding:6px;">63.2%</td><td style="padding:6px;">36.8%</td></tr>
<tr><td style="padding:6px;">\\(2\\tau\\)</td><td style="padding:6px;">86.5%</td><td style="padding:6px;">13.5%</td></tr>
<tr><td style="padding:6px;">\\(3\\tau\\)</td><td style="padding:6px;">95.0%</td><td style="padding:6px;">5.0%</td></tr>
<tr><td style="padding:6px;">\\(4\\tau\\)</td><td style="padding:6px;">98.2%</td><td style="padding:6px;">1.8%</td></tr>
<tr><td style="padding:6px;">\\(5\\tau\\)</td><td style="padding:6px;">99.3%</td><td style="padding:6px;">0.7%</td></tr>
</table>

<div class="env-block remark">
    <div class="env-title">The "5-tau Rule"</div>
    <div class="env-body">
        <p>Engineers commonly say a capacitor is "fully charged" after \\(5\\tau\\), since it has reached 99.3% of its final value. This is a practical convention, not an exact threshold; mathematically, the exponential never quite reaches the asymptote.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Dimensional Analysis</div>
    <div class="env-body">
        <p>Why does \\(\\Omega \\cdot \\text{F}\\) have units of seconds?</p>
        \\[\\Omega \\cdot \\text{F} = \\frac{\\text{V}}{\\text{A}} \\cdot \\frac{\\text{C}}{\\text{V}} = \\frac{\\text{C}}{\\text{A}} = \\frac{\\text{A} \\cdot \\text{s}}{\\text{A}} = \\text{s}\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 9.2 &mdash; Designing a Delay Circuit</div>
    <div class="env-body">
        <p>You want a capacitor to reach 5 V (from a 9 V supply) in exactly 2 seconds. You have \\(C = 100\\,\\mu\\text{F}\\). What \\(R\\) do you need?</p>
        <p><strong>Solution.</strong> \\(V_C = \\mathcal{E}(1 - e^{-t/\\tau})\\), so \\(5/9 = 1 - e^{-2/\\tau}\\), giving \\(e^{-2/\\tau} = 4/9\\), so \\(\\tau = -2/\\ln(4/9) = 2/0.811 \\approx 2.47\\,\\text{s}\\).</p>
        \\[R = \\tau / C = 2.47 / (100 \\times 10^{-6}) = 24{,}700\\,\\Omega \\approx 25\\,\\text{k}\\Omega\\]
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'A \\(10\\,\\mu\\text{F}\\) capacitor charges through a \\(100\\,\\text{k}\\Omega\\) resistor from a 5 V source. (a) Find \\(\\tau\\). (b) How long until \\(V_C = 4\\,\\text{V}\\)?',
                    hint: 'Solve \\(4 = 5(1-e^{-t/\\tau})\\) for \\(t\\).',
                    solution: '(a) \\(\\tau = 100{,}000 \\times 10 \\times 10^{-6} = 1\\,\\text{s}\\). (b) \\(0.8 = 1 - e^{-t}\\), \\(e^{-t} = 0.2\\), \\(t = \\ln 5 \\approx 1.61\\,\\text{s}\\).'
                },
                {
                    question: 'If you double \\(R\\) and halve \\(C\\), what happens to \\(\\tau\\)?',
                    hint: '\\(\\tau = RC\\).',
                    solution: '\\(\\tau\' = (2R)(C/2) = RC = \\tau\\). The time constant is unchanged.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Discharging
        // ============================================================
        {
            id: 'ch09-sec03',
            title: 'Discharging',
            content: `<h2>9.3 Discharging a Capacitor</h2>

<div class="env-block intuition">
    <div class="env-title">Energy Flows Out</div>
    <div class="env-body">
        <p>A charged capacitor stores energy \\(U = \\frac{1}{2}CV^2\\). When connected to a resistor (without a battery), this stored energy drives a current that decays exponentially as the capacitor drains.</p>
    </div>
</div>

<h3>Deriving the Discharge Equations</h3>

<p>A capacitor initially at voltage \\(V_0\\) discharges through resistance \\(R\\). KVL gives:</p>

\\[\\frac{q}{C} + IR = 0 \\quad \\Rightarrow \\quad \\frac{q}{C} + R\\frac{dq}{dt} = 0\\]

<p>With \\(q(0) = CV_0\\):</p>

<div class="env-block theorem">
    <div class="env-title">RC Discharge Equations</div>
    <div class="env-body">
        \\[V_C(t) = V_0\\,e^{-t/RC}\\]
        \\[I(t) = \\frac{V_0}{R}\\,e^{-t/RC}\\]
        \\[q(t) = C V_0\\,e^{-t/RC}\\]
        <p>Everything decays exponentially with the same time constant \\(\\tau = RC\\).</p>
    </div>
</div>

<h3>Energy Dissipation</h3>

<p>The total energy dissipated in the resistor during discharge equals the initial energy stored:</p>

\\[\\int_0^\\infty P\\,dt = \\int_0^\\infty \\frac{V_0^2}{R} e^{-2t/RC}\\,dt = \\frac{V_0^2}{R} \\cdot \\frac{RC}{2} = \\frac{1}{2}CV_0^2\\]

<p>All the capacitor's energy is converted to heat in the resistor. None is lost elsewhere (in this ideal circuit).</p>

<div class="env-block example">
    <div class="env-title">Example 9.3 &mdash; Camera Flash Capacitor</div>
    <div class="env-body">
        <p>A camera flash capacitor (\\(C = 300\\,\\mu\\text{F}\\)) is charged to 300 V, then discharged through a flash tube with effective resistance \\(R = 5\\,\\Omega\\).</p>
        <p>\\(\\tau = RC = 5 \\times 300 \\times 10^{-6} = 1.5\\,\\text{ms}\\)</p>
        <p>Energy: \\(U = \\frac{1}{2}(300 \\times 10^{-6})(300^2) = 13.5\\,\\text{J}\\)</p>
        <p>This 13.5 J is released in about 7.5 ms (\\(5\\tau\\)), producing an intense burst of light.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rc-discharge"></div>`,
            visualizations: [
                {
                    id: 'viz-rc-discharge',
                    title: 'Charge and Discharge: Full RC Cycle',
                    description: 'Charge the capacitor, then discharge it. Watch the exponential rise and fall on the V(t) graph. Adjust R and C to change the time constant.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 300, originY: 280 });
                        var ctx = viz.ctx;

                        var emf = 12, R = 4, C = 2;
                        var mode = 'idle'; // idle, charging, charged, discharging, discharged
                        var t = 0;
                        var Vc = 0;
                        var history = [];
                        var totalT = 0;

                        VizEngine.createSlider(controls, 'EMF (V)', 3, 24, emf, 1, function(v) { emf = v; });
                        VizEngine.createSlider(controls, 'R', 1, 10, R, 0.5, function(v) { R = v; });
                        VizEngine.createSlider(controls, 'C', 0.5, 5, C, 0.25, function(v) { C = v; });
                        VizEngine.createButton(controls, 'Charge', function() {
                            if (mode === 'idle' || mode === 'discharged') { mode = 'charging'; t = 0; Vc = 0; history = []; totalT = 0; }
                        });
                        VizEngine.createButton(controls, 'Discharge', function() {
                            if (mode === 'charged' || mode === 'charging') { mode = 'discharging'; t = 0; }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            mode = 'idle'; t = 0; Vc = 0; history = []; totalT = 0;
                        });

                        function draw(timestamp) {
                            var dt = 0.016;
                            var tau = R * C;
                            var speed = 3;

                            if (mode === 'charging') {
                                t += dt * speed;
                                totalT += dt * speed;
                                Vc = emf * (1 - Math.exp(-t / tau));
                                history.push({ t: totalT, Vc: Vc });
                                if (t > tau * 5.5) { mode = 'charged'; }
                            } else if (mode === 'discharging') {
                                var V0 = Vc;
                                t += dt * speed;
                                totalT += dt * speed;
                                Vc = V0 * Math.exp(-(dt * speed) / tau);
                                if (Vc < 0.01) Vc = 0;
                                history.push({ t: totalT, Vc: Vc });
                                if (Vc < 0.01) { mode = 'discharged'; }
                            } else if (mode === 'charged') {
                                // Hold steady
                                totalT += dt * speed;
                                history.push({ t: totalT, Vc: Vc });
                            }

                            if (history.length > 800) history.splice(0, history.length - 800);

                            var Ic = 0;
                            if (mode === 'charging') Ic = (emf - Vc) / R;
                            else if (mode === 'discharging') Ic = Vc / R;

                            viz.clear();

                            // --- V(t) graph (main feature) ---
                            var gL = 50, gR = viz.width - 25, gT = 20, gB = 200;
                            var gW = gR - gL, gH = gB - gT;
                            var maxDisplayT = history.length > 0 ? Math.max(history[history.length - 1].t * 1.1, tau * 6) : tau * 6;

                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(gL, gT, gW, gH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(gL, gT, gW, gH);

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gy = 0; gy <= 4; gy++) {
                                var ly = gB - (gy / 4) * gH;
                                ctx.beginPath(); ctx.moveTo(gL, ly); ctx.lineTo(gR, ly); ctx.stroke();
                                viz.screenText((gy / 4 * emf).toFixed(0), gL - 8, ly, viz.colors.text, 9, 'right');
                            }

                            // EMF asymptote
                            ctx.strokeStyle = viz.colors.green + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(gL, gT); ctx.lineTo(gR, gT); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03B5 = ' + emf.toFixed(0) + ' V', gR + 5, gT + 5, viz.colors.green, 9, 'left');

                            // 63.2% line
                            var y632 = gB - 0.632 * gH;
                            ctx.strokeStyle = viz.colors.yellow + '33';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([2, 4]);
                            ctx.beginPath(); ctx.moveTo(gL, y632); ctx.lineTo(gR, y632); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('63.2%', gL - 8, y632, viz.colors.yellow, 8, 'right');

                            viz.screenText('V\u209c(t)', gL + gW / 2, gT - 10, viz.colors.blue, 13, 'center');

                            // Plot history
                            if (history.length > 1) {
                                ctx.beginPath();
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                for (var h = 0; h < history.length; h++) {
                                    var hx = gL + (history[h].t / maxDisplayT) * gW;
                                    var hy = gB - (history[h].Vc / emf) * gH;
                                    if (hx > gR) break;
                                    if (h === 0) ctx.moveTo(hx, hy);
                                    else ctx.lineTo(hx, hy);
                                }
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = 5;
                                ctx.stroke();
                                ctx.restore();

                                // Glowing dot at current position
                                var lastH = history[history.length - 1];
                                var dotX = gL + (lastH.t / maxDisplayT) * gW;
                                var dotY = gB - (lastH.Vc / emf) * gH;
                                if (dotX <= gR) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.yellow;
                                    ctx.shadowBlur = 12;
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }
                            }

                            // Capacitor charge visualization (bar)
                            var barX = 30, barY = 220, barW = 30, barH = 90;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(barX, barY, barW, barH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barX, barY, barW, barH);

                            var fillH = VizEngine.clamp(Vc / emf, 0, 1) * barH;
                            if (fillH > 0) {
                                var cGrad = ctx.createLinearGradient(0, barY + barH, 0, barY + barH - fillH);
                                cGrad.addColorStop(0, viz.colors.blue);
                                cGrad.addColorStop(1, viz.colors.cyan);
                                ctx.fillStyle = cGrad;
                                ctx.fillRect(barX + 2, barY + barH - fillH, barW - 4, fillH);

                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = 10;
                                ctx.fillRect(barX + 2, barY + barH - fillH, barW - 4, 2);
                                ctx.restore();
                            }

                            // Capacitor plate symbols
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(barX + 5, barY - 2); ctx.lineTo(barX + barW - 5, barY - 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(barX + 5, barY + barH + 2); ctx.lineTo(barX + barW - 5, barY + barH + 2); ctx.stroke();

                            viz.screenText('C', barX + barW / 2, barY + barH + 18, viz.colors.blue, 11, 'center');
                            viz.screenText(Vc.toFixed(1) + ' V', barX + barW / 2, barY - 12, viz.colors.cyan, 11, 'center');

                            // Energy stored
                            var energy = 0.5 * C * Vc * Vc;
                            var maxEnergy = 0.5 * C * emf * emf;
                            viz.screenText('U = ' + energy.toFixed(1) + ' / ' + maxEnergy.toFixed(1) + ' J', barX + barW / 2 + 50, barY + barH / 2, viz.colors.purple, 11, 'left');

                            // Info panel
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(viz.width - 220, 220, 210, 90);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(viz.width - 220, 220, 210, 90);

                            viz.screenText('\u03C4 = RC = ' + tau.toFixed(2) + ' s', viz.width - 210, 238, viz.colors.yellow, 13, 'left');
                            viz.screenText('V\u209c = ' + Vc.toFixed(2) + ' V', viz.width - 210, 258, viz.colors.blue, 13, 'left');
                            viz.screenText('I = ' + Ic.toFixed(3) + ' A', viz.width - 210, 278, viz.colors.orange, 13, 'left');

                            var modeLabel = mode === 'idle' ? 'Ready' : mode === 'charging' ? 'CHARGING' : mode === 'charged' ? 'FULLY CHARGED' : mode === 'discharging' ? 'DISCHARGING' : 'DISCHARGED';
                            var modeColor = mode === 'charging' ? viz.colors.green : mode === 'discharging' ? viz.colors.orange : viz.colors.text;
                            viz.screenText(modeLabel, viz.width - 210, 298, modeColor, 13, 'left');

                            if (mode === 'idle') {
                                viz.screenText('Press "Charge" to begin', viz.width / 2, gT + gH / 2, viz.colors.text, 14, 'center');
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A capacitor charged to 10 V discharges through \\(R = 500\\,\\Omega\\). After 3 ms, the voltage is 3.68 V. Find \\(C\\).',
                    hint: '\\(V = V_0 e^{-t/RC}\\). If \\(V/V_0 = 0.368 = e^{-1}\\), then \\(t = \\tau = RC\\).',
                    solution: '\\(3.68/10 = 0.368 = e^{-1}\\), so \\(t = \\tau = RC = 3\\,\\text{ms}\\). Thus \\(C = 3 \\times 10^{-3}/500 = 6\\,\\mu\\text{F}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: RC in Action
        // ============================================================
        {
            id: 'ch09-sec04',
            title: 'RC in Action',
            content: `<h2>9.4 RC Circuits in Action</h2>

<div class="env-block intuition">
    <div class="env-title">Stored Energy, Released on Demand</div>
    <div class="env-body">
        <p>The magic of RC circuits lies in the asymmetry: you can charge slowly (large \\(R\\), long \\(\\tau\\)) and discharge quickly (small \\(R\\), short \\(\\tau\\)), or vice versa. This simple principle underlies camera flashes, defibrillators, timing circuits, and signal filtering.</p>
    </div>
</div>

<h3>Camera Flash</h3>

<p>A camera flash capacitor charges slowly from a small battery through a large resistance (\\(\\tau_{\\text{charge}} \\sim 5\\) s), storing energy \\(U = \\frac{1}{2}CV^2\\). When the shutter fires, the capacitor discharges through the flash tube (very low resistance, \\(\\tau_{\\text{discharge}} \\sim 1\\) ms), releasing all that energy in a brilliant burst.</p>

<div class="env-block example">
    <div class="env-title">Example 9.4 &mdash; Camera Flash Timing</div>
    <div class="env-body">
        <p>Charge: \\(R_{\\text{charge}} = 10\\,\\text{k}\\Omega\\), \\(C = 200\\,\\mu\\text{F}\\), so \\(\\tau_{\\text{charge}} = 2\\,\\text{s}\\). Full charge takes ~10 s.</p>
        <p>Discharge: \\(R_{\\text{flash}} = 2\\,\\Omega\\), so \\(\\tau_{\\text{discharge}} = 0.4\\,\\text{ms}\\). Flash duration ~2 ms.</p>
        <p>Ratio of time scales: \\(10\\,\\text{s} / 2\\,\\text{ms} = 5000\\times\\). Slow accumulation, fast release.</p>
    </div>
</div>

<h3>Defibrillator</h3>

<p>A cardiac defibrillator uses the same principle at much higher energy. A large capacitor (\\(C \\sim 30{-}70\\,\\mu\\text{F}\\)) is charged to 1000-5000 V, storing 100-360 J. This is discharged through the patient's chest in about 10 ms, resetting the heart's rhythm.</p>

<h3>Timing Circuits</h3>

<p>The predictable exponential of an RC circuit makes it ideal for timing. The classic 555 timer IC uses RC charging/discharging to generate precise time delays and oscillations. The capacitor voltage crossing a threshold triggers an output change.</p>

<div class="viz-placeholder" data-viz="viz-camera-flash"></div>

<div class="env-block remark">
    <div class="env-title">Key Engineering Principle</div>
    <div class="env-body">
        <p>Changing \\(R\\) between charge and discharge phases lets you <strong>decouple the power source from the load</strong>. A weak battery (low power, long time) can produce an intense flash (high power, short time). Total energy is conserved; only the <em>rate</em> of delivery changes.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-camera-flash',
                    title: 'Camera Flash: Slow Charge, Fast Discharge',
                    description: 'Watch the capacitor charge slowly (seconds), then press Flash to release all energy in milliseconds. The flash intensity reflects the stored energy.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 200 });
                        var ctx = viz.ctx;

                        var Vmax = 300; // max voltage
                        var Rcharge = 50; // high R for slow charge
                        var Cval = 2;
                        var Rflash = 0.5; // low R for fast discharge

                        var mode = 'idle'; // idle, charging, ready, flashing, flash_done
                        var Vc = 0;
                        var t = 0;
                        var flashAlpha = 0;
                        var flashTime = 0;
                        var chargeHistory = [];

                        VizEngine.createButton(controls, 'Charge', function() {
                            if (mode === 'idle' || mode === 'flash_done') {
                                mode = 'charging'; t = 0; Vc = 0; chargeHistory = [];
                            }
                        });
                        VizEngine.createButton(controls, 'FLASH!', function() {
                            if (mode === 'ready' || mode === 'charging') {
                                mode = 'flashing'; flashTime = 0; flashAlpha = 1;
                            }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            mode = 'idle'; Vc = 0; t = 0; flashAlpha = 0; chargeHistory = [];
                        });

                        // Spark particles for flash
                        var flashParticles = [];

                        function draw(timestamp) {
                            var dt = 0.016;
                            var tauCharge = Rcharge * Cval;
                            var tauFlash = Rflash * Cval;

                            if (mode === 'charging') {
                                t += dt * 8;
                                Vc = Vmax * (1 - Math.exp(-t / tauCharge));
                                chargeHistory.push({ t: t, Vc: Vc });
                                if (chargeHistory.length > 400) chargeHistory.shift();
                                if (Vc > Vmax * 0.99) { mode = 'ready'; }
                            } else if (mode === 'flashing') {
                                flashTime += dt * 200; // fast time for discharge
                                var V0 = Vc;
                                Vc = V0 * Math.exp(-(dt * 200) / tauFlash);
                                flashAlpha = VizEngine.clamp(flashAlpha - dt * 2, 0, 1);

                                // Spawn flash particles
                                if (Vc > 1) {
                                    for (var s = 0; s < 3; s++) {
                                        var angle = Math.random() * Math.PI * 2;
                                        var spd = 100 + Math.random() * 300;
                                        flashParticles.push({
                                            x: viz.width / 2, y: 100,
                                            vx: Math.cos(angle) * spd,
                                            vy: Math.sin(angle) * spd,
                                            life: 0.3 + Math.random() * 0.5,
                                            size: 1 + Math.random() * 4
                                        });
                                    }
                                }

                                if (Vc < 0.5) { mode = 'flash_done'; Vc = 0; }
                            }

                            // Update flash particles
                            for (var fi = flashParticles.length - 1; fi >= 0; fi--) {
                                var fp = flashParticles[fi];
                                fp.x += fp.vx * dt;
                                fp.y += fp.vy * dt;
                                fp.life -= dt;
                                if (fp.life <= 0) flashParticles.splice(fi, 1);
                            }
                            if (flashParticles.length > 300) flashParticles.splice(0, flashParticles.length - 300);

                            viz.clear();

                            // Flash overlay
                            if (flashAlpha > 0.01) {
                                ctx.fillStyle = 'rgba(255,255,240,' + (flashAlpha * 0.7) + ')';
                                ctx.fillRect(0, 0, viz.width, viz.height);
                            }

                            // Flash bulb
                            var bulbX = viz.width / 2, bulbY = 80, bulbR = 35;
                            if (mode === 'flashing' && Vc > 1) {
                                // Intense glow
                                var glowIntensity = VizEngine.clamp(Vc / Vmax, 0, 1);
                                var grad = ctx.createRadialGradient(bulbX, bulbY, 0, bulbX, bulbY, bulbR * (2 + glowIntensity * 4));
                                grad.addColorStop(0, 'rgba(255,255,240,' + glowIntensity + ')');
                                grad.addColorStop(0.3, 'rgba(255,255,200,' + (glowIntensity * 0.5) + ')');
                                grad.addColorStop(1, 'rgba(255,255,180,0)');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(bulbX, bulbY, bulbR * 6, 0, Math.PI * 2); ctx.fill();
                            }

                            // Bulb body
                            ctx.save();
                            ctx.fillStyle = mode === 'flashing' && Vc > 1 ? '#fffee0' : '#2a2a50';
                            ctx.shadowColor = mode === 'flashing' && Vc > 1 ? '#fffee0' : 'transparent';
                            ctx.shadowBlur = mode === 'flashing' ? 30 : 0;
                            ctx.beginPath(); ctx.arc(bulbX, bulbY, bulbR, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(bulbX, bulbY, bulbR, 0, Math.PI * 2); ctx.stroke();
                            ctx.restore();

                            // Bulb base
                            ctx.fillStyle = '#555';
                            ctx.fillRect(bulbX - 15, bulbY + bulbR, 30, 15);

                            viz.screenText('FLASH', bulbX, bulbY, mode === 'flashing' ? '#000' : viz.colors.text, 12, 'center');

                            // Flash particles
                            for (var fj = 0; fj < flashParticles.length; fj++) {
                                var fpp = flashParticles[fj];
                                ctx.fillStyle = 'rgba(255,255,200,' + fpp.life + ')';
                                ctx.beginPath(); ctx.arc(fpp.x, fpp.y, fpp.size, 0, Math.PI * 2); ctx.fill();
                            }

                            // Capacitor gauge
                            var gaugeX = 40, gaugeY = 60, gaugeW = 40, gaugeH = 160;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(gaugeX, gaugeY, gaugeW, gaugeH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(gaugeX, gaugeY, gaugeW, gaugeH);

                            var fillFrac = VizEngine.clamp(Vc / Vmax, 0, 1);
                            var fillH2 = fillFrac * gaugeH;
                            if (fillH2 > 0) {
                                var capGrad = ctx.createLinearGradient(0, gaugeY + gaugeH, 0, gaugeY + gaugeH - fillH2);
                                capGrad.addColorStop(0, viz.colors.blue);
                                capGrad.addColorStop(0.5, viz.colors.cyan);
                                capGrad.addColorStop(1, viz.colors.yellow);
                                ctx.fillStyle = capGrad;
                                ctx.fillRect(gaugeX + 2, gaugeY + gaugeH - fillH2, gaugeW - 4, fillH2);

                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 10;
                                ctx.fillRect(gaugeX + 2, gaugeY + gaugeH - fillH2, gaugeW - 4, 3);
                                ctx.restore();
                            }

                            viz.screenText('Capacitor', gaugeX + gaugeW / 2, gaugeY - 10, viz.colors.blue, 10, 'center');
                            viz.screenText(Vc.toFixed(0) + ' V', gaugeX + gaugeW / 2, gaugeY + gaugeH + 16, viz.colors.cyan, 12, 'center');

                            // Scale marks
                            for (var sm = 0; sm <= 4; sm++) {
                                var smY = gaugeY + gaugeH - (sm / 4) * gaugeH;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(gaugeX + gaugeW, smY); ctx.lineTo(gaugeX + gaugeW + 5, smY); ctx.stroke();
                                viz.screenText((sm / 4 * Vmax).toFixed(0), gaugeX + gaugeW + 8, smY, viz.colors.text, 8, 'left');
                            }

                            // Charge time graph (bottom)
                            var cgL = 120, cgR = viz.width - 20, cgT = 250, cgB = viz.height - 20;
                            var cgW = cgR - cgL, cgH = cgB - cgT;

                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(cgL, cgT, cgW, cgH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(cgL, cgT, cgW, cgH);

                            viz.screenText('V\u209c vs time', cgL + cgW / 2, cgT - 6, viz.colors.blue, 11, 'center');

                            // Plot charging history
                            if (chargeHistory.length > 1) {
                                var maxHT = chargeHistory[chargeHistory.length - 1].t * 1.1;
                                if (maxHT < tauCharge) maxHT = tauCharge * 5;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var ch = 0; ch < chargeHistory.length; ch++) {
                                    var chx = cgL + (chargeHistory[ch].t / maxHT) * cgW;
                                    var chy = cgB - (chargeHistory[ch].Vc / Vmax) * cgH;
                                    if (ch === 0) ctx.moveTo(chx, chy);
                                    else ctx.lineTo(chx, chy);
                                }
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = 4;
                                ctx.stroke();
                                ctx.restore();
                            }

                            // Energy display
                            var energy = 0.5 * Cval * Vc * Vc;
                            var maxEnergy = 0.5 * Cval * Vmax * Vmax;

                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, viz.height - 45, 250, 38);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, viz.height - 45, 250, 38);

                            viz.screenText('Energy: ' + energy.toFixed(0) + ' / ' + maxEnergy.toFixed(0) + ' J', 20, viz.height - 32, viz.colors.purple, 12, 'left');
                            viz.screenText('\u03C4_charge=' + tauCharge.toFixed(1) + 's  \u03C4_flash=' + (tauFlash * 1000).toFixed(1) + 'ms', 20, viz.height - 16, viz.colors.text, 10, 'left');

                            // Status
                            var statusText = mode === 'idle' ? 'Press "Charge"' :
                                mode === 'charging' ? 'Charging...' :
                                mode === 'ready' ? 'READY - Press FLASH!' :
                                mode === 'flashing' ? 'FLASH!' :
                                'Done - Press "Charge" again';
                            var statusColor = mode === 'ready' ? viz.colors.green :
                                mode === 'flashing' ? viz.colors.yellow : viz.colors.text;

                            ctx.save();
                            if (mode === 'ready') { ctx.shadowColor = viz.colors.green; ctx.shadowBlur = 10; }
                            viz.screenText(statusText, viz.width / 2, 240, statusColor, 15, 'center');
                            ctx.restore();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A defibrillator capacitor (\\(C = 50\\,\\mu\\text{F}\\)) is charged to 2000 V. (a) How much energy is stored? (b) If discharged through \\(50\\,\\Omega\\), what is \\(\\tau\\)?',
                    hint: '\\(U = \\frac{1}{2}CV^2\\), \\(\\tau = RC\\).',
                    solution: '(a) \\(U = \\frac{1}{2}(50 \\times 10^{-6})(2000)^2 = 100\\,\\text{J}\\). (b) \\(\\tau = 50 \\times 50 \\times 10^{-6} = 2.5\\,\\text{ms}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 5: AC and RC (Preview)
        // ============================================================
        {
            id: 'ch09-sec05',
            title: 'AC and RC (Preview)',
            content: `<h2>9.5 RC Circuits with Alternating Current (Preview)</h2>

<div class="env-block intuition">
    <div class="env-title">Beyond DC</div>
    <div class="env-body">
        <p>So far we have studied RC circuits with DC (constant voltage) sources. But what happens when the source is an AC signal, \\(V(t) = V_0 \\sin(\\omega t)\\)? The answer reveals that the RC circuit acts as a <strong>frequency filter</strong>, a concept central to audio electronics, radio, and signal processing. This section is a preview of ideas developed fully in later chapters on AC circuits.</p>
    </div>
</div>

<h3>Capacitive Reactance</h3>

<p>A capacitor's opposition to AC current is called <strong>capacitive reactance</strong>:</p>

<div class="env-block definition">
    <div class="env-title">Capacitive Reactance</div>
    <div class="env-body">
        \\[X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}\\]
        <p>Unit: ohms (\\(\\Omega\\)). Unlike resistance, reactance depends on frequency. At high frequency, \\(X_C\\) is small (the capacitor "lets AC through"). At low frequency, \\(X_C\\) is large (the capacitor blocks slowly changing signals).</p>
    </div>
</div>

<h3>The RC Low-Pass Filter</h3>

<p>If we take the output voltage across the capacitor, high-frequency signals are attenuated while low-frequency signals pass through. The cutoff frequency is:</p>

\\[f_c = \\frac{1}{2\\pi RC} = \\frac{1}{2\\pi \\tau}\\]

<p>At \\(f = f_c\\), the output amplitude is \\(V_0/\\sqrt{2} \\approx 0.707 V_0\\) (the "-3 dB point").</p>

<div class="env-block theorem">
    <div class="env-title">RC Low-Pass Filter Response</div>
    <div class="env-body">
        <p>For an input \\(V_{\\text{in}} = V_0 \\sin(\\omega t)\\), the output across the capacitor has amplitude:</p>
        \\[\\frac{V_{\\text{out}}}{V_{\\text{in}}} = \\frac{1}{\\sqrt{1 + (\\omega RC)^2}} = \\frac{1}{\\sqrt{1 + (f/f_c)^2}}\\]
        <p>and a phase lag \\(\\phi = -\\arctan(\\omega RC)\\).</p>
    </div>
</div>

<h3>The RC High-Pass Filter</h3>

<p>Taking the output across the <em>resistor</em> instead gives a high-pass filter: low frequencies are blocked, high frequencies pass. This is used to block DC offset in audio signals, for example.</p>

\\[\\frac{V_{\\text{out}}}{V_{\\text{in}}} = \\frac{\\omega RC}{\\sqrt{1 + (\\omega RC)^2}} = \\frac{f/f_c}{\\sqrt{1 + (f/f_c)^2}}\\]

<div class="viz-placeholder" data-viz="viz-rc-filter"></div>

<div class="env-block remark">
    <div class="env-title">Why This Matters</div>
    <div class="env-body">
        <p>Every audio equalizer, radio tuner, power supply smoothing circuit, and anti-aliasing filter uses the principles of frequency-dependent impedance. The humble RC circuit is the simplest building block of analog signal processing. You will study this in depth in the AC circuits chapter.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-rc-filter',
                    title: 'RC Filter: Frequency Response',
                    description: 'Sweep the input frequency and watch the output amplitude change. The low-pass filter attenuates high frequencies; the cutoff frequency depends on RC.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 200 });
                        var ctx = viz.ctx;

                        var R = 1000; // 1 kohm
                        var C = 0.001; // 1 mF => fc ~ 159 Hz
                        var freq = 50;
                        var V0 = 5;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'f (Hz)', 1, 500, freq, 1, function(v) { freq = v; });
                        VizEngine.createSlider(controls, 'R (\u03A9)', 100, 5000, R, 100, function(v) { R = v; });
                        VizEngine.createSlider(controls, 'C (mF)', 0.1, 5, C * 1000, 0.1, function(v) { C = v / 1000; });

                        function draw(timestamp) {
                            phase = (timestamp || 0) * 0.001;

                            var omega = 2 * Math.PI * freq;
                            var fc = 1 / (2 * Math.PI * R * C);
                            var tau = R * C;
                            var gain = 1 / Math.sqrt(1 + Math.pow(omega * tau, 2));
                            var phaseLag = -Math.atan(omega * tau);

                            viz.clear();

                            // --- Waveform display (top half) ---
                            var wL = 30, wR = viz.width - 20, wT = 20, wB = 145;
                            var wW = wR - wL, wH = (wB - wT) / 2;
                            var wMid = wT + wH;

                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(wL, wT, wW, wB - wT);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(wL, wT, wW, wB - wT);

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(wL, wMid); ctx.lineTo(wR, wMid); ctx.stroke();

                            // Input signal (full V0)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var px = 0; px <= wW; px++) {
                                var tt = (px / wW) * 4 / Math.max(freq, 1); // show ~4 periods
                                var vin = V0 * Math.sin(2 * Math.PI * freq * tt + phase * freq * 0.01);
                                var py = wMid - (vin / V0) * wH * 0.9;
                                if (px === 0) ctx.moveTo(wL + px, py);
                                else ctx.lineTo(wL + px, py);
                            }
                            ctx.stroke();

                            // Output signal (attenuated, phase shifted)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var px2 = 0; px2 <= wW; px2++) {
                                var tt2 = (px2 / wW) * 4 / Math.max(freq, 1);
                                var vout = V0 * gain * Math.sin(2 * Math.PI * freq * tt2 + phase * freq * 0.01 + phaseLag);
                                var py2 = wMid - (vout / V0) * wH * 0.9;
                                if (px2 === 0) ctx.moveTo(wL + px2, py2);
                                else ctx.lineTo(wL + px2, py2);
                            }
                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 4;
                            ctx.stroke();
                            ctx.restore();

                            viz.screenText('V_in', wL + 30, wT + 12, viz.colors.blue, 11, 'left');
                            viz.screenText('V_out (capacitor)', wL + 80, wT + 12, viz.colors.orange, 11, 'left');

                            // --- Bode plot (bottom half) ---
                            var bL = 50, bR = viz.width - 20, bT = 165, bB = 290;
                            var bW = bR - bL, bH = bB - bT;

                            ctx.fillStyle = '#0a0a1c';
                            ctx.fillRect(bL, bT, bW, bH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(bL, bT, bW, bH);

                            viz.screenText('Frequency Response (Gain)', bL + bW / 2, bT - 6, viz.colors.white, 12, 'center');

                            // Log frequency axis: 1 Hz to 1000 Hz
                            var fMin = 1, fMax = 1000;
                            var logMin = Math.log10(fMin), logMax = Math.log10(fMax);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var decades = [1, 10, 100, 1000];
                            for (var di = 0; di < decades.length; di++) {
                                var dx = bL + ((Math.log10(decades[di]) - logMin) / (logMax - logMin)) * bW;
                                ctx.beginPath(); ctx.moveTo(dx, bT); ctx.lineTo(dx, bB); ctx.stroke();
                                viz.screenText(decades[di] + '', dx, bB + 12, viz.colors.text, 9, 'center');
                            }

                            // Gain axis: 0 to 1
                            for (var gi = 0; gi <= 4; gi++) {
                                var gy = bB - (gi / 4) * bH;
                                ctx.beginPath(); ctx.moveTo(bL, gy); ctx.lineTo(bR, gy); ctx.stroke();
                                viz.screenText((gi / 4).toFixed(2), bL - 8, gy, viz.colors.text, 8, 'right');
                            }

                            viz.screenText('f (Hz)', bR + 5, bB, viz.colors.text, 9, 'left');
                            viz.screenText('Gain', bL - 5, bT - 5, viz.colors.text, 9, 'right');

                            // Bode curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var bpx = 0; bpx <= bW; bpx++) {
                                var logf = logMin + (bpx / bW) * (logMax - logMin);
                                var ff = Math.pow(10, logf);
                                var g = 1 / Math.sqrt(1 + Math.pow(ff / fc, 2));
                                var bpy = bB - g * bH;
                                if (bpx === 0) ctx.moveTo(bL + bpx, bpy);
                                else ctx.lineTo(bL + bpx, bpy);
                            }
                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 4;
                            ctx.stroke();
                            ctx.restore();

                            // Cutoff frequency marker
                            var fcX = bL + ((Math.log10(fc) - logMin) / (logMax - logMin)) * bW;
                            var fcY = bB - (1 / Math.sqrt(2)) * bH;
                            if (fcX > bL && fcX < bR) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(fcX, bT); ctx.lineTo(fcX, bB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bL, fcY); ctx.lineTo(bR, fcY); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('fc=' + fc.toFixed(0) + 'Hz', fcX, bT - 5, viz.colors.yellow, 9, 'center');
                                viz.screenText('0.707', bL - 8, fcY, viz.colors.yellow, 8, 'right');

                                // Dot at cutoff
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(fcX, fcY, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // Current frequency marker on Bode plot
                            var curFX = bL + ((Math.log10(Math.max(freq, 1)) - logMin) / (logMax - logMin)) * bW;
                            var curFY = bB - gain * bH;
                            if (curFX >= bL && curFX <= bR) {
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.arc(curFX, curFY, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                            }

                            // Info panel
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, viz.height - 50, viz.width - 20, 42);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, viz.height - 50, viz.width - 20, 42);

                            viz.screenText('f = ' + freq.toFixed(0) + ' Hz', 20, viz.height - 36, viz.colors.cyan, 12, 'left');
                            viz.screenText('fc = 1/(2\u03C0RC) = ' + fc.toFixed(1) + ' Hz', 20, viz.height - 18, viz.colors.yellow, 12, 'left');
                            viz.screenText('Gain = ' + gain.toFixed(3), viz.width / 2, viz.height - 36, viz.colors.orange, 12, 'left');
                            viz.screenText('Phase = ' + (phaseLag * 180 / Math.PI).toFixed(1) + '\u00B0', viz.width / 2, viz.height - 18, viz.colors.text, 12, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'An RC low-pass filter has \\(R = 10\\,\\text{k}\\Omega\\) and \\(C = 10\\,\\text{nF}\\). Find the cutoff frequency. At what frequency is the output reduced to half the input amplitude?',
                    hint: '\\(f_c = 1/(2\\pi RC)\\). For half amplitude, solve \\(1/\\sqrt{1+(f/f_c)^2} = 0.5\\).',
                    solution: '\\(f_c = 1/(2\\pi \\times 10^4 \\times 10^{-8}) \\approx 1592\\,\\text{Hz}\\). For \\(|H| = 0.5\\): \\(1 + (f/f_c)^2 = 4\\), so \\(f = f_c\\sqrt{3} \\approx 2757\\,\\text{Hz}\\).'
                },
                {
                    question: 'Why does a capacitor block DC but pass high-frequency AC?',
                    hint: 'Think about \\(X_C = 1/(\\omega C)\\) at \\(\\omega = 0\\) vs. large \\(\\omega\\).',
                    solution: 'At DC (\\(\\omega = 0\\)), \\(X_C = 1/(0 \\cdot C) = \\infty\\): the capacitor is an open circuit. As \\(\\omega \\to \\infty\\), \\(X_C \\to 0\\): the capacitor acts like a short circuit. So DC is completely blocked, while high-frequency AC passes through with minimal opposition.'
                }
            ]
        }
    ]
});
