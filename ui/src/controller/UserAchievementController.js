import UserAchievementDAO from '../DAO/UserAchievementDAO';

export default class UserAchievementController {
  UserAchievementDAO = UserAchievementDAO;

  UserAchievementController(UserAchievmentDAO) {
    super();
    this.UserAchievementDAO = UserAchievmentDAO;
  }

  create() {}
}

//might not need.
