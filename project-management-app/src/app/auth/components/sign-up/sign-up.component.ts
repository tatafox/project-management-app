import { Component, OnInit } from '@angular/core';
import { IUserSignUp } from 'src/app/shared/interfaces';
import { UserAuthServiceService } from '../../services/user-auth-service.service';

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
  };

  public user: IUserSignUp = {
    name: 'Vasya',
    login: 'user001',
    password: 'userpass@123',
  };

  receivedUser: IUserSignUp | undefined; // полученный пользователь

  done: boolean = false;

  constructor(private authService: UserAuthServiceService) {}

  ngOnInit(): void {}

  submit(user: IUserSignUp) {
    this.authService.postDataUser(user).subscribe(
      (data: any) => {
        this.receivedUser = data;
        this.done = true;
      },
      (error) => console.log(error),
    );
  }
}
