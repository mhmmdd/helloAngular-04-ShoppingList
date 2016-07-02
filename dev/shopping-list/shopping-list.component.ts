import {Component, OnInit} from 'angular2/core';
import {ShoppingListNewItemComponent} from "./shopping-new-item.component";
import {ListItem} from "../list-item";
import {ShoppingListItemComponent} from "./shopping-list-item.component";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'shopping-list',
  template: `
    <section>
      <shopping-list-new-item></shopping-list-new-item>
    </section>
    <section>
      <h3>My List</h3>
      <div class="list">
        <ul>
          <li *ngFor="#listItem of listItems" (click)="onSelect(listItem)">
            {{listItem.name}} {{listItem.amount}}
          </li>
        </ul>
      </div>
    </section>
    <section *ngIf="selectedItem != null">
      <shopping-list-item [item]="selectedItem" (removed)="onRemove($event)"></shopping-list-item>
    </section>
  `,
  inputs: ['itemAdded'],
  directives: [ShoppingListNewItemComponent, ShoppingListItemComponent],
  providers: [ShoppingListService]
})

export class ShoppingListComponent implements OnInit{
  listItems: Array<ListItem>;
  selectedItem : ListItem;

  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit():any {
    this.listItems = this._shoppingListService.getItems();
  }
  
  onSelect(item: ListItem) {
    this.selectedItem = item;
  }

  onRemove() {
    this.selectedItem = null;
  }
}
