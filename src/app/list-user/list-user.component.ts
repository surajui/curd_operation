import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user";
import swal from 'sweetalert2';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  config: any;
  collection = {count: 60, data:[]};
  User1:any;
   users: User[];
  constructor(private router:Router,private userService:UserService,private user:User) {
    this.User1= localStorage.getItem('data1')
   }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
      for (var i = 0; i < this.collection.count; i++) {
        this.collection.data.push(
          {
            id: i + 1,
            value: "users number " + (i + 1)
          }
        );
      }
   
      this.config = {
        itemsPerPage: 4,
        currentPage: 1,
        totalItems: this.users
      
      };
     
  }
      pageChanged(event){
        this.config.currentPage = event;
      }
      
  

  deleteUser(user: User): void {
    swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'     
    })
    .then((willDelete) => {
        if(willDelete.value){
             swal.fire("Success");
             this.userService.deleteUser(user.id)
        .subscribe( data => {
        this.users = this.users.filter(u => u !== user);  
      })
        }else{
          swal.fire("Fail");
        }

      console.log(willDelete)
    });
  };
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}


