import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
//table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
//interface
import { ConfiguracionI } from '../../../shared/model/catalogos/configuracion';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
  columnNames: string[] = ['id_config', 'configuracion'];
  dataSource!: MatTableDataSource<ConfiguracionI>;
  
  @Input() set tableData(data: ConfiguracionI[]) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();    
  }

  setTableDataSource(data: ConfiguracionI[]) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;    
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    if (this.dataSource === undefined) return
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
