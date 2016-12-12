import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { Event } from '../../providers/event'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Event]
})
export class HomePage {
  events = null;
  keyword = "Angular,東京";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private event: Event) {
  }

  ngOnInit() {
    this.fetch(null);
  }

  fetch(ev: any) {
    if (ev != null) {
      let regExp = /[ 　]/g
      this.keyword = ev.target.value.replace(regExp, ",");
    }

    let loader = this.loadingCtrl.create({
      content: "検索中",
    });
    loader.present();

    this.event.getEvents(this.keyword).then(data => {
      this.events = data;
      loader.dismiss();
    });
  }

  eventSelected (event) {
    let browser = new InAppBrowser(event.event_url, '_blank');
    if (browser) {
      browser.show();
    }
  }

}
