import { filmUrl } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
  }

  async getMovies() {
    const res = await fetch(`${this.baseUrl}/beatfilm-movies`, {
      headers: this.headers,
      method: "GET",
    });
    return this._getResposeData(res);
  }

  async _getResposeData(res) {
    const resData = await res.json()
    if (res.ok) {
      return resData;
    }
    throw new Error(resData.message);
  }
}

export const mainApi = new MainApi({
  baseUrl: filmUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
