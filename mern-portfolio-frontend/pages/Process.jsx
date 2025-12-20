
import AuroxHowWeWork from "./WeWork";


export default function Process() {

useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  }, []);  // Empty dependency array ensures this only runs once after the component mounts
  
  return (
    <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
      <AuroxHowWeWork />
    </div>
  );
}
