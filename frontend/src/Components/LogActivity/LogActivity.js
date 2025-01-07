import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './LogActivity.css'
import TableButton from '../UI/TableButton'
import { columnsAdmin, dataUser , columnsUser} from '../../Data/LogActivity'
import axios from 'axios'
import Loader from '../UI/Loader'

const LogActivity = ({title}) => {

  const [dataTable , setDataTable] = useState([])
  const [column , setColumn] = useState([])
  const [widget , setWidget] = useState("admin")
  const [loading , setLoading] = useState(true)
  const [activity , setActivity] = useState([])

  useEffect(() => {
  setColumn(widget === "user" ? [...columnsUser] : [...columnsAdmin])
  }, [widget])

  useEffect(() => {
    const getReports = async (url) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/${url}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setActivity(await response.data.data);
        // console.log("API Respone: ", ...response.data.data);

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
    setLoading(true)
    widget === "admin" ? getReports("admin_history") : getReports("questions_answers");
  }, [widget]);

  const buttons = [
    {
      label:"Admin Activity",
      img:"Assets/person.png",
      color:"#00000080",
      data:"admin"
    },
    {
      label:"Users Activity",
      img:"Assets/users.png",
      color:"#1988AB",
      data:"user"
    }]

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
          loading ? <Loader />
          :
          activity.length > 0 &&
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
                  width: '100%', // Matches the width of the table
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{
                  width: '100%', // Matches the width of the table
                  whiteSpace: 'wrap',
                  boxSizing: 'border-box', // Ensures padding doesn't exceed total width
                }}>
                  <b>{record.content ? 'User' : 'Admin'}:</b> <br /> {record.user_name}
                </p>
                <p style={{
                  width: '100%', // Matches the width of the table
                  whiteSpace: 'wrap',
                  boxSizing: 'border-box', // Ensures padding doesn't exceed total width
                }}>
                  <b>{record.content ? 'Content' : 'Activity'}:</b> <br /> {record.content ? record.content : record.activity}
                </p>

                {/* Uploaded Files Section */}
                {record.uploaded_files && record.uploaded_files.length > 0 && (
  <div style={{ width: "100%", margin: "10px 0" }}>
    <p><b>Uploaded Files:</b></p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    {record.uploaded_files?.map((file, index) => {
    const fileSrc = `http://localhost:5001${file.url}`; // Construct the full URL for the file
    const fileName = file.filename; // Extract the filename directly from the object

    return (
      fileName.endsWith(".jpg") || fileName.endsWith(".png") ? (
        <a
          style={{ width: "400px !important" ,height:'auto !important', cursor:'pointer'}}
          key={index}
          href={fileSrc}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={fileSrc}
            alt={fileName}
            style={{ width: "400px",height:'auto' , margin: "5px 0" }}
          />
        </a>
      ) : fileName.endsWith(".pdf") ? (
        <embed
          key={index}
          src={fileSrc}
          type="application/pdf"
          style={{ width: "40%", height: "400px", margin: "5px 0" }}
        />
      ) : fileName.endsWith(".mp4") || fileName.endsWith(".webm") || fileName.endsWith(".ogg") ? (
        <video
          key={index}
          src={fileSrc}
          controls
          style={{ width: "100%", height: "auto", margin: "5px 0" }}
        >
          Your browser does not support the video tag.
        </video>
      ) : fileName.endsWith(".xls") || fileName.endsWith(".xlsx") ? (
        <a
          key={index}
          href={fileSrc}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", margin: "5px 0", color: "green" }}
        >
          {fileName} {/* Display the filename */}
        </a>
      ) : (
        <a
          key={index}
          href={fileSrc}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", margin: "5px 0", color: "blue" }}
        >
          {fileName} {/* Display the filename */}
        </a>
      )
    );
  })}
    </div>
  </div>
)}

                {record.content ? (
                  <div style={{
                    width: '100%',
                    borderTop: '1px solid black',
                  }}>
                    <p><b>Question Details:</b></p>
                    <div style={{
                      height: '60px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '30px',
                    }}>
                      <div
                        className='expand'
                        style={{
                          height: '90%',
                          width: '220px',
                          margin: 'auto 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                        }}
                      >
                        <div className='icon-cont' style={{ background: "#50AB19" }}>
                          <img src="Assets/eth.png" alt='notification' />
                        </div>
                        <p>
                          {record.stake_amount ? record.stake_amount : '0.0000'} ETH
                        </p>
                      </div>
                      <div
                        className='expand'
                        style={{
                          height: '90%',
                          width: 'auto',
                          margin: 'auto 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                        }}
                      >
                        <div className='icon-cont' style={{ background: "#A8AB19" }}>
                          <img src="Assets/scope.png" alt='notification' />
                        </div>
                        <p>
                          {record.location_name ? record.location_name : 'Not provided'}
                        </p>
                      </div>
                      <div
                        className='expand'
                        style={{
                          height: '90%',
                          width: '220px',
                          margin: 'auto 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                        }}
                      >
                        <div className='icon-cont' style={{ background: "#7C19AB" }}>
                          <img src="Assets/check.png" alt='notification' />
                        </div>
                        <p>
                          Approved
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ),
          }}

          bordered
          dataSource={activity.length > 0 ? activity : dataUser}
          pagination={false} // Disables pagination

        />
        }
      </div>
    </div>
  {/* End Table Section */}
</div>  )
}

export default LogActivity
