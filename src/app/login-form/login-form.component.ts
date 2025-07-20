import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginForm implements OnInit{
  loginForm!:FormGroup

  // loginForm:FormGroup = new FormGroup({
  //   email : new FormControl('', [Validators.required,Validators.email]),
  //   password: new FormControl('', [Validators.required])

  // })

  constructor(private fb:FormBuilder, private router :Router){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    })

  }

onSubmit(event:any) {
  console.log(event)
  console.log(this.loginForm)
  if (this.loginForm.valid) {
    console.log("inside",this.loginForm);
    localStorage.setItem('credentials', JSON.stringify(this.loginForm.value))
    // localStorage.setItem('pass', this.loginForm.value.email)
    this.router.navigateByUrl('/home-page')
       
  }
}


}