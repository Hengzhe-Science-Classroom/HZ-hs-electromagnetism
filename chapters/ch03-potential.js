// === Chapter 3: Electric Potential ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch03',
        number: 3,
        title: 'Electric Potential',
        subtitle: 'Energy, voltage, and the landscape of charge',
        file: 'ch03-potential',

        sections: [
            // ============================================================
            // Section 0: Potential Energy
            // ============================================================
            {
                id: 'potential-energy',
                title: 'Potential Energy',
                content: `
<h2>Work and Energy in Electric Fields</h2>

<p>In mechanics, lifting a ball against gravity stores potential energy. The same idea applies to charges. Moving a positive charge against an electric field (toward a region of higher potential) requires work, and that work is stored as <strong>electric potential energy</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Potential Energy</div>
<div class="env-body">
<p>The <strong>electric potential energy</strong> \\(U\\) of a system of two point charges \\(q_1\\) and \\(q_2\\) separated by distance \\(r\\) is:</p>
\\[U = k\\,\\frac{q_1\\,q_2}{r}\\]
<p>If the charges are the same sign, \\(U > 0\\) (energy stored by pushing them together). If opposite signs, \\(U < 0\\) (energy released as they come together).</p>
</div>
</div>

<p>Notice the potential energy depends on \\(1/r\\), not \\(1/r^2\\). The force is the negative derivative of the energy: \\(F = -dU/dr\\), and indeed \\(-d(kq_1q_2/r)/dr = kq_1q_2/r^2\\), recovering Coulomb's law.</p>

<div class="env-block intuition">
<div class="env-title">The gravity analogy</div>
<div class="env-body">
<p>Gravitational potential energy near Earth's surface is \\(U = mgh\\). A ball at height \\(h\\) "wants" to roll downhill, converting potential energy to kinetic energy. Similarly, a positive charge in an electric field "wants" to move from high potential energy to low potential energy, accelerating as it goes.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body">
<p>A proton (\\(+e\\)) and an electron (\\(-e\\)) are separated by \\(r = 5.3 \\times 10^{-11}\\,\\text{m}\\) (the Bohr radius). Find their electric potential energy.</p>
\\[U = k\\frac{(+e)(-e)}{r} = -(8.99 \\times 10^9)\\frac{(1.6 \\times 10^{-19})^2}{5.3 \\times 10^{-11}} = -4.35 \\times 10^{-18}\\,\\text{J} = -27.2\\,\\text{eV}\\]
<p>Negative energy: you must do 27.2 eV of work to separate them to infinity. This is precisely the ionization energy of hydrogen.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two protons are held 1 fm (\\(10^{-15}\\,\\text{m}\\)) apart and then released. What is their combined kinetic energy when they are very far apart? (Ignore nuclear forces.)',
                        hint: 'All the initial potential energy converts to kinetic energy. \\(U = ke^2/r\\).',
                        solution: '\\(U = (8.99 \\times 10^9)(1.6 \\times 10^{-19})^2/10^{-15} = 2.30 \\times 10^{-13}\\,\\text{J} = 1.44\\,\\text{MeV}\\). At infinity, \\(U = 0\\), so the total KE is 1.44 MeV (split between the two protons).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Electric Potential Defined
            // ============================================================
            {
                id: 'potential-defined',
                title: 'Electric Potential Defined',
                content: `
<h2>Voltage: Energy per Unit Charge</h2>

<p>Just as we defined the electric field as force per unit charge (\\(\\vec{E} = \\vec{F}/q_0\\)), we define the <strong>electric potential</strong> as potential energy per unit charge:</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Potential</div>
<div class="env-body">
<p>The <strong>electric potential</strong> \\(V\\) at a point is the potential energy per unit positive test charge at that point:</p>
\\[V = \\frac{U}{q_0}\\]
<p>Units: joules per coulomb = <strong>volts</strong> (V). Named after Alessandro Volta.</p>
</div>
</div>

<p>The potential is a <em>scalar</em>, not a vector. At each point in space, it is a single number. This makes it much easier to work with than the electric field (a vector). Once you know \\(V\\) everywhere, you can recover \\(\\vec{E}\\) by taking derivatives (more on this in the last section).</p>

<div class="env-block definition">
<div class="env-title">Definition: Potential Difference (Voltage)</div>
<div class="env-body">
<p>The <strong>potential difference</strong> between two points A and B is:</p>
\\[\\Delta V = V_B - V_A = -\\int_A^B \\vec{E} \\cdot d\\vec{\\ell}\\]
<p>This is the work done per unit charge by the external agent in moving a test charge from A to B against the electric field.</p>
</div>
</div>

<p>In everyday language, "voltage" usually means potential difference. A 9V battery maintains a 9-volt potential difference between its terminals. This means 9 joules of work are done on every coulomb of charge that passes through the battery.</p>

<div class="env-block remark">
<div class="env-title">The electron-volt</div>
<div class="env-body">
<p>An <strong>electron-volt</strong> (eV) is the energy gained by one electron when it moves through a potential difference of 1 volt:</p>
\\[1\\,\\text{eV} = (1.6 \\times 10^{-19}\\,\\text{C})(1\\,\\text{V}) = 1.6 \\times 10^{-19}\\,\\text{J}\\]
<p>This tiny unit is used throughout atomic and nuclear physics.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body">
<p>An electron is accelerated from rest through a potential difference of 500 V. What is its final kinetic energy and speed?</p>
<p>KE = \\(|q|\\Delta V = (1.6 \\times 10^{-19})(500) = 8 \\times 10^{-17}\\,\\text{J} = 500\\,\\text{eV}\\).</p>
<p>Speed: \\(v = \\sqrt{2\\,\\text{KE}/m} = \\sqrt{2(8 \\times 10^{-17})/9.1 \\times 10^{-31}} = 1.33 \\times 10^7\\,\\text{m/s}\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'How much work is done by the electric field when a charge of \\(+3\\,\\mu\\text{C}\\) moves from a point at 200 V to a point at 50 V?',
                        hint: 'Work done by field: \\(W = q(V_A - V_B) = q \\cdot \\Delta V\\), where the charge moves from A to B.',
                        solution: '\\(W = q(V_A - V_B) = 3 \\times 10^{-6}(200 - 50) = 3 \\times 10^{-6} \\times 150 = 4.5 \\times 10^{-4}\\,\\text{J}\\). The field does positive work (the charge moves from high to low potential).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Potential of Point Charges
            // ============================================================
            {
                id: 'potential-point-charges',
                title: 'Potential of Point Charges',
                content: `
<h2>Building the Potential Landscape</h2>

<p>The potential created by a single point charge \\(Q\\) at distance \\(r\\) is:</p>

<div class="env-block theorem">
<div class="env-title">Potential of a Point Charge</div>
<div class="env-body">
\\[V = k\\,\\frac{Q}{r}\\]
<p>Positive charges create positive potential (a "hill"); negative charges create negative potential (a "valley"). The potential drops off as \\(1/r\\), not \\(1/r^2\\).</p>
</div>
</div>

<p>For multiple charges, the total potential at any point is the algebraic (scalar) sum of the individual potentials:</p>

\\[V_{\\text{total}} = \\sum_i k\\,\\frac{q_i}{r_i}\\]

<p>Because potential is a scalar, there is no need for vector addition. This is a major advantage over computing the electric field directly.</p>

<div class="env-block example">
<div class="env-title">Example: Two Charges</div>
<div class="env-body">
<p>A charge \\(+2\\,\\mu\\text{C}\\) is at the origin, and \\(-1\\,\\mu\\text{C}\\) is at \\(x = 0.5\\,\\text{m}\\). Find the potential at the midpoint \\(x = 0.25\\,\\text{m}\\).</p>
\\[V = k\\frac{2 \\times 10^{-6}}{0.25} + k\\frac{-1 \\times 10^{-6}}{0.25} = k \\times \\frac{10^{-6}}{0.25} = (8.99 \\times 10^9)(4 \\times 10^{-6}) = 3.60 \\times 10^4\\,\\text{V}\\]
</div>
</div>

<h3>Where is \\(V = 0\\)?</h3>

<p>For a single positive charge, \\(V = 0\\) only at infinity. But with multiple charges of mixed signs, \\(V = 0\\) can occur at finite locations where the positive contributions cancel the negative contributions. These \\(V = 0\\) surfaces are not necessarily the same as the places where \\(\\vec{E} = 0\\).</p>

<div class="env-block warning">
<div class="env-title">\\(V = 0\\) does not mean \\(E = 0\\)</div>
<div class="env-body">
<p>The potential is a scalar; the field is a vector. You can have \\(V = 0\\) at a point where \\(\\vec{E}\\) is large (the potential is just passing through zero, but changing rapidly). Conversely, \\(\\vec{E} = 0\\) does not mean \\(V = 0\\) (the potential might be a nonzero constant there).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two charges \\(+q\\) and \\(-q\\) are at \\(x = -d\\) and \\(x = +d\\). Find the potential at the origin and at a point on the y-axis at \\(y = d\\).',
                        hint: 'At the origin, the distances to both charges are equal (\\(d\\)). On the y-axis at \\(y = d\\), use the distance formula.',
                        solution: 'At origin: \\(V = kq/d + k(-q)/d = 0\\). At \\((0, d)\\): distance to each charge is \\(\\sqrt{d^2 + d^2} = d\\sqrt{2}\\), so \\(V = kq/(d\\sqrt{2}) + k(-q)/(d\\sqrt{2}) = 0\\). In fact, \\(V = 0\\) everywhere on the entire perpendicular bisector of the dipole (the y-axis).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Equipotential Surfaces
            // ============================================================
            {
                id: 'equipotentials',
                title: 'Equipotential Surfaces',
                content: `
<h2>Contour Maps of Voltage</h2>

<p>An <strong>equipotential surface</strong> (or equipotential line, in 2D) is a surface on which the potential \\(V\\) has the same value everywhere. If you walk along an equipotential, no work is done on or by the electric force, because the potential does not change.</p>

<div class="env-block definition">
<div class="env-title">Definition: Equipotential Surface</div>
<div class="env-body">
<p>An <strong>equipotential surface</strong> is a locus of points where \\(V = \\text{constant}\\). Key properties:</p>
<ul>
<li>\\(\\vec{E}\\) is always perpendicular to the equipotential surface.</li>
<li>No work is done when moving a charge along an equipotential.</li>
<li>Equipotential surfaces never cross each other.</li>
<li>They are closely spaced where the field is strong, widely spaced where the field is weak.</li>
</ul>
</div>
</div>

<p>For a single point charge, the equipotentials are concentric spheres. For a uniform field, they are parallel planes perpendicular to the field. For more complex charge distributions, they can take intricate shapes.</p>

<div class="viz-placeholder" data-viz="viz-potential-landscape"></div>

<div class="env-block intuition">
<div class="env-title">The topographic map analogy</div>
<div class="env-body">
<p>A topographic map shows contour lines of constant altitude. Walking along a contour line is easy (no elevation change). Walking perpendicular to the contour lines is the steepest ascent. Electric potential is the same: equipotentials are contour lines, and \\(\\vec{E}\\) always points "downhill" (from high \\(V\\) to low \\(V\\)), perpendicular to the contours.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-potential-landscape',
                        title: 'Potential Landscape with Equipotentials and Field Arrows',
                        description: 'A 2D color map of electric potential. <strong style="color:#f85149;">Red = high (positive)</strong>, <strong style="color:#58a6ff;">blue = low (negative)</strong>. White contour lines show equipotentials. Green arrows show \\(\\vec{E} = -\\nabla V\\) (pointing downhill). Drag charges to reshape the landscape. Click "Drop test charge" then click a location to release a charge and watch it roll downhill.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var charges = [
                                { x: -3, y: 0, q: 2 },
                                { x: 3, y: 0, q: -1 }
                            ];
                            var showGradient = true;
                            var testMode = false;
                            var testParticle = null;
                            var testTrail = [];

                            var drags = [];
                            function rebuildDrags() {
                                viz.draggables = [];
                                drags = charges.map(function (c, i) {
                                    return viz.addDraggable('q' + i, c.x, c.y, c.q > 0 ? viz.colors.red : viz.colors.blue, 12);
                                });
                            }
                            rebuildDrags();

                            VizEngine.createButton(controls, 'Dipole', function () {
                                charges = [{ x: -2.5, y: 0, q: 1 }, { x: 2.5, y: 0, q: -1 }];
                                rebuildDrags(); testParticle = null; testTrail = [];
                            });
                            VizEngine.createButton(controls, 'Single +', function () {
                                charges = [{ x: 0, y: 0, q: 2 }];
                                rebuildDrags(); testParticle = null; testTrail = [];
                            });
                            VizEngine.createButton(controls, 'Two +', function () {
                                charges = [{ x: -2, y: 0, q: 1 }, { x: 2, y: 0, q: 1 }];
                                rebuildDrags(); testParticle = null; testTrail = [];
                            });

                            var dropBtn = VizEngine.createButton(controls, 'Drop test charge', function () {
                                testMode = !testMode;
                                dropBtn.textContent = testMode ? 'Click canvas...' : 'Drop test charge';
                                dropBtn.style.background = testMode ? '#3fb95033' : '#1a1a40';
                            });

                            VizEngine.createButton(controls, 'Toggle E arrows', function () { showGradient = !showGradient; });

                            // Click handler for dropping test charge
                            viz.canvas.addEventListener('click', function (e) {
                                if (!testMode) return;
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var pos = viz.toMath(mx, my);
                                testParticle = { x: pos[0], y: pos[1], vx: 0, vy: 0 };
                                testTrail = [[pos[0], pos[1]]];
                                testMode = false;
                                dropBtn.textContent = 'Drop test charge';
                                dropBtn.style.background = '#1a1a40';
                            });

                            function potentialAt(px, py) {
                                var V = 0;
                                for (var i = 0; i < charges.length; i++) {
                                    var dx = px - charges[i].x;
                                    var dy = py - charges[i].y;
                                    var r = Math.sqrt(dx * dx + dy * dy);
                                    if (r < 0.2) r = 0.2;
                                    V += charges[i].q / r;
                                }
                                return V;
                            }

                            function fieldAt(px, py) {
                                var Ex = 0, Ey = 0;
                                for (var i = 0; i < charges.length; i++) {
                                    var dx = px - charges[i].x;
                                    var dy = py - charges[i].y;
                                    var r2 = dx * dx + dy * dy;
                                    if (r2 < 0.04) r2 = 0.04;
                                    var r = Math.sqrt(r2);
                                    var E = charges[i].q / r2;
                                    Ex += E * dx / r;
                                    Ey += E * dy / r;
                                }
                                return [Ex, Ey];
                            }

                            // Pre-create image data for heatmap
                            var resolution = 3; // pixel step size for heatmap
                            var imgW = Math.ceil(w / resolution);
                            var imgH = Math.ceil(h / resolution);

                            function draw() {
                                for (var i = 0; i < charges.length; i++) {
                                    if (drags[i]) {
                                        charges[i].x = drags[i].x;
                                        charges[i].y = drags[i].y;
                                        drags[i].color = charges[i].q > 0 ? viz.colors.red : viz.colors.blue;
                                    }
                                }

                                viz.clear();

                                if (charges.length === 0) {
                                    viz.screenText('Add charges using the presets above', w / 2, h / 2, viz.colors.text, 14);
                                    return;
                                }

                                // === Heatmap of potential ===
                                var imgData = ctx.createImageData(imgW, imgH);
                                var data = imgData.data;
                                var Vmax = 3; // clamp range

                                for (var py = 0; py < imgH; py++) {
                                    for (var px = 0; px < imgW; px++) {
                                        var worldPos = viz.toMath(px * resolution, py * resolution);
                                        var V = potentialAt(worldPos[0], worldPos[1]);
                                        // Map to color: positive = red, negative = blue, zero = dark
                                        var norm = VizEngine.clamp(V / Vmax, -1, 1);
                                        var r, g, b;
                                        if (norm > 0) {
                                            // Red channel
                                            r = Math.floor(40 + norm * 200);
                                            g = Math.floor(20 + norm * 40);
                                            b = Math.floor(30);
                                        } else {
                                            var an = -norm;
                                            r = Math.floor(20);
                                            g = Math.floor(20 + an * 60);
                                            b = Math.floor(40 + an * 200);
                                        }
                                        var idx = (py * imgW + px) * 4;
                                        data[idx] = r;
                                        data[idx + 1] = g;
                                        data[idx + 2] = b;
                                        data[idx + 3] = 255;
                                    }
                                }

                                // Draw scaled heatmap
                                var offCanvas = document.createElement('canvas');
                                offCanvas.width = imgW;
                                offCanvas.height = imgH;
                                var offCtx = offCanvas.getContext('2d');
                                offCtx.putImageData(imgData, 0, 0);
                                ctx.imageSmoothingEnabled = true;
                                ctx.drawImage(offCanvas, 0, 0, w, h);

                                // === Equipotential contours ===
                                // Draw contour lines by marching squares (simplified: draw where V crosses specific values)
                                var contourLevels = [-2, -1.5, -1, -0.5, -0.2, 0, 0.2, 0.5, 1, 1.5, 2, 3, 4];
                                var step = 4; // pixel step for contour detection
                                ctx.lineWidth = 0.8;

                                for (var cl = 0; cl < contourLevels.length; cl++) {
                                    var level = contourLevels[cl];
                                    var cColor = level === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
                                    var cWidth = level === 0 ? 1.5 : 0.7;
                                    ctx.strokeStyle = cColor;
                                    ctx.lineWidth = cWidth;

                                    for (var cy = 0; cy < h - step; cy += step) {
                                        for (var cx = 0; cx < w - step; cx += step) {
                                            var wp1 = viz.toMath(cx, cy);
                                            var wp2 = viz.toMath(cx + step, cy);
                                            var wp3 = viz.toMath(cx, cy + step);

                                            var v1 = potentialAt(wp1[0], wp1[1]);
                                            var v2 = potentialAt(wp2[0], wp2[1]);
                                            var v3 = potentialAt(wp3[0], wp3[1]);

                                            // Check horizontal edge
                                            if ((v1 - level) * (v2 - level) < 0) {
                                                var t = (level - v1) / (v2 - v1);
                                                var ix = cx + t * step;
                                                // Check if there is a matching crossing on adjacent edge
                                                if ((v1 - level) * (v3 - level) < 0) {
                                                    var t2 = (level - v1) / (v3 - v1);
                                                    var iy = cy + t2 * step;
                                                    ctx.beginPath();
                                                    ctx.moveTo(ix, cy);
                                                    ctx.lineTo(cx, iy);
                                                    ctx.stroke();
                                                }
                                            }
                                        }
                                    }
                                }

                                // === Gradient arrows (E = -grad V) ===
                                if (showGradient) {
                                    var arrowSpacing = 1.4;
                                    var xMin = -viz.originX / viz.scale;
                                    var xMax = (w - viz.originX) / viz.scale;
                                    var yMin = -(h - viz.originY) / viz.scale;
                                    var yMax = viz.originY / viz.scale;

                                    for (var ax = xMin + arrowSpacing / 2; ax < xMax; ax += arrowSpacing) {
                                        for (var ay = yMin + arrowSpacing / 2; ay < yMax; ay += arrowSpacing) {
                                            var tooClose = false;
                                            for (var ci = 0; ci < charges.length; ci++) {
                                                var ddx = ax - charges[ci].x;
                                                var ddy = ay - charges[ci].y;
                                                if (ddx * ddx + ddy * ddy < 0.6) { tooClose = true; break; }
                                            }
                                            if (tooClose) continue;

                                            var Ef = fieldAt(ax, ay);
                                            var emag = Math.sqrt(Ef[0] * Ef[0] + Ef[1] * Ef[1]);
                                            if (emag < 0.01) continue;

                                            var normE = Math.min(Math.log(1 + emag * 2) / 3, 1);
                                            var arrLen = 12 + normE * 12;
                                            var ux = Ef[0] / emag, uy = Ef[1] / emag;
                                            var spt = viz.toScreen(ax, ay);
                                            var ex = spt[0] + ux * arrLen;
                                            var ey = spt[1] - uy * arrLen;
                                            var aAngle = Math.atan2(ey - spt[1], ex - spt[0]);
                                            var headSz = 4;

                                            ctx.save();
                                            ctx.globalAlpha = 0.4 + normE * 0.4;
                                            ctx.strokeStyle = viz.colors.green;
                                            ctx.lineWidth = 1;
                                            ctx.beginPath();
                                            ctx.moveTo(spt[0], spt[1]);
                                            ctx.lineTo(ex - Math.cos(aAngle) * headSz * 0.5, ey - Math.sin(aAngle) * headSz * 0.5);
                                            ctx.stroke();
                                            ctx.fillStyle = viz.colors.green;
                                            ctx.beginPath();
                                            ctx.moveTo(ex, ey);
                                            ctx.lineTo(ex - headSz * Math.cos(aAngle - 0.4), ey - headSz * Math.sin(aAngle - 0.4));
                                            ctx.lineTo(ex - headSz * Math.cos(aAngle + 0.4), ey - headSz * Math.sin(aAngle + 0.4));
                                            ctx.closePath();
                                            ctx.fill();
                                            ctx.restore();
                                        }
                                    }
                                }

                                // === Test particle simulation ===
                                if (testParticle) {
                                    var pdt = 0.015;
                                    var pCharge = 1; // positive test charge
                                    for (var step2 = 0; step2 < 3; step2++) {
                                        var Ep = fieldAt(testParticle.x, testParticle.y);
                                        // F = qE, a = F/m, m=1 (arbitrary units)
                                        var ax2 = pCharge * Ep[0] * 2;
                                        var ay2 = pCharge * Ep[1] * 2;
                                        testParticle.vx += ax2 * pdt;
                                        testParticle.vy += ay2 * pdt;
                                        // Damping for visual stability
                                        testParticle.vx *= 0.995;
                                        testParticle.vy *= 0.995;
                                        testParticle.x += testParticle.vx * pdt;
                                        testParticle.y += testParticle.vy * pdt;
                                    }

                                    testTrail.push([testParticle.x, testParticle.y]);
                                    if (testTrail.length > 400) testTrail.shift();

                                    // Check bounds
                                    var psx = viz.toScreen(testParticle.x, testParticle.y);
                                    if (psx[0] < -20 || psx[0] > w + 20 || psx[1] < -20 || psx[1] > h + 20) {
                                        testParticle = null;
                                        testTrail = [];
                                    } else {
                                        // Check if hit a charge
                                        for (var ci2 = 0; ci2 < charges.length; ci2++) {
                                            var d2 = (testParticle.x - charges[ci2].x) ** 2 + (testParticle.y - charges[ci2].y) ** 2;
                                            if (d2 < 0.15) { testParticle = null; testTrail = []; break; }
                                        }
                                    }

                                    if (testTrail.length > 1) {
                                        viz.drawTrail(testTrail, viz.colors.gold, 0.7);
                                    }
                                    if (testParticle) {
                                        viz.drawBall(testParticle.x, testParticle.y, 0.15, viz.colors.gold, 2.5);
                                    }
                                }

                                // === Draw source charges ===
                                for (var ci3 = 0; ci3 < charges.length; ci3++) {
                                    var cc = charges[ci3].q > 0 ? viz.colors.red : viz.colors.blue;
                                    viz.drawBall(charges[ci3].x, charges[ci3].y, 0.28, cc, 3);
                                    viz.drawText(charges[ci3].q > 0 ? '+' + Math.abs(charges[ci3].q) : '\u2212' + Math.abs(charges[ci3].q),
                                        charges[ci3].x, charges[ci3].y, viz.colors.white, 14, 'center', 'middle');
                                }

                                // Legend
                                viz.screenText('V > 0', w - 50, 16, viz.colors.red, 11);
                                viz.screenText('V < 0', w - 50, 32, viz.colors.blue, 11);
                                viz.screenText('V = 0', w - 50, 48, viz.colors.white, 11);

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Looking at the potential landscape of a dipole, where are the equipotential lines closest together? What does this tell you about the field strength there?',
                        hint: 'Closely spaced equipotentials mean the potential changes rapidly over a short distance.',
                        solution: 'The equipotential lines are closest together near the charges. Since \\(E = -dV/dr\\), a rapid change in potential over a short distance means the electric field is strong. The field is strongest near the charges, exactly as expected from Coulomb\'s law.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Relationship Between E and V
            // ============================================================
            {
                id: 'e-and-v',
                title: 'Relationship Between E and V',
                content: `
<h2>The Field Is the Downhill Direction</h2>

<p>The electric field and the electric potential contain the same information, just in different forms. The field is the vector quantity; the potential is the scalar quantity. They are related by:</p>

<div class="env-block theorem">
<div class="env-title">E from V (The Gradient Relationship)</div>
<div class="env-body">
\\[\\vec{E} = -\\nabla V = -\\left(\\frac{\\partial V}{\\partial x}\\,\\hat{x} + \\frac{\\partial V}{\\partial y}\\,\\hat{y} + \\frac{\\partial V}{\\partial z}\\,\\hat{z}\\right)\\]
<p>In one dimension: \\(E_x = -dV/dx\\).</p>
<p>The electric field points in the direction of steepest <em>decrease</em> of potential, and its magnitude equals the rate of decrease.</p>
</div>
</div>

<p>This is why the green arrows in the potential landscape visualization always point "downhill" (from red to blue). The electric field drives positive charges from high potential to low potential.</p>

<div class="env-block intuition">
<div class="env-title">Why the minus sign?</div>
<div class="env-body">
<p>The minus sign in \\(\\vec{E} = -\\nabla V\\) means the field points from high potential to low potential (downhill). A positive charge released in the field accelerates downhill, losing potential energy and gaining kinetic energy, just like a ball rolling down a slope.</p>
</div>
</div>

<h3>In Practice: Uniform Field</h3>

<p>For a uniform field between parallel plates separated by distance \\(d\\) with potential difference \\(\\Delta V\\):</p>

\\[E = \\frac{\\Delta V}{d}\\]

<p>This is why the field is often expressed in volts per meter (V/m), which is the same as N/C.</p>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body">
<p>The potential in a region is given by \\(V(x, y) = 3x^2 - 2y\\) (in volts, with \\(x\\) and \\(y\\) in meters). Find the electric field.</p>
\\[E_x = -\\frac{\\partial V}{\\partial x} = -6x \\quad\\text{N/C}\\]
\\[E_y = -\\frac{\\partial V}{\\partial y} = 2 \\quad\\text{N/C}\\]
<p>At the point \\((1, 3)\\): \\(\\vec{E} = (-6\\,\\hat{x} + 2\\,\\hat{y})\\,\\text{N/C}\\), with magnitude \\(\\sqrt{36+4} = 6.32\\,\\text{N/C}\\).</p>
</div>
</div>

<h3>Summary: The Big Picture</h3>

<p>We now have three equivalent descriptions of electrostatic phenomena:</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #333;">
<th style="text-align:left;padding:6px;">Concept</th>
<th style="text-align:left;padding:6px;">Type</th>
<th style="text-align:left;padding:6px;">What it tells you</th>
</tr>
<tr style="border-bottom:1px solid #222;">
<td style="padding:6px;">Force \\(\\vec{F}\\)</td>
<td style="padding:6px;">Vector</td>
<td style="padding:6px;">Push/pull on a specific charge</td>
</tr>
<tr style="border-bottom:1px solid #222;">
<td style="padding:6px;">Field \\(\\vec{E}\\)</td>
<td style="padding:6px;">Vector</td>
<td style="padding:6px;">Force per unit charge (property of space)</td>
</tr>
<tr>
<td style="padding:6px;">Potential \\(V\\)</td>
<td style="padding:6px;">Scalar</td>
<td style="padding:6px;">Energy per unit charge (landscape of space)</td>
</tr>
</table>

<p>Each description leads to the others: \\(\\vec{F} = q\\vec{E}\\), \\(\\vec{E} = -\\nabla V\\), and \\(V = -\\int \\vec{E} \\cdot d\\vec{\\ell}\\). Mastering all three is the key to electrostatics.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'The potential in a region is \\(V = 100 - 25x\\) (volts, \\(x\\) in meters). (a) What is the electric field? (b) Is it uniform? (c) In which direction does a positive charge accelerate?',
                        hint: '\\(E_x = -dV/dx\\). Is the result constant?',
                        solution: '(a) \\(E_x = -dV/dx = -(-25) = 25\\,\\text{V/m}\\) in the \\(+x\\) direction. (b) Yes, it is uniform (constant everywhere, independent of \\(x\\)). (c) A positive charge accelerates in the direction of \\(\\vec{E}\\), which is the \\(+x\\) direction (from high potential at small \\(x\\) to low potential at large \\(x\\)).'
                    },
                    {
                        question: 'In the potential landscape visualization, a test charge is dropped. It accelerates toward the negative charge. Explain why using the concept of potential.',
                        hint: 'Where is the potential lowest? Where does the positive test charge "want" to go?',
                        solution: 'The negative source charge creates a potential "valley" (low \\(V\\)). The positive test charge moves from high potential to low potential, accelerating "downhill" toward the valley. This is the direction of \\(\\vec{E} = -\\nabla V\\). The test charge gains kinetic energy as it loses potential energy, accelerating toward the negative charge.'
                    }
                ]
            }
        ]
    });
})();
