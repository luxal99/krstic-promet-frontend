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
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  ARTICLE_BEFORE_PURCHASE_TABLE,
  ARTICLE_TABLE,
} from "../../../../../../constant/table-config/table-config";
import { DeliveryNoteArticle } from "../../../../../../models/delivery-note-article";
import { DeliveryNotePaidStatusEnum } from "../../../../../../enum/DeliveryNotePaidStatusEnum";
import { DeliveryNoteStatusEnum } from "../../../../../../enum/DeliveryNoteStatusEnum";
import { MatInput } from "@angular/material/input";

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
    @Inject(MAT_DIALOG_DATA) public listOfArticles: DeliveryNoteArticle[],
    private cdRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ArticleConfirmDialogComponent>
  ) {}

  articleTableConfig = ARTICLE_BEFORE_PURCHASE_TABLE;

  ngOnInit(): void {}
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
  }
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
  addArticlePayedAmount(idArticle: number, payedAmount: any) {
    payedAmount = Number.parseInt(payedAmount);
    this.listOfArticles.forEach((item) => {
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
  }

  addArticleDeliveredAmount(idArticle: number, deliveredAmount: any) {
    deliveredAmount = Number.parseInt(deliveredAmount);
    this.listOfArticles.forEach((item) => {
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
  }

  payAll(checked: boolean) {
    if (!checked) {
      this.listOfArticles.forEach((item) => {
        item.payedAmount = item.amount;
        item.paidStatus = DeliveryNotePaidStatusEnum.PAID;
      });
      this.payedAmountInput.disabled = true;
    } else {
      this.listOfArticles.forEach((item) => {
        item.payedAmount = 0;
      });
      this.payedAmountInput.disabled = false;
    }
  }

  deliverAll(checked: boolean) {
    if (!checked) {
      this.listOfArticles.forEach((item) => {
        item.deliveredAmount = item.amount;
        item.deliveryStatus = DeliveryNoteStatusEnum.DELIVERED;
      });
      this.payedAmountInput.disabled = true;
    } else {
      this.listOfArticles.forEach((item) => {
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
      listOfArticles: this.listOfArticles,
    });
  }
}
