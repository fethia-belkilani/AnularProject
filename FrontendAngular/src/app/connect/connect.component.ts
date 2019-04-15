import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  form: FormGroup;
  incorrect : boolean;

  constructor(fb: FormBuilder, private _userService: UserService, private router: Router) {
    this.form = fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    }
    )
  }

  
  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }

  ngOnInit() {
    let token = localStorage.getItem('token');
    
    if (token) {
      this.router.navigate(['/home']);
    }
    
  }

  connexion() {
    let userDetail = this.form.value;
    let user = new User();
    user.email = userDetail.email;
    user.password = userDetail.pass;

    this._userService.connectUser(user).subscribe(
      res => {
        let token = res.token;
        localStorage.setItem('token', token);
        console.log(res);
        this.router.navigate(['/home']);
      },
      err => {
        this.incorrect=true;
        console.log(err);
      }
    )

  }

}
