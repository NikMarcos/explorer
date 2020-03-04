import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceComponent } from './balance/balance.component';
import { MainComponent } from './main/main.component';
import { AccountDataService } from './services/account_service/account-data.service';
import { AssetPipePipe } from './asset-pipe.pipe';
import { TransactionsPipe } from './transactions.pipe';
// import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    MainComponent,
    AssetPipePipe,
    TransactionsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AccountDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
