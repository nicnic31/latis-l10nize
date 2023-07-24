import { useState } from "react";
import Checkbox from "@/components/checkbox";
import SingleSelect from "@/components/select/single-select";
import { FormSchemaType } from "@/app/page";
import { useFormContext } from "react-hook-form";

const categories = [
  {
    name: "Text ID",
    value: "text-id",
  },
  {
    name: "Text Category",
    value: "text-category",
  },
  {
    name: "Text Tags",
    value: "text-tags",
  },
];

const findCategory = (value: string) => {
  return categories.find((category) => category.value === value);
};

export default function Categories() {
  const [columns, setColumns] = useState({
    secondColumn: false,
    thirdColumn: false,
    fourthColumn: false,
  });

  const [categoryPerColumn, setCategoryPerColumn] = useState({
    secondColumn: "",
    thirdColumn: "",
    fourthColumn: "",
  });

  const { setValue } = useFormContext<FormSchemaType>();

  const handleCategorySecond = (value: string) => {
    const category = findCategory(value);
    if (category && categoryPerColumn.secondColumn !== category.name) {
      setCategoryPerColumn((prev) => ({
        ...prev,
        secondColumn: category.name,
      }));
      setValue("secondColumn.category", value);
    } else {
      setCategoryPerColumn((prev) => ({ ...prev, secondColumn: "" }));
      setValue("secondColumn.category", "");
    }
  };

  const handleCategoryThird = (value: string) => {
    const category = findCategory(value);
    if (category && categoryPerColumn.thirdColumn !== category.name) {
      setCategoryPerColumn((prev) => ({ ...prev, thirdColumn: category.name }));
      setValue("thirdColumn.category", value);
    } else {
      setCategoryPerColumn((prev) => ({ ...prev, thirdColumn: "" }));
      setValue("thirdColumn.category", "");
    }
  };

  const handleCategoryFourth = (value: string) => {
    const category = findCategory(value);
    if (category && categoryPerColumn.fourthColumn !== category.name) {
      setCategoryPerColumn((prev) => ({
        ...prev,
        fourthColumn: category.name,
      }));
      setValue("fourthColumn.category", value);
    } else {
      setCategoryPerColumn((prev) => ({ ...prev, fourthColumn: "" }));
      setValue("fourthColumn.category", "");
    }
  };

  const handleSecondColumnCheckbox = (isCheck: boolean) => {
    if (!isCheck) {
      setCategoryPerColumn((prev) => ({ ...prev, secondColumn: "" }));
      setValue("secondColumn.category", "");
    }
    setColumns((prev) => ({ ...prev, secondColumn: isCheck }));
    setValue("secondColumn.isRequired", isCheck);
  };

  const handleThirdColumnCheckbox = (isCheck: boolean) => {
    if (!isCheck) {
      setCategoryPerColumn((prev) => ({ ...prev, thirdColumn: "" }));
      setValue("thirdColumn.category", "");
    }
    setColumns((prev) => ({ ...prev, thirdColumn: isCheck }));
    setValue("thirdColumn.isRequired", isCheck);
  };

  const handleFourthColumnCheckbox = (isCheck: boolean) => {
    if (!isCheck) {
      setCategoryPerColumn((prev) => ({ ...prev, fourthColumn: "" }));
      setValue("fourthColumn.category", "");
    }
    setColumns((prev) => ({ ...prev, fourthColumn: isCheck }));
    setValue("fourthColumn.isRequired", isCheck);
  };

  return (
    <div className="">
      <div className="flex flex-row align-center justify-center my-5">
        <div className="flex flex-row align-center justify-start py-2 w-2/5">
          <div className="w-[30px]">
            <Checkbox handleCheckbox={handleSecondColumnCheckbox} />
          </div>
          <div className="">
            <p className="font-semibold tracking-wide">Second Column:</p>
          </div>
        </div>
        <SingleSelect
          placeholder="Select column category"
          options={categories}
          selectedValue={categoryPerColumn.secondColumn}
          handleSelect={handleCategorySecond}
          isDisable={!columns.secondColumn}
        />
      </div>
      <div className="flex flex-row align-center justify-center my-5">
        <div className="flex flex-row align-center justify-start py-2 w-2/5">
          <div className="w-[30px]">
            <Checkbox handleCheckbox={handleThirdColumnCheckbox} />
          </div>
          <div className="">
            <p className="font-semibold tracking-wide">Third Column:</p>
          </div>
        </div>
        <SingleSelect
          placeholder="Select column category"
          options={categories}
          selectedValue={categoryPerColumn.thirdColumn}
          handleSelect={handleCategoryThird}
          isDisable={!columns.thirdColumn}
        />
      </div>

      <div className="flex flex-row align-center justify-center my-5">
        <div className="flex flex-row align-center justify-start py-2 w-2/5">
          <div className="w-[30px]">
            <Checkbox handleCheckbox={handleFourthColumnCheckbox} />
          </div>
          <div className="">
            <p className="font-semibold tracking-wide">Fourth Column:</p>
          </div>
        </div>
        <SingleSelect
          placeholder="Select column category"
          options={categories}
          selectedValue={categoryPerColumn.fourthColumn}
          handleSelect={handleCategoryFourth}
          isDisable={!columns.fourthColumn}
        />
      </div>
    </div>
  );
}
