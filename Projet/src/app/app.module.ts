import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { RafflesDetailsComponent } from './raffles-details/raffles-details.component';
import { RafflesComponent } from './raffles/raffles.component';




const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: {title: 'SneakerLand: Home'}},
  { path: 'search', component: SearchComponent, data: {title: 'SneakerLand: Search'}},
  { path: 'account', component: AccountComponent, data: {title: 'SneakerLand: Account'}},
  { path: 'signup', component: SignupComponent, data: {title: 'SneakerLand: Sign Up'}},
  { path: 'login', component: LoginComponent, data: {title: 'SneakerLand: Login'}},
  { path: 'news', component: NewsComponent, data: {title: 'SneakerLand: News'}},
  { path: 'news/:id', component: NewsDetailsComponent, data: {title: 'SneakerLand: News'}},
  { path: 'raffles', component: RafflesComponent, data: {title: 'SneakerLand: Raffles'}},
  { path: 'raffles/:id', component: RafflesDetailsComponent, data: {title: 'SneakerLand: Raffles'}}
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    SearchComponent,
    AccountComponent,
    SignupComponent,
    LoginComponent,
    NewsComponent,
    NewsDetailsComponent,
    RafflesDetailsComponent,
    RafflesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
