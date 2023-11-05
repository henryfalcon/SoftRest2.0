import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
//table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
//material
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
//model
import { TableColumn } from './table-column';
//pipe
import { ColumnValuePipe } from './column-value.pipe';

@Component({
  selector: 'app-table',
  standalone: true,    
  imports: [  
    CommonModule,
    ColumnValuePipe,
    MatTableModule, 
    MatButtonModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatRippleModule ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource([]);   
  displayedColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  noDataToShow: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { 
  }  

  ngAfterViewInit(): void {
    if (this.dataSource === undefined) return
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  @Input() set data(data: any) {
    if (data != undefined && data.length > 0) {
      this.dataSource.data = data
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort }
    else {
      this.noDataToShow = true
    }
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map((col) => col.def);     
  }

  @Output() registroTableSelected = new EventEmitter
  @Output() irAltaRegistros = new EventEmitter

  verRegistro(row: any) {
    this.registroTableSelected.emit(row)
  }

  clickNuevoRegistro() {
    this.irAltaRegistros.emit(true)    
  }
}
