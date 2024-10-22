import { useFormContext } from "react-hook-form";

interface IFormInput {
  name: string;
  label: string;
  error?: string;
  onBlur?: () => void;
}

const FormInput = ({ name, label, error, onBlur: handleBlur }: IFormInput) => {
  const { register } = useFormContext();
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register(name, {
            onBlur: () => {
              if (handleBlur) handleBlur();
            },
          })}
        />
      </div>

      {error && <small className="text-red-700">{error}</small>}
    </div>
  );
};

export default FormInput;
