// === Chapter 10: Magnetic Fields & Field Lines ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Magnetic Fields & Field Lines',
    subtitle: 'Invisible forces made visible: the elegant geometry of magnetism',
    sections: [
        // ===== Section 0: Magnets and Poles =====
        {
            id: 'magnets-and-poles',
            title: 'Magnets and Poles',
            content: `
<h2>The Two Poles</h2>

<p>Every magnet has two ends, called <strong>poles</strong>: a <strong>north pole</strong> (N) and a <strong>south pole</strong> (S). If you suspend a bar magnet freely, its north pole swings toward geographic north, and its south pole swings toward geographic south. That is how the poles got their names.</p>

<div class="env-block definition">
<strong>Magnetic Poles</strong><br>
The north pole of a magnet is the end that points toward Earth's geographic north. The south pole points toward geographic south. Unlike electric charges, magnetic poles always come in pairs: you cannot isolate a single north or south pole.
</div>

<p>The fundamental rule of magnetic interaction is simple:</p>
<ul>
<li><strong>Like poles repel</strong>: N repels N, S repels S.</li>
<li><strong>Unlike poles attract</strong>: N attracts S.</li>
</ul>

<p>This looks similar to the rule for electric charges. But there is a crucial difference: while you can isolate a positive charge from a negative charge, you <em>cannot</em> isolate a north pole from a south pole. If you break a magnet in half, each piece becomes a complete magnet with its own N and S. Break it again, and you get four complete magnets.</p>

<div class="env-block theorem">
<strong>No Magnetic Monopoles</strong><br>
In all of known physics, isolated magnetic poles (monopoles) have never been observed. Every magnet is a <strong>dipole</strong>, possessing both N and S. Mathematically, this means the magnetic flux through any closed surface is zero:
\\[
\\oint \\vec{B} \\cdot d\\vec{A} = 0
\\]
This is one of Maxwell's equations (Gauss's law for magnetism).
</div>

<div class="env-block intuition">
<strong>Why no monopoles?</strong><br>
Magnetism in ordinary matter arises from circulating electric currents (electrons orbiting nuclei, electrons spinning). A current loop always produces a dipole field; there is no configuration of currents that produces a monopole. Whether fundamental magnetic monopoles exist in nature is an open question in particle physics, but none have ever been found.
</div>

<div class="viz-placeholder" data-viz="ch10-break-magnet"></div>

<h3>Where Does Magnetism Come From?</h3>

<p>At the atomic level, magnetism comes from two sources: (1) the <strong>orbital motion</strong> of electrons around the nucleus (a tiny current loop), and (2) the <strong>spin</strong> of electrons (an intrinsic quantum property). In most materials, these tiny magnetic moments point in random directions and cancel out. In <strong>ferromagnetic</strong> materials (iron, nickel, cobalt), quantum mechanics causes neighboring atomic moments to align spontaneously, creating macroscopic magnetism.</p>
`,
            visualizations: [
                {
                    id: 'ch10-break-magnet',
                    title: 'Breaking a Magnet: No Monopoles',
                    description: 'Click "Break" to split the magnet. Each piece becomes a complete magnet with its own N and S poles. You can never isolate a single pole.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 40, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var pieces = 1;
                        var animPhase = 0;

                        VizEngine.createButton(controls, 'Break!', function() {
                            if (pieces < 8) pieces *= 2;
                            animPhase = 1;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            pieces = 1; animPhase = 0;
                        });

                        function drawMagnet(cx, cy, mw, mh) {
                            // North half (red)
                            ctx.fillStyle = '#e05050';
                            ctx.fillRect(cx - mw/2, cy - mh/2, mw/2, mh);
                            // South half (blue)
                            ctx.fillStyle = '#5080e0';
                            ctx.fillRect(cx, cy - mh/2, mw/2, mh);
                            // Border
                            ctx.strokeStyle = '#ffffff44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(cx - mw/2, cy - mh/2, mw, mh);
                            // Labels
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold ' + Math.max(9, Math.min(14, mw/5)) + 'px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('N', cx - mw/4, cy);
                            ctx.fillText('S', cx + mw/4, cy);
                            // Mini field lines
                            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                            ctx.lineWidth = 0.8;
                            for (var k = -1; k <= 1; k += 2) {
                                ctx.beginPath();
                                ctx.moveTo(cx - mw/2 - 4, cy + k * mh * 0.2);
                                ctx.quadraticCurveTo(cx - mw/2 - 12, cy + k * mh * 0.6, cx, cy + k * mh * 0.7);
                                ctx.quadraticCurveTo(cx + mw/2 + 12, cy + k * mh * 0.6, cx + mw/2 + 4, cy + k * mh * 0.2);
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();
                            if (animPhase > 0) animPhase = Math.max(0, animPhase - 0.02);

                            var totalW = w * 0.7;
                            var gap = 8 + animPhase * 20;
                            var pieceW = (totalW - (pieces - 1) * gap) / pieces;
                            var pieceH = 50;
                            var startX = (w - totalW) / 2 + pieceW / 2;

                            for (var i = 0; i < pieces; i++) {
                                var cx = startX + i * (pieceW + gap);
                                drawMagnet(cx, h/2, pieceW, pieceH);
                            }

                            // Info text
                            viz.screenText(pieces + (pieces === 1 ? ' magnet' : ' magnets') + ', each with N and S', w/2, h - 30, viz.colors.yellow, 13);
                            if (pieces >= 8) {
                                viz.screenText('Keep breaking forever: still N + S!', w/2, h - 12, viz.colors.text, 11);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You break a bar magnet into three pieces. How many north poles and how many south poles do you now have?',
                    hint: 'Each piece becomes a complete magnet.',
                    solution: 'You have 3 north poles and 3 south poles. Each piece is a complete dipole with both N and S.'
                },
                {
                    question: 'Explain why rubbing a needle with a magnet makes the needle magnetic.',
                    hint: 'Think about the alignment of atomic magnetic moments.',
                    solution: 'The magnetic domains in the needle are initially random. Stroking with a magnet aligns these domains (the atomic magnetic moments) in one direction, giving the needle a net magnetic field with defined N and S poles.'
                }
            ]
        },

        // ===== Section 1: Magnetic Field B =====
        {
            id: 'magnetic-field-b',
            title: 'The Magnetic Field \\(\\vec{B}\\)',
            content: `
<h2>Defining the Magnetic Field</h2>

<p>Just as we introduced the electric field \\(\\vec{E}\\) to describe electric forces, we introduce the <strong>magnetic field</strong> \\(\\vec{B}\\) to describe magnetic forces. The magnetic field is a vector field: at every point in space, it has a magnitude and a direction.</p>

<div class="env-block definition">
<strong>The Magnetic Field \\(\\vec{B}\\)</strong><br>
The magnetic field at a point is defined by the force it exerts on a moving charge:
\\[
\\vec{F} = q\\vec{v} \\times \\vec{B}
\\]
The SI unit of \\(B\\) is the <strong>tesla</strong> (T). One tesla is one newton per ampere-metre:
\\[
1\\;\\text{T} = 1\\;\\frac{\\text{N}}{\\text{A}\\cdot\\text{m}} = 1\\;\\frac{\\text{kg}}{\\text{A}\\cdot\\text{s}^2}
\\]
</div>

<p>Notice something remarkable: the magnetic force depends on the <em>velocity</em> of the charge. A stationary charge feels no magnetic force at all. The force is also perpendicular to both \\(\\vec{v}\\) and \\(\\vec{B}\\) (that is what the cross product \\(\\times\\) means). This makes the magnetic force fundamentally different from the electric force, which acts on charges whether they move or not.</p>

<div class="env-block remark">
<strong>Typical magnetic field strengths</strong><br>
<ul>
<li>Earth's surface: \\(\\sim 50\\;\\mu\\text{T}\\) (0.00005 T)</li>
<li>Refrigerator magnet: \\(\\sim 5\\;\\text{mT}\\)</li>
<li>MRI scanner: \\(1.5\\text{--}3\\;\\text{T}\\)</li>
<li>Strongest lab magnets: \\(\\sim 45\\;\\text{T}\\)</li>
<li>Neutron star surface: \\(\\sim 10^8\\;\\text{T}\\)</li>
</ul>
</div>

<h3>Direction of \\(\\vec{B}\\)</h3>

<p>The direction of \\(\\vec{B}\\) at any point is the direction a compass needle would point if placed there. Outside a bar magnet, \\(\\vec{B}\\) points from N to S. Inside the magnet, \\(\\vec{B}\\) points from S to N (the field lines form closed loops).</p>

<div class="env-block warning">
<strong>\\(\\vec{B}\\) is not a force!</strong><br>
The magnetic field \\(\\vec{B}\\) describes the magnetic environment at a point. The force on a charge is \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\), which depends on the charge's velocity. Do not confuse the field with the force.
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A proton (\\(q = 1.6 \\times 10^{-19}\\) C) moves at \\(3 \\times 10^6\\) m/s perpendicular to a 0.5 T magnetic field. What is the magnitude of the magnetic force?',
                    hint: 'Use \\(F = qvB\\sin\\theta\\) with \\(\\theta = 90^\\circ\\).',
                    solution: '\\(F = qvB = 1.6 \\times 10^{-19} \\times 3 \\times 10^6 \\times 0.5 = 2.4 \\times 10^{-13}\\) N.'
                },
                {
                    question: 'Why does a magnetic field do no work on a moving charge?',
                    hint: 'Consider the direction of the force relative to the velocity.',
                    solution: 'The magnetic force \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) is always perpendicular to \\(\\vec{v}\\). Work is \\(W = \\vec{F} \\cdot \\vec{v}\\,dt\\). Since \\(\\vec{F} \\perp \\vec{v}\\), the dot product is zero, so no work is done. The magnetic force changes the direction of motion but not the speed.'
                }
            ]
        },

        // ===== Section 2: Field Lines of Bar Magnets =====
        {
            id: 'field-lines-bar-magnet',
            title: 'Field Lines of Bar Magnets',
            content: `
<h2>Visualizing the Invisible</h2>

<p>Magnetic field lines are our way of making the invisible visible. Sprinkle iron filings around a bar magnet, and they align along the field, revealing the beautiful pattern of curves flowing from N to S.</p>

<div class="env-block definition">
<strong>Magnetic Field Lines</strong><br>
<ul>
<li>Field lines emerge from the <strong>north pole</strong> and enter the <strong>south pole</strong> (outside the magnet).</li>
<li>Inside the magnet, they run from S to N, forming <strong>closed loops</strong>.</li>
<li>The <strong>density</strong> of field lines indicates field strength: crowded lines mean strong field.</li>
<li>Field lines never cross (the field has a unique direction at every point).</li>
</ul>
</div>

<p>The pattern is not just decorative; it encodes all the physics. Where field lines are dense, \\(B\\) is large. Where they spread out, \\(B\\) is weak. Near the poles, the field is strongest. Far from the magnet, the field weakens and the lines spread apart.</p>

<div class="viz-placeholder" data-viz="ch10-bar-magnet-field"></div>

<h3>Two Magnets Interacting</h3>

<p>When two magnets are brought close, their field lines interact. If opposite poles face each other (N toward S), the field lines connect smoothly between them: attraction. If like poles face each other (N toward N), the field lines push apart, creating a region of zero field between them: repulsion.</p>

<div class="viz-placeholder" data-viz="ch10-two-magnets"></div>

<div class="env-block intuition">
<strong>Iron filings as field-line probes</strong><br>
Each tiny iron filing becomes a temporary magnet in the external field and aligns along the local field direction. Thousands of them together trace out the full field pattern. This is one of the most beautiful experiments in physics, and you can try it at home with a bar magnet and a sheet of paper.
</div>
`,
            visualizations: [
                {
                    id: 'ch10-bar-magnet-field',
                    title: 'Bar Magnet: Flowing Field Lines',
                    description: 'Animated particles flow along magnetic field lines from the north pole (red) to the south pole (blue), like iron filings coming to life.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;

                        // Magnetic dipole field computation
                        // B_x = (3 m x y) / r^5,  B_y = (m(3y^2 - r^2)) / r^5  (simplified 2D dipole)
                        // We use the dipole placed at origin pointing along x
                        var m = 1e5; // dipole moment magnitude

                        function bField(px, py) {
                            var dx = px - cx, dy = py - cy;
                            var r2 = dx * dx + dy * dy;
                            var r = Math.sqrt(r2);
                            if (r < 25) return [0, 0, 0]; // inside magnet
                            var r5 = r2 * r2 * r;
                            // dipole along x-axis: m_x = m, m_y = 0
                            var bx = m * (3 * dx * dx / r2 - 1) / (r2 * r);
                            var by = m * (3 * dx * dy) / (r2 * r);
                            var mag = Math.sqrt(bx * bx + by * by);
                            return [bx, by, mag];
                        }

                        // Particles flowing along field lines
                        var particles = [];
                        var nParticles = 220;

                        function spawnParticle() {
                            // Spawn from N pole (right side of magnet)
                            var angle = (Math.random() - 0.5) * Math.PI * 1.2;
                            var sr = 30 + Math.random() * 5;
                            return {
                                x: cx + 35 + sr * Math.cos(angle) * 0.3,
                                y: cy + sr * Math.sin(angle),
                                age: 0,
                                maxAge: 150 + Math.random() * 200,
                                speed: 1.2 + Math.random() * 1.5
                            };
                        }

                        for (var i = 0; i < nParticles; i++) {
                            var p = spawnParticle();
                            p.age = Math.random() * p.maxAge;
                            particles.push(p);
                        }

                        function draw() {
                            viz.clear();

                            // Draw magnet body
                            var magW = 70, magH = 30;
                            // N pole (red)
                            var grad1 = ctx.createLinearGradient(cx, cy - magH/2, cx, cy + magH/2);
                            grad1.addColorStop(0, '#ff6666');
                            grad1.addColorStop(1, '#cc3333');
                            ctx.fillStyle = grad1;
                            ctx.fillRect(cx, cy - magH/2, magW/2, magH);
                            // S pole (blue)
                            var grad2 = ctx.createLinearGradient(cx, cy - magH/2, cx, cy + magH/2);
                            grad2.addColorStop(0, '#6688ee');
                            grad2.addColorStop(1, '#3355bb');
                            ctx.fillStyle = grad2;
                            ctx.fillRect(cx - magW/2, cy - magH/2, magW/2, magH);

                            ctx.strokeStyle = '#ffffff44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(cx - magW/2, cy - magH/2, magW, magH);

                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('N', cx + magW/4, cy);
                            ctx.fillText('S', cx - magW/4, cy);

                            // Magnet glow
                            var nglow = ctx.createRadialGradient(cx + magW/2, cy, 5, cx + magW/2, cy, 60);
                            nglow.addColorStop(0, 'rgba(255,80,80,0.25)');
                            nglow.addColorStop(1, 'rgba(255,80,80,0)');
                            ctx.fillStyle = nglow;
                            ctx.beginPath(); ctx.arc(cx + magW/2, cy, 60, 0, Math.PI * 2); ctx.fill();

                            var sglow = ctx.createRadialGradient(cx - magW/2, cy, 5, cx - magW/2, cy, 60);
                            sglow.addColorStop(0, 'rgba(80,100,255,0.25)');
                            sglow.addColorStop(1, 'rgba(80,100,255,0)');
                            ctx.fillStyle = sglow;
                            ctx.beginPath(); ctx.arc(cx - magW/2, cy, 60, 0, Math.PI * 2); ctx.fill();

                            // Update and draw particles
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                p.age++;
                                if (p.age > p.maxAge || p.x < 5 || p.x > w - 5 || p.y < 5 || p.y > h - 5) {
                                    particles[i] = spawnParticle();
                                    continue;
                                }

                                var b = bField(p.x, p.y);
                                var bmag = b[2];
                                if (bmag > 0.0001) {
                                    p.x += b[0] / bmag * p.speed;
                                    p.y += b[1] / bmag * p.speed;
                                } else {
                                    p.age = p.maxAge; // kill stagnant particles
                                }

                                // Color: red near N, blue near S, based on x position
                                var frac = VizEngine.clamp((p.x - (cx - magW/2)) / magW, 0, 1);
                                var r = Math.round(80 + 175 * frac);
                                var g = Math.round(60 + 40 * (1 - Math.abs(frac - 0.5) * 2));
                                var bl = Math.round(80 + 175 * (1 - frac));
                                var alpha = VizEngine.clamp(1 - p.age / p.maxAge, 0.1, 0.9);
                                var sz = 1.5 + bmag * 800;
                                sz = VizEngine.clamp(sz, 1, 3.5);

                                ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + bl + ',' + alpha + ')';
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Draw static field lines (faint curves)
                            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                            ctx.lineWidth = 1;
                            var nLines = 12;
                            for (var li = 0; li < nLines; li++) {
                                var startAngle = (li / nLines - 0.5) * Math.PI * 0.9;
                                var sx = cx + 38 * Math.cos(startAngle);
                                var sy = cy + 20 * Math.sin(startAngle);
                                ctx.beginPath();
                                ctx.moveTo(sx, sy);
                                var fx = sx, fy = sy;
                                for (var step = 0; step < 300; step++) {
                                    var bf = bField(fx, fy);
                                    if (bf[2] < 0.00001) break;
                                    fx += bf[0] / bf[2] * 2;
                                    fy += bf[1] / bf[2] * 2;
                                    if (fx < 0 || fx > w || fy < 0 || fy > h) break;
                                    ctx.lineTo(fx, fy);
                                }
                                ctx.stroke();
                            }

                            viz.screenText('Field lines flow from N to S outside the magnet', w/2, h - 14, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'ch10-two-magnets',
                    title: 'Two Magnets: Attract & Repel',
                    description: 'Drag the second magnet to see how field lines merge when opposite poles face each other (attraction) or push apart when like poles meet (repulsion).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;

                        // Magnet 1 is fixed on the left
                        var m1x = cx - 100, m1y = cy;
                        // Magnet 2 is draggable on the right
                        var m2x = cx + 100, m2y = cy;
                        var flipped = false;

                        VizEngine.createButton(controls, 'Flip Magnet 2', function() { flipped = !flipped; });

                        // Dragging for magnet 2
                        var dragging = false;
                        viz.canvas.addEventListener('mousedown', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left, my = e.clientY - rect.top;
                            if (Math.abs(mx - m2x) < 50 && Math.abs(my - m2y) < 30) dragging = true;
                        });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            m2x = VizEngine.clamp(e.clientX - rect.left, 60, w - 60);
                            m2y = VizEngine.clamp(e.clientY - rect.top, 40, h - 40);
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });
                        // Touch support
                        viz.canvas.addEventListener('touchstart', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.touches[0].clientX - rect.left, my = e.touches[0].clientY - rect.top;
                            if (Math.abs(mx - m2x) < 50 && Math.abs(my - m2y) < 30) { dragging = true; e.preventDefault(); }
                        }, {passive: false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            e.preventDefault();
                            var rect = viz.canvas.getBoundingClientRect();
                            m2x = VizEngine.clamp(e.touches[0].clientX - rect.left, 60, w - 60);
                            m2y = VizEngine.clamp(e.touches[0].clientY - rect.top, 40, h - 40);
                        }, {passive: false});
                        viz.canvas.addEventListener('touchend', function() { dragging = false; });

                        function dipoleB(ox, oy, dirx, px, py) {
                            var dx = px - ox, dy = py - oy;
                            var r2 = dx * dx + dy * dy;
                            var r = Math.sqrt(r2);
                            if (r < 20) return [0, 0];
                            var strength = 8e4;
                            var mx = strength * dirx, my = 0;
                            var r5 = r2 * r2 * r;
                            var mdotr = mx * dx + my * dy;
                            var bx = (3 * mdotr * dx / (r2 * r * r2) - mx / (r * r2));
                            var by = (3 * mdotr * dy / (r2 * r * r2) - my / (r * r2));
                            return [bx, by];
                        }

                        // Particles
                        var particles = [];
                        var nP = 200;
                        function newParticle(src) {
                            var angle = (Math.random() - 0.5) * Math.PI;
                            var ox = src === 0 ? m1x + 35 : m2x + (flipped ? -35 : 35);
                            var oy = src === 0 ? m1y : m2y;
                            return {
                                x: ox + Math.cos(angle) * 10,
                                y: oy + Math.sin(angle) * 15,
                                age: 0, maxAge: 120 + Math.random() * 100,
                                speed: 1.5 + Math.random(),
                                src: src
                            };
                        }
                        for (var i = 0; i < nP; i++) {
                            var pp = newParticle(i % 2);
                            pp.age = Math.random() * pp.maxAge;
                            particles.push(pp);
                        }

                        function draw() {
                            viz.clear();

                            var dir2 = flipped ? -1 : 1;

                            // Draw magnets
                            function drawMag(mx, my, dir) {
                                var mw = 60, mhh = 22;
                                if (dir > 0) {
                                    ctx.fillStyle = '#cc3333';
                                    ctx.fillRect(mx, my - mhh, mw/2, mhh * 2);
                                    ctx.fillStyle = '#3355bb';
                                    ctx.fillRect(mx - mw/2, my - mhh, mw/2, mhh * 2);
                                } else {
                                    ctx.fillStyle = '#3355bb';
                                    ctx.fillRect(mx, my - mhh, mw/2, mhh * 2);
                                    ctx.fillStyle = '#cc3333';
                                    ctx.fillRect(mx - mw/2, my - mhh, mw/2, mhh * 2);
                                }
                                ctx.strokeStyle = '#ffffff33';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(mx - mw/2, my - mhh, mw, mhh * 2);
                                ctx.fillStyle = '#fff';
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                if (dir > 0) {
                                    ctx.fillText('N', mx + mw/4, my);
                                    ctx.fillText('S', mx - mw/4, my);
                                } else {
                                    ctx.fillText('S', mx + mw/4, my);
                                    ctx.fillText('N', mx - mw/4, my);
                                }
                            }

                            drawMag(m1x, m1y, 1);
                            drawMag(m2x, m2y, dir2);

                            // Update particles
                            for (var i = 0; i < particles.length; i++) {
                                var p = particles[i];
                                p.age++;
                                if (p.age > p.maxAge || p.x < 2 || p.x > w - 2 || p.y < 2 || p.y > h - 2) {
                                    particles[i] = newParticle(i % 2);
                                    continue;
                                }
                                var b1 = dipoleB(m1x, m1y, 1, p.x, p.y);
                                var b2 = dipoleB(m2x, m2y, dir2, p.x, p.y);
                                var bx = b1[0] + b2[0], by = b1[1] + b2[1];
                                var bmag = Math.sqrt(bx * bx + by * by);
                                if (bmag > 0.0001) {
                                    p.x += bx / bmag * p.speed;
                                    p.y += by / bmag * p.speed;
                                } else {
                                    p.age = p.maxAge;
                                }

                                var alpha = VizEngine.clamp(1 - p.age / p.maxAge, 0.1, 0.8);
                                var clr = p.src === 0 ? 'rgba(255,120,80,' + alpha + ')' : 'rgba(80,150,255,' + alpha + ')';
                                ctx.fillStyle = clr;
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            var label = flipped ? 'Like poles facing: REPULSION' : 'Opposite poles facing: ATTRACTION';
                            var labelColor = flipped ? viz.colors.red : viz.colors.green;
                            viz.screenText(label, w/2, h - 14, labelColor, 12);
                            viz.screenText('Drag magnet 2', m2x, m2y - 32, viz.colors.text, 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At what point along the axis of a bar magnet is the field strongest?',
                    hint: 'Look at where the field lines are most concentrated.',
                    solution: 'The field is strongest at the poles (the ends of the magnet), where field lines converge most densely. Along the axis outside the magnet, the field decreases with distance from the pole.'
                },
                {
                    question: 'Can two magnetic field lines ever cross? Explain.',
                    hint: 'What would it mean physically if they crossed?',
                    solution: 'No. At any point, the magnetic field has a single, unique direction. If two field lines crossed, the field would have two directions at that point, which is a contradiction. Therefore field lines never cross.'
                }
            ]
        },

        // ===== Section 3: Earth's Magnetic Field =====
        {
            id: 'earth-magnetic-field',
            title: "Earth's Magnetic Field",
            content: `
<h2>A Giant Magnet</h2>

<p>The Earth behaves approximately like a giant bar magnet, with its magnetic south pole near the geographic north pole (that is why the north pole of a compass needle points north: it is attracted to the magnetic south pole there). The field is tilted about \\(11^\\circ\\) from the rotation axis.</p>

<div class="env-block warning">
<strong>Confusing naming convention</strong><br>
Earth's geographic north pole is near a magnetic <em>south</em> pole (since it attracts the north end of compass needles). This naming confusion is historical and permanent. When we say "the north magnetic pole," we mean the point where a compass needle's north end points downward (in northern Canada), which is actually a south-type magnetic pole.
</div>

<div class="viz-placeholder" data-viz="ch10-earth-field"></div>

<h3>Origin of Earth's Field</h3>

<p>Earth's magnetic field is generated by convection currents of molten iron in the outer core (the <strong>geodynamo</strong>). The flowing conducting liquid produces electric currents, which in turn produce the magnetic field. This field reverses polarity every few hundred thousand years. The most recent reversal was about 780,000 years ago.</p>

<h3>The Magnetosphere</h3>

<p>Earth's magnetic field extends far into space, forming the <strong>magnetosphere</strong>. It deflects the solar wind (a stream of charged particles from the Sun), protecting the atmosphere and life on the surface. Without the magnetosphere, the solar wind would strip away the atmosphere over geological time, as likely happened on Mars.</p>

<div class="env-block remark">
<strong>Magnetic declination and inclination</strong><br>
At most locations on Earth, a compass does not point exactly toward geographic north. The angle between magnetic north and geographic north is called <strong>declination</strong>. The angle that the field makes with the horizontal is called <strong>inclination</strong> (or dip). At the magnetic poles, the inclination is \\(90^\\circ\\) (the field points straight into the ground).
</div>
`,
            visualizations: [
                {
                    id: 'ch10-earth-field',
                    title: "Earth's Magnetic Field Cross-Section",
                    description: 'A cross-section of Earth showing the dipole magnetic field. Compass needles (small arrows) at various positions show how they align with the local field direction.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var earthR = Math.min(w, h) * 0.15;
                        var t = 0;

                        function dipoleField(px, py) {
                            // Dipole pointing downward (geographic N is magnetic S)
                            var dx = px - cx, dy = py - cy;
                            var r2 = dx * dx + dy * dy;
                            var r = Math.sqrt(r2);
                            if (r < earthR * 0.8) return [0, 0, 0];
                            var strength = 5e5;
                            // Dipole moment along -y (south magnetic pole at top)
                            var mx = 0, my = strength;
                            var r5 = r2 * r2 * r;
                            var mdotr = mx * dx + my * dy;
                            var bx = (3 * mdotr * dx / r5 - mx / (r * r2));
                            var by = (3 * mdotr * dy / r5 - my / (r * r2));
                            var mag = Math.sqrt(bx * bx + by * by);
                            return [bx, by, mag];
                        }

                        function draw(ts) {
                            t = ts * 0.001;
                            viz.clear();

                            // Stars
                            var seed = 54321;
                            for (var i = 0; i < 60; i++) {
                                seed = (seed * 16807) % 2147483647;
                                var sx = seed % w;
                                seed = (seed * 16807) % 2147483647;
                                var sy = seed % h;
                                seed = (seed * 16807) % 2147483647;
                                var br = 0.15 + (seed % 50) / 100;
                                ctx.fillStyle = 'rgba(200,220,255,' + br + ')';
                                ctx.beginPath(); ctx.arc(sx, sy, 0.7, 0, Math.PI * 2); ctx.fill();
                            }

                            // Draw field lines (static, traced from surface)
                            ctx.lineWidth = 1.2;
                            var nFieldLines = 16;
                            for (var li = 0; li < nFieldLines; li++) {
                                var startAngle = (li / nFieldLines) * Math.PI * 2;
                                var startR = earthR + 3;
                                var lx = cx + startR * Math.cos(startAngle);
                                var ly = cy + startR * Math.sin(startAngle);

                                ctx.beginPath();
                                ctx.moveTo(lx, ly);
                                var fx = lx, fy = ly;
                                var valid = true;
                                for (var step = 0; step < 400; step++) {
                                    var bf = dipoleField(fx, fy);
                                    if (bf[2] < 1e-6) { valid = false; break; }
                                    fx += bf[0] / bf[2] * 2.5;
                                    fy += bf[1] / bf[2] * 2.5;
                                    var dr = Math.sqrt((fx - cx) * (fx - cx) + (fy - cy) * (fy - cy));
                                    if (dr < earthR * 0.9) break;
                                    if (fx < -20 || fx > w + 20 || fy < -20 || fy > h + 20) break;
                                    ctx.lineTo(fx, fy);
                                }
                                var hue = (li / nFieldLines) * 60 + 200;
                                ctx.strokeStyle = VizEngine.hsl(hue, 60, 50) + '55';
                                ctx.stroke();
                            }

                            // Earth with blue-green gradient
                            var earthGrad = ctx.createRadialGradient(cx - earthR * 0.2, cy - earthR * 0.2, earthR * 0.1, cx, cy, earthR);
                            earthGrad.addColorStop(0, '#7ec8e3');
                            earthGrad.addColorStop(0.5, '#3a86c8');
                            earthGrad.addColorStop(1, '#1a3a5c');
                            ctx.fillStyle = earthGrad;
                            ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.fill();

                            // Continents suggestion
                            ctx.fillStyle = '#3aaa4a44';
                            ctx.beginPath(); ctx.arc(cx - earthR * 0.2, cy - earthR * 0.2, earthR * 0.25, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(cx + earthR * 0.15, cy + earthR * 0.1, earthR * 0.2, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Geographic N', cx, cy - earthR - 35);
                            ctx.fillText('(Magnetic S)', cx, cy - earthR - 22);
                            ctx.fillText('Geographic S', cx, cy + earthR + 30);
                            ctx.fillText('(Magnetic N)', cx, cy + earthR + 43);

                            // Compass needles at various positions
                            var compassPositions = [];
                            for (var ring = 1; ring <= 3; ring++) {
                                var cr = earthR * (1.3 + ring * 0.55);
                                var nc = 8 + ring * 2;
                                for (var ci = 0; ci < nc; ci++) {
                                    var ca = (ci / nc) * Math.PI * 2;
                                    compassPositions.push([cx + cr * Math.cos(ca), cy + cr * Math.sin(ca)]);
                                }
                            }

                            for (var ci = 0; ci < compassPositions.length; ci++) {
                                var cp = compassPositions[ci];
                                var bf = dipoleField(cp[0], cp[1]);
                                if (bf[2] < 1e-8) continue;
                                var angle = Math.atan2(bf[1], bf[0]);
                                var needleLen = 8;

                                // Red end (north-seeking)
                                ctx.strokeStyle = '#ff5555';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(cp[0], cp[1]);
                                ctx.lineTo(cp[0] + Math.cos(angle) * needleLen, cp[1] + Math.sin(angle) * needleLen);
                                ctx.stroke();

                                // White end (south-seeking)
                                ctx.strokeStyle = '#aaaaaa';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(cp[0], cp[1]);
                                ctx.lineTo(cp[0] - Math.cos(angle) * needleLen, cp[1] - Math.sin(angle) * needleLen);
                                ctx.stroke();
                            }

                            // Axis line (rotation axis)
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(cx, 10);
                            ctx.lineTo(cx, h - 10);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('Compass needles align with the local field', w/2, h - 12, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A compass needle points north. Is the north end of the needle attracted to a magnetic north pole or a magnetic south pole? Explain.',
                    hint: 'Opposite poles attract.',
                    solution: 'The north end of the compass is attracted to a magnetic south pole. Since opposite poles attract, and the north end of the compass needle points toward geographic north, the geographic north pole must be near a magnetic south pole.'
                },
                {
                    question: 'At the magnetic north pole of Earth (in northern Canada), what direction does a compass needle point?',
                    hint: 'Think about the inclination at a magnetic pole.',
                    solution: 'At the magnetic north pole, the field lines point straight into the ground (inclination = 90 degrees). A freely pivoting compass needle would point straight down. A horizontal compass would spin aimlessly because the horizontal component of the field is zero.'
                }
            ]
        },

        // ===== Section 4: Magnetic vs Electric Fields =====
        {
            id: 'magnetic-vs-electric',
            title: 'Magnetic vs Electric Fields',
            content: `
<h2>Two Faces of Electromagnetism</h2>

<p>We have now studied both electric fields (\\(\\vec{E}\\)) and magnetic fields (\\(\\vec{B}\\)). They share some features but differ in fundamental ways. Understanding these differences is essential before we combine them into the full electromagnetic theory.</p>

<div class="env-block theorem">
<strong>Comparison: Electric vs Magnetic Fields</strong><br>
<table style="width:100%; border-collapse:collapse; margin-top:8px;">
<tr style="border-bottom:1px solid #333;"><th style="text-align:left; padding:4px;">Property</th><th style="text-align:left; padding:4px;">Electric Field \\(\\vec{E}\\)</th><th style="text-align:left; padding:4px;">Magnetic Field \\(\\vec{B}\\)</th></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:4px;">Source</td><td style="padding:4px;">Electric charges</td><td style="padding:4px;">Moving charges (currents)</td></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:4px;">Monopoles?</td><td style="padding:4px;">Yes (\\(+\\) and \\(-\\) charges)</td><td style="padding:4px;">No (always dipoles)</td></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:4px;">Field lines</td><td style="padding:4px;">Begin on \\(+\\), end on \\(-\\)</td><td style="padding:4px;">Always closed loops</td></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:4px;">Force on charge \\(q\\)</td><td style="padding:4px;">\\(\\vec{F} = q\\vec{E}\\)</td><td style="padding:4px;">\\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\)</td></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:4px;">Requires motion?</td><td style="padding:4px;">No</td><td style="padding:4px;">Yes (\\(v = 0 \\Rightarrow F = 0\\))</td></tr>
<tr><td style="padding:4px;">Does work?</td><td style="padding:4px;">Yes</td><td style="padding:4px;">No (\\(\\vec{F} \\perp \\vec{v}\\))</td></tr>
</table>
</div>

<div class="env-block intuition">
<strong>A deeper unity</strong><br>
Electric and magnetic fields are not truly separate phenomena. They are two aspects of a single <strong>electromagnetic field</strong>. What looks like a pure electric field in one reference frame can appear as a mix of electric and magnetic fields in another frame moving relative to the first. This insight, from Einstein's special relativity, reveals that magnetism is a relativistic effect of electricity. We will build toward this unity in later chapters.
</div>

<h3>Key Takeaway</h3>

<p>The most critical difference for problem-solving: the electric force acts on any charge (moving or stationary) and can do work. The magnetic force acts only on moving charges and does no work (it changes direction, not speed). When both fields are present, the total force is the <strong>Lorentz force</strong>:</p>

\\[
\\vec{F} = q\\vec{E} + q\\vec{v} \\times \\vec{B}
\\]

<p>We will explore this force in detail in Chapter 13.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A charged particle moves through a region with both \\(\\vec{E}\\) and \\(\\vec{B}\\) fields. Which field can change the particle\'s kinetic energy? Why?',
                    hint: 'Which force can do work?',
                    solution: 'Only the electric field can change the kinetic energy. The electric force \\(q\\vec{E}\\) can be parallel to the velocity and thus do work (\\(W = \\vec{F} \\cdot \\Delta\\vec{r}\\)). The magnetic force \\(q\\vec{v} \\times \\vec{B}\\) is always perpendicular to \\(\\vec{v}\\), so it does zero work and cannot change the kinetic energy (only the direction of motion).'
                },
                {
                    question: 'Electric field lines can begin and end on charges. Why must magnetic field lines form closed loops?',
                    hint: 'Think about the existence (or non-existence) of magnetic monopoles.',
                    solution: 'Electric field lines begin on positive charges and end on negative charges because isolated charges (monopoles) exist. Magnetic monopoles do not exist, so magnetic field lines have no starting or ending point. They must form closed loops. This is expressed by Gauss\'s law for magnetism: \\(\\oint \\vec{B} \\cdot d\\vec{A} = 0\\).'
                }
            ]
        }
    ]
});
})();
