export const getGame = async (gameName) => {
  const url = API_URL + '/game/' + gameName + '/achievements';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const submitGameAndAchievement = async (packet) => {
  const url = API_URL + 'sub-game';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packet),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (e) {
    throw e;
  }
};

export const getAll = async () => {
  const url = API_URL + 'search';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const getByLetter = async (letter) => {
  const url = API_URL + 'search/letter/' + letter;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
  const url = API_URL + 'search/' + gameName;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
  const UserAchievementsURL = API_URL + `user/achievelist`;
  //need to test to make sure all the data is there.
  const packet = { GameID: gameid, User: user };
  try {
    const response = await fetch(UserAchievementsURL, {
      method: 'POST',
      url: 'https://dev-zrtci-fg.us.auth0.com/oauth/token',
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
    throw e;
  }
};

export const unclaimAchievement = async (packet, token) => {
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
      body: JSON.stringify(packet),
    });
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.log('catch block in unclaim');
    return e;
  }
};

export const claimUserAchievement = async (packet, token) => {
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
      body: JSON.stringify(packet),
    });
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    return e;
  }
};

export const API_URL =
  'https://43jwmj8nuf.execute-api.us-east-1.amazonaws.com/dev/';
