import { gql } from "@apollo/client";

const AddPersonMutation = (firstName: string, lastName: string) => gql`
    mutation {
        createPerson(firstName: ${firstName}, lastName: ${lastName}) { id }
    }`;

export default AddPersonMutation;
