// Task 1: Declare The Task Array and The Interval ID
// oneTimeTasks holds work that should happen once, after a delay (system
// check, start monitoring, stop monitoring, begin the countdown). Each entry
// is an object: { func, delay }. Nothing runs when we push into this array —
// runOneTimeTasks() is what actually schedules the timers.
const oneTimeTasks = [];

// setInterval returns a numeric id. We keep it here so stopMonitoring() can
// pass that same id to clearInterval(). let, not const, because the id is
// assigned later, inside startMonitoring(), and is unknown until then.
let monitoringTaskId;

// Task 2: Add One-Time Task Function
// Registers a function to run once, delay milliseconds from the moment
// runOneTimeTasks() is called. This only stores the task; it does not start
// a timer. Delays are relative to the same start time, so a 3000ms task and
// a 10000ms task are both measured from mission start, not from each other.
function addOneTimeTask (func, delay)
{
	// Shorthand for { func: func, delay: delay }.
	oneTimeTasks.push({ func, delay });
}

// Task 3: Run One-Time Tasks Function
// Walks the task list and hands each one to the browser/Node timer system.
// setTimeout(fn, ms) schedules fn to run once after ms milliseconds, then
// returns immediately. The loop finishes in a few microseconds; the tasks
// themselves run later, on the event loop, when each delay expires.
function runOneTimeTasks ()
{
	for (const task of oneTimeTasks)
	{
		setTimeout(task.func, task.delay);
	}
}

// Task 4: Start Monitoring Function
// Continuous work uses setInterval, which repeats until clearInterval is
// called. "Every few seconds" is 2000ms here so a few status lines print
// during the window between start (3s) and stop (10s).
function startMonitoring ()
{
	console.log("Monitoring started. Watching space station conditions.");

	// Save the id. Without it, nothing can stop this interval later.
	// The arrow function closes over no mission state; it just logs.
	monitoringTaskId = setInterval(() =>
	{
		console.log("Monitoring: oxygen, power, and cabin pressure are stable.");
	}, 2000);
}

// Task 5: Stop Monitoring Function
// clearInterval cancels future ticks. A tick that is already queued may
// still fire once, but no further monitoring messages are scheduled.
// The id is left as-is; clearing an already-cleared id is a no-op.
function stopMonitoring ()
{
	clearInterval(monitoringTaskId);
	console.log("Monitoring stopped.");
}

// Task 6: Start Countdown Function
// duration is the starting T-minus value in seconds. A local countdownId is
// enough here (unlike monitoringTaskId) because the countdown stops itself
// and nothing outside this function needs to cancel it.
function startCountdown (duration)
{
	// remaining lives in this function's scope. The interval callback below
	// closes over it, so each tick sees and updates the same number.
	let remaining = duration;

	// Print the start value immediately. The interval waits a full second
	// before its first call, so without this line the countdown would appear
	// to begin one second late.
	console.log(`T-minus ${remaining} seconds`);

	const countdownId = setInterval(() =>
	{
		remaining--;

		if (remaining > 0)
		{
			console.log(`T-minus ${remaining} seconds`);
		}
		else
		{
			// Hit zero: cancel the interval first so it cannot tick again,
			// then announce launch. We do not print "0" — zero means liftoff.
			clearInterval(countdownId);
			console.log("Liftoff!");
		}
	}, 1000);
}

// Task 7: Schedule Pre-Launch Activities and Launch
// Builds the mission timeline, then starts every timer at once.
//
//   1s   pre-launch system check
//   3s   monitoring starts, then repeats every 2s (about 5s, 7s, and 9s)
//   10s  monitoring stops, before the countdown so the two don't overlap
//   11s  countdown from 5; ticks at 12s, 13s, 14s, 15s
//   16s  remaining hits 0 and the script prints "Liftoff!"
function scheduleMission ()
{
	// One-time message. Delay is 1000ms after runOneTimeTasks().
	addOneTimeTask(() =>
	{
		console.log("Pre-launch system check: all systems nominal.");
	}, 1000);

	// Start the repeating monitor. The 3000ms delay only controls when
	// startMonitoring() is called; the 2000ms repeat rate lives inside it.
	addOneTimeTask(() =>
	{
		startMonitoring();
	}, 3000);

	// Stop after enough cycles to see monitoring, and before the countdown.
	addOneTimeTask(() =>
	{
		stopMonitoring();
	}, 10000);

	// 5-second countdown. Its own setInterval is separate from the
	// one-time-task timers and from monitoringTaskId.
	addOneTimeTask(() =>
	{
		startCountdown(5);
	}, 11000);

	// Schedule every task registered above. Call this once, after the list
	// is complete — calling it earlier would start only the tasks added so far.
	runOneTimeTasks();
}

// Task 8: kick off the mission as soon as this file is executed.
scheduleMission();
