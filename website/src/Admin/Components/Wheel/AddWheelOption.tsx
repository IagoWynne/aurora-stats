import { useMutation } from "@apollo/client";
import GET_WHEEL_OPTIONS_QUERY from "../../queries/getWheelOptions";
import {
  ADD_WHEEL_OPTION_MUTATION,
} from "../../queries";
import { Button } from "../../../Common";

interface Props {
  onSuccess: () => void;
}

const AddWheelOption = ({ onSuccess }: Props): JSX.Element => {
  const [addWheelOption, { loading, error }] = useMutation(
    ADD_WHEEL_OPTION_MUTATION,
    {
      refetchQueries: [
        { query: GET_WHEEL_OPTIONS_QUERY },
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
      <Button type="submit" className="w-10 ml-2">+</Button>
    </form>
  );
};

export default AddWheelOption;
