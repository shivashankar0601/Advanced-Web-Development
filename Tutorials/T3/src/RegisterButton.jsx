import { useNavigate } from "react-router-dom";

const RegisterButton = (props) => {
  let navigate = useNavigate();
  const { state, updateErrors } = props;
  return (
    <button type="submit" className="btn btn-primary btn-lg">
      Register
    </button>
  );
};

export default RegisterButton;

const handleSubmit = (e) => {
  e.preventDefault();

  const fields = { ...this.state.fields };
  const errors = { ...this.state.errors };

  errors.firstname = "";
  errors.lastname = "";
  errors.email = "";
  errors.password = "";
  errors.repeat_password = "";
  errors.validForm = true;

  const result = this.validationRules.validate(fields, { abortEarly: false });

  if (result.error && result.error.details.length > 0) {
    result.error.details.map(
      (field) => (errors[field.path[0]] = field.message)
    );
    errors.validForm = false;
  }
  this.setState({ fields, errors });
  console.log(result);
};
