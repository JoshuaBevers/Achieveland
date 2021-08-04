interface DAO<T> {
  // read(board_game_id: string, achievement_id: string, username: string);

  create(T: T & any, token: any): any;

  delete(T: T): any;
}

export default DAO;
