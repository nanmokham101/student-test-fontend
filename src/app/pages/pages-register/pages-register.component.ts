import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage:string="Please fill to signup";

  constructor(private authService: AuthService,
    private router:Router) { }
  user : User = new User();
  ngOnInit(): void {
  }
  submit(){
    this.authService.register(this.user).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.router.navigate(['/login'])
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          if(this.errorMessage===undefined){
            this.errorMessage="Please fill to signup";
          }
          this.isSignUpFailed = true;
        }    
    });
  }
  
  
}