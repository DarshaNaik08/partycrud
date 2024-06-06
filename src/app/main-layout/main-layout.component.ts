import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PartyService } from '../services/party.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  opened=true;
  constructor(private router : Router, private authService: AuthService, private toastr: ToastrService, private partyapi: PartyService) { }
  status: boolean = false;
  statusLink: boolean = false;
  ngOnInit(): void {
  }

  toggleSidebar() {
    this.opened = !this.opened;
    console.log('toggle');
  }
 
  // logout() {
  //   this.authService.logout().subscribe(
  //     response => {
      
  //       console.log('Logout successful', response);
  //       this.toastr.success('Successfully logged out');
     
  //     },
  //     error => {
  //       console.error('Logout failed', error);
        
  //     }
  //   );
  // }
  logout(){
    this.partyapi.logout().subscribe(response => {
      
            console.log('Logout successful', response);
            this.toastr.success('Successfully logged out');
         
          },
          error => {
            console.error('Logout failed', error);
            
          }
        );
  }
}
