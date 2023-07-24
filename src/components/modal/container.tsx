import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "./context";
import { Fragment } from "react";
import GameSettings from "./components/game-settings";
import GameGenres from "./components/game-genres";

const renderComponent = (view: string) => {
  switch (view) {
    case "GAME_SETTINGS":
      return <GameSettings />;
    case "GAME_GENRE":
      return <GameGenres />;
    default:
      return null;
  }
};

export default function ModalContainer() {
  const { isOpen, view, closeModal } = useModal((state) => ({
    isOpen: state.isOpen,
    view: state.view,
    closeModal: state.closeModal,
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={isOpen}
        className="fixed top-[5%] inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClose={closeModal}
      >
        {/* give transition the backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative flex flex-row justify-center z-50 inline-block w-full text-left align-middle xs:w-auto">
            {view && renderComponent(view)}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
