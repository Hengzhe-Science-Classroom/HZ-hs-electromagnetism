// === Chapter 16: Lenz's Law ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: "Lenz's Law",
    subtitle: 'Nature opposes the change: induced currents fight back against their cause',
    sections: [
        // ============================================================
        // SECTION 1: The Direction of Induced Current
        // ============================================================
        {
            id: 'ch16-sec01',
            title: 'The Direction of Induced Current',
            content: `<h2>16.1 The Direction of Induced Current</h2>

<div class="env-block intuition">
    <div class="env-title">Chapter Overview</div>
    <div class="env-body">
        <p>Faraday's law tells us the <em>magnitude</em> of the induced EMF. But in which direction does the induced current flow? This chapter answers that question with <strong>Lenz's law</strong>, which has a beautifully simple logic: nature resists change. The induced current always flows in the direction that opposes the change in flux that caused it. We then explore dramatic consequences: eddy currents, magnetic braking, and the remarkable phenomenon of a magnet falling in slow motion through a copper tube.</p>
    </div>
</div>

<p>When a north pole approaches a coil, experiment shows that the current flows in the direction that makes the coil's near face act as a north pole, repelling the approaching magnet. When the north pole recedes, the current reverses, making the near face a south pole that attracts the departing magnet. In both cases the induced current <em>opposes</em> the motion.</p>

<div class="env-block remark">
    <div class="env-title">Why Must the Current Oppose?</div>
    <div class="env-body">
        <p>Suppose the induced current <em>aided</em> the change instead of opposing it. Then pushing a magnet toward a coil would create a current that attracted the magnet even more strongly, accelerating it, which would increase the flux change, creating even more current, and so on without limit. You would get infinite energy from nothing. This violates conservation of energy. Therefore, the induced current must oppose the change.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">The Right-Hand Rule for Induced Current</div>
    <div class="env-body">
        <p>To find the direction of induced current:</p>
        <ol>
            <li>Determine whether the flux through the loop is increasing or decreasing.</li>
            <li>The induced current creates a magnetic field that opposes the change: if flux is increasing, the induced field points opposite to the external field; if flux is decreasing, the induced field points in the same direction.</li>
            <li>Use the right-hand rule (curl the fingers of your right hand in the direction of current flow; your thumb points in the direction of the magnetic field it creates) to find the current direction.</li>
        </ol>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'A circular loop lies in a horizontal plane. A magnetic field points upward through the loop and is increasing. In what direction does the induced current flow when viewed from above?',
                    hint: 'The flux is increasing upward, so the induced current must create a field that opposes this increase (i.e., points downward). Use the right-hand rule.',
                    solution: 'The induced magnetic field must point downward (opposing the increase in upward flux). By the right-hand rule, this requires a clockwise current when viewed from above.'
                }
            ]
        },
        // ============================================================
        // SECTION 2: Lenz's Law Stated
        // ============================================================
        {
            id: 'ch16-sec02',
            title: "Lenz's Law Stated",
            content: `<h2>16.2 Lenz's Law</h2>

<div class="env-block theorem">
    <div class="env-title">Lenz's Law</div>
    <div class="env-body">
        <p>The induced current flows in the direction that creates a magnetic field opposing the change in magnetic flux that produced it.</p>
        <p>Equivalently: the induced EMF always acts to oppose the change in flux through the circuit.</p>
        <p>This is encoded in the negative sign of Faraday's law:</p>
        \\[ \\mathcal{E} = -\\frac{d\\Phi_B}{dt} \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 16.1 &mdash; Magnet Approaching a Loop</div>
    <div class="env-body">
        <p>A bar magnet (north pole leading) moves toward a conducting loop.</p>
        <ul>
            <li>The flux through the loop is increasing (more field lines entering).</li>
            <li>By Lenz's law, the induced current must create a field that opposes this increase, so the induced field points away from the magnet.</li>
            <li>The loop acts as a small magnet with its north pole facing the approaching magnet, repelling it.</li>
        </ul>
        <p>If the magnet is pulled away instead, the flux decreases, and the induced current reverses, making the near face a south pole that attracts the retreating magnet.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-lenz-coil"></div>

<div class="env-block intuition">
    <div class="env-title">Lenz's Law as Energy Conservation</div>
    <div class="env-body">
        <p>Lenz's law is fundamentally a statement of energy conservation. The energy in the induced current must come from somewhere. That somewhere is the mechanical work done against the opposing force. To push a magnet into a coil, you must do work against the repulsive force from the induced current. This mechanical work is what powers the electrical current.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-lenz-coil',
                    title: 'Lenz\'s Law: Induced Current Opposes the Change',
                    description: 'Drag the magnet toward or away from the coil. Animated electrons show the induced current direction. The coil\'s induced magnetic polarity is displayed, always opposing the change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 350, originY: 200, height: 420 });
                        var ctx = viz.ctx;
                        var magnetX = -5;
                        var prevMagnetX = -5;
                        var electronPhase = 0;
                        var currentDir = 0;

                        viz.addDraggable('magnet', magnetX, 0, viz.colors.red, 10, function(wx) {
                            magnetX = VizEngine.clamp(wx, -8, 5);
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            magnetX = -5;
                            viz.draggables[0].x = -5;
                            prevMagnetX = -5;
                            electronPhase = 0;
                            currentDir = 0;
                        });

                        function draw(ts) {
                            magnetX = viz.draggables[0].x;
                            var velocity = (magnetX - prevMagnetX) / 0.016;
                            prevMagnetX = magnetX;

                            // Current direction: positive velocity means approaching coil -> current opposes (CCW from magnet's perspective)
                            var dist = magnetX;
                            var r2 = dist * dist + 0.5;
                            var fluxRate = -velocity * 2.0 * dist / (r2 * r2);
                            currentDir = VizEngine.clamp(fluxRate * 5, -1, 1);
                            electronPhase += currentDir * 0.06;

                            viz.clear();
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            // --- Coil at x=0 (vertical ring) ---
                            var coilCx = viz.toScreen(0, 0)[0];
                            var coilCy = h / 2;
                            var coilRadius = 80;

                            // Coil as ellipse (seen from side)
                            ctx.save();
                            ctx.shadowColor = viz.colors.teal;
                            ctx.shadowBlur = 10 + Math.abs(currentDir) * 15;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.ellipse(coilCx, coilCy, 8, coilRadius, 0, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.restore();

                            // Animated electrons around coil
                            if (Math.abs(currentDir) > 0.02) {
                                var nElectrons = 10;
                                for (var e = 0; e < nElectrons; e++) {
                                    var eFrac = ((e / nElectrons) + electronPhase) % 1;
                                    if (eFrac < 0) eFrac += 1;
                                    var eAngle = eFrac * Math.PI * 2;
                                    var ex = coilCx + 8 * Math.cos(eAngle);
                                    var ey = coilCy + coilRadius * Math.sin(eAngle);
                                    var eAlpha = 0.3 + 0.5 * Math.abs(currentDir);
                                    ctx.fillStyle = 'rgba(255,215,0,' + eAlpha + ')';
                                    ctx.beginPath();
                                    ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
                                    ctx.fill();
                                    // Glow
                                    ctx.fillStyle = 'rgba(255,215,0,' + (eAlpha * 0.3) + ')';
                                    ctx.beginPath();
                                    ctx.arc(ex, ey, 8, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Induced polarity labels
                            if (Math.abs(currentDir) > 0.05) {
                                var inducedNorthOnLeft = currentDir > 0;
                                var labelLeft = inducedNorthOnLeft ? 'N' : 'S';
                                var labelRight = inducedNorthOnLeft ? 'S' : 'N';
                                var leftColor = inducedNorthOnLeft ? viz.colors.red : viz.colors.blue;
                                var rightColor = inducedNorthOnLeft ? viz.colors.blue : viz.colors.red;
                                viz.screenText(labelLeft, coilCx - 25, coilCy, leftColor, 16, 'center');
                                viz.screenText(labelRight, coilCx + 25, coilCy, rightColor, 16, 'center');
                            }

                            // --- Bar magnet ---
                            var magW = 2.5, magH = 1.2;
                            var magLeft = viz.toScreen(magnetX - magW / 2, magH / 2);
                            var magRight = viz.toScreen(magnetX + magW / 2, -magH / 2);
                            var magMid = viz.toScreen(magnetX, 0);

                            // North (right side, closer to coil)
                            ctx.fillStyle = '#cc2222';
                            ctx.fillRect(magMid[0], magLeft[1], magRight[0] - magMid[0], magRight[1] - magLeft[1]);
                            // South (left side)
                            ctx.fillStyle = '#2244aa';
                            ctx.fillRect(magLeft[0], magLeft[1], magMid[0] - magLeft[0], magRight[1] - magLeft[1]);

                            ctx.save();
                            ctx.shadowColor = viz.colors.red;
                            ctx.shadowBlur = 12;
                            ctx.strokeStyle = viz.colors.red + '88';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(magLeft[0], magLeft[1], magRight[0] - magLeft[0], magRight[1] - magLeft[1]);
                            ctx.restore();

                            viz.screenText('S', (magLeft[0] + magMid[0]) / 2, (magLeft[1] + magRight[1]) / 2, viz.colors.white, 14, 'center');
                            viz.screenText('N', (magMid[0] + magRight[0]) / 2, (magLeft[1] + magRight[1]) / 2, viz.colors.white, 14, 'center');
                            viz.screenText('\u2190 drag \u2192', magMid[0], magRight[1] + 18, viz.colors.text, 9, 'center');

                            // Field lines from magnet (simplified)
                            ctx.strokeStyle = 'rgba(88,166,255,0.2)';
                            ctx.lineWidth = 1;
                            for (var fl = 0; fl < 6; fl++) {
                                var startAngle = (fl / 6) * Math.PI - Math.PI / 2;
                                var sx = magnetX + magW / 2 * 0.9;
                                var sy = 0;
                                ctx.beginPath();
                                var flStarted = false;
                                for (var step = 0; step < 60; step++) {
                                    var dx = sx - magnetX;
                                    var dy = sy;
                                    var r = Math.sqrt(dx * dx + dy * dy);
                                    if (r < 0.2) r = 0.2;
                                    var r5 = r * r * r * r * r;
                                    var bx = (3 * dx * dx / (r * r) - 1) / (r * r * r);
                                    var by = 3 * dx * dy / r5;
                                    var bLen = Math.sqrt(bx * bx + by * by);
                                    if (bLen < 0.001) break;
                                    bx /= bLen; by /= bLen;
                                    sx += bx * 0.15;
                                    sy += by * 0.15;
                                    if (Math.abs(sx) > 12 || Math.abs(sy) > 6) break;
                                    var sp = viz.toScreen(sx, sy);
                                    if (!flStarted) { ctx.moveTo(sp[0], sp[1]); flStarted = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Status panel
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(15, h - 130, 250, 118);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(15, h - 130, 250, 118);

                            var movingStr = Math.abs(velocity) < 0.5 ? 'Stationary' : (velocity > 0 ? 'Approaching coil \u2192' : '\u2190 Receding from coil');
                            var fluxChangeStr = Math.abs(currentDir) < 0.05 ? 'Not changing' : (currentDir > 0 ? 'Increasing \u2191' : 'Decreasing \u2193');
                            var opposeStr = Math.abs(currentDir) < 0.05 ? 'No current' : (currentDir > 0 ? 'Repels magnet (opposes approach)' : 'Attracts magnet (opposes retreat)');

                            viz.screenText("Lenz's Law Analysis", 140, h - 115, viz.colors.white, 13, 'center');
                            viz.screenText('Magnet: ' + movingStr, 140, h - 93, viz.colors.text, 11, 'center');
                            viz.screenText('Flux: ' + fluxChangeStr, 140, h - 73, viz.colors.green, 11, 'center');
                            viz.screenText('Induced effect: ' + opposeStr, 140, h - 53, viz.colors.orange, 11, 'center');
                            var currentMag = Math.abs(currentDir);
                            viz.screenText('Current magnitude: ' + (currentMag * 100).toFixed(0) + '%', 140, h - 33, viz.colors.yellow, 11, 'center');

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A south pole of a magnet is pulled away from a coil. Does the near face of the coil become a north pole or a south pole?',
                    hint: 'When the south pole recedes, the flux through the coil decreases. Lenz\'s law says the coil will try to maintain the flux.',
                    solution: 'The south pole moving away decreases the flux. To oppose the decrease, the coil creates flux in the same direction as the magnet\'s field. The near face becomes a south pole, attracting the retreating magnet.'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Opposing the Change
        // ============================================================
        {
            id: 'ch16-sec03',
            title: 'Opposing the Change',
            content: `<h2>16.3 Opposing the Change: Applications</h2>

<p>Lenz's law is not just an abstract rule for determining current direction. It has profound physical consequences. The opposing force means you must do work to change the flux, and this work is what powers the induced current.</p>

<div class="env-block example">
    <div class="env-title">Example 16.2 &mdash; Energy in the Sliding Bar</div>
    <div class="env-body">
        <p>Recall the sliding bar on rails (Section 15.4). The induced current flows in a direction that creates a force opposing the bar's motion. This is the magnetic braking force:</p>
        \\[ F_{\\text{brake}} = BIL = B \\cdot \\frac{BLv}{R} \\cdot L = \\frac{B^2L^2v}{R} \\]
        <p>The power dissipated in the resistor equals the mechanical power needed to maintain the bar's speed:</p>
        \\[ P = Fv = \\frac{B^2L^2v^2}{R} = \\frac{\\mathcal{E}^2}{R} = I^2R \\quad \\checkmark \\]
        <p>Energy is perfectly conserved: mechanical work in, electrical energy out, heat dissipated.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Magnetic Braking Force</div>
    <div class="env-body">
        <p>When a conductor moves through a magnetic field and a circuit is closed, the induced current creates a force that opposes the motion:</p>
        \\[ F_{\\text{brake}} = \\frac{B^2L^2v}{R} \\]
        <p>This force is proportional to velocity: the faster you move, the harder the field "pushes back." This is the basis of magnetic braking.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">No Violation of Newton's Third Law</div>
    <div class="env-body">
        <p>The braking force might seem to appear from nowhere, but it does not violate Newton's third law. The induced current in the conductor creates its own magnetic field, and this field interacts with the external field. The reaction force acts on the source of the external field (the permanent magnet or electromagnet). If the magnet is free to move, it gets pushed along with the conductor.</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: 'A bar slides on rails at \\(4\\,\\text{m/s}\\) in a \\(0.5\\,\\text{T}\\) field. The rails are \\(0.3\\,\\text{m}\\) apart and the resistance is \\(0.5\\,\\Omega\\). Find the braking force and the power dissipated.',
                    hint: 'Use \\(F = B^2L^2v/R\\) and \\(P = Fv\\).',
                    solution: '\\(F = (0.5)^2(0.3)^2(4)/(0.5) = (0.25)(0.09)(4)/0.5 = 0.18\\,\\text{N}\\). \\(P = Fv = (0.18)(4) = 0.72\\,\\text{W}\\). Check: \\(\\mathcal{E} = BLv = 0.6\\,\\text{V}\\), \\(P = \\mathcal{E}^2/R = 0.36/0.5 = 0.72\\,\\text{W}\\). Consistent.'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Eddy Currents
        // ============================================================
        {
            id: 'ch16-sec04',
            title: 'Eddy Currents',
            content: `<h2>16.4 Eddy Currents</h2>

<p>When a conducting <em>sheet</em> (not just a wire loop) moves through a magnetic field, currents are induced throughout the bulk of the conductor. These are called <strong>eddy currents</strong> because they swirl in closed loops like eddies in water.</p>

<div class="env-block definition">
    <div class="env-title">Eddy Currents</div>
    <div class="env-body">
        <p><strong>Eddy currents</strong> are loops of electric current induced within conductors by a changing magnetic flux. They flow in closed loops perpendicular to the magnetic field, and their direction is governed by Lenz's law: they create fields that oppose the change in flux.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 16.3 &mdash; Metal Plate Entering a Field Region</div>
    <div class="env-body">
        <p>When an aluminum plate swings into a region of magnetic field (like a pendulum entering a gap between magnets), eddy currents form at the leading edge where the field is "entering" the plate. By Lenz's law, these currents oppose the entry, creating a braking force. The plate slows dramatically. If slots are cut in the plate, the eddy current paths are disrupted and the braking effect is greatly reduced.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Eddy Currents: Useful and Harmful</div>
    <div class="env-body">
        <p><strong>Useful applications:</strong></p>
        <ul>
            <li>Magnetic braking (roller coasters, trains, exercise bikes)</li>
            <li>Induction cooking (eddy currents in the pot generate heat)</li>
            <li>Metal detectors (eddy currents in hidden metal change the detector's field)</li>
        </ul>
        <p><strong>Harmful effects:</strong></p>
        <ul>
            <li>Energy losses in transformer cores and motors</li>
            <li>Unwanted heating in electrical machinery</li>
        </ul>
        <p>To minimize harmful eddy currents, transformer cores are made of thin <strong>laminated</strong> sheets separated by insulating layers, which disrupt the eddy current loops.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-eddy-currents"></div>`,
            visualizations: [
                {
                    id: 'viz-eddy-currents',
                    title: 'Eddy Currents in a Conductor',
                    description: 'Watch swirling eddy currents form in a conducting plate as a magnetic field region passes over it. The currents create an opposing force that brakes the motion.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 80, originY: 200, height: 420 });
                        var plateV = 2.0;
                        var plateX = -4;
                        var running = true;
                        var eddyParticles = [];

                        VizEngine.createSlider(controls, 'Speed =', 0.5, 5, plateV, 0.25, function(v) { plateV = v; });
                        VizEngine.createButton(controls, 'Reset', function() { plateX = -4; eddyParticles = []; });
                        VizEngine.createButton(controls, 'Pause/Play', function() { running = !running; });

                        function draw(ts) {
                            var dt = 0.016;
                            if (running) {
                                plateX += plateV * dt;
                                if (plateX > 12) plateX = -4;
                            }

                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Background
                            ctx.fillStyle = '#060618';
                            ctx.fillRect(0, 0, w, h);

                            // Field region (between x=2 and x=8)
                            var fieldLeft = 2, fieldRight = 8;
                            var fieldTop = 4, fieldBot = -4;
                            var fl1 = viz.toScreen(fieldLeft, fieldTop);
                            var fl2 = viz.toScreen(fieldRight, fieldBot);

                            ctx.fillStyle = 'rgba(88,166,255,0.06)';
                            ctx.fillRect(fl1[0], fl1[1], fl2[0] - fl1[0], fl2[1] - fl1[1]);
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.strokeRect(fl1[0], fl1[1], fl2[0] - fl1[0], fl2[1] - fl1[1]);
                            ctx.setLineDash([]);

                            // X marks for field into page
                            var spacing = 1.0;
                            for (var fx = fieldLeft + 0.5; fx < fieldRight; fx += spacing) {
                                for (var fy = fieldBot + 0.5; fy < fieldTop; fy += spacing) {
                                    var fp = viz.toScreen(fx, fy);
                                    ctx.strokeStyle = 'rgba(88,166,255,0.3)';
                                    ctx.lineWidth = 1;
                                    var sz = 3;
                                    ctx.beginPath();
                                    ctx.moveTo(fp[0] - sz, fp[1] - sz);
                                    ctx.lineTo(fp[0] + sz, fp[1] + sz);
                                    ctx.moveTo(fp[0] + sz, fp[1] - sz);
                                    ctx.lineTo(fp[0] - sz, fp[1] + sz);
                                    ctx.stroke();
                                }
                            }
                            viz.screenText('B (into page)', (fl1[0] + fl2[0]) / 2, fl1[1] - 10, viz.colors.blue, 10, 'center');

                            // Conducting plate
                            var plateW = 3, plateH = 5;
                            var pLeft = viz.toScreen(plateX, plateH / 2);
                            var pRight = viz.toScreen(plateX + plateW, -plateH / 2);

                            ctx.fillStyle = '#3a3a5a';
                            ctx.fillRect(pLeft[0], pLeft[1], pRight[0] - pLeft[0], pRight[1] - pLeft[1]);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(pLeft[0], pLeft[1], pRight[0] - pLeft[0], pRight[1] - pLeft[1]);

                            viz.screenText('Conductor', (pLeft[0] + pRight[0]) / 2, pRight[1] + 18, viz.colors.text, 10, 'center');

                            // Velocity arrow
                            var arrowY = viz.toScreen(0, 0)[1];
                            viz.drawVector(plateX + plateW + 0.3, 0, plateV * 0.12, 0, viz.colors.green, 'v', 2, 8);

                            // Eddy current visualization
                            // Determine overlap with field region
                            var overlapLeft = Math.max(plateX, fieldLeft);
                            var overlapRight = Math.min(plateX + plateW, fieldRight);

                            if (overlapRight > overlapLeft && running) {
                                // Leading edge eddy: where plate enters field
                                var enteringField = plateX < fieldRight && plateX + plateW > fieldLeft;

                                if (enteringField) {
                                    // Spawn eddy particles
                                    if (Math.random() < 0.6) {
                                        // Leading edge eddies (counterclockwise by Lenz's law when entering field)
                                        var edgeCx = overlapLeft + (overlapRight - overlapLeft) * 0.5;
                                        var edgeCy = (Math.random() - 0.5) * plateH * 0.7;
                                        eddyParticles.push({
                                            cx: edgeCx,
                                            cy: edgeCy,
                                            radius: 0.5 + Math.random() * 0.8,
                                            phase: Math.random() * Math.PI * 2,
                                            life: 1.0,
                                            speed: 2 + Math.random() * 2
                                        });
                                    }
                                }
                            }

                            // Update and draw eddy particles
                            for (var ep = eddyParticles.length - 1; ep >= 0; ep--) {
                                var p = eddyParticles[ep];
                                p.phase += p.speed * dt;
                                p.life -= dt * 0.8;
                                if (p.life <= 0) {
                                    eddyParticles.splice(ep, 1);
                                    continue;
                                }

                                // Draw swirling current loop
                                var loopPts = 20;
                                ctx.strokeStyle = 'rgba(255,215,0,' + (p.life * 0.6) + ')';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var lp = 0; lp <= loopPts; lp++) {
                                    var angle = (lp / loopPts) * Math.PI * 2 + p.phase;
                                    var lx = p.cx + p.radius * Math.cos(angle);
                                    var ly = p.cy + p.radius * Math.sin(angle);
                                    var ls = viz.toScreen(lx, ly);
                                    if (lp === 0) ctx.moveTo(ls[0], ls[1]);
                                    else ctx.lineTo(ls[0], ls[1]);
                                }
                                ctx.stroke();

                                // Arrow on loop to show direction
                                var aAngle = p.phase;
                                var ax = p.cx + p.radius * Math.cos(aAngle);
                                var ay = p.cy + p.radius * Math.sin(aAngle);
                                var as = viz.toScreen(ax, ay);
                                ctx.fillStyle = 'rgba(255,215,0,' + (p.life * 0.8) + ')';
                                ctx.beginPath();
                                ctx.arc(as[0], as[1], 2.5, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Braking force arrow
                            if (overlapRight > overlapLeft) {
                                var overlapFrac = (overlapRight - overlapLeft) / plateW;
                                var brakeForce = -overlapFrac * plateV * 0.2;
                                if (Math.abs(brakeForce) > 0.01) {
                                    viz.drawVector(plateX + plateW / 2, -plateH / 2 - 0.5, brakeForce, 0, viz.colors.red, 'F_brake', 2, 8);
                                }
                            }

                            // Info panel
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(w - 220, 10, 208, 80);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(w - 220, 10, 208, 80);
                            viz.screenText('Eddy Currents', w - 116, 25, viz.colors.white, 13, 'center');
                            var inField = overlapRight > overlapLeft;
                            viz.screenText('Plate in field: ' + (inField ? 'Yes' : 'No'), w - 116, 45, inField ? viz.colors.green : viz.colors.red, 11, 'center');
                            viz.screenText('Eddy loops: ' + eddyParticles.length, w - 116, 63, viz.colors.yellow, 11, 'center');
                            viz.screenText('Brake force opposes motion', w - 116, 80, viz.colors.red, 10, 'center');
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why are transformer cores made of thin laminated sheets rather than solid iron blocks?',
                    hint: 'Consider the path of eddy currents in a solid block versus thin separated sheets.',
                    solution: 'In a solid block, large eddy current loops form across the entire cross-section, wasting energy as heat. Thin laminated sheets (insulated from each other) break up these large loops into small ones, drastically reducing eddy current losses while still allowing the magnetic flux to pass through the core.'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Magnetic Braking
        // ============================================================
        {
            id: 'ch16-sec05',
            title: 'Magnetic Braking',
            content: `<h2>16.5 Magnetic Braking: Magnet in a Copper Tube</h2>

<p>The most dramatic demonstration of Lenz's law: drop a strong neodymium magnet through a vertical copper tube. The magnet falls in <strong>slow motion</strong>, taking many times longer to pass through than a non-magnetic object.</p>

<div class="env-block intuition">
    <div class="env-title">Why the Magnet Falls Slowly</div>
    <div class="env-body">
        <p>As the magnet falls, it creates a changing magnetic flux through every horizontal cross-section of the tube. By Lenz's law, eddy currents are induced in the copper that create magnetic fields opposing the change. Below the falling magnet, the approaching flux induces currents that repel it (pushing up). Above the magnet, the receding flux induces currents that attract it (pulling up). Both effects oppose the downward motion, creating a braking force that dramatically slows the fall.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Terminal Velocity of a Falling Magnet</div>
    <div class="env-body">
        <p>The braking force increases with speed (faster fall = faster flux change = stronger eddy currents). Eventually the upward braking force balances gravity, and the magnet reaches a terminal velocity:</p>
        \\[ mg = F_{\\text{brake}}(v_t) \\]
        <p>The terminal velocity depends on the magnet strength, tube conductivity, and tube dimensions. For a strong magnet in a thick copper tube, the magnet practically floats downward.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-magnet-tube"></div>

<div class="env-block example">
    <div class="env-title">Example 16.4 &mdash; Magnetic Braking on a Roller Coaster</div>
    <div class="env-body">
        <p>Many roller coasters use magnetic braking at the end of the ride. Permanent magnets on the car pass over copper or aluminum fins. The induced eddy currents create a braking force proportional to speed. This means the braking is gentle at low speed and strong at high speed, providing smooth deceleration with no physical contact and no wear.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Key Properties of Magnetic Braking</div>
    <div class="env-body">
        <ul>
            <li><strong>No contact</strong>: the brake never touches the moving object, so there is no wear</li>
            <li><strong>Self-regulating</strong>: braking force is proportional to speed, so it never locks the wheel</li>
            <li><strong>Failsafe</strong>: if the magnetic field is permanent, braking works even with power failure</li>
            <li><strong>Smooth</strong>: no jerking or vibration from friction pads</li>
        </ul>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-magnet-tube',
                    title: 'Magnet Falling Through a Copper Tube',
                    description: 'Side-by-side: a magnet falls through a copper tube (left) and a non-magnetic ball falls freely (right). The magnet reaches terminal velocity and falls dramatically slower. Eddy current rings glow as the magnet passes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 200, originY: 30, height: 460 });
                        var ctx = viz.ctx;
                        var g = 9.8;
                        var brakeCoeff = 15.0;
                        var magnetY = 0;
                        var magnetV = 0;
                        var ballY = 0;
                        var ballV = 0;
                        var time = 0;
                        var running = false;
                        var tubeLength = 12;
                        var eddyRings = [];

                        VizEngine.createSlider(controls, 'Brake strength =', 2, 40, brakeCoeff, 1, function(v) { brakeCoeff = v; });
                        VizEngine.createButton(controls, 'Drop!', function() {
                            magnetY = 0; magnetV = 0;
                            ballY = 0; ballV = 0;
                            time = 0; running = true;
                            eddyRings = [];
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            magnetY = 0; magnetV = 0;
                            ballY = 0; ballV = 0;
                            time = 0; running = false;
                            eddyRings = [];
                        });

                        function draw(ts) {
                            var dt = 0.016;
                            if (running) {
                                time += dt;

                                // Free-falling ball
                                if (ballY < tubeLength) {
                                    ballV += g * dt;
                                    ballY += ballV * dt;
                                    if (ballY > tubeLength) { ballY = tubeLength; ballV = 0; }
                                }

                                // Magnet with braking
                                if (magnetY < tubeLength) {
                                    var fGravity = g;
                                    var fBrake = -brakeCoeff * magnetV;
                                    var aNet = fGravity + fBrake;
                                    magnetV += aNet * dt;
                                    if (magnetV < 0) magnetV = 0;
                                    magnetY += magnetV * dt;
                                    if (magnetY > tubeLength) { magnetY = tubeLength; magnetV = 0; }

                                    // Spawn eddy rings
                                    if (magnetV > 0.1 && Math.random() < 0.5) {
                                        eddyRings.push({
                                            y: magnetY,
                                            life: 1.0,
                                            radius: 1.2 + Math.random() * 0.3,
                                            phase: Math.random() * Math.PI * 2,
                                            strength: Math.min(magnetV / 3, 1)
                                        });
                                    }
                                }
                            }

                            // Update eddy rings
                            for (var er = eddyRings.length - 1; er >= 0; er--) {
                                eddyRings[er].life -= dt * 1.2;
                                eddyRings[er].phase += dt * 4;
                                if (eddyRings[er].life <= 0) eddyRings.splice(er, 1);
                            }

                            viz.clear();
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            var tubeTopY = 30;
                            var tubeBotY = h - 50;
                            var tubeH = tubeBotY - tubeTopY;
                            var pixPerM = tubeH / tubeLength;

                            // === LEFT: Copper tube with magnet ===
                            var tubeCx = w * 0.35;
                            var tubeW = 50;

                            // Tube
                            var tubeGrad = ctx.createLinearGradient(tubeCx - tubeW / 2, 0, tubeCx + tubeW / 2, 0);
                            tubeGrad.addColorStop(0, '#6a4a2a');
                            tubeGrad.addColorStop(0.3, '#c8884a');
                            tubeGrad.addColorStop(0.5, '#daa060');
                            tubeGrad.addColorStop(0.7, '#c8884a');
                            tubeGrad.addColorStop(1, '#6a4a2a');
                            ctx.fillStyle = tubeGrad;
                            ctx.fillRect(tubeCx - tubeW / 2, tubeTopY, tubeW, tubeH);
                            ctx.strokeStyle = '#8a6a3a';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(tubeCx - tubeW / 2, tubeTopY, tubeW, tubeH);

                            // Tube interior
                            ctx.fillStyle = '#0a0a18';
                            ctx.fillRect(tubeCx - tubeW / 2 + 8, tubeTopY, tubeW - 16, tubeH);

                            // Eddy current rings
                            for (var ei = 0; ei < eddyRings.length; ei++) {
                                var ring = eddyRings[ei];
                                var ry = tubeTopY + ring.y * pixPerM;
                                var alpha = ring.life * ring.strength * 0.7;
                                ctx.strokeStyle = 'rgba(255,215,0,' + alpha + ')';
                                ctx.lineWidth = 2;
                                // Draw ring as ellipse at tube wall
                                ctx.beginPath();
                                ctx.ellipse(tubeCx, ry, tubeW / 2 - 2, 5, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                // Glow
                                ctx.strokeStyle = 'rgba(255,180,0,' + (alpha * 0.3) + ')';
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                ctx.ellipse(tubeCx, ry, tubeW / 2 - 2, 5, 0, 0, Math.PI * 2);
                                ctx.stroke();

                                // Current direction dots (going around ring)
                                var nDots = 6;
                                for (var di = 0; di < nDots; di++) {
                                    var dAngle = (di / nDots) * Math.PI * 2 + ring.phase;
                                    var dotX = tubeCx + (tubeW / 2 - 4) * Math.cos(dAngle);
                                    var dotY = ry + 4 * Math.sin(dAngle);
                                    ctx.fillStyle = 'rgba(255,215,0,' + (alpha * 0.8) + ')';
                                    ctx.beginPath();
                                    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Magnet in tube
                            var magnetScreenY = tubeTopY + magnetY * pixPerM;
                            var magH = 22, magHalfW = 14;
                            // North (top half, red)
                            ctx.fillStyle = '#cc2222';
                            ctx.fillRect(tubeCx - magHalfW, magnetScreenY - magH / 2, magHalfW * 2, magH / 2);
                            // South (bottom half, blue)
                            ctx.fillStyle = '#2244aa';
                            ctx.fillRect(tubeCx - magHalfW, magnetScreenY, magHalfW * 2, magH / 2);
                            ctx.strokeStyle = '#888';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(tubeCx - magHalfW, magnetScreenY - magH / 2, magHalfW * 2, magH);

                            viz.screenText('N', tubeCx, magnetScreenY - magH / 4, viz.colors.white, 9, 'center');
                            viz.screenText('S', tubeCx, magnetScreenY + magH / 4, viz.colors.white, 9, 'center');

                            // Magnet glow
                            ctx.save();
                            ctx.shadowColor = viz.colors.red;
                            ctx.shadowBlur = 15;
                            ctx.strokeStyle = viz.colors.red + '44';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(tubeCx - magHalfW, magnetScreenY - magH / 2, magHalfW * 2, magH);
                            ctx.restore();

                            // Force arrows on magnet
                            if (running && magnetY < tubeLength) {
                                // Gravity
                                viz.screenText('mg', tubeCx + magHalfW + 30, magnetScreenY + 15, viz.colors.green, 10, 'center');
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tubeCx + magHalfW + 30, magnetScreenY + 3);
                                ctx.lineTo(tubeCx + magHalfW + 30, magnetScreenY + 22);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(tubeCx + magHalfW + 30, magnetScreenY + 25);
                                ctx.lineTo(tubeCx + magHalfW + 26, magnetScreenY + 19);
                                ctx.lineTo(tubeCx + magHalfW + 34, magnetScreenY + 19);
                                ctx.closePath();
                                ctx.fill();

                                // Brake force
                                var brakeSize = Math.min(brakeCoeff * magnetV * 0.5, 40);
                                if (brakeSize > 2) {
                                    viz.screenText('F_b', tubeCx - magHalfW - 30, magnetScreenY - brakeSize / 2 - 3, viz.colors.red, 10, 'center');
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(tubeCx - magHalfW - 30, magnetScreenY + 3);
                                    ctx.lineTo(tubeCx - magHalfW - 30, magnetScreenY - brakeSize);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.moveTo(tubeCx - magHalfW - 30, magnetScreenY - brakeSize - 3);
                                    ctx.lineTo(tubeCx - magHalfW - 26, magnetScreenY - brakeSize + 3);
                                    ctx.lineTo(tubeCx - magHalfW - 34, magnetScreenY - brakeSize + 3);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            viz.screenText('Copper Tube', tubeCx, tubeTopY - 12, viz.colors.orange, 12, 'center');

                            // === RIGHT: Free-falling ball ===
                            var ballCx = w * 0.7;

                            // Track (just reference lines)
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(ballCx, tubeTopY);
                            ctx.lineTo(ballCx, tubeBotY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Ground
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(ballCx - 30, tubeBotY);
                            ctx.lineTo(ballCx + 30, tubeBotY);
                            ctx.stroke();

                            // Ball
                            var ballScreenY = tubeTopY + ballY * pixPerM;
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.arc(ballCx, ballScreenY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.save();
                            ctx.shadowColor = viz.colors.purple;
                            ctx.shadowBlur = 10;
                            ctx.fillStyle = viz.colors.purple + '88';
                            ctx.beginPath();
                            ctx.arc(ballCx, ballScreenY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();

                            viz.screenText('Free Fall', ballCx, tubeTopY - 12, viz.colors.purple, 12, 'center');

                            // Info panel
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(10, h - 100, w - 20, 90);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(10, h - 100, w - 20, 90);

                            viz.screenText('Comparison', w / 2, h - 85, viz.colors.white, 13, 'center');
                            viz.screenText('Magnet: v = ' + magnetV.toFixed(2) + ' m/s, y = ' + magnetY.toFixed(2) + ' m', w / 2, h - 63, viz.colors.orange, 11, 'center');
                            viz.screenText('Ball: v = ' + ballV.toFixed(2) + ' m/s, y = ' + ballY.toFixed(2) + ' m', w / 2, h - 43, viz.colors.purple, 11, 'center');
                            var ratio = ballV > 0.1 ? (magnetV / ballV * 100).toFixed(0) : '---';
                            viz.screenText('Magnet speed is ' + ratio + '% of free-fall speed', w / 2, h - 23, viz.colors.teal, 11, 'center');
                            viz.screenText('t = ' + time.toFixed(2) + ' s', w - 60, h - 85, viz.colors.text, 10, 'center');
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A strong magnet is dropped through a copper tube and reaches a terminal velocity of \\(0.5\\,\\text{m/s}\\). If the magnet has mass \\(0.02\\,\\text{kg}\\), what is the braking force at terminal velocity?',
                    hint: 'At terminal velocity, the net force is zero.',
                    solution: 'At terminal velocity, \\(F_{\\text{brake}} = mg = (0.02)(9.8) = 0.196\\,\\text{N} \\approx 0.20\\,\\text{N}\\). The braking force exactly balances gravity.'
                }
            ]
        }
    ]
});
