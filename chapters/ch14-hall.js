// === Chapter 14: The Hall Effect ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'The Hall Effect',
    subtitle: 'When current meets magnetism: charge buildup, Hall voltage, and a window into the nature of carriers',
    sections: [
        // ===== Section 0: Current in a Magnetic Field =====
        {
            id: 'current-in-b',
            title: 'Current in a Magnetic Field',
            content: `
<h2>What Happens Inside the Wire?</h2>

<p>We know that a current-carrying wire in a magnetic field feels a force (\\(F = BIL\\)). But what is really happening at the microscopic level? The magnetic field does not act on the wire directly; it acts on the <strong>moving charges</strong> inside the wire. Understanding this leads to one of the most revealing experiments in physics: the <strong>Hall effect</strong>.</p>

<div class="env-block intuition">
<strong>From macro to micro</strong><br>
The macroscopic force \\(F = BIL\\) on a wire is the sum of billions of tiny forces \\(\\vec{F} = q\\vec{v}_d \\times \\vec{B}\\) on individual charge carriers. Each electron (or hole, in semiconductors) drifting along the wire feels a sideways push from the magnetic field. In a round wire, this push is balanced by the wire's structure. But in a flat conductor (a slab), the sideways push has observable consequences.
</div>

<p>Consider a thin rectangular conducting slab carrying current \\(I\\) in the \\(x\\)-direction, with a magnetic field \\(\\vec{B}\\) applied in the \\(z\\)-direction (perpendicular to the flat face). The charge carriers, moving in \\(x\\) through \\(\\vec{B}\\) in \\(z\\), feel a force in the \\(y\\)-direction (sideways across the slab). This is the Hall effect.</p>

<p>The discovery was made by Edwin Hall in 1879, while he was a graduate student at Johns Hopkins University. Remarkably, it was 18 years before the electron was discovered, and Hall's experiment provided early evidence that current consists of moving charges.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'If the charge carriers in a slab are positive and move to the right through a field pointing into the page, in which direction are they deflected?',
                    hint: 'Use \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) with \\(\\vec{v}\\) to the right and \\(\\vec{B}\\) into the page.',
                    solution: '\\(\\vec{v} = v\\hat{x}\\), \\(\\vec{B} = -B\\hat{z}\\). \\(\\vec{F} = q(v\\hat{x} \\times (-B\\hat{z})) = -qvB(\\hat{x} \\times \\hat{z}) = -qvB(-\\hat{y}) = qvB\\hat{y}\\). The force is in the \\(+y\\) direction (upward, if \\(x\\) is right and \\(z\\) is into the page). Positive carriers are pushed upward.'
                }
            ]
        },

        // ===== Section 1: Charge Deflection =====
        {
            id: 'charge-deflection',
            title: 'Charge Deflection and Buildup',
            content: `
<h2>Charges Pile Up on One Side</h2>

<p>When the magnetic force pushes charge carriers sideways, they accumulate on one face of the slab. This creates a <strong>charge imbalance</strong>: one side becomes negatively charged (excess electrons) and the other becomes positively charged (deficit of electrons). This charge separation creates a transverse electric field \\(\\vec{E}_H\\) inside the slab that opposes further deflection.</p>

<div class="env-block theorem">
<strong>Hall Equilibrium</strong><br>
The charge buildup continues until the electric force balances the magnetic force:
\\[
qE_H = qv_dB
\\]
\\[
E_H = v_dB
\\]
At equilibrium, the net transverse force on each carrier is zero, and the current flows straight through the slab.
</div>

<div class="viz-placeholder" data-viz="ch14-hall-slab"></div>

<div class="env-block remark">
<strong>Sign of the carriers matters</strong><br>
Here is the crucial insight: if the carriers are <strong>negative</strong> (electrons), they move opposite to the conventional current direction. The magnetic force pushes them to the <em>same</em> side as it would push positive carriers moving in the conventional direction. But the <em>charge</em> that accumulates is negative on that side, so the sign of the Hall voltage is reversed. By measuring the sign of the Hall voltage, we can determine whether the charge carriers are positive or negative. This is how we know that current in metals is carried by electrons, and in some semiconductors, by "holes" (effective positive carriers).
</div>
`,
            visualizations: [
                {
                    id: 'ch14-hall-slab',
                    title: 'Hall Effect: Charge Deflection in a Conductor',
                    description: 'Cross-section of a conducting slab carrying current (left to right). A magnetic field B points out of the screen. Watch electrons drift and curve toward the bottom face, building up a Hall voltage across the slab. Adjust B and I.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;

                        var B = 0.5, current = 5;
                        var t = 0;

                        VizEngine.createSlider(controls, 'B (T)', 0, 2.0, 0.5, 0.1, function(v) { B = v; });
                        VizEngine.createSlider(controls, 'I (A)', 0, 15, 5, 0.5, function(v) { current = v; });

                        // Slab dimensions (screen coords)
                        var slabLeft = 80, slabRight = w - 80;
                        var slabTop = cy - 70, slabBot = cy + 70;
                        var slabW = slabRight - slabLeft;
                        var slabH = slabBot - slabTop;

                        // Electrons
                        var electrons = [];
                        var nE = 100;
                        for (var i = 0; i < nE; i++) {
                            electrons.push({
                                x: slabLeft + Math.random() * slabW,
                                y: slabTop + 10 + Math.random() * (slabH - 20),
                                vx: 0,
                                vy: 0
                            });
                        }

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            // Slab body
                            var slabGrad = ctx.createLinearGradient(slabLeft, slabTop, slabLeft, slabBot);
                            slabGrad.addColorStop(0, 'rgba(60,60,100,0.6)');
                            slabGrad.addColorStop(1, 'rgba(40,40,80,0.6)');
                            ctx.fillStyle = slabGrad;
                            ctx.fillRect(slabLeft, slabTop, slabW, slabH);
                            ctx.strokeStyle = '#6a6aaa';
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(slabLeft, slabTop, slabW, slabH);

                            // B field indicators (dots = out of page)
                            if (B > 0.05) {
                                var fieldAlpha = VizEngine.clamp(B * 0.15, 0.02, 0.25);
                                ctx.fillStyle = 'rgba(88,166,255,' + fieldAlpha + ')';
                                for (var fx = slabLeft + 25; fx < slabRight; fx += 40) {
                                    for (var fy = slabTop + 25; fy < slabBot; fy += 35) {
                                        ctx.beginPath();
                                        ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
                                        ctx.fill();
                                        // Small circle around dot
                                        ctx.strokeStyle = 'rgba(88,166,255,' + (fieldAlpha * 0.6) + ')';
                                        ctx.lineWidth = 0.5;
                                        ctx.beginPath();
                                        ctx.arc(fx, fy, 5, 0, Math.PI * 2);
                                        ctx.stroke();
                                    }
                                }
                            }

                            // Current direction arrows along slab (conventional: left to right)
                            ctx.globalAlpha = 0.2;
                            for (var ax = slabLeft + 40; ax < slabRight - 20; ax += 80) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(ax - 15, cy);
                                ctx.lineTo(ax + 15, cy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.moveTo(ax + 15, cy);
                                ctx.lineTo(ax + 8, cy - 4);
                                ctx.lineTo(ax + 8, cy + 4);
                                ctx.closePath();
                                ctx.fill();
                            }
                            ctx.globalAlpha = 1;

                            // Electron drift speed (opposite to conventional current)
                            var driftSpeed = current * 0.15;
                            // Magnetic deflection: electrons move left (v = -x), B out of page (+z)
                            // F = q(v x B) = (-e)(-v_d x_hat) x (B z_hat) = (-e)(-v_d B)(x_hat x z_hat) = (-e)(-v_d B)(-y_hat) = -e*v_d*B*y_hat
                            // Wait: x cross z = -y, so F = (-e)(-v_d*B)(-y_hat) = -e*v_d*B*y_hat ... downward for electrons
                            // Actually let me redo: electrons move to the LEFT (opposite conventional current)
                            // v = -v_d x_hat, B = B z_hat
                            // v x B = (-v_d)(B)(x_hat x z_hat) = -v_d*B*(-y_hat) = v_d*B*y_hat
                            // F = qe*(v x B) = (-e)(v_d*B)(y_hat) = -e*v_d*B y_hat => downward
                            // So electrons accumulate at bottom. Good.

                            var deflectionForce = B * driftSpeed * 0.05;

                            // Update electrons
                            for (var i = 0; i < electrons.length; i++) {
                                var el = electrons[i];
                                // Drift to the left (electron flow, opposite conventional)
                                el.vx = -driftSpeed + (Math.random() - 0.5) * 1.5;
                                // Magnetic force pushes down, but Hall field pushes up near bottom
                                var yFrac = (el.y - slabTop) / slabH; // 0 = top, 1 = bottom
                                var hallRestore = (yFrac - 0.5) * deflectionForce * 2; // restoring from charge buildup
                                el.vy += deflectionForce - hallRestore * B * 0.5;
                                el.vy *= 0.9; // damping
                                el.vy += (Math.random() - 0.5) * 0.5; // thermal noise

                                el.x += el.vx;
                                el.y += el.vy;

                                // Boundaries
                                if (el.x < slabLeft) el.x = slabRight - 1;
                                if (el.x > slabRight) el.x = slabLeft + 1;
                                el.y = VizEngine.clamp(el.y, slabTop + 3, slabBot - 3);

                                // Draw electron
                                var alpha = 0.6 + 0.3 * Math.sin(t * 3 + i);
                                ctx.fillStyle = 'rgba(100,180,255,' + alpha + ')';
                                ctx.beginPath();
                                ctx.arc(el.x, el.y, 3, 0, Math.PI * 2);
                                ctx.fill();
                                // Minus sign
                                ctx.strokeStyle = '#fff';
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                ctx.moveTo(el.x - 1.5, el.y);
                                ctx.lineTo(el.x + 1.5, el.y);
                                ctx.stroke();
                            }

                            // Charge buildup indicators
                            if (B > 0.05 && current > 0.5) {
                                var chargeAlpha = VizEngine.clamp(B * current * 0.02, 0.05, 0.5);
                                // Bottom face: negative (electron accumulation)
                                ctx.fillStyle = 'rgba(80,130,255,' + chargeAlpha + ')';
                                ctx.fillRect(slabLeft, slabBot - 6, slabW, 6);
                                // Minus signs
                                for (var mx = slabLeft + 20; mx < slabRight; mx += 30) {
                                    viz.screenText('\u2013', mx, slabBot + 10, viz.colors.blue, 12);
                                }

                                // Top face: positive (electron deficit)
                                ctx.fillStyle = 'rgba(255,100,80,' + chargeAlpha + ')';
                                ctx.fillRect(slabLeft, slabTop, slabW, 6);
                                for (var px = slabLeft + 20; px < slabRight; px += 30) {
                                    viz.screenText('+', px, slabTop - 10, viz.colors.red, 12);
                                }

                                // Hall voltage arrow
                                var vH = B * driftSpeed * 0.1;
                                ctx.save();
                                ctx.shadowColor = viz.colors.green;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(slabRight + 25, slabBot - 10);
                                ctx.lineTo(slabRight + 25, slabTop + 10);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(slabRight + 25, slabTop + 10);
                                ctx.lineTo(slabRight + 20, slabTop + 18);
                                ctx.lineTo(slabRight + 30, slabTop + 18);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('V_H', slabRight + 42, cy, viz.colors.green, 13);

                                // Voltmeter symbol
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(slabRight + 55, cy, 12, 0, Math.PI * 2);
                                ctx.stroke();
                                viz.screenText('V', slabRight + 55, cy, viz.colors.green, 10);
                            }

                            // Labels
                            viz.screenText('I \u2192 (conventional)', cx, slabTop - 22, viz.colors.yellow, 12);
                            viz.screenText('e\u207b drift \u2190', cx, slabBot + 25, viz.colors.cyan, 10);
                            if (B > 0.05) {
                                viz.screenText('B \u2299 (out of page)', w / 2, 18, viz.colors.blue, 11);
                            }

                            // Info
                            viz.screenText('Electrons pushed DOWN by F = qv\u00d7B', w/2, h - 30, viz.colors.text, 11);
                            viz.screenText('Bottom: \u2013 charge | Top: + charge | V_H across slab', w/2, h - 12, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a metal slab with electrons as carriers, current flows to the right and B points out of the page. Which face accumulates negative charge?',
                    hint: 'Electrons drift to the LEFT (opposite to conventional current). Apply \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) with \\(q = -e\\).',
                    solution: 'Electrons move left: \\(\\vec{v} = -v_d\\hat{x}\\). \\(\\vec{B} = B\\hat{z}\\). \\(\\vec{v} \\times \\vec{B} = -v_dB(\\hat{x} \\times \\hat{z}) = v_dB\\hat{y}\\). \\(\\vec{F} = (-e)(v_dB\\hat{y}) = -ev_dB\\hat{y}\\). Force is in \\(-y\\) direction (downward). Electrons accumulate on the bottom face.'
                }
            ]
        },

        // ===== Section 2: Hall Voltage =====
        {
            id: 'hall-voltage',
            title: 'The Hall Voltage',
            content: `
<h2>Deriving \\(V_H\\)</h2>

<p>The Hall voltage \\(V_H\\) is the potential difference across the slab in the transverse direction. It is measurable and carries information about the magnetic field, the current, and the nature of the charge carriers.</p>

<div class="env-block theorem">
<strong>Hall Voltage</strong><br>
For a slab of thickness \\(d\\) (in the direction of \\(\\vec{B}\\)) and width \\(w\\) (transverse to the current):
\\[
V_H = E_H \\cdot w = v_d B w
\\]
Using the drift velocity relation \\(I = nqv_dA = nqv_d(wd)\\) (where \\(n\\) is the carrier density and \\(A = wd\\) is the cross-sectional area):
\\[
v_d = \\frac{I}{nqwd}
\\]
Substituting:
\\[
V_H = \\frac{IB}{nqd}
\\]
The <strong>Hall coefficient</strong> is defined as:
\\[
R_H = \\frac{1}{nq}
\\]
so \\(V_H = R_H \\cdot IB/d\\).
</div>

<p>Key observations:</p>
<ul>
<li>\\(V_H\\) is proportional to \\(B\\) and \\(I\\), and inversely proportional to the carrier density \\(n\\) and slab thickness \\(d\\).</li>
<li>The <strong>sign</strong> of \\(V_H\\) tells us the sign of the charge carriers. If \\(V_H\\) is positive on the expected side for positive carriers, then carriers are positive (holes). If the sign is reversed, carriers are negative (electrons).</li>
<li>Semiconductors have low \\(n\\), so \\(V_H\\) is large and easily measured. Metals have very high \\(n\\), so \\(V_H\\) is tiny.</li>
</ul>

<div class="env-block example">
<strong>Example: Hall voltage in copper vs silicon</strong><br>
For copper (\\(n \\approx 8.5 \\times 10^{28}\\;\\text{m}^{-3}\\)), \\(I = 10\\;\\text{A}\\), \\(B = 1\\;\\text{T}\\), \\(d = 1\\;\\text{mm}\\):<br>
\\(V_H = \\frac{10 \\times 1}{8.5 \\times 10^{28} \\times 1.6 \\times 10^{-19} \\times 0.001} = \\frac{10}{1.36 \\times 10^7} \\approx 0.74\\;\\mu\\text{V}\\)<br><br>
For doped silicon (\\(n \\approx 10^{21}\\;\\text{m}^{-3}\\)), same conditions:<br>
\\(V_H = \\frac{10}{10^{21} \\times 1.6 \\times 10^{-19} \\times 0.001} = \\frac{10}{0.16} = 62.5\\;\\text{V}\\)<br><br>
The Hall voltage in silicon is nearly \\(10^8\\) times larger than in copper. This is why Hall sensors use semiconductors.
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A Hall probe made of indium antimonide (\\(n = 2 \\times 10^{22}\\;\\text{m}^{-3}\\)) has thickness \\(d = 0.5\\;\\text{mm}\\). If \\(I = 100\\;\\text{mA}\\) and \\(B = 0.3\\;\\text{T}\\), find \\(V_H\\).',
                    hint: 'Use \\(V_H = IB/(nqd)\\).',
                    solution: '\\(V_H = \\frac{0.1 \\times 0.3}{2 \\times 10^{22} \\times 1.6 \\times 10^{-19} \\times 5 \\times 10^{-4}} = \\frac{0.03}{1.6 \\times 10^{-1}} = 0.1875\\;\\text{V} \\approx 188\\;\\text{mV}\\).'
                },
                {
                    question: 'Why is the Hall voltage much larger in semiconductors than in metals?',
                    hint: 'Compare the carrier densities.',
                    solution: 'The Hall voltage is \\(V_H = IB/(nqd)\\). Semiconductors have carrier densities \\(n\\) that are \\(10^4\\) to \\(10^8\\) times smaller than metals. Since \\(V_H \\propto 1/n\\), the Hall voltage is correspondingly larger, making it much easier to measure.'
                }
            ]
        },

        // ===== Section 3: Measuring B with Hall Probes =====
        {
            id: 'hall-probes',
            title: 'Measuring \\(B\\) with Hall Probes',
            content: `
<h2>A Practical Magnetometer</h2>

<p>Since \\(V_H = IB/(nqd)\\), and all the quantities except \\(B\\) can be fixed by the probe design, the Hall voltage is directly proportional to the magnetic field:</p>

\\[
V_H = k_H B
\\]

<p>where \\(k_H = I/(nqd)\\) is a calibration constant for the probe. Measuring \\(V_H\\) gives \\(B\\) directly. This is the principle of the <strong>Hall probe</strong> (or Hall sensor), one of the most common ways to measure magnetic fields.</p>

<div class="env-block definition">
<strong>Hall Probe</strong><br>
A thin semiconductor chip carrying a known current \\(I\\). When placed in a magnetic field \\(B\\), it produces a Hall voltage \\(V_H \\propto B\\). A voltmeter reads \\(V_H\\), and the field is determined from the calibration.
</div>

<h3>Advantages of Hall Probes</h3>
<ul>
<li><strong>Small size</strong>: the active element can be less than 1 mm across, allowing measurement of fields in tight spaces.</li>
<li><strong>Fast response</strong>: no mechanical parts (unlike a compass), so the response is nearly instantaneous.</li>
<li><strong>Linear</strong>: \\(V_H\\) is proportional to \\(B\\) over a wide range.</li>
<li><strong>Measures direction</strong>: the sign of \\(V_H\\) indicates the field polarity.</li>
</ul>

<div class="env-block remark">
<strong>Limitations</strong><br>
Hall probes are sensitive to temperature (the carrier density \\(n\\) changes with temperature), so they require temperature compensation for precision work. They also measure only the component of \\(B\\) perpendicular to the probe face, not the total field. For the total field, three orthogonal probes (or rotation) are needed.
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A Hall probe has calibration constant \\(k_H = 0.05\\;\\text{V/T}\\). It reads \\(V_H = 3.5\\;\\text{mV}\\). What is the magnetic field?',
                    hint: '\\(B = V_H / k_H\\).',
                    solution: '\\(B = V_H / k_H = 3.5 \\times 10^{-3} / 0.05 = 0.070\\;\\text{T} = 70\\;\\text{mT}\\).'
                },
                {
                    question: 'A Hall probe is rotated in a uniform field. At what orientation is the Hall voltage zero?',
                    hint: 'The Hall effect requires a component of B perpendicular to the current.',
                    solution: 'The Hall voltage is zero when the magnetic field is parallel to the current direction (or equivalently, when B has no component perpendicular to the probe face). In this case, the magnetic force on the carriers is along the current direction, not transverse, so there is no charge separation.'
                }
            ]
        },

        // ===== Section 4: Hall Effect Applications =====
        {
            id: 'hall-applications',
            title: 'Hall Effect Applications',
            content: `
<h2>Beyond Measuring Fields</h2>

<p>The Hall effect has applications far beyond simple magnetometers. Here are some of the most important:</p>

<h3>1. Determining Carrier Type and Density</h3>

<p>The sign of the Hall voltage tells us whether the current carriers are positive or negative. In metals, the Hall effect confirms that electrons (negative) carry the current. In p-type semiconductors, the Hall coefficient is positive, indicating that the effective carriers are "holes" (missing electrons that behave like positive charges).</p>

<div class="env-block theorem">
<strong>Carrier Density from Hall Measurements</strong><br>
By measuring \\(V_H\\), \\(I\\), \\(B\\), and \\(d\\), we can determine the carrier density:
\\[
n = \\frac{IB}{|q|V_H d}
\\]
Combined with conductivity measurements (\\(\\sigma = nq\\mu\\)), we can also extract the carrier <strong>mobility</strong> \\(\\mu\\), which measures how easily carriers move through the material.
</div>

<h3>2. Position and Speed Sensing</h3>

<p>Hall sensors detect the presence and motion of magnets. Applications include:</p>
<ul>
<li><strong>Brushless DC motors</strong>: Hall sensors detect the rotor position and trigger the correct coil at the right time.</li>
<li><strong>Automotive speed sensors</strong>: a toothed gear wheel passes a Hall sensor, generating pulses proportional to speed.</li>
<li><strong>Keyboard switches</strong>: some keyboards use Hall effect switches (a magnet on the key activates a Hall sensor), offering precise actuation points and extreme durability.</li>
</ul>

<h3>3. Current Sensing</h3>

<p>A current-carrying wire produces a magnetic field proportional to the current (\\(B = \\mu_0 I/(2\\pi r)\\)). A Hall sensor placed near the wire measures this field and hence the current, without needing to break the circuit. This is the principle of <strong>clamp-on ammeters</strong>.</p>

<h3>4. The Quantum Hall Effect</h3>

<div class="env-block definition">
<strong>The Quantum Hall Effect</strong><br>
At very low temperatures and very high magnetic fields, the Hall resistance becomes <strong>quantized</strong>:
\\[
R_H = \\frac{h}{ne^2}
\\]
where \\(h\\) is Planck's constant, \\(e\\) is the electron charge, and \\(n\\) is an integer. This quantization is so precise that it was used to redefine the standard of electrical resistance. Klaus von Klitzing received the 1985 Nobel Prize for this discovery.
</div>

<div class="env-block intuition">
<strong>Why the Hall effect keeps giving</strong><br>
The Hall effect has been discovered, rediscovered, and extended multiple times. The classical Hall effect (1879) revealed carrier signs. The quantum Hall effect (1980) revealed fundamental constants with extraordinary precision. The fractional quantum Hall effect (1982, Laughlin/Stormer/Tsui, Nobel 1998) revealed entirely new states of matter. The anomalous Hall effect, spin Hall effect, and quantum spin Hall effect continue to drive modern condensed matter physics.
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A Hall measurement on a new material gives \\(V_H = -2.5\\;\\text{mV}\\) when the expected sign for positive carriers would be positive. What can you conclude about the carrier type?',
                    hint: 'The sign of \\(V_H\\) is reversed from the positive-carrier prediction.',
                    solution: 'The negative Hall voltage indicates that the charge carriers are negative (electrons). If the carriers were positive holes, the Hall voltage would be positive under the same conditions. The material is likely an n-type semiconductor or a metal with electron conduction.'
                },
                {
                    question: 'A clamp-on ammeter uses a Hall sensor positioned 2 cm from a wire. If the sensor can detect \\(V_H\\) as small as \\(1\\;\\mu\\text{V}\\) and has \\(k_H = 0.02\\;\\text{V/T}\\), what is the minimum current the ammeter can detect?',
                    hint: '\\(B = \\mu_0 I/(2\\pi r)\\) and \\(V_H = k_H B\\).',
                    solution: '\\(B_{\\min} = V_{H,\\min} / k_H = 10^{-6} / 0.02 = 5 \\times 10^{-5}\\;\\text{T}\\). \\(I = 2\\pi r B / \\mu_0 = 2\\pi \\times 0.02 \\times 5 \\times 10^{-5} / (4\\pi \\times 10^{-7}) = (2 \\times 0.02 \\times 5 \\times 10^{-5}) / (4 \\times 10^{-7}) = 2 \\times 10^{-6} / (4 \\times 10^{-7}) = 5\\;\\text{A}\\). The minimum detectable current is about 5 A.'
                }
            ]
        }
    ]
});
})();
