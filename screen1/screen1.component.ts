import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})

export class Screen1Component implements OnInit {
  recForm: FormGroup;
  data;
  view=true;
  constructor(public fb: FormBuilder , public http : HttpClient ) { }

  ngOnInit() {
    this.recForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(4)] ],
      dob: ['', [Validators.required] ],
      email: ['', [Validators.required,Validators.email]],
      contact: ['',[Validators.required,Validators.pattern("^[7-9][0-9]{9}$")]],
      gender: [null, Validators.required],
     
   });

   this.getdata();
  }

  getdata(){
    this.http.get('http://localhost:6800/registration')
        .subscribe((res: Response) => {
          console.log(res);
          this.data= res;
        }, error => {
          console.log(error);
        });
  }

  addlist(){
    var update={
      Name:this.recForm.value.name,
      DOb:this.recForm.value.dob,
      Email:this.recForm.value.email,
      Contact:this.recForm.value.contact,
      Gender:this.recForm.value.gender
    }
    this.http.post('http://localhost:6800/registration',update)
    .subscribe((res: Response) => {
      this.getdata();
      console.log(res);
      this.data= res;
    }, error => {
      console.log(error);
    });
  }

}
