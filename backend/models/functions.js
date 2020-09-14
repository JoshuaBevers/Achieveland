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

  static async getByUsername(name) {
    try {
      const response = await db.one('SELECT * FROM users WHERE username = $1', [
        name,
      ]);
      console.log('the response in function.js is:', response);
      return response;
    } catch (err) {
      console.log(
        'the error message from getbyusername in function.js is: ',
        err,
      );
      return err.message;
    }
  }

  static async createUser(username, password, email) {
    //salt and has the password.
    //salt function
    var genRandomString = function (length) {
      return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
    };

    //salt the password.
    var sha512 = function (password, salt) {
      var hash = crypto.createHmac(
        'sha512',
        salt,
      ); /** Hashing algorithm sha512 */
      hash.update(password);
      var value = hash.digest('hex');
      return {
        salt: salt,
        passwordHash: value,
      };
    };

    //hash the password.
    function saltHashPassword(userpassword) {
      var salt = genRandomString(16); /** Gives us salt of length 16 */
      var passwordData = sha512(userpassword, salt);
      console.log('UserPassword = ' + userpassword);
      console.log('Passwordhash = ' + passwordData.passwordHash);
      console.log('nSalt = ' + passwordData.salt);
      return passwordData;
    }

    const cryptoPass = saltHashPassword(password);
    console.log(cryptoPass);

    try {
      const query =
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id';
      const Response = await db.one(query, [
        username,
        cryptoPass.passwordHash,
        email,
      ]);
      console.log(Response);
      return Response;
    } catch (e) {
      return e.message;
    }
  }

  static async checkIfNameIsInUse(name) {
    try {
      const prospectiveName = await this.getByUsername(name);
      if (name === prospectiveName.username) {
        return true;
      }
      return false;
    } catch (e) {
      return e;
    }
  }

  static async claimAchievement(gameID, achievementID, user) {
    try {
      const query = `INSERT INTO achievements (game_no, achievement_no, user_id) VALUES($1, $2, $3) RETURNING id`;
      //need to break out the user to grab the achievement id and game id. to send in the Response.
      const Response = await db.one(query, [gameID, achievementID.id, user]);
      return Response;
    } catch (e) {
      return e;
    }
  }

  static async fetchAllAchievementsByUser(userID) {
    try {
      const query = 'SELECT * FROM achievements where user_id = $1';
      const Response = await db.any(query, [userID]);
      return Response;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Functions;
