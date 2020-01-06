import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  name: string;
  email: string;
  
  constructor(private server: ServerService, private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.server.request('GET', '/profile').subscribe((user: any) => {
      if (user) {
        this.name = user.name;
        this.email = user.email;
      }
    });
  }
}
