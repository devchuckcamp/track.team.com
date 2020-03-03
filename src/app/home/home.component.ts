import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated:boolean;
  valid_client:boolean;
  invalid_client:boolean;
  error_msg:string;
  client:any;
  subscription: Subscription;
  // Form
  clientForm:FormGroup;
  constructor(
    private clientService:ClientService,
    private formBuilder:FormBuilder,
    private router: Router,
  ) {
    this.authenticated = false;
    this.valid_client = localStorage.getItem('client') ? true : false;
    this.invalid_client = false;
  }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      client: ['', Validators.required],
  });
    if(localStorage.getItem('currentUser')){
      this.authenticated = true;
    }
    if(localStorage.getItem('client')){
      this.getClient(localStorage.getItem('client'));
    }

  }

  validate_client(){
    let client_name = this.clientForm.value.client;
    this.getClient(client_name, true);
    return false;
  }

  getClient(client_name:any, redirect:boolean = false){
    this.clientService.validate(client_name).subscribe( (res:any) => {
      if(res.id){
        this.valid_client = true;
        this.clientService.setClient(res);
        this.subscription = this.clientService.currentClient.subscribe(client => { this.client = client;  });
        if (!localStorage.getItem('client')) {
            localStorage.setItem('client',this.client.slug);
        }
        if(redirect){
          this.router.navigate(['login']);
        }
      } else {
        this.invalid_client = true;
        this.error_msg = res.error;
      }
    }, error=>{
      console.log('error:'+error);
      this.invalid_client = true;
      this.error_msg = error;
    });

  }
}
