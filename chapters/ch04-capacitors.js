// === Chapter 4: Capacitors & Dielectrics ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Capacitors & Dielectrics',
    subtitle: 'Storing charge and energy in electric fields',
    sections: [
        // ======================== Section 1 ========================
        {
            id: 'what-is-a-capacitor',
            title: 'What Is a Capacitor?',
            content: `
<h2>What Is a Capacitor?</h2>

<div class="env-block env-intuition">
<div class="env-header">A Bucket for Charge</div>
<div class="env-body">
<p>Imagine two metal plates facing each other with a small gap between them. If we connect a battery, electrons pile up on one plate and are pulled away from the other. The result: one plate becomes negatively charged, the other positively charged, and an electric field fills the gap. That is a <strong>capacitor</strong>, one of the most ubiquitous components in electronics.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 4.1 — Capacitance</div>
<div class="env-body">
<p>A <strong>capacitor</strong> is a device that stores electric charge on two conductors separated by an insulator. The <strong>capacitance</strong> \\(C\\) measures how much charge \\(Q\\) the device stores per unit voltage \\(V\\):</p>
\\[C = \\frac{Q}{V}\\]
<p>Unit: <strong>farad</strong> (F), where \\(1\\text{ F} = 1\\text{ C/V}\\). Practical capacitors are measured in \\(\\mu\\text{F}\\), nF, or pF.</p>
</div>
</div>

<p>The key idea: capacitance is a <em>geometric</em> property. It depends on the shape and arrangement of the conductors, not on the charge or voltage currently applied. A bigger capacitor does not mean it is currently holding more charge; it means it <em>can</em> hold more charge per volt.</p>

<h3>Circuit Symbol and Conventions</h3>

<p>In circuit diagrams a capacitor is drawn as two parallel lines (or one curved line). The charge stored is always \\(+Q\\) on one plate and \\(-Q\\) on the other. The voltage \\(V\\) refers to the potential difference between the plates.</p>

<div class="env-block env-remark">
<div class="env-header">Sign Conventions</div>
<div class="env-body">
<p>We always quote \\(Q\\) as the magnitude of charge on either plate (positive number). The total charge on the capacitor is zero; we are merely separating charge, not creating it.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 4.1</div>
<div class="env-body">
<p>A 10 \\(\\mu\\text{F}\\) capacitor is connected to a 12 V battery. How much charge is stored?</p>
<p><strong>Solution.</strong> \\(Q = CV = 10 \\times 10^{-6} \\times 12 = 1.2 \\times 10^{-4}\\) C \\(= 120\\;\\mu\\text{C}\\).</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 4.2</div>
<div class="env-body">
<p>A capacitor holds \\(50\\;\\mu\\text{C}\\) when connected to 5 V. What is its capacitance?</p>
<p><strong>Solution.</strong> \\(C = Q/V = 50 \\times 10^{-6}/5 = 10\\;\\mu\\text{F}\\).</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A \\(4.7\\;\\mu\\text{F}\\) capacitor is charged to 9 V. How much charge does it hold? If the voltage doubles, what happens to the charge?',
                    hint: 'Use \\(Q = CV\\). Capacitance is a geometric property, so it stays the same when voltage changes.',
                    solution: '\\(Q = 4.7 \\times 10^{-6} \\times 9 = 42.3\\;\\mu\\text{C}\\). Doubling the voltage doubles the charge to \\(84.6\\;\\mu\\text{C}\\), since \\(C\\) is constant.'
                },
                {
                    question: 'Explain why a 1 F capacitor is considered enormous. How much charge would it hold at 5 V?',
                    hint: 'Calculate \\(Q = CV\\) and compare to everyday charge scales.',
                    solution: '\\(Q = 1 \\times 5 = 5\\) C. That is an enormous amount of separated charge; recall that lightning transfers only about 5 C total. Commercial "supercapacitors" (used in regenerative braking) reach several farads, but traditional capacitors are typically in the \\(\\mu\\text{F}\\) to pF range.'
                }
            ],
            visualizations: []
        },
        // ======================== Section 2 ========================
        {
            id: 'parallel-plate-capacitor',
            title: 'Parallel-Plate Capacitor',
            content: `
<h2>The Parallel-Plate Capacitor</h2>

<div class="env-block env-intuition">
<div class="env-header">The Simplest Geometry</div>
<div class="env-body">
<p>Two large, flat, parallel conducting plates of area \\(A\\), separated by distance \\(d\\), form the most important capacitor geometry. Nearly all the electric field is confined to the gap between the plates (edge effects are negligible when \\(A \\gg d^2\\)), and the field is uniform there.</p>
</div>
</div>

<h3>Derivation of Capacitance</h3>

<p>From Gauss's law, the field between infinite parallel plates with surface charge density \\(\\sigma = Q/A\\) is</p>
\\[E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}.\\]

<p>The voltage across the gap is \\(V = Ed\\), so</p>
\\[V = \\frac{Qd}{\\varepsilon_0 A}.\\]

<div class="env-block env-theorem">
<div class="env-header">Parallel-Plate Capacitance</div>
<div class="env-body">
\\[C = \\frac{\\varepsilon_0 A}{d}\\]
<p>where \\(\\varepsilon_0 = 8.854 \\times 10^{-12}\\) F/m is the permittivity of free space, \\(A\\) is the plate area, and \\(d\\) is the separation.</p>
</div>
</div>

<p>This formula reveals three intuitive facts:</p>
<ul>
<li><strong>Larger plates</strong> (bigger \\(A\\)) \\(\\Rightarrow\\) more capacitance (more room for charge).</li>
<li><strong>Smaller gap</strong> (smaller \\(d\\)) \\(\\Rightarrow\\) more capacitance (charges attract more strongly across a short gap).</li>
<li>Capacitance depends only on geometry and the medium between the plates.</li>
</ul>

<div class="viz-placeholder" data-viz="parallel-plate-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 4.3</div>
<div class="env-body">
<p>Two plates, each \\(20\\text{ cm} \\times 20\\text{ cm}\\), are separated by 1 mm of air. Find \\(C\\).</p>
<p><strong>Solution.</strong> \\(A = 0.04\\) m\\(^2\\), \\(d = 0.001\\) m. \\(C = 8.854 \\times 10^{-12} \\times 0.04 / 0.001 = 3.54 \\times 10^{-10}\\) F \\(= 354\\) pF.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 4.4</div>
<div class="env-body">
<p>How large would the plates need to be to make a 1 F capacitor with a 1 mm air gap?</p>
<p><strong>Solution.</strong> \\(A = Cd/\\varepsilon_0 = 1 \\times 0.001 / (8.854 \\times 10^{-12}) \\approx 1.13 \\times 10^{8}\\) m\\(^2\\). That is about 113 km\\(^2\\), larger than the city of Paris. This shows why 1 F is impractically large for a simple parallel-plate design.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'If you halve the separation \\(d\\) while keeping everything else the same, what happens to \\(C\\), \\(E\\), and \\(Q\\) (assuming the battery stays connected)?',
                    hint: 'With the battery connected, \\(V\\) is fixed. Use \\(C = \\varepsilon_0 A/d\\), then \\(Q = CV\\), and \\(E = V/d\\).',
                    solution: '\\(C\\) doubles (inversely proportional to \\(d\\)). Since \\(V\\) is fixed, \\(Q = CV\\) also doubles. The field \\(E = V/d\\) also doubles. The battery must supply extra charge to maintain the voltage.'
                },
                {
                    question: 'Two parallel-plate capacitors have the same plate area. Capacitor A has separation 2 mm; capacitor B has separation 6 mm. What is the ratio \\(C_A/C_B\\)?',
                    hint: '\\(C \\propto 1/d\\).',
                    solution: '\\(C_A/C_B = d_B/d_A = 6/2 = 3\\). Capacitor A has three times the capacitance.'
                }
            ],
            visualizations: [
                {
                    id: 'parallel-plate-viz',
                    title: 'Interactive Parallel-Plate Capacitor',
                    description: 'Adjust plate area, separation, and voltage to see how charge, capacitance, and the electric field change in real time. Watch field lines and surface charges respond instantly.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 300, originY: 200 });
                        var params = { area: 0.04, sep: 2.0, voltage: 12, kappa: 1.0, charging: false, chargePhase: 0 };
                        var t0 = null;

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var t = (timestamp - t0) / 1000;
                            viz.clear();

                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Plate geometry in screen coords
                            var plateH = 40 + params.area * 3000; // plate visual height
                            if (plateH > H - 60) plateH = H - 60;
                            var gap = 40 + params.sep * 50;      // gap in pixels
                            var plateW = 14;
                            var cx = W / 2;
                            var cy = H / 2;
                            var leftX = cx - gap / 2;
                            var rightX = cx + gap / 2;
                            var topY = cy - plateH / 2;

                            // Compute physics
                            var eps0 = 8.854e-12;
                            var C = eps0 * params.kappa * params.area / (params.sep * 1e-3);
                            var Q = C * params.voltage;
                            var E = params.voltage / (params.sep * 1e-3);
                            var sigma = Q / params.area;

                            // Background glow between plates
                            var fieldStrength = VizEngine.clamp(E / 15000, 0, 1);
                            var glowAlpha = fieldStrength * 0.15;
                            ctx.fillStyle = 'rgba(88,166,255,' + glowAlpha + ')';
                            ctx.fillRect(leftX + plateW, topY, gap - plateW * 2 + (rightX - leftX - gap + plateW * 2), plateH);

                            // Draw field lines between plates
                            var nLines = Math.min(Math.floor(plateH / 18), 20);
                            var arrowDensity = Math.max(1, Math.floor(4 * fieldStrength));
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.globalAlpha = 0.3 + fieldStrength * 0.5;
                            for (var i = 0; i < nLines; i++) {
                                var ly = topY + (i + 0.5) * plateH / nLines;
                                var x1 = leftX + plateW + 2;
                                var x2 = rightX - 2;
                                ctx.beginPath();
                                ctx.moveTo(x1, ly);
                                ctx.lineTo(x2, ly);
                                ctx.stroke();

                                // Animated arrows along field lines
                                var arrowSize = 5;
                                var phase = (t * 60 * (0.5 + fieldStrength)) % (x2 - x1);
                                for (var a = 0; a < arrowDensity; a++) {
                                    var ax = x1 + ((phase + a * (x2 - x1) / arrowDensity) % (x2 - x1));
                                    if (ax > x1 + 5 && ax < x2 - 5) {
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.beginPath();
                                        ctx.moveTo(ax + arrowSize, ly);
                                        ctx.lineTo(ax - arrowSize * 0.6, ly - arrowSize * 0.5);
                                        ctx.lineTo(ax - arrowSize * 0.6, ly + arrowSize * 0.5);
                                        ctx.closePath();
                                        ctx.fill();
                                    }
                                }
                            }
                            ctx.globalAlpha = 1;

                            // Left plate (positive)
                            ctx.save();
                            ctx.shadowColor = viz.colors.red;
                            ctx.shadowBlur = 8 + fieldStrength * 12;
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(leftX, topY, plateW, plateH);
                            ctx.restore();

                            // Right plate (negative)
                            ctx.save();
                            ctx.shadowColor = viz.colors.blue;
                            ctx.shadowBlur = 8 + fieldStrength * 12;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(rightX, topY, plateW, plateH);
                            ctx.restore();

                            // Charges on plates
                            var nCharges = Math.min(Math.floor(Q * 1e7 * 0.8) + 2, 18);
                            nCharges = VizEngine.clamp(nCharges, 2, 18);
                            for (var ci = 0; ci < nCharges; ci++) {
                                var cy2 = topY + (ci + 0.5) * plateH / nCharges;
                                // Positive charges on left plate inner face
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('+', leftX + plateW + 8, cy2);
                                // Negative charges on right plate inner face
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.fillText('\u2013', rightX - 8, cy2);
                            }

                            // Plate labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('+Q', leftX + plateW / 2, topY - 14);
                            ctx.fillText('\u2013Q', rightX + plateW / 2, topY - 14);

                            // Dimension lines
                            // Separation d
                            var dimY = topY + plateH + 25;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(leftX + plateW, dimY);
                            ctx.lineTo(rightX, dimY);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(leftX + plateW, dimY - 5);
                            ctx.lineTo(leftX + plateW, dimY + 5);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(rightX, dimY - 5);
                            ctx.lineTo(rightX, dimY + 5);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('d = ' + params.sep.toFixed(1) + ' mm', (leftX + plateW + rightX) / 2, dimY + 16);

                            // E-field label
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (E > 0) {
                                ctx.fillText('E \u2192', cx, cy - plateH / 2 - 30);
                            }

                            // Battery wires
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            // Left wire (top)
                            ctx.beginPath();
                            ctx.moveTo(leftX + plateW / 2, topY);
                            ctx.lineTo(leftX + plateW / 2, topY - 30);
                            ctx.lineTo(50, topY - 30);
                            ctx.lineTo(50, cy);
                            ctx.stroke();
                            // Right wire (top)
                            ctx.beginPath();
                            ctx.moveTo(rightX + plateW / 2, topY);
                            ctx.lineTo(rightX + plateW / 2, topY - 30);
                            ctx.lineTo(W - 50, topY - 30);
                            ctx.lineTo(W - 50, cy);
                            ctx.stroke();

                            // Battery symbol
                            var bx1 = 38, bx2 = W - 38;
                            // Left battery terminal (positive)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(50, cy - 10);
                            ctx.lineTo(50, cy + 10);
                            ctx.stroke();
                            // Short line
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(50 - 8, cy + 18);
                            ctx.lineTo(50 + 8, cy + 18);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(params.voltage.toFixed(0) + ' V', 50, cy + 35);

                            // Right battery terminal (negative)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(W - 50, cy - 10);
                            ctx.lineTo(W - 50, cy + 10);
                            ctx.stroke();

                            // Animated electron flow in wires
                            var flowSpeed = fieldStrength * 2 + 0.5;
                            ctx.globalAlpha = 0.7;
                            var nDots = 5;
                            for (var di = 0; di < nDots; di++) {
                                var phase2 = ((t * flowSpeed * 40 + di * 60) % 300) / 300;
                                // Left wire electrons moving up
                                var ex1 = 50;
                                var ey1 = cy - (cy - topY + 30) * phase2;
                                viz.drawScreenCircle(ex1, ey1, 3, viz.colors.cyan);
                                // Right wire electrons moving down
                                var ex2 = W - 50;
                                var ey2 = topY - 30 + (cy - topY + 30) * phase2;
                                viz.drawScreenCircle(ex2, ey2, 3, viz.colors.cyan);
                            }
                            ctx.globalAlpha = 1;

                            // Readout panel
                            var px = 12, py = H - 90;
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(px - 4, py - 4, 220, 82);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(px - 4, py - 4, 220, 82);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('C = \u03B5\u2080\u03BAA/d = ' + (C * 1e12).toFixed(1) + ' pF', px, py + 10);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Q = CV = ' + (Q * 1e9).toFixed(2) + ' nC', px, py + 28);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('E = V/d = ' + (E).toFixed(0) + ' V/m', px, py + 46);
                            ctx.fillStyle = viz.colors.orange;
                            var energy = 0.5 * C * params.voltage * params.voltage;
                            ctx.fillText('U = \u00bdCV\u00b2 = ' + (energy * 1e9).toFixed(2) + ' nJ', px, py + 64);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'Area A (cm\u00b2)', 4, 100, params.area * 1e4, 1, function(v) { params.area = v * 1e-4; });
                        VizEngine.createSlider(controls, 'Separation d (mm)', 0.5, 5, params.sep, 0.1, function(v) { params.sep = v; });
                        VizEngine.createSlider(controls, 'Voltage V', 0, 50, params.voltage, 1, function(v) { params.voltage = v; });
                        VizEngine.createSlider(controls, 'Dielectric \u03BA', 1, 10, params.kappa, 0.5, function(v) { params.kappa = v; });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 3 ========================
        {
            id: 'energy-stored',
            title: 'Energy Stored',
            content: `
<h2>Energy Stored in a Capacitor</h2>

<div class="env-block env-intuition">
<div class="env-header">Where Does the Energy Go?</div>
<div class="env-body">
<p>Charging a capacitor requires work: the battery must push electrons against the growing electric field. That work is not lost; it is stored as energy in the electric field between the plates. When the capacitor discharges, this energy is released. Camera flashes, defibrillators, and pulsed lasers all exploit this stored energy.</p>
</div>
</div>

<h3>Derivation</h3>

<p>Suppose the capacitor already holds charge \\(q\\). The voltage across it is \\(v = q/C\\). To add an infinitesimal charge \\(dq\\), the battery does work \\(dW = v\\,dq = (q/C)\\,dq\\). Integrating from 0 to \\(Q\\):</p>

\\[U = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{Q^2}{2C}\\]

<div class="env-block env-theorem">
<div class="env-header">Energy Stored in a Capacitor</div>
<div class="env-body">
<p>Three equivalent forms (use whichever variables you know):</p>
\\[U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV\\]
</div>
</div>

<h3>Energy Density</h3>

<p>For a parallel-plate capacitor, the energy resides in the uniform field between the plates. The volume of that region is \\(Ad\\), so the energy per unit volume is</p>

\\[u = \\frac{U}{Ad} = \\frac{\\frac{1}{2}CV^2}{Ad} = \\frac{1}{2}\\varepsilon_0 E^2.\\]

<div class="env-block env-theorem">
<div class="env-header">Energy Density of an Electric Field</div>
<div class="env-body">
\\[u = \\frac{1}{2}\\varepsilon_0 E^2\\]
<p>This result is completely general: <em>any</em> electric field carries energy with this density, not just the field inside a capacitor.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="energy-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 4.5</div>
<div class="env-body">
<p>A \\(100\\;\\mu\\text{F}\\) capacitor is charged to 400 V. How much energy is stored?</p>
<p><strong>Solution.</strong> \\(U = \\frac{1}{2}CV^2 = \\frac{1}{2}(10^{-4})(160000) = 8\\) J. Enough to light a small bulb briefly or deliver a painful shock.</p>
</div>
</div>

<div class="env-block env-warning">
<div class="env-header">Safety Warning</div>
<div class="env-body">
<p>Large capacitors charged to high voltage can be lethal. Even after equipment is unplugged, capacitors may retain their charge for minutes or longer. Always discharge capacitors safely before handling circuits.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A \\(47\\;\\mu\\text{F}\\) capacitor stores 0.5 J of energy. What is the voltage across it?',
                    hint: 'Rearrange \\(U = \\frac{1}{2}CV^2\\) to get \\(V = \\sqrt{2U/C}\\).',
                    solution: '\\(V = \\sqrt{2 \\times 0.5 / (47 \\times 10^{-6})} = \\sqrt{21277} \\approx 145.9\\) V.'
                },
                {
                    question: 'Two identical capacitors are charged to the same voltage. One has twice the plate area. Which stores more energy, and by what factor?',
                    hint: 'Doubling the area doubles \\(C\\). Use \\(U = \\frac{1}{2}CV^2\\).',
                    solution: 'The one with twice the area has \\(2C\\), so \\(U = \\frac{1}{2}(2C)V^2 = 2 \\times \\frac{1}{2}CV^2\\). It stores twice the energy.'
                }
            ],
            visualizations: [
                {
                    id: 'energy-viz',
                    title: 'Capacitor Charge/Discharge and Energy',
                    description: 'Watch the capacitor charge up and discharge. The energy bar shows how energy flows between the battery and the electric field. Press Charge/Discharge to toggle.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 300, originY: 200 });
                        var params = { C: 100, Vmax: 12, mode: 'idle', tStart: 0, tau: 0.8 };
                        var state = { V: 0, Q: 0, U: 0 };
                        var t0 = null;
                        var plotPoints = [];

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var t = (timestamp - t0) / 1000;
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Simulate charge/discharge
                            if (params.mode === 'charging') {
                                var dt = t - params.tStart;
                                state.V = params.Vmax * (1 - Math.exp(-dt / params.tau));
                                if (state.V > params.Vmax * 0.999) { state.V = params.Vmax; params.mode = 'charged'; }
                            } else if (params.mode === 'discharging') {
                                var dt2 = t - params.tStart;
                                state.V = params.Vmax * Math.exp(-dt2 / params.tau);
                                if (state.V < params.Vmax * 0.001) { state.V = 0; params.mode = 'idle'; }
                            }

                            var Cfarad = params.C * 1e-6;
                            state.Q = Cfarad * state.V;
                            state.U = 0.5 * Cfarad * state.V * state.V;

                            // Record plot point
                            if (params.mode === 'charging' || params.mode === 'discharging') {
                                plotPoints.push({ t: t, V: state.V, U: state.U });
                                if (plotPoints.length > 600) plotPoints.shift();
                            }

                            // Draw capacitor schematic (center)
                            var plateH = 120;
                            var gap = 60;
                            var plateW = 10;
                            var capCx = W * 0.35;
                            var capCy = H * 0.42;
                            var lx = capCx - gap / 2;
                            var rx = capCx + gap / 2;
                            var ty = capCy - plateH / 2;

                            // Field glow
                            var fillFrac = state.V / Math.max(params.Vmax, 0.01);
                            ctx.fillStyle = 'rgba(88,166,255,' + (fillFrac * 0.2) + ')';
                            ctx.fillRect(lx + plateW, ty, gap - plateW * 2, plateH);

                            // Plates
                            ctx.save();
                            ctx.shadowColor = viz.colors.red;
                            ctx.shadowBlur = 5 + fillFrac * 15;
                            ctx.fillStyle = VizEngine.lerp(0.3, 1.0, fillFrac) > 0.5 ? viz.colors.red : viz.colors.text;
                            ctx.fillStyle = viz.colors.red;
                            ctx.globalAlpha = 0.4 + fillFrac * 0.6;
                            ctx.fillRect(lx, ty, plateW, plateH);
                            ctx.restore();

                            ctx.save();
                            ctx.shadowColor = viz.colors.blue;
                            ctx.shadowBlur = 5 + fillFrac * 15;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.globalAlpha = 0.4 + fillFrac * 0.6;
                            ctx.fillRect(rx, ty, plateW, plateH);
                            ctx.restore();
                            ctx.globalAlpha = 1;

                            // Charge symbols
                            var nC = Math.max(1, Math.floor(fillFrac * 8));
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            for (var ci = 0; ci < nC; ci++) {
                                var cy2 = ty + (ci + 0.5) * plateH / nC;
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('+', lx + plateW + 8, cy2);
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.fillText('\u2013', rx - 8, cy2);
                            }

                            // Energy bar
                            var barX = W * 0.72;
                            var barY = 40;
                            var barW = 40;
                            var barH = H - 100;
                            var maxU = 0.5 * Cfarad * params.Vmax * params.Vmax;

                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barX, barY, barW, barH);

                            var uFrac = maxU > 0 ? state.U / maxU : 0;
                            var fillH = uFrac * barH;
                            var grad = ctx.createLinearGradient(barX, barY + barH, barX, barY + barH - fillH);
                            grad.addColorStop(0, viz.colors.orange);
                            grad.addColorStop(1, viz.colors.yellow);
                            ctx.fillStyle = grad;
                            ctx.fillRect(barX, barY + barH - fillH, barW, fillH);

                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 10 * uFrac;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(barX, barY + barH - fillH, barW, 2);
                            ctx.restore();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Energy', barX + barW / 2, barY - 12);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText((state.U * 1e6).toFixed(1) + ' \u00b5J', barX + barW / 2, barY + barH + 18);

                            // V-t plot (bottom left)
                            var plotX = 20, plotY = H - 70, plotW2 = W * 0.55, plotH2 = 55;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotX, plotY, plotW2, plotH2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V(t)', plotX + 3, plotY - 3);
                            ctx.textAlign = 'right';
                            ctx.fillText(params.Vmax.toFixed(0) + 'V', plotX - 3, plotY + 5);
                            ctx.fillText('0', plotX - 3, plotY + plotH2);

                            if (plotPoints.length > 1) {
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var tMin = plotPoints[0].t;
                                var tMax = plotPoints[plotPoints.length - 1].t;
                                var tRange = Math.max(tMax - tMin, 0.1);
                                for (var pi = 0; pi < plotPoints.length; pi++) {
                                    var px2 = plotX + ((plotPoints[pi].t - tMin) / tRange) * plotW2;
                                    var py2 = plotY + plotH2 - (plotPoints[pi].V / Math.max(params.Vmax, 0.01)) * plotH2;
                                    if (pi === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            // Readouts
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V = ' + state.V.toFixed(2) + ' V', capCx - 60, 22);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Q = ' + (state.Q * 1e6).toFixed(2) + ' \u00b5C', capCx - 60, 40);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('C = ' + params.C + ' \u00b5F', capCx + 70, 22);

                            // Mode label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var modeLabel = params.mode === 'charging' ? 'CHARGING...' : params.mode === 'discharging' ? 'DISCHARGING...' : params.mode === 'charged' ? 'FULLY CHARGED' : 'IDLE';
                            ctx.fillText(modeLabel, capCx, H - 8);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'C (\u00b5F)', 10, 500, params.C, 10, function(v) { params.C = v; });
                        VizEngine.createSlider(controls, 'V_max (V)', 1, 50, params.Vmax, 1, function(v) { params.Vmax = v; });
                        VizEngine.createButton(controls, 'Charge', function() {
                            params.mode = 'charging';
                            params.tStart = (performance.now() - t0) / 1000;
                            state.V = 0;
                            plotPoints = [];
                        });
                        VizEngine.createButton(controls, 'Discharge', function() {
                            if (state.V > 0.01) {
                                params.mode = 'discharging';
                                params.Vmax = state.V;
                                params.tStart = (performance.now() - t0) / 1000;
                                plotPoints = [];
                            }
                        });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 4 ========================
        {
            id: 'dielectrics',
            title: 'Dielectrics',
            content: `
<h2>Dielectrics</h2>

<div class="env-block env-intuition">
<div class="env-header">Filling the Gap</div>
<div class="env-body">
<p>If we slide an insulating material (glass, plastic, paper, ceramic) between the plates of a capacitor, something remarkable happens: the capacitance <em>increases</em>. The material does not conduct charge, but its molecules polarize in the electric field, partially canceling the applied field and allowing the plates to hold more charge at the same voltage.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 4.2 — Dielectric Constant</div>
<div class="env-body">
<p>The <strong>dielectric constant</strong> (or relative permittivity) \\(\\kappa\\) of a material describes how much it reduces the electric field compared to vacuum:</p>
\\[E_{\\text{in material}} = \\frac{E_0}{\\kappa}\\]
<p>where \\(E_0\\) is the field without the dielectric. Always \\(\\kappa \\geq 1\\), with \\(\\kappa = 1\\) for vacuum.</p>
</div>
</div>

<h3>Effect on Capacitance</h3>

<p>Inserting a dielectric fills the gap with a medium of permittivity \\(\\varepsilon = \\kappa \\varepsilon_0\\). The parallel-plate formula becomes:</p>

<div class="env-block env-theorem">
<div class="env-header">Capacitance with a Dielectric</div>
<div class="env-body">
\\[C = \\frac{\\kappa \\varepsilon_0 A}{d} = \\kappa C_0\\]
<p>where \\(C_0\\) is the vacuum capacitance. The dielectric multiplies the capacitance by \\(\\kappa\\).</p>
</div>
</div>

<h3>Two Scenarios</h3>

<p>The consequences depend on whether the battery stays connected:</p>

<div class="env-block env-remark">
<div class="env-header">Battery Connected vs. Disconnected</div>
<div class="env-body">
<p><strong>Battery connected</strong> (constant \\(V\\)): inserting the dielectric increases \\(C\\), so \\(Q = CV\\) increases. The battery supplies extra charge. Energy \\(U = \\frac{1}{2}CV^2\\) increases.</p>
<p><strong>Battery disconnected</strong> (constant \\(Q\\)): inserting the dielectric increases \\(C\\), so \\(V = Q/C\\) decreases. The field weakens. Energy \\(U = Q^2/(2C)\\) decreases (the dielectric is pulled in, doing work).</p>
</div>
</div>

<h3>Common Dielectric Constants</h3>

<table>
<tr><th>Material</th><th>\\(\\kappa\\)</th></tr>
<tr><td>Vacuum</td><td>1 (exact)</td></tr>
<tr><td>Air</td><td>1.0006</td></tr>
<tr><td>Paper</td><td>3.7</td></tr>
<tr><td>Glass</td><td>5 - 10</td></tr>
<tr><td>Water</td><td>80</td></tr>
<tr><td>Barium titanate</td><td>~1200</td></tr>
</table>

<div class="env-block env-example">
<div class="env-header">Example 4.6</div>
<div class="env-body">
<p>A 200 pF air capacitor is filled with glass (\\(\\kappa = 7\\)). What is the new capacitance?</p>
<p><strong>Solution.</strong> \\(C = \\kappa C_0 = 7 \\times 200 = 1400\\) pF.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 4.7</div>
<div class="env-body">
<p>A capacitor is charged to 100 V, then disconnected from the battery. A dielectric with \\(\\kappa = 4\\) is inserted. What is the new voltage?</p>
<p><strong>Solution.</strong> Charge is constant: \\(Q = C_0 \\times 100\\). New capacitance \\(C = 4C_0\\). So \\(V = Q/C = C_0 \\times 100 / (4C_0) = 25\\) V.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A parallel-plate capacitor with air gap has \\(C = 50\\) pF and is charged to 200 V by a battery that remains connected. A dielectric with \\(\\kappa = 5\\) is then inserted. Find the new \\(C\\), \\(Q\\), and \\(U\\).',
                    hint: 'Since the battery stays connected, \\(V\\) is fixed at 200 V. The new \\(C = \\kappa C_0\\).',
                    solution: '\\(C = 5 \\times 50 = 250\\) pF. \\(Q = CV = 250 \\times 10^{-12} \\times 200 = 50\\) nC. \\(U = \\frac{1}{2}CV^2 = \\frac{1}{2}(250 \\times 10^{-12})(200^2) = 5\\;\\mu\\text{J}\\).'
                },
                {
                    question: 'Why does inserting a dielectric into a disconnected capacitor reduce the stored energy? Where does that energy go?',
                    hint: 'Think about what force acts on the dielectric slab as you slide it in.',
                    solution: 'The fringe field at the edge of the plates exerts a force that pulls the dielectric inward. As you release the slab, it accelerates into the gap, converting electrostatic energy into kinetic energy. Eventually friction dissipates this as heat. The "lost" energy did mechanical work pulling the dielectric in.'
                }
            ],
            visualizations: []
        },
        // ======================== Section 5 ========================
        {
            id: 'series-parallel-capacitors',
            title: 'Series & Parallel Capacitors',
            content: `
<h2>Capacitors in Series and Parallel</h2>

<div class="env-block env-intuition">
<div class="env-header">Combining Capacitors</div>
<div class="env-body">
<p>Just as we combine resistors, we can combine capacitors. But the rules are swapped: capacitors in parallel <em>add</em>, while capacitors in series combine via reciprocals (the opposite of resistors).</p>
</div>
</div>

<h3>Parallel Combination</h3>

<p>When capacitors are connected in parallel, they share the same voltage \\(V\\) but store different charges. The total charge is \\(Q = Q_1 + Q_2 + \\cdots\\), so</p>

<div class="env-block env-theorem">
<div class="env-header">Capacitors in Parallel</div>
<div class="env-body">
\\[C_{\\text{eq}} = C_1 + C_2 + C_3 + \\cdots\\]
<p>Parallel capacitors add directly, just like resistors in series.</p>
</div>
</div>

<p>Intuition: parallel capacitors effectively create a bigger plate area. More area means more capacitance.</p>

<h3>Series Combination</h3>

<p>When capacitors are in series, the same charge \\(Q\\) sits on every capacitor (charge conservation on the inner conductors), and the voltages add: \\(V = V_1 + V_2 + \\cdots\\). Since \\(V_i = Q/C_i\\):</p>

<div class="env-block env-theorem">
<div class="env-header">Capacitors in Series</div>
<div class="env-body">
\\[\\frac{1}{C_{\\text{eq}}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3} + \\cdots\\]
<p>The equivalent capacitance is always <em>less</em> than the smallest individual capacitance.</p>
</div>
</div>

<p>Intuition: series capacitors effectively increase the gap between the outermost plates. More separation means less capacitance.</p>

<div class="viz-placeholder" data-viz="series-parallel-cap-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 4.8</div>
<div class="env-body">
<p>Find the equivalent capacitance of 3 \\(\\mu\\text{F}\\) and 6 \\(\\mu\\text{F}\\) in parallel, then in series.</p>
<p><strong>Parallel:</strong> \\(C_{\\text{eq}} = 3 + 6 = 9\\;\\mu\\text{F}\\).</p>
<p><strong>Series:</strong> \\(1/C_{\\text{eq}} = 1/3 + 1/6 = 3/6 = 1/2\\), so \\(C_{\\text{eq}} = 2\\;\\mu\\text{F}\\).</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 4.9</div>
<div class="env-body">
<p>Three identical capacitors \\(C\\) are connected: two in series, and that combination in parallel with the third. Find \\(C_{\\text{eq}}\\).</p>
<p><strong>Solution.</strong> The series pair gives \\(C/2\\). In parallel with \\(C\\): \\(C_{\\text{eq}} = C + C/2 = 3C/2\\).</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Memory Aid</div>
<div class="env-body">
<p>Capacitor combination rules are the <em>opposite</em> of resistor rules: parallel capacitors add (like series resistors), and series capacitors use the reciprocal formula (like parallel resistors). If you remember one, you get the other for free.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'Four identical \\(10\\;\\mu\\text{F}\\) capacitors are available. What is the maximum capacitance you can achieve? The minimum?',
                    hint: 'Maximum: all in parallel. Minimum: all in series.',
                    solution: 'Maximum (all parallel): \\(C_{\\text{eq}} = 4 \\times 10 = 40\\;\\mu\\text{F}\\). Minimum (all series): \\(1/C_{\\text{eq}} = 4/10\\), so \\(C_{\\text{eq}} = 10/4 = 2.5\\;\\mu\\text{F}\\).'
                },
                {
                    question: 'A 12 V battery is connected across two capacitors in series: \\(C_1 = 4\\;\\mu\\text{F}\\) and \\(C_2 = 12\\;\\mu\\text{F}\\). Find the charge on each and the voltage across each.',
                    hint: 'In series, both have the same charge \\(Q = C_{\\text{eq}} V\\). Then \\(V_i = Q/C_i\\).',
                    solution: '\\(C_{\\text{eq}} = (1/4 + 1/12)^{-1} = (4/12)^{-1} = 3\\;\\mu\\text{F}\\). \\(Q = 3 \\times 10^{-6} \\times 12 = 36\\;\\mu\\text{C}\\) on each. \\(V_1 = 36/4 = 9\\) V, \\(V_2 = 36/12 = 3\\) V. Check: \\(9 + 3 = 12\\) V.'
                }
            ],
            visualizations: [
                {
                    id: 'series-parallel-cap-viz',
                    title: 'Series vs. Parallel Capacitors',
                    description: 'Adjust \\(C_1\\) and \\(C_2\\) to see how equivalent capacitance changes for series and parallel combinations. The bar chart compares the three values.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 300, originY: 200 });
                        var params = { C1: 4, C2: 6 };

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            var C1 = params.C1;
                            var C2 = params.C2;
                            var Cpar = C1 + C2;
                            var Cser = (C1 * C2) / (C1 + C2);

                            // --- Parallel diagram (top half) ---
                            var py = 30;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Parallel', 20, py + 12);

                            // Draw parallel circuit
                            var px = 130, pw = 200, ph = 80;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            // Left bus
                            ctx.beginPath(); ctx.moveTo(px, py + 15); ctx.lineTo(px, py + ph - 10); ctx.stroke();
                            // Right bus
                            ctx.beginPath(); ctx.moveTo(px + pw, py + 15); ctx.lineTo(px + pw, py + ph - 10); ctx.stroke();
                            // Top branch (C1)
                            var ty = py + 20;
                            ctx.beginPath(); ctx.moveTo(px, ty); ctx.lineTo(px + pw * 0.35, ty); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.65, ty); ctx.lineTo(px + pw, ty); ctx.stroke();
                            // Cap symbol C1
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.35, ty - 12); ctx.lineTo(px + pw * 0.35, ty + 12); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.65, ty - 12); ctx.lineTo(px + pw * 0.65, ty + 12); ctx.stroke();
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('C\u2081=' + C1.toFixed(1), px + pw * 0.5, ty - 15);

                            // Bottom branch (C2)
                            var by = py + ph - 15;
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(px, by); ctx.lineTo(px + pw * 0.35, by); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.65, by); ctx.lineTo(px + pw, by); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.35, by - 12); ctx.lineTo(px + pw * 0.35, by + 12); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(px + pw * 0.65, by - 12); ctx.lineTo(px + pw * 0.65, by + 12); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('C\u2082=' + C2.toFixed(1), px + pw * 0.5, by + 22);

                            // Result
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('C_eq = C\u2081 + C\u2082 = ' + Cpar.toFixed(1) + ' \u00b5F', px + pw + 30, py + ph / 2 + 5);

                            // --- Series diagram (middle) ---
                            var sy = py + ph + 30;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Series', 20, sy + 12);

                            var sx = 130, sw = 250;
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            // Wire to C1
                            ctx.beginPath(); ctx.moveTo(sx, sy + 8); ctx.lineTo(sx + sw * 0.2, sy + 8); ctx.stroke();
                            // C1
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.2, sy - 4); ctx.lineTo(sx + sw * 0.2, sy + 20); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.3, sy - 4); ctx.lineTo(sx + sw * 0.3, sy + 20); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('C\u2081', sx + sw * 0.25, sy - 10);
                            // Wire between
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.3, sy + 8); ctx.lineTo(sx + sw * 0.6, sy + 8); ctx.stroke();
                            // C2
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.6, sy - 4); ctx.lineTo(sx + sw * 0.6, sy + 20); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.7, sy - 4); ctx.lineTo(sx + sw * 0.7, sy + 20); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('C\u2082', sx + sw * 0.65, sy - 10);
                            // Wire out
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(sx + sw * 0.7, sy + 8); ctx.lineTo(sx + sw, sy + 8); ctx.stroke();

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('1/C_eq = 1/C\u2081 + 1/C\u2082', sx - 110, sy + 45);
                            ctx.fillText('C_eq = ' + Cser.toFixed(2) + ' \u00b5F', sx + sw + 10, sy + 12);

                            // --- Bar chart (bottom) ---
                            var chartY = sy + 70;
                            var chartH = H - chartY - 30;
                            var maxC = Math.max(Cpar, C1, C2) * 1.15;
                            var barW2 = 50;
                            var gap2 = 30;
                            var startX = W / 2 - (4 * barW2 + 3 * gap2) / 2;

                            var items = [
                                { label: 'C\u2081', val: C1, color: viz.colors.orange },
                                { label: 'C\u2082', val: C2, color: viz.colors.teal },
                                { label: 'Series', val: Cser, color: viz.colors.purple },
                                { label: 'Parallel', val: Cpar, color: viz.colors.green }
                            ];

                            for (var i = 0; i < items.length; i++) {
                                var bx = startX + i * (barW2 + gap2);
                                var bh = (items[i].val / maxC) * chartH;
                                ctx.fillStyle = items[i].color + '44';
                                ctx.fillRect(bx, chartY + chartH - bh, barW2, bh);
                                ctx.save();
                                ctx.shadowColor = items[i].color;
                                ctx.shadowBlur = 8;
                                ctx.fillStyle = items[i].color;
                                ctx.fillRect(bx, chartY + chartH - bh, barW2, 3);
                                ctx.restore();
                                ctx.fillStyle = items[i].color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(items[i].label, bx + barW2 / 2, chartY + chartH + 14);
                                ctx.fillText(items[i].val.toFixed(1), bx + barW2 / 2, chartY + chartH - bh - 8);
                            }

                            // Axis
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(startX - 10, chartY + chartH);
                            ctx.lineTo(startX + 4 * (barW2 + gap2), chartY + chartH);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('\u00b5F', startX - 14, chartY + 5);
                        }

                        draw();
                        VizEngine.createSlider(controls, 'C\u2081 (\u00b5F)', 1, 20, params.C1, 0.5, function(v) { params.C1 = v; draw(); });
                        VizEngine.createSlider(controls, 'C\u2082 (\u00b5F)', 1, 20, params.C2, 0.5, function(v) { params.C2 = v; draw(); });

                        return viz;
                    }
                }
            ]
        }
    ]
});
