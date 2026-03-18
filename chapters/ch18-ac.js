// === Chapter 18: Alternating Current ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch18',
        number: 18,
        title: 'Alternating Current',
        subtitle: 'The oscillating heartbeat of modern power',
        file: 'ch18-ac',

        sections: [
            // ============================================================
            // Section 1: Generating AC
            // ============================================================
            {
                id: 'generating-ac',
                title: 'Generating AC',
                content: `
<h2>A Spinning Coil Creates Alternating Current</h2>

<p>In Chapter 15 we learned Faraday's law: a changing magnetic flux through a loop induces an EMF. The most practical way to create a <em>continuously</em> changing flux is to <strong>spin a coil inside a magnetic field</strong>.</p>

<p>Consider a rectangular coil of \\(N\\) turns and area \\(A\\) rotating at angular velocity \\(\\omega\\) in a uniform field \\(B\\). At time \\(t\\), the angle between the field and the coil's normal is \\(\\theta = \\omega t\\), so the flux is:</p>

\\[\\Phi(t) = NBA\\cos(\\omega t)\\]

<p>By Faraday's law, the induced EMF is:</p>

\\[\\mathcal{E}(t) = -\\frac{d\\Phi}{dt} = NBA\\omega\\sin(\\omega t)\\]

<div class="env-block theorem">
<div class="env-title">AC generator EMF</div>
<div class="env-body">
\\[\\mathcal{E}(t) = \\mathcal{E}_0 \\sin(\\omega t)\\]
<p>where \\(\\mathcal{E}_0 = NBA\\omega\\) is the <strong>peak EMF</strong>. The voltage alternates sinusoidally between \\(+\\mathcal{E}_0\\) and \\(-\\mathcal{E}_0\\).</p>
</div>
</div>

<p>This is the fundamental principle behind every generator in every power plant on Earth, whether fuelled by coal, gas, nuclear fission, wind, or flowing water. The energy source spins a turbine, which spins a coil (or magnets around a coil), and out comes alternating current.</p>

<div class="env-block intuition">
<div class="env-title">Why sinusoidal?</div>
<div class="env-body">
<p>The sine function appears because the flux depends on \\(\\cos\\theta\\), and a uniformly spinning coil sweeps \\(\\theta\\) linearly in time. The EMF, being the time derivative of cosine, is sine. It is not a design choice; it is geometry.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ac-generator"></div>

<div class="env-block example">
<div class="env-title">Example: A simple generator</div>
<div class="env-body">
<p>A coil with \\(N=200\\) turns, area \\(A=0.05\\,\\text{m}^2\\), in a field \\(B=0.3\\,\\text{T}\\), spinning at 50 Hz (i.e. \\(\\omega = 2\\pi \\times 50 = 314\\,\\text{rad/s}\\)):</p>
\\[\\mathcal{E}_0 = NBA\\omega = 200 \\times 0.3 \\times 0.05 \\times 314 \\approx 942\\,\\text{V}\\]
<p>The peak voltage is about 942 V. In many countries, the mains frequency is 50 Hz; in the US and Japan (eastern grid) it is 60 Hz.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">AC vs the generator</div>
<div class="env-body">
<p>Real generators use stationary coils (the <em>stator</em>) and rotating magnets (the <em>rotor</em>) for practical reasons: it is easier to extract current from stationary windings than from spinning contacts. The physics is identical, only the reference frame changes.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-ac-generator',
                        title: 'AC Generator: Spinning Coil',
                        description: 'Watch a coil rotate between magnet poles. The EMF sinusoid is drawn in real-time on the right. Observe how coil orientation maps to voltage: maximum EMF when the coil is parallel to the field (flux changing fastest), zero when perpendicular (flux momentarily stationary).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var freq = 0.5; // Hz for visual speed
                            var peakEMF = 1.0;
                            var t = 0;
                            var emfHistory = [];
                            var maxHistory = 300;

                            VizEngine.createSlider(controls, 'Spin speed', 0.2, 2.0, 0.5, 0.1, function (v) {
                                freq = v;
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                t = 0;
                                emfHistory = [];
                            });

                            // Layout: left half = generator, right half = EMF graph
                            var genCx = w * 0.28, genCy = h * 0.5;
                            var magnetW = 30, magnetH = h * 0.55;
                            var coilW = 80, coilH = 70;
                            var graphL = w * 0.52, graphR = w - 20;
                            var graphT = h * 0.15, graphB = h * 0.85;
                            var graphMidY = (graphT + graphB) / 2;
                            var graphW = graphR - graphL;
                            var graphH = (graphB - graphT) / 2;

                            function draw(ts) {
                                var dt = 1 / 60;
                                t += dt;
                                var omega = 2 * Math.PI * freq;
                                var angle = omega * t;
                                var emf = peakEMF * Math.sin(angle);

                                emfHistory.push(emf);
                                if (emfHistory.length > maxHistory) emfHistory.shift();

                                viz.clear();

                                // ---- GENERATOR SIDE ----

                                // Title
                                viz.screenText('Generator', genCx, 18, viz.colors.white, 13);

                                // Magnetic field arrows (horizontal, N to S)
                                var fieldY0 = genCy - magnetH * 0.4;
                                var fieldY1 = genCy + magnetH * 0.4;
                                var nFieldLines = 7;
                                ctx.globalAlpha = 0.25;
                                for (var fi = 0; fi < nFieldLines; fi++) {
                                    var fy = fieldY0 + (fieldY1 - fieldY0) * fi / (nFieldLines - 1);
                                    var fxL = genCx - coilW * 0.85;
                                    var fxR = genCx + coilW * 0.85;
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(fxL, fy);
                                    ctx.lineTo(fxR, fy);
                                    ctx.stroke();
                                    // Arrowhead
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.moveTo(fxR, fy);
                                    ctx.lineTo(fxR - 6, fy - 3);
                                    ctx.lineTo(fxR - 6, fy + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                                ctx.globalAlpha = 1;

                                // Left magnet (N pole, red)
                                var mLx = genCx - coilW - 15;
                                ctx.fillStyle = '#c0392b';
                                ctx.fillRect(mLx, genCy - magnetH / 2, magnetW, magnetH);
                                ctx.strokeStyle = '#e74c3c';
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(mLx, genCy - magnetH / 2, magnetW, magnetH);
                                ctx.fillStyle = '#fff';
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('N', mLx + magnetW / 2, genCy);

                                // Right magnet (S pole, blue)
                                var mRx = genCx + coilW - 15;
                                ctx.fillStyle = '#2c3e80';
                                ctx.fillRect(mRx, genCy - magnetH / 2, magnetW, magnetH);
                                ctx.strokeStyle = '#3498db';
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(mRx, genCy - magnetH / 2, magnetW, magnetH);
                                ctx.fillStyle = '#fff';
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.fillText('S', mRx + magnetW / 2, genCy);

                                // Rotating coil (perspective projection)
                                var cosA = Math.cos(angle);
                                var sinA = Math.sin(angle);
                                var projW = coilW * cosA; // projected half-width
                                var halfH = coilH * 0.5;

                                // Coil color based on EMF
                                var emfNorm = Math.abs(emf) / peakEMF;
                                var coilR = Math.round(240 * emfNorm + 100 * (1 - emfNorm));
                                var coilG = Math.round(136 * emfNorm + 100 * (1 - emfNorm));
                                var coilB2 = Math.round(62 * emfNorm + 180 * (1 - emfNorm));
                                var coilColor = 'rgb(' + coilR + ',' + coilG + ',' + coilB2 + ')';

                                // Glow behind coil
                                ctx.save();
                                ctx.shadowColor = coilColor;
                                ctx.shadowBlur = 12 * emfNorm;
                                ctx.strokeStyle = coilColor;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(genCx - projW, genCy - halfH);
                                ctx.lineTo(genCx + projW, genCy - halfH);
                                ctx.lineTo(genCx + projW, genCy + halfH);
                                ctx.lineTo(genCx - projW, genCy + halfH);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.restore();

                                // Coil fill (semi-transparent)
                                ctx.fillStyle = coilColor + '33';
                                ctx.beginPath();
                                ctx.moveTo(genCx - projW, genCy - halfH);
                                ctx.lineTo(genCx + projW, genCy - halfH);
                                ctx.lineTo(genCx + projW, genCy + halfH);
                                ctx.lineTo(genCx - projW, genCy + halfH);
                                ctx.closePath();
                                ctx.fill();

                                // Rotation axis (vertical line through center)
                                ctx.strokeStyle = viz.colors.text + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(genCx, genCy - halfH - 20);
                                ctx.lineTo(genCx, genCy + halfH + 20);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Normal vector arrow
                                var normLen = 40;
                                var nx = genCx + normLen * cosA;
                                var ny = genCy;
                                ctx.save();
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.shadowColor = viz.colors.green;
                                ctx.shadowBlur = 4;
                                ctx.beginPath();
                                ctx.moveTo(genCx, genCy);
                                ctx.lineTo(nx, ny);
                                ctx.stroke();
                                // Arrowhead
                                var aAngle = Math.atan2(0, cosA);
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(nx, ny);
                                ctx.lineTo(nx - 8 * Math.cos(aAngle - 0.4), ny - 8 * Math.sin(aAngle - 0.4));
                                ctx.lineTo(nx - 8 * Math.cos(aAngle + 0.4), ny - 8 * Math.sin(aAngle + 0.4));
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('n\u0302', nx + 12 * (cosA >= 0 ? 1 : -1), ny - 8, viz.colors.green, 11);

                                // Angle indicator
                                viz.screenText('\u03B8 = ' + ((angle * 180 / Math.PI) % 360).toFixed(0) + '\u00B0', genCx, genCy + halfH + 35, viz.colors.text, 10);
                                viz.screenText('B \u2192', genCx + coilW + 25, genCy + magnetH / 2 + 12, viz.colors.blue, 10);

                                // ---- EMF GRAPH ----

                                // Graph background
                                ctx.fillStyle = '#0a0a18';
                                ctx.fillRect(graphL - 5, graphT - 10, graphW + 25, graphB - graphT + 20);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(graphL - 5, graphT - 10, graphW + 25, graphB - graphT + 20);

                                // Graph title
                                viz.screenText('\u03B5(t)', graphL + graphW / 2, graphT - 2, viz.colors.orange, 11);

                                // Zero line
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphMidY);
                                ctx.lineTo(graphR, graphMidY);
                                ctx.stroke();

                                // Peak lines (dashed)
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 0.5;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphMidY - graphH);
                                ctx.lineTo(graphR, graphMidY - graphH);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphMidY + graphH);
                                ctx.lineTo(graphR, graphMidY + graphH);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Labels
                                viz.screenText('+\u03B5\u2080', graphL - 12, graphMidY - graphH, viz.colors.orange, 9, 'right');
                                viz.screenText('\u2212\u03B5\u2080', graphL - 12, graphMidY + graphH, viz.colors.orange, 9, 'right');
                                viz.screenText('0', graphL - 8, graphMidY, viz.colors.text, 9, 'right');
                                viz.screenText('t', graphR + 8, graphMidY, viz.colors.text, 9, 'left');

                                // Draw EMF waveform with glow
                                if (emfHistory.length > 1) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 8;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    for (var i = 0; i < emfHistory.length; i++) {
                                        var px = graphL + (i / maxHistory) * graphW;
                                        var py = graphMidY - emfHistory[i] * graphH;
                                        if (i === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                    ctx.restore();
                                }

                                // Current value marker
                                if (emfHistory.length > 0) {
                                    var lastX = graphL + ((emfHistory.length - 1) / maxHistory) * graphW;
                                    var lastY = graphMidY - emfHistory[emfHistory.length - 1] * graphH;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Dashed line connecting coil to graph point
                                    ctx.strokeStyle = viz.colors.orange + '44';
                                    ctx.lineWidth = 0.8;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(genCx + projW + 5, genCy);
                                    ctx.lineTo(lastX, lastY);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Period marker (when enough data)
                                if (emfHistory.length > 60) {
                                    var periodPx = (1 / freq) * (maxHistory / (maxHistory * dt)) * (graphW / maxHistory) / dt;
                                    if (periodPx > 30 && periodPx < graphW * 0.9) {
                                        var periodStartX = graphL;
                                        var periodEndX = graphL + periodPx;
                                        if (periodEndX > graphR) periodEndX = graphR;
                                        ctx.strokeStyle = viz.colors.cyan + '88';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(periodStartX, graphB + 6);
                                        ctx.lineTo(periodEndX, graphB + 6);
                                        ctx.stroke();
                                        // Arrows
                                        ctx.fillStyle = viz.colors.cyan + '88';
                                        ctx.beginPath();
                                        ctx.moveTo(periodStartX, graphB + 6);
                                        ctx.lineTo(periodStartX + 5, graphB + 3);
                                        ctx.lineTo(periodStartX + 5, graphB + 9);
                                        ctx.closePath();
                                        ctx.fill();
                                        ctx.beginPath();
                                        ctx.moveTo(periodEndX, graphB + 6);
                                        ctx.lineTo(periodEndX - 5, graphB + 3);
                                        ctx.lineTo(periodEndX - 5, graphB + 9);
                                        ctx.closePath();
                                        ctx.fill();
                                        viz.screenText('T = 1/f', (periodStartX + periodEndX) / 2, graphB + 16, viz.colors.cyan, 9);
                                    }
                                }

                                // Info text
                                viz.screenText('f = ' + freq.toFixed(1) + ' Hz,  \u03C9 = ' + (2 * Math.PI * freq).toFixed(1) + ' rad/s', w / 2, h - 10, viz.colors.text, 9);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A generator coil has 100 turns, area \\(0.02\\,\\text{m}^2\\), in a \\(0.5\\,\\text{T}\\) field, spinning at 60 Hz. What is the peak EMF?',
                        hint: 'Use \\(\\mathcal{E}_0 = NBA\\omega\\) with \\(\\omega = 2\\pi f\\).',
                        solution: '\\(\\mathcal{E}_0 = 100 \\times 0.5 \\times 0.02 \\times 2\\pi(60) = 1 \\times 120\\pi \\approx 377\\,\\text{V}\\).'
                    },
                    {
                        question: 'At what angle \\(\\theta\\) is the induced EMF at its maximum? At what angle is it zero?',
                        hint: 'Think about when \\(\\sin(\\omega t)\\) is at its peak and when it crosses zero.',
                        solution: 'EMF is maximum when \\(\\theta = 90^\\circ\\) or \\(270^\\circ\\) (coil plane parallel to \\(\\mathbf{B}\\), flux changing fastest). EMF is zero when \\(\\theta = 0^\\circ\\) or \\(180^\\circ\\) (coil plane perpendicular to \\(\\mathbf{B}\\), flux at a maximum or minimum, momentarily not changing).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Sinusoidal Voltage and Current
            // ============================================================
            {
                id: 'sinusoidal-v-i',
                title: 'Sinusoidal V and I',
                content: `
<h2>The Language of AC: Amplitude, Frequency, Phase</h2>

<p>An AC voltage source produces:</p>

\\[V(t) = V_0 \\sin(\\omega t + \\phi)\\]

<p>where:</p>
<ul>
    <li>\\(V_0\\) is the <strong>peak (amplitude)</strong> voltage</li>
    <li>\\(\\omega = 2\\pi f\\) is the <strong>angular frequency</strong></li>
    <li>\\(f\\) is the <strong>frequency</strong> in hertz (cycles per second)</li>
    <li>\\(T = 1/f\\) is the <strong>period</strong></li>
    <li>\\(\\phi\\) is a <strong>phase shift</strong></li>
</ul>

<p>If this voltage drives a purely resistive load \\(R\\), Ohm's law gives instantaneous current:</p>

\\[I(t) = \\frac{V(t)}{R} = \\frac{V_0}{R}\\sin(\\omega t + \\phi) = I_0 \\sin(\\omega t + \\phi)\\]

<div class="env-block definition">
<div class="env-title">In-phase</div>
<div class="env-body">
<p>For a purely resistive circuit, voltage and current are <strong>in phase</strong>: they peak at the same time and cross zero at the same time.</p>
</div>
</div>

<p>The <strong>instantaneous power</strong> delivered to the resistor is:</p>

\\[P(t) = V(t) \\cdot I(t) = V_0 I_0 \\sin^2(\\omega t)\\]

<p>Notice that \\(\\sin^2\\) is always non-negative. A resistor always dissipates energy, never returns it. But the power oscillates between 0 and \\(V_0 I_0\\), which makes the concept of "average power" essential.</p>

<div class="env-block remark">
<div class="env-title">Frequency around the world</div>
<div class="env-body">
<p>Most of Europe, Asia, Africa, and Australia use 50 Hz mains. The US, Canada, and parts of South America use 60 Hz. Japan is split: 50 Hz in the east (Tokyo), 60 Hz in the west (Osaka), a legacy of importing German and American generators in the 1890s.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Household outlet</div>
<div class="env-body">
<p>A "240 V" outlet in Australia actually means \\(V_{\\text{rms}} = 240\\,\\text{V}\\). The peak voltage is \\(V_0 = 240\\sqrt{2} \\approx 339\\,\\text{V}\\). The voltage swings between \\(+339\\) V and \\(-339\\) V, 50 times per second.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An AC source has \\(V_0 = 170\\,\\text{V}\\) and \\(f = 60\\,\\text{Hz}\\). Write the expression for \\(V(t)\\) and find the period.',
                        hint: 'Use \\(V(t) = V_0\\sin(2\\pi f t)\\).',
                        solution: '\\(V(t) = 170\\sin(120\\pi t)\\,\\text{V}\\). The period is \\(T = 1/60 \\approx 16.7\\,\\text{ms}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: RMS Values
            // ============================================================
            {
                id: 'rms-values',
                title: 'RMS Values',
                content: `
<h2>Root-Mean-Square: The "Effective" Value</h2>

<p>Since AC voltage and current oscillate, we need a single number that tells us the <em>equivalent DC value</em> for power purposes. A naive average will not work: the average of a full sine cycle is zero!</p>

<p>The solution is the <strong>root-mean-square (RMS)</strong>: square the signal (making it all positive), take the time average, then take the square root.</p>

<div class="env-block theorem">
<div class="env-title">RMS values</div>
<div class="env-body">
\\[V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707\\, V_0\\]
\\[I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} \\approx 0.707\\, I_0\\]
</div>
</div>

<h3>Derivation</h3>

<p>The mean of \\(\\sin^2(\\omega t)\\) over one full period is \\(1/2\\) (this can be verified using the identity \\(\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}\\)). Therefore:</p>

\\[V_{\\text{rms}} = \\sqrt{\\langle V^2 \\rangle} = \\sqrt{V_0^2 \\cdot \\tfrac{1}{2}} = \\frac{V_0}{\\sqrt{2}}\\]

<div class="env-block definition">
<div class="env-title">Average power</div>
<div class="env-body">
<p>The average power dissipated in a resistor is:</p>
\\[P_{\\text{avg}} = V_{\\text{rms}} \\cdot I_{\\text{rms}} = \\frac{V_0 I_0}{2} = I_{\\text{rms}}^2 R = \\frac{V_{\\text{rms}}^2}{R}\\]
<p>These are exactly the same formulas as DC, but with RMS values.</p>
</div>
</div>

<p>This is why RMS is so useful: you can use all the DC power formulas directly, just plug in RMS values.</p>

<div class="viz-placeholder" data-viz="viz-rms"></div>

<div class="env-block warning">
<div class="env-title">Rated values are RMS</div>
<div class="env-body">
<p>When a power outlet is rated "240 V" or "120 V," this is the RMS voltage. The actual peak voltage is \\(\\sqrt{2}\\) times higher. This matters for insulation ratings and safety.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Power to a heater</div>
<div class="env-body">
<p>A 2 k\\(\\Omega\\) heating element is connected to a 240 V (RMS) outlet:</p>
\\[P_{\\text{avg}} = \\frac{V_{\\text{rms}}^2}{R} = \\frac{240^2}{2000} = 28.8\\,\\text{W}\\]
<p>The peak power is \\(P_{\\text{peak}} = 2 P_{\\text{avg}} = 57.6\\,\\text{W}\\), but the time-averaged heating effect is 28.8 W.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-rms',
                        title: 'RMS Value Visualization',
                        description: 'The orange curve is \\(V(t) = V_0\\sin(\\omega t)\\). The green shaded area shows \\(V^2(t)\\), whose average (dashed green line) is \\(V_0^2/2\\). The cyan horizontal line is \\(V_{\\text{rms}} = V_0/\\sqrt{2}\\). A DC source at this voltage delivers the same average power.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 40, originX: 60, originY: undefined
                            });
                            viz.originY = viz.height * 0.5;
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var V0 = 2.5; // peak amplitude in math units
                            var showSquared = true;

                            VizEngine.createSlider(controls, 'V\u2080 (peak)', 0.5, 3.5, 2.5, 0.1, function (v) {
                                V0 = v;
                            });

                            var toggleBtn = VizEngine.createButton(controls, 'Toggle V\u00B2', function () {
                                showSquared = !showSquared;
                            });

                            function draw() {
                                viz.clear();
                                viz.drawGrid();

                                var xMin = -0.5;
                                var xMax = (w - viz.originX) / viz.scale + 0.2;
                                var scale = viz.scale;

                                // Draw V^2 shaded region (first, so it's behind)
                                if (showSquared) {
                                    var v2Scale = 1 / (V0 * V0) * V0; // normalize so peak of V^2 display = V0
                                    ctx.fillStyle = viz.colors.green + '22';
                                    ctx.beginPath();
                                    var started = false;
                                    var steps = 400;
                                    for (var i = 0; i <= steps; i++) {
                                        var x = xMin + (xMax - xMin) * i / steps;
                                        if (x < 0) continue;
                                        var v2 = V0 * V0 * Math.sin(2 * Math.PI * x) * Math.sin(2 * Math.PI * x);
                                        var yDisp = v2 * v2Scale;
                                        var sx = viz.originX + x * scale;
                                        var sy = viz.originY - yDisp * scale;
                                        if (!started) {
                                            ctx.moveTo(sx, viz.originY);
                                            ctx.lineTo(sx, sy);
                                            started = true;
                                        } else {
                                            ctx.lineTo(sx, sy);
                                        }
                                    }
                                    ctx.lineTo(viz.originX + xMax * scale, viz.originY);
                                    ctx.closePath();
                                    ctx.fill();

                                    // V^2 curve
                                    ctx.strokeStyle = viz.colors.green + '88';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    started = false;
                                    for (var j = 0; j <= steps; j++) {
                                        var x2 = xMin + (xMax - xMin) * j / steps;
                                        var v2b = V0 * V0 * Math.sin(2 * Math.PI * x2) * Math.sin(2 * Math.PI * x2);
                                        var yDisp2 = v2b * v2Scale;
                                        var sx2 = viz.originX + x2 * scale;
                                        var sy2 = viz.originY - yDisp2 * scale;
                                        if (!started) { ctx.moveTo(sx2, sy2); started = true; }
                                        else ctx.lineTo(sx2, sy2);
                                    }
                                    ctx.stroke();

                                    // Mean of V^2 line (at V0^2/2 * v2Scale = V0/2)
                                    var meanV2disp = V0 / 2;
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([6, 4]);
                                    var meanSy = viz.originY - meanV2disp * scale;
                                    ctx.beginPath();
                                    ctx.moveTo(viz.originX, meanSy);
                                    ctx.lineTo(viz.originX + xMax * scale, meanSy);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('\u27E8V\u00B2\u27E9 = V\u2080\u00B2/2', viz.originX + xMax * scale - 40, meanSy - 10, viz.colors.green, 10, 'right');
                                }

                                // Axes
                                viz.drawAxes('t (periods)', 'V');

                                // Sine wave
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 6;
                                viz.drawFunction(function (x) { return V0 * Math.sin(2 * Math.PI * x); }, xMin, xMax, viz.colors.orange, 2.5);
                                ctx.restore();

                                // Peak lines
                                ctx.strokeStyle = viz.colors.orange + '44';
                                ctx.lineWidth = 0.8;
                                ctx.setLineDash([4, 4]);
                                var peakSy = viz.originY - V0 * scale;
                                ctx.beginPath();
                                ctx.moveTo(0, peakSy);
                                ctx.lineTo(w, peakSy);
                                ctx.stroke();
                                var negPeakSy = viz.originY + V0 * scale;
                                ctx.beginPath();
                                ctx.moveTo(0, negPeakSy);
                                ctx.lineTo(w, negPeakSy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                viz.screenText('+V\u2080', 30, peakSy, viz.colors.orange, 10, 'right');
                                viz.screenText('\u2212V\u2080', 30, negPeakSy, viz.colors.orange, 10, 'right');

                                // RMS line
                                var vrms = V0 / Math.sqrt(2);
                                var rmsSy = viz.originY - vrms * scale;
                                ctx.save();
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 6;
                                ctx.beginPath();
                                ctx.moveTo(viz.originX, rmsSy);
                                ctx.lineTo(viz.originX + xMax * scale, rmsSy);
                                ctx.stroke();
                                ctx.restore();

                                viz.screenText('V_rms = V\u2080/\u221A2 = ' + vrms.toFixed(2), viz.originX + xMax * scale * 0.5, rmsSy - 12, viz.colors.cyan, 11);

                                // Negative RMS line
                                var negRmsSy = viz.originY + vrms * scale;
                                ctx.strokeStyle = viz.colors.cyan + '55';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(viz.originX, negRmsSy);
                                ctx.lineTo(viz.originX + xMax * scale, negRmsSy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Info
                                viz.screenText('V\u2080 = ' + V0.toFixed(1) + ',  V_rms = ' + vrms.toFixed(2) + ',  ratio = 1/\u221A2 \u2248 0.707', w / 2, h - 10, viz.colors.text, 10);
                            }

                            // Static viz, redraw on slider change
                            function redraw() { draw(); }
                            var intervalId = setInterval(redraw, 100);
                            draw();
                            return {
                                stopAnimation: function () { clearInterval(intervalId); }
                            };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'An AC source has peak voltage \\(V_0 = 311\\,\\text{V}\\). What is the RMS voltage? (This is approximately US mains.)',
                        hint: 'Divide by \\(\\sqrt{2}\\).',
                        solution: '\\(V_{\\text{rms}} = 311/\\sqrt{2} \\approx 220\\,\\text{V}\\). (The actual US standard is 120 V RMS, with \\(V_0 \\approx 170\\,\\text{V}\\).)'
                    },
                    {
                        question: 'A 100 W light bulb is designed for 240 V RMS. What is the resistance, and what peak current flows through it?',
                        hint: 'Use \\(P = V_{\\text{rms}}^2/R\\), then \\(I_0 = V_0/R\\).',
                        solution: '\\(R = V_{\\text{rms}}^2/P = 240^2/100 = 576\\,\\Omega\\). Peak current: \\(I_0 = V_0/R = 240\\sqrt{2}/576 \\approx 0.59\\,\\text{A}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Transformers in Power Transmission
            // ============================================================
            {
                id: 'transformers',
                title: 'Transformers',
                content: `
<h2>Transformers: Changing Voltage</h2>

<p>A <strong>transformer</strong> consists of two coils (primary and secondary) wound around a shared iron core. When AC flows through the primary coil, its changing magnetic field is guided through the core to the secondary coil, inducing an EMF there.</p>

<div class="env-block theorem">
<div class="env-title">Transformer equation</div>
<div class="env-body">
\\[\\frac{V_s}{V_p} = \\frac{N_s}{N_p}\\]
<p>where \\(V_p, V_s\\) are the primary and secondary voltages, and \\(N_p, N_s\\) are the number of turns. For an ideal (lossless) transformer, power is conserved:</p>
\\[V_p I_p = V_s I_s\\]
</div>
</div>

<p>If \\(N_s > N_p\\), the voltage increases (step-up transformer). If \\(N_s < N_p\\), the voltage decreases (step-down transformer). Crucially, when voltage goes up, current goes down by the same factor.</p>

<div class="env-block intuition">
<div class="env-title">Why transformers need AC</div>
<div class="env-body">
<p>Transformers work by electromagnetic induction, which requires a <em>changing</em> magnetic flux. DC produces a constant flux, and a constant flux induces zero EMF. This is the fundamental reason AC won the "War of Currents" in the 1880s: you can step AC voltage up and down with a simple, cheap, efficient device (the transformer), but you cannot do this with DC.</p>
</div>
</div>

<h3>Why High Voltage for Transmission?</h3>

<p>Power lines have resistance \\(R_{\\text{line}}\\). The power <em>lost</em> as heat in the lines is:</p>

\\[P_{\\text{loss}} = I^2 R_{\\text{line}}\\]

<p>For a given power \\(P = IV\\) to be delivered, the current is \\(I = P/V\\). So:</p>

\\[P_{\\text{loss}} = \\frac{P^2}{V^2} R_{\\text{line}}\\]

<div class="env-block theorem">
<div class="env-title">Transmission loss</div>
<div class="env-body">
\\[P_{\\text{loss}} \\propto \\frac{1}{V^2}\\]
<p>Doubling the transmission voltage cuts losses by a factor of 4. This is why power grids use extremely high voltages (110 kV to 765 kV) for long-distance transmission.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-transmission"></div>

<div class="env-block example">
<div class="env-title">Example: Transmission losses</div>
<div class="env-body">
<p>A power plant delivers 10 MW over a line with \\(R_{\\text{line}} = 5\\,\\Omega\\). Compare losses at 10 kV vs 500 kV:</p>
<ul>
    <li>At 10 kV: \\(I = 10^7/10^4 = 1000\\,\\text{A}\\), \\(P_{\\text{loss}} = 1000^2 \\times 5 = 5\\,\\text{MW}\\) (50% lost!)</li>
    <li>At 500 kV: \\(I = 10^7/5 \\times 10^5 = 20\\,\\text{A}\\), \\(P_{\\text{loss}} = 20^2 \\times 5 = 2\\,\\text{kW}\\) (0.02% lost)</li>
</ul>
<p>The factor of 50 in voltage gives a factor of \\(50^2 = 2500\\) reduction in losses. High-voltage transmission is essential.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The full power grid</div>
<div class="env-body">
<p>The journey from power plant to your outlet involves multiple transformer stages: generator output (~25 kV) is stepped up to hundreds of kV for long-distance lines, then stepped down progressively through substations (e.g., 500 kV to 110 kV to 11 kV) and finally to household voltage (240 V or 120 V).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-transmission',
                        title: 'Power Transmission: Why High Voltage Wins',
                        description: 'Delivering the same 1 MW of power at different voltages. The orange bars show I\u00B2R losses in the transmission line. Drag the voltage slider and watch the losses plummet.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var voltageKV = 10; // kV
                            var powerMW = 1; // MW delivered
                            var lineResistance = 5; // ohms

                            VizEngine.createSlider(controls, 'Voltage (kV)', 1, 500, 10, 1, function (v) {
                                voltageKV = v;
                            });

                            VizEngine.createSlider(controls, 'R_line (\u03A9)', 1, 20, 5, 0.5, function (v) {
                                lineResistance = v;
                            });

                            // Pre-computed voltage levels for comparison bars
                            var voltages = [1, 5, 10, 50, 100, 500];

                            function draw() {
                                viz.clear();

                                // Title
                                viz.screenText('Transmission Loss Comparison (P = 1 MW, R = ' + lineResistance.toFixed(1) + ' \u03A9)', w / 2, 20, viz.colors.white, 13);

                                var barAreaL = 40, barAreaR = w - 30;
                                var barAreaT = 50, barAreaH = h - 100;
                                var nBars = voltages.length;
                                var barW = (barAreaR - barAreaL) / (nBars * 2);
                                var gap = barW * 0.4;

                                // Calculate all losses
                                var losses = [];
                                var maxLoss = 0;
                                for (var i = 0; i < nBars; i++) {
                                    var V = voltages[i] * 1000; // convert to V
                                    var I = (powerMW * 1e6) / V;
                                    var loss = I * I * lineResistance;
                                    losses.push(loss);
                                    if (loss > maxLoss) maxLoss = loss;
                                }

                                // Cap display for readability
                                var displayMax = maxLoss * 1.1;
                                if (displayMax < 1) displayMax = 1;

                                // Draw bars
                                for (var bi = 0; bi < nBars; bi++) {
                                    var cx = barAreaL + (bi + 0.5) * (barAreaR - barAreaL) / nBars;
                                    var barHeight = (losses[bi] / displayMax) * barAreaH;
                                    if (barHeight < 1) barHeight = 1;
                                    var barTop = barAreaT + barAreaH - barHeight;

                                    // Color: more loss = more red, less = more green
                                    var lossFraction = losses[bi] / (powerMW * 1e6);
                                    if (lossFraction > 1) lossFraction = 1;
                                    var r = Math.round(248 * lossFraction + 63 * (1 - lossFraction));
                                    var g = Math.round(81 * lossFraction + 185 * (1 - lossFraction));
                                    var b = Math.round(73 * lossFraction + 80 * (1 - lossFraction));
                                    var barColor = 'rgb(' + r + ',' + g + ',' + b + ')';

                                    // Glow
                                    ctx.save();
                                    ctx.shadowColor = barColor;
                                    ctx.shadowBlur = 8;
                                    ctx.fillStyle = barColor;
                                    ctx.fillRect(cx - barW / 2, barTop, barW, barHeight);
                                    ctx.restore();

                                    // Border
                                    ctx.strokeStyle = barColor;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(cx - barW / 2, barTop, barW, barHeight);

                                    // Voltage label
                                    viz.screenText(voltages[bi] + ' kV', cx, barAreaT + barAreaH + 14, viz.colors.text, 10);

                                    // Loss label
                                    var lossStr;
                                    if (losses[bi] >= 1e6) lossStr = (losses[bi] / 1e6).toFixed(1) + ' MW';
                                    else if (losses[bi] >= 1e3) lossStr = (losses[bi] / 1e3).toFixed(1) + ' kW';
                                    else lossStr = losses[bi].toFixed(1) + ' W';
                                    viz.screenText(lossStr, cx, barTop - 10, barColor, 9);

                                    // Loss percentage
                                    var pct = (losses[bi] / (powerMW * 1e6)) * 100;
                                    var pctStr = pct >= 100 ? '>100%' : (pct >= 1 ? pct.toFixed(0) + '%' : pct.toFixed(2) + '%');
                                    viz.screenText(pctStr, cx, barTop - 22, viz.colors.text, 8);

                                    // Current
                                    var Icurr = (powerMW * 1e6) / (voltages[bi] * 1000);
                                    viz.screenText('I=' + (Icurr >= 1000 ? (Icurr / 1000).toFixed(0) + 'kA' : Icurr.toFixed(0) + 'A'), cx, barAreaT + barAreaH + 26, viz.colors.cyan, 8);
                                }

                                // Baseline
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(barAreaL, barAreaT + barAreaH);
                                ctx.lineTo(barAreaR, barAreaT + barAreaH);
                                ctx.stroke();

                                // Key insight
                                viz.screenText('P_loss = I\u00B2R = P\u00B2R / V\u00B2    \u2192  Double V \u2192 1/4 the loss', w / 2, h - 10, viz.colors.gold, 11);
                            }

                            var intervalId = setInterval(draw, 100);
                            draw();
                            return {
                                stopAnimation: function () { clearInterval(intervalId); }
                            };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A transformer has 500 primary turns and 50 secondary turns. If the primary voltage is 2200 V, what is the secondary voltage? Is this step-up or step-down?',
                        hint: 'Use \\(V_s/V_p = N_s/N_p\\).',
                        solution: '\\(V_s = 2200 \\times 50/500 = 220\\,\\text{V}\\). Since \\(N_s < N_p\\), this is a step-down transformer.'
                    },
                    {
                        question: 'A power station delivers 50 MW at 500 kV over a line with 10 \\(\\Omega\\) resistance. How much power is lost?',
                        hint: 'Find the current first: \\(I = P/V\\).',
                        solution: '\\(I = 50 \\times 10^6 / (500 \\times 10^3) = 100\\,\\text{A}\\). \\(P_{\\text{loss}} = I^2 R = 100^2 \\times 10 = 100\\,\\text{kW}\\), which is only 0.2% of the total power.'
                    }
                ]
            },

            // ============================================================
            // Section 5: AC vs DC
            // ============================================================
            {
                id: 'ac-vs-dc',
                title: 'AC vs DC',
                content: `
<h2>The War of Currents, and Beyond</h2>

<p>In the 1880s, Thomas Edison promoted DC (direct current) for urban power distribution, while George Westinghouse and Nikola Tesla championed AC (alternating current). The result of this "War of Currents" shaped the electrical infrastructure we use today.</p>

<h3>Advantages of AC</h3>

<ul>
    <li><strong>Easy voltage transformation:</strong> Transformers can step voltage up or down with no moving parts and very high efficiency (often > 99%). This was impossible with DC until modern power electronics.</li>
    <li><strong>Efficient long-distance transmission:</strong> High voltage means low current, which means tiny \\(I^2R\\) losses over long lines.</li>
    <li><strong>Simpler generators:</strong> Rotating machinery naturally produces AC. Converting to DC requires additional components (commutators or rectifiers).</li>
    <li><strong>AC motors:</strong> Induction motors (invented by Tesla) are rugged, simple, and need no brushes.</li>
</ul>

<h3>Advantages of DC</h3>

<ul>
    <li><strong>Batteries:</strong> All batteries produce DC. Every portable device runs on DC.</li>
    <li><strong>Electronics:</strong> Transistors, microchips, LEDs, and computers all require DC.</li>
    <li><strong>HVDC transmission:</strong> For very long distances (> 600 km) or undersea cables, high-voltage DC is more efficient than AC because it avoids reactive power losses and skin effects.</li>
    <li><strong>Solar panels:</strong> Photovoltaic cells produce DC directly.</li>
</ul>

<div class="env-block remark">
<div class="env-title">The modern reality</div>
<div class="env-body">
<p>Today the "war" is over: we use both. AC dominates the power grid. DC dominates electronics. Converters (rectifiers turn AC to DC; inverters turn DC to AC) bridge the two worlds. Your phone charger is an AC-to-DC converter. A solar inverter converts DC from panels to AC for the grid.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Rectification</div>
<div class="env-body">
<p><strong>Rectification</strong> is the conversion of AC to DC, typically using diodes. A full-wave bridge rectifier flips the negative half-cycles to positive, and a smoothing capacitor filters the result to near-constant DC. This is inside every AC adapter you own.</p>
</div>
</div>

<h3>Summary: The AC System</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:6px;color:#8b949e;">Concept</th>
    <th style="text-align:left;padding:6px;color:#8b949e;">Key Formula</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Generator EMF</td>
    <td style="padding:6px;">\\(\\mathcal{E} = NBA\\omega\\sin(\\omega t)\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">RMS voltage</td>
    <td style="padding:6px;">\\(V_{\\text{rms}} = V_0/\\sqrt{2}\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Average power</td>
    <td style="padding:6px;">\\(P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}}\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px;">Transformer</td>
    <td style="padding:6px;">\\(V_s/V_p = N_s/N_p\\)</td>
</tr>
<tr>
    <td style="padding:6px;">Transmission loss</td>
    <td style="padding:6px;">\\(P_{\\text{loss}} = P^2 R/V^2\\)</td>
</tr>
</table>

<div class="env-block intuition">
<div class="env-title">Looking ahead</div>
<div class="env-body">
<p>AC is more than a way to deliver power. In the next chapter, we will see that AC currents, oscillating at extraordinarily high frequencies, create something remarkable: electromagnetic waves. Maxwell showed that oscillating electric and magnetic fields can propagate through empty space at the speed of light. This is the final unification: electricity, magnetism, and light are all facets of one phenomenon.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why can\'t a transformer work with DC input?',
                        hint: 'What does Faraday\'s law require?',
                        solution: 'A transformer needs a changing magnetic flux to induce an EMF in the secondary coil. DC produces a constant current, hence a constant flux, hence zero induced EMF (after an initial transient). No changing flux means no voltage transformation.'
                    },
                    {
                        question: 'A data center needs 10 MW of power. It receives AC from the grid and rectifies to DC for its servers. If the rectifier is 95% efficient and the servers need 12 V DC, what current must the DC bus carry?',
                        hint: 'Account for rectifier efficiency first, then use \\(P = IV\\).',
                        solution: 'The rectifier delivers \\(0.95 \\times 10 = 9.5\\,\\text{MW}\\) to the DC side. Current: \\(I = P/V = 9.5 \\times 10^6 / 12 \\approx 792\\,\\text{kA}\\). This enormous current is why data centers use higher DC voltages (48 V or 380 V) internally, then step down at each rack.'
                    }
                ]
            }
        ]
    });
})();
