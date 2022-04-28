import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserSignIn, IUserSignUp } from 'src/app/shared/user-models';
import { UserAuthServiceService } from '../../services/auth-service/user-auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserAuthServiceService],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public titles = {
    describe: "You have to sign up, if you haven't got an account",
    headTitle: 'Sign Up',
    name: 'Name',
    login: 'Login',
    password: 'Password',
    repeat: 'Repeat the password',
    submit: 'Sign up',
  };

  subscribe: Subscription;

  public hidePassword: boolean = false;

  public isSignup: boolean = true;

  public formSignUp: FormGroup;

  private users: IUserSignUp[];

  constructor(
    private authService: UserAuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['signup']) {
        /* ok */
      } else if (params['errorSignup']) {
        // error signup
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  submitNewUser() {
    console.log(this.formSignUp, this.formSignUp.value);
    this.formSignUp.disable();
    this.isSignup = true;
    this.authService.fetchRegistration(this.formSignUp.value);
    this.authService.user$.subscribe((user) => {
      //тут мы получили юзера, с токеном и т.д.
      //возможно надо добавить проверку что токен есть
      console.log(user);
      this.router.navigate(['/main']);
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
      console.log(this.users);
    });
  }
}
