import { Injectable, Scope } from '@nestjs/common';
import { user } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _user: user;

  // User
  set user(user: user) {
    this._user = user;
  }
  get user() {
    return this._user;
  }
}
