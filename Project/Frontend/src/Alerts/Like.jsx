import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Like = ({ liked, handleLike, postId }) => {
    return liked ? (
        <MdFavorite
            onClick={() => handleLike(postId, liked)}
            size={30}
            style={{
                cursor: "pointer",
                float: "inline-end",
                margin: "10px",
            }}
            color="#1976d2"
        />
    ) : (
        <MdFavoriteBorder
            onClick={() => handleLike(postId, liked)}
            size={30}
            color="#1976d2"
            style={{ cursor: "pointer", float: "inline-end", margin: "10px" }}
        />
    );
};

export default Like;
