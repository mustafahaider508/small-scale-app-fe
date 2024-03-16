import { useQuery } from "@tanstack/react-query";
import { service } from "../../service/api";
import { useEffect, useState } from "react";

export default function JobDetails() {
  const { getJobById } = service;
  const [jobId, setJobId] = useState();

  const { data, refetch } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId),
    enabled: false,
  });

  return (
    <div className="bg-white shadow sm:rounded-lg mt-[50px]">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Get A Specific Job Result By Id
        </h3>

        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-[70%] ">
            <input
              type="number"
              name="jobId"
              id="jobId"
              value={jobId}
              onChange={(e: any) => setJobId(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter Job Id"
            />
          </div>
          <div
            onClick={() => refetch(["jobs", jobId] as any)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Search
          </div>
        </form>

        {typeof data !== "string" && data !== undefined ? (
          <div>
            <div className="px-4 mt-6 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Job Information
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Job Id
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.id}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Title
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.data?.data?.values?.title}
                  </dd>
                </div>
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.data?.data?.values?.description}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Attempts
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    attempts
                  </dd>
                </div>
                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Delay
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.delay}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Timestamp
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.timestamp}
                  </dd>
                </div>

                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Progress
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.progress}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Attempts Made
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.attemptsMade}
                  </dd>
                </div>

                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Return value
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.returnvalue}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    finishedOn
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.finishedOn}
                  </dd>
                </div>

                <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Processed On
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data?.data?.processedOn}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : data == "Job not found" ? (
          <p className="my-6 text-red-500">{data}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
