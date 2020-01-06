import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  private new: any;
  constructor(private server: ServerService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("L'id est == "+ id);
    this.server.request('POST', '/specificnews', {id: id}
      ).subscribe(data =>{
      this.new = data;
      console.log(this.new);
    });
  }

}
