import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface TimeLogRecord {
  timeSpent: number;
  // date: {
  //   seconds: number,
  //   milliseconds?: number
  // };
  date: Date;
  dateTransformed?: string;
  description: string;
}

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss'],
})


export class RecordsListComponent implements OnInit {

  private timeLogCollection: AngularFirestoreCollection<TimeLogRecord>;
  private today: string;
  private log: Observable<TimeLogRecord[]>;
  description = '';
  timeSpent = 0;
  timeLogMap: Map<string, TimeLogRecord[]>;
  days: string[];
  logSample: TimeLogRecord = {
    timeSpent: 1,
    date: new Date(),
    description: 'Do nothing'
  };


  constructor(private db: AngularFirestore) {

    this.timeLogCollection = db.collection<TimeLogRecord>('time-log');
    this.log = this.timeLogCollection.valueChanges();
    this.timeLogMap = new Map();
    this.today = (new Date()).toDateString();
    this.days = [];

    const myObserver = {
      next: x => {
        console.log(x);
        this.timeLogMap = new Map();
        x.forEach((record) => {
          const recordDate = (new Date(record.date.seconds * 1000)).toDateString();
          const recordArrayByDate = this.timeLogMap.get(recordDate) || [];
          if (!recordArrayByDate.findIndex((searchValue) => {
            const result = searchValue.description === record.description &&
              searchValue.date === record.date &&
              searchValue.timeSpent === record.timeSpent;
            console.log('Indexof - ' + result);
            return result;
          })) {
            recordArrayByDate.push(record);
          }
          recordArrayByDate.push(record);
          recordArrayByDate.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else {
              return -1;
            }
          });
          this.timeLogMap.set(recordDate, recordArrayByDate);
          this.days = Array.from(this.timeLogMap.keys());
          this.days.sort((a, b) => {
            if (a > b) {
              return -1;
            } else {
              return 1;
            }
          });
        });

        // this.timeLogMap.set('1', x);
        console.log(this.timeLogMap);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.log.subscribe(myObserver);
  }

  ngOnInit() {

  }

  addItem(item: TimeLogRecord) {
    this.timeLogCollection.add(item);
  }
  sendRecord() {
    this.addItem({
      date: new Date(),
      description: this.description,
      timeSpent: this.timeSpent
    });
    this.description = '';
    this.timeSpent = 0;
  }
}
