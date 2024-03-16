import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { service } from "../../service/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: Boolean | any;
  setIsOpen: React.Dispatch<React.SetStateAction<Boolean>> | any;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};
type dataTypes = {
  title: string;
  description: string;
};

const dataSchema = yup.object().shape({
  title: yup.string().required("Title is required*"),
  description: yup.string().required("Description is required*"),
});

const AddJob = ({ isOpen, setIsOpen, setSuccess }: Props) => {
  const { createJob } = service;

  const closeModal = () => {
    setIsOpen(false);
  };

  const queryClient: any = new QueryClient();

  //Job creation in the Redis job queue.
  const { mutate, isError, error } = useMutation({
    mutationFn: createJob,
    onSuccess(data, variables, context) {
      if (typeof data == "string") {
        toast.error(data);
      } else {
        toast.success(data?.message);
        closeModal();
        setSuccess(true);
        queryClient.invalidateQueries(["jobs"]);
      }
    },
  });

  const handleSubmit = (values: any) => {
    let data = {
      data: {
        values,
      },
    };
    mutate(data);
  };

  const initialData: dataTypes = {
    title: "",
    description: "",
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Job
                  </Dialog.Title>
                  <Formik
                    initialValues={initialData}
                    validationSchema={dataSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values, formData) => {
                      const data: any = {
                        ...values,
                      };
                      handleSubmit(data);
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                              <div className="sm:col-span-12">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Title
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors.title && (
                                  <p className="text-red-700 text-[14px]">
                                    {errors.title}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-12">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Description
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    rows={6}
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    autoComplete="description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors.description && (
                                  <p className="text-red-700 text-[14px]">
                                    {errors.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={closeModal}
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmit()}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddJob;
