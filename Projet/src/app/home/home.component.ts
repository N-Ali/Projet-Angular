import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private news: any;
  constructor(private server: ServerService, private router: Router) { }

  ngOnInit() {
    this.server.request('GET', '/newshome', {}).subscribe(data =>{
      this.news = data;
      console.log(this.news);
    });
  }

  onSelect(dep){
    console.log(dep.id);
    this.router.navigate(['/news', dep.id]);
  }

}
