import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

interface TimeLogRecord {
  timeSpent: number;
  date: string;
  description: string;
}

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss']
})


export class RecordsListComponent implements OnInit {

  log: Observable<{}>;
  constructor(db: AngularFirestore) {
    this.log = db.collection('time-log').valueChanges();
  }

  ngOnInit() {

  }
}
