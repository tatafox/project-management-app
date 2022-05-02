import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public titles = {
    describe: 'You can make changes to the profile here',
    headTitle: 'Edit profile ',
    name: 'Name',
    login: 'Login',
    password: 'Password',
    submit: 'submit',
  };

  public hide: boolean = false;

  public formEdit: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formEdit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  adminPage() {
    this.router.navigate(['/admin']);
  }

  editUser() {
    console.log(this.formEdit.value);
  }
}
