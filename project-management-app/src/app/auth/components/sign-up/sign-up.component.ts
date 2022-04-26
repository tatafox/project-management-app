import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserSignUp } from 'src/app/shared/user-models';
import { UserAuthServiceService } from '../../services/auth-service/user-auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserAuthServiceService],
})
export class SignUpComponent implements OnInit {
  public titles = {
    describe: "You have to sign up, if you haven't got an account",
    headTitle: 'Sign Up',
    name: 'Name',
    login: 'Login',
    password: 'Password',
    submit: 'Sign up',
  };
  /*---------------------*/

  public user: IUserSignUp = {
    name: '',
    login: '',
    password: '',
  };

  public hide: boolean = false;

  receivedUser: IUserSignUp | undefined; // полученный пользователь
  /*-------------------------*/

  private isSignup: boolean = true;

  public formSignUp: FormGroup;

  constructor(private authService: UserAuthServiceService) {}

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitNewUser() {
    this.isSignup = true;
    console.log(this.formSignUp.value, this.isSignup);
  }

  submit(user: IUserSignUp) {
    this.authService.postDataUser(user).subscribe(
      (data: any) => {
        this.receivedUser = data;
        this.isSignup = true;
      },
      (error) => console.log(error),
    );
  }
}
