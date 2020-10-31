const db = require('./conn.js');
const gamebase = require('../data/boardgames.json');

class Functions {
  static async getGameListJson(game) {
    let gameList = [];
    try {
      const response = gamebase.boardgames.map((reference, index) => {
        console.log(reference);
        const Search = reference.name.toLowerCase();

        if (Search.includes(game)) {
          gameList.push(reference);
        }
      });
      return gameList;
    } catch (e) {
      return e;
    }
  }

  static async getGameList(search) {
    try {
      search = search + '%';
      const response = await db.any('Select * FROM games WHERE name LIKE $1', [
        search,
      ]);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getGameByName(name) {
    try {
      let returnableGame = [];
      const game = gamebase.boardgames.forEach((reference, index) => {
        if (reference.name === name) {
          returnableGame.push(reference);
        }
      });

      return returnableGame;
    } catch (err) {
      return err.message;
    }
  }

  //users

  static async getUserAchievements(gameID, User) {
    try {
      const query = `SELECT * from achievements WHERE user_id = $1 AND game_no = $2`;
      const response = await db.any(query, [User, gameID]);
      return response;
    } catch (e) {
      return e;
    }
  }

  static async claimAchievement(gameID, achievementID, user) {
    try {
      const query = `INSERT INTO achievements (game_no, achievement_no, user_id) VALUES($1, $2, $3)`;

      const Response = await db.one(query, [gameID, achievementID.id, user]);
      return Response;
    } catch (e) {
      return e;
    }
  }

  static async unclaimAchievement(gameID, achievementID, user) {
    try {
      const query = `DELETE FROM achievements WHERE game_no = $1 AND achievement_no = $2 AND user_id = $3`;

      const Response = await db.one(query, [gameID, achievementID.id, user]);
      return Response;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Functions;
