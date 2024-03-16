import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserModal from "../Modals/UserModal";
import DeleteModal from "../Modals/DeleteModal";
import {
  QueryClient,
  keepPreviousData,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { service } from "../../service/api";
import { toast } from "react-toastify";

type Props = {
  id: number | undefined | any;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const User = ({ id, setId }: Props) => {
  const navigate = useNavigate();
  let location: any = useLocation();
  const pageNumber = parseInt(
    new URLSearchParams(location.search).get("pageId") as any
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [page, setPage] = useState<any>(
    Number.isNaN(pageNumber) ? 1 : pageNumber
  );

  const [userData, setUserData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [success, setSuccess] = useState<boolean>(false);
  const { getUsers } = service;

  const { isPending, isLoading, isError, data, isFetching, status, refetch } =
    useQuery({
      queryKey: ["users", page],
      queryFn: () => getUsers(page),
      enabled: !!page,
    });

  const queryClient = new QueryClient();

  const handlePrevClick = async () => {
    const prevPage = Math.max(page - 1, 1);
    await queryClient.invalidateQueries(["users", prevPage] as any);
    await refetch();
    setPage(prevPage);
  };

  const handlenextClick = async () => {
    const nextPage = Math.min(page + 1, Math.ceil(data?.data?.count / 10));
    await queryClient.invalidateQueries(["users", nextPage] as any);
    await refetch();
    setPage(nextPage);
    window.location.replace(`/user?pageId=${nextPage}`);
  };

  useEffect(() => {
    setUserData(data?.data?.users);
  }, [data]);

  useEffect(() => {
    if (success == true) refetch(["users"] as any);
  }, [success]);

  return (
    <>
      <div className="border px-4 py-4 rounded-md">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-[20px] font-semibold leading-6 text-gray-900">
              Users
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => {
                setType("add");
                setIsOpen(true);
              }}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {(isLoading || isFetching || isPending) && <p>Loading...</p>}
                  {isError && <p>Error fetching data</p>}
                  {status === "success" &&
                    userData?.map((person: any) => (
                      <tr key={person.email} className="even:bg-gray-50 ">
                        <td
                          onClick={() => {
                            setId(person._id);
                            navigate(`/user/${person._id}`);
                          }}
                          className="whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                        >
                          {person.name}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.role == undefined ? "user" : person.role}
                        </td>
                        <td className=" cursor-pointer relative flex items-center gap-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a
                            onClick={() => {
                              setType("edit");
                              setId(person._id);
                              setIsOpen(true);
                              setSingleUser(person);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5
                        "
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </a>
                          <button
                            onClick={() => {
                              setId(person._id);
                              setOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className=" mt-2 flex justify-end gap-3 items-center py-[6px]  pr-9 cursor-pointer">
                <svg
                  onClick={handlePrevClick}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <div className="flex">
                  <p className="text-[14px]">{page}/</p>
                  <p className="text-[14px]">
                    {Math.ceil(data?.data?.count / 10)}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  onClick={handlenextClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type={type}
        id={id}
        setSuccess={setSuccess}
        singleUser={singleUser}
      />
      <DeleteModal
        isOpen={open}
        setIsOpen={setOpen}
        id={id}
        setSuccess={setSuccess}
      />
    </>
  );
};

export default User;
