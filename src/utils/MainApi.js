import { url } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
  }

  async signUp({ name, email, password }) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    return this._getResposeData(res);
  }

  async signIn({ email, password }) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      headers: this.headers,
      credentials: 'include',
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return this._getResposeData(res);
  }

  async signOut() {
    const res = await fetch(`${this.baseUrl}/signout`, {
      headers: this.headers,
      method: "GET",
      credentials: 'include',
    });
    return this._getResposeData(res);
  }

  async getCurrentUserInfo() {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "GET",
      credentials: 'include',
    });
    return this._getResposeData(res);
  }

  async patchCurrentUserInfo({ name, email }) {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    });
    return this._getResposeData(res);
  }

  async getMovies() {
    const res = await fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      method: "GET",
      credentials: 'include',
    });
    return this._getResposeData(res);
  }

  async postMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    const res = await fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
    return this._getResposeData(res);
  }

    async deleteMovie(movieId) {
    const res = await fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: this.headers,
      method: "DELETE",
      credentials: 'include',
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
  baseUrl: url,
  headers: {
    "Content-Type": "application/json",
  },
});
