// === Chapter 11: Magnetic Field of Currents ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Magnetic Field of Currents',
    subtitle: "From Oersted's surprise to the solenoid: how moving charges create magnetic fields",
    sections: [
        // ===== Section 0: Oersted's Discovery =====
        {
            id: 'oersted',
            title: "Oersted's Discovery",
            content: `
<h2>The Link Between Electricity and Magnetism</h2>

<p>In 1820, the Danish physicist Hans Christian Oersted made one of the most important accidental discoveries in the history of science. While preparing a lecture demonstration, he noticed that a compass needle deflected when he turned on a nearby electric current. <em>Electricity creates magnetism.</em></p>

<div class="env-block intuition">
<strong>Why this was revolutionary</strong><br>
Before Oersted, electricity and magnetism were considered completely unrelated phenomena. Coulomb himself had declared them independent. Oersted's simple observation (a wire carrying current deflects a compass) shattered this assumption and launched the field of electromagnetism. Within months, Ampere, Biot, and Savart had developed the mathematical theory.
</div>

<p>Oersted's observation leads to a fundamental principle: <strong>a moving charge (current) creates a magnetic field</strong> in the space around it. This is the magnetic analog of the fact that a charge creates an electric field. But the geometry is different: while the electric field of a charge points radially outward (or inward), the magnetic field of a current <em>wraps around</em> the wire in circles.</p>

<div class="env-block definition">
<strong>Oersted's Principle</strong><br>
An electric current produces a magnetic field. The field lines form closed loops around the current. The direction of the field is given by the <strong>right-hand rule</strong>: point your right thumb in the direction of the current, and your curling fingers show the direction of the magnetic field.
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Before Oersted, a scientist claimed that electric and magnetic phenomena are completely independent. In one sentence, describe the observation that disproved this.',
                    hint: 'What did Oersted see?',
                    solution: 'Oersted observed that a compass needle was deflected by a nearby current-carrying wire, proving that electric current produces a magnetic field.'
                }
            ]
        },

        // ===== Section 1: Field of a Long Straight Wire =====
        {
            id: 'long-wire',
            title: 'Field of a Long Straight Wire',
            content: `
<h2>The Simplest Current Configuration</h2>

<p>Consider a long straight wire carrying current \\(I\\). What magnetic field does it produce? Biot, Savart, and Ampere worked this out in 1820. The result, derivable from the Biot-Savart law or Ampere's law, is elegant:</p>

<div class="env-block theorem">
<strong>Magnetic Field of a Long Straight Wire</strong><br>
At perpendicular distance \\(r\\) from an infinitely long straight wire carrying current \\(I\\):
\\[
B = \\frac{\\mu_0 I}{2\\pi r}
\\]
where \\(\\mu_0 = 4\\pi \\times 10^{-7}\\;\\text{T}\\cdot\\text{m/A}\\) is the <strong>permeability of free space</strong>. The field lines are concentric circles centered on the wire. The direction follows the right-hand rule.
</div>

<p>Key features of this result:</p>
<ul>
<li>\\(B\\) is proportional to the current \\(I\\): double the current, double the field.</li>
<li>\\(B\\) decreases as \\(1/r\\): the field weakens with distance, but slowly (like the electric field of an infinite line charge).</li>
<li>The field lines are circles, not lines emanating from a source. This is qualitatively different from the radial electric field of a point charge.</li>
</ul>

<div class="viz-placeholder" data-viz="ch11-wire-field"></div>

<div class="env-block example">
<strong>Example: Field near a household wire</strong><br>
A wire carries 10 A. What is \\(B\\) at 5 cm distance?<br><br>
\\(B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{4\\pi \\times 10^{-7} \\times 10}{2\\pi \\times 0.05} = \\frac{4 \\times 10^{-6}}{0.1} = 4 \\times 10^{-5}\\;\\text{T} = 40\\;\\mu\\text{T}\\)<br><br>
This is comparable to Earth's magnetic field. A strong current at close range produces a measurable field.
</div>
`,
            visualizations: [
                {
                    id: 'ch11-wire-field',
                    title: 'Magnetic Field Around a Current-Carrying Wire',
                    description: 'Current flows upward through the center (out of the screen, shown as a dot). Concentric rings show the circular magnetic field lines. Adjust the current to see the field strength change.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var current = 10;
                        var t = 0;

                        VizEngine.createSlider(controls, 'Current I (A)', -20, 20, 10, 1, function(v) { current = v; });

                        // Particles flowing around the wire
                        var particles = [];
                        var nP = 180;
                        for (var i = 0; i < nP; i++) {
                            var angle = Math.random() * Math.PI * 2;
                            var radius = 30 + Math.random() * (Math.min(w, h) * 0.42);
                            particles.push({
                                angle: angle,
                                radius: radius,
                                speed: (0.5 + Math.random() * 0.5)
                            });
                        }

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            var absI = Math.abs(current);
                            var dir = current >= 0 ? 1 : -1;

                            // Draw concentric field lines
                            var nRings = 8;
                            for (var ri = 1; ri <= nRings; ri++) {
                                var rr = ri * Math.min(w, h) * 0.05;
                                var alpha = VizEngine.clamp(0.08 + absI * 0.005, 0, 0.25);
                                ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, rr, 0, Math.PI * 2);
                                ctx.stroke();

                                // Direction arrows on rings
                                if (absI > 0.5) {
                                    var nArrows = 4;
                                    for (var ai = 0; ai < nArrows; ai++) {
                                        var aa = (ai / nArrows) * Math.PI * 2 + t * dir * 0.3;
                                        var ax = cx + rr * Math.cos(aa);
                                        var ay = cy + rr * Math.sin(aa);
                                        // Tangent direction
                                        var tx = -Math.sin(aa) * dir;
                                        var ty = Math.cos(aa) * dir;
                                        var hs = 5;
                                        ctx.fillStyle = 'rgba(88,166,255,' + (alpha * 3) + ')';
                                        ctx.beginPath();
                                        ctx.moveTo(ax + tx * hs, ay + ty * hs);
                                        ctx.lineTo(ax - tx * hs * 0.5 + ty * hs * 0.5, ay - ty * hs * 0.5 - tx * hs * 0.5);
                                        ctx.lineTo(ax - tx * hs * 0.5 - ty * hs * 0.5, ay - ty * hs * 0.5 + tx * hs * 0.5);
                                        ctx.closePath();
                                        ctx.fill();
                                    }
                                }
                            }

                            // Animate particles flowing around the wire
                            if (absI > 0.5) {
                                for (var i = 0; i < particles.length; i++) {
                                    var p = particles[i];
                                    var angularSpeed = dir * p.speed * absI * 0.003 / (p.radius / 100);
                                    p.angle += angularSpeed;

                                    var px = cx + p.radius * Math.cos(p.angle);
                                    var py = cy + p.radius * Math.sin(p.angle);

                                    var fieldStrength = VizEngine.clamp(absI / (p.radius * 0.05), 0, 1);
                                    var alpha2 = fieldStrength * 0.7;
                                    var sz = 1.2 + fieldStrength * 1.5;
                                    ctx.fillStyle = 'rgba(88,200,255,' + alpha2 + ')';
                                    ctx.beginPath();
                                    ctx.arc(px, py, sz, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Wire cross-section (current coming out of screen)
                            var wireGlow = ctx.createRadialGradient(cx, cy, 3, cx, cy, 25);
                            wireGlow.addColorStop(0, current > 0 ? 'rgba(255,200,80,0.4)' : (current < 0 ? 'rgba(255,80,80,0.4)' : 'rgba(150,150,150,0.2)'));
                            wireGlow.addColorStop(1, 'rgba(0,0,0,0)');
                            ctx.fillStyle = wireGlow;
                            ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2); ctx.fill();

                            ctx.fillStyle = '#333';
                            ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = '#888';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.stroke();

                            if (current > 0) {
                                // Dot (current out of page)
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
                            } else if (current < 0) {
                                // X (current into page)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx - 5, cy - 5); ctx.lineTo(cx + 5, cy + 5); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx + 5, cy - 5); ctx.lineTo(cx - 5, cy + 5); ctx.stroke();
                            }

                            // B field magnitude indicator
                            var bAtR = absI > 0 ? (4 * Math.PI * 1e-7 * absI / (2 * Math.PI * 0.05)) : 0;
                            viz.screenText('I = ' + current.toFixed(0) + ' A  ' + (current > 0 ? '(out of page)' : current < 0 ? '(into page)' : '(off)'), w/2, 20, viz.colors.white, 12);
                            viz.screenText('B at 5 cm = ' + (bAtR * 1e6).toFixed(1) + ' \u00b5T', w/2, 38, viz.colors.cyan, 11);
                            viz.screenText('Right-hand rule: thumb \u2192 current, fingers \u2192 B direction', w/2, h - 14, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At what distance from a wire carrying 5 A is the magnetic field equal to \\(10\\;\\mu\\text{T}\\)?',
                    hint: 'Solve \\(B = \\mu_0 I / (2\\pi r)\\) for \\(r\\).',
                    solution: '\\(r = \\frac{\\mu_0 I}{2\\pi B} = \\frac{4\\pi \\times 10^{-7} \\times 5}{2\\pi \\times 10 \\times 10^{-6}} = \\frac{20 \\times 10^{-7}}{20\\pi \\times 10^{-6}} = \\frac{1}{10\\pi} \\approx 0.10\\;\\text{m} = 10\\;\\text{cm}\\).'
                },
                {
                    question: 'If you reverse the direction of current in a wire, what happens to the magnetic field?',
                    hint: 'Apply the right-hand rule with the thumb pointing the other way.',
                    solution: 'The magnetic field reverses direction. The field lines are still concentric circles around the wire, but they circulate in the opposite sense (clockwise vs counterclockwise when viewed from one end).'
                }
            ]
        },

        // ===== Section 2: Right-Hand Rule =====
        {
            id: 'right-hand-rule',
            title: 'The Right-Hand Rule',
            content: `
<h2>Finding the Direction of \\(\\vec{B}\\)</h2>

<p>The right-hand rule is the essential tool for determining the direction of the magnetic field produced by a current. There are several versions, all equivalent:</p>

<div class="env-block theorem">
<strong>Right-Hand Rule (for a straight wire)</strong><br>
Point the thumb of your right hand in the direction of the <strong>conventional current</strong> (from \\(+\\) to \\(-\\)). Your fingers curl in the direction of the magnetic field lines (they wrap around the wire).
</div>

<div class="env-block theorem">
<strong>Right-Hand Rule (for a current loop or solenoid)</strong><br>
Curl the fingers of your right hand in the direction the current flows around the loop. Your extended thumb points in the direction of the magnetic field inside the loop (the direction of the north pole).
</div>

<div class="env-block warning">
<strong>Conventional current vs electron flow</strong><br>
The right-hand rule uses <strong>conventional current</strong> (positive charge flow, from \\(+\\) to \\(-\\)). In metal wires, the actual charge carriers are electrons moving in the opposite direction. If you use electron flow, you would need a <em>left-hand</em> rule instead. Stick with conventional current for consistency.
</div>

<h3>Practice Makes Perfect</h3>

<p>The right-hand rule is purely geometric. There is nothing to derive; you simply need to practice until it becomes automatic. Here are some test cases:</p>

<div class="env-block example">
<strong>Quick checks</strong><br>
<ul>
<li>Current flowing right: \\(B\\) points out of the page above the wire, into the page below the wire.</li>
<li>Current flowing upward: \\(B\\) points out of the page to the left, into the page to the right.</li>
<li>Current flowing out of the page: \\(B\\) circulates counterclockwise when viewed from above.</li>
</ul>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A wire carries current to the left along a table surface. What is the direction of the magnetic field (a) directly above the wire, and (b) directly below the wire?',
                    hint: 'Point your right thumb to the left.',
                    solution: '(a) Above the wire: the field points into the page (away from you if facing the wire). (b) Below the wire: the field points out of the page. The field wraps clockwise when viewed from the left end of the wire.'
                },
                {
                    question: 'A circular loop of wire lies flat on a table, with current flowing counterclockwise when viewed from above. In which direction does the magnetic field point inside the loop?',
                    hint: 'Curl your right-hand fingers in the direction of the current flow.',
                    solution: 'Curl the fingers of your right hand counterclockwise (as viewed from above). Your thumb points upward. So the magnetic field inside the loop points upward (out of the table).'
                }
            ]
        },

        // ===== Section 3: Solenoid Field =====
        {
            id: 'solenoid',
            title: 'The Solenoid Field',
            content: `
<h2>A Uniform Magnetic Field</h2>

<p>A <strong>solenoid</strong> is a long coil of wire wound in a helix. When current flows through it, the magnetic fields of all the individual loops add up to create a remarkably uniform field inside the solenoid and a nearly zero field outside.</p>

<div class="env-block theorem">
<strong>Magnetic Field Inside a Long Solenoid</strong><br>
For a solenoid with \\(n\\) turns per unit length carrying current \\(I\\):
\\[
B = \\mu_0 n I
\\]
The field inside is <strong>uniform</strong> (the same everywhere inside, independent of position). The field outside is approximately zero.
</div>

<div class="viz-placeholder" data-viz="ch11-solenoid"></div>

<p>This result is remarkable: the field depends on \\(n\\) (turns per metre) and \\(I\\), but not on the position inside the solenoid (as long as you are far from the ends). The solenoid is the magnetic analog of a parallel-plate capacitor: just as the capacitor creates a uniform electric field, the solenoid creates a uniform magnetic field.</p>

<div class="env-block remark">
<strong>Solenoids in practice</strong><br>
Solenoids are used everywhere: in MRI machines, particle accelerators, electromagnetic locks, relay switches, and car starters. To create a strong field, use many turns per metre and high current. MRI machines use superconducting solenoids to achieve 1.5 to 3 T with zero resistance (and hence no energy wasted as heat).
</div>

<div class="env-block example">
<strong>Example: Designing a solenoid</strong><br>
How many turns per metre are needed to produce \\(B = 0.01\\;\\text{T}\\) with \\(I = 5\\;\\text{A}\\)?<br><br>
\\(n = \\frac{B}{\\mu_0 I} = \\frac{0.01}{4\\pi \\times 10^{-7} \\times 5} = \\frac{0.01}{6.28 \\times 10^{-6}} \\approx 1590\\;\\text{turns/m}\\)
</div>
`,
            visualizations: [
                {
                    id: 'ch11-solenoid',
                    title: 'Inside a Solenoid: Uniform Field',
                    description: 'A solenoid cross-section showing uniform field lines inside and near-zero field outside. Adjust current and turns to see how the field changes. Animated particles flow through the interior.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var current = 5;
                        var nTurns = 20;
                        var t = 0;

                        VizEngine.createSlider(controls, 'Current I (A)', 0, 20, 5, 1, function(v) { current = v; });
                        VizEngine.createSlider(controls, 'Number of turns', 5, 40, 20, 1, function(v) { nTurns = v; });

                        // Flowing particles inside
                        var particles = [];
                        var nP = 120;
                        var solLeft = cx - 160, solRight = cx + 160;
                        var solTop = cy - 40, solBot = cy + 40;

                        for (var i = 0; i < nP; i++) {
                            particles.push({
                                x: solLeft + Math.random() * (solRight - solLeft),
                                y: solTop + 5 + Math.random() * (solBot - solTop - 10),
                                speed: 0.8 + Math.random() * 0.8
                            });
                        }

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            var solW = solRight - solLeft;
                            var solH = solBot - solTop;
                            var n = nTurns / (solW * 0.005); // turns per metre (assume solW ~ 0.32m)
                            var B = 4 * Math.PI * 1e-7 * n * current;

                            // Solenoid body
                            ctx.fillStyle = 'rgba(30,30,60,0.6)';
                            ctx.fillRect(solLeft, solTop, solW, solH);
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(solLeft, solTop, solW, solH);

                            // Draw coil turns
                            var spacing = solW / (nTurns + 1);
                            for (var ti = 1; ti <= nTurns; ti++) {
                                var tx = solLeft + ti * spacing;
                                // Top arc
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tx - 2, solTop);
                                ctx.quadraticCurveTo(tx - 2, solTop - 12, tx, solTop - 14);
                                ctx.quadraticCurveTo(tx + 2, solTop - 12, tx + 2, solTop);
                                ctx.stroke();
                                // Bottom arc
                                ctx.beginPath();
                                ctx.moveTo(tx - 2, solBot);
                                ctx.quadraticCurveTo(tx - 2, solBot + 12, tx, solBot + 14);
                                ctx.quadraticCurveTo(tx + 2, solBot + 12, tx + 2, solBot);
                                ctx.stroke();
                                // Cross-section dots (current direction)
                                // Top: current out of page (dot)
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(tx, solTop + 6, 2.5, 0, Math.PI * 2); ctx.fill();
                                // Bottom: current into page (x)
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(tx - 2, solBot - 8); ctx.lineTo(tx + 2, solBot - 4); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(tx + 2, solBot - 8); ctx.lineTo(tx - 2, solBot - 4); ctx.stroke();
                            }

                            // Interior field lines (uniform, horizontal)
                            if (current > 0.1) {
                                var nLines = 6;
                                for (var li = 0; li < nLines; li++) {
                                    var ly = solTop + (li + 1) * solH / (nLines + 1);
                                    ctx.strokeStyle = 'rgba(88,166,255,0.3)';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(solLeft + 10, ly);
                                    ctx.lineTo(solRight - 10, ly);
                                    ctx.stroke();

                                    // Arrows
                                    var nArr = 3;
                                    for (var ai = 0; ai < nArr; ai++) {
                                        var ax = solLeft + 40 + ai * (solW - 80) / (nArr - 1);
                                        ctx.fillStyle = 'rgba(88,166,255,0.5)';
                                        ctx.beginPath();
                                        ctx.moveTo(ax + 6, ly);
                                        ctx.lineTo(ax - 3, ly - 4);
                                        ctx.lineTo(ax - 3, ly + 4);
                                        ctx.closePath();
                                        ctx.fill();
                                    }
                                }

                                // Flowing particles inside
                                for (var i = 0; i < particles.length; i++) {
                                    var p = particles[i];
                                    p.x += p.speed * current * 0.15;
                                    if (p.x > solRight - 5) {
                                        p.x = solLeft + 5;
                                        p.y = solTop + 5 + Math.random() * (solH - 10);
                                    }
                                    var alpha = VizEngine.clamp(current * 0.08, 0, 0.7);
                                    ctx.fillStyle = 'rgba(100,200,255,' + alpha + ')';
                                    ctx.beginPath();
                                    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // External return field lines (faint curves)
                                ctx.strokeStyle = 'rgba(88,166,255,0.1)';
                                ctx.lineWidth = 1;
                                for (var ei = 0; ei < 3; ei++) {
                                    var ey = cy + (ei - 1) * 15;
                                    ctx.beginPath();
                                    ctx.moveTo(solRight - 5, ey);
                                    var curveH = 60 + ei * 25;
                                    ctx.bezierCurveTo(solRight + 50, ey - curveH, solLeft - 50, ey - curveH, solLeft + 5, ey);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(solRight - 5, ey);
                                    ctx.bezierCurveTo(solRight + 50, ey + curveH, solLeft - 50, ey + curveH, solLeft + 5, ey);
                                    ctx.stroke();
                                }
                            }

                            // N and S labels
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('N', solRight + 15, cy);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('S', solLeft - 15, cy);

                            // Info
                            viz.screenText('B = ' + (B * 1000).toFixed(2) + ' mT (inside)', w/2, h - 30, viz.colors.cyan, 12);
                            viz.screenText('Uniform field inside, ~zero outside', w/2, h - 12, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A solenoid has 500 turns in a length of 0.25 m and carries 2 A. What is the field inside?',
                    hint: '\\(n = N/L\\), then \\(B = \\mu_0 n I\\).',
                    solution: '\\(n = 500/0.25 = 2000\\;\\text{turns/m}\\). \\(B = 4\\pi \\times 10^{-7} \\times 2000 \\times 2 = 4\\pi \\times 10^{-7} \\times 4000 \\approx 5.03 \\times 10^{-3}\\;\\text{T} = 5.03\\;\\text{mT}\\).'
                },
                {
                    question: 'Why is the field inside a solenoid uniform while the field of a single loop is not?',
                    hint: 'Think about superposition of many loops.',
                    solution: 'A single loop has a field that varies with position (strong at the center, weaker off-axis). In a solenoid, many closely spaced loops contribute overlapping fields. By superposition, the variations cancel and the total field becomes remarkably uniform inside the solenoid (especially far from the ends). This is analogous to how a single charge creates a non-uniform field but an infinite plane of charge creates a uniform field.'
                }
            ]
        },

        // ===== Section 4: Two Parallel Wires =====
        {
            id: 'parallel-wires',
            title: 'Two Parallel Wires',
            content: `
<h2>Currents Attract and Repel</h2>

<p>If one current creates a magnetic field, and another current experiences a force in a magnetic field, then two current-carrying wires must exert forces on each other. This was verified by Ampere in 1820, and the result is both beautiful and practical.</p>

<div class="env-block theorem">
<strong>Force Between Two Parallel Wires</strong><br>
Two long parallel wires separated by distance \\(d\\), carrying currents \\(I_1\\) and \\(I_2\\), exert a force per unit length on each other:
\\[
\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}
\\]
<ul>
<li><strong>Same direction</strong> currents: the wires <strong>attract</strong>.</li>
<li><strong>Opposite direction</strong> currents: the wires <strong>repel</strong>.</li>
</ul>
</div>

<div class="viz-placeholder" data-viz="ch11-parallel-wires"></div>

<div class="env-block intuition">
<strong>Why same-direction attracts</strong><br>
Wire 1 creates a field that circles around it. At the location of wire 2, this field points in a specific direction. The force on wire 2 (carrying current in the field of wire 1) is \\(\\vec{F} = I_2 \\vec{L} \\times \\vec{B}_1\\). For same-direction currents, this cross product points toward wire 1. The wires attract. For opposite currents, the force reverses.
</div>

<div class="env-block definition">
<strong>Definition of the Ampere</strong><br>
Until 2019, the <strong>ampere</strong> was defined using this force: one ampere is the current that, flowing in each of two parallel wires 1 m apart, produces a force of exactly \\(2 \\times 10^{-7}\\;\\text{N/m}\\). This definition has since been replaced by one based on the elementary charge, but the formula remains correct.
</div>

<div class="env-block example">
<strong>Example: Two power lines</strong><br>
Two parallel power lines 0.5 m apart each carry 100 A in the same direction. Force per metre:<br><br>
\\(\\frac{F}{L} = \\frac{4\\pi \\times 10^{-7} \\times 100 \\times 100}{2\\pi \\times 0.5} = \\frac{4 \\times 10^{-3}}{1} = 4 \\times 10^{-3}\\;\\text{N/m} = 4\\;\\text{mN/m}\\)<br><br>
The wires attract. This force is small but measurable, and engineers must account for it when designing high-current bus bars.
</div>
`,
            visualizations: [
                {
                    id: 'ch11-parallel-wires',
                    title: 'Parallel Wires: Attract or Repel',
                    description: 'Two parallel wires carrying current. Same direction attracts, opposite repels. Toggle the direction and watch the force arrows change.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var sameDir = true;
                        var I1 = 10, I2 = 10;
                        var t = 0;

                        VizEngine.createButton(controls, 'Toggle Direction of Wire 2', function() { sameDir = !sameDir; });
                        VizEngine.createSlider(controls, 'I\u2081 (A)', 1, 20, 10, 1, function(v) { I1 = v; });
                        VizEngine.createSlider(controls, 'I\u2082 (A)', 1, 20, 10, 1, function(v) { I2 = v; });

                        var wire1x = cx - 60, wire2x = cx + 60;

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            var dir2 = sameDir ? 1 : -1;

                            // Wire 1 (current up / out of page)
                            // Glow
                            var g1 = ctx.createRadialGradient(wire1x, cy, 4, wire1x, cy, 30);
                            g1.addColorStop(0, 'rgba(255,200,80,0.3)');
                            g1.addColorStop(1, 'rgba(0,0,0,0)');
                            ctx.fillStyle = g1;
                            ctx.beginPath(); ctx.arc(wire1x, cy, 30, 0, Math.PI * 2); ctx.fill();

                            ctx.fillStyle = '#444';
                            ctx.beginPath(); ctx.arc(wire1x, cy, 12, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = '#777'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(wire1x, cy, 12, 0, Math.PI * 2); ctx.stroke();
                            // Dot (out of page)
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(wire1x, cy, 3, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('I\u2081', wire1x, cy - 22, viz.colors.orange, 12);

                            // Wire 2
                            var g2 = ctx.createRadialGradient(wire2x, cy, 4, wire2x, cy, 30);
                            g2.addColorStop(0, sameDir ? 'rgba(255,200,80,0.3)' : 'rgba(255,100,100,0.3)');
                            g2.addColorStop(1, 'rgba(0,0,0,0)');
                            ctx.fillStyle = g2;
                            ctx.beginPath(); ctx.arc(wire2x, cy, 30, 0, Math.PI * 2); ctx.fill();

                            ctx.fillStyle = '#444';
                            ctx.beginPath(); ctx.arc(wire2x, cy, 12, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = '#777'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(wire2x, cy, 12, 0, Math.PI * 2); ctx.stroke();

                            if (sameDir) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(wire2x, cy, 3, 0, Math.PI * 2); ctx.fill();
                            } else {
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(wire2x - 4, cy - 4); ctx.lineTo(wire2x + 4, cy + 4); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(wire2x + 4, cy - 4); ctx.lineTo(wire2x - 4, cy + 4); ctx.stroke();
                            }
                            viz.screenText('I\u2082', wire2x, cy - 22, viz.colors.orange, 12);

                            // B field lines from wire 1 (partial circles)
                            ctx.strokeStyle = 'rgba(88,166,255,0.15)';
                            ctx.lineWidth = 1;
                            for (var ri = 1; ri <= 5; ri++) {
                                var rr = ri * 22;
                                ctx.beginPath();
                                ctx.arc(wire1x, cy, rr, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Force arrows
                            var fMag = VizEngine.clamp(I1 * I2 * 0.3, 5, 50);
                            var pulseScale = 1 + 0.1 * Math.sin(t * 3);
                            var arrowLen = fMag * pulseScale;

                            if (sameDir) {
                                // Attract: arrows pointing inward
                                // Force on wire 1 (toward wire 2)
                                drawForceArrow(wire1x + 16, cy, arrowLen, 0, viz.colors.green);
                                // Force on wire 2 (toward wire 1)
                                drawForceArrow(wire2x - 16, cy, -arrowLen, 0, viz.colors.green);
                            } else {
                                // Repel: arrows pointing outward
                                drawForceArrow(wire1x - 16, cy, -arrowLen, 0, viz.colors.red);
                                drawForceArrow(wire2x + 16, cy, arrowLen, 0, viz.colors.red);
                            }

                            // Labels
                            var d = 0.12; // 12 cm
                            var fPerL = 4 * Math.PI * 1e-7 * I1 * I2 / (2 * Math.PI * d);
                            var label = sameDir ? 'ATTRACT (same direction)' : 'REPEL (opposite directions)';
                            var color = sameDir ? viz.colors.green : viz.colors.red;
                            viz.screenText(label, w/2, h - 35, color, 14);
                            viz.screenText('F/L = ' + (fPerL * 1e6).toFixed(1) + ' \u00b5N/m', w/2, h - 15, viz.colors.cyan, 11);
                        }

                        function drawForceArrow(x, y, dx, dy, color) {
                            var len = Math.sqrt(dx * dx + dy * dy);
                            if (len < 2) return;
                            var angle = Math.atan2(dy, dx);
                            ctx.save();
                            ctx.shadowColor = color;
                            ctx.shadowBlur = 8;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(x + dx, y + dy);
                            ctx.stroke();
                            var hs = 8;
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x + dx, y + dy);
                            ctx.lineTo(x + dx - hs * Math.cos(angle - 0.4), y + dy - hs * Math.sin(angle - 0.4));
                            ctx.lineTo(x + dx - hs * Math.cos(angle + 0.4), y + dy - hs * Math.sin(angle + 0.4));
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two parallel wires 10 cm apart carry 8 A and 12 A in opposite directions. Find the force per metre and state whether it is attractive or repulsive.',
                    hint: 'Use \\(F/L = \\mu_0 I_1 I_2 / (2\\pi d)\\). Opposite directions means repulsion.',
                    solution: '\\(F/L = \\frac{4\\pi \\times 10^{-7} \\times 8 \\times 12}{2\\pi \\times 0.1} = \\frac{4 \\times 96 \\times 10^{-7}}{0.2} = \\frac{384 \\times 10^{-7}}{0.2} = 1.92 \\times 10^{-4}\\;\\text{N/m} = 0.192\\;\\text{mN/m}\\). The force is <strong>repulsive</strong> (opposite currents repel).'
                },
                {
                    question: 'Why do the wires in a lamp cord (carrying current in opposite directions) not repel apart noticeably?',
                    hint: 'Estimate the force for household current (1 A) and typical wire separation (3 mm).',
                    solution: 'For \\(I_1 = I_2 = 1\\;\\text{A}\\) and \\(d = 0.003\\;\\text{m}\\): \\(F/L = \\frac{4\\pi \\times 10^{-7} \\times 1}{2\\pi \\times 0.003} \\approx 6.7 \\times 10^{-5}\\;\\text{N/m}\\). This is about 67 micronewtons per metre of cord, far too small to overcome the stiffness of the insulation or even to notice. The magnetic force between household wires is negligible.'
                }
            ]
        }
    ]
});
})();
