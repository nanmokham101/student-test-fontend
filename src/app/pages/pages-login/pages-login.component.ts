import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage:string="";
 

  constructor(private authService: AuthService,
     private storageService: StorageService,
     private router:Router
     ) { }
user:User=new User();
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  submit() {
    
    this.authService.login(this.user).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate(["/student-list"]);
      },
      error: err => {
        this.errorMessage = err.error.message;
        if(this.errorMessage===undefined){
          this.errorMessage="Please fill to login";
        }
        this.isLoginFailed = true;
      }
    });
  }
 

  reloadPage(): void {
    window.location.reload();
  }
}