// === Chapter 5: Current, Resistance & Ohm's Law ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Current, Resistance & Ohm\'s Law',
    subtitle: 'The flow of charge and the opposition it meets',
    sections: [
        // ======================== Section 1 ========================
        {
            id: 'electric-current',
            title: 'Electric Current',
            content: `
<h2>Electric Current</h2>

<div class="env-block env-intuition">
<div class="env-header">Charge in Motion</div>
<div class="env-body">
<p>A charged capacitor stores energy, but to do useful work we need charge to <em>flow</em>. When a conductor connects two points at different potentials, free charges move from high potential to low potential. This steady flow of charge is called an <strong>electric current</strong>, and it is the basis of every circuit.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 5.1 — Electric Current</div>
<div class="env-body">
<p>The <strong>electric current</strong> \\(I\\) through a surface is the rate at which charge passes through that surface:</p>
\\[I = \\frac{dQ}{dt}\\]
<p>Unit: <strong>ampere</strong> (A), where \\(1\\text{ A} = 1\\text{ C/s}\\).</p>
</div>
</div>

<h3>Conventional Current vs. Electron Flow</h3>

<p>Historically, current was defined as the direction positive charges would move: from the positive terminal of a battery, through the external circuit, to the negative terminal. In metals, however, the actual charge carriers are electrons flowing in the <em>opposite</em> direction. The physics works out the same either way, but by convention we draw current arrows in the direction of positive charge flow.</p>

<div class="env-block env-remark">
<div class="env-header">Convention Matters</div>
<div class="env-body">
<p>Conventional current flows from \\(+\\) to \\(-\\) outside the battery. Electron flow is opposite. Both descriptions give identical predictions for circuit behavior. We follow the conventional direction throughout.</p>
</div>
</div>

<h3>Direct Current (DC)</h3>

<p>When the current flows steadily in one direction, we call it <strong>direct current</strong> (DC). A battery produces DC. Later (Chapter 18) we will study alternating current (AC), where the flow direction reverses periodically.</p>

<div class="env-block env-example">
<div class="env-header">Example 5.1</div>
<div class="env-body">
<p>A wire carries a steady current of 2 A. How much charge passes through a cross-section in 30 seconds?</p>
<p><strong>Solution.</strong> \\(Q = It = 2 \\times 30 = 60\\) C.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 5.2</div>
<div class="env-body">
<p>If \\(3.0 \\times 10^{18}\\) electrons pass through a wire in 2 seconds, what is the current?</p>
<p><strong>Solution.</strong> \\(Q = ne = 3.0 \\times 10^{18} \\times 1.6 \\times 10^{-19} = 0.48\\) C. \\(I = Q/t = 0.48/2 = 0.24\\) A.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A phone charger delivers 1.5 A for 2 hours. How much total charge is transferred? How many electrons is that?',
                    hint: 'Convert hours to seconds first. Then \\(Q = It\\) and \\(n = Q/e\\).',
                    solution: '\\(Q = 1.5 \\times 7200 = 10800\\) C. Number of electrons: \\(n = 10800 / (1.6 \\times 10^{-19}) = 6.75 \\times 10^{22}\\).'
                },
                {
                    question: 'The current through a wire varies as \\(I(t) = 3t^2\\) A (with \\(t\\) in seconds). How much charge flows between \\(t = 0\\) and \\(t = 2\\) s?',
                    hint: '\\(Q = \\int_0^2 I(t)\\,dt = \\int_0^2 3t^2\\,dt\\).',
                    solution: '\\(Q = [t^3]_0^2 = 8\\) C.'
                }
            ],
            visualizations: []
        },
        // ======================== Section 2 ========================
        {
            id: 'drift-velocity',
            title: 'Drift Velocity',
            content: `
<h2>Microscopic View: Drift Velocity</h2>

<div class="env-block env-intuition">
<div class="env-header">Fast Signals, Slow Electrons</div>
<div class="env-body">
<p>When you flip a light switch, the light turns on almost instantly. Yet the individual electrons in the wire barely move, creeping along at a fraction of a millimeter per second. How can slow electrons produce a fast response? The answer: the <em>electric field</em> propagates at nearly the speed of light, pushing all electrons in the wire simultaneously, like a tube full of marbles where pushing one in makes another pop out the far end immediately.</p>
</div>
</div>

<h3>The Drude Model</h3>

<p>In a metal, free electrons wander randomly due to thermal energy at speeds of roughly \\(10^5\\) m/s. Without an external field, their random motions cancel out, producing zero net current. When a field \\(\\vec{E}\\) is applied, each electron feels a force \\(\\vec{F} = -e\\vec{E}\\) that gives it a tiny <em>drift</em> in one direction, superimposed on the random thermal motion.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 5.2 — Drift Velocity</div>
<div class="env-body">
<p>The <strong>drift velocity</strong> \\(v_d\\) is the average velocity of charge carriers due to the applied electric field. For a wire of cross-sectional area \\(A\\) with \\(n\\) free carriers per unit volume, each with charge \\(q\\):</p>
\\[I = nqv_d A\\]
</div>
</div>

<p>Rearranging: \\(v_d = I/(nqA)\\). For copper, \\(n \\approx 8.5 \\times 10^{28}\\) m\\(^{-3}\\), so even a current of several amperes produces drift velocities of only \\(\\sim 0.1\\) mm/s.</p>

<div class="viz-placeholder" data-viz="drift-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 5.3</div>
<div class="env-body">
<p>A copper wire (\\(n = 8.5 \\times 10^{28}\\) m\\(^{-3}\\)) has cross-sectional area \\(A = 1.0\\) mm\\(^2\\) and carries \\(I = 3\\) A. Find \\(v_d\\).</p>
<p><strong>Solution.</strong> \\(v_d = I/(neA) = 3 / (8.5 \\times 10^{28} \\times 1.6 \\times 10^{-19} \\times 1.0 \\times 10^{-6}) = 3/(13600) \\approx 2.2 \\times 10^{-4}\\) m/s \\(= 0.22\\) mm/s.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Current Density</div>
<div class="env-body">
<p>We often define the <strong>current density</strong> \\(\\vec{J} = nq\\vec{v}_d\\), with magnitude \\(J = I/A\\). This is a more fundamental quantity than \\(I\\) because it describes the flow at each point in the conductor, not just the total through a cross-section.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'At a drift velocity of 0.1 mm/s, how long would it take an electron to travel 1 meter along a wire?',
                    hint: '\\(t = d/v_d\\).',
                    solution: '\\(t = 1 / (0.1 \\times 10^{-3}) = 10^4\\) s \\(\\approx 2.8\\) hours. Yet the light comes on instantly because the field propagates at \\(\\sim c\\).'
                },
                {
                    question: 'A silver wire (\\(n = 5.86 \\times 10^{28}\\) m\\(^{-3}\\)) of diameter 1.5 mm carries 5 A. Find \\(v_d\\) and \\(J\\).',
                    hint: '\\(A = \\pi r^2\\) with \\(r = 0.75\\) mm. Then \\(v_d = I/(neA)\\) and \\(J = I/A\\).',
                    solution: '\\(A = \\pi (0.75 \\times 10^{-3})^2 = 1.767 \\times 10^{-6}\\) m\\(^2\\). \\(v_d = 5/(5.86 \\times 10^{28} \\times 1.6 \\times 10^{-19} \\times 1.767 \\times 10^{-6}) = 5/16560 \\approx 3.0 \\times 10^{-4}\\) m/s. \\(J = 5/1.767 \\times 10^{-6} \\approx 2.83 \\times 10^6\\) A/m\\(^2\\).'
                }
            ],
            visualizations: [
                {
                    id: 'drift-viz',
                    title: 'Microscopic Electron Drift',
                    description: 'Electrons (cyan) bounce randomly off lattice ions (grey). Apply an electric field to see them slowly drift. The random thermal speed is much larger than the drift velocity.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var W = viz.width, H = viz.height;
                        var params = { E: 2.0 };

                        // Lattice ions
                        var ions = [];
                        var ionSpacing = 40;
                        for (var ix = ionSpacing / 2; ix < W; ix += ionSpacing) {
                            for (var iy = ionSpacing / 2; iy < H; iy += ionSpacing) {
                                ions.push({ x: ix + (Math.random() - 0.5) * 4, y: iy + (Math.random() - 0.5) * 4 });
                            }
                        }

                        // Electrons
                        var nElectrons = 35;
                        var electrons = [];
                        for (var ei = 0; ei < nElectrons; ei++) {
                            var thermalSpeed = 80 + Math.random() * 60;
                            var angle = Math.random() * Math.PI * 2;
                            electrons.push({
                                x: Math.random() * W,
                                y: Math.random() * H,
                                vx: thermalSpeed * Math.cos(angle),
                                vy: thermalSpeed * Math.sin(angle),
                                trail: [],
                                nextCollision: 0.02 + Math.random() * 0.06
                            });
                        }

                        var t0 = null;
                        var prevT = null;

                        function draw(timestamp) {
                            if (t0 === null) { t0 = timestamp; prevT = timestamp; }
                            var dt = Math.min((timestamp - prevT) / 1000, 0.05);
                            prevT = timestamp;

                            viz.clear();
                            var ctx = viz.ctx;

                            // Background wire
                            ctx.fillStyle = '#0d0d25';
                            ctx.fillRect(0, 0, W, H);

                            // Lattice ions
                            for (var li = 0; li < ions.length; li++) {
                                ctx.fillStyle = '#3a3a5a';
                                ctx.beginPath();
                                ctx.arc(ions[li].x, ions[li].y, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = '#5a5a7a';
                                ctx.beginPath();
                                ctx.arc(ions[li].x - 1.5, ions[li].y - 1.5, 2, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // E-field arrow
                            if (params.E > 0.1) {
                                var arrowLen = VizEngine.clamp(params.E * 30, 20, 120);
                                ctx.save();
                                ctx.shadowColor = viz.colors.yellow;
                                ctx.shadowBlur = 10;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(W / 2 - arrowLen / 2, 20);
                                ctx.lineTo(W / 2 + arrowLen / 2, 20);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.moveTo(W / 2 + arrowLen / 2 + 8, 20);
                                ctx.lineTo(W / 2 + arrowLen / 2 - 5, 14);
                                ctx.lineTo(W / 2 + arrowLen / 2 - 5, 26);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('E', W / 2, 12);
                            }

                            // Update and draw electrons
                            var driftAccel = params.E * 600; // px/s^2, exaggerated for visibility

                            for (var ej = 0; ej < electrons.length; ej++) {
                                var e = electrons[ej];

                                // Apply drift acceleration (electrons drift opposite to E)
                                // Conventional E points right, electrons drift left in reality
                                // But for visual clarity, we show them drifting with the field direction
                                // (representing conventional current)
                                e.vx += driftAccel * dt;

                                // Move
                                e.x += e.vx * dt;
                                e.y += e.vy * dt;

                                // Collision timer
                                e.nextCollision -= dt;
                                if (e.nextCollision <= 0) {
                                    // Scatter: randomize velocity direction, keep thermal speed
                                    var speed = 80 + Math.random() * 60;
                                    var a2 = Math.random() * Math.PI * 2;
                                    e.vx = speed * Math.cos(a2);
                                    e.vy = speed * Math.sin(a2);
                                    e.nextCollision = 0.02 + Math.random() * 0.08;
                                }

                                // Periodic boundary
                                if (e.x > W + 10) e.x -= W + 20;
                                if (e.x < -10) e.x += W + 20;
                                if (e.y > H + 10) e.y -= H + 20;
                                if (e.y < -10) e.y += H + 20;

                                // Trail
                                e.trail.push([e.x, e.y]);
                                if (e.trail.length > 20) e.trail.shift();

                                // Draw trail
                                ctx.globalAlpha = 0.3;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 1;
                                for (var ti = 1; ti < e.trail.length; ti++) {
                                    ctx.globalAlpha = 0.05 + (ti / e.trail.length) * 0.25;
                                    ctx.beginPath();
                                    ctx.moveTo(e.trail[ti - 1][0], e.trail[ti - 1][1]);
                                    ctx.lineTo(e.trail[ti][0], e.trail[ti][1]);
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;

                                // Draw electron
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 8;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath();
                                ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();

                                // Minus sign
                                ctx.fillStyle = viz.colors.bg;
                                ctx.font = 'bold 6px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u2013', e.x, e.y);
                            }

                            // Compute average drift for display
                            var avgVx = 0;
                            for (var ek = 0; ek < electrons.length; ek++) {
                                avgVx += electrons[ek].vx;
                            }
                            avgVx /= electrons.length;
                            var driftDisplay = avgVx.toFixed(1);

                            // Info panel
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(8, H - 65, 260, 58);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(8, H - 65, 260, 58);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'alphabetic';
                            ctx.fillText('E = ' + params.E.toFixed(1) + ' (arb. units)', 16, H - 46);
                            ctx.fillStyle = viz.colors.cyan;
                            ctx.fillText('Avg drift v_x = ' + driftDisplay + ' px/s', 16, H - 28);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Thermal speed ~ 100 px/s (random)', 16, H - 12);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'Electric Field E', 0, 5, params.E, 0.1, function(v) { params.E = v; });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 3 ========================
        {
            id: 'resistance-resistivity',
            title: 'Resistance & Resistivity',
            content: `
<h2>Resistance and Resistivity</h2>

<div class="env-block env-intuition">
<div class="env-header">Opposition to Flow</div>
<div class="env-body">
<p>Not all conductors carry current equally well. A thick copper wire offers little opposition; a thin nichrome wire offers much more. We quantify this opposition as <strong>resistance</strong>, a property that depends on both the material and the geometry of the conductor.</p>
</div>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 5.3 — Resistance</div>
<div class="env-body">
<p>The <strong>resistance</strong> \\(R\\) of a conductor is the ratio of the voltage applied across it to the current flowing through it:</p>
\\[R = \\frac{V}{I}\\]
<p>Unit: <strong>ohm</strong> (\\(\\Omega\\)), where \\(1\\;\\Omega = 1\\text{ V/A}\\).</p>
</div>
</div>

<h3>Resistivity</h3>

<p>Resistance depends on geometry. To separate the material property from the shape, we define resistivity:</p>

<div class="env-block env-definition">
<div class="env-header">Definition 5.4 — Resistivity</div>
<div class="env-body">
<p>For a uniform conductor of length \\(L\\) and cross-sectional area \\(A\\):</p>
\\[R = \\rho \\frac{L}{A}\\]
<p>The <strong>resistivity</strong> \\(\\rho\\) (rho) depends only on the material. Unit: \\(\\Omega \\cdot\\)m.</p>
</div>
</div>

<p>This makes intuitive sense: longer wires have more resistance (more lattice for electrons to traverse), and thicker wires have less resistance (more room for current to flow).</p>

<h3>Typical Resistivities</h3>

<table>
<tr><th>Material</th><th>\\(\\rho\\) (\\(\\Omega\\cdot\\)m)</th></tr>
<tr><td>Silver</td><td>\\(1.59 \\times 10^{-8}\\)</td></tr>
<tr><td>Copper</td><td>\\(1.68 \\times 10^{-8}\\)</td></tr>
<tr><td>Aluminium</td><td>\\(2.65 \\times 10^{-8}\\)</td></tr>
<tr><td>Nichrome</td><td>\\(1.10 \\times 10^{-6}\\)</td></tr>
<tr><td>Silicon</td><td>\\(\\sim 640\\)</td></tr>
<tr><td>Glass</td><td>\\(\\sim 10^{12}\\)</td></tr>
</table>

<h3>Temperature Dependence</h3>

<p>For metals, resistivity increases with temperature because thermal vibrations scatter electrons more frequently:</p>

\\[\\rho(T) = \\rho_0 \\bigl[1 + \\alpha(T - T_0)\\bigr]\\]

<p>where \\(\\alpha\\) is the <strong>temperature coefficient of resistivity</strong> (typically \\(\\sim 4 \\times 10^{-3}\\) K\\(^{-1}\\) for metals).</p>

<div class="env-block env-example">
<div class="env-header">Example 5.4</div>
<div class="env-body">
<p>A copper wire is 5 m long with diameter 0.8 mm. Find its resistance at room temperature.</p>
<p><strong>Solution.</strong> \\(A = \\pi (0.4 \\times 10^{-3})^2 = 5.03 \\times 10^{-7}\\) m\\(^2\\). \\(R = 1.68 \\times 10^{-8} \\times 5 / (5.03 \\times 10^{-7}) = 0.167\\;\\Omega\\).</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'If you double the length and halve the diameter of a wire, by what factor does the resistance change?',
                    hint: 'Halving diameter means area goes to \\(1/4\\). Then \\(R = \\rho L / A\\).',
                    solution: 'New \\(R = \\rho (2L) / (A/4) = 8 \\rho L / A = 8R\\). Resistance increases by a factor of 8.'
                },
                {
                    question: 'A tungsten filament has \\(R = 10\\;\\Omega\\) at 20\\(^\\circ\\)C. If \\(\\alpha = 4.5 \\times 10^{-3}\\) K\\(^{-1}\\), what is \\(R\\) at 2500\\(^\\circ\\)C?',
                    hint: 'Use \\(R(T) = R_0[1 + \\alpha \\Delta T]\\).',
                    solution: '\\(R = 10[1 + 4.5 \\times 10^{-3} \\times 2480] = 10[1 + 11.16] = 121.6\\;\\Omega\\). The resistance increases more than tenfold. This is why incandescent bulb filaments draw much less current once hot.'
                }
            ],
            visualizations: []
        },
        // ======================== Section 4 ========================
        {
            id: 'ohms-law',
            title: 'Ohm\'s Law',
            content: `
<h2>Ohm's Law</h2>

<div class="env-block env-intuition">
<div class="env-header">The Simplest Circuit Law</div>
<div class="env-body">
<p>Georg Simon Ohm discovered experimentally (1827) that for many conductors, the current is directly proportional to the applied voltage. This linear relationship, so simple yet so powerful, is the foundation of circuit analysis.</p>
</div>
</div>

<div class="env-block env-theorem">
<div class="env-header">Ohm's Law</div>
<div class="env-body">
\\[V = IR\\]
<p>For an <strong>ohmic</strong> material, the resistance \\(R\\) is constant (independent of \\(V\\) and \\(I\\)). The \\(V\\)-\\(I\\) graph is a straight line through the origin.</p>
</div>
</div>

<p>Ohm's law can be rearranged three ways depending on what you need:</p>
<ul>
<li>\\(V = IR\\) (find voltage given current and resistance)</li>
<li>\\(I = V/R\\) (find current given voltage and resistance)</li>
<li>\\(R = V/I\\) (find resistance given voltage and current)</li>
</ul>

<div class="viz-placeholder" data-viz="ohm-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 5.5</div>
<div class="env-body">
<p>A 12 V battery drives current through a \\(240\\;\\Omega\\) resistor. What current flows?</p>
<p><strong>Solution.</strong> \\(I = V/R = 12/240 = 0.05\\) A \\(= 50\\) mA.</p>
</div>
</div>

<div class="env-block env-example">
<div class="env-header">Example 5.6</div>
<div class="env-body">
<p>A 0.3 A current flows through a resistor when 6 V is applied. What is the resistance? How much current would flow at 15 V?</p>
<p><strong>Solution.</strong> \\(R = V/I = 6/0.3 = 20\\;\\Omega\\). At 15 V: \\(I = 15/20 = 0.75\\) A.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Ohm's Law is Empirical, Not Universal</div>
<div class="env-body">
<p>Ohm's law is not a fundamental law of nature; it is an empirical observation that works very well for metals at constant temperature. Many devices (diodes, transistors, gas discharge tubes) are <em>non-ohmic</em>: their \\(V\\)-\\(I\\) curve is not a straight line.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'An electric heater draws 10 A from a 230 V outlet. What is its resistance?',
                    hint: 'Use \\(R = V/I\\).',
                    solution: '\\(R = 230/10 = 23\\;\\Omega\\).'
                },
                {
                    question: 'A student measures the following data for a resistor: (2 V, 0.10 A), (4 V, 0.20 A), (6 V, 0.29 A), (8 V, 0.40 A). Is this resistor ohmic? Estimate \\(R\\).',
                    hint: 'Check if \\(V/I\\) is roughly constant.',
                    solution: '\\(V/I\\) ratios: 20, 20, 20.7, 20. These are nearly constant, so the resistor is approximately ohmic. \\(R \\approx 20\\;\\Omega\\) (the 6 V point deviates slightly, likely measurement error).'
                }
            ],
            visualizations: [
                {
                    id: 'ohm-viz',
                    title: 'V-I Characteristic Plotter',
                    description: 'Set the resistance, then sweep the voltage to plot V vs. I. The slope of the line gives R. Compare ohmic (straight) vs. non-ohmic (curved) behavior.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {
                            scale: 25, originX: 80, originY: null
                        });
                        viz.originY = viz.height - 60;
                        var params = { R: 20, V: 0, mode: 'ohmic' };
                        var dataPoints = [];
                        var sweepActive = false;
                        var sweepT = 0;
                        var t0 = null;

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            var t = (timestamp - t0) / 1000;
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Axes
                            var ox = 80, oy = H - 60;
                            var axW = W - 120, axH = H - 100;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 10; gx++) {
                                var xx = ox + gx * axW / 10;
                                ctx.beginPath(); ctx.moveTo(xx, oy); ctx.lineTo(xx, oy - axH); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 8; gy++) {
                                var yy = oy - gy * axH / 8;
                                ctx.beginPath(); ctx.moveTo(ox, yy); ctx.lineTo(ox + axW, yy); ctx.stroke();
                            }

                            // Axis lines
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + axW + 10, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - axH - 10); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = 'italic 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V (volts)', ox + axW / 2, oy + 35);
                            ctx.save();
                            ctx.translate(ox - 40, oy - axH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('I (amps)', 0, 0);
                            ctx.restore();

                            // Tick labels
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var maxV = 20;
                            for (var tx = 0; tx <= 10; tx++) {
                                ctx.fillText((tx * maxV / 10).toFixed(0), ox + tx * axW / 10, oy + 4);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var maxI = 2.0;
                            for (var ty = 0; ty <= 8; ty++) {
                                ctx.fillText((ty * maxI / 8).toFixed(2), ox - 6, oy - ty * axH / 8);
                            }

                            // Theoretical line (for ohmic)
                            if (params.mode === 'ohmic') {
                                ctx.strokeStyle = viz.colors.purple + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(ox, oy);
                                var endI = maxV / params.R;
                                var endPy = oy - (endI / maxI) * axH;
                                ctx.lineTo(ox + axW, endPy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                var labelI = maxV / params.R;
                                if (labelI > maxI) {
                                    ctx.fillText('R = ' + params.R.toFixed(0) + ' \u03a9', ox + axW + 5, oy - axH - 5);
                                } else {
                                    ctx.fillText('R = ' + params.R.toFixed(0) + ' \u03a9', ox + axW + 5, endPy);
                                }
                            }

                            // Sweep voltage
                            if (sweepActive) {
                                sweepT += 0.03;
                                params.V = Math.min(sweepT * 2, maxV);
                                var current;
                                if (params.mode === 'ohmic') {
                                    current = params.V / params.R;
                                } else {
                                    // Diode-like: I = I_s(exp(V/V_t) - 1)
                                    current = 0.001 * (Math.exp(params.V / 2.5) - 1);
                                }
                                current = VizEngine.clamp(current, 0, maxI * 1.5);
                                dataPoints.push({ V: params.V, I: current });
                                if (params.V >= maxV) sweepActive = false;
                            }

                            // Draw data points
                            for (var di = 0; di < dataPoints.length; di++) {
                                var dp = dataPoints[di];
                                var px = ox + (dp.V / maxV) * axW;
                                var py = oy - (dp.I / maxI) * axH;
                                py = VizEngine.clamp(py, oy - axH, oy);
                                ctx.save();
                                ctx.shadowColor = viz.colors.green;
                                ctx.shadowBlur = 6;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.arc(px, py, 3, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                            }

                            // Connect points with line
                            if (dataPoints.length > 1) {
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var pi = 0; pi < dataPoints.length; pi++) {
                                    var ppx = ox + (dataPoints[pi].V / maxV) * axW;
                                    var ppy = oy - (dataPoints[pi].I / maxI) * axH;
                                    ppy = VizEngine.clamp(ppy, oy - axH, oy);
                                    if (pi === 0) ctx.moveTo(ppx, ppy);
                                    else ctx.lineTo(ppx, ppy);
                                }
                                ctx.stroke();
                            }

                            // Current voltage marker
                            if (sweepActive && dataPoints.length > 0) {
                                var last = dataPoints[dataPoints.length - 1];
                                var lx = ox + (last.V / maxV) * axW;
                                var ly = oy - (last.I / maxI) * axH;
                                ly = VizEngine.clamp(ly, oy - axH, oy);
                                ctx.save();
                                ctx.shadowColor = viz.colors.yellow;
                                ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(lx, ly, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                            }

                            // Readout
                            var currentI = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].I : 0;
                            var currentV = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].V : 0;
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(W - 180, 10, 170, 58);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(W - 180, 10, 170, 58);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V = ' + currentV.toFixed(2) + ' V', W - 170, 28);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('I = ' + currentI.toFixed(3) + ' A', W - 170, 46);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Mode: ' + (params.mode === 'ohmic' ? 'Ohmic' : 'Non-ohmic (diode)'), W - 170, 62);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'R (\u03a9)', 5, 100, params.R, 1, function(v) { params.R = v; });
                        VizEngine.createButton(controls, 'Sweep V (Ohmic)', function() {
                            params.mode = 'ohmic';
                            dataPoints = [];
                            sweepT = 0;
                            sweepActive = true;
                        });
                        VizEngine.createButton(controls, 'Sweep V (Non-ohmic)', function() {
                            params.mode = 'nonohmic';
                            dataPoints = [];
                            sweepT = 0;
                            sweepActive = true;
                        });
                        VizEngine.createButton(controls, 'Clear', function() {
                            dataPoints = [];
                            sweepActive = false;
                        });

                        return viz;
                    }
                }
            ]
        },
        // ======================== Section 5 ========================
        {
            id: 'non-ohmic-devices',
            title: 'Non-Ohmic Devices',
            content: `
<h2>Non-Ohmic Devices</h2>

<div class="env-block env-intuition">
<div class="env-header">When Lines Become Curves</div>
<div class="env-body">
<p>Ohm's law describes an ideal world where resistance is constant. Real devices often break this rule. A tungsten filament bulb has a resistance that increases tenfold as it heats up. A semiconductor diode conducts easily in one direction but barely at all in the other. Understanding non-ohmic behavior is essential for modern electronics.</p>
</div>
</div>

<h3>The Incandescent Bulb</h3>

<p>A light bulb's tungsten filament heats from ~300 K to ~3000 K during operation. Since metal resistivity increases with temperature (\\(\\rho \\propto T\\) roughly), the resistance at operating temperature is about 10 times the cold resistance. The V-I graph curves upward: at higher voltages the filament is hotter, \\(R\\) is larger, and the current grows slower than linear.</p>

<h3>The Diode</h3>

<p>A semiconductor diode allows current to flow easily in one direction (<strong>forward bias</strong>) but blocks it in the other (<strong>reverse bias</strong>). The V-I characteristic is exponential:</p>

\\[I = I_s\\left(e^{V/(nV_T)} - 1\\right)\\]

<p>where \\(I_s\\) is the reverse saturation current, \\(n\\) is the ideality factor (\\(\\approx 1\\) to 2), and \\(V_T = kT/q \\approx 26\\) mV at room temperature.</p>

<div class="env-block env-definition">
<div class="env-header">Definition 5.5 — Ohmic vs. Non-Ohmic</div>
<div class="env-body">
<p>A device is <strong>ohmic</strong> if its V-I graph is a straight line through the origin (constant \\(R\\)). It is <strong>non-ohmic</strong> if the graph is curved.</p>
</div>
</div>

<h3>Other Non-Ohmic Devices</h3>

<ul>
<li><strong>Thermistor:</strong> Resistance decreases sharply with temperature (NTC type) or increases (PTC type). Used in temperature sensing.</li>
<li><strong>LDR (Light-Dependent Resistor):</strong> Resistance decreases with increasing light intensity.</li>
<li><strong>Varistor:</strong> Resistance drops dramatically above a threshold voltage. Used for surge protection.</li>
</ul>

<div class="viz-placeholder" data-viz="nonohmic-viz"></div>

<div class="env-block env-example">
<div class="env-header">Example 5.7</div>
<div class="env-body">
<p>A light bulb has cold resistance 20 \\(\\Omega\\) and operating resistance 200 \\(\\Omega\\) at 230 V. What is the current at the moment the switch is closed, and after the filament reaches operating temperature?</p>
<p><strong>Solution.</strong> Initial: \\(I_0 = 230/20 = 11.5\\) A (a large inrush current). Operating: \\(I = 230/200 = 1.15\\) A. The inrush current is ten times the steady-state current, which is why bulbs often burn out at switch-on.</p>
</div>
</div>

<div class="env-block env-remark">
<div class="env-header">Practical Implication</div>
<div class="env-body">
<p>The temperature dependence of resistance is not merely an inconvenience; it is the basis of resistance thermometers (RTDs) that measure temperature with great precision by monitoring how \\(R\\) changes.</p>
</div>
</div>
`,
            exercises: [
                {
                    question: 'A silicon diode has \\(I_s = 10^{-12}\\) A and \\(n = 1\\). At room temperature (\\(V_T = 26\\) mV), find the current at \\(V = 0.6\\) V forward bias.',
                    hint: 'Use \\(I = I_s(e^{V/(nV_T)} - 1)\\). The exponential will be huge.',
                    solution: '\\(V/(nV_T) = 0.6/0.026 \\approx 23.1\\). \\(I = 10^{-12}(e^{23.1} - 1) \\approx 10^{-12} \\times 1.08 \\times 10^{10} \\approx 0.011\\) A \\(= 11\\) mA.'
                },
                {
                    question: 'Sketch (describe) the V-I curve for: (a) a metal wire at constant temperature, (b) a filament lamp, (c) a diode. Which is ohmic?',
                    hint: 'Think about how R changes with current for each device.',
                    solution: '(a) Straight line through origin (ohmic). (b) Curve that bends toward the V-axis as V increases (R increases with temperature from I\\(^2\\)R heating). (c) Nearly zero current for V < 0 (reverse bias), then exponential rise for V > 0.6 V (forward). Only (a) is ohmic.'
                }
            ],
            visualizations: [
                {
                    id: 'nonohmic-viz',
                    title: 'Temperature Effect on Resistance',
                    description: 'A wire heats up as current flows through it. Watch the V-I curve deviate from the ideal ohmic line (dashed) as the temperature-dependent resistance kicks in.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 25, originX: 80, originY: null });
                        viz.originY = viz.height - 60;
                        var params = { R0: 10, alpha: 0.004, V: 0 };
                        var t0 = null;

                        function draw(timestamp) {
                            if (t0 === null) t0 = timestamp;
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var ox = 80, oy = H - 60;
                            var axW = W - 130, axH = H - 100;
                            var maxV = 30, maxI = 3.0;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 10; gx++) {
                                var xx = ox + gx * axW / 10;
                                ctx.beginPath(); ctx.moveTo(xx, oy); ctx.lineTo(xx, oy - axH); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 6; gy++) {
                                var yy = oy - gy * axH / 6;
                                ctx.beginPath(); ctx.moveTo(ox, yy); ctx.lineTo(ox + axW, yy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + axW + 10, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - axH - 10); ctx.stroke();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = 'italic 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V (volts)', ox + axW / 2, oy + 35);

                            // Ideal ohmic line (dashed)
                            ctx.strokeStyle = viz.colors.green + '55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(ox, oy);
                            var idealEnd = maxV / params.R0;
                            var endPy = oy - (idealEnd / maxI) * axH;
                            endPy = VizEngine.clamp(endPy, oy - axH, oy);
                            ctx.lineTo(ox + axW, endPy);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Ideal (no heating)', ox + axW + 4, endPy);

                            // Non-ohmic curve: as current flows, P = I^2 R heats the wire
                            // Temperature rise approx proportional to P, so T = T0 + k * I^2 * R0
                            // R(T) = R0 * (1 + alpha * delta_T)
                            // We solve iteratively: at voltage V, I = V/R(T) where T depends on I
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = 200;
                            var thermalK = 50; // how much temperature rises per watt
                            for (var si = 0; si <= steps; si++) {
                                var vv = si * maxV / steps;
                                // Iterative solve
                                var ii = vv / params.R0; // initial guess
                                for (var iter = 0; iter < 10; iter++) {
                                    var power = ii * ii * params.R0;
                                    var dT = thermalK * power;
                                    var Reff = params.R0 * (1 + params.alpha * dT);
                                    ii = vv / Reff;
                                }
                                var spx = ox + (vv / maxV) * axW;
                                var spy = oy - (ii / maxI) * axH;
                                spy = VizEngine.clamp(spy, oy - axH, oy);
                                if (si === 0) ctx.moveTo(spx, spy);
                                else ctx.lineTo(spx, spy);
                            }
                            ctx.stroke();

                            // Current point
                            var curV = params.V;
                            var curI = curV / params.R0;
                            for (var it2 = 0; it2 < 10; it2++) {
                                var p2 = curI * curI * params.R0;
                                var dT2 = thermalK * p2;
                                var R2 = params.R0 * (1 + params.alpha * dT2);
                                curI = curV / R2;
                            }
                            var Rcur = curV / (curI + 1e-12);
                            var Tcur = 20 + thermalK * curI * curI * params.R0;

                            var cpx = ox + (curV / maxV) * axW;
                            var cpy = oy - (curI / maxI) * axH;
                            cpy = VizEngine.clamp(cpy, oy - axH, oy);

                            ctx.save();
                            ctx.shadowColor = viz.colors.yellow;
                            ctx.shadowBlur = 15;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(cpx, cpy, 7, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();

                            // Wire glow visualization (right side)
                            var wireX = W - 35, wireY1 = 40, wireY2 = H - 80;
                            var heatFrac = VizEngine.clamp((Tcur - 20) / 3000, 0, 1);
                            var hue = VizEngine.lerp(200, 0, heatFrac);
                            var lightness = VizEngine.lerp(30, 65, heatFrac);
                            ctx.save();
                            ctx.shadowColor = VizEngine.hsl(hue, 80, lightness);
                            ctx.shadowBlur = 5 + heatFrac * 25;
                            ctx.strokeStyle = VizEngine.hsl(hue, 80, lightness);
                            ctx.lineWidth = 6;
                            ctx.beginPath();
                            ctx.moveTo(wireX, wireY1);
                            ctx.lineTo(wireX, wireY2);
                            ctx.stroke();
                            ctx.restore();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Wire', wireX, wireY1 - 8);
                            ctx.fillText(Tcur.toFixed(0) + '\u00b0C', wireX, wireY2 + 14);

                            // Readout
                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(ox + 5, 10, 200, 72);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(ox + 5, 10, 200, 72);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V = ' + curV.toFixed(1) + ' V', ox + 12, 28);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('I = ' + curI.toFixed(3) + ' A', ox + 12, 44);
                            ctx.fillStyle = viz.colors.cyan;
                            ctx.fillText('R(T) = ' + Rcur.toFixed(1) + ' \u03a9', ox + 12, 60);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('T = ' + Tcur.toFixed(0) + '\u00b0C', ox + 12, 76);
                        }

                        viz.animate(draw);

                        VizEngine.createSlider(controls, 'R\u2080 (\u03a9)', 2, 50, params.R0, 1, function(v) { params.R0 = v; });
                        VizEngine.createSlider(controls, '\u03b1 (K\u207b\u00b9)', 0.001, 0.01, params.alpha, 0.001, function(v) { params.alpha = v; });
                        VizEngine.createSlider(controls, 'Voltage V', 0, 30, params.V, 0.5, function(v) { params.V = v; });

                        return viz;
                    }
                }
            ]
        }
    ]
});
