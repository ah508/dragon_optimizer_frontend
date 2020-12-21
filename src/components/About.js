import React from "react"
import "../styles/Essay.css"

function About() {
    return (
        <article className="backdrop">
            <section className="topbill">
                <h3 className="sectionheader">Gameplay Assumptions</h3>
                <p className="textbody">
                    To smooth things over with regard to gameplay
                    and execution, we assume that:

                    <ol>
                        <li>
                            All proper projectiles deal damage
                            on the same frame that they spawn
                        </li>
                        <li>
                            Except in some rare circumstances, you 
                            can cancel any attack on the same frame 
                            it deals damage
                        </li>
                        <li>
                            Changes to buffs/debuffs may only be 
                            initiated by the transformed dragon
                        </li>
                        <li>
                            Skills have a hard upper limit on the
                            number of uses
                        </li>
                        <li>
                            All gathered empirical framedata is
                            correct
                        </li>
                    </ol>

                    In reality, these will not necessarily always
                    be accurate - our data may be in error, and not
                    all targets are as forgiving as Roy.
                </p>
            </section>
            <section className="sectionbody">
                <h3 className="sectionheader">How it works</h3>
                <p>
                    The aim of this program is to help the user 
                    maximize their use of time spent transformed.

                    In most cases, this is not particularly difficult
                    to achieve through complete enumeration - however
                    there are a few key features we can use to
                    simplify the problem.

                    <div className="paddedlist">
                        <ul>
                            <li>
                                All actions are bounded by a finite 
                                resource (time or number of uses)
                            </li>
                            <li>
                                Actions do not need to be strictly ordered<sup><a href="#fn1" id="r1">+</a></sup>
                            </li>
                            <li>
                                Each action has known value (damage) that
                                is independent of other actions<sup><a href="#fn2" id="r2">++</a></sup>
                            </li>
                            <li>
                                Our objective may be expressed as a 
                                linear combination of the values of 
                                each action 
                            </li>
                        </ul>
                        <p className="footnote" id="fn1"><sup><a href="#r1">+</a></sup>
                        In order to perform a C2, you first need to C1, but the order
                        of execution does not change the total value.</p>
                        <p className="footnote" id="fn2"><sup><a href="#r2">++</a></sup>
                        This doesn't naturally hold for buffs, but we can <i>make</i> it hold</p>
                    </div>

                    These features allow us to formulate the problem as a <a 
                        href="https://en.wikipedia.org/wiki/Knapsack_problem"
                        target="_blank" 
                        rel="noreferrer"
                    >knapsack</a> with a few additional constraints for sequential
                    dependence.
                </p>
                <p>
                    We choose to solve this as an Integer Linear Program (ILP), 
                    using <a href='https://pypi.org/project/mip/'
                    target="_blank" rel="noreferrer"
                    >Python MIP</a> as an intermediary to COIN-OR CBC and CLP.
                </p>
                <p>
                    Regrettably, Python MIP introduces a lot of overhead,
                    so it is desirable to get rid of it at some point
                    in favor of making calls to linear programming libraries
                    more directly.
                </p>
                <h4 className="subheader">Why it works</h4>
                <p>
                    Since our objective function is linear, we can
                    demonstrate that it is convex (without loss of 
                    generality, it is also concave) which means that
                    a discovered local optimum will also be a global
                    optimum.

                    This allows us to utilize highly efficient
                    hill climbing or gradient descent algorithms 
                    to find an optimal solution to the problem.

                    In particular, CLP uses the Simplex method, 
                    which is a hill climbing algorithm.
                </p>
                <p>
                    Unless you specifically request a solution
                    to the LP relaxation, all decision variables
                    are additionally required to be integers.
                    
                    This means that we aren't just using linear
                    programming - CBC uses a branch and cut
                    (or branch and bound, if you so prefer)
                    algorithm with the LP relaxation of the 
                    integer programming problem as a bound.

                    In some sense, this is technically still
                    an enumerative method; but it is highly
                    optimized, and much more sophisticated
                    than naive methods such as complete 
                    enumeration.
                </p>
                <h4 className="subheader">Handling Buffs</h4>
                <p>
                    The existence of buffs and debuffs introduces
                    a small problem into our program - applying
                    one or both will change the value of other 
                    available actions.

                    Linear programming is great, but you can't
                    really apply it when your function isn't linear.

                    Fortunately, we can fix this.
                </p>
                <p>
                    You may notice that, while buffed, we
                    still have a linear function, it's just 
                    not the <i>same</i> linear function.

                    We can actually separate our nonlinear
                    function into these two linear functions.

                    Furthermore, for our purposes this ends up
                    being repeatable - the function can be
                    decomposed into some combination of 
                    functions corresponding to all possible
                    states of being buffed.

                    We need to add a few additional dummy
                    variables in order to account for how
                    states can be entered/exited, which does
                    increase the complexity slightly.

                    Classifying the objective funtion by these 
                    "buff states" completely solves the problem
                    introduced by buffs, but it is not without
                    its faults.
                </p>
                <h4 className="subheader">A Note on Arbitrary Complexity</h4>
                <p>
                    If buffs can be reasonably accounted for 
                    through buff states, why don't we permit
                    timed buffs and debuffs to be sent in
                    requests to the server?
                </p>
                <p>
                    The issue is that as a function of the
                    number of buffs, the number of buff states
                    grows <i>fast</i>. 
                    
                    You can approximate the first few terms 
                    by an exponential of base 3.
                    
                    This starts to become a problem for the 
                    human trying to read the output around 4
                    or 5 buffs, and starts to become a problem
                    for the program itself around 14 or 15 buffs.
                    
                    Because of this, it is highly undesirable to
                    permit input of arbitrary timed buffs.

                    This is also why Giovanni is disabled for
                    the forseeable future.
                </p>
            </section>
            <section className="sectionbody">
                <h3 className="sectionheader">How the Problem is Formatted</h3>
                <p className="textbody">
                    <h4 className="subheader">States</h4>
                        At the topmost layer, the problem is divided
                        by "state."<br />

                        State encompasses all bonuses or modifiers
                        that you possess at a particular point in
                        time - in each state you can take similar
                        actions, but the value of that action
                        may differ between states.

                    <h4 className="subheader">Variables</h4>
                    <p>
                        There are two primary types of decision variables:
                        <div className="paddedlist">
                            <ol>
                                <li>Actions</li>
                                <li>Dummies</li>
                            </ol>
                        </div>
                    </p>
                    <p>
                        <u>Action  variables</u> directly represent
                        actions you can take while transformed.

                        This includes things like transforming,
                        executing a sequential attack, dodging,
                        or using a skill.

                        In the objective function, these variables
                        have coefficients equal to the damage they deal
                        or the number of frames they take to complete,
                        depending on what you're optimizing for.
                    </p>
                    <p>
                        <u>Dummy variables</u> do not represent actions 
                        that you take directly.
                        
                        Instead, these variables are introduced to
                        model abstract behavior that cannot be captured
                        with action variables alone.

                        Among other things, this includes overlapping
                        buff timings and transitions between states.

                        In the objective function, dummy variables
                        always have coefficients of zero.
                    </p>
                    
                    <h4 className="subheader">Constraints</h4>
                    <p>
                        There are six primary types of constraints:
                        <div className="paddedlist">
                            <ol>
                                <li>Sequential Dependence Constraints</li>
                                <li>Entry Constraints </li>
                                <li>Usage Constraints</li>
                                <li>Time Constraints</li>
                                <li>Overlap Constraints</li>
                                <li>SP Constraints</li>
                            </ol>
                        </div>

                        There is also a seventh type of constraint,
                        the "Optimality Constraint," but we'll describe
                        that in the next section.
                    </p>
                    <p>
                        <u>Sequential dependence constraints</u> are those
                        that ensure a proper ordering can be constructed
                        post-solve.
                        
                        A common constraint of this type might dictate
                        that the number of C2 actions cannot exceed
                        the number of C1 actions.

                        In other words: 
                        <div className="formula">
                            C2 ≤ C1
                        </div>
                        <div className="formula">or</div>
                        <div className="formula">
                            C2 - C1 ≤ 0
                        </div>

                        For problems involving buff states, this can also
                        involve dummy variables representing an exit from
                        a state.

                        For the prior example, if a buff state were
                        involved, the constraint would instead read:
                        <div className="formula">
                            C2 - C1 - BC1 ≤ 0
                        </div>
                        where "BC1" is a dummy variable indicating 
                        that the last action you took while buffed
                        was a C1.
                    </p>
                    <p>
                        <u>Entry constraints</u> appropriately restrict how
                        you initiate a sequence of actions.

                        A typical entry constraint might state that
                        you cannot initiate a C1 more than once 
                        without first dodging, waiting, using a 
                        skill, or transforming.

                        Better stated, this means that the number 
                        of C1 actions cannot exceed one (transform
                        is mandatory) plus the total number of 
                        dodges, waits, and skills.
                        
                        More concisely:
                        <div className="formula">
                            C1 - W - D - S ≤ 1
                        </div>
                        
                    </p>
                    <p>
                        <u>Usage constraints</u> are simply an upper bound
                        on the usage of a particular action.

                        Most commonly, these dictate that you cannot
                        use a skill more than once
                        <div className="formula">
                            S ≤ 1
                        </div>
                        or that you cannot exit a state more than once
                        <div className="formula">
                            BC1 + BC2 + BC3 ≤ 1
                        </div>
                    </p>
                    <p>
                        <u>Time constraints</u> place limits on how
                        much time can be spent in a particular state,
                        or how much time can be spent overall.

                        Constraints of this type follow the form of:
                        <div className="formula">
                            Σ c<sub>i</sub>x<sub>i</sub> ≤ t
                        </div>
                        where c<sub>i</sub> is the cost (time)
                        of action i, x<sub>i</sub> is the decision
                        variable representing action i, and t is
                        the total permitted time.

                        When multiple buffs are involved, it's
                        necessary to use a dummy variable to model
                        overlap times, since those can't be determined
                        before solving.
                    </p>
                    <p>
                        <u>Overlap constraints</u> are used to
                        "set" the value of a dummy variable to
                        the unspent time of an initial buff state,
                        so that the time spent overlapping the
                        next buff state can be accurately limited.
                    </p>
                    <p>
                        <u>SP constraints</u> ensure that a skill
                        is not used prematurely when SP generation
                        is involved.

                        Constraints of this type follow the form of:
                        <div className="formula">
                            c<sub>s</sub>x<sub>s</sub> - Σ a<sub>i</sub>x<sub>i</sub> ≤ 0
                        </div>
                        where c<sub>s</sub> is the SP cost of action S,
                        x<sub>s</sub> is the decision variable associated
                        with action S, a<sub>i</sub> is the SP generated
                        by action i, and x<sub>i</sub> is the associated
                        decision variable.
                        
                        Unfortunately, this cannot be used to model
                        an arbitrary number of skills.
                    </p>
                    <h4 className="subheader">Constructing and Solving the Model</h4>
                    With these definitions in mind, it becomes rather
                    simple to break the construction of the problem into
                    manageable steps.
                    <div className="paddedlist">
                        <ol>
                            <li>
                                Generate all possible states.
                            </li>
                            <li>
                                Set an objective function, with 
                                decision variables for each action
                                in each state, with coefficients
                                equal to the damage dealt by that
                                action in that state.
                            </li>
                            <li>
                                Add an equality constraint to set
                                the number of transformations equal
                                to one.
                            </li>
                            <li>
                                For each state, add sequential
                                dependence constraints for the
                                dragon's main string (C1, C2, etc.)
                            </li>
                            <li>
                                For each state, add an entry constraint.
                            </li>
                            <li>
                                Set usage constraints for state exit
                                dummy variables. (if needed)
                            </li>
                            <li>
                                Set usage constraints for skills.
                            </li>
                            <li>
                                Set a time constraint for the entire
                                transformation.
                            </li>
                            <li>
                                For each buff state, set a
                                time constraint. (if needed)
                            </li>
                            <li>
                                Set overlap constraints. (if needed)
                            </li>
                            <li>
                                Set SP constraints. (if needed)
                            </li>
                            <li>
                                Solve the maximization problem.
                            </li>
                        </ol>
                    </div>
                    Notice that step 1 and steps 3 through 6 are entirely
                    unaffected by user input. As a result, we may pregenerate
                    these features of the model and load them in as needed.
                    Solving the model yields an optimal value for our
                    objective function, maximizing the damage dealt during
                    this particular transformation; however there may be 
                    a more optimal solution - a solution that achieves
                    the same damage in a shorter time.<br />
                    So, we adjust the model such that it minimizes
                    the time spent in transformation; but in order
                    to ensure that our damage is still maximized, we
                    add an additional <i>optimality constraint</i> of
                    the form:
                    <div className="formula">
                        Σ d<sub>i</sub>x<sub>i</sub> = K
                    </div>
                    where d<sub>i</sub> is the damage produced
                    by action i, x<sub>i</sub> is the corresponding
                    decision variable, and K is the optimal value
                    of the objective function from the previous solve.<br />
                    We adjust the model as follows:
                    <div className="paddedlist">
                        <ol>
                            <li>
                                Change the coefficients of the objective
                                function from damage to time. 
                            </li>
                            <li>
                                Add the optimality constraint to the model.
                            </li>
                            <li>
                                Solve the minimization problem.
                            </li>
                        </ol>
                    </div>
                    This will yield a solution that produces maximal
                    damage with minimal time.<br />
                    Note: there are less costly methods of doing multi-objective
                    optimizations, but they will not necessarily guarantee a
                    solution that matches our criteria for optimality.
                </p>
                <h4 className="subheader">Unusual Cases</h4>
                <p>
                    Some dragons are just weird.

                    Sometimes, we need to add additional constraints
                    or variables to model them correctly.
                </p>
                <p>
                    <u>Gala Reborn Poseidon</u> automatically uses 
                    a skill at the end of transformation.
                    
                    This is easy enough to account for - we simply
                    add an extra decision variable to represent this
                    skill, and an extra constraint to limit its use.<br />
                    
                    Note: this extra skill does not interact with
                    anything, so we needn't edit entering constraints
                    with its introduction.
                </p>
                <p>
                    <u>"Bufferables"</u> like Leviathan, Pele, and High
                    Brunhilda all have actions that cannot be immediately
                    canceled by a dodge - though they can be canceled
                    immediately by a skill.

                    This results in two different timings for the same
                    action, so we need to add a decision variable to 
                    represent this alternate execution, and to constrain
                    it by the number of skill uses.

                    We must also modify sequential dependence constraints
                    like so:
                    <div className="formula">
                        C<sub>i</sub> + C<sub>ia</sub> - C<sub>i-1</sub> ≤ 0
                    </div>
                    Where C<sub>i</sub> is the move in question,
                    C<sub>ia</sub> is the alternate execution, and 
                    C<sub>i-1</sub> is the preceding action.

                    Do note that we do <i>not</i> modify constraints where
                    the move in question is the preceding action, since
                    the alternate execution can only be followed up by a
                    skill.
                </p>
                <p>
                    <u>Styx</u> has multiple different levels for his
                    skill, based on the number of C3s he executes.
                    
                    These all require separate decision variables which
                    collectively utilize the same usage constraint.

                    To ensure that the appropriate level is used
                    for our given number of C3s we will also require
                    additional modified sequential dependence constraints.
                </p>
            </section>
            <section className="sectionbody">
                <h3 className="sectionheader">Limitations and Other Issues</h3>
                <p>
                    Naturally, our assumptions and choice of 
                    solution strategy introduce a number of
                    limitations and shortcomings. 
                    
                    In addition to these, there are some bumps 
                    with the current implementation that still 
                    need to be ironed out.
                </p>
                <h4 className="subheader">Buffs</h4>
                <p>
                    The first and most difficult limitation
                    has already been discussed to some extent.
                    
                    In general, this limitation cannot be
                    removed - the computational difficulties
                    it introduces simply cannot be overcome.

                    However, it may be possible to compromise.

                    <i> Up to some number</i> of buffs may still be
                    safe, to a degree, and with better formatting
                    of output the results can be made human-readable.

                    A compromise like this would require more
                    groundwork before it could be considered -
                    the program in its current state isn't fit
                    to handle the pure dynamic generation of
                    constraints that this would require.
                </p>
                <h4 className="subheader">Projectiles</h4>
                <p>
                    The disconnect between how the program handles 
                    projectiles and how they behave in-game may,
                    in theory, generate some suboptimal solutions.

                    Unfortunately, I do not believe this limitation 
                    can be overcome with this solution strategy.

                    Enumerative methods would be able to model this 
                    behavior more accurately, but the sacrifice of 
                    speed isn't something I'm willing to entertain.
                </p>
                <h4 className="subheader">Framedata</h4>
                <p>
                    It is entirely possible that the data we've
                    gathered for some dragons is in error.

                    This could also result in the generation of
                    suboptimal solutions.

                    This could also be overcome, with a great 
                    deal of additional data collection.

                    Personally, that's not something I'm willing
                    to do.

                    Most of the people who I've asked to gather
                    data are also disinclined to do this.

                    Data collection is tedious, unglamorous,
                    and unlikely to change a great deal.

                    Understandably, <i>nobody</i> wants to do it.

                    The most promising approach would be obtaining
                    frames through... alternative means... but most
                    forays related to that have met dead ends.

                    Chu suspects it may have something to do with
                    the engine instead of the game.
                </p>
                <p>
                    In any case - accuracy of framedata has always
                    been and will likely continue to be the biggest
                    thorn in the side of this project.
                </p>
                <h4 className="subheader">Accurate Afflictions</h4>
                <p>
                    Right now, all affliction punishers are lumped
                    together under the same binary banner.

                    "You have 'em or you don't."

                    This means that disjointed punishers, or
                    punishers that only activate on dragon
                    skill can't be modeled.

                    Generally this isn't a big deal, but it
                    is something some users may desire to do.
                </p>
                <p>
                    Our chosen solution method can actually
                    handle a more robust system - the code just
                    isn't there right now. *wink*
                </p>
                <h4 className="subheader">"Simulation"</h4>
                <p>
                    This tool is not a simulator, and should never
                    be treated as one.

                    Semantically you can debate that, but in the
                    context of Dragalia Lost "sim" has a very 
                    clear connotation - and I would like to ensure
                    that there is no conflation.

                    This tool is more powerful in some respects,
                    and less powerful in many, <i>many</i> others.

                    Please be mindful of the limited context
                    provided here - the bulk of the game is not
                    spent in transformation.
                </p>
                <h4 className="subheader">Output</h4>
                <p>
                    The format of output is uh... not the greatest
                    right now.

                    I wanted to make and implement a generator
                    for valid strings, but I legit just don't have
                    the time right now.

                    It might require a few changes to the API,
                    but output can totally be streamlined and 
                    hopefully will be at some point.
                </p>
                <p>
                    There are other plans related to this that
                    I also haven't had time to work on,
                    like a string parser to allow for
                    additional experimentation post-solve.
                </p>
                <h4 className="subheader">Miscellaneous Limitations</h4>
                <p>
                    <ol>
                        <li>
                            The system is not built around
                            disjointed buff timings.
                        </li>
                        <li>
                            The system is not built with
                            consideration for buff caps.
                        </li>
                        <li>
                            The system is built on
                            deterministic behavior -
                            crits are weighted and 
                            there is not yet any 
                            support for randomized buffs.
                            (actually this is relevant 
                            for Shishimai.)
                        </li>
                        <li>
                            Most of the formulation
                            is still done manually,
                            and hence may be prone to
                            errors.
                        </li>
                        <li>
                            Python can be kinda slow
                            sometimes. That may or
                            may not prove to be a 
                            problem in production.
                        </li>
                    </ol>
                </p>
            </section>
            <section className="sectionbody">
                <h3 className="sectionheader">Future Improvements</h3>
                <ol>
                    <li>
                        Get frames for missing dragons
                    </li>
                    <li>
                        Change the data format to check for buff zones
                    </li>
                    <li>
                        (try to) Implement Thor
                    </li>
                    <li>
                        Implement Shishimai (?)
                    </li>
                    <li>
                        Move all of the dragon information into an actual database
                        for ease of updating.
                    </li>
                    <li>
                        Add a means of retrieving dragon information instead of
                        initiating a solve. (goes with above)
                    </li>
                    <li>
                        Swap over to sim standard for filestuff.
                    </li>
                    <li>
                        Make an arbitrary string parser with graphical display.
                    </li>
                    <li>
                        Migrate verifications from the spreadsheet to this site.
                    </li>
                    <li>
                        Integrate use of COIN-OR libraries directly, and drop Python MIP.
                    </li>
                </ol>
            </section>
            <div className="emptydiv"></div>
        </article>
    )
}

export default About