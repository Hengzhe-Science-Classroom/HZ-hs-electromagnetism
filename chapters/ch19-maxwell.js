// === Chapter 19: Maxwell's Equations & Electromagnetic Waves ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch19',
        number: 19,
        title: "Maxwell & Electromagnetic Waves",
        subtitle: 'Light, radio, X-rays: one unified phenomenon',
        file: 'ch19-maxwell',

        sections: [
            // ============================================================
            // Section 1: Maxwell's Four Equations (Qualitative)
            // ============================================================
            {
                id: 'maxwell-equations',
                title: "Maxwell's Equations",
                content: `
<h2>The Four Laws That Unify Electromagnetism</h2>

<p>By the 1860s, the experimental laws of electricity and magnetism were well established. James Clerk Maxwell collected them, added one crucial correction, and produced a set of four equations that describe <em>all</em> classical electromagnetic phenomena. These are, in words:</p>

<div class="env-block theorem">
<div class="env-title">Maxwell's equations (qualitative)</div>
<div class="env-body">
<ol>
    <li><strong>Gauss's law for electricity:</strong> Electric field lines begin on positive charges and end on negative charges. The total electric flux through a closed surface is proportional to the enclosed charge.
    \\[\\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}\\]</li>
    <li><strong>Gauss's law for magnetism:</strong> There are no magnetic monopoles. Magnetic field lines always form closed loops.
    \\[\\oint \\mathbf{B} \\cdot d\\mathbf{A} = 0\\]</li>
    <li><strong>Faraday's law:</strong> A changing magnetic field creates an electric field (electromagnetic induction).
    \\[\\oint \\mathbf{E} \\cdot d\\mathbf{l} = -\\frac{d\\Phi_B}{dt}\\]</li>
    <li><strong>Amp\\(\\grave{\\text{e}}\\)re-Maxwell law:</strong> A current <em>or a changing electric field</em> creates a magnetic field.
    \\[\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I_{\\text{enc}} + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}\\]</li>
</ol>
</div>
</div>

<p>The first three were known before Maxwell. The fourth is where his genius appears. The original Ampere's law said only that currents create magnetic fields. Maxwell realized it was incomplete.</p>

<div class="env-block intuition">
<div class="env-title">The symmetry</div>
<div class="env-body">
<p>Look at equations 3 and 4 together. A changing \\(\\mathbf{B}\\) creates \\(\\mathbf{E}\\) (Faraday). A changing \\(\\mathbf{E}\\) creates \\(\\mathbf{B}\\) (Maxwell's addition). This mutual creation is the engine of electromagnetic waves: each field regenerates the other, and the disturbance propagates through space at the speed of light.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Four equations, all of physics</div>
<div class="env-body">
<p>Maxwell's equations, together with the Lorentz force law \\(\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})\\), describe every electromagnetic phenomenon: static charges, steady currents, magnets, induction, circuits, radio waves, light, X-rays, and more. They are among the most experimentally verified equations in all of physics.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Which of Maxwell\'s equations tells us that magnetic monopoles do not exist?',
                        hint: 'Which equation says the net magnetic flux through any closed surface is zero?',
                        solution: 'Gauss\'s law for magnetism (equation 2): \\(\\oint \\mathbf{B} \\cdot d\\mathbf{A} = 0\\). Since the total magnetic flux through any closed surface is zero, there can be no isolated magnetic "charges" (monopoles). Every field line that enters a closed surface must also exit.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Displacement Current
            // ============================================================
            {
                id: 'displacement-current',
                title: 'Displacement Current',
                content: `
<h2>Maxwell's Crucial Addition</h2>

<p>Consider a circuit with a capacitor being charged by a current \\(I\\). Between the capacitor plates, there is no physical current (no charges flow across the gap). Yet the magnetic field forms a continuous loop around the wire and through the gap. Ampere's original law, which only counts real currents, gives contradictory answers depending on which surface you use.</p>

<div class="env-block definition">
<div class="env-title">The displacement current</div>
<div class="env-body">
<p>Maxwell proposed that a changing electric field acts as an effective current, the <strong>displacement current</strong>:</p>
\\[I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}\\]
<p>where \\(\\Phi_E\\) is the electric flux through the surface. This "current" produces a magnetic field just as a real current does.</p>
</div>
</div>

<p>Between the capacitor plates, the electric field is changing as charge accumulates. This changing \\(\\mathbf{E}\\) generates \\(\\mathbf{B}\\) through the displacement current term. The result is perfectly consistent: the magnetic field loops are continuous whether you consider the wire (real current) or the gap (displacement current).</p>

<div class="env-block example">
<div class="env-title">Example: Charging capacitor</div>
<div class="env-body">
<p>A parallel-plate capacitor with area \\(A = 0.01\\,\\text{m}^2\\) is being charged by a current \\(I = 2\\,\\text{A}\\). The electric field between the plates is \\(E = Q/(\\varepsilon_0 A)\\), so \\(dE/dt = I/(\\varepsilon_0 A)\\). The displacement current is:</p>
\\[I_d = \\varepsilon_0 A \\cdot \\frac{dE}{dt} = \\varepsilon_0 A \\cdot \\frac{I}{\\varepsilon_0 A} = I = 2\\,\\text{A}\\]
<p>The displacement current in the gap exactly equals the real current in the wire. Continuity is restored.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why "displacement"?</div>
<div class="env-body">
<p>The name is historical and somewhat misleading. Maxwell originally imagined the changing electric field as a displacement of an invisible medium (the "ether"). We now know there is no ether, but the name stuck. The physical content is simply: a time-varying electric field produces a magnetic field.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The key that unlocked waves</div>
<div class="env-body">
<p>Without the displacement current, Maxwell's equations would not predict electromagnetic waves. It is the term \\(\\mu_0 \\varepsilon_0 \\, d\\Phi_E/dt\\) that completes the feedback loop: changing \\(\\mathbf{B}\\) creates \\(\\mathbf{E}\\) (Faraday), and changing \\(\\mathbf{E}\\) creates \\(\\mathbf{B}\\) (displacement current). This self-sustaining cycle is an electromagnetic wave.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A parallel-plate capacitor has plate area \\(A = 0.04\\,\\text{m}^2\\). The electric field between the plates is increasing at \\(dE/dt = 5 \\times 10^{11}\\,\\text{V/(m\\cdot s)}\\). What is the displacement current?',
                        hint: 'Use \\(I_d = \\varepsilon_0 A \\cdot dE/dt\\).',
                        solution: '\\(I_d = 8.85 \\times 10^{-12} \\times 0.04 \\times 5 \\times 10^{11} = 0.177\\,\\text{A} \\approx 0.18\\,\\text{A}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Electromagnetic Waves
            // ============================================================
            {
                id: 'em-waves',
                title: 'Electromagnetic Waves',
                content: `
<h2>Self-Propagating Fields</h2>

<p>Maxwell showed that his equations, in empty space (no charges, no currents), can be combined into wave equations for both \\(\\mathbf{E}\\) and \\(\\mathbf{B}\\):</p>

\\[\\frac{\\partial^2 \\mathbf{E}}{\\partial x^2} = \\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\mathbf{E}}{\\partial t^2}, \\qquad \\frac{\\partial^2 \\mathbf{B}}{\\partial x^2} = \\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\mathbf{B}}{\\partial t^2}\\]

<p>These are standard wave equations with propagation speed:</p>

<div class="env-block theorem">
<div class="env-title">Speed of electromagnetic waves</div>
<div class="env-body">
\\[c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{1}{\\sqrt{4\\pi \\times 10^{-7} \\times 8.854 \\times 10^{-12}}} \\approx 3.00 \\times 10^8\\,\\text{m/s}\\]
<p>This is the speed of light. Maxwell calculated this value from laboratory measurements of electric and magnetic constants and found it matched the known speed of light. His conclusion was revolutionary: <strong>light is an electromagnetic wave</strong>.</p>
</div>
</div>

<h3>Properties of EM Waves</h3>

<ul>
    <li>\\(\\mathbf{E}\\) and \\(\\mathbf{B}\\) are <strong>perpendicular to each other</strong> and both perpendicular to the direction of propagation (transverse wave).</li>
    <li>\\(\\mathbf{E}\\) and \\(\\mathbf{B}\\) oscillate <strong>in phase</strong>: they reach their peaks and zeros at the same points in space and time.</li>
    <li>Their magnitudes are related: \\(E = cB\\) at every point.</li>
    <li>They need <strong>no medium</strong>: EM waves propagate through the vacuum of space.</li>
    <li>The wave obeys \\(c = f\\lambda\\), where \\(f\\) is frequency and \\(\\lambda\\) is wavelength.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-em-wave"></div>

<div class="env-block intuition">
<div class="env-title">The self-sustaining dance</div>
<div class="env-body">
<p>Picture a region of space where \\(\\mathbf{E}\\) is increasing. By the Ampere-Maxwell law, this changing \\(\\mathbf{E}\\) creates \\(\\mathbf{B}\\) nearby. That \\(\\mathbf{B}\\) is now changing, so by Faraday's law it creates \\(\\mathbf{E}\\) a bit further along. This \\(\\mathbf{E}\\) creates more \\(\\mathbf{B}\\), and so on. The disturbance leapfrogs forward through space at speed \\(c\\), requiring no wires, no charges, nothing but empty space.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: A radio wave</div>
<div class="env-body">
<p>An FM radio station broadcasts at 100 MHz. The wavelength is:</p>
\\[\\lambda = \\frac{c}{f} = \\frac{3 \\times 10^8}{100 \\times 10^6} = 3\\,\\text{m}\\]
<p>The peak electric field at 1 km might be \\(E_0 \\approx 0.01\\,\\text{V/m}\\). The corresponding magnetic field is:</p>
\\[B_0 = E_0/c = 0.01 / (3 \\times 10^8) \\approx 3.3 \\times 10^{-11}\\,\\text{T}\\]
<p>Incredibly tiny, yet your radio antenna detects it.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-em-wave',
                        title: 'Electromagnetic Wave',
                        description: 'E field (orange) oscillates vertically, B field (cyan) oscillates horizontally, both perpendicular to the propagation direction (along the axis). Adjust wavelength and watch the wave propagate. Field vectors show the local field strength and direction.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var wavelength = 2.5; // in visual units
                            var speed = 1.2; // visual propagation speed
                            var amplitude = 1.0;
                            var t = 0;
                            var showVectors = true;
                            var paused = false;

                            VizEngine.createSlider(controls, 'Wavelength', 1.0, 5.0, 2.5, 0.1, function (v) {
                                wavelength = v;
                            });
                            VizEngine.createSlider(controls, 'Amplitude', 0.3, 1.5, 1.0, 0.1, function (v) {
                                amplitude = v;
                            });
                            VizEngine.createButton(controls, 'Vectors On/Off', function () {
                                showVectors = !showVectors;
                            });
                            VizEngine.createButton(controls, 'Pause/Play', function () {
                                paused = !paused;
                            });

                            // 3D projection parameters
                            // We use a simple oblique projection
                            // x-axis: propagation direction (horizontal on screen)
                            // y-axis: E-field direction (vertical on screen)
                            // z-axis: B-field direction (oblique, into screen)
                            var cx = w * 0.12; // left origin
                            var cy = h * 0.5;  // vertical center
                            var axisLen = w * 0.82;
                            var eAmp = h * 0.28; // E amplitude in pixels
                            var bAmp = h * 0.22; // B amplitude in pixels
                            // Oblique projection for z-axis (B-field direction)
                            var zAngle = -Math.PI / 5; // angle for z projection
                            var zScale = 0.55; // foreshortening
                            var zDx = Math.cos(zAngle) * zScale;
                            var zDy = Math.sin(zAngle) * zScale;

                            function project(px, ey, bz) {
                                // px: position along propagation axis (0 to axisLen pixels)
                                // ey: E-field component (in pixels, vertical)
                                // bz: B-field component (in pixels, along z)
                                var sx = cx + px + bz * zDx;
                                var sy = cy - ey + bz * zDy;
                                return [sx, sy];
                            }

                            function draw(ts) {
                                if (!paused) t += 1 / 60;
                                var omega = 2 * Math.PI * speed;
                                var k = 2 * Math.PI / wavelength;
                                // wavelength in pixels
                                var lambdaPx = axisLen / 4 * wavelength / 2.5;

                                viz.clear();

                                // Starfield-style subtle background dots
                                var seed = 77123;
                                for (var si = 0; si < 30; si++) {
                                    seed = (seed * 16807) % 2147483647;
                                    var starX = seed % w;
                                    seed = (seed * 16807) % 2147483647;
                                    var starY = seed % h;
                                    ctx.fillStyle = 'rgba(200,220,255,0.06)';
                                    ctx.beginPath();
                                    ctx.arc(starX, starY, 0.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // ---- AXES ----
                                // Propagation axis (x)
                                ctx.strokeStyle = viz.colors.axis + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx - 10, cy);
                                ctx.lineTo(cx + axisLen + 20, cy);
                                ctx.stroke();
                                // Arrow
                                ctx.fillStyle = viz.colors.axis + '88';
                                ctx.beginPath();
                                ctx.moveTo(cx + axisLen + 20, cy);
                                ctx.lineTo(cx + axisLen + 12, cy - 4);
                                ctx.lineTo(cx + axisLen + 12, cy + 4);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('x (propagation)', cx + axisLen + 15, cy + 16, viz.colors.text, 10, 'right');

                                // E-field axis (y, vertical)
                                ctx.strokeStyle = viz.colors.orange + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy + eAmp + 15);
                                ctx.lineTo(cx, cy - eAmp - 15);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange + '55';
                                ctx.beginPath();
                                ctx.moveTo(cx, cy - eAmp - 15);
                                ctx.lineTo(cx - 3, cy - eAmp - 8);
                                ctx.lineTo(cx + 3, cy - eAmp - 8);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('E', cx - 12, cy - eAmp - 10, viz.colors.orange, 12);

                                // B-field axis (z, oblique)
                                var bAxisLen = bAmp + 15;
                                ctx.strokeStyle = viz.colors.cyan + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx - bAxisLen * zDx, cy - bAxisLen * zDy);
                                ctx.lineTo(cx + bAxisLen * zDx, cy + bAxisLen * zDy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.cyan + '55';
                                var bArrowX = cx + bAxisLen * zDx;
                                var bArrowY = cy + bAxisLen * zDy;
                                ctx.beginPath();
                                ctx.moveTo(bArrowX, bArrowY);
                                ctx.lineTo(bArrowX - 5 * zDx + 3 * zDy, bArrowY - 5 * zDy - 3 * zDx);
                                ctx.lineTo(bArrowX - 5 * zDx - 3 * zDy, bArrowY - 5 * zDy + 3 * zDx);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('B', cx + (bAxisLen + 12) * zDx, cy + (bAxisLen + 12) * zDy, viz.colors.cyan, 12);

                                // ---- B-FIELD SINUSOID (draw first, behind E) ----
                                var nPoints = 500;
                                // B-field wave: oscillates along z-axis
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 10;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var bStarted = false;
                                for (var i = 0; i <= nPoints; i++) {
                                    var px = (i / nPoints) * axisLen;
                                    var xCoord = px / axisLen * 4 * Math.PI / (2 * Math.PI / wavelength) * (2 * Math.PI / wavelength);
                                    var xMath = (i / nPoints) * axisLen / lambdaPx * wavelength;
                                    var phase = k * xMath - omega * t;
                                    var bVal = amplitude * Math.sin(phase);
                                    var bPx = bVal * bAmp;
                                    var pt = project(px, 0, bPx);
                                    if (!bStarted) { ctx.moveTo(pt[0], pt[1]); bStarted = true; }
                                    else ctx.lineTo(pt[0], pt[1]);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // B-field vectors
                                if (showVectors) {
                                    var nVectors = Math.round(20 * (2.5 / wavelength));
                                    if (nVectors < 8) nVectors = 8;
                                    if (nVectors > 35) nVectors = 35;
                                    for (var vi = 0; vi < nVectors; vi++) {
                                        var vPx = (vi + 0.5) / nVectors * axisLen;
                                        var vxMath = (vi + 0.5) / nVectors * axisLen / lambdaPx * wavelength;
                                        var vPhase = k * vxMath - omega * t;
                                        var vbVal = amplitude * Math.sin(vPhase);
                                        var vbPx = vbVal * bAmp;
                                        var vBase = project(vPx, 0, 0);
                                        var vTip = project(vPx, 0, vbPx);
                                        var vLen = Math.sqrt((vTip[0] - vBase[0]) * (vTip[0] - vBase[0]) + (vTip[1] - vBase[1]) * (vTip[1] - vBase[1]));
                                        if (vLen > 3) {
                                            var alphaVal = Math.abs(vbVal);
                                            ctx.globalAlpha = 0.2 + 0.6 * alphaVal;
                                            ctx.strokeStyle = viz.colors.cyan;
                                            ctx.lineWidth = 1.2;
                                            ctx.beginPath();
                                            ctx.moveTo(vBase[0], vBase[1]);
                                            ctx.lineTo(vTip[0], vTip[1]);
                                            ctx.stroke();
                                            // Small arrowhead
                                            if (vLen > 6) {
                                                var vAng = Math.atan2(vTip[1] - vBase[1], vTip[0] - vBase[0]);
                                                ctx.fillStyle = viz.colors.cyan;
                                                ctx.beginPath();
                                                ctx.moveTo(vTip[0], vTip[1]);
                                                ctx.lineTo(vTip[0] - 5 * Math.cos(vAng - 0.4), vTip[1] - 5 * Math.sin(vAng - 0.4));
                                                ctx.lineTo(vTip[0] - 5 * Math.cos(vAng + 0.4), vTip[1] - 5 * Math.sin(vAng + 0.4));
                                                ctx.closePath();
                                                ctx.fill();
                                            }
                                            ctx.globalAlpha = 1;
                                        }
                                    }
                                }

                                // ---- E-FIELD SINUSOID ----
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 12;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var eStarted = false;
                                for (var ei = 0; ei <= nPoints; ei++) {
                                    var ePx = (ei / nPoints) * axisLen;
                                    var exMath = (ei / nPoints) * axisLen / lambdaPx * wavelength;
                                    var ePhase = k * exMath - omega * t;
                                    var eVal = amplitude * Math.sin(ePhase);
                                    var ePixel = eVal * eAmp;
                                    var ePt = project(ePx, ePixel, 0);
                                    if (!eStarted) { ctx.moveTo(ePt[0], ePt[1]); eStarted = true; }
                                    else ctx.lineTo(ePt[0], ePt[1]);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // E-field vectors
                                if (showVectors) {
                                    for (var evi = 0; evi < nVectors; evi++) {
                                        var evPx = (evi + 0.5) / nVectors * axisLen;
                                        var evxMath = (evi + 0.5) / nVectors * axisLen / lambdaPx * wavelength;
                                        var evPhase = k * evxMath - omega * t;
                                        var evVal = amplitude * Math.sin(evPhase);
                                        var evPixel = evVal * eAmp;
                                        var evBase = project(evPx, 0, 0);
                                        var evTip = project(evPx, evPixel, 0);
                                        var evLen = Math.abs(evTip[1] - evBase[1]);
                                        if (evLen > 3) {
                                            var evAlpha = Math.abs(evVal);
                                            ctx.globalAlpha = 0.2 + 0.6 * evAlpha;
                                            ctx.strokeStyle = viz.colors.orange;
                                            ctx.lineWidth = 1.2;
                                            ctx.beginPath();
                                            ctx.moveTo(evBase[0], evBase[1]);
                                            ctx.lineTo(evTip[0], evTip[1]);
                                            ctx.stroke();
                                            // Small arrowhead
                                            if (evLen > 6) {
                                                var evAng = Math.atan2(evTip[1] - evBase[1], evTip[0] - evBase[0]);
                                                ctx.fillStyle = viz.colors.orange;
                                                ctx.beginPath();
                                                ctx.moveTo(evTip[0], evTip[1]);
                                                ctx.lineTo(evTip[0] - 5 * Math.cos(evAng - 0.4), evTip[1] - 5 * Math.sin(evAng - 0.4));
                                                ctx.lineTo(evTip[0] - 5 * Math.cos(evAng + 0.4), evTip[1] - 5 * Math.sin(evAng + 0.4));
                                                ctx.closePath();
                                                ctx.fill();
                                            }
                                            ctx.globalAlpha = 1;
                                        }
                                    }
                                }

                                // ---- WAVELENGTH MARKER ----
                                if (lambdaPx > 30 && lambdaPx < axisLen * 0.8) {
                                    var lamY = cy + eAmp + 30;
                                    ctx.strokeStyle = viz.colors.gold + 'aa';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, lamY);
                                    ctx.lineTo(cx + lambdaPx, lamY);
                                    ctx.stroke();
                                    // Arrows
                                    ctx.fillStyle = viz.colors.gold + 'aa';
                                    ctx.beginPath();
                                    ctx.moveTo(cx, lamY);
                                    ctx.lineTo(cx + 5, lamY - 3);
                                    ctx.lineTo(cx + 5, lamY + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                    ctx.beginPath();
                                    ctx.moveTo(cx + lambdaPx, lamY);
                                    ctx.lineTo(cx + lambdaPx - 5, lamY - 3);
                                    ctx.lineTo(cx + lambdaPx - 5, lamY + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                    viz.screenText('\u03BB', cx + lambdaPx / 2, lamY + 12, viz.colors.gold, 11);
                                }

                                // ---- LABELS ----
                                viz.screenText('E \u2225 y (orange)    B \u2225 z (cyan)    propagation \u2192 x', w / 2, 16, viz.colors.text, 10);
                                viz.screenText('c = 1/\u221A(\u03BC\u2080\u03B5\u2080) = 3\u00D710\u2078 m/s', w / 2, h - 10, viz.colors.gold, 10);
                                viz.screenText('E = cB', w - 50, 16, viz.colors.white, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'An EM wave has electric field amplitude \\(E_0 = 300\\,\\text{V/m}\\). What is the magnetic field amplitude?',
                        hint: 'Use \\(B_0 = E_0/c\\).',
                        solution: '\\(B_0 = 300 / (3 \\times 10^8) = 1.0 \\times 10^{-6}\\,\\text{T} = 1\\,\\mu\\text{T}\\).'
                    },
                    {
                        question: 'Show that the units of \\(1/\\sqrt{\\mu_0 \\varepsilon_0}\\) are m/s.',
                        hint: 'Write out the SI units of \\(\\mu_0\\) and \\(\\varepsilon_0\\).',
                        solution: '\\(\\mu_0\\) has units T\\(\\cdot\\)m/A = kg/(A\\(^2\\cdot\\)s\\(^2\\)). \\(\\varepsilon_0\\) has units C\\(^2\\)/(N\\(\\cdot\\)m\\(^2\\)) = A\\(^2\\cdot\\)s\\(^4\\)/(kg\\(\\cdot\\)m\\(^3\\)). So \\(\\mu_0 \\varepsilon_0\\) has units s\\(^2\\)/m\\(^2\\), and \\(1/\\sqrt{\\mu_0 \\varepsilon_0}\\) has units m/s.'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Electromagnetic Spectrum
            // ============================================================
            {
                id: 'em-spectrum',
                title: 'The EM Spectrum',
                content: `
<h2>One Phenomenon, Infinite Range</h2>

<p>All electromagnetic waves travel at speed \\(c\\) in vacuum and obey \\(c = f\\lambda\\). They differ only in frequency (or equivalently, wavelength). Yet this single parameter spans an enormous range, from radio waves with wavelengths of kilometers to gamma rays with wavelengths smaller than an atomic nucleus.</p>

<div class="env-block definition">
<div class="env-title">The electromagnetic spectrum</div>
<div class="env-body">
<table style="width:100%;border-collapse:collapse;margin:0.5em 0;font-size:0.9em;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:4px;color:#8b949e;">Type</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">Wavelength</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">Frequency</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">Source/Use</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">Radio</td>
    <td style="padding:4px;">\\(> 1\\,\\text{mm}\\)</td>
    <td style="padding:4px;">\\(< 300\\,\\text{GHz}\\)</td>
    <td style="padding:4px;">Broadcasting, WiFi</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">Microwave</td>
    <td style="padding:4px;">1 mm to 1 m</td>
    <td style="padding:4px;">300 MHz to 300 GHz</td>
    <td style="padding:4px;">Ovens, radar, 5G</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">Infrared</td>
    <td style="padding:4px;">700 nm to 1 mm</td>
    <td style="padding:4px;">300 GHz to 430 THz</td>
    <td style="padding:4px;">Heat, remote controls</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;color:#f0883e;">Visible</td>
    <td style="padding:4px;">400 to 700 nm</td>
    <td style="padding:4px;">430 to 750 THz</td>
    <td style="padding:4px;">Human vision</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">Ultraviolet</td>
    <td style="padding:4px;">10 to 400 nm</td>
    <td style="padding:4px;">750 THz to 30 PHz</td>
    <td style="padding:4px;">Sunburn, sterilization</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">X-ray</td>
    <td style="padding:4px;">0.01 to 10 nm</td>
    <td style="padding:4px;">30 PHz to 30 EHz</td>
    <td style="padding:4px;">Medical imaging</td>
</tr>
<tr>
    <td style="padding:4px;">Gamma ray</td>
    <td style="padding:4px;">\\(< 0.01\\,\\text{nm}\\)</td>
    <td style="padding:4px;">\\(> 30\\,\\text{EHz}\\)</td>
    <td style="padding:4px;">Nuclear decay, PET scans</td>
</tr>
</table>
</div>
</div>

<p>The boundaries between regions are not sharp; they overlap and are defined by convention. What matters is the physics: it is all the same wave equation, the same Maxwell's equations, from radio to gamma.</p>

<div class="viz-placeholder" data-viz="viz-spectrum"></div>

<div class="env-block remark">
<div class="env-title">Photon energy</div>
<div class="env-body">
<p>Quantum mechanics (beyond this course) tells us each photon carries energy \\(E = hf\\), where \\(h = 6.63 \\times 10^{-34}\\,\\text{J\\cdot s}\\) is Planck's constant. Higher frequency means more energy per photon. This is why gamma rays are dangerous (high energy per photon, can break molecular bonds) while radio waves are harmless (extremely low energy per photon).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-spectrum',
                        title: 'The Electromagnetic Spectrum Explorer',
                        description: 'Slide through the electromagnetic spectrum from radio to gamma rays. See how wavelength, frequency, and photon energy change. Real-world examples are shown at each range.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Frequency slider in log scale: log10(f) from 4 (10 kHz) to 22 (10 ZHz)
                            var logFreq = 14.7; // ~500 THz, green light

                            VizEngine.createSlider(controls, 'log\u2081\u2080(f Hz)', 4, 22, 14.7, 0.05, function (v) {
                                logFreq = v;
                            });

                            // Spectrum bands: [name, logF_min, logF_max, color, examples]
                            var bands = [
                                ['Radio', 4, 11.5, '#4488cc', 'AM/FM radio, TV, WiFi, Bluetooth'],
                                ['Microwave', 9.5, 11.5, '#66aadd', 'Microwave ovens, radar, 5G, satellite'],
                                ['Infrared', 11.5, 14.13, '#cc4444', 'Heat radiation, TV remotes, thermal cameras'],
                                ['Visible', 14.13, 14.875, '#ffff00', 'Human vision, photography, lasers'],
                                ['Ultraviolet', 14.875, 16.5, '#9944cc', 'Sunburn, black lights, sterilization'],
                                ['X-ray', 16.5, 19.5, '#44cc88', 'Medical imaging, CT scans, security'],
                                ['Gamma', 19.5, 22, '#cc8844', 'Nuclear decay, PET scans, cancer therapy']
                            ];

                            // Visible light wavelength to RGB
                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) {
                                    r = -(nm - 440) / (440 - 380);
                                    b = 1;
                                } else if (nm >= 440 && nm < 490) {
                                    g = (nm - 440) / (490 - 440);
                                    b = 1;
                                } else if (nm >= 490 && nm < 510) {
                                    g = 1;
                                    b = -(nm - 510) / (510 - 490);
                                } else if (nm >= 510 && nm < 580) {
                                    r = (nm - 510) / (580 - 510);
                                    g = 1;
                                } else if (nm >= 580 && nm < 645) {
                                    r = 1;
                                    g = -(nm - 645) / (645 - 580);
                                } else if (nm >= 645 && nm <= 780) {
                                    r = 1;
                                }
                                // Intensity falloff at edges
                                var factor;
                                if (nm >= 380 && nm < 420) factor = 0.3 + 0.7 * (nm - 380) / (420 - 380);
                                else if (nm >= 645 && nm <= 780) factor = 0.3 + 0.7 * (780 - nm) / (780 - 645);
                                else if (nm >= 420 && nm < 645) factor = 1;
                                else factor = 0;
                                r = Math.round(r * factor * 255);
                                g = Math.round(g * factor * 255);
                                b = Math.round(b * factor * 255);
                                return 'rgb(' + r + ',' + g + ',' + b + ')';
                            }

                            function draw() {
                                viz.clear();

                                var freq = Math.pow(10, logFreq);
                                var wavelen = 3e8 / freq; // meters
                                var energy = 6.626e-34 * freq; // Joules
                                var energyEV = energy / 1.602e-19;

                                // ---- SPECTRUM BAR ----
                                var barL = 40, barR = w - 40;
                                var barT = 50, barH = 35;
                                var barW2 = barR - barL;
                                var logMin = 4, logMax = 22;

                                // Draw band backgrounds
                                for (var bi = 0; bi < bands.length; bi++) {
                                    var band = bands[bi];
                                    var x1 = barL + (band[1] - logMin) / (logMax - logMin) * barW2;
                                    var x2 = barL + (band[2] - logMin) / (logMax - logMin) * barW2;
                                    ctx.fillStyle = band[3] + '33';
                                    ctx.fillRect(x1, barT, x2 - x1, barH);
                                    ctx.strokeStyle = band[3] + '66';
                                    ctx.lineWidth = 0.5;
                                    ctx.strokeRect(x1, barT, x2 - x1, barH);

                                    // Band label
                                    viz.screenText(band[0], (x1 + x2) / 2, barT + barH + 14, band[3], 8);
                                }

                                // Visible light rainbow in the visible band
                                var visL = barL + (14.13 - logMin) / (logMax - logMin) * barW2;
                                var visR = barL + (14.875 - logMin) / (logMax - logMin) * barW2;
                                var visW = visR - visL;
                                for (var vi = 0; vi < visW; vi++) {
                                    var frac = vi / visW;
                                    var nm = 700 - frac * 320; // 700 nm (red) to 380 nm (violet)
                                    ctx.fillStyle = wavelengthToRGB(nm);
                                    ctx.fillRect(visL + vi, barT, 1.5, barH);
                                }

                                // Current position indicator
                                var posX = barL + (logFreq - logMin) / (logMax - logMin) * barW2;
                                // Glowing marker
                                ctx.save();
                                // Determine current band color
                                var currentColor = viz.colors.white;
                                var currentBand = 'Unknown';
                                var currentExamples = '';
                                for (var ci = 0; ci < bands.length; ci++) {
                                    if (logFreq >= bands[ci][1] && logFreq < bands[ci][2]) {
                                        currentColor = bands[ci][3];
                                        currentBand = bands[ci][0];
                                        currentExamples = bands[ci][4];
                                        break;
                                    }
                                }
                                // For visible, use actual color
                                if (logFreq >= 14.13 && logFreq <= 14.875) {
                                    var visNm = 3e8 / freq * 1e9;
                                    if (visNm >= 380 && visNm <= 780) {
                                        currentColor = wavelengthToRGB(visNm);
                                    }
                                }

                                ctx.shadowColor = currentColor;
                                ctx.shadowBlur = 15;
                                ctx.fillStyle = currentColor;
                                ctx.beginPath();
                                ctx.moveTo(posX, barT - 2);
                                ctx.lineTo(posX - 6, barT - 12);
                                ctx.lineTo(posX + 6, barT - 12);
                                ctx.closePath();
                                ctx.fill();
                                // Vertical line
                                ctx.strokeStyle = currentColor;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(posX, barT);
                                ctx.lineTo(posX, barT + barH);
                                ctx.stroke();
                                ctx.restore();

                                // ---- INFO PANEL ----
                                var infoY = barT + barH + 40;

                                // Band name (large)
                                ctx.save();
                                ctx.shadowColor = currentColor;
                                ctx.shadowBlur = 12;
                                ctx.fillStyle = currentColor;
                                ctx.font = 'bold 24px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(currentBand, w / 2, infoY);
                                ctx.restore();

                                infoY += 36;

                                // Frequency
                                var freqStr;
                                if (freq < 1e3) freqStr = freq.toFixed(0) + ' Hz';
                                else if (freq < 1e6) freqStr = (freq / 1e3).toFixed(1) + ' kHz';
                                else if (freq < 1e9) freqStr = (freq / 1e6).toFixed(1) + ' MHz';
                                else if (freq < 1e12) freqStr = (freq / 1e9).toFixed(2) + ' GHz';
                                else if (freq < 1e15) freqStr = (freq / 1e12).toFixed(2) + ' THz';
                                else if (freq < 1e18) freqStr = (freq / 1e15).toFixed(2) + ' PHz';
                                else freqStr = (freq / 1e18).toFixed(2) + ' EHz';

                                // Wavelength
                                var wlStr;
                                if (wavelen >= 1e3) wlStr = (wavelen / 1e3).toFixed(0) + ' km';
                                else if (wavelen >= 1) wlStr = wavelen.toFixed(1) + ' m';
                                else if (wavelen >= 1e-2) wlStr = (wavelen * 100).toFixed(1) + ' cm';
                                else if (wavelen >= 1e-3) wlStr = (wavelen * 1e3).toFixed(1) + ' mm';
                                else if (wavelen >= 1e-6) wlStr = (wavelen * 1e6).toFixed(1) + ' \u03BCm';
                                else if (wavelen >= 1e-9) wlStr = (wavelen * 1e9).toFixed(1) + ' nm';
                                else if (wavelen >= 1e-12) wlStr = (wavelen * 1e12).toFixed(2) + ' pm';
                                else wlStr = (wavelen * 1e15).toFixed(2) + ' fm';

                                // Energy
                                var enStr;
                                if (energyEV < 0.001) enStr = (energyEV * 1e6).toFixed(1) + ' \u03BCeV';
                                else if (energyEV < 1) enStr = (energyEV * 1e3).toFixed(2) + ' meV';
                                else if (energyEV < 1000) enStr = energyEV.toFixed(2) + ' eV';
                                else if (energyEV < 1e6) enStr = (energyEV / 1e3).toFixed(1) + ' keV';
                                else enStr = (energyEV / 1e6).toFixed(1) + ' MeV';

                                var colL = w * 0.18, colM = w * 0.5, colR = w * 0.82;

                                viz.screenText('Frequency', colL, infoY, viz.colors.text, 10);
                                viz.screenText('Wavelength', colM, infoY, viz.colors.text, 10);
                                viz.screenText('Photon Energy', colR, infoY, viz.colors.text, 10);

                                infoY += 18;
                                viz.screenText(freqStr, colL, infoY, viz.colors.white, 14);
                                viz.screenText(wlStr, colM, infoY, viz.colors.white, 14);
                                viz.screenText(enStr, colR, infoY, viz.colors.white, 14);

                                infoY += 28;
                                // Examples
                                if (currentExamples) {
                                    viz.screenText(currentExamples, w / 2, infoY, viz.colors.text, 10);
                                }

                                // ---- WAVE VISUALIZATION at bottom ----
                                var waveY = h - 70;
                                var waveAmp = 25;
                                var waveL = 40, waveR2 = w - 40;
                                var dispWaveLen = waveR2 - waveL;

                                // Show a few cycles of the wave with color matching current band
                                var nCycles = VizEngine.clamp(logFreq / 3, 1.5, 12);
                                ctx.save();
                                ctx.shadowColor = currentColor;
                                ctx.shadowBlur = 8;
                                ctx.strokeStyle = currentColor;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var wi = 0; wi <= 400; wi++) {
                                    var frac2 = wi / 400;
                                    var wsx = waveL + frac2 * dispWaveLen;
                                    var wsy = waveY - waveAmp * Math.sin(2 * Math.PI * nCycles * frac2);
                                    if (wi === 0) ctx.moveTo(wsx, wsy);
                                    else ctx.lineTo(wsx, wsy);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // Size comparison
                                infoY += 20;
                                var sizeComp = '';
                                if (wavelen > 1000) sizeComp = 'Size of: a mountain';
                                else if (wavelen > 1) sizeComp = 'Size of: a human';
                                else if (wavelen > 0.01) sizeComp = 'Size of: a finger';
                                else if (wavelen > 1e-4) sizeComp = 'Size of: a needle tip';
                                else if (wavelen > 1e-6) sizeComp = 'Size of: a bacterium';
                                else if (wavelen > 1e-9) sizeComp = 'Size of: a molecule';
                                else if (wavelen > 1e-12) sizeComp = 'Size of: an atom';
                                else sizeComp = 'Size of: an atomic nucleus';

                                viz.screenText(sizeComp, w / 2, infoY, viz.colors.gold, 10);

                                // Bottom label
                                viz.screenText('c = f\u03BB = 3\u00D710\u2078 m/s for all electromagnetic waves', w / 2, h - 10, viz.colors.text, 9);
                            }

                            var intervalId = setInterval(draw, 50);
                            draw();
                            return {
                                stopAnimation: function () { clearInterval(intervalId); }
                            };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A microwave oven operates at 2.45 GHz. What is the wavelength? How does it compare to the size of the oven cavity?',
                        hint: 'Use \\(\\lambda = c/f\\).',
                        solution: '\\(\\lambda = 3 \\times 10^8 / (2.45 \\times 10^9) = 0.122\\,\\text{m} = 12.2\\,\\text{cm}\\). This is comparable to the oven cavity size (~30 cm), which is by design: the cavity acts as a resonator for these waves, creating standing wave patterns that heat the food (unevenly, which is why the turntable rotates).'
                    },
                    {
                        question: 'Red light has wavelength 700 nm, violet light 400 nm. What are their frequencies? What is the ratio of their photon energies?',
                        hint: 'Use \\(f = c/\\lambda\\) and \\(E \\propto f\\).',
                        solution: '\\(f_{\\text{red}} = 3 \\times 10^8 / (700 \\times 10^{-9}) = 4.29 \\times 10^{14}\\,\\text{Hz}\\). \\(f_{\\text{violet}} = 3 \\times 10^8 / (400 \\times 10^{-9}) = 7.50 \\times 10^{14}\\,\\text{Hz}\\). Energy ratio: \\(E_{\\text{violet}}/E_{\\text{red}} = f_{\\text{violet}}/f_{\\text{red}} = 750/429 \\approx 1.75\\). Violet photons carry about 75% more energy than red photons.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Light is an Electromagnetic Wave
            // ============================================================
            {
                id: 'light-is-em',
                title: 'Light Is an EM Wave',
                content: `
<h2>The Greatest Unification in 19th-Century Physics</h2>

<p>Before Maxwell, light and electromagnetism seemed like entirely separate subjects. Optics was studied with lenses, prisms, and mirrors. Electricity and magnetism dealt with charges, currents, and magnets. Maxwell's equations changed everything.</p>

<div class="env-block theorem">
<div class="env-title">Maxwell's prediction (1865)</div>
<div class="env-body">
<p>Electromagnetic disturbances propagate through space at speed \\(c = 1/\\sqrt{\\mu_0 \\varepsilon_0}\\). When Maxwell computed this from the known values of \\(\\mu_0\\) and \\(\\varepsilon_0\\) (measured in completely electrical experiments with capacitors and inductors), he obtained a speed that matched the known speed of light to within experimental error.</p>

<p>His conclusion: <em>"We can scarcely avoid the inference that light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena."</em></p>
</div>
</div>

<p>This was a pure prediction from theory, not adjusted to fit data. The constants \\(\\mu_0\\) and \\(\\varepsilon_0\\) come from static experiments with charges and magnets. That their combination gives the speed of light is one of the most stunning coincidences (or rather, unifications) in physics.</p>

<h3>Experimental Confirmation: Hertz (1887)</h3>

<p>Heinrich Hertz built an apparatus with a spark-gap transmitter (creating oscillating charges, hence oscillating EM fields) and a loop antenna receiver across the room. He detected the transmitted electromagnetic waves, measured their speed (matching \\(c\\)), and showed they could be reflected, refracted, and polarized, just like light. This was the definitive proof that Maxwell was right.</p>

<div class="env-block remark">
<div class="env-title">From Hertz to the modern world</div>
<div class="env-body">
<p>Hertz reportedly said his discovery had "no practical use." Within a decade, Marconi was transmitting radio signals across the Atlantic. Today, electromagnetic waves carry essentially all human communication: radio, TV, cell phones, WiFi, satellite links, fiber optics (light in glass). The entire information age rests on Maxwell's equations and Hertz's experiments.</p>
</div>
</div>

<h3>What Light Actually Is</h3>

<p>Visible light is electromagnetic radiation with wavelengths between about 400 nm (violet) and 700 nm (red). It is the same phenomenon as radio waves, X-rays, and gamma rays, only at frequencies our eyes happen to detect. Our eyes are antennas tuned to a narrow band of the EM spectrum.</p>

<div class="env-block intuition">
<div class="env-title">The end, and the beginning</div>
<div class="env-body">
<p>Maxwell's unification of electricity, magnetism, and light is one of the great triumphs of human thought. It showed that seemingly different phenomena are manifestations of a single underlying reality. This pattern, unification through mathematical structure, became the template for all of modern physics. Einstein's relativity arose from taking Maxwell's equations seriously. Quantum electrodynamics extended them into the quantum realm. The search for further unification (electroweak, grand unification, string theory) continues the path Maxwell opened.</p>
<p>You have now seen the full arc: from static charges rubbed on amber, through circuits and magnets, to electromagnetic waves traveling through the vacuum of space at the speed of light. Electromagnetism is complete.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">A note on what comes next</div>
<div class="env-body">
<p>Maxwell's classical theory is extraordinarily successful, but it is not the final word. Around 1900, experiments on blackbody radiation and the photoelectric effect revealed that light also behaves as <em>particles</em> (photons). This wave-particle duality led to quantum mechanics. But that is another course.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Maxwell computed \\(c\\) from \\(\\mu_0\\) and \\(\\varepsilon_0\\). These constants were measured in purely electrical experiments. Why is it remarkable that they give the speed of light?',
                        hint: 'Think about what it implies about the relationship between electricity, magnetism, and optics.',
                        solution: 'It means that light is an electromagnetic phenomenon. The speed of light is not an independent constant of optics; it is determined by the electric and magnetic properties of empty space. This unifies three previously separate branches of physics (electricity, magnetism, optics) into one framework. It was entirely unexpected before Maxwell.'
                    },
                    {
                        question: 'Hertz generated EM waves with a spark gap at about 100 MHz. What was the wavelength of these waves?',
                        hint: 'Use \\(\\lambda = c/f\\).',
                        solution: '\\(\\lambda = 3 \\times 10^8 / (10^8) = 3\\,\\text{m}\\). These were radio waves, much longer than light waves (which have \\(\\lambda \\sim 500\\,\\text{nm}\\)), but Hertz showed they had the same physical properties (reflection, refraction, polarization), confirming they were the same type of wave.'
                    }
                ]
            }
        ]
    });
})();
