import { Injectable, Scope } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _user: User;

  // User
  set user(user: User) {
    this._user = user;
  }
  get user() {
    return this._user;
  }
}
