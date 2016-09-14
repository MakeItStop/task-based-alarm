import { Directive, Input, ElementRef } from "@angular/core";
import { GridLayout, ItemSpec } from "ui/layouts/grid-layout";
@Directive({
  selector: "[auto-grid-columns]",
})
export class AutoGridColumns {
    public constructor(private gridRef : ElementRef){}

    @Input("auto-grid-columns")
    public set setDefinition(value: number){
      this.ResetGridColumns(value);
    }

    public ResetGridColumns(value: number){
      let grid : GridLayout = this.gridRef.nativeElement;

      grid.removeColumns();

      for(let i =0; i<value; i++){
        console.log("add column defintion");
        grid.addColumn(new ItemSpec(1, "star"));
      }

      let columns = grid.getColumns();
      console.log("grid-column counts: " + columns.length);
    }
}

@Directive({
  selector: "[auto-grid-rows]",
})
export class AutoGridRows {
    public constructor(private gridRef : ElementRef){}

    @Input("auto-grid-rows")
    public set setDefinition(value: number){
      this.ResetGridRows(value);
    };

    public ResetGridRows(value: number){
      let grid : GridLayout = this.gridRef.nativeElement;

      grid.removeRows();

      for(let i =0; i<value; i++){
        console.log("add row defintion");
        grid.addRow(new ItemSpec(1, "star"));
      }

      let rows = grid.getRows();
      console.log("grid-row count: " + rows.length);
    }
}

export interface AutoGridPropertySettings
{
  columns: number;
  rows: number;
}
