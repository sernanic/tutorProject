import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { useSortBy, useTable, useGlobalFilter, useFilters,usePagination } from 'react-table';
import { StudentGlobalFilter } from "./studentGlobalFilter";

import {matchSorter} from 'match-sorter';


function StudentsTable() {
    const [allStudents, setAllStudents] = useState([]);




    const fetchStudents = async () => {
        const response = await axios
            .get("http://127.0.0.1:8000/users/list")
            .catch((err) => console.log(err));
        if (response) {
            const students = response.data;
            console.log("Students: ", students);
            setAllStudents(students)
        }
    };

    const data = useMemo(() => allStudents);
    //const data = useMemo(() => allStudents, allStudents);
    const columns = useMemo(
        () =>
            allStudents[0]
                ? Object.keys(allStudents[0])
                    .filter((key) => key !== "userPassword")
                    .map((key) => {
                        if (key === "userEmail")
                            return {
                                Header: 'Email',
                                accessor: key,
                                //Cell: ({ value }) => <img src={value} />,
                                //maxWidth: 70,
                            };
                        if (key === "userName")
                            return {
                                Header: 'Name',
                                accessor: key,
                                //Cell: ({ value }) => <img src={value} />,
                                //maxWidth: 70,
                            };
                        if (key === "id")
                            return {
                                Header: 'id',
                                accessor: key,
                                Filter: NumberRangeColumnFilter,
                                filter: 'between',
                                //Cell: ({ value }) => <img src={value} />,
                                //maxWidth: 70,
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
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => alert("edit " + row.values.userName)}>
                        Edit
                    </a>
                ),
            },
        ]);
    };

    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
      }) {
        const count = preFilteredRows.length
      
        return (
          <input
            value={filterValue || ''}
            onChange={e => {
              setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
          />
        )
      }
    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
      }
      
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

    const studentTableInstance = useTable({ columns, data, initialState: { pageIndex: 1 }, filterTypes, defaultColumn }, tableHooks,useFilters, useGlobalFilter, useSortBy,usePagination);
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


    function SliderColumnFilter({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) {
        // Calculate the min and max
        // using the preFilteredRows

        const [min, max] = React.useMemo(() => {
            let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
            let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
            preFilteredRows.forEach(row => {
                min = Math.min(row.values[id], min)
                max = Math.max(row.values[id], max)
            })
            return [min, max]
        }, [id, preFilteredRows])

        return (
            <>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filterValue || min}
                    onChange={e => {
                        setFilter(parseInt(e.target.value, 10))
                    }}
                />
                <button onClick={() => setFilter(undefined)}>Off</button>
            </>
        )
    }
    

    function NumberRangeColumnFilter({
        column: { filterValue = [], preFilteredRows, setFilter, id },
      }) {
        const [min, max] = React.useMemo(() => {
          let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
          preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
          })
          return [min, max]
        }, [id, preFilteredRows])
      
        return (
          <div
            style={{
              display: 'flex',
            }}
          >
            <input
              value={filterValue[0] || ''}
              type="number"
              onChange={e => {
                const val = e.target.value
                setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
              }}
              placeholder={`Min (${min})`}
              style={{
                width: '70px',
                marginRight: '0.5rem',
              }}
            />
            to
            <input
              value={filterValue[1] || ''}
              type="number"
              onChange={e => {
                const val = e.target.value
                setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
              }}
              placeholder={`Max (${max})`}
              style={{
                width: '70px',
                marginLeft: '0.5rem',
              }}
            />
          </div>
        )
      }

    return (

        <div>
            <StudentGlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th scope="col" className="px-6 py-3" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <tr className={isEven(idx) ? "bg-green-400 bg-opacity-30" : "bg-white border-b dark:bg-gray-800 dark:border-gray-700 "}   {...row.getRowProps()}>
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
                        {pageIndex } of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
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