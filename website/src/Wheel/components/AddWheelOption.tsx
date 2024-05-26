import { useMutation } from "@apollo/client";
import {
  ADD_WHEEL_OPTION_MUTATION,
  GET_WHEEL_OPTIONS_QUERY,
  GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY,
} from "../queries";

interface Props {
  onSuccess: () => void;
}

const AddWheelOption = ({ onSuccess }: Props): JSX.Element => {
  const [addWheelOption, { loading, error }] = useMutation(
    ADD_WHEEL_OPTION_MUTATION,
    {
      refetchQueries: [
        { query: GET_WHEEL_OPTIONS_QUERY },
        { query: GET_WHEEL_OPTIONS_AND_PEOPLE_QUERY },
      ],
    },
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      option: { value: string };
    };

    await addWheelOption({
      variables: {
        name: target.option.value,
      },
    });

    onSuccess();
  };

  if (loading) {
    return <p>Submitting...</p>;
  }

  if (error) {
    return <p>Submission Error! {error.message}</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="text" name="option" placeholder="Option" required />
      </label>
      <button type="submit">+</button>
    </form>
  );
};

export default AddWheelOption;
