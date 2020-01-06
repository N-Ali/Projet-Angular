import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private results: any;
  form: FormGroup;
  constructor(private server: ServerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', Validators.required]},);
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    console.log("%"+this.form.get('search').value+"%")
    this.server.request('POST', '/search', {news: "%"+this.form.get('search').value+"%", raffles: "%"+this.form.get('search').value+"%"})
    .subscribe(data =>{
      this.results = data;
      console.log(data);
    });
  }

  onSelect(dep){
    console.log(dep.id);
    if((dep.image).includes("raffles")){
      this.router.navigate(['/raffles', dep.id]);
    }
    else{
      this.router.navigate(['/news', dep.id]);
    }
  }

}
