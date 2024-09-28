"use client"
import { getUsers } from "@/api/users"
import React, { useEffect, useState } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table"
import { Chip } from "@nextui-org/chip"
import Actions from "./actions"
import { useRouter } from "next/navigation"
import { clear } from "@/utils/localStorage"

export default function UserTable(isMultipleSelect = true) {
  const [users, setUsers] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedKeys, setSelectedKeys] = useState()
  const [selectionMode, setSelectionModle] = useState("single");

  const router = useRouter()

  const columns = [
    { name: "Full name", uid: "fullname" },
    { name: "Email", uid: "email" },
    { name: "Last login", uid: "last_login" },
    { name: "Status", uid: "status" },
  ]


  useEffect(() => {
    if (isMultipleSelect) {
      setSelectionModle("multiple");
    }
    if (isLoading) {
      getUsers().then((response) => {
        if (response.status == 401) {
          clear()
          router.push("/")
        }
        else {
          setUsers(response)
        }
      })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [users, isLoading, isMultipleSelect, router])



  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    if (columnKey == "status") {
      return (
        <Chip className="capitalize" color={user.status ? "success" : "danger"} size="sm" variant="flat">
          {user.status ? "Active" : "Inactive"}
        </Chip>
      );
    }
    return cellValue;

  }, []);

  return (
    <>
      <Actions setIsLoading={setIsLoading} usersId={selectedKeys} />
      <Table color="default"
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        selectionBehavior={"toggle"}
        onSelectionChange={setSelectedKeys}
        className="dark" aria-label="Users">

        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users} isLoading={isLoading} loadingContent={<div>Loading...</div>}>
          {users && users.map((item) => {
            return (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )
          })}

        </TableBody>
      </Table>
    </>
  )
}