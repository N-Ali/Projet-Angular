import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    },);
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');

    return this.server.request('POST', '/verifymail', {
      email: this.form.get('email').value
    }).subscribe((response: any) => {
      if (response.status == false){
        console.log("Mail Already exist");
        this.message = "Cette adresse mail est déjà utilisé."
      }
      else{

        this.server.request('POST', '/verifyname', {
          name: this.form.get('name').value
        }).subscribe((response: any) => {
          if (response.status == false){
            console.log("Ce pseudo est déjà utilisé.");
            this.message = "Ce pseudo est déjà utilisé.";
          }
          else{
            const request = this.server.request('POST', '/register', {
              email: this.form.get('email').value,
              name: this.form.get('name').value,
              password: this.form.get('password').value
            });


            request.subscribe(() => {
              this.router.navigate(['/login']);
            });
          
          };
      
        });
      }
    });
  }
}