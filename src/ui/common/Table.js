import React from 'react';
import {useTable} from "react-table";
import {joinClassNames, noOperations} from "../../helpers/utils";

import styles from './common.module.css'

const Table = ({ columns = [], data = [], className, onRowClick = noOperations }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <table {...getTableProps()} className={joinClassNames(styles.table, className)}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                    <tr
                        {...row.getRowProps()}
                        onClick={e => onRowClick(e, row.original)}
                    >
                        {// Loop over the rows cells
                            row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default Table;