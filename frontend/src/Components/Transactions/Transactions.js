import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import React from 'react'
import Details from '../UI/Details';
import ChartCard from '../UI/ChartCard';

const Transactions = ({title}) => {
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
      const details = [
        {
          src:"Assets/eth.png",
          title: "Total Staked Amount",
          value: "$ 612,869",
          percent:16,
          color:"#50AB19"
        },
        {
          src:"Assets/mon.png",
          title: "Stakes not disbursed",
          value: "$ 869,100",
          percent:16,
          color:"#1988AB"
        },
        {
          src:"Assets/vector.png",
          title: "Total Transactions",
          value: "$ 1,912,345",
          percent:0.7,
          color:"#7C19AB"
        },
        {
          src:"Assets/scope.png",
          title: "LIVE Staked Amount",
          value: "$ 12,345",
          percent:2,
          color:"#A8AB19"
        }
      ]
      const   charts = [
        {
          title:(<p>Level Wise Amount Disbursed <span>(Reputation)</span></p>),
          action:(<a href=''>view details</a>),
          type:"chart",
          interface:"trans"

        },
        {
          title:(<p>Highest Transactions Location</p>),
          action:( <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Country
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>),
          type:"map",
          interface:"trans"
        },
        {
          title:(<p>Amount staked vs Amount disbursed</p>),
          action:(<a href=''>view details</a>),
          type:"Line",
          interface:"trans",
          version:"v1"
        },
        {
          title:(<p>Average Amount Stacked</p>),
          action:(<a href=''>view details</a>),
          type:"Line",
          interface:"trans",
          version:"v2"
        }
      ]
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
    {/* end sorting section */}
    {/* details section */}
     <div className='info'>
        {
            details.map((info , i) => <Details key={i} index={i} info={info} /> )
        }
      </div>
      {/* End info section */}
      {/* Charts Section */}
      <div className='charts'>
        {
          charts.map((chart , i) => <ChartCard key={i} chart={chart} />)
        }
      </div>
    </div>
  )
}

export default Transactions
