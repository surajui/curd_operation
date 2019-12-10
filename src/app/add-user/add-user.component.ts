import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addForm:FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  
  constructor(private userService:UserService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.addForm= new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
     password:new FormControl('',[Validators.required,Validators.maxLength(10)]),
     gender: new FormControl('',Validators.required)
    })
  }
  onSubmit(){
    swal.fire({
      type: 'success',
      title: 'Added Successfully',
      showConfirmButton: false,
      timer: 2000
    })
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }
}
