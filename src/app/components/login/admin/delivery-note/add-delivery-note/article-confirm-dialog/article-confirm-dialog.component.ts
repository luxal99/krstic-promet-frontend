import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ARTICLE_BEFORE_PURCHASE_TABLE } from "../../../../../../constant/table-config/table-config";
import { DeliveryNotePaidStatusEnum } from "../../../../../../enum/DeliveryNotePaidStatusEnum";
import { DeliveryNoteStatusEnum } from "../../../../../../enum/DeliveryNoteStatusEnum";
import { MatInput } from "@angular/material/input";
import { ArticleConfirmDialogData } from "../../../../../../models/dto/ArticleConfirmDialogData";
import { openDialog } from "../../../../../../util/modal/OpeningModal";
import { ToastNotificationComponent } from "../../../../../../util/toast-notification/toast-notification/toast-notification.component";
import { openToastNotification } from "../../../../../../util/toast-notification/openToastNotification";

@Component({
  selector: "app-article-confirm-dialog",
  templateUrl: "./article-confirm-dialog.component.html",
  styleUrls: ["./article-confirm-dialog.component.sass"],
})
export class ArticleConfirmDialogComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild("payedAmountColumn") payedAmountColumn!: TemplateRef<any>;
  @ViewChild("deliveredAmountColumn") deliveredAmountColumn!: TemplateRef<any>;

  @ViewChild("payedAmountInput") payedAmountInput!: MatInput;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ArticleConfirmDialogData,
    private cdRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ArticleConfirmDialogComponent>,
    private dialog: MatDialog
  ) {}

  articleTableConfig = ARTICLE_BEFORE_PURCHASE_TABLE;

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    this.articleTableConfig = [
      ...this.articleTableConfig,
      {
        name: "payedAmountColumn",
        columnType: "CUSTOM",
        value: "",
        templateRef: this.payedAmountColumn,
        displayedName: "Plaćena količina",
      },
      {
        name: "deliveredAmountColumn",
        columnType: "CUSTOM",
        value: "",
        templateRef: this.deliveredAmountColumn,
        displayedName: "Dostavljena količina",
      },
    ];
    if (this.data.paidStatus === "PAID") {
      this.data.listOfArticles.forEach((item) => {
        item.payedAmount = item.amount;
        item.paidStatus = DeliveryNotePaidStatusEnum.PAID;
      });
    }

    if (this.data.deliveredStatus === "DELIVERED") {
      this.data.listOfArticles.forEach((item) => {
        item.deliveredAmount = item.amount;
        item.deliveryStatus = DeliveryNoteStatusEnum.DELIVERED;
      });
    }
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  addArticlePayedAmount(idArticle: number, payedAmount: any) {
    payedAmount = Number.parseInt(payedAmount);
    this.data.listOfArticles.forEach((item) => {
      // @ts-ignore
      if (item.id === idArticle) {
        item.payedAmount = payedAmount;
        if (item.payedAmount === item.amount) {
          item.paidStatus = DeliveryNotePaidStatusEnum.PAID;
        } else {
          item.paidStatus = DeliveryNotePaidStatusEnum.NOT_PAID;
        }
      }
    });
    openToastNotification(
      {
        notificationType: "SUCCESS",
        message: "Uspešno dodavanje plaćene količine",
      },
      this.dialog
    );
  }

  addArticleDeliveredAmount(idArticle: number, deliveredAmount: any) {
    deliveredAmount = Number.parseInt(deliveredAmount);
    this.data.listOfArticles.forEach((item) => {
      // @ts-ignore
      if (item.id === idArticle) {
        item.deliveredAmount = deliveredAmount;
        if (item.deliveredAmount === item.amount) {
          item.deliveryStatus = DeliveryNoteStatusEnum.DELIVERED;
        } else {
          item.deliveryStatus = DeliveryNoteStatusEnum.NOT_DELIVERED;
        }
      }
    });
    openToastNotification(
      {
        notificationType: "SUCCESS",
        message: "Uspešno dodavanje dostavljene količine",
      },
      this.dialog
    );
  }

  payAll(checked: boolean) {
    if (!checked) {
      this.data.listOfArticles.forEach((item) => {
        item.payedAmount = item.amount;
        item.paidStatus = DeliveryNotePaidStatusEnum.PAID;
      });
      this.payedAmountInput.disabled = true;
    } else {
      this.data.listOfArticles.forEach((item) => {
        item.payedAmount = 0;
      });
      this.payedAmountInput.disabled = false;
    }
  }

  deliverAll(checked: boolean) {
    if (!checked) {
      this.data.listOfArticles.forEach((item) => {
        item.deliveredAmount = item.amount;
        item.deliveryStatus = DeliveryNoteStatusEnum.DELIVERED;
      });
      this.payedAmountInput.disabled = true;
    } else {
      this.data.listOfArticles.forEach((item) => {
        item.deliveredAmount = 0;
        item.deliveryStatus = DeliveryNoteStatusEnum.NOT_DELIVERED;
      });
      this.payedAmountInput.disabled = false;
    }
  }

  decline() {
    this.dialogRef.close({ confirmed: false });
  }

  confirm() {
    this.dialogRef.close({
      confirmed: true,
      listOfArticles: this.data.listOfArticles,
    });
  }
}
