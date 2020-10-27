export const getGame = async (gameName) => {
  const url = 'http://localhost:5000/game';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        game: gameName,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(
      'Fetch failed. Try again with some different code, or a bigger sword.',
      e,
    );
  }
};

export const getList = async (gameName) => {
  const url =
    'https://43jwmj8nuf.execute-api.us-east-1.amazonaws.com/dev/search';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        game: gameName,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(
      'Fetch failed on GetList. Try again with some different code, or a bigger sword.',
      e,
    );
  }
};

export const getUserAchievements = async (user, gameid, token) => {
  const UserAchievementsURL = `http://localhost:5000/user/achievelist`;
  //need to test to make sure all the data is there.
  const packet = { GameID: gameid, User: user };

  try {
    const response = await fetch(UserAchievementsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(packet),
    });

    const responseData = await response.json();
    return responseData;
  } catch (e) {
    return e;
  }
};

export const unclaimAchievement = async (game, achievement, user, token) => {
  const url = `http://localhost:5000/user/unachievement`;
  const packet = { Game: game, Achievement: achievement, User: user };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(packet),
    });
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.log('catch block');
    return e;
  }
};

export const submitAchievement = async (game, achievement, user, token) => {
  const url = `http://localhost:5000/user/achievement`;
  const packet = { Game: game, Achievement: achievement, User: user };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(packet),
    });
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.log('catch block');
    return e;
  }
};

export const API_URL = 'http://localhost:5000';
