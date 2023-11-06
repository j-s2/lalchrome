import { useEffect, useState } from "react";
import config from "../config";

function App() {
  const API_KEY: string = config.MY_KEY;
  //define types for data being read in
  interface Team {
    id: number;
    name: string;
    nickname: string;
    code: string;
    logo: string;
  }

  interface Score {
    win: number;
    loss: number;
    series: {
      win: number;
      loss: number;
    };
    linescore: {
      0: string;
      1: string;
      2: string;
      3: string;
    };
    points: number;
  }

  interface GameType {
    id: number;
    league: string;
    season: number;
    date: {
      start: string;
      end: null;
      duration: null;
    };
    stage: number;
    status: {
      clock: string;
      halftime: false;
      short: number;
      long: string;
    };
    periods: {
      current: number;
      total: number;
      endOfPeriod: boolean;
    };
    arena: {
      name: string;
      city: string;
      state: string;
      country: null;
    };
    teams: {
      visitors: Team;
      home: Team;
    };
    scores: {
      visitors: Score;
      home: Score;
    };
    officials: [];
    timesTied: null;
    leadChanges: null;
    nugget: null;
  }

  const [game, setGame] = useState<GameType | null>(null);

  async function getLiveStats() {
    //api endpoint
    const url = "https://api-nba-v1.p.rapidapi.com/games?live=all";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();

      //parse data in JSON format
      const process = JSON.parse(result);

      //if data exists and data is stored in array
      if (process.response && process.response.length > 0) {
        //find a game in the array where the Lakers are playing
        const findGame = process.response.find((lakersGame: GameType) => {
          return (
            lakersGame.teams.visitors.nickname === "Lakers" ||
            lakersGame.teams.home.nickname === "Lakers"
          );
        });

        //if lakers game exists, set state variable
        if (findGame) {
          setGame(findGame);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLiveStats();
  }, []);

  return (
    <>
      {game ? (
        <div>
          <h2>
            {game.teams.visitors.nickname} vs. {game.teams.home.nickname}
          </h2>
          <h3>
            {game.periods.current === 4 &&
            game.status.clock === "0:00" &&
            game.scores.home.points != game.scores.visitors.points
              ? "FINAL"
              : game.periods.current === 4 &&
                game.status.clock === "0:00" &&
                game.scores.home.points === game.scores.visitors.points
              ? `OT ${game.status.clock}`
              : game.status.halftime
              ? "HALFTIME"
              : `QT ${game.periods.current} , ${game.status.clock} left`}
          </h3>
          <div>
            <img
              src={game.teams.visitors.logo}
              style={{ width: "40px", height: "20px" }}
            />
            {game.teams.visitors.code} {game.scores.visitors.points}
          </div>
          <div>
            <img
              src={game.teams.home.logo}
              style={{ width: "40px", height: "20px" }}
            />
            {game.teams.home.code} {game.scores.home.points}
          </div>
        </div>
      ) : (
        <div>
          No lakers games right now, don't worry though it might be a good
          thing.
        </div>
      )}
    </>
  );
}

export default App;
