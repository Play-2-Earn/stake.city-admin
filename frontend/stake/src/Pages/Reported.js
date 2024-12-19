import React, { useEffect, useState } from 'react'
import './Reported.css'
import { Button, Dropdown, Image, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TableButton from '../Components/TableButton';
import { columnsNeeded } from '../Data/Reported';
import axios from 'axios';
import Loader from '../Components/Loader';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Reported = ({title}) => {

    // Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
    const [loading , setLoading] = useState(true)
    const [disable , setDisable] = useState(false)

    const buttonStyle= {
      height:'30px',
      width:'130px',
      margin:'auto 0',
      display:'flex',
      alignItems:'center',
      justifyContent:'flex-start',
      background:"#50AB19",
      borderRadius:'10px',
      gap:'15px',
      cursor: disable ? "not-allowed" : "pointer",
      pointerEvents: disable ? "none" : "auto", // Prevent clicks when disabled
      opacity: disable ? 0.5 : 1, // Dim the button when disabled
    }
    const [dataTable , setDataTable] = useState([])
    const [column , setColumn] = useState([])
    const [widget , setWidget] = useState("needed")
    const [reports , setReports] = useState([])

    useEffect(() => {
      setColumn([...columnsNeeded])
      }, [widget])

      useEffect(() => {
        const getReports = async () => {
          try {
            const response = await axios.get("http://localhost:5001/api/reports", {
              headers: {
                "Content-Type": "application/json",
              },
            });
            setReports(await response.data.data);
            setLoading(false)
          } catch (error) {
            if (error.response) {
              // Server responded with a status other than 2xx
              console.log("Server Error: ", error.response.data);
            } else if (error.request) {
              // Request was made, but no response received
              console.log("No response received: ", error.request);
            } else {
              // Other errors
              console.log("Error message: ", error.message);
            }
          }
        };
        setDisable(false)
        getReports();
      }, [loading]);

      const updateAction = async(id , type , status) =>{
          try {
            setDisable(true)
            const response = await axios.put(`http://localhost:5001/api/update_report_status/${id}`,{
                type:type,
                status:status,
                admin_user_id:"674ed6833197235ff1ca6d39"
            })
            setLoading(true)
          } catch (error) {
            setDisable(false)
            if (error.response) {
              // Server responded with a status other than 2xx
              console.log("Server Error: ", error.response.data.message);
            } else if (error.request) {
              // Request was made, but no response received
              console.log("No response received: ", error.request);
            } else {
              // Other errors
              console.log("Error message: ", error.message);
            }
          }
      }
    const buttons = [
        {
          label:"Action Needed",
          img:"Assets/list.png",
          color:"#1988AB",
          data:"needed"
        },
        {
          label:"Approved",
          img:"Assets/check.png",
          color:"#00000080",
          data:"approved"
        },
        {
            label:"Rejected",
            img:"Assets/cancel.png",
            color:"#00000080",
            data:"rejected"
        }
    ]
    const items = [
        {
          label: '1st menu item',
          key: '1',
        },
        {
          label: '2nd menu item',
          key: '2',
        },
        {
          label: '3rd menu item',
          key: '3',
          danger: true,
        },
        {
          label: '4rd menu item',
          key: '4',
          danger: true,
          disabled: true,
        },
      ];
      const menuProps = {
        items
      };
  return (
    <div className='bodyy'>
    {/* Head section */}
    <div className='overview'>
        <p>
            {title}
        </p>
        <div className='search'>
            <div className='searchholder'>
              <input type='search' placeholder='Search anything ...' className='inp' />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="search-icon"
                >
                  <path
                  d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C3 7.68333 3.62933 6.146 4.888 4.888C6.14667 3.63 7.684 3.00067 9.5 3C11.3167 3 12.854 3.62933 14.112 4.888C15.37 6.14667 15.9993 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5623 12.688 12.687C13.5633 11.8117 14.0007 10.7493 14 9.5C14 8.25 13.5623 7.18733 12.687 6.312C11.8117 5.43667 10.7493 4.99933 9.5 5C8.25 5 7.18733 5.43767 6.312 6.313C5.43667 7.18833 4.99933 8.25067 5 9.5C5 10.75 5.43767 11.8127 6.313 12.688C7.18833 13.5633 8.25067 14.0007 9.5 14Z"
                  fill="black"
                  fill-opacity="0.2"
                  />
              </svg>
            </div>
            <img src='Assets/p.png' alt='profile' className='profile' />
            <div className='notif-cont'>
            <img src='Assets/mdi_bell.png' alt='notification' />
            <p>
              99+
            </p>
            </div>
        </div>
    </div>
    {/* end head section */}
    {/* Sorting Section */}
    <div className='linkSection'>
      <div className='links'>
        <a href='' className='link'>
          Last 24 hours
        </a>
        <a href='' className='link'>
          Last Week
        </a>
        <a href='' className='link'>
          Last month
        </a>
        <a href='' className='link'>
          Last year
        </a>
      </div>
      <Dropdown menu={menuProps}>
  <Button  style={{
    backgroundColor: 'white',
    color: '#00000080',
    borderRadius: '8px',
    border: 'none',
  }}>
    <Space>
      Filter by date range
      <DownOutlined />
    </Space>
  </Button>
</Dropdown>
    </div>
    {/* Table Section */}
    <div className='tablesection'>
      <div className='navbuttons'>
        {
          buttons.map(el => <TableButton btn={el} widget={widget} setWidget={setWidget} />)
        }
      </div>
      <div className='tablee'>
        {
         loading ?
          <Loader/>
         :
          reports.length >1
          &&
          <Table
    columns={column}
    // scroll={{ x:false }}
    style={{
      width:'98%',
      height:'95%',
    }}
    expandable={{
      expandedRowRender: (record) => (
        <div
          style={{
            width: '80%', // Matches the width of the table
            // whiteSpace: 'wrap',
            // boxSizing: 'border-box', // Ensures padding doesn't exceed total width
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            margin:'auto'
          }}
        >
          <div style={{
                        borderBottom:'1px solid #00000080',
width:'100%',
          }}>
          <p style={{
            width: '100%', // Matches the width of the table
            whiteSpace: 'wrap',
            boxSizing: 'border-box', // Ensures padding doesn't exceed total width
          }}> <b style={{marginRight:'3px'}}>
           {record.type === "Question" ? "Question owner" : "Answer owner"}: </b>
           {record.target_owner}
</p>
<p style={{
            width: '100%', // Matches the width of the table
            whiteSpace: 'wrap',
            boxSizing: 'border-box', // Ensures padding doesn't exceed total width
          }}> <b style={{marginRight:'3px'}}>
           {record.type === "Question" ? "Question content" : "Answer content"}: </b>
           {record.target_content}
</p>

          </div>

          <p style={{
            width: '100%', // Matches the width of the table
            whiteSpace: 'wrap',
            boxSizing: 'border-box', // Ensures padding doesn't exceed total width
          }}> <b style={{marginRight:'3px'}}>
           Reporter: </b>
           {record.user_name}
</p>
          <p style={{
            width: '100%', // Matches the width of the table
            whiteSpace: 'wrap',
            boxSizing: 'border-box', // Ensures padding doesn't exceed total width
          }}> <b>
            {record.content ? 'Cause' : 'Activity'}:</b> <br/> {record.content ? record.content : record.activity}</p>
<div style={{width:'auto' , height:'auto', alignSelf:'flex-start'}}>
<p style={{
            width: '100%', // Matches the width of the table
            whiteSpace: 'wrap',
            boxSizing: 'border-box', // Ensures padding doesn't exceed total width
          }}> <b>
           Location:</b>
</p>
<Image
    width={350}
    src="Assets/imgdetail.png"
  />

  {/* <MapContainer
            center={[record.coordinates.lat, record.coordinates.lng]} // Default center coordinates for Tunis
            zoom={13}
            style={{ height: '260px', width:'400px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[record.coordinates.lat, record.coordinates.lng]} icon={customIcon}>
              <Popup>
                <strong>Hello from Tunis!</strong>
              </Popup>
            </Marker>
          </MapContainer> */}
  </div>
          {
            record.content ? (
            <div style={{
                  height:'60px',
                  width:'auto',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'30px',
                  alignSelf:'flex-end'
                }}>
                {
                  record.status === "in_check" ?
                  <>
                  <div
                  className='expand'
                  onClick={() => updateAction(record.key , record.type , "rejected")}
                  style={{...buttonStyle , background:"#AB1919"}}>
                    <div className='icon-cont' style={{background:"transparent"}}>
                    <img src="Assets/cancel.png" alt='notification' />
                  </div>
                  <p style={{color:'white', fontWeight:400}}>
                    Reject
                  </p>
                  </div>
                  <div
                  className='expand'
                  onClick={() => updateAction(record.key , record.type , "approved")}
                  style={buttonStyle}>
                    <div className='icon-cont' style={{background:"transparent"}}>
              <img src="Assets/check.png" alt='notification' />
          </div>
          <p style={{color:'white', fontWeight:400}}>
            Approve
          </p>
                  </div>
                  </>
                  :
                  <div
                  className='expand'
                  onClick={() => updateAction(record.key , record.type , "in_check")}
                  style={{...buttonStyle , background:"transparent" , width:'auto !important'}}>
                    <div className='icon-cont' style={{background:"#AB1919"}}>
                    <img src="Assets/cancel.png" alt='notification' />
                  </div>
                  <p style={{color:'black', fontWeight:500 }}>
                    Back to check
                  </p>
                  </div>
                }


            </div>)
            :
            null
          }

        </div>
      ),
    }}
    bordered
    dataSource={widget === "needed" ? reports.length > 1 && reports.filter(el => el.status === "in_check") : widget === "approved" ? reports.length > 1 && reports.filter(el => el.status === "approved"): widget === "rejected" ? reports.length > 1 && reports.filter(el => el.status === "rejected"):dataTable}
    pagination={false} // Disables pagination
  />
        }
      </div>
    </div>
  {/* End Table Section */}
</div>  )
}

export default Reported
