const db = require('./conn.js');
const gamebase = require('../data/boardgames.json');
var crypto = require('crypto');

class Functions {
  static async getGameListJson(game) {
    console.log('The requested gameName is: ', game);
    let gameList = [];
    try {
      const response = gamebase.boardgames.map((reference, index) => {
        console.log(reference.name);

        if (reference.name.includes(game)) {
          gameList.push(reference);
          console.log('the if statement returns: ', reference);
        }
      });
      console.log('the end resonse is: ', gameList);
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
      console.log('The game from the JSON grab is: ', game);

      return returnableGame;
    } catch (err) {
      return err.message;
    }
  }

  //users

  static async claimAchievement(gameID, achievementID, user) {
    try {
      const check = await this.checkIfUserHasAchievement(
        gameID,
        achievementID.id,
      );
      if (check === true) {
        const failureMessage =
          'Sorry! The selected achievement has already been claimed.';
        return failureMessage;
      } else {
        const query = `INSERT INTO achievements (game_no, achievement_no, user_id) VALUES($1, $2, $3) RETURNING id`;

        const Response = await db.one(query, [gameID, achievementID.id, user]);
        return Response;
      }
    } catch (e) {
      return e;
    }
  }

  static async checkIfUserHasAchievement(gameID, achievementID) {
    console.log('checking if exists');
    try {
      const query =
        'SELECT DISTINCT achievements.game_no, achievements.achievement_no FROM achievements WHERE achievements.game_no = $1 AND achievements.achievement_NO = $2';
      const Response = await db.one(query, [gameID, achievementID]);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = Functions;
