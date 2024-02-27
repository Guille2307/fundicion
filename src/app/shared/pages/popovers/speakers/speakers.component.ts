import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SpeakersService } from 'src/app/shared/services/api/speakers/speakers.service';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
})
export class SpeakersComponent implements OnInit {

  @Input() selectedSpeakerId?;

  @Output() onClick = new EventEmitter<any>();
  
  speakers ? = [];

  constructor(
    private eventSvc: EventService,
    private speakersSvc: SpeakersService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.getSpeakers();
  }

  select(speaker) {
    this.selectedSpeakerId = speaker.id;
    this.popoverCtrl.dismiss({
      speaker
    });
  }

  ionChange(ev) {
    this.onClick.emit(this.selectedSpeakerId);
  }

  async getSpeakers() {
    this.speakers = [];
    const schedule = await this.eventSvc.showInfoEvent()
      .then((result) => result.schedule);

    if (schedule) {
      const speakers = this.speakersSvc.getAllSpeakers(schedule);
      speakers.forEach(speaker => {
        this.speakers.push(speaker);
      });
    }
  }
}
