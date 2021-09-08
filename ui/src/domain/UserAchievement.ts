class UserAchievement {
  boardgame_id!: string;
  achievement_id!: string;
  username!: string;

  constructor(boardgame_id: string, achievement_id: string, username: string) {
    this.setAchievementID(achievement_id);
    this.setBoardgameID(boardgame_id);
    this.setUsername(username);
  }

  //setters
  setAchievementID(id: string) {
    this.achievement_id = id;
  }

  setBoardgameID(id: string) {
    this.boardgame_id = id;
  }

  setUsername(username: string) {
    this.username = username;
  }

  //getters
  getAchievementID(): string {
    return this.achievement_id;
  }

  getBoardgameID() {
    return this.boardgame_id;
  }

  getUsername() {
    return this.username;
  }

  //hashcode needed here?
}

export default UserAchievement;
