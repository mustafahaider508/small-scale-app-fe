import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { service } from "../../service/api";
import AddJob from "./AddJob";
import JobDetails from "./JobDetails";

type Props = {
  id: number | undefined | any;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Job = () => {
  const navigate = useNavigate();
  let location: any = useLocation();
  const pageNumber = parseInt(
    new URLSearchParams(location.search).get("pageId") as any
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

  return (
    <>
      <div className="border px-4 py-4 rounded-md">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-[20px] font-semibold leading-6 text-gray-900">
              Jobs
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add a Job
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
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {jobs?.map((job: any) => (
                    <tr key={job.id} className="even:bg-gray-50 ">
                      <td className="whitespace-nowrap cursor-pointer py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {job.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {job.data?.values.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {job.data?.values.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Job Creation Modal */}
        <AddJob isOpen={isOpen} setIsOpen={setIsOpen} setSuccess={setSuccess} />
      </div>
      <div>
        <JobDetails />
      </div>
    </>
  );
};

export default Job;
