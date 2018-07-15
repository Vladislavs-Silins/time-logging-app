import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

// Interface for record storage
export interface TimeLogRecord {
  timeSpent: number;
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

  // Record inputs
  description = '';
  timeSpent = 0;

  // TimeLog controlling structures
  timeLogMap: Map<string, TimeLogRecord[]>;
  days: string[];

  constructor(private db: AngularFirestore) {
    // Initialization of data storage
    this.timeLogCollection = db.collection<TimeLogRecord>('time-log');
    this.log = this.timeLogCollection.valueChanges();
    this.timeLogMap = new Map();
    this.today = (new Date()).toDateString();
    this.days = [];

    // Initialization of new records observer
    const myObserver = {
      next: x => {
        // Reinitialize time records map
        this.timeLogMap = new Map();
        // Fill time records map
        x.forEach((record) => {
          const recordDate = (new Date(record.date.seconds * 1000)).toDateString();
          const recordArrayByDate = this.timeLogMap.get(recordDate) || [];
          // Only new records allowed
          // if (!recordArrayByDate.findIndex((searchValue) => {
          //   const result = searchValue.description === record.description &&
          //     searchValue.date === record.date &&
          //     searchValue.timeSpent === record.timeSpent;
          //   return result;
          // })) {
          //   recordArrayByDate.push(record);
          // }
          recordArrayByDate.push(record);
          recordArrayByDate.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else {
              return -1;
            }
          });
          this.timeLogMap.set(recordDate, recordArrayByDate);

          // Fill array with day-keys
          this.days = Array.from(this.timeLogMap.keys());
          this.days.sort((a, b) => {
            // Today's data is bigest
            if (a === (new Date()).toDateString()) {
              return -1;
            }
            if (a > b) {
              return -1;
            } else {
              return 1;
            }
          });
        });
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.log.subscribe(myObserver);
  }

  ngOnInit() {

  }

  //  New record add
  addItem(item: TimeLogRecord) {
    this.timeLogCollection.add(item);
  }

  // New record send to server usingAngularFirestore API
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
