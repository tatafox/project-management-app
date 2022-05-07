import { Component, Input } from '@angular/core';
import { ITask } from '../../../../shared/models/board.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() public task!: ITask;

  constructor() {}
}
