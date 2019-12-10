import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {User} from "../user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  editForm: FormGroup;
  constructor(private userService:UserService,private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender:[(Validators.required)]
    });
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    swal.fire({
      type: 'success',
      title: 'Update Successfully',
      showConfirmButton: false,
      timer: 2000
    })
    this.userService.updateUser(this.editForm.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
          this.editForm.reset();
        });
  }

}
