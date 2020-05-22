"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    constructor() {
        this.tables = [];
        this.columns = [];
    }
    registerTable(table) {
        this.tables.push(table);
    }
    registerColumn(tableConstructor, property) {
        const table = this.columns.filter((table) => table.table === tableConstructor)[0];
        if (table) {
            table.properties.push(property);
        }
        else {
            this.columns.push({
                table: tableConstructor,
                properties: [property],
            });
        }
    }
    findColumnsFromTable(searchTable) {
        const tableExists = this.tables.filter((table) => table.constructor === searchTable)[0];
        if (tableExists) {
            const columns = this.columns.filter((columnMap) => columnMap.table === searchTable)[0];
            return { name: tableExists.name, columns: columns.properties };
        }
        return { name: undefined, columns: [] };
    }
}
exports.default = new Manager();
