import { apiError } from 'server/api/api-error';
import { IServerUser } from 'server/types/auth';
import { API_TOKEN } from 'shared/constants/app';
import { IAuthProps } from 'shared/types/auth';
import { v4 } from 'uuid';

// tslint:disable: no-string-throw

export class MockDatabase {
  sessions: Map<string, { expiry: number; token: string }>;
  users: Map<string, IServerUser>;

  get demoUser(): IServerUser {
    return {
      id: v4(),
      username: 'admin',
      password: 'admin'
    };
  }

  constructor() {
    this.sessions = new Map();
    this.users = new Map([[this.demoUser.id, this.demoUser]]);
  }

  createSession = (userId: string) => {
    const expiry = Math.floor(new Date().valueOf() / 1000) + 1800;
    const token = v4();

    this.sessions.set(userId, {
      expiry,
      token
    });

    return {
      expiry,
      token
    };
  };

  verifySession = async (userId: string, token: string) => {
    const session = await this.sessions.get(userId);

    return (
      !!session &&
      session.token === token &&
      session.expiry > Math.floor(new Date().valueOf() / 1000)
    );
  };

  getUser = async (auth?: IAuthProps) => {
    try {
      if (!auth) {
        throw '';
      }

      const foundUser = await Array.from(this.users.values()).find(
        user => user.username === auth.username.toLowerCase()
      );

      if (!foundUser || foundUser.password !== auth.password) {
        throw '';
      }
      const { expiry, token } = await this.createSession(foundUser.id);

      return {
        data: {
          [API_TOKEN]: token,
          expiry_time: expiry,
          id: foundUser.id,
          username: auth.username
        }
      };
    } catch (err) {
      throw apiError({ status: 404, reason: 'Unable to find user' });
    }
  };
}
