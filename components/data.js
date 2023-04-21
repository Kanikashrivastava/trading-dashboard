import { IMAGES } from "@/public/image";
import Image from "next/image";
import { Line } from "react-chartjs-2";

function Dashboard({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  if (price === "0.00" || !data?.labels?.length) {
    return (
        <>
					<h2>please select a currency pair</h2>
					<div className="chart-container">
						<Image src={IMAGES.demo} alt="empty data" style={{width: '100%', height: 'auto'}} />
					</div>
      	</>
    );
  }
  
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>
			{price === "0.00" ? (
				<div className="chart-container">
					<Image src={IMAGES.demo} alt="empty data" />
				</div>
			):(
				<div className="chart-container">
					<Line data={data} options={opts} />
				</div>
			)}
		</div>
	);
}

export default Dashboard;