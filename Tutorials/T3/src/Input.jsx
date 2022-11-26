const Input = (props) => {
  const { id, text, type, value, onChangeEvent, errorClass, errorMessage } =
    props;
  return (
    <div className="d-flex flex-row align-items-center mb-4">
      <div className="form-outline flex-fill mb-0">
        <label className="form-label" htmlFor={id}>
          {text}
        </label>
        <input
          value={value}
          onChange={onChangeEvent}
          type={type}
          id={id}
          name={id}
          className="form-control"
        />
        {errorMessage.length > 0 && (
          <div
            className={errorClass}
            style={{
              //   marginLeft: "10px",
              padding: "7px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
