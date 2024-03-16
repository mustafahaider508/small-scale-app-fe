import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { service } from "../../service/api";
import { toast } from "react-toastify";

type Props = {
  isOpen: Boolean | any;
  setIsOpen: React.Dispatch<React.SetStateAction<Boolean>> | any;
  id: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

const DeleteModal = ({ isOpen, setIsOpen, id, setSuccess }: Props) => {
  const [message, setMessage] = useState("");
  const queryClient: any = new QueryClient();
  const { deleteUser } = service;
  function closeModal() {
    setIsOpen(false);
  }

  //Delete a User Query
  const { isPending, isLoading, isError, data, isFetching, status, refetch } =
    useQuery({
      queryKey: ["users"],
      queryFn: () => deleteUser(id),
      enabled: !!id,
    });

  useEffect(() => {
    if (status == "success") {
      setMessage(data?.message);
      closeModal();
      setSuccess(true);
      queryClient.invalidateQueries(["users"]);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (message !== "") toast.success(message);
  }, [message]);

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 my-4">
                    <p className="text-[16px] text-center  text-gray-800">
                      Are you sure you want to delete ?
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => refetch(["users", id] as any)}
                      type="button"
                      className="inline-flex justify-center text-[12px] rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md text-[12px] border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteModal;
