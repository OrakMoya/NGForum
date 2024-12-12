import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { User } from './types';


interface AuthState {
  user: User | null | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private user$ = new Subject<User>();
  private state = signal<AuthState>({
    user: undefined
  });

  user = computed(() => this.state().user);

  constructor() {
    this.user$
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((user) => {
        this.state.update((state) => ({ ...state, user }));
      });
    this.checkAuthState();
  }

  private checkAuthState() {
    this.httpClient.get<User>("/api/user")
      .subscribe(res => this.user$.next(res));
  }

  public register(params: { display_name: string, username: string, email: string, password: string, password_confirmation: string }) {
    let waitingData = new ReplaySubject();

    let promise = this.httpClient.post("/api/register", {
      display_name: params.display_name,
      username: params.username,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation
    });
    //
    // Refresh auth state after register
    promise.subscribe((status) => {
      waitingData.next(status);
      waitingData.complete();
      this.checkAuthState();
    })

    return waitingData;
  }

  public login(email: string, password: string) {
    let waitingData = new ReplaySubject();

    let promise = this.httpClient.post("/api/login", {
      email: email,
      password: password
    });

    // Refresh auth state after login
    promise.subscribe((status) => {
      waitingData.next(status);
      waitingData.complete();
      this.checkAuthState();
    })

    return waitingData;
  }

}
