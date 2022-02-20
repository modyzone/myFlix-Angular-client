import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  /**
   *
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; bio: string; birth: string; death: string }
  ) {}

  ngOnInit(): void {}
}