import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { Columns } from './column';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

   gridApi:any;
   gridColumnApi:any;

  @Input() height = '300px';
  @Input() autoSizeCol = true;
  @Input() sizeColumnsToFit = true;
  @Input() gridButtons:any = [];
  @Input() columns:Columns[] = [];
  @Input() rowData:any = [];
  @Output() GridBtnClickEvent = new EventEmitter<boolean>();
  

  @Input() defaultColDef = {
    resizable: true
  };

  columnDefs:Columns[] = [];
  frameworkComponents:any;

  constructor() {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    };
  }

  ngOnInit(): void {

    this.columns.forEach(col => {
      const colObj:Columns = {
        field:col.field,
        title:col.title
      };      
      if(col.type==='action'){
        colObj.cellRenderer = "btnCellRenderer";        
        colObj.cellRendererParams =  {
          btnText:col.buttonDetails?.btnText,
          btnClass:col.buttonDetails?.btnClass,
          clicked: function(field: any) {
            alert(`${field} was clicked`);
          }
        }
      }
      this.columnDefs.push(colObj)
    });
    
  }

  onGridReady(params:GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;    
    this.autoSizeAll(this.autoSizeCol)
    if(this.sizeColumnsToFit)
    this.gridApi.sizeColumnsToFit();
    
  }

  autoSizeAll(skipHeader: any) {
    const allColumnIds:any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: any) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }


  onGridBtnClick(event:any){
    this.GridBtnClickEvent.emit(event)
  }

}