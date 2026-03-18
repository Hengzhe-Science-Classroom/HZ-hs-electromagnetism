// === Chapter 0: Charges & Coulomb's Law ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch00',
        number: 0,
        title: "Charges & Coulomb's Law",
        subtitle: 'The invisible force between stationary charges',
        file: 'ch00-coulomb',

        sections: [
            // ============================================================
            // Section 0: Electric Charge
            // ============================================================
            {
                id: 'electric-charge',
                title: 'Electric Charge',
                content: `
<h2>A Property of Matter You Cannot See</h2>

<p>Mass makes things heavy. Charge makes things attract or repel electrically. Every atom in your body contains charged particles: <strong>protons</strong> (positive) in the nucleus and <strong>electrons</strong> (negative) orbiting around it. Normally these charges balance, so you feel nothing. But rub a balloon on your hair, and you strip electrons from one surface to another, creating an imbalance. Suddenly, the balloon sticks to the wall.</p>

<div class="env-block definition">
<div class="env-title">Definition: Electric Charge</div>
<div class="env-body">
<p><strong>Electric charge</strong> is a fundamental property of matter that causes it to experience a force in the presence of other charged matter. Charge comes in two varieties, called <strong>positive</strong> (+) and <strong>negative</strong> (&minus;).</p>
</div>
</div>

<p>The most important rule in all of electrostatics:</p>

<ul>
<li><strong>Like charges repel</strong>: two positive charges push each other apart; two negative charges also push each other apart.</li>
<li><strong>Unlike charges attract</strong>: a positive charge and a negative charge pull each other together.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Where does charge come from?</div>
<div class="env-body">
<p>You cannot create or destroy charge. When you rub a balloon on your hair, you are not creating charge; you are <em>transferring</em> electrons from hair to balloon. The total charge of the universe does not change. This is the <strong>law of conservation of charge</strong>.</p>
</div>
</div>

<h3>Units</h3>

<p>Charge is measured in <strong>coulombs</strong> (C). One coulomb is an enormous amount of charge. A single electron carries a charge of \\(e = 1.602 \\times 10^{-19}\\,\\text{C}\\). That means it takes about \\(6.24 \\times 10^{18}\\) electrons to make one coulomb.</p>

<div class="env-block remark">
<div class="env-title">Sign convention</div>
<div class="env-body">
<p>We say electrons carry charge \\(-e\\) and protons carry charge \\(+e\\). The choice of which is "positive" and which is "negative" was made by Benjamin Franklin and stuck. If he had chosen the other way, all the signs in our equations would flip, but the physics would be identical.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-charge-intro"></div>
`,
                visualizations: [
                    {
                        id: 'viz-charge-intro',
                        title: 'Attraction and Repulsion',
                        description: 'Two charged particles interact. <strong>Red = positive</strong>, <strong>blue = negative</strong>. Drag them around and watch the force arrows change direction and magnitude. Like charges repel; unlike charges attract.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            // Override coordinate system: use pixel-based with custom mapping
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var q1 = { x: -3, y: 0, q: 1 };
                            var q2 = { x: 3, y: 0, q: -1 };
                            var kScale = 2.0; // visual scaling for force arrows

                            var d1 = viz.addDraggable('q1', q1.x, q1.y, viz.colors.red, 14);
                            var d2 = viz.addDraggable('q2', q2.x, q2.y, viz.colors.blue, 14);

                            var modeLabel = 'attract';
                            VizEngine.createButton(controls, 'Both +', function () {
                                q1.q = 1; q2.q = 1; modeLabel = 'repel';
                            });
                            VizEngine.createButton(controls, 'Both \u2212', function () {
                                q1.q = -1; q2.q = -1; modeLabel = 'repel';
                            });
                            VizEngine.createButton(controls, '+/\u2212', function () {
                                q1.q = 1; q2.q = -1; modeLabel = 'attract';
                            });

                            function draw() {
                                q1.x = d1.x; q1.y = d1.y;
                                q2.x = d2.x; q2.y = d2.y;

                                var dx = q2.x - q1.x;
                                var dy = q2.y - q1.y;
                                var r2 = dx * dx + dy * dy;
                                var r = Math.sqrt(r2);
                                if (r < 0.3) r = 0.3;
                                r2 = r * r;

                                // Coulomb force magnitude (visual units)
                                var F = kScale * Math.abs(q1.q * q2.q) / r2;
                                // Direction: attraction if product < 0, repulsion if > 0
                                var ux = dx / r, uy = dy / r;
                                var sign = (q1.q * q2.q > 0) ? -1 : 1; // repel=-1 (away), attract=+1 (toward)
                                // Force on q1 points toward q2 if attract, away if repel
                                var f1x = sign * ux * F;
                                var f1y = sign * uy * F;
                                var f2x = -f1x;
                                var f2y = -f1y;

                                viz.clear();

                                // Background glow between charges
                                var s1 = viz.toScreen(q1.x, q1.y);
                                var s2 = viz.toScreen(q2.x, q2.y);
                                var midX = (s1[0] + s2[0]) / 2;
                                var midY = (s1[1] + s2[1]) / 2;
                                var screenDist = Math.sqrt((s2[0] - s1[0]) ** 2 + (s2[1] - s1[1]) ** 2);
                                if (sign > 0) {
                                    // Attraction: warm glow between
                                    var grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, screenDist * 0.6);
                                    grad.addColorStop(0, 'rgba(255,180,80,0.06)');
                                    grad.addColorStop(1, 'rgba(255,180,80,0)');
                                    ctx.fillStyle = grad;
                                    ctx.fillRect(0, 0, w, h);
                                }

                                // Dashed line between charges
                                ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                                ctx.setLineDash([]);

                                // Force vectors on q1
                                var fClamp = Math.min(F, 4);
                                viz.drawVector(q1.x, q1.y, f1x / F * fClamp, f1y / F * fClamp,
                                    viz.colors.orange, '', 2.5, 12);
                                // Force vectors on q2
                                viz.drawVector(q2.x, q2.y, f2x / F * fClamp, f2y / F * fClamp,
                                    viz.colors.orange, '', 2.5, 12);

                                // Draw charges with glow
                                var c1 = q1.q > 0 ? viz.colors.red : viz.colors.blue;
                                var c2 = q2.q > 0 ? viz.colors.red : viz.colors.blue;
                                viz.drawBall(q1.x, q1.y, 0.35, c1, 3);
                                viz.drawBall(q2.x, q2.y, 0.35, c2, 3);

                                // Charge labels
                                viz.drawText(q1.q > 0 ? '+' : '\u2212', q1.x, q1.y, viz.colors.white, 18, 'center', 'middle');
                                viz.drawText(q2.q > 0 ? '+' : '\u2212', q2.x, q2.y, viz.colors.white, 18, 'center', 'middle');

                                // Force magnitude display
                                var Fval = (8.99 * Math.abs(q1.q * q2.q) / (r * r)).toFixed(2);
                                viz.screenText('r = ' + r.toFixed(2) + ' m', w / 2, h - 50, viz.colors.text, 12);
                                viz.screenText('F = k|q\u2081q\u2082|/r\u00B2 \u221D ' + (1 / r2).toFixed(3), w / 2, h - 32, viz.colors.orange, 13);
                                viz.screenText(sign > 0 ? 'ATTRACTION' : 'REPULSION', w / 2, 20, sign > 0 ? viz.colors.cyan : viz.colors.red, 14);

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A glass rod is rubbed with silk and gains a positive charge of \\(+5 \\times 10^{-8}\\,\\text{C}\\). What charge does the silk acquire? Why?',
                        hint: 'Think about conservation of charge. Where did the positive charge on the rod come from?',
                        solution: 'The silk acquires \\(-5 \\times 10^{-8}\\,\\text{C}\\). Charge is conserved: the electrons that left the rod went to the silk, giving the silk an equal and opposite charge.'
                    },
                    {
                        question: 'How many electrons are there in \\(-2\\,\\mu\\text{C}\\) of charge?',
                        hint: 'One electron has charge \\(1.6 \\times 10^{-19}\\,\\text{C}\\). Divide the total charge magnitude by the charge per electron.',
                        solution: '\\(N = \\frac{2 \\times 10^{-6}}{1.6 \\times 10^{-19}} = 1.25 \\times 10^{13}\\) electrons.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Conductors vs Insulators
            // ============================================================
            {
                id: 'conductors-insulators',
                title: 'Conductors vs Insulators',
                content: `
<h2>Materials That Share and Materials That Hoard</h2>

<p>Touch a metal doorknob after shuffling across carpet and you get a shock. Touch a wooden table, and nothing happens. The difference is in how the material treats its electrons.</p>

<div class="env-block definition">
<div class="env-title">Definition: Conductor</div>
<div class="env-body">
<p>A <strong>conductor</strong> is a material in which charge (specifically, electrons) can move freely. Metals are the most common conductors: copper, aluminum, silver, gold.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Insulator</div>
<div class="env-body">
<p>An <strong>insulator</strong> (or dielectric) is a material in which charges are locked in place and cannot move freely. Examples: glass, rubber, plastic, dry wood.</p>
</div>
</div>

<p>In a metal, the outermost electrons of each atom are loosely bound and form a "sea" of free electrons that can drift through the material. In an insulator, all electrons are tightly bound to their parent atoms.</p>

<h3>Charging by Contact and by Induction</h3>

<p>There are two main ways to charge an object:</p>

<ol>
<li><strong>Contact (conduction)</strong>: Touch a charged rod to a neutral conductor. Some charge transfers directly. Both objects end up with the same sign of charge.</li>
<li><strong>Induction</strong>: Bring a charged rod <em>near</em> (but not touching) a conductor. The free electrons in the conductor redistribute: they rush toward the rod if it is positive, or flee from it if it is negative. If you then ground the conductor (touch it to remove the repelled charge), it acquires a net charge <em>opposite</em> to the rod, without ever touching it.</li>
</ol>

<div class="env-block example">
<div class="env-title">Example: Charging by Induction</div>
<div class="env-body">
<p>A positively charged rod is brought near a neutral metal sphere. The free electrons in the sphere are attracted toward the rod and accumulate on the near side. The far side becomes positively charged (electron deficit). Now touch the far side with your finger (grounding it): positive charges flow away to ground. Remove your finger, then remove the rod. The sphere is left with a net <strong>negative</strong> charge.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Semiconductors</div>
<div class="env-body">
<p>Between conductors and insulators lie <strong>semiconductors</strong> (silicon, germanium). Their conductivity can be controlled by temperature, light, or adding impurities ("doping"). Semiconductors are the foundation of all modern electronics, but that is a story for another course.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A negatively charged rod is brought near a neutral metal sphere but does not touch it. Describe the charge distribution on the sphere.',
                        hint: 'Think about what the free electrons in the conductor do when a negative rod approaches.',
                        solution: 'The free electrons in the sphere are repelled by the negative rod and migrate to the far side. The near side (closest to the rod) acquires a net positive charge (electron deficit), and the far side acquires a net negative charge. The sphere is still neutral overall.'
                    },
                    {
                        question: 'Why does a charged balloon stick to a wall even though the wall is neutral?',
                        hint: 'The wall is an insulator, but the charges within it can still shift slightly (polarization).',
                        solution: 'The charged balloon polarizes the wall surface: it pulls opposite charges slightly closer and pushes like charges slightly farther. The attractive force from the nearby opposite charges is stronger than the repulsive force from the more distant like charges (because Coulomb force depends on distance). The net result is attraction.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Coulomb's Law
            // ============================================================
            {
                id: 'coulombs-law',
                title: "Coulomb's Law",
                content: `
<h2>The Inverse-Square Law of Electrostatics</h2>

<p>Charles-Augustin de Coulomb measured the force between charged objects in 1785 using a torsion balance. His result is one of the most important equations in physics:</p>

<div class="env-block theorem">
<div class="env-title">Coulomb's Law</div>
<div class="env-body">
<p>The magnitude of the electrostatic force between two point charges \\(q_1\\) and \\(q_2\\) separated by distance \\(r\\) is:</p>
\\[F = k\\,\\frac{|q_1|\\,|q_2|}{r^2}\\]
<p>where \\(k = 8.99 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2\\) is Coulomb's constant.</p>
<p>The force is <strong>attractive</strong> if the charges have opposite signs, and <strong>repulsive</strong> if they have the same sign. The force acts along the line connecting the two charges.</p>
</div>
</div>

<p>Notice the structure: the force is proportional to each charge and inversely proportional to the square of the distance. Double the distance, the force drops to one-quarter. Triple the distance, the force drops to one-ninth. This \\(1/r^2\\) dependence is the same as Newton's law of gravitation, but with charge instead of mass and with the possibility of repulsion.</p>

<div class="env-block remark">
<div class="env-title">Comparison with gravity</div>
<div class="env-body">
<p>The gravitational force between a proton and an electron is about \\(10^{-47}\\,\\text{N}\\). The electrostatic force between them is about \\(10^{-8}\\,\\text{N}\\). Electrostatics is roughly \\(10^{39}\\) times stronger than gravity. The reason gravity dominates our everyday experience is that most objects are electrically neutral, so the enormous electric forces cancel out.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Two Point Charges</div>
<div class="env-body">
<p>Two charges \\(q_1 = +3\\,\\mu\\text{C}\\) and \\(q_2 = -5\\,\\mu\\text{C}\\) are separated by 0.2 m. Find the force between them.</p>
\\[F = (8.99 \\times 10^9)\\,\\frac{(3 \\times 10^{-6})(5 \\times 10^{-6})}{(0.2)^2} = (8.99 \\times 10^9)\\,\\frac{15 \\times 10^{-12}}{0.04} = 3.37\\,\\text{N}\\]
<p>The force is attractive (opposite signs) and directed along the line between them.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-coulomb-force"></div>

<h3>Vector Form</h3>

<p>In vector notation, the force on charge \\(q_1\\) due to charge \\(q_2\\) is:</p>

\\[\\vec{F}_{12} = k\\,\\frac{q_1\\,q_2}{r^2}\\,\\hat{r}_{12}\\]

<p>where \\(\\hat{r}_{12}\\) is the unit vector pointing from \\(q_2\\) to \\(q_1\\). If \\(q_1 q_2 > 0\\), the force points away from \\(q_2\\) (repulsion). If \\(q_1 q_2 < 0\\), the force points toward \\(q_2\\) (attraction). The sign takes care of the direction automatically.</p>
`,
                visualizations: [
                    {
                        id: 'viz-coulomb-force',
                        title: "Coulomb's Law: Force vs Distance",
                        description: 'Drag the two charges to see how the force changes with distance. The orange arrows show force vectors (length proportional to magnitude). The graph on the right plots \\(F\\) vs \\(r\\) in real time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 60, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            // Left panel: charges; Right panel: graph
                            var splitX = w * 0.55;

                            var q1Val = 2, q2Val = -3;
                            var sl1 = VizEngine.createSlider(controls, 'q\u2081 (\u03BCC)', -5, 5, q1Val, 0.5, function (v) { q1Val = v; });
                            var sl2 = VizEngine.createSlider(controls, 'q\u2082 (\u03BCC)', -5, 5, q2Val, 0.5, function (v) { q2Val = v; });

                            var d1 = viz.addDraggable('q1', -2, 0, viz.colors.red, 12);
                            var d2 = viz.addDraggable('q2', 4, 0, viz.colors.blue, 12);

                            function draw() {
                                viz.clear();

                                var x1 = d1.x, y1 = d1.y;
                                var x2 = d2.x, y2 = d2.y;

                                var dx = x2 - x1, dy = y2 - y1;
                                var r = Math.sqrt(dx * dx + dy * dy);
                                if (r < 0.2) r = 0.2;
                                var r2 = r * r;
                                var k = 8.99;
                                var F = k * Math.abs(q1Val * q2Val) / r2; // in "visual" N (since q in uC and r in m)
                                var product = q1Val * q2Val;
                                var attract = product < 0;
                                var ux = dx / r, uy = dy / r;

                                // Draw divider
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(splitX, 0); ctx.lineTo(splitX, h); ctx.stroke();

                                // === Left panel: charges and forces ===
                                // Connection line
                                var s1 = viz.toScreen(x1, y1), s2 = viz.toScreen(x2, y2);
                                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                                ctx.setLineDash([]);

                                // Force arrows (clamped for display)
                                var fScale = Math.min(F * 0.05, 3);
                                var sign = attract ? 1 : -1;
                                viz.drawVector(x1, y1, sign * ux * fScale, sign * uy * fScale, viz.colors.orange, '', 2.5, 11);
                                viz.drawVector(x2, y2, -sign * ux * fScale, -sign * uy * fScale, viz.colors.orange, '', 2.5, 11);

                                // Charges
                                var c1 = q1Val >= 0 ? viz.colors.red : viz.colors.blue;
                                var c2 = q2Val >= 0 ? viz.colors.red : viz.colors.blue;
                                viz.drawBall(x1, y1, 0.3, c1, 3);
                                viz.drawBall(x2, y2, 0.3, c2, 3);
                                viz.drawText(q1Val >= 0 ? '+' : '\u2212', x1, y1, viz.colors.white, 16, 'center', 'middle');
                                viz.drawText(q2Val >= 0 ? '+' : '\u2212', x2, y2, viz.colors.white, 16, 'center', 'middle');

                                // Info text
                                viz.screenText('r = ' + r.toFixed(2) + ' m', splitX / 2, h - 35, viz.colors.text, 12);
                                viz.screenText('F = ' + F.toFixed(2) + ' N', splitX / 2, h - 18, viz.colors.orange, 13);

                                // === Right panel: F vs r graph ===
                                var gLeft = splitX + 40, gRight = w - 20;
                                var gTop = 30, gBot = h - 30;
                                var gW = gRight - gLeft, gH = gBot - gTop;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(gLeft, gBot); ctx.lineTo(gRight, gBot); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(gLeft, gBot); ctx.lineTo(gLeft, gTop); ctx.stroke();
                                viz.screenText('r (m)', (gLeft + gRight) / 2, gBot + 16, viz.colors.text, 11);
                                viz.screenText('F (N)', gLeft - 8, gTop - 8, viz.colors.text, 11);

                                // Plot F = kq1q2/r^2
                                var rMax = 8, FMax = k * Math.abs(q1Val * q2Val) / (0.5 * 0.5) * 0.5;
                                if (FMax < 1) FMax = 10;
                                ctx.strokeStyle = viz.colors.cyan; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 200; i++) {
                                    var rr = 0.3 + (rMax - 0.3) * i / 200;
                                    var ff = k * Math.abs(q1Val * q2Val) / (rr * rr);
                                    var px = gLeft + (rr / rMax) * gW;
                                    var py = gBot - (ff / FMax) * gH;
                                    if (py < gTop) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Current point
                                var cpx = gLeft + (r / rMax) * gW;
                                var cpy = gBot - (F / FMax) * gH;
                                cpy = Math.max(gTop, cpy);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(cpx, cpy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange; ctx.shadowBlur = 10;
                                ctx.beginPath(); ctx.arc(cpx, cpy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Tick marks
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                for (var tick = 1; tick <= 7; tick++) {
                                    var tx = gLeft + (tick / rMax) * gW;
                                    ctx.fillText(tick, tx, gBot + 3);
                                }

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two identical charges of \\(+4\\,\\mu\\text{C}\\) are separated by 0.3 m. Find the magnitude of the force between them.',
                        hint: 'Apply Coulomb\'s law directly: \\(F = k|q_1||q_2|/r^2\\).',
                        solution: '\\(F = (8.99 \\times 10^9) \\times \\frac{(4 \\times 10^{-6})^2}{(0.3)^2} = (8.99 \\times 10^9) \\times \\frac{16 \\times 10^{-12}}{0.09} = 1.60\\,\\text{N}\\). The force is repulsive.'
                    },
                    {
                        question: 'If the distance between two charges is tripled, by what factor does the Coulomb force change?',
                        hint: 'The force depends on \\(1/r^2\\). If \\(r \\to 3r\\), what happens to \\(r^2\\)?',
                        solution: '\\(r^2 \\to (3r)^2 = 9r^2\\). So \\(F \\to F/9\\). The force decreases by a factor of 9.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Superposition of Forces
            // ============================================================
            {
                id: 'superposition',
                title: 'Superposition of Forces',
                content: `
<h2>Adding Up the Contributions</h2>

<p>What if there are more than two charges? Each pair of charges exerts a Coulomb force on each other, completely unaffected by the presence of any other charges. The total force on any one charge is the <strong>vector sum</strong> of all the individual Coulomb forces from every other charge.</p>

<div class="env-block theorem">
<div class="env-title">Principle of Superposition</div>
<div class="env-body">
<p>The net electrostatic force on a charge \\(q_0\\) due to a collection of charges \\(q_1, q_2, \\ldots, q_N\\) is:</p>
\\[\\vec{F}_{\\text{net}} = \\vec{F}_{01} + \\vec{F}_{02} + \\cdots + \\vec{F}_{0N} = \\sum_{i=1}^{N} k\\,\\frac{q_0\\,q_i}{r_{0i}^2}\\,\\hat{r}_{0i}\\]
<p>Each force is calculated as if the other charges were not there, and then all forces are added as vectors.</p>
</div>
</div>

<p>This is a remarkable statement. It means the force between \\(q_0\\) and \\(q_1\\) does not depend on where \\(q_2\\) is. Each interaction is independent. (This linearity breaks down in extreme conditions, but for all of classical electromagnetism, it holds perfectly.)</p>

<div class="env-block example">
<div class="env-title">Example: Three Collinear Charges</div>
<div class="env-body">
<p>Three charges lie on the x-axis: \\(q_1 = +2\\,\\mu\\text{C}\\) at \\(x = 0\\), \\(q_2 = -3\\,\\mu\\text{C}\\) at \\(x = 0.4\\,\\text{m}\\), and \\(q_3 = +1\\,\\mu\\text{C}\\) at \\(x = 1.0\\,\\text{m}\\). Find the net force on \\(q_2\\).</p>
<p><strong>Force from \\(q_1\\) on \\(q_2\\)</strong>: attractive (opposite signs), directed in the \\(-x\\) direction.</p>
\\[F_{21} = (8.99 \\times 10^9)\\frac{(2 \\times 10^{-6})(3 \\times 10^{-6})}{(0.4)^2} = 0.337\\,\\text{N}\\quad(\\text{toward } q_1, \\;-x)\\]
<p><strong>Force from \\(q_3\\) on \\(q_2\\)</strong>: attractive (opposite signs), directed in the \\(+x\\) direction.</p>
\\[F_{23} = (8.99 \\times 10^9)\\frac{(3 \\times 10^{-6})(1 \\times 10^{-6})}{(0.6)^2} = 0.0749\\,\\text{N}\\quad(\\text{toward } q_3, \\;+x)\\]
<p><strong>Net force on \\(q_2\\)</strong>: \\(F_{\\text{net}} = -0.337 + 0.0749 = -0.262\\,\\text{N}\\) (in the \\(-x\\) direction).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-superposition"></div>
`,
                visualizations: [
                    {
                        id: 'viz-superposition',
                        title: 'Superposition: Net Force on a Test Charge',
                        description: 'Three source charges (draggable) each exert a force on the central <strong>test charge</strong> (gold). Individual force vectors in color; the net force vector in white. Drag any charge to see the forces update in real time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var charges = [
                                { x: -4, y: 2, q: 3 },
                                { x: 3, y: 3, q: -2 },
                                { x: 2, y: -3, q: 4 }
                            ];
                            var test = { x: 0, y: 0, q: 1 };

                            var chargeColors = [viz.colors.red, viz.colors.blue, viz.colors.red];
                            var forceColors = [viz.colors.pink, viz.colors.cyan, viz.colors.green];

                            var drags = charges.map(function (c, i) {
                                return viz.addDraggable('q' + i, c.x, c.y, c.q > 0 ? viz.colors.red : viz.colors.blue, 12);
                            });
                            var dTest = viz.addDraggable('qt', test.x, test.y, viz.colors.gold, 10);

                            function draw() {
                                for (var i = 0; i < charges.length; i++) {
                                    charges[i].x = drags[i].x;
                                    charges[i].y = drags[i].y;
                                    drags[i].color = charges[i].q > 0 ? viz.colors.red : viz.colors.blue;
                                }
                                test.x = dTest.x; test.y = dTest.y;

                                viz.clear();
                                viz.drawGrid();

                                var netFx = 0, netFy = 0;
                                var forces = [];
                                var kk = 2.0; // visual scale

                                for (var j = 0; j < charges.length; j++) {
                                    var dx = test.x - charges[j].x;
                                    var dy = test.y - charges[j].y;
                                    var r2 = dx * dx + dy * dy;
                                    var r = Math.sqrt(r2);
                                    if (r < 0.3) r = 0.3;
                                    r2 = r * r;
                                    var F = kk * test.q * charges[j].q / r2;
                                    // If same sign (repulsion), force on test points away from source
                                    // F > 0 means repulsion, < 0 means attraction
                                    var ux = dx / r, uy = dy / r;
                                    var fx = F * ux, fy = F * uy;
                                    forces.push({ fx: fx, fy: fy });
                                    netFx += fx;
                                    netFy += fy;
                                }

                                // Draw individual force vectors
                                for (var j2 = 0; j2 < forces.length; j2++) {
                                    var fLen = Math.sqrt(forces[j2].fx * forces[j2].fx + forces[j2].fy * forces[j2].fy);
                                    if (fLen > 0.01) {
                                        viz.drawVector(test.x, test.y, forces[j2].fx, forces[j2].fy, forceColors[j2], '', 2, 9);
                                    }
                                }

                                // Net force vector (white, thicker)
                                var netLen = Math.sqrt(netFx * netFx + netFy * netFy);
                                if (netLen > 0.01) {
                                    viz.drawVector(test.x, test.y, netFx, netFy, viz.colors.white, 'F_net', 3, 12);
                                }

                                // Draw source charges
                                for (var j3 = 0; j3 < charges.length; j3++) {
                                    var cc = charges[j3].q > 0 ? viz.colors.red : viz.colors.blue;
                                    viz.drawBall(charges[j3].x, charges[j3].y, 0.28, cc, 2.5);
                                    viz.drawText(charges[j3].q > 0 ? '+' : '\u2212', charges[j3].x, charges[j3].y, viz.colors.white, 15, 'center', 'middle');
                                    viz.drawText('q' + (j3 + 1) + '=' + charges[j3].q + '\u03BCC', charges[j3].x, charges[j3].y + 0.6, forceColors[j3], 10, 'center', 'top');
                                }

                                // Test charge
                                viz.drawBall(test.x, test.y, 0.22, viz.colors.gold, 2);
                                viz.drawText('q\u2080', test.x, test.y - 0.5, viz.colors.gold, 12, 'center', 'bottom');

                                // Legend
                                var ly = 16;
                                for (var j4 = 0; j4 < forces.length; j4++) {
                                    viz.screenText('\u2014 F from q' + (j4 + 1), 16, ly, forceColors[j4], 11, 'left', 'top');
                                    ly += 16;
                                }
                                viz.screenText('\u2014 F_net', 16, ly, viz.colors.white, 11, 'left', 'top');

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Three charges are at the corners of an equilateral triangle with side length 0.5 m: \\(q_1 = +1\\,\\mu\\text{C}\\), \\(q_2 = +1\\,\\mu\\text{C}\\), \\(q_3 = -1\\,\\mu\\text{C}\\). Find the net force on \\(q_3\\).',
                        hint: 'Calculate the force from \\(q_1\\) on \\(q_3\\) and from \\(q_2\\) on \\(q_3\\) separately, then add them as vectors. By symmetry, the horizontal components cancel.',
                        solution: 'Each force has magnitude \\(F = k(10^{-6})^2/(0.5)^2 = 0.036\\,\\text{N}\\). Both forces are attractive (pulling \\(q_3\\) toward \\(q_1\\) and \\(q_2\\)). By symmetry, the horizontal components cancel. The vertical components add: \\(F_{\\text{net}} = 2 \\times 0.036 \\times \\cos(30^\\circ) = 0.062\\,\\text{N}\\), directed toward the midpoint of \\(q_1 q_2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Quantization of Charge
            // ============================================================
            {
                id: 'quantization',
                title: 'Quantization of Charge',
                content: `
<h2>Charge Comes in Packets</h2>

<p>You can have 1, 2, or 17 electrons, but you cannot have 1.5 electrons. Charge is <strong>quantized</strong>: it always appears in integer multiples of the elementary charge \\(e\\).</p>

<div class="env-block theorem">
<div class="env-title">Quantization of Charge</div>
<div class="env-body">
<p>Any observable charge \\(q\\) satisfies:</p>
\\[q = n\\,e, \\quad n \\in \\mathbb{Z}\\]
<p>where \\(e = 1.602 \\times 10^{-19}\\,\\text{C}\\) is the elementary charge and \\(n\\) is an integer (positive, negative, or zero).</p>
</div>
</div>

<p>Robert Millikan demonstrated this in his famous oil-drop experiment (1909). He suspended tiny charged oil droplets in an electric field and measured their charges. Every droplet had a charge that was an integer multiple of the same fundamental value, which he determined to be about \\(1.6 \\times 10^{-19}\\,\\text{C}\\).</p>

<div class="env-block remark">
<div class="env-title">Quarks have fractional charge</div>
<div class="env-body">
<p>Protons and neutrons are made of quarks, which carry charges of \\(+2e/3\\) or \\(-e/3\\). However, quarks are permanently confined inside protons and neutrons and cannot be isolated. Every particle you can observe in isolation carries an integer multiple of \\(e\\). So for all practical purposes, charge quantization in multiples of \\(e\\) holds.</p>
</div>
</div>

<h3>Why Quantization Matters</h3>

<p>At the macroscopic level, charge appears continuous because the elementary charge is so tiny. A microcoulomb contains about \\(10^{13}\\) elementary charges, so the "graininess" is invisible. But at the atomic level, the discrete nature of charge is everything. Chemistry, electronics, and quantum mechanics all depend on the fact that electrons come one at a time.</p>

<div class="env-block example">
<div class="env-title">Example: Millikan's Measurement</div>
<div class="env-body">
<p>In Millikan's experiment, five oil drops were measured to have charges of \\(6.41 \\times 10^{-19}\\,\\text{C}\\), \\(9.62 \\times 10^{-19}\\,\\text{C}\\), \\(1.60 \\times 10^{-19}\\,\\text{C}\\), \\(4.81 \\times 10^{-19}\\,\\text{C}\\), and \\(3.21 \\times 10^{-19}\\,\\text{C}\\). Dividing each by \\(1.60 \\times 10^{-19}\\) gives approximately 4, 6, 1, 3, and 2. All integers, confirming quantization.</p>
</div>
</div>

<h3>Conservation + Quantization: Two Unbreakable Rules</h3>

<p>Together, conservation and quantization of charge are among the most precisely tested laws in all of physics. No experiment has ever found a violation of either. They constrain every process in nature: when a neutron decays into a proton, electron, and antineutrino, the total charge before (0) equals the total charge after (\\(+e - e + 0 = 0\\)).</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An object has a charge of \\(-3.2 \\times 10^{-18}\\,\\text{C}\\). How many excess electrons does it have?',
                        hint: 'Divide the magnitude of the charge by the elementary charge \\(e = 1.6 \\times 10^{-19}\\,\\text{C}\\).',
                        solution: '\\(n = \\frac{3.2 \\times 10^{-18}}{1.6 \\times 10^{-19}} = 20\\) excess electrons.'
                    },
                    {
                        question: 'Can an object have a charge of \\(2.4 \\times 10^{-19}\\,\\text{C}\\)?',
                        hint: 'Check if this is an integer multiple of \\(e = 1.6 \\times 10^{-19}\\,\\text{C}\\).',
                        solution: '\\(2.4 \\times 10^{-19} / 1.6 \\times 10^{-19} = 1.5\\). Since 1.5 is not an integer, this charge is <strong>not possible</strong> for an isolated object. Charge must be an integer multiple of \\(e\\).'
                    }
                ]
            }
        ]
    });
})();
