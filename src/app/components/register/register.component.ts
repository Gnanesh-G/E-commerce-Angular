import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  
  error: string = '';
  constructor(private storageServices:StorageService,  private router: Router){}

  onSubmit(registerForm: NgForm) {
    console.log(registerForm);
    console.log(registerForm.value);

    let users = this.storageServices.getAllUsers();
    for (let u of users) {
      if (u.email === registerForm.value.email) {
        this.error = 'This mail is already Used';
      }else{
         this.storageServices.addUser(registerForm.value)
      }
    }
    
      this.router.navigate(['login'], { replaceUrl: true });
    
  }
}
