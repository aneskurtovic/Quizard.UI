export interface SessionLeaderboard {
  result: number;
  contestantName: string;
  startedAt: Date;
}

export interface SessionLeaderboardResponse {
  id: number;
  leaderboards: SessionLeaderboard[];
}
