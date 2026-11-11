function mysteryOperation ()
{
	const outcome = Math.random(); // Generates a random number between 0 and 1.

	if (outcome < 0.5)
	{
		console.log("The operation is completed successfully!");
	}
	else
	{
		throw new Error("The operation is failed mysteriously!");
	}
}

const numberOfMissions = 20;
const daysForSuccess = 13;
const daysForFailure = 1;
const daysForAttendance = 3;

let vacationDays = 0;

for (let mission = 1; mission <= numberOfMissions; mission++)
{
	try
	{
		mysteryOperation();
		vacationDays += daysForSuccess;
	}
	catch (error)
	{
		vacationDays += daysForFailure;
	}
	finally
	{
		vacationDays += daysForAttendance;
	}
}

console.log(`You deserve ${vacationDays} days of vacation!`);
