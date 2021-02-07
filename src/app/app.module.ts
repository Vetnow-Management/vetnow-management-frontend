import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from './shared/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, MaskApplierService, NgxMaskModule } from 'ngx-mask';

export const maskConfig: Partial<IConfig> | (() => Partial<IConfig>) | null = {
  validation: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    LayoutModule,
    ToastModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [MessageService, MaskApplierService],
  bootstrap: [AppComponent],
})
export class AppModule {}
