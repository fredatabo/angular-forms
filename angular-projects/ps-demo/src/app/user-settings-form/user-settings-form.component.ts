import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { NgForm } from '@angular/forms';
import { observable, Observable } from 'rxjs';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
  
 
})
export class UserSettingsFormComponent implements OnInit {
  postError = false;
  postErrorMessage = '';
  startDate: Date;
  userRating = 0;
  maxRating = 10;
  // using an array
  //subscriptionTypes = ['one','two', 'three'];
  // getting it from a service
  subscriptionTypes: Observable<string[]>;
  originalUserSettings : UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null

  };
  //copying form data (you can also use cloan to copy a complete object)
  userSettings: UserSettings = {...this.originalUserSettings};

  
  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
  }

  onHttpError(errorResponse: any){
    console.log('error: ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage; 
  }
  onSubmit(form: NgForm){
    console.log('in onSubmit',form.valid);
    if(form.valid) {
    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      result => console.log('success:',result),
      error => console.log('error:', error)
    );
  }
  else {
    this.postError = true;
    this.postErrorMessage = "Please fix the above errors";
  }
  }
}
