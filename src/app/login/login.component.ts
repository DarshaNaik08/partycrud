import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { 
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.toastr.success('Login Success');
          console.log('Login successful', response);
          console.log(response.token);
          this.authService.setToken(response.token); 
        
          this.router.navigateByUrl('main-layout/party');
        },
        error => {
          this.toastr.error('Invalid credentials');
          console.error('Login failed', error);
        }
      );
    }
  }

}
