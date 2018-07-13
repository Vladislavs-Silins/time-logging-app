import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RecordsListComponent } from "./records-list.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("RecordsListComponent", () => {

  let fixture: ComponentFixture<RecordsListComponent>;
  let component: RecordsListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [RecordsListComponent]
    });

    fixture = TestBed.createComponent(RecordsListComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
