import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { UserService } from "../user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
   data1:any;
   name:any;
  erroMsg: any;
  constructor(private formBuilder:FormBuilder,private router:Router,private user:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }
//   {
//     this.loginForm = this.formBuilder.group({
//       userid: ['', Validators.required],
//         lastName: ['', Validators.required],
//         password: ['', [Validators.required, Validators.minLength(6)]],
//         cpsd: ['', Validators.required]
//     }, {
//         validator: MustMatch('password', 'confirmPassword')
//     });
//       }
  onSubmit() {
   this.user.getUsers().subscribe( (success:any) =>{
    success.forEach(data1 => {
      if(data1.name == this.loginForm.value.userid && data1.password == this.loginForm.value.password && data1.confirmpassword == this.loginForm.value.confirmpassword) {
        this.router.navigate(['list-user']);
        localStorage.setItem('data1',this.loginForm.value.userid)
    }else {
      this.invalidLogin = true;
    }
    });
    // error=>{
    //   this.erroMsg=error;
    // };
     
   },(error)=>{
     this.erroMsg=error.message;
     ;
   });

  }

}
