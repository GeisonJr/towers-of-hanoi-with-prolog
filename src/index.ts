import * as pl from 'tau-prolog'

function solve(disks: number) {
	// Query to solve the problem
	const query = `hanoi(${disks}, left, center, right).`

	// Algorithm to solve the tower of hanoi
	const consult = `
	% If the number of disks is 1, then move the disk from A to C directly and stop
	hanoi(1, A, _, C) :-
			write('Move top disk from '), % Print the message
			write(A),
			write(' to '),
			write(C),
			nl. % Print a new line

	% If the number of disks is greater than 1, then move the top N-1 disks from A to B using C
	% N represents the number of disks
	% A, B and C represents the three towers (Left, Center and Right)
	hanoi(N, A, B, C) :-
			N > 1, % Checks if the N is greater than 1, if not run the previous rule
			M is N - 1, % Create a new variable M and assign N - 1 to it
			hanoi(M, A, C, B), % Move M disks from A to C using B as an auxiliary tower
			hanoi(1, A, _, C), % Move the last disk from A to C directly
			hanoi(M, B, A, C). % Move M disks from B to C using A as an auxiliary tower
	`

	// Create a new session for the prolog engine
	const session = pl.create()

	// Load the algorithm and test the consult
	session.consult(consult, {
		// If the algorithm is loaded successfully, then query the solution
		success: () => {
			// Load the query and test the query
			session.query(query, {
				// If the query is loaded successfully, then get the answers
				success: () => {
					// Get the answers and print them
					session.answers(console.log)
				},

				// If the query is not loaded successfully, then print the error
				error: (err) => {
					console.error(err)
				},
			})
		},

		// If the algorithm is not loaded successfully, then print the error
		error: (err) => {
			console.error(err)
		},
	})
}

solve(3)
