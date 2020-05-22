export interface PropertyData {
  name: string;
  type: (type?: any) => Function;
}

interface PropertyMapper {
  table: Function;
  properties: PropertyData[];
}

interface Table {
  name: string;
  constructor: Function;
}

class Manager {
  readonly tables: Table[] = [];
  readonly columns: PropertyMapper[] = [];

  registerTable(table: Table) {
    this.tables.push(table);
  }

  registerColumn(tableConstructor: Function, property: PropertyData) {
    const table = this.columns.filter(
      (table) => table.table === tableConstructor
    )[0];

    if (table) {
      table.properties.push(property);
    } else {
      this.columns.push({
        table: tableConstructor,
        properties: [property],
      });
    }
  }

  findColumnsFromTable(searchTable: Object) {
    const tableExists = this.tables.filter(
      (table) => table.constructor === searchTable
    )[0];

    if (tableExists) {
      const columns = this.columns.filter(
        (columnMap) => columnMap.table === searchTable
      )[0];

      return { name: tableExists.name, columns: columns.properties };
    }

    return { name: undefined, columns: [] };
  }
}

export default new Manager();
