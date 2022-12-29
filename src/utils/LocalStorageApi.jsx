class LocalStorageApi {
  static getLocalStorageTokens() {
    return JSON.parse(localStorage.getItem("authTokens"));
  }

  static setLocalStorageTokens(tokens) {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  }

  static delLocalStorageTokens() {
    localStorage.removeItem("authTokens");
  }

  static getLocalStorageRoom(room) {
    return JSON.parse(localStorage.getItem("room"));
  }

  static setLocalStorageRoom(room) {
    localStorage.setItem("room", JSON.stringify(room));
  }

  static delLocalStorageRoom() {
    localStorage.removeItem("room");
  }
}

export default LocalStorageApi;
