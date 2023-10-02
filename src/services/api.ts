/* eslint-disable no-console */
import User from '../entities/user';

const token = window.localStorage.getItem('AUTH_KEY') || '';
const randomId = +Date.now().toString().slice(10);

export default class API {
  baseUrl = 'https://reqres.in/api';
  token = token;
  reauthTries = 0;
  //user = null;

  getConfig() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async getUser() {
    return { user: new User(this.token, randomId), token: this.token };
  }

  async register(email: string, password: string, username?: string) {
    const body = {
      //username,
      email,
      password,
    };

    try {
      const req = await fetch(this.baseUrl + '/register', {
        method: 'POST',
        headers: this.getConfig(),
        body: JSON.stringify(body),
      });
      const res = await req.json();
      console.log(res);

      if (req.status === 200) {
        //this.user = user;
        this.token = res.token;
        this.reauthTries = 0;
        window.localStorage.setItem('AUTH_KEY', res.token);
        return { user: new User(res.token, res?.id), error: null };
      }

      if (req.status === 400) {
        return { user: null, error: res.error };
      }
      //
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async login(email: string, password: string) {
    const body = {
      email,
      password,
    };

    try {
      const req = await fetch(this.baseUrl + '/login', {
        method: 'POST',
        headers: this.getConfig(),
        body: JSON.stringify(body),
      });
      const res = await req.json();
      console.log(res);

      if (req.status === 200) {
        //this.user = user;
        this.token = res.token;
        this.reauthTries = 0;
        window.localStorage.setItem('AUTH_KEY', res.token);
        return { user: new User(res.token, res?.id), error: null };
      }

      if (req.status === 400) {
        return { user: null, error: res.error };
      }
      //
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getUsers({ page, perPage }) {
    try {
      const req = await fetch(this.baseUrl + `/users?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        //headers: this.getConfig(),
      });

      const res = await req.json();
      //console.log(res);
      return res?.data || [];
      //
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async updateUser(id: number, body) {
    try {
      const req = await fetch(this.baseUrl + '/users/' + id, {
        method: 'PATCH',
        headers: this.getConfig(),
        body: JSON.stringify(body),
      });
      const res = await req.json();
      //console.log(res);

      if (req.status === 200) {
        this.reauthTries = 0;
        return { user: res, error: null };
      }

      if (req.status === 400) {
        return { user: null, error: res.error };
      }
      //
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async logout() {
    const url = new URL(this.baseUrl + '/logout');

    fetch(url, {
      method: 'POST',
      headers: this.getConfig(),
    });

    this.token = '';
    this.reauthTries = 0;
    window.localStorage.removeItem('AUTH_KEY');
  }
}
