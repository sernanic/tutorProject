import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { useSortBy, useTable, useGlobalFilter, useFilters,usePagination } from 'react-table';
import { NumberRangeColumnFilter,fuzzyTextFilterFn,StudentGlobalFilter,DefaultColumnFilter } from "./studentFilters";
import {matchSorter} from 'match-sorter';
import { useNavigate } from 'react-router-dom';
import {useSelectedUserStore} from "../../store/useStore"

function StudentsTable() {
    const [allStudents, setAllStudents] = useState([]);
    const [filterValue, setFilterValue] = useState();
    const navigateToUser = useNavigate()
    const updateUser = useSelectedUserStore((state) => state.updateUser)

    function getUserView(studentObj){
        updateUser(studentObj)
        navigateToUser('/user')

    }

    const fetchStudents = async () => {
        const response = await axios
            .get("http://0.0.0.0:8000/users")
            .catch((err) => console.log(err));
        if (response) {
            const students = response.data;
            console.log("Students: ", students);
            setAllStudents(students)
        }
    };

    const data = useMemo(() => allStudents);
    const columns = useMemo(
        () =>
            allStudents[0]
                ? Object.keys(allStudents[0])
                    .filter((key) => key !== "userPassword")
                    .map((key) => {
                        if (key === "id")
                            return {
                                Header: 'id',
                                accessor: key,
                                Filter: NumberRangeColumnFilter,
                                filter: 'between',

                            };
                        if (key === "userEmail")
                            return {
                                Header: 'Email',
                                accessor: key,
                            };
                        if (key === "userName")
                            return {
                                Header: 'Name',
                                accessor: key,
                            };
                        

                        return { Header: key, accessor: key };
                    })
                : [],
        [allStudents]
    );

    const isEven = (idx) => idx % 2 === 0;

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }) => (
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => getUserView(row.values)}>
                        Edit
                    </a>
                ),
            },
        ]);
    };

    
      
      // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = val => !val

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )



    const defaultColumn = React.useMemo(
        () => ({

            Filter: DefaultColumnFilter,
        }),
        []
    )

    const studentTableInstance = useTable({ columns, data, initialState: { pageIndex: 0 }, filterTypes, defaultColumn }, tableHooks,useFilters, useGlobalFilter, useSortBy,usePagination);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        preGlobalFilteredRows,
        setGlobalFilter,
        visibleColumns,
        state,
    } = studentTableInstance;

    useEffect(() => {
        fetchStudents()
    }, []);


    

    return (

        <div>
            {/* TODO: refactor this into separate components */}

            {/* Component StudentTableFilters */}
            {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tableFilters">
                            <h1 className="px-6 py-3 flex items-center">Filters</h1>
                            {headerGroup.headers.map((column) => (
                                <div scope="col" className="px-6 py-3" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.canFilter ? column.render('Header') : null}

                                    {/* {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""} */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </div>
                            ))}
                        </div>
                    ))}
             {/* Component StudentTable */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="studentTableHeader">
                            {headerGroup.headers.map((column) => (
                                <th scope="col" className="px-6 py-3" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}

                                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} style={{height: '200px'}}>
                    {page.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <tr className="studentTableRow"   {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => (
                                    <td className="px-6 py-4" {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Pagination arrows */}
             {/* Component StudentTablePagination - not too sure if this should 
             just be part of the studenttable */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default StudentsTable