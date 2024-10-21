import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import React from 'react'
import Details from '../Components/Details';
import ChartCard from '../Components/ChartCard';

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
          src:"https://s3-alpha-sig.figma.com/img/9826/5f99/9350454296b0020d37a9e1ae69f8af67?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F0Oc8vt9P-DgxHV8lQJk0C7AvnB-6OKymoAPuHTKwu7V7QI-9kIbYlEJhwzZeorra83alQ09tUh6M-qw46X~H7FIQUmtpcWhr~nNfVh84E8W~RQwqdqVM~SDBfDZObHj8vztjCrI2ssLHhxTuEVQU8Xum1UO~8qR7T-w5IO3fqJmTDOAYoyRHBkGK2Ih0jjMc4GgraT7qI5jWsFWpdIYGN9~8r~vvmhZHRzGQOSUOegq87eYayWoYcSHUlOH8Algh537MBozseqeGOwie5Dze32AJmCyzfzaxfP6uReukSSjHgyYCM5K6E~1CF9~liuGrHd5uOaCZ4QcK9nwip5R8A__",
          title: "Total Staked Amount",
          value: "$ 612,869",
          percent:16,
          color:"#50AB19"
        },
        {
          src:"https://s3-alpha-sig.figma.com/img/b793/cbe8/12b023e703038ada35f3ce3d702dd3c4?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j1H18wZ47ntjHjTLcwqzpLqZTqYAovF77nbXRWm8HLHzramdEw5Dc0y3GPt-CEy1SqMz5XHzX5ZeffIX8ZTSPxGJYEn8nKZ6Kt1lLrAkayUbuKmF1lEVMUegodNteJ0RsDpjUmnxPLQGj31nRP9diFDdAEdhsAbr0eZG3F-bX8BjqWcxnHUAnXuECxrXzcOncz6B7HulxD0DWSWOrnRtPXmQ2WamGAhMb5hKcFV8TtRKXJ2nf2RNlen1rpNYoW3yQ6i02Ngf~ZqRAt0JQ5fob5x1qnR41MycHKKr0hAKhteJ694HinN4W9x6eHcbMGRtKxBHvLVTdrbGwQfIsVDEQA__",
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
          src:"https://s3-alpha-sig.figma.com/img/9897/cc27/210cc67992a3325360ffc35aaa650b3e?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fsg04eo-CPvW7bENCt5yduGJGUDxeQXLSx7L0rrg7zPKw4EP-lT8RMtW4K~VWsAUvRV4~p8Flo3oA6cVA4XJVcgwUC9c8somOLAd3AeRzoZajPuIn~W5IFJAGKj1-Uj2VzhmTkUwY4I1SISa3FUgjySuYcn5uDeRPPOqf0RCWaMOoBu-IsjqyMBzKp~t6jBXgKn8FNsmuZhfPAMwb6SlBqvfpUB2Zc6o63d5zcINDCsYdfDrLw4ILO3WpOaxQV7zJxI9V9zhmdK1DiS698-Y4IwXeUa7K~hMz874l1uRkQr35yluvZanekgTly1aKGyba6KcpVKfKf35a6baXYCJRw__",
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
                <img src='https://s3-alpha-sig.figma.com/img/f87a/8574/733200303be2c5cf325e1c29514e36b0?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mlZG1aZS-2DuuDo-pDKINKbgXht81nZOXMJIrzBa5wGAP7R9vrRSX1Eif1n5VHXuvG4ca4mwsi5QR3leNyUrG6z5pTo5fo8224G~ff1a6MYrJRW356dmsHtTDzQtf~npzW8p4wQgk1EyBdOaxFq2DhehdWVn8PmF7PO5NjYK7pXKs7LLwaZiC22CnmclilrUlUdV9WmR-S9AUimQKzu8doGyO7SG5HaEI1v9mWuJJormEloQWb5voBhTRzsHy9RG2u2QFVmAndRNEB8cHG3Ytu05JUYaVvFE42WbGZsFHiYqckZDCgJ-38Lfykp0eGeAvPrl~zTsc1~4Y0gWpzsfwA__' alt='profile' className='profile' />
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
