const UserCard = (props) => {
  const { id, title, firstName, lastName, email, picture } = props.data;
  const handleClick = props.handleClick;
  return (
    <div
      onClick={(e) => handleClick(e, id)}
      className="text-center col p-2 flex-column"
      style={{
        border: "2px solid rgba(0,0,0,0.2)",
        margin: "10px",
        maxHeight: "380px",
        maxWidth: "280px",
        minHeight: "240px",
        minWidth: "240px",
        cursor: "pointer",
      }}
    >
      <img
        src={picture}
        alt="Admin"
        className="rounded-circle p-1 bg-primary mt-2"
        width="110"
      />
      <div className="mt-3">
        <h4>{title + " " + firstName + " " + lastName}</h4>
        <p className="text-secondary mb-1">{email}</p>
        {/* <p className="text-muted font-size-sm">Halifax, Canada</p> */}
      </div>
    </div>
  );
};

export default UserCard;
