// === Chapter 13: Lorentz Force & Charged Particles ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Lorentz Force & Charged Particles',
    subtitle: 'Spiraling charges, mass spectrometers, and the beauty of circular motion in magnetic fields',
    sections: [
        // ===== Section 0: F = qv x B =====
        {
            id: 'lorentz-force',
            title: 'The Lorentz Force \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\)',
            content: `
<h2>Force on a Moving Charge</h2>

<p>We have discussed the force on a current-carrying wire: \\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\). Since a current is just a stream of moving charges, we can zoom in and ask: what force does a single charge experience?</p>

<div class="env-block theorem">
<strong>The Magnetic Lorentz Force</strong><br>
A charge \\(q\\) moving with velocity \\(\\vec{v}\\) in a magnetic field \\(\\vec{B}\\) experiences a force:
\\[
\\vec{F} = q\\vec{v} \\times \\vec{B}
\\]
The magnitude is \\(F = |q|vB\\sin\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{v}\\) and \\(\\vec{B}\\). The direction is perpendicular to both \\(\\vec{v}\\) and \\(\\vec{B}\\).
</div>

<p>Three critical properties of this force:</p>
<ol>
<li><strong>Perpendicular to velocity</strong>: the force never speeds up or slows down the charge; it only bends its path. The kinetic energy stays constant.</li>
<li><strong>Requires motion</strong>: if \\(v = 0\\), the force is zero. A stationary charge feels no magnetic force.</li>
<li><strong>Depends on charge sign</strong>: a positive charge curves one way, a negative charge curves the other way.</li>
</ol>

<div class="env-block intuition">
<strong>Why the force does no work</strong><br>
Since \\(\\vec{F} \\perp \\vec{v}\\) at all times, the work done is \\(W = \\int \\vec{F} \\cdot d\\vec{r} = \\int \\vec{F} \\cdot \\vec{v}\\,dt = 0\\). The magnetic field cannot change the speed (and hence kinetic energy) of a charged particle. It can only deflect it. This is fundamentally different from the electric force, which can accelerate or decelerate charges.
</div>

<p>When both electric and magnetic fields are present, the total <strong>Lorentz force</strong> is:</p>
\\[
\\vec{F} = q\\vec{E} + q\\vec{v} \\times \\vec{B}
\\]
`,
            visualizations: [],
            exercises: [
                {
                    question: 'An electron (\\(q = -1.6 \\times 10^{-19}\\) C) moves at \\(5 \\times 10^6\\) m/s perpendicular to a 0.2 T field. Find the force magnitude and explain why the electron curves in the opposite direction from a proton.',
                    hint: 'Use \\(F = |q|vB\\). For direction, consider that \\(q\\) is negative.',
                    solution: '\\(F = |q|vB = 1.6 \\times 10^{-19} \\times 5 \\times 10^6 \\times 0.2 = 1.6 \\times 10^{-13}\\;\\text{N}\\). The force direction is \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\). Since \\(q < 0\\) for the electron, the force is opposite to \\(\\vec{v} \\times \\vec{B}\\). A proton (\\(q > 0\\)) would curve in the direction of \\(\\vec{v} \\times \\vec{B}\\). So the electron and proton curve in opposite directions.'
                }
            ]
        },

        // ===== Section 1: Circular Motion in B =====
        {
            id: 'circular-motion',
            title: 'Circular Motion in \\(\\vec{B}\\)',
            content: `
<h2>The Perfect Circle</h2>

<p>When a charged particle enters a uniform magnetic field with its velocity perpendicular to \\(\\vec{B}\\), the magnetic force provides a centripetal acceleration, and the particle moves in a circle. This is one of the most elegant results in physics.</p>

<div class="env-block theorem">
<strong>Circular Motion of a Charged Particle in \\(\\vec{B}\\)</strong><br>
The magnetic force provides the centripetal force:
\\[
|q|vB = \\frac{mv^2}{r}
\\]
Solving for the radius:
\\[
r = \\frac{mv}{|q|B}
\\]
The period (time for one complete circle):
\\[
T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{|q|B}
\\]
The angular frequency (cyclotron frequency):
\\[
\\omega_c = \\frac{|q|B}{m}
\\]
</div>

<p>Remarkable features:</p>
<ul>
<li>The <strong>radius</strong> depends on momentum \\(mv\\): faster or heavier particles make larger circles.</li>
<li>The <strong>period</strong> \\(T\\) is independent of speed (and radius). All particles with the same \\(q/m\\) have the same period, regardless of how fast they are moving. This is the key to the cyclotron.</li>
<li>The <strong>speed</strong> never changes (the magnetic force does no work).</li>
</ul>

<div class="viz-placeholder" data-viz="ch13-circular-orbit"></div>

<h3>Helical Motion</h3>

<p>If the velocity has a component parallel to \\(\\vec{B}\\), that component is unaffected (there is no force along \\(\\vec{B}\\)). The particle spirals along the field in a <strong>helix</strong>: circular motion in the plane perpendicular to \\(\\vec{B}\\), combined with uniform motion along \\(\\vec{B}\\).</p>

<div class="env-block example">
<strong>Example: Proton in Earth's field</strong><br>
A proton with \\(v = 10^7\\;\\text{m/s}\\) enters Earth's magnetic field (\\(B \\approx 50\\;\\mu\\text{T}\\)) perpendicularly.<br><br>
\\(r = \\frac{mv}{|q|B} = \\frac{1.67 \\times 10^{-27} \\times 10^7}{1.6 \\times 10^{-19} \\times 50 \\times 10^{-6}} = \\frac{1.67 \\times 10^{-20}}{8 \\times 10^{-24}} \\approx 2090\\;\\text{m} \\approx 2.1\\;\\text{km}\\)<br><br>
Cosmic ray protons spiral along Earth's field lines with radii of kilometres.
</div>
`,
            visualizations: [
                {
                    id: 'ch13-circular-orbit',
                    title: 'Charged Particle in a Magnetic Field',
                    description: 'THE SHOWPIECE: A glowing charged particle launched into a magnetic field curves into a beautiful circular path with a fading trail. Adjust B, charge, velocity, and mass to see how the radius changes.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;

                        var B = 0.5, charge = 1, vel = 3, mass = 1;
                        var trail = [];
                        var px, py, vx, vy;
                        var time = 0;
                        var running = true;

                        VizEngine.createSlider(controls, 'B (T)', 0.1, 2.0, 0.5, 0.1, function(v) { B = v; reset(); });
                        VizEngine.createSlider(controls, 'Charge q (e)', -3, 3, 1, 1, function(v) { charge = v; reset(); });
                        VizEngine.createSlider(controls, 'Speed v', 1, 8, 3, 0.5, function(v) { vel = v; reset(); });
                        VizEngine.createSlider(controls, 'Mass (u)', 1, 8, 1, 1, function(v) { mass = v; reset(); });
                        VizEngine.createButton(controls, 'Reset', function() { reset(); });

                        function reset() {
                            time = 0;
                            trail = [];
                            // Start from left, moving upward
                            px = cx - 50;
                            py = cy + 80;
                            vx = 0;
                            vy = -vel * 40; // pixels per frame-unit
                        }
                        reset();

                        function draw() {
                            viz.clear();

                            // B field indicator (into page, represented by X marks)
                            var fieldAlpha = VizEngine.clamp(B * 0.15, 0.03, 0.2);
                            ctx.strokeStyle = 'rgba(88,166,255,' + fieldAlpha + ')';
                            ctx.lineWidth = 1;
                            var gSpace = 45;
                            for (var gx = gSpace / 2; gx < w; gx += gSpace) {
                                for (var gy = gSpace / 2; gy < h; gy += gSpace) {
                                    var sz = 4;
                                    ctx.beginPath(); ctx.moveTo(gx - sz, gy - sz); ctx.lineTo(gx + sz, gy + sz); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gx + sz, gy - sz); ctx.lineTo(gx - sz, gy + sz); ctx.stroke();
                                }
                            }

                            if (running && charge !== 0) {
                                // Lorentz force: F = qv x B (B into page = -z)
                                // In 2D: B = -B_z (into page)
                                // F_x = q * v_y * (-B_z) ... well, let's be careful:
                                // v = (vx, vy, 0), B = (0, 0, -B)
                                // v x B = (vy*(-B) - 0, 0 - vx*(-B), 0) = (-vy*B, vx*B, 0)
                                // F = q * (v x B) = q*(-vy*B, vx*B, 0)
                                var qScaled = charge * 0.02 * B / mass;
                                var ax = qScaled * (-vy);
                                var ay = qScaled * vx;

                                // Simple Euler integration (small steps)
                                var dt = 0.5;
                                for (var step = 0; step < 3; step++) {
                                    ax = qScaled * (-vy);
                                    ay = qScaled * vx;
                                    vx += ax * dt;
                                    vy += ay * dt;
                                    // Renormalize speed (magnetic force shouldn't change it)
                                    var spd = Math.sqrt(vx * vx + vy * vy);
                                    var targetSpd = vel * 40;
                                    if (spd > 0) {
                                        vx = vx / spd * targetSpd;
                                        vy = vy / spd * targetSpd;
                                    }
                                    px += vx * dt;
                                    py += vy * dt;
                                }

                                // Wrap around screen
                                if (px < -20) px += w + 40;
                                if (px > w + 20) px -= w + 40;
                                if (py < -20) py += h + 40;
                                if (py > h + 20) py -= h + 40;

                                trail.push([px, py]);
                                if (trail.length > 500) trail.shift();
                                time++;
                            }

                            // Draw trail with gradient glow
                            var n = trail.length;
                            for (var i = 1; i < n; i++) {
                                var frac = i / n;
                                var alpha = frac * 0.9;
                                var lw = 1 + frac * 3;
                                var hue = charge > 0 ? 0 : (charge < 0 ? 220 : 60);
                                var sat = 80;
                                var light = 50 + frac * 15;

                                // Check for wraparound jumps
                                var dx = trail[i][0] - trail[i-1][0];
                                var dy = trail[i][1] - trail[i-1][1];
                                if (Math.abs(dx) > w/2 || Math.abs(dy) > h/2) continue;

                                ctx.strokeStyle = VizEngine.hsl(hue, sat, light);
                                ctx.globalAlpha = alpha;
                                ctx.lineWidth = lw;
                                ctx.beginPath();
                                ctx.moveTo(trail[i-1][0], trail[i-1][1]);
                                ctx.lineTo(trail[i][0], trail[i][1]);
                                ctx.stroke();
                            }
                            ctx.globalAlpha = 1;

                            // Glowing particle
                            if (trail.length > 0) {
                                var lastP = trail[trail.length - 1];
                                var pColor = charge > 0 ? '#ff5555' : (charge < 0 ? '#5588ff' : '#aaaaaa');

                                // Outer glow
                                var glow = ctx.createRadialGradient(lastP[0], lastP[1], 2, lastP[0], lastP[1], 25);
                                glow.addColorStop(0, pColor + '88');
                                glow.addColorStop(0.5, pColor + '22');
                                glow.addColorStop(1, pColor + '00');
                                ctx.fillStyle = glow;
                                ctx.beginPath(); ctx.arc(lastP[0], lastP[1], 25, 0, Math.PI * 2); ctx.fill();

                                // Particle body
                                ctx.fillStyle = pColor;
                                ctx.beginPath(); ctx.arc(lastP[0], lastP[1], 5, 0, Math.PI * 2); ctx.fill();

                                // Highlight
                                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                                ctx.beginPath(); ctx.arc(lastP[0] - 1.5, lastP[1] - 1.5, 2, 0, Math.PI * 2); ctx.fill();

                                // Velocity arrow
                                if (charge !== 0) {
                                    var vLen = 20;
                                    var spd2 = Math.sqrt(vx * vx + vy * vy);
                                    if (spd2 > 0) {
                                        var uvx = vx / spd2, uvy = vy / spd2;
                                        ctx.save();
                                        ctx.strokeStyle = viz.colors.yellow;
                                        ctx.lineWidth = 2;
                                        ctx.shadowColor = viz.colors.yellow;
                                        ctx.shadowBlur = 6;
                                        ctx.beginPath();
                                        ctx.moveTo(lastP[0], lastP[1]);
                                        ctx.lineTo(lastP[0] + uvx * vLen, lastP[1] + uvy * vLen);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.yellow;
                                        var ang = Math.atan2(uvy, uvx);
                                        ctx.beginPath();
                                        ctx.moveTo(lastP[0] + uvx * vLen, lastP[1] + uvy * vLen);
                                        ctx.lineTo(lastP[0] + uvx * vLen - 7 * Math.cos(ang - 0.35), lastP[1] + uvy * vLen - 7 * Math.sin(ang - 0.35));
                                        ctx.lineTo(lastP[0] + uvx * vLen - 7 * Math.cos(ang + 0.35), lastP[1] + uvy * vLen - 7 * Math.sin(ang + 0.35));
                                        ctx.closePath();
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }
                            }

                            // Expected radius
                            var radiusPx = charge !== 0 ? (mass * vel * 40) / (Math.abs(charge) * 0.02 * B) : Infinity;
                            var radiusPhys = charge !== 0 ? mass * vel / (Math.abs(charge) * B) : Infinity;

                            // Draw expected circle (faint)
                            if (charge !== 0 && radiusPx < w && trail.length > 10) {
                                // Estimate center from current position and velocity
                                var lastPt = trail[trail.length - 1];
                                var spd3 = Math.sqrt(vx * vx + vy * vy);
                                if (spd3 > 0) {
                                    var uvx2 = vx / spd3, uvy2 = vy / spd3;
                                    // Center is perpendicular to velocity
                                    var sign = charge > 0 ? 1 : -1;
                                    var centerX = lastPt[0] + sign * (-uvy2) * radiusPx;
                                    var centerY = lastPt[1] + sign * uvx2 * radiusPx;

                                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 6]);
                                    ctx.beginPath();
                                    ctx.arc(centerX, centerY, radiusPx, 0, Math.PI * 2);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            }

                            // Info panel
                            viz.drawScreenRect(8, 8, 240, 60, 'rgba(12,12,32,0.9)');
                            ctx.strokeStyle = viz.colors.grid; ctx.strokeRect(8, 8, 240, 60);
                            var qLabel = charge > 0 ? '+' + charge + 'e' : (charge < 0 ? charge + 'e' : '0');
                            viz.screenText('q = ' + qLabel + ',  m = ' + mass + 'u,  v = ' + vel, 128, 25, viz.colors.white, 11, 'center');
                            viz.screenText('B = ' + B.toFixed(1) + ' T (into page)', 128, 42, viz.colors.blue, 11, 'center');
                            var rStr = charge !== 0 ? 'r = mv/|q|B' : 'r = \u221e (no charge)';
                            viz.screenText(rStr, 128, 58, viz.colors.cyan, 11, 'center');

                            viz.screenText('B \u2297 (into page)', w - 60, 20, viz.colors.blue, 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A proton and a deuteron (twice the mass of a proton, same charge) enter the same magnetic field with the same speed. What is the ratio of their circular radii?',
                    hint: '\\(r = mv/(|q|B)\\). Same \\(q\\), \\(v\\), \\(B\\); different \\(m\\).',
                    solution: '\\(r_d / r_p = m_d / m_p = 2\\). The deuteron makes a circle twice as large because it has twice the mass (and hence twice the momentum at the same speed).'
                },
                {
                    question: 'Show that the period \\(T\\) of circular motion in a magnetic field is independent of the particle\'s speed.',
                    hint: 'Express \\(T = 2\\pi r/v\\) and substitute \\(r = mv/(|q|B)\\).',
                    solution: '\\(T = 2\\pi r / v = 2\\pi \\cdot mv/(|q|B) / v = 2\\pi m / (|q|B)\\). The \\(v\\) cancels. The period depends only on \\(m\\), \\(|q|\\), and \\(B\\), not on the speed. Faster particles travel in bigger circles but also move faster, so they complete each circle in the same time.'
                }
            ]
        },

        // ===== Section 2: The Mass Spectrometer =====
        {
            id: 'mass-spectrometer',
            title: 'The Mass Spectrometer',
            content: `
<h2>Sorting Atoms by Mass</h2>

<p>The mass spectrometer is one of the most important applications of charged particle motion in magnetic fields. It separates ions by their mass-to-charge ratio \\(m/q\\), allowing identification and measurement of isotopes, molecules, and contaminants.</p>

<div class="env-block theorem">
<strong>Mass Spectrometer Principle</strong><br>
Ions are accelerated through a potential difference \\(V\\), acquiring kinetic energy:
\\[
qV = \\tfrac{1}{2}mv^2 \\implies v = \\sqrt{\\frac{2qV}{m}}
\\]
They then enter a uniform magnetic field \\(B\\) and follow a semicircular path of radius:
\\[
r = \\frac{mv}{|q|B} = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}}
\\]
Since \\(r \\propto \\sqrt{m/q}\\), ions with different masses land at different positions on a detector.
</div>

<div class="viz-placeholder" data-viz="ch13-mass-spec"></div>

<div class="env-block example">
<strong>Example: Separating carbon isotopes</strong><br>
\\(^{12}\\text{C}^+\\) and \\(^{13}\\text{C}^+\\) ions (same charge) are accelerated through \\(V = 1000\\;\\text{V}\\) into \\(B = 0.1\\;\\text{T}\\).<br><br>
For \\(^{12}\\text{C}\\): \\(r_{12} = \\frac{1}{0.1}\\sqrt{\\frac{2 \\times 12 \\times 1.66 \\times 10^{-27} \\times 1000}{1.6 \\times 10^{-19}}} = 10\\sqrt{\\frac{3.98 \\times 10^{-23}}{1.6 \\times 10^{-19}}} = 10\\sqrt{2.49 \\times 10^{-4}} = 10 \\times 0.0158 = 0.158\\;\\text{m}\\)<br><br>
For \\(^{13}\\text{C}\\): \\(r_{13} = r_{12}\\sqrt{13/12} = 0.158 \\times 1.041 = 0.164\\;\\text{m}\\)<br><br>
The separation at the detector (diameter): \\(\\Delta(2r) = 2(0.164 - 0.158) = 0.013\\;\\text{m} = 1.3\\;\\text{cm}\\). Easily resolved.
</div>

<div class="env-block remark">
<strong>Modern mass spectrometry</strong><br>
Modern mass spectrometers (time-of-flight, quadrupole, Orbitrap) use more sophisticated techniques than simple magnetic deflection, achieving mass resolutions better than one part in a million. But the basic principle (separating by \\(m/q\\)) remains the same.
</div>
`,
            visualizations: [
                {
                    id: 'ch13-mass-spec',
                    title: 'Mass Spectrometer: Rainbow of Isotopes',
                    description: 'Ions of different masses (color-coded) are accelerated and enter a magnetic field region. Each mass follows a different semicircular path, landing at a different position on the detector. A beautiful rainbow of separated isotopes.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;

                        var B = 0.5;
                        var voltage = 1000;
                        var t = 0;

                        VizEngine.createSlider(controls, 'B (T)', 0.2, 1.5, 0.5, 0.1, function(v) { B = v; });
                        VizEngine.createSlider(controls, 'V (volts)', 200, 3000, 1000, 100, function(v) { voltage = v; });

                        // Masses (in amu): different isotopes
                        var isotopes = [
                            { mass: 1, label: 'H\u207a', color: '#ff4444' },
                            { mass: 2, label: 'D\u207a', color: '#ff8844' },
                            { mass: 4, label: 'He\u207a', color: '#ffcc44' },
                            { mass: 12, label: '\u00b9\u00b2C\u207a', color: '#44ff44' },
                            { mass: 14, label: '\u00b9\u2074N\u207a', color: '#44ccff' },
                            { mass: 16, label: '\u00b9\u2076O\u207a', color: '#4488ff' },
                            { mass: 20, label: '\u00b2\u2070Ne\u207a', color: '#aa66ff' }
                        ];

                        // Particles
                        var particles = [];

                        function spawnBatch() {
                            var entryX = 80, entryY = h * 0.35;
                            for (var i = 0; i < isotopes.length; i++) {
                                var iso = isotopes[i];
                                var mkg = iso.mass * 1.66e-27;
                                var q = 1.6e-19;
                                var v = Math.sqrt(2 * q * voltage / mkg);
                                var r = mkg * v / (q * B);
                                // Scale to pixels (1 metre = 600 px approximately)
                                var rPx = r * 600;
                                particles.push({
                                    iso: i,
                                    angle: 0,
                                    rPx: VizEngine.clamp(rPx, 30, h * 0.45),
                                    cx: entryX,
                                    cy: entryY + rPx,
                                    entryX: entryX,
                                    entryY: entryY,
                                    speed: 0.015 + 0.005 / iso.mass,
                                    trail: [],
                                    done: false
                                });
                            }
                        }

                        var spawnTimer = 0;

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            spawnTimer++;
                            if (spawnTimer % 180 === 1) {
                                // Remove old
                                particles = particles.filter(function(p) { return !p.done; });
                                spawnBatch();
                            }

                            // B field region (right half)
                            var regionX = 70;
                            ctx.fillStyle = 'rgba(20,20,50,0.5)';
                            ctx.fillRect(regionX, 0, w - regionX, h);
                            ctx.strokeStyle = 'rgba(88,166,255,0.15)';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(regionX, 0, w - regionX, h);

                            // B field X marks
                            ctx.strokeStyle = 'rgba(88,166,255,0.08)';
                            ctx.lineWidth = 0.8;
                            for (var gx = regionX + 20; gx < w - 10; gx += 35) {
                                for (var gy = 20; gy < h - 10; gy += 35) {
                                    ctx.beginPath(); ctx.moveTo(gx - 3, gy - 3); ctx.lineTo(gx + 3, gy + 3); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gx + 3, gy - 3); ctx.lineTo(gx - 3, gy + 3); ctx.stroke();
                                }
                            }

                            // Entry slit
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillRect(regionX - 3, h * 0.35 - 8, 6, 16);
                            viz.screenText('Slit', regionX, h * 0.35 - 18, viz.colors.text, 10);

                            // Detector (vertical line at x = entryX)
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(regionX, h * 0.35 + 10);
                            ctx.lineTo(regionX, h - 10);
                            ctx.stroke();
                            viz.screenText('Detector', regionX - 5, h - 5, viz.colors.text, 9, 'center');

                            // Update and draw particles
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                if (p.done) continue;

                                // Semicircular motion: center is at (entryX, entryY + rPx)
                                // Particle starts at top of circle (angle = -PI/2 relative to center)
                                // and goes clockwise to angle = +PI/2
                                p.angle += p.speed;
                                if (p.angle > Math.PI) {
                                    p.done = true;
                                }

                                var px = p.cx + p.rPx * Math.sin(p.angle);
                                var py = p.cy - p.rPx * Math.cos(p.angle);

                                p.trail.push([px, py]);
                                if (p.trail.length > 400) p.trail.shift();

                                var iso = isotopes[p.iso];

                                // Draw trail
                                var tn = p.trail.length;
                                for (var ti = 1; ti < tn; ti++) {
                                    var fa = (ti / tn) * 0.8;
                                    ctx.strokeStyle = iso.color;
                                    ctx.globalAlpha = fa;
                                    ctx.lineWidth = 1 + (ti / tn) * 2;
                                    ctx.beginPath();
                                    ctx.moveTo(p.trail[ti-1][0], p.trail[ti-1][1]);
                                    ctx.lineTo(p.trail[ti][0], p.trail[ti][1]);
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;

                                // Glowing particle
                                var glow = ctx.createRadialGradient(px, py, 1, px, py, 12);
                                glow.addColorStop(0, iso.color + 'aa');
                                glow.addColorStop(1, iso.color + '00');
                                ctx.fillStyle = glow;
                                ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = iso.color;
                                ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();

                                // Label at end position
                                if (p.done || p.angle > Math.PI * 0.85) {
                                    var labelY = p.cy + p.rPx;
                                    viz.screenText(iso.label, p.cx + 15, labelY, iso.color, 10, 'left');
                                }
                            }

                            // Accelerating region label
                            viz.screenText('Acceleration', 35, h * 0.35, viz.colors.text, 9);
                            viz.screenText('(V = ' + voltage + ' V)', 35, h * 0.35 + 14, viz.colors.text, 9);

                            // Legend
                            viz.drawScreenRect(w - 130, 8, 122, isotopes.length * 16 + 10, 'rgba(12,12,32,0.85)');
                            for (var li = 0; li < isotopes.length; li++) {
                                ctx.fillStyle = isotopes[li].color;
                                ctx.beginPath(); ctx.arc(w - 115, 22 + li * 16, 4, 0, Math.PI * 2); ctx.fill();
                                viz.screenText(isotopes[li].label + ' (m=' + isotopes[li].mass + ')', w - 55, 22 + li * 16, isotopes[li].color, 9);
                            }

                            viz.screenText('Heavier ions curve more: r \u221d \u221am', w / 2, h - 14, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a mass spectrometer, ions of masses \\(m\\) and \\(2m\\) (same charge) are accelerated through the same voltage. By what factor do their radii differ?',
                    hint: '\\(r \\propto \\sqrt{m}\\).',
                    solution: '\\(r_2 / r_1 = \\sqrt{2m/m} = \\sqrt{2} \\approx 1.414\\). The heavier ion follows a path with radius \\(\\sqrt{2}\\) times larger.'
                }
            ]
        },

        // ===== Section 3: Velocity Selector =====
        {
            id: 'velocity-selector',
            title: 'The Velocity Selector',
            content: `
<h2>Crossed Electric and Magnetic Fields</h2>

<p>A velocity selector uses perpendicular electric and magnetic fields to filter particles by speed. Only particles with exactly the right speed pass through in a straight line; all others are deflected.</p>

<div class="env-block theorem">
<strong>Velocity Selector</strong><br>
When \\(\\vec{E}\\) and \\(\\vec{B}\\) are perpendicular, and a charged particle moves perpendicular to both, the electric force (\\(qE\\)) and magnetic force (\\(qvB\\)) are in opposite directions. The particle travels straight when they balance:
\\[
qE = qvB \\implies v = \\frac{E}{B}
\\]
The selected velocity is independent of the charge and mass of the particle.
</div>

<div class="viz-placeholder" data-viz="ch13-velocity-selector"></div>

<p>The velocity selector is essential in mass spectrometers: it ensures that all ions entering the magnetic deflection region have the same speed, so the deflection depends only on \\(m/q\\).</p>

<div class="env-block example">
<strong>Example</strong><br>
\\(E = 5000\\;\\text{V/m}\\), \\(B = 0.1\\;\\text{T}\\). Selected speed:<br>
\\(v = E/B = 5000/0.1 = 50{,}000\\;\\text{m/s} = 5 \\times 10^4\\;\\text{m/s}\\).
</div>
`,
            visualizations: [
                {
                    id: 'ch13-velocity-selector',
                    title: 'Velocity Selector: Only the Right Speed Passes',
                    description: 'Particles of different speeds enter a region with crossed E and B fields. Only particles with v = E/B pass straight through (green). Slower particles curve one way (red), faster particles curve the other (blue).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var E = 5000, Bsel = 0.1;
                        var t = 0;

                        VizEngine.createSlider(controls, 'E (V/m)', 1000, 10000, 5000, 500, function(v) { E = v; });
                        VizEngine.createSlider(controls, 'B (T)', 0.05, 0.5, 0.1, 0.05, function(v) { Bsel = v; });

                        // Particles
                        var particles = [];
                        var spawnTimer = 0;

                        function spawnParticles() {
                            var vSelected = E / Bsel;
                            var entryX = 60;
                            var entryY = h / 2;
                            var speeds = [
                                { vFrac: 0.5, color: '#ff4444', label: 'slow' },
                                { vFrac: 0.75, color: '#ff8844', label: '' },
                                { vFrac: 1.0, color: '#44ff66', label: 'v=E/B' },
                                { vFrac: 1.25, color: '#4488ff', label: '' },
                                { vFrac: 1.5, color: '#6644ff', label: 'fast' }
                            ];

                            for (var i = 0; i < speeds.length; i++) {
                                var s = speeds[i];
                                var spd = vSelected * s.vFrac;
                                // Net force: F = q(E - vB) upward
                                // For v < E/B: net upward; v > E/B: net downward; v = E/B: zero
                                var netAccel = (E - spd * Bsel); // proportional to net force (q/m normalized)
                                particles.push({
                                    x: entryX,
                                    y: entryY + (i - 2) * 2,
                                    vx: spd * 0.0004,
                                    vy: 0,
                                    ay: -netAccel * 0.0000001,
                                    color: s.color,
                                    label: s.label,
                                    trail: [],
                                    age: 0
                                });
                            }
                        }

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            spawnTimer++;
                            if (spawnTimer % 200 === 1) {
                                particles = [];
                                spawnParticles();
                            }

                            // Selector region
                            var selLeft = 50, selRight = w - 50;
                            var plateTop = h / 2 - 80, plateBot = h / 2 + 80;

                            // Top plate (+)
                            ctx.fillStyle = '#cc3333';
                            ctx.fillRect(selLeft, plateTop - 8, selRight - selLeft, 8);
                            viz.screenText('+', selLeft + 15, plateTop - 15, viz.colors.red, 14);

                            // Bottom plate (-)
                            ctx.fillStyle = '#3355cc';
                            ctx.fillRect(selLeft, plateBot, selRight - selLeft, 8);
                            viz.screenText('\u2013', selLeft + 15, plateBot + 20, viz.colors.blue, 14);

                            // E field arrows (downward)
                            ctx.globalAlpha = 0.12;
                            for (var ex = selLeft + 30; ex < selRight; ex += 50) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(ex, plateTop + 10);
                                ctx.lineTo(ex, plateBot - 10);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(ex, plateBot - 10);
                                ctx.lineTo(ex - 3, plateBot - 17);
                                ctx.lineTo(ex + 3, plateBot - 17);
                                ctx.closePath();
                                ctx.fill();
                            }
                            ctx.globalAlpha = 1;

                            // B field markers (into page)
                            ctx.strokeStyle = 'rgba(88,166,255,0.08)';
                            ctx.lineWidth = 0.8;
                            for (var bx = selLeft + 20; bx < selRight; bx += 35) {
                                for (var by = plateTop + 20; by < plateBot; by += 35) {
                                    ctx.beginPath(); ctx.moveTo(bx - 3, by - 3); ctx.lineTo(bx + 3, by + 3); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(bx + 3, by - 3); ctx.lineTo(bx - 3, by + 3); ctx.stroke();
                                }
                            }

                            // Update and draw particles
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                p.age++;
                                if (p.x > w + 10 || p.y < plateTop - 5 || p.y > plateBot + 5 || p.age > 2000) continue;

                                p.vy += p.ay;
                                p.x += p.vx;
                                p.y += p.vy;
                                p.trail.push([p.x, p.y]);
                                if (p.trail.length > 500) p.trail.shift();

                                // Trail
                                var tn = p.trail.length;
                                for (var ti = 1; ti < tn; ti++) {
                                    ctx.strokeStyle = p.color;
                                    ctx.globalAlpha = (ti / tn) * 0.7;
                                    ctx.lineWidth = 1 + (ti / tn) * 2;
                                    ctx.beginPath();
                                    ctx.moveTo(p.trail[ti-1][0], p.trail[ti-1][1]);
                                    ctx.lineTo(p.trail[ti][0], p.trail[ti][1]);
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;

                                // Particle
                                var glow = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, 10);
                                glow.addColorStop(0, p.color + 'aa');
                                glow.addColorStop(1, p.color + '00');
                                ctx.fillStyle = glow;
                                ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = p.color;
                                ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();

                                if (p.label) {
                                    viz.screenText(p.label, p.x + 12, p.y - 8, p.color, 9, 'left');
                                }
                            }

                            // Exit slit
                            ctx.fillStyle = '#333';
                            ctx.fillRect(selRight - 3, plateTop, 6, (h/2 - 6) - plateTop);
                            ctx.fillRect(selRight - 3, h/2 + 6, 6, plateBot - (h/2 + 6));
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(selRight - 1, h/2 - 6, 2, 12);

                            // Info
                            var vSel = E / Bsel;
                            viz.screenText('Selected v = E/B = ' + (vSel).toFixed(0) + ' m/s', w / 2, h - 14, viz.colors.green, 12);
                            viz.screenText('E \u2193', selLeft + 40, h / 2 - 55, viz.colors.orange, 11);
                            viz.screenText('B \u2297', selRight - 30, h / 2 - 55, viz.colors.blue, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A velocity selector has \\(E = 2 \\times 10^4\\;\\text{V/m}\\) and \\(B = 0.05\\;\\text{T}\\). What speed particles pass through undeflected?',
                    hint: '\\(v = E/B\\).',
                    solution: '\\(v = E/B = 2 \\times 10^4 / 0.05 = 4 \\times 10^5\\;\\text{m/s}\\).'
                },
                {
                    question: 'In a velocity selector, does the selected speed depend on the charge or mass of the particle? Explain.',
                    hint: 'Look at the equation \\(qE = qvB\\).',
                    solution: 'No. The balance condition is \\(qE = qvB\\), and \\(q\\) cancels: \\(v = E/B\\). The selected speed is the same for all charges and masses. This is why the velocity selector works for mixed ion beams.'
                }
            ]
        },

        // ===== Section 4: The Cyclotron =====
        {
            id: 'cyclotron',
            title: 'The Cyclotron',
            content: `
<h2>Accelerating Particles in Spirals</h2>

<p>The <strong>cyclotron</strong>, invented by Ernest Lawrence in 1932, exploits the remarkable fact that the orbital period \\(T = 2\\pi m/(|q|B)\\) is independent of speed. Particles spiral outward as they gain energy, but always take the same time per half-circle. An oscillating electric field, synchronized to this fixed frequency, can accelerate the particles at each half-turn.</p>

<div class="env-block theorem">
<strong>Cyclotron Principle</strong><br>
Two hollow D-shaped electrodes ("dees") are placed in a magnetic field. An AC voltage oscillates at the <strong>cyclotron frequency</strong>:
\\[
f_c = \\frac{|q|B}{2\\pi m}
\\]
The particle spirals outward, gaining energy \\(\\Delta E = qV\\) at each crossing of the gap between the dees. After \\(n\\) crossings, the kinetic energy is:
\\[
E_k = nqV
\\]
and the radius grows as \\(r = mv/(|q|B) = \\sqrt{2mE_k}/(|q|B)\\).
</div>

<div class="env-block remark">
<strong>Relativistic limit</strong><br>
The cyclotron works perfectly as long as the particle's speed is much less than the speed of light. At relativistic speeds, the mass increases (\\(m = \\gamma m_0\\)), the period increases, and the particle falls out of sync with the fixed-frequency oscillator. This limits proton cyclotrons to about 20 MeV. The <strong>synchrocyclotron</strong> and <strong>synchrotron</strong> solve this by adjusting the frequency as the particle speeds up.
</div>

<div class="env-block example">
<strong>Example: Cyclotron frequency for protons</strong><br>
\\(B = 1.5\\;\\text{T}\\):<br>
\\(f_c = \\frac{1.6 \\times 10^{-19} \\times 1.5}{2\\pi \\times 1.67 \\times 10^{-27}} = \\frac{2.4 \\times 10^{-19}}{1.05 \\times 10^{-26}} = 2.29 \\times 10^7\\;\\text{Hz} = 22.9\\;\\text{MHz}\\)
</div>

<h3>Legacy</h3>

<p>Lawrence's first cyclotron was 4.5 inches in diameter and accelerated protons to 80 keV. Modern cyclotrons are used in hospitals to produce medical isotopes for PET scans and to deliver proton therapy for cancer treatment. The cyclotron earned Lawrence the 1939 Nobel Prize in Physics.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A cyclotron accelerates protons in a 1.2 T field with 200 V across the gap. How many revolutions are needed to reach 10 MeV?',
                    hint: 'Each revolution involves 2 gap crossings. Energy per revolution: \\(2qV\\).',
                    solution: 'Energy per revolution: \\(2qV = 2 \\times 1.6 \\times 10^{-19} \\times 200 = 6.4 \\times 10^{-17}\\;\\text{J}\\). Target energy: \\(10\\;\\text{MeV} = 10 \\times 10^6 \\times 1.6 \\times 10^{-19} = 1.6 \\times 10^{-12}\\;\\text{J}\\). Number of revolutions: \\(n = 1.6 \\times 10^{-12} / (6.4 \\times 10^{-17}) = 25{,}000\\) revolutions.'
                },
                {
                    question: 'Explain in one sentence why the cyclotron frequency does not depend on the particle\'s speed.',
                    hint: 'Think about what happens to the radius and circumference as speed increases.',
                    solution: 'As the particle speeds up, the radius of its circular orbit increases in exact proportion to the speed (\\(r = mv/(|q|B)\\)), so the larger circumference is traversed at the higher speed in the same time, leaving the period (and frequency) unchanged.'
                }
            ]
        }
    ]
});
})();
