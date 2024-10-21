import React, { useRef, useEffect, useState } from 'react';
import './ChartCard.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar , Line} from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import CountryCard from './CountryCard';

// Register necessary chart modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend,LineElement,PointElement,);

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const countries =[
  {
    name:'United Kingdom',
    icon:'https://s3-alpha-sig.figma.com/img/bda8/df3e/71efc55c83b04bf5d6beb7d7596e69e0?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C1kV9k8MipLfsBQ~o4pYWv-3vJmYfgfL0zcv40or-mldxNSmDH8uv6ERFRY90boYOBiAxwI5KLVs2NusDqO~HMNAYOApEQ46~rAznICYQQFmghfXNYtACCNnch5-ze2qkJIcpqk79ANHUggNKBMhIvOnh3trNjj~W2n6tpKaqoykda69JV5SpDL508Z0fhayyB7owSRywger~Lh3GC4Yt-D9LjHQxEe8gKGhx1iGYdBb26neukMxTZorKDWb48hqvMncdUBh22E1I8AtIT8TvCKvpU4EW-PFmLjtZUoO8npCZgQ8p6OtFZGhn2JkpVYgd3GKsgtNken6YpSPROH5pg__',
    percent:30
  },
  {
    name:'United States',
    icon:'https://s3-alpha-sig.figma.com/img/e21b/bfa4/2e82f354d37ec7ec6002239b11e9f187?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ivqfcAAombVD9orenDKi7qz9q1eM7Bte7CULvvzVVHtcTK13fxaJ49HUkU~2Km-UpZxY42MfyBHLqVevN8mrbN4jwh23xro~7VuiONF~-YAl2yD~7CCGOfKblh5Fsk9azQ9ImK1Bkp7tSdYLecr2GxXzplyC-yatlYC46ox46PXKuXd5HLQ~GdIDo8rTT0elrEAcX7wJjv~RFEauCmF9PM2amEIPbwcBDHId6pHVt~OottQciLK-nR535AkpUPHsixnisDuBFlpcw2FKpDXhqiFwU2-Hg3wAAKNW7cpVaoBuhZx9L4Qv~svv6yVw2DIjHtasFqW0rax4CZv5KIFNOQ__',
    percent:25
  },
  {
    name:'Australia',
    icon: 'https://s3-alpha-sig.figma.com/img/a588/e05b/6c3491e32c8ff0e642b91a11dbe85687?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ot41p7B122CQEvxwde~wc1o1y2MbBXS-hVdLi9RRpbibMVAqcRPv3eAdUL6uRBlm2dkmp4lZZnjXOX7d2kxe~XYdscz-3q43YTElP6b1xDsYnDcF4Xzvu~zw1~6b~9cABWzkDpeEE4T20t19kDQNvZsgIxp3K-1EuL7dA2DUxXJXBQyAIqY13D09HULKzm8TZrX4qIkNE1UMXETmkzD3hdo4LHSQKWH9DAQmcl8ELfQLSLLcSed4Z8RDqS~OmOjcNSOLOuU2A2H5usl4nBkoqmatNlqJnKOJPy0q7fIyzU9K-1eGrk1LTEewZAvaJu9mWt7IFY2QFQXl6mINZPVK8Q__',
    percent:10
  },
  {
    name:'Germany',
    icon:'https://s3-alpha-sig.figma.com/img/fbff/7a1d/4046cb766068868fe1ebaf26d7e493b8?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OlFyIaPF3lYd1aF-qmDt9eg4ir7yQCCsscMBacaIubqCZpCN0xOXdwz0szZf1BB~ywjOaV8legyfU0kYkhMX65qyYG2wBwCI43mldu5BDaaYZ4C7b-h0nIwJY1zkSPEujpkMYm4evoKe0mlLgzjp4HIOzT6YtYvkPrMVyLuGL11yxeo5MQ1dWbIT55Li17H8xerIW7ZtcnIB~mo5NFAYCEuWO56vd~LPcTvpe-ZcOG~60B7bnAXQ~toxeZzwiCxeJJDGWYjVGCb-~hb-6DGemiJUsbKQUqK~Cw2u8Q8LehfRupRzlOjbSRyGHLtinnVF73i1up30RIJOibMca5ItGg__',
    percent:8
  },
  {
    name:'India',
    icon:'https://s3-alpha-sig.figma.com/img/158d/9731/11e20af560ef9579e25ef5ff5bf84c70?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qp4swnibBSB6hFcYYm~LgEWWY6l9XB9wJlTJyeqI0NE1YBY45gZxREUaUNuIvy0YBQZF4qk7prD4YgLA9Xa29jupm0wt618pB9YUzWzv8zQATIwdhVR2H8F3alB0uZ7ErlZGfNFHMsYNLaVrPUtplCD4s6eMlqusNmq46g5hReQbzuxFhTROrdzPf8oWnb4AQhV69HiPSveAo1sEZf28Gw3Hbkjqu-rqMjMb2MSFgsPdFOFH8KUXUFSG7TyK~mOCqvg1dnbwrU6yavaHOCKi7tz1M9R6qzadcqk63ZIKOCxZO84i74o65K91ncSGzA0Cs1C4CC1xbZkV-Aijqo9hew__',
    percent:7
  }
]
const ChartCard = ({ chart }) => {
  const chartRef = useRef(null); // Reference to access the chart canvas
  const [gradient, setGradient] = useState(null); // Store the gradient
  const [markerPosition, setMarkerPosition] = useState([36.8065, 10.1815]); // Default marker position

  // Create the gradient on component mount
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.canvas.getContext('2d');
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 400); // Vertical gradient
      gradientFill.addColorStop(0, '#077496'); // Start color
      gradientFill.addColorStop(1, '#03BAF3'); // End color
      setGradient(gradientFill);
    }
  }, []);

  const data1 = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [43, 33, 38, 25, 33, 38, 46],
        backgroundColor: gradient || '#03BAF3',
        borderWidth: 0,
      },
    ],
  };

  const data2 = {
    labels: ['Level1', 'Level2  ', 'Level3', 'Level4', 'Level5', 'Level6', 'Level7'],
    datasets: [
      {
        data: [47000, 42000, 30000, 26000, 13000, 4500, 1500],
        backgroundColor: gradient || '#03BAF3',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Start from 0
        max: 50000, // End at 50K
        ticks: {
          stepSize: 10000, // Move by 10K
          callback: function (value) {
            return value / 1000 + 'K'; // Format as '10K', '20K', etc.
          },
        },
        grid: {
          display: true,
        },
      },
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.6,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        maxBarThickness: 10, // Maximum width for bars
      },
    },
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Start from 0
        max: 50, // End at 50K
        ticks: {
          stepSize: 10, // Move by 10K

        },
        grid: {
          display: true,
        },
      },
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.6,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        maxBarThickness: 10, // Maximum width for bars
      },
    },
  };
  const line1 = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Amount staked',
        data: [35, 28, 30, 35, 32, 37, 47],
        borderColor: '#3EAF09',
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
      {
        label: 'Amount disbursed',
        data: [29, 10, 11, 19, 9, 30, 35],
        borderColor: '#CC0606',
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
    ],
  };
  const line2 = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Amount staked',
        data: [19, 11, 30, 28, 32, 22, 47],
        borderColor: '#3EAF09',
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
    ],
  };

  const line1Options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 50,
        ticks: {
          stepSize: 10,
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide dataset labels (legend)
      },
    },
  };


  // Function to handle map click events
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng; // Get latitude and longitude from click event
    setMarkerPosition([lat, lng]); // Update marker position
  };

  return (
    <div className="chartDetail">
      <div className="info">
        {chart.title}
        {chart.action}
      </div>

      <div className="chart">
        {chart.type === 'chart' ?

        (
          <Bar ref={chartRef} data={chart.interface === "overview" ? data1 : data2} options={chart.interface === "overview" ? options1 : options} />
        ) : chart.type === 'map' ? (
          <div className='mapcont'>
          <MapContainer
            center={[36.8065, 10.1815]} // Default center coordinates for Tunis
            zoom={13}
            style={{ height: '260px', flex:2.5 }}
            onClick={handleMapClick} // Attach click event handler to the map
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition} icon={customIcon}>
              <Popup>
                <strong>Hello from Tunis!</strong>
              </Popup>
            </Marker>
          </MapContainer>
          <div className='countries'>
          {
            countries.map((country , i) => <CountryCard country={country} key={i}/>)
          }
          </div>
          </div>
        ) : chart.type === 'Line' ? (
          <Line
          data={chart.version === "v1" ?  line1 : line2}
          options={line1Options}
          ></Line>
        )
          : null
        }
      </div>
    </div>
  );
};

export default ChartCard;
