class UserAchievement {
  boardgame_id;
  achievement_id;
  username;

  constructor(boardgame_id, achievement_id, username) {
    this.boardgame_id = boardgame_id;
    this.achievement_id = achievement_id;
    this.username = username;
  }

  async create(dbConnection) {
    try {
      // perform actions on the collection object
      //domain here. eg domain.save to perform the blow insertion.
      const insert = await dbConnection.insertOne({
        boardgameID: this.boardgame_id,
        gameAchievementID: this.achievement_id,
        User: this.username,
      });
      console.log(insert);
      if (insert.insertedCount === 1) {
        return insert.ops[0];
      } else {
        return 1;
      }
    } catch (e) {
      console.log('the try in claimAchievement has failed.');
      return e;
    }
  }

  async delete(dbconnection) {
    console.log('hello, this is unclaimAchievement!!');

    try {
      const deleted = await dbconnection.deleteOne({
        boardgameID: this.boardgame_id,
        gameAchievementID: this.achievement_id,
        User: this.username,
      });
      //need to edit return to account for delete
      console.log(deleted);
      if (insert.insertedCount === 1) {
        return 0;
      } else {
        return 1;
      }
    } catch (e) {
      console.log('the try in unclaimAchievement has failed.');
      return e;
    }
  }
}

module.exports = UserAchievement;
