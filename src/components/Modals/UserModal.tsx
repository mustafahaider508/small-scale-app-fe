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
  type: string;
  id: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  singleUser: any;
};
type dataTypes = {
  email: string;
  firstName: string;
  phone: number;
};

const dataSchema = yup.object().shape({
  firstName: yup.string().required("Name is required*"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required*"),
  phone: yup.number().required("Phone is required*"),
});

const UserModal = ({
  isOpen,
  setIsOpen,
  type,
  id,
  setSuccess,
  singleUser,
}: Props) => {
  const { addUser, getSingleUser, editUser } = service;

  const closeModal = () => {
    setIsOpen(false);
  };

  const queryClient: any = new QueryClient();

  //Add a User
  const { mutate, isError, error } = useMutation({
    mutationFn: addUser,
    onSuccess(data, variables, context) {
      if (data == "User Already Exist") {
        toast.error(data);
      } else {
        toast.success(data?.message);
        closeModal();
        setSuccess(true);
        queryClient.invalidateQueries(["users"]);
      }
    },
  });

  //Get User By Id
  const { data: userData, isSuccess } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  });

  //Edit a User
  const { mutate: editUserMutate } = useMutation({
    mutationFn: editUser,
    onSuccess(data, variables, context) {
      if (data == "User Already Exist") {
        toast.error(data);
      } else {
        toast.success(data?.message);
        closeModal();
        setSuccess(true);
        queryClient.invalidateQueries(["users"]);
      }
    },
  });

  const handleSubmit = (values: any, reset: any) => {
    let data = {
      name: values.firstName,
      email: values.email,
      phone: values.phone,
    };
    mutate(data);
  };

  const handleEditSubmit = (values: any) => {
    const data = {
      id: id,
      name: values.firstName,
      email: values.email,
      phone: values.phone,
    };
    editUserMutate(data);
  };

  const initialData: dataTypes = {
    firstName: type == "edit" ? singleUser?.name : "",
    email: type == "edit" ? singleUser?.email : "",
    phone: type == "edit" ? singleUser?.phone : "",
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
                    {type === "add" ? "Add User" : "Edit User"}
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
                      type == "add"
                        ? handleSubmit(data, formData.resetForm)
                        : handleEditSubmit(data);
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
                                  Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors.firstName && (
                                  <p className="text-red-700 text-[14px]">
                                    {errors.firstName}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-6">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors.email && (
                                  <p className="text-red-700 text-[14px]">
                                    {errors.email}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-6">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="number"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    autoComplete="phone"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors.phone && (
                                  <p className="text-red-700 text-[14px]">
                                    {errors.phone}
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

export default UserModal;
