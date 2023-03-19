import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any=[];
  loginusername:string='';
  todayDate : Date = new Date();
  constructor(@Inject(DOCUMENT) private document: Document,
              private authService:AuthService,
              private storageService:StorageService,
              private router:Router) { 
               
              }

  ngOnInit(): void {

  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/login']);
     
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
