// === Chapter 15: Faraday's Law ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: "Faraday's Law",
    subtitle: 'Changing magnetic flux creates electric force, turning magnetism into electricity',
    sections: [
        // ============================================================
        // SECTION 1: Faraday's Experiment
        // ============================================================
        {
            id: 'ch15-sec01',
            title: "Faraday's Experiment",
            content: `<h2>15.1 Faraday's Experiment</h2>

<div class="env-block intuition">
    <div class="env-title">Chapter Overview</div>
    <div class="env-body">
        <p>In earlier chapters we saw that electric currents create magnetic fields (Oersted, Ampere). The natural question: can magnetism create electricity? Michael Faraday answered this in 1831 with a stunning discovery. A <em>changing</em> magnetic field induces an electric current. Not a static field, but a changing one. This chapter develops Faraday's law of induction, the principle behind generators, transformers, and most of the world's electrical power.</p>
    </div>
</div>

<p>Faraday wound two coils on an iron ring. When he closed the switch on the primary coil, a brief pulse of current appeared in the secondary coil. When the switch was opened, another pulse appeared, in the opposite direction. But while the current in the primary was steady, <strong>nothing happened</strong> in the secondary.</p>

<div class="env-block definition">
    <div class="env-title">Electromagnetic Induction</div>
    <div class="env-body">
        <p><strong>Electromagnetic induction</strong> is the production of an electromotive force (EMF) across a conductor when it is exposed to a <em>changing</em> magnetic flux. The key word is <em>changing</em>: a static magnetic field through a loop produces no EMF.</p>
    </div>
</div>

<p>Faraday then showed that pushing a bar magnet into a coil produced a current, and pulling it out reversed the current. Faster motion produced a larger current. The effect depended on the <em>rate of change</em> of the magnetic field through the coil.</p>

<div class="env-block remark">
    <div class="env-title">Three Ways to Induce an EMF</div>
    <div class="env-body">
        <ol>
            <li>Move a magnet relative to a coil (change the field)</li>
            <li>Move a coil through a non-uniform field (change the flux through it)</li>
            <li>Change the area of a loop in a constant field (e.g., stretch or rotate it)</li>
        </ol>
        <p>All three are special cases of one principle: <em>changing magnetic flux induces EMF</em>.</p>
    </div>
</div>`,
            visualizations: [],
            exercises: [
                {
                    question: "Faraday observed that a steady current in the primary coil produced no current in the secondary. Why? What happened only when the switch was opened or closed?",
                    hint: "Think about what 'changing' means. When the current is steady, is the magnetic field through the secondary changing?",
                    solution: "A steady current creates a constant magnetic field, so the magnetic flux through the secondary coil is not changing. Only when the switch is opened or closed does the current (and hence the field) change rapidly, producing a brief change in flux and thus an induced EMF."
                }
            ]
        },
        // ============================================================
        // SECTION 2: Magnetic Flux
        // ============================================================
        {
            id: 'ch15-sec02',
            title: 'Magnetic Flux',
            content: `<h2>15.2 Magnetic Flux</h2>

<p>To state Faraday's law precisely, we need the concept of <strong>magnetic flux</strong>, which measures "how much magnetic field passes through a surface."</p>

<div class="env-block definition">
    <div class="env-title">Magnetic Flux</div>
    <div class="env-body">
        <p>The magnetic flux \\(\\Phi_B\\) through a flat surface of area \\(A\\) in a uniform field \\(\\vec{B}\\) is</p>
        \\[ \\Phi_B = \\vec{B} \\cdot \\vec{A} = BA\\cos\\theta \\]
        <p>where \\(\\theta\\) is the angle between the magnetic field \\(\\vec{B}\\) and the area vector \\(\\vec{A}\\) (normal to the surface). The SI unit of magnetic flux is the <strong>weber</strong> (Wb): \\(1\\,\\text{Wb} = 1\\,\\text{T}\\cdot\\text{m}^2\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Flux as "Field Lines Through the Loop"</div>
    <div class="env-body">
        <p>Think of magnetic flux as counting the number of magnetic field lines that pass through a loop. When the loop is perpendicular to the field (\\(\\theta = 0\\)), maximum field lines pass through and \\(\\Phi_B = BA\\). When the loop is parallel to the field (\\(\\theta = 90^\\circ\\)), no field lines pass through and \\(\\Phi_B = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-magnetic-flux"></div>

<div class="env-block example">
    <div class="env-title">Example 15.1 &mdash; Flux Through a Tilted Loop</div>
    <div class="env-body">
        <p>A circular loop of radius \\(r = 0.10\\,\\text{m}\\) is placed in a uniform field \\(B = 0.50\\,\\text{T}\\). The normal to the loop makes an angle of \\(60^\\circ\\) with \\(\\vec{B}\\).</p>
        \\[ A = \\pi r^2 = \\pi(0.10)^2 = 0.0314\\,\\text{m}^2 \\]
        \\[ \\Phi_B = BA\\cos\\theta = (0.50)(0.0314)\\cos 60^\\circ = 0.00785\\,\\text{Wb} \\approx 7.85\\,\\text{mWb} \\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What Can Change the Flux?</div>
    <div class="env-body">
        <p>Since \\(\\Phi_B = BA\\cos\\theta\\), flux changes if:</p>
        <ul>
            <li>\\(B\\) changes (field strength varies in time)</li>
            <li>\\(A\\) changes (loop area expands or contracts)</li>
            <li>\\(\\theta\\) changes (loop rotates relative to the field)</li>
        </ul>
        <p>Any of these changes will induce an EMF.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-magnetic-flux',
                    title: 'Magnetic Flux Through a Tilted Loop',
                    description: 'Adjust the angle of the loop relative to the magnetic field. Field lines passing through the loop are highlighted. Watch how flux depends on cos(theta).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 300, originY: 200, height: 420 });
                        var theta = 0;
                        var B = 0.5;

                        VizEngine.createSlider(controls, '\u03b8 =', 0, 90, 0, 1, function(v) { theta = v; });
                        VizEngine.createSlider(controls, 'B (T) =', 0.1, 1.0, 0.5, 0.05, function(v) { B = v; });

                        function draw(ts) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            var thetaRad = theta * Math.PI / 180;
                            var cosT = Math.cos(thetaRad);
                            var sinT = Math.sin(thetaRad);
                            var flux = B * 1.0 * Math.abs(cosT);

                            // Draw field lines (horizontal arrows going right)
                            var nLines = 12;
                            var fieldRegionLeft = 60;
                            var fieldRegionRight = w - 60;
                            for (var i = 0; i < nLines; i++) {
                                var yy = 50 + i * (h - 100) / (nLines - 1);
                                var alpha = 0.25 + 0.15 * Math.sin(ts * 0.001 + i * 0.5);
                                ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(fieldRegionLeft, yy);
                                ctx.lineTo(fieldRegionRight, yy);
                                ctx.stroke();
                                // Arrowhead
                                ctx.fillStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.beginPath();
                                ctx.moveTo(fieldRegionRight, yy);
                                ctx.lineTo(fieldRegionRight - 8, yy - 4);
                                ctx.lineTo(fieldRegionRight - 8, yy + 4);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Label field
                            viz.screenText('B = ' + B.toFixed(2) + ' T', w - 50, 25, viz.colors.blue, 13, 'right');

                            // Draw the loop (ellipse representing a circular loop tilted by theta)
                            var loopCx = w / 2;
                            var loopCy = h / 2;
                            var loopRadius = 100;
                            var loopWidthFactor = Math.abs(cosT);

                            // Loop as ellipse
                            ctx.save();
                            ctx.translate(loopCx, loopCy);

                            // Glow
                            ctx.save();
                            ctx.shadowColor = viz.colors.teal;
                            ctx.shadowBlur = 12;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.ellipse(0, 0, loopRadius * loopWidthFactor, loopRadius, 0, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.restore();

                            // Fill the loop semi-transparent to show area catching flux
                            var loopAlpha = 0.1 + 0.2 * Math.abs(cosT);
                            ctx.fillStyle = 'rgba(63,185,160,' + loopAlpha + ')';
                            ctx.beginPath();
                            ctx.ellipse(0, 0, loopRadius * loopWidthFactor, loopRadius, 0, 0, Math.PI * 2);
                            ctx.fill();

                            // Area normal vector
                            var normLen = 60;
                            var nx = normLen * cosT;
                            var ny = 0;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(nx, ny);
                            ctx.stroke();
                            // Arrowhead for normal
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(nx, ny);
                            ctx.lineTo(nx - 8, ny - 5);
                            ctx.lineTo(nx - 8, ny + 5);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('A', loopCx + nx + 14, loopCy + ny, viz.colors.orange, 14);

                            // Show angle arc
                            if (theta > 2) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.arc(0, 0, 30, -thetaRad, 0);
                                ctx.stroke();
                                var midAngle = -thetaRad / 2;
                                viz.screenText('\u03b8=' + theta + '\u00b0', loopCx + 40 * Math.cos(midAngle), loopCy + 40 * Math.sin(midAngle), viz.colors.yellow, 11);
                            }

                            ctx.restore();

                            // Highlight field lines that pass through the loop
                            var nThrough = Math.round(nLines * Math.abs(cosT));
                            var startLine = Math.floor((nLines - nThrough) / 2);
                            for (var j = startLine; j < startLine + nThrough; j++) {
                                if (j < 0 || j >= nLines) continue;
                                var yLine = 50 + j * (h - 100) / (nLines - 1);
                                // Check if this line passes through the loop vertical extent
                                if (Math.abs(yLine - loopCy) < loopRadius) {
                                    var pulse = 0.5 + 0.3 * Math.sin(ts * 0.003 + j);
                                    ctx.strokeStyle = 'rgba(63,185,80,' + pulse + ')';
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.moveTo(loopCx - loopRadius * loopWidthFactor - 5, yLine);
                                    ctx.lineTo(loopCx + loopRadius * loopWidthFactor + 5, yLine);
                                    ctx.stroke();
                                }
                            }

                            // Flux readout panel
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(15, h - 110, 220, 95);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(15, h - 110, 220, 95);
                            viz.screenText('\u03a6_B = BA cos\u03b8', 125, h - 93, viz.colors.white, 13, 'center');
                            viz.screenText('\u03a6_B = (' + B.toFixed(2) + ')(1.00)cos(' + theta + '\u00b0)', 125, h - 73, viz.colors.text, 11, 'center');
                            viz.screenText('\u03a6_B = ' + flux.toFixed(3) + ' Wb', 125, h - 50, viz.colors.green, 15, 'center');

                            // Flux bar
                            var barX = 25, barY = h - 38, barW = 190, barH = 14;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(barX, barY, barW, barH);
                            var fluxFrac = flux / (B * 1.0);
                            var fluxBarGrad = ctx.createLinearGradient(barX, 0, barX + barW * fluxFrac, 0);
                            fluxBarGrad.addColorStop(0, viz.colors.teal);
                            fluxBarGrad.addColorStop(1, viz.colors.green);
                            ctx.fillStyle = fluxBarGrad;
                            ctx.fillRect(barX, barY, barW * fluxFrac, barH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.strokeRect(barX, barY, barW, barH);
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A square loop with side \\(0.20\\,\\text{m}\\) is placed in a \\(0.80\\,\\text{T}\\) field. What is the flux when the loop is (a) perpendicular to the field, (b) at \\(45^\\circ\\), (c) parallel to the field?',
                    hint: 'Use \\(\\Phi_B = BA\\cos\\theta\\). The area is \\(A = (0.20)^2 = 0.04\\,\\text{m}^2\\).',
                    solution: '(a) \\(\\theta = 0\\): \\(\\Phi_B = (0.80)(0.04)(1) = 0.032\\,\\text{Wb}\\). (b) \\(\\theta = 45^\\circ\\): \\(\\Phi_B = (0.80)(0.04)(0.707) = 0.0226\\,\\text{Wb}\\). (c) \\(\\theta = 90^\\circ\\): \\(\\Phi_B = 0\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 3: Faraday's Law of Induction
        // ============================================================
        {
            id: 'ch15-sec03',
            title: "Faraday's Law of Induction",
            content: `<h2>15.3 Faraday's Law of Induction</h2>

<div class="env-block theorem">
    <div class="env-title">Faraday's Law</div>
    <div class="env-body">
        <p>The induced EMF in a loop equals the negative rate of change of magnetic flux through the loop:</p>
        \\[ \\mathcal{E} = -\\frac{d\\Phi_B}{dt} \\]
        <p>For a coil with \\(N\\) turns:</p>
        \\[ \\mathcal{E} = -N\\frac{d\\Phi_B}{dt} \\]
        <p>The negative sign encodes <strong>Lenz's law</strong> (Chapter 16): the induced EMF opposes the change that created it.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Why the Derivative?</div>
    <div class="env-body">
        <p>Faraday's law says it is not the flux itself that matters, but its <em>rate of change</em>. A loop sitting in a strong but constant field has zero induced EMF. But a loop where the flux is changing rapidly has a large EMF. The faster the change, the larger the EMF. This is why moving a magnet quickly through a coil produces more voltage than moving it slowly.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-faraday-magnet-coil"></div>

<div class="env-block example">
    <div class="env-title">Example 15.2 &mdash; Changing Field in a Coil</div>
    <div class="env-body">
        <p>A coil with \\(N = 100\\) turns and area \\(A = 0.02\\,\\text{m}^2\\) is perpendicular to a magnetic field that increases uniformly from \\(0\\) to \\(0.50\\,\\text{T}\\) in \\(0.10\\,\\text{s}\\).</p>
        \\[ \\frac{d\\Phi_B}{dt} = A\\frac{dB}{dt} = (0.02)\\left(\\frac{0.50}{0.10}\\right) = 0.10\\,\\text{Wb/s} \\]
        \\[ |\\mathcal{E}| = N\\frac{d\\Phi_B}{dt} = (100)(0.10) = 10\\,\\text{V} \\]
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Common Mistake</div>
    <div class="env-body">
        <p>Students often confuse flux with field. A large magnetic field does not necessarily mean large flux (the loop could be parallel to the field). And even large flux does not mean there is an induced EMF; the flux must be <em>changing</em>.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-faraday-magnet-coil',
                    title: 'Magnet Through a Coil: Real-Time Flux and EMF',
                    description: 'Drag the bar magnet through the coil. Watch the magnetic flux meter and EMF meter respond in real-time. Faster motion produces larger EMF.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 350, originY: 220, height: 460 });
                        var ctx = viz.ctx;
                        var magnetX = -6;
                        var prevFlux = 0;
                        var emfHistory = [];
                        var fluxHistory = [];
                        var time = 0;
                        var maxHistory = 200;

                        viz.addDraggable('magnet', magnetX, 0, viz.colors.red, 10, function(wx) {
                            magnetX = VizEngine.clamp(wx, -9, 7);
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            magnetX = -6;
                            viz.draggables[0].x = -6;
                            prevFlux = 0;
                            emfHistory = [];
                            fluxHistory = [];
                            time = 0;
                        });

                        function magnetField(x) {
                            // Simplified dipole-like field: flux contribution at the coil (at x=0)
                            var d = x;
                            var r2 = d * d + 0.5;
                            return 2.0 / (r2 * Math.sqrt(r2));
                        }

                        function draw(ts) {
                            time += 0.016;
                            magnetX = viz.draggables[0].x;

                            viz.clear();
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            // --- Draw magnetic field lines from the magnet ---
                            var nFieldLines = 8;
                            for (var fl = 0; fl < nFieldLines; fl++) {
                                var angle0 = (fl / nFieldLines) * Math.PI * 2;
                                ctx.strokeStyle = 'rgba(88,166,255,0.2)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var t2 = 0; t2 < 150; t2++) {
                                    var dt2 = 0.12;
                                    var fx, fy;
                                    if (!started) {
                                        fx = magnetX + 0.8 * Math.cos(angle0);
                                        fy = 0.8 * Math.sin(angle0);
                                        started = true;
                                    }
                                    // Simple dipole field
                                    var dx = fx - magnetX;
                                    var dy = fy;
                                    var r = Math.sqrt(dx * dx + dy * dy);
                                    if (r < 0.1) r = 0.1;
                                    var r5 = r * r * r * r * r;
                                    var bx = (3 * dx * dx / (r * r) - 1) / (r * r * r);
                                    var by = 3 * dx * dy / r5;
                                    var bLen = Math.sqrt(bx * bx + by * by);
                                    if (bLen < 0.001) break;
                                    bx /= bLen; by /= bLen;
                                    fx += bx * dt2;
                                    fy += by * dt2;
                                    if (Math.abs(fx) > 14 || Math.abs(fy) > 8) break;
                                    var sp = viz.toScreen(fx, fy);
                                    if (t2 === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // --- Draw the coil at x=0 ---
                            var coilX = 0;
                            var coilHalf = 2.5;
                            var coilSx = viz.toScreen(coilX, 0)[0];
                            var coilTopSy = viz.toScreen(coilX, coilHalf)[1];
                            var coilBotSy = viz.toScreen(coilX, -coilHalf)[1];

                            // Coil body
                            ctx.save();
                            ctx.shadowColor = viz.colors.teal;
                            ctx.shadowBlur = 10;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 5;
                            ctx.beginPath();
                            ctx.moveTo(coilSx, coilTopSy);
                            ctx.lineTo(coilSx, coilBotSy);
                            ctx.stroke();
                            ctx.restore();

                            // Coil turns (decorative lines)
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 1;
                            var nTurns = 10;
                            for (var ct = 0; ct <= nTurns; ct++) {
                                var yy = -coilHalf + ct * (2 * coilHalf) / nTurns;
                                var sp1 = viz.toScreen(coilX - 0.3, yy);
                                var sp2 = viz.toScreen(coilX + 0.3, yy);
                                ctx.beginPath();
                                ctx.moveTo(sp1[0], sp1[1]);
                                ctx.lineTo(sp2[0], sp2[1]);
                                ctx.stroke();
                            }

                            // --- Draw bar magnet ---
                            var magW = 2.5, magH = 1.2;
                            var magLeft = viz.toScreen(magnetX - magW / 2, magH / 2);
                            var magRight = viz.toScreen(magnetX + magW / 2, -magH / 2);
                            var magMid = viz.toScreen(magnetX, 0);

                            // North pole (red)
                            ctx.fillStyle = '#cc2222';
                            ctx.fillRect(magMid[0], magLeft[1], magRight[0] - magMid[0], magRight[1] - magLeft[1]);
                            // South pole (blue)
                            ctx.fillStyle = '#2244aa';
                            ctx.fillRect(magLeft[0], magLeft[1], magMid[0] - magLeft[0], magRight[1] - magLeft[1]);

                            // Glow around magnet
                            ctx.save();
                            ctx.shadowColor = viz.colors.red;
                            ctx.shadowBlur = 15;
                            ctx.strokeStyle = viz.colors.red + '66';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(magLeft[0], magLeft[1], magRight[0] - magLeft[0], magRight[1] - magLeft[1]);
                            ctx.restore();

                            // Labels on magnet
                            viz.screenText('S', (magLeft[0] + magMid[0]) / 2, (magLeft[1] + magRight[1]) / 2, viz.colors.white, 14, 'center');
                            viz.screenText('N', (magMid[0] + magRight[0]) / 2, (magLeft[1] + magRight[1]) / 2, viz.colors.white, 14, 'center');

                            // Drag hint
                            viz.screenText('\u2190 drag magnet \u2192', magMid[0], magRight[1] + 20, viz.colors.text, 10, 'center');

                            // --- Calculate flux and EMF ---
                            var flux = magnetField(magnetX);
                            var emf = -(flux - prevFlux) / 0.016;
                            prevFlux = flux;

                            fluxHistory.push(flux);
                            emfHistory.push(emf);
                            if (fluxHistory.length > maxHistory) fluxHistory.shift();
                            if (emfHistory.length > maxHistory) emfHistory.shift();

                            // --- Flux meter (bottom left) ---
                            var panelX = 15, panelY = h - 200, panelW = 180, panelH = 185;
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(panelX, panelY, panelW, panelH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(panelX, panelY, panelW, panelH);

                            viz.screenText('Magnetic Flux', panelX + panelW / 2, panelY + 14, viz.colors.white, 12, 'center');

                            // Flux plot
                            var plotX = panelX + 10, plotY = panelY + 28;
                            var plotW = panelW - 20, plotH = 60;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            if (fluxHistory.length > 1) {
                                var fMax = 0;
                                for (var fi = 0; fi < fluxHistory.length; fi++) {
                                    if (Math.abs(fluxHistory[fi]) > fMax) fMax = Math.abs(fluxHistory[fi]);
                                }
                                fMax = Math.max(fMax, 0.5);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var fi2 = 0; fi2 < fluxHistory.length; fi2++) {
                                    var px = plotX + fi2 * plotW / maxHistory;
                                    var py = plotY + plotH / 2 - (fluxHistory[fi2] / fMax) * plotH * 0.45;
                                    if (fi2 === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('\u03a6_B = ' + flux.toFixed(3) + ' Wb', panelX + panelW / 2, plotY + plotH + 14, viz.colors.green, 11, 'center');

                            // EMF plot
                            viz.screenText('Induced EMF', panelX + panelW / 2, plotY + plotH + 32, viz.colors.white, 12, 'center');
                            var plotY2 = plotY + plotH + 44;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY2, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY2, plotW, plotH);

                            if (emfHistory.length > 1) {
                                var eMax = 0;
                                for (var ei = 0; ei < emfHistory.length; ei++) {
                                    if (Math.abs(emfHistory[ei]) > eMax) eMax = Math.abs(emfHistory[ei]);
                                }
                                eMax = Math.max(eMax, 0.5);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var ei2 = 0; ei2 < emfHistory.length; ei2++) {
                                    var px2 = plotX + ei2 * plotW / maxHistory;
                                    var py2 = plotY2 + plotH / 2 - (emfHistory[ei2] / eMax) * plotH * 0.45;
                                    py2 = VizEngine.clamp(py2, plotY2, plotY2 + plotH);
                                    if (ei2 === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('\u03b5 = ' + emf.toFixed(2) + ' V', panelX + panelW / 2, plotY2 + plotH + 14, viz.colors.orange, 11, 'center');

                            // Draw draggable handle
                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A magnetic field through a 200-turn coil (area \\(0.05\\,\\text{m}^2\\)) drops from \\(0.60\\,\\text{T}\\) to \\(0.20\\,\\text{T}\\) in \\(0.02\\,\\text{s}\\). What is the magnitude of the induced EMF?',
                    hint: 'Find \\(d\\Phi_B/dt = A \\cdot \\Delta B / \\Delta t\\), then multiply by \\(N\\).',
                    solution: '\\(\\Delta\\Phi_B = A\\Delta B = (0.05)(0.20 - 0.60) = -0.02\\,\\text{Wb}\\). \\(|\\mathcal{E}| = N|\\Delta\\Phi_B/\\Delta t| = 200 \\times 0.02/0.02 = 200\\,\\text{V}\\).'
                }
            ]
        },
        // ============================================================
        // SECTION 4: Motional EMF
        // ============================================================
        {
            id: 'ch15-sec04',
            title: 'Motional EMF',
            content: `<h2>15.4 Motional EMF</h2>

<p>When a conductor moves through a magnetic field, the free charges inside it experience a magnetic force that drives them along the conductor. This creates a voltage called <strong>motional EMF</strong>.</p>

<div class="env-block theorem">
    <div class="env-title">Motional EMF for a Straight Conductor</div>
    <div class="env-body">
        <p>A conductor of length \\(L\\) moving at velocity \\(v\\) perpendicular to a uniform field \\(B\\) develops an EMF:</p>
        \\[ \\mathcal{E} = BLv \\]
        <p>This follows from the magnetic force on charges: \\(F = qvB\\). The force does work \\(W = qvBL\\) on a charge as it traverses the conductor, so the EMF (work per unit charge) is \\(\\mathcal{E} = W/q = BLv\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 15.3 &mdash; Sliding Rail</div>
    <div class="env-body">
        <p>A conducting bar slides at \\(v = 3\\,\\text{m/s}\\) along two parallel rails separated by \\(L = 0.50\\,\\text{m}\\) in a \\(B = 0.40\\,\\text{T}\\) field pointing into the page. The circuit has resistance \\(R = 2\\,\\Omega\\).</p>
        \\[ \\mathcal{E} = BLv = (0.40)(0.50)(3) = 0.60\\,\\text{V} \\]
        \\[ I = \\frac{\\mathcal{E}}{R} = \\frac{0.60}{2} = 0.30\\,\\text{A} \\]
        <p>The current flows counterclockwise (by Lenz's law, to oppose the increasing flux).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Consistency with Faraday's Law</div>
    <div class="env-body">
        <p>The sliding bar sweeps out area at rate \\(dA/dt = Lv\\). Since \\(\\Phi_B = BA\\), we get \\(d\\Phi_B/dt = BLv\\), which matches the motional EMF formula. Motional EMF is not a separate law; it is a special case of Faraday's law.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-motional-emf"></div>`,
            visualizations: [
                {
                    id: 'viz-motional-emf',
                    title: 'Sliding Bar on Rails: Motional EMF',
                    description: 'A conducting bar slides along rails in a magnetic field (into the page). Watch the swept area grow and the induced current flow. Adjust velocity and field strength.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 80, originY: 300, height: 420 });
                        var B = 0.5;
                        var v = 2.0;
                        var L = 4.0;
                        var R = 2.0;
                        var barX = 1.0;
                        var time = 0;
                        var running = true;
                        var electronPhase = 0;

                        VizEngine.createSlider(controls, 'v (m/s) =', 0, 5, v, 0.2, function(val) { v = val; });
                        VizEngine.createSlider(controls, 'B (T) =', 0.1, 1.0, B, 0.05, function(val) { B = val; });
                        VizEngine.createSlider(controls, 'R (\u03a9) =', 0.5, 5, R, 0.25, function(val) { R = val; });
                        VizEngine.createButton(controls, 'Reset', function() { barX = 1.0; time = 0; });
                        VizEngine.createButton(controls, 'Pause/Play', function() { running = !running; });

                        function draw(ts) {
                            var dt = 0.016;
                            if (running) {
                                barX += v * dt;
                                time += dt;
                                if (barX > 12) { barX = 1; time = 0; }
                            }

                            var emf = B * L * v;
                            var current = emf / R;
                            electronPhase += current * 0.08;

                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Background
                            ctx.fillStyle = '#060618';
                            ctx.fillRect(0, 0, w, h);

                            // Field into page (X marks)
                            var spacing = 1.2;
                            ctx.strokeStyle = 'rgba(88,166,255,0.25)';
                            ctx.lineWidth = 1;
                            for (var fx = -1; fx < 14; fx += spacing) {
                                for (var fy = -1; fy < L + 1; fy += spacing) {
                                    var fp = viz.toScreen(fx, fy);
                                    var sz = 4;
                                    ctx.beginPath();
                                    ctx.moveTo(fp[0] - sz, fp[1] - sz);
                                    ctx.lineTo(fp[0] + sz, fp[1] + sz);
                                    ctx.moveTo(fp[0] + sz, fp[1] - sz);
                                    ctx.lineTo(fp[0] - sz, fp[1] + sz);
                                    ctx.stroke();
                                }
                            }
                            viz.screenText('B (into page)', w - 90, 20, viz.colors.blue, 11, 'center');

                            // Rails
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 3;
                            var rLeft = viz.toScreen(0, 0);
                            var rRight = viz.toScreen(14, 0);
                            ctx.beginPath(); ctx.moveTo(rLeft[0], rLeft[1]); ctx.lineTo(rRight[0], rRight[1]); ctx.stroke();
                            var rTop = viz.toScreen(0, L);
                            var rTopRight = viz.toScreen(14, L);
                            ctx.beginPath(); ctx.moveTo(rTop[0], rTop[1]); ctx.lineTo(rTopRight[0], rTopRight[1]); ctx.stroke();

                            // Left connector
                            ctx.beginPath();
                            ctx.moveTo(rLeft[0], rLeft[1]);
                            ctx.lineTo(rTop[0], rTop[1]);
                            ctx.stroke();

                            // Swept area (filled)
                            var areaTopLeft = viz.toScreen(0, L);
                            var areaBottomRight = viz.toScreen(barX, 0);
                            ctx.fillStyle = 'rgba(63,185,80,0.08)';
                            ctx.fillRect(areaTopLeft[0], areaTopLeft[1], areaBottomRight[0] - areaTopLeft[0], areaBottomRight[1] - areaTopLeft[1]);

                            // Sliding bar
                            var barBot = viz.toScreen(barX, 0);
                            var barTop = viz.toScreen(barX, L);
                            ctx.save();
                            ctx.shadowColor = viz.colors.orange;
                            ctx.shadowBlur = 10;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 5;
                            ctx.beginPath();
                            ctx.moveTo(barBot[0], barBot[1]);
                            ctx.lineTo(barTop[0], barTop[1]);
                            ctx.stroke();
                            ctx.restore();

                            // Velocity arrow on bar
                            viz.drawVector(barX, L / 2, v * 0.15, 0, viz.colors.green, 'v', 2, 8);

                            // Animated electrons in circuit
                            if (current > 0.01) {
                                var nElectrons = 12;
                                var circuitPerimeter = 2 * L + 2 * barX;
                                for (var e = 0; e < nElectrons; e++) {
                                    var frac = ((e / nElectrons) + electronPhase) % 1;
                                    if (frac < 0) frac += 1;
                                    var ex, ey;
                                    var segFrac;
                                    // Circuit path: bar up, top rail left, left connector down, bottom rail right
                                    var seg1 = L / circuitPerimeter;       // bar (up)
                                    var seg2 = barX / circuitPerimeter;    // top rail (left)
                                    var seg3 = L / circuitPerimeter;       // left connector (down)
                                    var seg4 = barX / circuitPerimeter;    // bottom rail (right)

                                    if (frac < seg1) {
                                        segFrac = frac / seg1;
                                        ex = barX; ey = segFrac * L;
                                    } else if (frac < seg1 + seg2) {
                                        segFrac = (frac - seg1) / seg2;
                                        ex = barX - segFrac * barX; ey = L;
                                    } else if (frac < seg1 + seg2 + seg3) {
                                        segFrac = (frac - seg1 - seg2) / seg3;
                                        ex = 0; ey = L - segFrac * L;
                                    } else {
                                        segFrac = (frac - seg1 - seg2 - seg3) / seg4;
                                        ex = segFrac * barX; ey = 0;
                                    }
                                    var esp = viz.toScreen(ex, ey);
                                    var ealpha = 0.4 + 0.4 * Math.sin(frac * Math.PI * 2);
                                    ctx.fillStyle = 'rgba(255,215,0,' + ealpha + ')';
                                    ctx.beginPath();
                                    ctx.arc(esp[0], esp[1], 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Readout panel
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(w - 230, h - 130, 218, 118);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(w - 230, h - 130, 218, 118);

                            viz.screenText('Motional EMF', w - 121, h - 115, viz.colors.white, 13, 'center');
                            viz.screenText('\u03b5 = BLv = ' + emf.toFixed(2) + ' V', w - 121, h - 93, viz.colors.orange, 12, 'center');
                            viz.screenText('I = \u03b5/R = ' + current.toFixed(3) + ' A', w - 121, h - 73, viz.colors.yellow, 12, 'center');
                            viz.screenText('Area swept = ' + (barX * L).toFixed(2) + ' m\u00b2', w - 121, h - 53, viz.colors.green, 11, 'center');
                            viz.screenText('\u03a6_B = BA = ' + (B * barX * L).toFixed(2) + ' Wb', w - 121, h - 33, viz.colors.teal, 11, 'center');

                            // Force label
                            viz.screenText('L = ' + L.toFixed(1) + ' m', -0.5, L / 2, viz.colors.text, 10, 'right');
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'An airplane with a wingspan of \\(40\\,\\text{m}\\) flies at \\(250\\,\\text{m/s}\\) in a region where the vertical component of Earth\'s field is \\(5.0 \\times 10^{-5}\\,\\text{T}\\). What is the EMF between the wingtips?',
                    hint: 'Use \\(\\mathcal{E} = BLv\\) with the vertical component of \\(B\\).',
                    solution: '\\(\\mathcal{E} = BLv = (5.0 \\times 10^{-5})(40)(250) = 0.50\\,\\text{V}\\). A modest half-volt, but measurable.'
                }
            ]
        },
        // ============================================================
        // SECTION 5: Generators
        // ============================================================
        {
            id: 'ch15-sec05',
            title: 'Generators',
            content: `<h2>15.5 Electric Generators</h2>

<p>A <strong>generator</strong> converts mechanical energy into electrical energy using Faraday's law. A coil rotates in a magnetic field, and the changing flux through the coil induces an EMF.</p>

<div class="env-block theorem">
    <div class="env-title">EMF of an AC Generator</div>
    <div class="env-body">
        <p>A coil with \\(N\\) turns and area \\(A\\) rotating at angular velocity \\(\\omega\\) in a uniform field \\(B\\) produces</p>
        \\[ \\Phi_B(t) = NBA\\cos(\\omega t) \\]
        \\[ \\mathcal{E}(t) = -\\frac{d\\Phi_B}{dt} = NBA\\omega\\sin(\\omega t) \\]
        <p>The peak EMF is \\(\\mathcal{E}_0 = NBA\\omega\\). The output is sinusoidal: <strong>alternating current</strong> (AC).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Why Generators Produce AC</div>
    <div class="env-body">
        <p>As the coil rotates, the flux through it oscillates between \\(+NBA\\) and \\(-NBA\\). The EMF is proportional to the rate of change of flux, which is largest when the coil is parallel to the field (flux changing fastest) and zero when it is perpendicular (flux at a maximum or minimum). This naturally produces a sinusoidal (alternating) output.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-generator"></div>

<div class="env-block example">
    <div class="env-title">Example 15.4 &mdash; Simple Generator</div>
    <div class="env-body">
        <p>A 200-turn coil of area \\(0.01\\,\\text{m}^2\\) rotates at \\(60\\,\\text{Hz}\\) (\\(\\omega = 2\\pi \\times 60 = 377\\,\\text{rad/s}\\)) in a \\(0.50\\,\\text{T}\\) field.</p>
        \\[ \\mathcal{E}_0 = NBA\\omega = (200)(0.50)(0.01)(377) = 377\\,\\text{V} \\]
        <p>The peak voltage is 377 V. The RMS voltage is \\(\\mathcal{E}_0/\\sqrt{2} \\approx 267\\,\\text{V}\\), close to household mains.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Generator vs. Motor</div>
    <div class="env-body">
        <p>A generator and a motor are the same device run in opposite directions. A motor uses electrical energy to produce rotation. A generator uses rotation to produce electrical energy. The same machine can serve as both, which is exactly what happens in regenerative braking in electric vehicles: the motor becomes a generator, converting kinetic energy back to electrical energy.</p>
    </div>
</div>`,
            visualizations: [
                {
                    id: 'viz-generator',
                    title: 'Rotating Coil AC Generator',
                    description: 'A coil spins between magnets. The changing flux induces a sinusoidal EMF. Watch the real-time waveform build. Adjust the rotation speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 180, originY: 170, height: 460 });
                        var omega = 3.0;
                        var B = 0.5;
                        var N = 100;
                        var A = 0.02;
                        var time = 0;
                        var emfTrace = [];
                        var fluxTrace = [];
                        var maxTrace = 300;
                        var running = true;

                        VizEngine.createSlider(controls, '\u03c9 (rad/s) =', 0.5, 10, omega, 0.5, function(val) {
                            omega = val;
                            emfTrace = [];
                            fluxTrace = [];
                            time = 0;
                        });
                        VizEngine.createSlider(controls, 'N =', 10, 500, N, 10, function(val) { N = val; });
                        VizEngine.createSlider(controls, 'B (T) =', 0.1, 1.0, B, 0.05, function(val) { B = val; });
                        VizEngine.createButton(controls, 'Pause/Play', function() { running = !running; });

                        function draw(ts) {
                            var dt = 0.016;
                            if (running) time += dt;

                            var angle = omega * time;
                            var flux = N * B * A * Math.cos(angle);
                            var emf = N * B * A * omega * Math.sin(angle);
                            var peakEmf = N * B * A * omega;

                            fluxTrace.push(flux);
                            emfTrace.push(emf);
                            if (fluxTrace.length > maxTrace) fluxTrace.shift();
                            if (emfTrace.length > maxTrace) emfTrace.shift();

                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Background
                            var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
                            bgGrad.addColorStop(0, '#060618');
                            bgGrad.addColorStop(1, '#0c0c24');
                            ctx.fillStyle = bgGrad;
                            ctx.fillRect(0, 0, w, h);

                            // === LEFT: Generator visualization ===
                            var genCx = 160, genCy = 150, genR = 80;

                            // Magnet poles
                            ctx.fillStyle = '#cc222288';
                            ctx.fillRect(genCx - genR - 40, genCy - genR, 30, genR * 2);
                            ctx.fillStyle = '#cc2222';
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('N', genCx - genR - 25, genCy + 5);

                            ctx.fillStyle = '#2244aa88';
                            ctx.fillRect(genCx + genR + 10, genCy - genR, 30, genR * 2);
                            ctx.fillStyle = '#4466cc';
                            ctx.fillText('S', genCx + genR + 25, genCy + 5);

                            // Field lines between magnets
                            for (var fl = 0; fl < 5; fl++) {
                                var fy2 = genCy - genR * 0.7 + fl * genR * 0.35;
                                ctx.strokeStyle = 'rgba(88,166,255,0.15)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(genCx - genR - 10, fy2);
                                ctx.lineTo(genCx + genR + 10, fy2);
                                ctx.stroke();
                                // Arrow
                                ctx.fillStyle = 'rgba(88,166,255,0.15)';
                                ctx.beginPath();
                                ctx.moveTo(genCx + genR + 5, fy2);
                                ctx.lineTo(genCx + genR - 3, fy2 - 3);
                                ctx.lineTo(genCx + genR - 3, fy2 + 3);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Rotating coil (drawn as a rectangle edge-on)
                            var coilW = genR * 0.8;
                            var coilH = genR * 1.4;
                            var cosA = Math.cos(angle);
                            var sinA = Math.sin(angle);

                            // Coil sides
                            var cw2 = coilW / 2 * cosA;
                            ctx.save();
                            ctx.shadowColor = viz.colors.teal;
                            ctx.shadowBlur = 8;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(genCx - cw2, genCy - coilH / 2);
                            ctx.lineTo(genCx + cw2, genCy - coilH / 2);
                            ctx.lineTo(genCx + cw2, genCy + coilH / 2);
                            ctx.lineTo(genCx - cw2, genCy + coilH / 2);
                            ctx.closePath();
                            ctx.stroke();

                            // Fill coil with transparency showing the angle
                            var coilAlpha = 0.05 + 0.12 * Math.abs(cosA);
                            ctx.fillStyle = 'rgba(63,185,160,' + coilAlpha + ')';
                            ctx.fill();
                            ctx.restore();

                            // Normal vector from coil center
                            var normLen = 40;
                            var normX = normLen * cosA;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(genCx, genCy);
                            ctx.lineTo(genCx + normX, genCy);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            var nDir = normX > 0 ? 1 : -1;
                            ctx.moveTo(genCx + normX, genCy);
                            ctx.lineTo(genCx + normX - nDir * 7, genCy - 4);
                            ctx.lineTo(genCx + normX - nDir * 7, genCy + 4);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('n', genCx + normX + nDir * 10, genCy - 8, viz.colors.orange, 11, 'center');

                            // Rotation arrow
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(genCx, genCy, genR + 5, -0.3, Math.PI + 0.3);
                            ctx.stroke();
                            viz.screenText('\u03c9', genCx, genCy - genR - 14, viz.colors.yellow, 12, 'center');

                            // === RIGHT: Waveform plots ===
                            var plotX = 350, plotW2 = w - plotX - 15;

                            // Flux plot
                            var plotY1 = 20, plotH1 = 100;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY1, plotW2, plotH1);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY1, plotW2, plotH1);
                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY1 + plotH1 / 2);
                            ctx.lineTo(plotX + plotW2, plotY1 + plotH1 / 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            var peakFlux = N * B * A;
                            if (fluxTrace.length > 1) {
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i < fluxTrace.length; i++) {
                                    var px = plotX + i * plotW2 / maxTrace;
                                    var py = plotY1 + plotH1 / 2 - (fluxTrace[i] / (peakFlux * 1.2)) * plotH1 / 2;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('\u03a6(t)', plotX + 25, plotY1 + 12, viz.colors.green, 11, 'center');
                            viz.screenText('\u03a6 = ' + flux.toFixed(3) + ' Wb', plotX + plotW2 - 60, plotY1 + 12, viz.colors.green, 10, 'center');

                            // EMF plot
                            var plotY2 = plotY1 + plotH1 + 20, plotH2 = 100;
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(plotX, plotY2, plotW2, plotH2);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, plotY2, plotW2, plotH2);
                            // Zero line
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY2 + plotH2 / 2);
                            ctx.lineTo(plotX + plotW2, plotY2 + plotH2 / 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            if (emfTrace.length > 1 && peakEmf > 0.01) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j < emfTrace.length; j++) {
                                    var px2 = plotX + j * plotW2 / maxTrace;
                                    var py2 = plotY2 + plotH2 / 2 - (emfTrace[j] / (peakEmf * 1.2)) * plotH2 / 2;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }
                            viz.screenText('\u03b5(t)', plotX + 25, plotY2 + 12, viz.colors.orange, 11, 'center');
                            viz.screenText('\u03b5 = ' + emf.toFixed(2) + ' V', plotX + plotW2 - 60, plotY2 + 12, viz.colors.orange, 10, 'center');

                            // Info panel
                            var infoY = plotY2 + plotH2 + 15;
                            ctx.fillStyle = '#0c0c20dd';
                            ctx.fillRect(plotX, infoY, plotW2, 80);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.strokeRect(plotX, infoY, plotW2, 80);

                            viz.screenText('AC Generator', plotX + plotW2 / 2, infoY + 14, viz.colors.white, 13, 'center');
                            viz.screenText('\u03b5\u2080 = NBA\u03c9 = ' + peakEmf.toFixed(2) + ' V', plotX + plotW2 / 2, infoY + 35, viz.colors.orange, 12, 'center');
                            viz.screenText('f = ' + (omega / (2 * Math.PI)).toFixed(2) + ' Hz, T = ' + (2 * Math.PI / omega).toFixed(2) + ' s', plotX + plotW2 / 2, infoY + 55, viz.colors.text, 11, 'center');
                            viz.screenText('\u03b5_rms = ' + (peakEmf / Math.sqrt(2)).toFixed(2) + ' V', plotX + plotW2 / 2, infoY + 72, viz.colors.teal, 11, 'center');

                            // Lightbulb indicator (brightness = |emf|/peakEmf)
                            var bulbCx = genCx, bulbCy = genCy + genR + 55;
                            var brightness = peakEmf > 0.01 ? Math.abs(emf) / peakEmf : 0;
                            var bulbGlow = ctx.createRadialGradient(bulbCx, bulbCy, 2, bulbCx, bulbCy, 25);
                            bulbGlow.addColorStop(0, 'rgba(255,215,0,' + (brightness * 0.9) + ')');
                            bulbGlow.addColorStop(0.5, 'rgba(255,180,0,' + (brightness * 0.3) + ')');
                            bulbGlow.addColorStop(1, 'rgba(255,180,0,0)');
                            ctx.fillStyle = bulbGlow;
                            ctx.beginPath();
                            ctx.arc(bulbCx, bulbCy, 25, 0, Math.PI * 2);
                            ctx.fill();

                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(bulbCx, bulbCy, 10, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = 'rgba(255,215,0,' + VizEngine.clamp(brightness, 0.05, 1) + ')';
                            ctx.fill();
                            viz.screenText('Load', bulbCx, bulbCy + 22, viz.colors.text, 9, 'center');

                            // Wires from coil to bulb
                            ctx.strokeStyle = viz.colors.axis + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(genCx - 15, genCy + coilH / 2);
                            ctx.lineTo(genCx - 15, bulbCy);
                            ctx.lineTo(bulbCx - 10, bulbCy);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(genCx + 15, genCy + coilH / 2);
                            ctx.lineTo(genCx + 15, bulbCy);
                            ctx.lineTo(bulbCx + 10, bulbCy);
                            ctx.stroke();
                        }

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A generator coil has 500 turns, area \\(0.04\\,\\text{m}^2\\), and rotates at \\(50\\,\\text{Hz}\\) in a \\(0.30\\,\\text{T}\\) field. Find (a) the peak EMF, (b) the RMS EMF.',
                    hint: 'Use \\(\\mathcal{E}_0 = NBA\\omega\\) with \\(\\omega = 2\\pi f\\), and \\(\\mathcal{E}_{\\text{rms}} = \\mathcal{E}_0/\\sqrt{2}\\).',
                    solution: '\\(\\omega = 2\\pi(50) = 314\\,\\text{rad/s}\\). \\(\\mathcal{E}_0 = (500)(0.30)(0.04)(314) = 1885\\,\\text{V}\\). \\(\\mathcal{E}_{\\text{rms}} = 1885/\\sqrt{2} \\approx 1333\\,\\text{V}\\).'
                }
            ]
        }
    ]
});
