import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raffles-details',
  templateUrl: './raffles-details.component.html',
  styleUrls: ['./raffles-details.component.scss']
})
export class RafflesDetailsComponent implements OnInit {
  private raffle: any;
  constructor(private server: ServerService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("L'id est == "+ id);
    this.server.request('POST', '/specificraffle', {id: id}
      ).subscribe(data =>{
      this.raffle = data;
      console.log(this.raffle);
    });
  }

}
