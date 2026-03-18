// === Chapter 12: Force on Current-Carrying Wires ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Force on Current-Carrying Wires',
    subtitle: 'From F = BIL to the spinning motor: magnetism put to work',
    sections: [
        // ===== Section 0: F = BIL =====
        {
            id: 'force-bil',
            title: 'The Force \\(F = BIL\\)',
            content: `
<h2>Force on a Current in a Magnetic Field</h2>

<p>A current-carrying wire placed in an external magnetic field experiences a force. This is the principle behind electric motors, loudspeakers, and galvanometers. The force arises because each moving charge in the wire feels the Lorentz force \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\), and the sum over all the charges in the wire gives a macroscopic force on the wire itself.</p>

<div class="env-block theorem">
<strong>Force on a Straight Current-Carrying Wire</strong><br>
A wire of length \\(L\\) carrying current \\(I\\) in a uniform magnetic field \\(B\\) experiences a force:
\\[
F = BIL\\sin\\theta
\\]
where \\(\\theta\\) is the angle between the current direction and the magnetic field. In vector form:
\\[
\\vec{F} = I\\vec{L} \\times \\vec{B}
\\]
The direction follows the right-hand rule (or the left-hand rule, depending on convention).
</div>

<p>Key features:</p>
<ul>
<li>\\(F\\) is maximum when the wire is perpendicular to \\(\\vec{B}\\) (\\(\\theta = 90^\\circ\\)).</li>
<li>\\(F = 0\\) when the wire is parallel to \\(\\vec{B}\\) (\\(\\theta = 0^\\circ\\)).</li>
<li>The force is perpendicular to both the current and the field.</li>
</ul>

<div class="viz-placeholder" data-viz="ch12-force-wire"></div>

<div class="env-block example">
<strong>Example: Wire in a motor</strong><br>
A 20 cm wire carries 3 A perpendicular to a 0.4 T magnetic field.<br><br>
\\(F = BIL = 0.4 \\times 3 \\times 0.2 = 0.24\\;\\text{N}\\)<br><br>
A quarter-newton may seem small, but with hundreds of turns in a motor coil, the total force is substantial.
</div>
`,
            visualizations: [
                {
                    id: 'ch12-force-wire',
                    title: 'Force on a Current-Carrying Wire',
                    description: 'A wire segment (orange) sits in a magnetic field (blue arrows pointing right). Adjust B, I, and the angle to see how the force (green arrow) changes. The force is always perpendicular to both I and B.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var B = 0.5, I = 5, angle = 90;

                        VizEngine.createSlider(controls, 'B (T)', 0.1, 2.0, 0.5, 0.1, function(v) { B = v; });
                        VizEngine.createSlider(controls, 'I (A)', 0.5, 15, 5, 0.5, function(v) { I = v; });
                        VizEngine.createSlider(controls, '\u03b8 (degrees)', 0, 180, 90, 5, function(v) { angle = v; });

                        var t = 0;

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            // Background B field arrows (pointing right)
                            ctx.globalAlpha = 0.15;
                            var spacing = 50;
                            for (var gy = spacing / 2; gy < h; gy += spacing) {
                                for (var gx = spacing / 2; gx < w; gx += spacing) {
                                    var arrowLen = 15 * B;
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(gx - arrowLen, gy);
                                    ctx.lineTo(gx + arrowLen, gy);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.moveTo(gx + arrowLen, gy);
                                    ctx.lineTo(gx + arrowLen - 4, gy - 3);
                                    ctx.lineTo(gx + arrowLen - 4, gy + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }
                            ctx.globalAlpha = 1;

                            // Wire segment
                            var wireLen = 120;
                            var angleRad = angle * Math.PI / 180;
                            var dx = Math.cos(angleRad) * wireLen / 2;
                            var dy = -Math.sin(angleRad) * wireLen / 2;

                            // Wire glow
                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 10;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 5;
                            ctx.beginPath();
                            ctx.moveTo(cx - dx, cy - dy);
                            ctx.lineTo(cx + dx, cy + dy);
                            ctx.stroke();
                            ctx.restore();

                            // Current direction arrow along wire
                            ctx.fillStyle = viz.colors.yellow;
                            var tipX = cx + dx, tipY = cy + dy;
                            var arrAngle = Math.atan2(dy, dx);
                            ctx.beginPath();
                            ctx.moveTo(tipX, tipY);
                            ctx.lineTo(tipX - 10 * Math.cos(arrAngle - 0.4), tipY - 10 * Math.sin(arrAngle - 0.4));
                            ctx.lineTo(tipX - 10 * Math.cos(arrAngle + 0.4), tipY - 10 * Math.sin(arrAngle + 0.4));
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('I', cx + dx * 0.6 + 15, cy + dy * 0.6 - 10, viz.colors.orange, 14);

                            // Force vector (perpendicular to both I and B)
                            // B is along x, I is at angle theta from x
                            // F = BIL sin(theta), direction: along z cross product => in 2D it's upward if theta in (0,180)
                            var L = 0.2; // 20 cm wire
                            var F = B * I * L * Math.sin(angleRad);
                            var forceScale = 80;
                            var forcePx = F * forceScale;

                            if (Math.abs(F) > 0.01) {
                                // Force is along y (upward for positive F)
                                ctx.save();
                                ctx.shadowColor = viz.colors.green;
                                ctx.shadowBlur = 12;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3.5;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(cx, cy - forcePx);
                                ctx.stroke();
                                // Arrowhead
                                ctx.fillStyle = viz.colors.green;
                                var fy = cy - forcePx;
                                var fdir = forcePx > 0 ? -1 : 1;
                                ctx.beginPath();
                                ctx.moveTo(cx, fy);
                                ctx.lineTo(cx - 6, fy - fdir * 10);
                                ctx.lineTo(cx + 6, fy - fdir * 10);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();

                                viz.screenText('F', cx + 14, cy - forcePx / 2, viz.colors.green, 14);
                            }

                            // Pulsing glow at wire center
                            var pulse = 0.3 + 0.15 * Math.sin(t * 4);
                            var glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
                            glow.addColorStop(0, 'rgba(255,255,255,' + pulse + ')');
                            glow.addColorStop(1, 'rgba(255,255,255,0)');
                            ctx.fillStyle = glow;
                            ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();

                            // Info panel
                            viz.drawScreenRect(10, 10, 220, 75, 'rgba(12,12,32,0.85)');
                            ctx.strokeStyle = viz.colors.grid; ctx.strokeRect(10, 10, 220, 75);
                            viz.screenText('B = ' + B.toFixed(1) + ' T, I = ' + I.toFixed(1) + ' A', 120, 28, viz.colors.white, 12);
                            viz.screenText('\u03b8 = ' + angle + '\u00b0, L = 0.20 m', 120, 45, viz.colors.text, 11);
                            viz.screenText('F = BILsin\u03b8 = ' + F.toFixed(3) + ' N', 120, 65, viz.colors.green, 12);

                            viz.screenText('B \u2192', w - 40, 20, viz.colors.blue, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 50 cm wire carrying 8 A is in a 0.3 T field at \\(60^\\circ\\) to the field. Find the force.',
                    hint: '\\(F = BIL\\sin\\theta\\).',
                    solution: '\\(F = 0.3 \\times 8 \\times 0.5 \\times \\sin 60^\\circ = 1.2 \\times 0.866 = 1.04\\;\\text{N}\\).'
                },
                {
                    question: 'At what angle between the wire and the field is the force exactly half its maximum value?',
                    hint: '\\(\\sin\\theta = 0.5\\).',
                    solution: '\\(F = F_{\\max}\\sin\\theta\\). For \\(F = F_{\\max}/2\\), \\(\\sin\\theta = 0.5\\), so \\(\\theta = 30^\\circ\\) (or \\(150^\\circ\\)).'
                }
            ]
        },

        // ===== Section 1: Direction via Left-Hand Rule =====
        {
            id: 'left-hand-rule',
            title: 'Direction via the Left-Hand Rule',
            content: `
<h2>Finding the Force Direction</h2>

<p>The force \\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\) is a cross product, and its direction can be found using either the right-hand rule (for the cross product) or, equivalently, <strong>Fleming's left-hand rule</strong> (a mnemonic popular in British and many Asian curricula).</p>

<div class="env-block theorem">
<strong>Fleming's Left-Hand Rule</strong><br>
Hold your left hand with three fingers mutually perpendicular:
<ul>
<li><strong>First finger (index)</strong>: points in the direction of the magnetic <strong>Field</strong> (\\(\\vec{B}\\)).</li>
<li><strong>Second finger (middle)</strong>: points in the direction of the <strong>Current</strong> (\\(I\\)).</li>
<li><strong>Thumb</strong>: points in the direction of the <strong>Force</strong> (\\(\\vec{F}\\)) (or motion/thrust).</li>
</ul>
Mnemonic: <strong>F</strong>ield, <strong>C</strong>urrent, <strong>F</strong>orce (or FBI: Force, B-field, I-current).
</div>

<div class="env-block warning">
<strong>Left-hand vs right-hand</strong><br>
Fleming's left-hand rule is for the force on a current (motor effect). Fleming's right-hand rule (or generator rule) is for the induced current direction (generator effect, Chapter 15). Do not mix them up. Both are consequences of \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) applied in different contexts.
</div>

<h3>Systematic Approach</h3>

<p>For problems, the cross-product method is more reliable than memorizing hand rules:</p>
<ol>
<li>Write \\(\\vec{I L}\\) as a vector (direction and magnitude).</li>
<li>Write \\(\\vec{B}\\) as a vector.</li>
<li>Compute \\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\) using the determinant formula or the "right-hand rule for cross products."</li>
</ol>

<div class="env-block example">
<strong>Example</strong><br>
Current flows in the \\(+y\\) direction, \\(\\vec{B}\\) points in the \\(+x\\) direction.<br>
\\(\\vec{F} = I L\\,\\hat{y} \\times B\\,\\hat{x} = ILB(\\hat{y} \\times \\hat{x}) = -ILB\\,\\hat{z}\\)<br>
The force is in the \\(-z\\) direction (into the page, if \\(x\\) is right and \\(y\\) is up).
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Current flows to the right (\\(+x\\)). \\(\\vec{B}\\) points into the page (\\(-z\\)). In what direction is the force on the wire?',
                    hint: '\\(\\hat{x} \\times (-\\hat{z}) = \\hat{x} \\times (-\\hat{z})\\). Use \\(\\hat{x} \\times \\hat{z} = -\\hat{y}\\).',
                    solution: '\\(\\vec{F} = IL(\\hat{x} \\times (-\\hat{z})) B = -ILB(\\hat{x} \\times \\hat{z}) = -ILB(-\\hat{y}) = ILB\\,\\hat{y}\\). The force is upward (\\(+y\\) direction).'
                },
                {
                    question: 'A horizontal wire carries current due north. The magnetic field points vertically downward. Which way is the force on the wire?',
                    hint: 'Use Fleming\'s left-hand rule or the cross product.',
                    solution: 'Let north = \\(+y\\), down = \\(-z\\), east = \\(+x\\). \\(\\vec{F} = IL\\hat{y} \\times B(-\\hat{z}) = -ILB(\\hat{y} \\times \\hat{z}) = -ILB\\hat{x}\\). The force points west (\\(-x\\)). Using Fleming\'s left-hand rule: index finger down (B), middle finger north (I), thumb points west (F).'
                }
            ]
        },

        // ===== Section 2: Torque on a Current Loop =====
        {
            id: 'torque-loop',
            title: 'Torque on a Current Loop',
            content: `
<h2>From Force to Rotation</h2>

<p>A single straight wire in a field is pushed in one direction. But a rectangular loop of wire, carrying current in a magnetic field, experiences forces that create a <strong>torque</strong>, causing the loop to rotate. This is the operating principle of every electric motor.</p>

<div class="env-block theorem">
<strong>Torque on a Current Loop</strong><br>
A rectangular loop of area \\(A\\) carrying current \\(I\\) in a uniform field \\(B\\) experiences a torque:
\\[
\\tau = NIAB\\sin\\phi
\\]
where \\(N\\) is the number of turns, and \\(\\phi\\) is the angle between the <strong>normal to the loop</strong> (\\(\\hat{n}\\)) and \\(\\vec{B}\\). The torque is maximum when the loop's plane is parallel to \\(\\vec{B}\\) (\\(\\phi = 90^\\circ\\)) and zero when the loop is perpendicular to \\(\\vec{B}\\) (\\(\\phi = 0^\\circ\\)).
</div>

<div class="env-block definition">
<strong>Magnetic Dipole Moment</strong><br>
The quantity \\(\\vec{\\mu} = NIA\\hat{n}\\) is called the <strong>magnetic dipole moment</strong> of the loop. The torque can be written compactly as:
\\[
\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}
\\]
This has the same form as the torque on an electric dipole in an electric field (\\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\)). The loop tends to rotate until \\(\\vec{\\mu}\\) aligns with \\(\\vec{B}\\).
</div>

<h3>Why the Loop Rotates</h3>

<p>Consider a rectangular loop with sides parallel and perpendicular to \\(\\vec{B}\\). The two sides perpendicular to \\(\\vec{B}\\) carry currents in opposite directions, so they feel forces in opposite directions, creating a couple (torque). The two sides parallel to \\(\\vec{B}\\) feel no force (\\(\\sin\\theta = 0\\)). The net force on the loop is zero, but the net torque is not.</p>

<div class="env-block example">
<strong>Example</strong><br>
A 100-turn coil of area \\(0.02\\;\\text{m}^2\\) carries 0.5 A in a 0.3 T field. Maximum torque:<br><br>
\\(\\tau_{\\max} = NIAB = 100 \\times 0.5 \\times 0.02 \\times 0.3 = 0.30\\;\\text{N}\\cdot\\text{m}\\)
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A single circular loop of radius 5 cm carries 2 A in a 0.1 T field. What is the maximum torque?',
                    hint: '\\(A = \\pi r^2\\). Maximum torque is \\(NIAB\\).',
                    solution: '\\(A = \\pi(0.05)^2 = 7.85 \\times 10^{-3}\\;\\text{m}^2\\). \\(\\tau_{\\max} = 1 \\times 2 \\times 7.85 \\times 10^{-3} \\times 0.1 = 1.57 \\times 10^{-3}\\;\\text{N}\\cdot\\text{m} \\approx 1.6\\;\\text{mN}\\cdot\\text{m}\\).'
                },
                {
                    question: 'At what angle \\(\\phi\\) between the normal \\(\\hat{n}\\) and \\(\\vec{B}\\) is the torque half its maximum value?',
                    hint: '\\(\\sin\\phi = 0.5\\).',
                    solution: '\\(\\tau = \\tau_{\\max}\\sin\\phi\\). For \\(\\tau = \\tau_{\\max}/2\\), \\(\\sin\\phi = 0.5\\), so \\(\\phi = 30^\\circ\\).'
                }
            ]
        },

        // ===== Section 3: The DC Motor =====
        {
            id: 'dc-motor',
            title: 'The DC Motor',
            content: `
<h2>Continuous Rotation</h2>

<p>A current loop in a magnetic field rotates until \\(\\vec{\\mu}\\) aligns with \\(\\vec{B}\\), then stops. To achieve <em>continuous</em> rotation, we need a trick: reverse the current direction every half turn. This is the job of the <strong>commutator</strong>.</p>

<div class="env-block definition">
<strong>The DC Motor</strong><br>
A DC motor consists of:
<ul>
<li>A <strong>rotor</strong> (armature): a coil of wire that rotates in a magnetic field.</li>
<li>A <strong>stator</strong>: permanent magnets (or electromagnets) that provide the field.</li>
<li>A <strong>commutator</strong>: a split ring that reverses the current direction every half revolution, ensuring the torque always acts in the same rotational direction.</li>
<li><strong>Brushes</strong>: contacts that connect the external circuit to the rotating commutator.</li>
</ul>
</div>

<div class="viz-placeholder" data-viz="ch12-dc-motor"></div>

<h3>How It Works</h3>

<ol>
<li>Current flows through the coil, creating a torque (\\(\\tau = NIAB\\sin\\phi\\)).</li>
<li>The coil rotates toward the equilibrium position (\\(\\phi = 0\\)).</li>
<li>Just as the coil reaches equilibrium, the commutator reverses the current.</li>
<li>The torque reverses direction, but since the coil has passed equilibrium, this means the torque now pushes it further in the same rotational direction.</li>
<li>The process repeats, producing continuous rotation.</li>
</ol>

<div class="env-block remark">
<strong>Real motors</strong><br>
Practical motors use many coils at different angles to smooth out the torque (which would otherwise be zero at the switching points). They also use iron cores to concentrate the magnetic field and increase efficiency. The basic principle, however, is exactly as described above.
</div>
`,
            visualizations: [
                {
                    id: 'ch12-dc-motor',
                    title: 'DC Motor: Rotating Coil with Commutator',
                    description: 'Watch a coil rotate between two magnets. The commutator (split ring at the bottom) reverses the current every half turn, maintaining continuous rotation. The torque indicator shows how torque varies with angle.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2 - 20;
                        var angle = 0;
                        var omega = 0;
                        var running = false;
                        var speed = 1;

                        VizEngine.createButton(controls, 'Start / Stop', function() { running = !running; if (!running) omega = 0; });
                        VizEngine.createSlider(controls, 'Speed', 0.3, 3, 1, 0.1, function(v) { speed = v; });

                        function draw(ts) {
                            viz.clear();

                            if (running) {
                                var torque = Math.sin(angle) * speed;
                                omega += torque * 0.003;
                                omega *= 0.995; // friction
                                angle += omega;
                            }

                            var coilW = 80, coilH = 60;

                            // Magnets
                            // Left magnet (N)
                            ctx.fillStyle = '#cc3333';
                            ctx.fillRect(cx - 130, cy - 50, 30, 100);
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('N', cx - 115, cy);

                            // Right magnet (S)
                            ctx.fillStyle = '#3355bb';
                            ctx.fillRect(cx + 100, cy - 50, 30, 100);
                            ctx.fillStyle = '#fff';
                            ctx.fillText('S', cx + 115, cy);

                            // B field arrows between magnets
                            ctx.globalAlpha = 0.15;
                            for (var fy = -35; fy <= 35; fy += 18) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx - 95, cy + fy);
                                ctx.lineTo(cx + 95, cy + fy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.moveTo(cx + 95, cy + fy);
                                ctx.lineTo(cx + 88, cy + fy - 3);
                                ctx.lineTo(cx + 88, cy + fy + 3);
                                ctx.closePath();
                                ctx.fill();
                            }
                            ctx.globalAlpha = 1;

                            // Rotating coil
                            var cosA = Math.cos(angle);
                            var sinA = Math.sin(angle);

                            // Coil projected width (perspective)
                            var projW = coilW * cosA;

                            // Determine current direction based on commutator
                            var commState = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                            var currentDir = commState < Math.PI ? 1 : -1;

                            // Draw coil rectangle (projected)
                            ctx.save();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 6;

                            // Top side
                            ctx.beginPath();
                            ctx.moveTo(cx - projW / 2, cy - coilH / 2);
                            ctx.lineTo(cx + projW / 2, cy - coilH / 2);
                            ctx.stroke();
                            // Bottom side
                            ctx.beginPath();
                            ctx.moveTo(cx - projW / 2, cy + coilH / 2);
                            ctx.lineTo(cx + projW / 2, cy + coilH / 2);
                            ctx.stroke();
                            // Left side
                            ctx.beginPath();
                            ctx.moveTo(cx - projW / 2, cy - coilH / 2);
                            ctx.lineTo(cx - projW / 2, cy + coilH / 2);
                            ctx.stroke();
                            // Right side
                            ctx.beginPath();
                            ctx.moveTo(cx + projW / 2, cy - coilH / 2);
                            ctx.lineTo(cx + projW / 2, cy + coilH / 2);
                            ctx.stroke();
                            ctx.restore();

                            // Current direction arrows on the coil
                            if (Math.abs(projW) > 10) {
                                var arrowColor = currentDir > 0 ? viz.colors.yellow : viz.colors.cyan;
                                // Top side arrow
                                var topDir = currentDir * (cosA > 0 ? 1 : -1);
                                drawSmallArrow(cx, cy - coilH / 2, topDir * projW * 0.3, 0, arrowColor);
                                // Bottom side arrow (opposite)
                                drawSmallArrow(cx, cy + coilH / 2, -topDir * projW * 0.3, 0, arrowColor);
                            }

                            // Force arrows on left and right sides
                            if (running && Math.abs(sinA) > 0.05) {
                                var fMag = 25 * Math.abs(sinA) * speed;
                                // Left side force
                                var leftForceDir = currentDir * (sinA > 0 ? -1 : 1);
                                drawSmallArrow(cx - projW / 2, cy, 0, leftForceDir * fMag, viz.colors.green);
                                // Right side force (opposite)
                                drawSmallArrow(cx + projW / 2, cy, 0, -leftForceDir * fMag, viz.colors.green);
                            }

                            // Commutator (split ring at bottom)
                            var commY = cy + coilH / 2 + 25;
                            var commR = 12;
                            // Left half
                            ctx.fillStyle = commState < Math.PI ? viz.colors.gold : '#666';
                            ctx.beginPath();
                            ctx.arc(cx, commY, commR, Math.PI * 0.55, Math.PI * 1.45);
                            ctx.fill();
                            // Right half
                            ctx.fillStyle = commState < Math.PI ? '#666' : viz.colors.gold;
                            ctx.beginPath();
                            ctx.arc(cx, commY, commR, -Math.PI * 0.45, Math.PI * 0.45);
                            ctx.fill();
                            ctx.strokeStyle = '#888'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(cx, commY, commR, 0, Math.PI * 2); ctx.stroke();

                            // Brushes
                            ctx.fillStyle = '#999';
                            ctx.fillRect(cx - commR - 8, commY - 3, 8, 6);
                            ctx.fillRect(cx + commR, commY - 3, 8, 6);

                            // Axle
                            ctx.strokeStyle = '#666';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy - coilH / 2);
                            ctx.lineTo(cx, commY);
                            ctx.stroke();

                            // Torque indicator
                            var torqueNow = Math.sin(angle) * speed;
                            var barX = w - 60, barY = 30, barH = 120;
                            viz.drawScreenRect(barX - 15, barY - 5, 50, barH + 30, 'rgba(12,12,32,0.85)');
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(barX - 15, barY - 5, 50, barH + 30);
                            viz.screenText('Torque', barX + 10, barY + 5, viz.colors.text, 10);
                            // Bar
                            var tMid = barY + 15 + barH / 2;
                            var tH = torqueNow * barH / 4;
                            ctx.fillStyle = torqueNow > 0 ? viz.colors.green : viz.colors.red;
                            ctx.fillRect(barX, tMid, 20, -tH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(barX - 5, tMid);
                            ctx.lineTo(barX + 25, tMid);
                            ctx.stroke();

                            viz.screenText(running ? 'Motor running' : 'Press Start', w / 2, h - 14, running ? viz.colors.green : viz.colors.text, 12);

                            function drawSmallArrow(x, y, adx, ady, color) {
                                var len = Math.sqrt(adx * adx + ady * ady);
                                if (len < 3) return;
                                var ang = Math.atan2(ady, adx);
                                ctx.save();
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + adx, y + ady);
                                ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(x + adx, y + ady);
                                ctx.lineTo(x + adx - 7 * Math.cos(ang - 0.4), y + ady - 7 * Math.sin(ang - 0.4));
                                ctx.lineTo(x + adx - 7 * Math.cos(ang + 0.4), y + ady - 7 * Math.sin(ang + 0.4));
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why a DC motor without a commutator would oscillate back and forth rather than rotate continuously.',
                    hint: 'What happens to the torque when the coil passes through equilibrium?',
                    solution: 'Without a commutator, the current direction stays the same. When the coil passes the equilibrium position (\\(\\phi = 0\\)), the torque reverses and pushes the coil back. The coil oscillates around the equilibrium position like a pendulum, instead of rotating continuously. The commutator reverses the current at exactly the right moment to keep the torque pushing in the same rotational direction.'
                }
            ]
        },

        // ===== Section 4: The Galvanometer =====
        {
            id: 'galvanometer',
            title: 'The Galvanometer',
            content: `
<h2>Measuring Current with Magnetism</h2>

<p>A <strong>galvanometer</strong> is a sensitive current-measuring instrument based on the torque on a current loop. A coil suspended between the poles of a permanent magnet rotates when current flows through it. A spring opposes the rotation, and the coil settles at an angle proportional to the current.</p>

<div class="env-block theorem">
<strong>Galvanometer Principle</strong><br>
The magnetic torque \\(\\tau_B = NIAB\\sin\\phi\\) is balanced by the restoring torque of the spring \\(\\tau_s = k\\phi\\) (for small angles). At equilibrium:
\\[
NIAB\\sin\\phi = k\\phi
\\]
For small angles (\\(\\sin\\phi \\approx \\phi\\)):
\\[
\\phi = \\frac{NIAB}{k} \\cdot \\frac{\\sin\\phi}{\\phi} \\approx \\frac{NIAB}{k}
\\]
The deflection is proportional to \\(I\\). This gives a linear scale.
</div>

<div class="env-block remark">
<strong>Radial field design</strong><br>
In a real galvanometer, the magnet is shaped (with curved pole pieces and an iron core) so that the field is always radial to the coil. This means \\(\\sin\\phi = 1\\) at all angles, making the deflection exactly proportional to current: \\(\\phi = NIAB/k\\). No small-angle approximation is needed.
</div>

<h3>From Galvanometer to Ammeter and Voltmeter</h3>

<p>A galvanometer can be converted to:</p>
<ul>
<li><strong>Ammeter</strong>: by adding a small <strong>shunt resistor</strong> in parallel (so most current bypasses the sensitive coil).</li>
<li><strong>Voltmeter</strong>: by adding a large <strong>multiplier resistor</strong> in series (so only a tiny current flows through the coil for a given voltage).</li>
</ul>

<div class="env-block example">
<strong>Example</strong><br>
A galvanometer has a full-scale deflection at \\(I_g = 1\\;\\text{mA}\\) and coil resistance \\(R_g = 50\\;\\Omega\\). To convert it to a 0-10 A ammeter, add a shunt \\(R_s\\) in parallel:<br><br>
The voltage across the galvanometer at full scale: \\(V = I_g R_g = 0.001 \\times 50 = 0.05\\;\\text{V}\\).<br>
The shunt must carry \\(10 - 0.001 \\approx 9.999\\;\\text{A}\\): \\(R_s = V / I_s = 0.05 / 9.999 \\approx 0.005\\;\\Omega\\).
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A galvanometer deflects \\(30^\\circ\\) when 2 mA flows. What is the deflection for 5 mA (assuming linear response)?',
                    hint: 'Deflection is proportional to current.',
                    solution: '\\(\\phi = (5/2) \\times 30^\\circ = 75^\\circ\\).'
                },
                {
                    question: 'Why must a shunt resistor for an ammeter have very low resistance?',
                    hint: 'The ammeter is placed in series with the circuit. What happens if it has high resistance?',
                    solution: 'An ammeter is connected in series, so all the circuit current flows through it. If the ammeter (shunt + galvanometer in parallel) had high resistance, it would significantly reduce the current it is trying to measure. The shunt must have very low resistance so that (a) it can carry almost all the current and (b) the ammeter does not disturb the circuit.'
                }
            ]
        }
    ]
});
})();
