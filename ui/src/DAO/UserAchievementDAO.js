//will need to change to prod during push.
export const API_URL =
  'https://43jwmj8nuf.execute-api.us-east-1.amazonaws.com/dev/';

class UserAchievementDAO {
  async create(UserAchievement, token) {
    const url = API_URL + `user/achievement`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        url: 'https://dev-zrtci-fg.us.auth0.com/oauth/token',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(UserAchievement),
      });
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      return e;
    }
  }

  async delete(UserAchievement, token) {
    const url = API_URL + `user/unachievement`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        url: 'https://dev-zrtci-fg.us.auth0.com/oauth/token',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(UserAchievement),
      });
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      console.log('catch block in unclaim');
      return e;
    }
  }
}

export default UserAchievementDAO;
