import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  private news: any;
  constructor(private server: ServerService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.server.request('GET', '/news', {}).subscribe(data =>{
      this.news = data;
      console.log(this.news);
    });

  }

  onSelect(dep){
    console.log(dep.id);
    this.router.navigate(['/news', dep.id]);
  }

}
