import { ChangeDetectionStrategy, Component, HostListener, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    message: string,
    title: string,
  }, private mdDialogRef: MatDialogRef<ConfirmModalComponent>) { }

  public cancel() {
    this.close(false);
  }
  //modalı kapatır
  public close(value) {
    this.mdDialogRef.close(value);
  }
  //modalı kapatır ve başarılı döner
  public confirm() {
    this.close(true);
  }
  //Esc tuşuna basınca modalı kapatır
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
