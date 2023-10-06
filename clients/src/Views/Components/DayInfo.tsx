import { useSelector } from "react-redux";

function DayInfo() {
  return (
    <>
      <div className="dayContainer infoDay">
        <div>Погода</div>
        <div>Световой день</div>
        <div>Праздники в этот день</div>
      </div>
    </>
  );
}

export default DayInfo;
