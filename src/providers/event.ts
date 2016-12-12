import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Event provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Event {
  events: any;
  keyword: string;

  constructor(public jsonp: Jsonp) {
    console.log('Hello Event Provider');
    this.events = null;
    this.keyword = "";
  }

  getEvents(key: string) {
    if (this.events && key == this.keyword) {
      return Promise.resolve(this.events);
    }

    this.keyword = key;

    var params = new URLSearchParams();
    params.append('keyword', this.keyword);
    params.append('count', '30');

    let request = new RequestOptions({
      search: params
    });

    return new Promise(
      resolve => {
        this.jsonp.get('https://connpass.com/api/v1/event/?callback=JSONP_CALLBACK', request)
        .map(res => res.json())
        .subscribe(data => {
          this.events = data.events;
          resolve(data.events);
        })
      }
    );
  }

}
