import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss']
})
export class RafflesComponent implements OnInit {
  private raffles: any;
  constructor(private server: ServerService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.server.request('GET', '/raffles', {}).subscribe(data =>{
      this.raffles = data;
      console.log(this.raffles);
    });
  }

  onSelect(dep){
    console.log(dep.id);
    this.router.navigate(['/raffles', dep.id]);
  }

}
