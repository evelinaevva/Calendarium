import { useDispatch, useSelector } from "react-redux";
import "../../css/imgBox.css";
function ImgBox() {
  const dispatch = useDispatch();
  const img = useSelector((state) => state.taskReducer.imgTask);
  return (
    <div className="imgBox" onClick={() => dispatch({ type: "REMOVE_UPDATE_IMG" })}>
      
      <div >
      
        <img src={img} alt="img" />
      </div>
    </div>
  );
}

export default ImgBox;
