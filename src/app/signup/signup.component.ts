import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  formData;
  submitted = false; dateError = false; success = false; now; selectDate;
  router: string;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  constructor(private formBuilder: FormBuilder, private http: Http, private _router: Router) { 
  this.router = _router.url; 
}
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
    this.getData();
  }
  get f() {
    return this.signupForm.controls;
  }
  getData(){
    this.apiData().subscribe(
      res => {
        this.formData = res;
        });
  }
apiData(){
  const apiurl = 'http://localhost:5555/posts';
  return this.http.get(apiurl).map( (response: Response) => {
     const data = response.json();
     return data;
  });
}

deleteData(val){
  const url = `${'http://localhost:5555/posts'}/${val}`;
  console.log(url);
  return this.http.delete(url, {headers: this.headers}).toPromise()
  .then(() => {
  this.getData();
  });
}

editData(id){
  this.success = false;
let ediytObj = this.formData[id];
this.formData = ediytObj;

}
  onSubmit(signupFormData , f) {
    this.submitted = true;
    let obj = {
      "firstName":f.fname.value,
      "Lastname": f.lname.value,
      "email" : f.email.value,
      "phoneNumber": f.number.value,
      "status": f.status.value,
      "id":''
    }; 
    if(signupFormData.status =='VALID'){

      this.success = true;
      const apiurl = 'http://localhost:5555/posts';
      this.http.post(apiurl , obj).subscribe(
        (res: Response) => {
          this.getData();        
        }
      );
    }


  
  }
}
