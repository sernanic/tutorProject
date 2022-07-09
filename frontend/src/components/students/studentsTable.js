import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { useSortBy, useTable,useGlobalFilter } from 'react-table';
import { StudentGlobalFilter } from "./studentGlobalFilter";



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
              <a  className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() =>alert("edit " + row.values.userName)}>
                Edit
              </a>
            ),
          },
        ]);
      };

    const studentTableInstance = useTable({ columns, data },tableHooks,useGlobalFilter,useSortBy);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = studentTableInstance;

    useEffect(() => {
        fetchStudents()
    }, []);

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
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
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
        </div>
    )
}

export default StudentsTable