export class StatusControl {
  statusValue: number;

  constructor(value: number = 200) {
    this.statusValue = value;
  }

  setValue(value: number) {
    this.statusValue = value;
  }

  value = () => this.statusValue;
}
