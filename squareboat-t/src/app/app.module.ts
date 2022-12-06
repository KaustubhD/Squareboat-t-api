import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './services/register.service';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { HomeComponent } from './components/home/home.component';
import { TweetCreateComponent } from './components/tweet-create/tweet-create.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    TweetListComponent,
    HomeComponent,
    TweetCreateComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
		HttpClientModule,
  ],
  providers: [
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
