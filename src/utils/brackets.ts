import data from '../../bracket-data.json';

type Bracket = (typeof data)[0];

export function aggByRound(bracket: Array<Bracket>) {
  return bracket.reduce(
    (acc, curr) => {
      const round = curr.round;

      if (!acc[round]) {
        acc[round] = [];
      }

      acc[round].push(curr);

      return acc;
    },
    { 1: [] } as Record<number, Array<Bracket>>
  );
}

export const TEAM_COUNT = 8;

export function generateArrayOfNumbers(count: number) {
  return Array.from({ length: count }, (_, index) => index + 1);
}

export function generateMatchesFromRoundIndex(totalTeamsCount = TEAM_COUNT, round: number) {
  if (round === 0) return generateArrayOfNumbers(totalTeamsCount);

  // Return an array containing half of the teams from the previous round
  return generateArrayOfNumbers(totalTeamsCount / 2 ** round);
}

export function getNumberOfRounds(teamsCount = TEAM_COUNT) {
  let rounds = 1;
  let teams = teamsCount;

  while (teams >= 2) {
    rounds++;

    teams = teams / 2;
  }

  return rounds;
}

export function generateRounds() {
  return generateArrayOfNumbers(getNumberOfRounds(TEAM_COUNT));
}

export function lineCoords() {
  const coords: Record<string, { start: string; end: string }> = {};

  let endingMatch = 1;

  for (let row = 0; row < getNumberOfRounds(TEAM_COUNT); row++) {
    const round = row + 1;

    for (let column = 0; column < generateMatchesFromRoundIndex(TEAM_COUNT, row).length; column++) {
      if (round === getNumberOfRounds(TEAM_COUNT)) break;

      const match = column + 1;

      coords[`${round}-${match}`] = {
        start: `${round}-${match}`,
        end: `${round + 1}-${endingMatch}`,
      };

      // Every two matches, increment the ending match
      // So line draws to the next match
      // Example: 1-1 -> 2-1, 1-2 -> 2-1 | 3-1 -> 2-2, 3-2 -> 2-2
      if (match % 2 === 0) {
        endingMatch++;
      }
    }

    // Reset ending match to 1 for the next round
    endingMatch = 1;
  }

  return coords;
}
