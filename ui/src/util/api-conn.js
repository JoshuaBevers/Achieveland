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
  const url = 'http://localhost:5000/search';
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

export const getUser = async (data) => {
  const url = 'http://localhost:5000/user/login';
  console.log('the getUser is sending the username and password are: ', data);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log('the recieved data from the backend is: ', responseData);
    return responseData;
  } catch (e) {
    console.log('failed to fetch user from :', url);
  }
};

export const submitUser = async (data) => {
  const url = 'http://localhost:5000/user/create';
  console.log(
    'the submitUser is sending the username and password are: ',
    data,
  );
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log('the recieved data from the backend is: ', responseData);
    return responseData;
  } catch (e) {
    console.log('failed to fetch user from :', url);
  }
};

export const submitAchievement = async (game, achievement, user) => {
  console.log('reporting from submitAchievement: ', achievement, user);
  console.log('achievement ', achievement);
  const url = `http://localhost:5000/user/achievement`;
  const packet = { Game: game, Achievement: achievement, User: user };
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
    console.log('the received data from the backend is: ', responseData);
    return responseData;
  } catch (e) {
    console.log('catch block');
    return e;
  }
};

//test

export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    //this is missing the consuming of the fetch!
    return response;
  } catch (e) {
    console.log(e);
    console.log('qua?');
    return e;
  }
};

export const API_URL = 'http://localhost:5000';
