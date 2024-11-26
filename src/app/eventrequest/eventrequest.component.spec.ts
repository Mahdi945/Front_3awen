import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventrequestComponent } from './eventrequest.component';

describe('EventrequestComponent', () => {
  let component: EventrequestComponent;
  let fixture: ComponentFixture<EventrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
