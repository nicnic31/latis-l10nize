import { genres } from "@/utils/genre";
import { useModal } from "@/components/modal/context";
import { FormSchemaType } from "@/app/page";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";

export default function GameGenres() {
  const { closeModal } = useModal((state) => ({
    closeModal: state.closeModal,
  }));

  const [genre, setGenre] = useState<string[]>([]);

  const { setValue } = useFormContext<FormSchemaType>();

  const handleCheckbox = (check: boolean, value: string) => {
    const storage = [...genre];
    if (check) {
      storage.push(value);
      setGenre(storage);
    } else {
      const filtered = storage.filter((genre) => genre !== value);
      setGenre(filtered);
    }
  };

  const handleSubmit = () => {
    if (genre.length > 0) {
      setValue("gameGenre", genre);
      closeModal();
    }
  };

  const handleCancel = () => {
    setGenre([]);
    setValue("gameGenre", []);
    closeModal();
  };

  return (
    <div className="bg-white w-[600px] h-[600px] overflow-y-auto rounded font-sans p-5">
      <p className="font-semibold text-center text-xl text-title mb-3 tracking-wide">
        Game Genres
      </p>
      <p className="text-xs tracking-wide text-center text-information">
        Here are the list of the game genres
      </p>
      <div className="grid grid-cols-2 gap-2 mt-7">
        {genres.map((genre, idx) => (
          <div key={idx} className="flex flex-row align-center my-1">
            <div className="w-7">
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) => handleCheckbox(e.target.checked, genre.value)}
              />
            </div>
            <p className="text-sm">{genre.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center mt-5 mb-2">
        <button
          type="button"
          onClick={handleCancel}
          className={cn(
            "w-full text-white tracking-wide mr-2 text-center  rounded text-sm p-3 font-semibold",
            genre.length < 1
              ? "bg-[#9AC5F4] hover:bg-none"
              : "bg-[#9DB2BF] hover:bg-[#526D82]"
          )}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={genre.length < 1}
          className={cn(
            "w-full cursor-pointer tracking-wide text-white ml-2 text-center rounded text-sm p-3 font-semibold",
            genre.length < 1
              ? "bg-[#AAC8A7] hover:bg-none"
              : "bg-[#7A9D54] hover:bg-[#1A5D1A]"
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
}
