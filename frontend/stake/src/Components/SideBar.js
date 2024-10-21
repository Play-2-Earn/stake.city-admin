import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='pannel'>
       <div className='head'>
        <p>
            Stake.City
        </p>
       </div>
       <div className='menu1'>
        <p> Menu </p>
        <Link style={{textDecoration:'none'}} to="/overview" className='menu-button'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="grid">
            <g>
              <g>
                <rect width="24" height="24" opacity="0"></rect>
                <path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM19 3h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM19 13h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"></path>
              </g>
            </g>
          </svg>
          <p>Overview</p>
        </Link>
        <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path d="M13.1581 13C12.4506 12.7169 12.1681 11.9387 12.1681 11.9387C12.1681 11.9387 11.8494 12.115 11.8494 11.62C11.8494 11.125 12.1681 11.9387 12.4869 10.0275C12.4869 10.0275 13.37 9.77937 13.1931 7.72749H12.9806C12.9806 7.72749 13.5119 5.53374 12.9806 4.78999C12.4494 4.04749 12.2381 3.55249 11.07 3.19812C9.9019 2.84374 10.3275 2.91437 9.47815 2.95062C8.62815 2.98687 7.92065 3.44624 7.92065 3.69437C7.92065 3.69437 7.3894 3.72937 7.17815 3.94187C6.96565 4.15437 6.6119 5.14437 6.6119 5.39187C6.6119 5.63937 6.78877 7.30437 6.96565 7.65749L6.75502 7.72874C6.57752 9.78062 7.46127 10.0287 7.46127 10.0287C7.78002 11.94 8.09877 11.1262 8.09877 11.6212C8.09877 12.1162 7.78002 11.94 7.78002 11.94C7.78002 11.94 7.49752 12.7181 6.79002 13.0012C6.08252 13.2837 2.15502 14.805 1.83565 15.1237C1.51565 15.4425 1.5519 16.9287 1.5519 16.9287H18.3938C18.3938 16.9287 18.4313 15.4431 18.1113 15.1237C17.7925 14.805 13.8644 13.2837 13.1569 13.0012L13.1581 13ZM5.3644 12.8925C5.3019 12.78 5.2719 12.6987 5.2719 12.6987C5.2719 12.6987 5.0019 12.8487 5.0019 12.4287C5.0019 12.0087 5.2719 12.6987 5.5419 11.0787C5.5419 11.0787 6.2919 10.8694 6.1419 9.12999H5.96065C5.96065 9.12999 6.05065 8.76124 6.1094 8.29625C6.10676 8.08849 6.11448 7.88073 6.13252 7.67374L6.15627 7.40749C6.14377 7.09999 6.0894 6.81999 5.96127 6.64124C5.51127 6.01187 5.33127 5.59124 4.34252 5.29124C3.35252 4.99124 3.71127 5.05124 2.99252 5.08187C2.27252 5.11312 1.67252 5.50187 1.67252 5.71312C1.67252 5.71312 1.22252 5.74249 1.04252 5.92249C0.873772 6.09124 0.601897 6.83624 0.569397 7.10062V7.27562C0.599397 7.68437 0.731897 8.80687 0.863147 9.07124L0.684397 9.13124C0.534397 10.87 1.2844 11.08 1.2844 11.08C1.55315 12.6987 1.82377 12.01 1.82377 12.43C1.82377 12.85 1.55377 12.6987 1.55377 12.6987C1.55377 12.6987 1.3144 13.36 0.714397 13.5987L0.569397 13.6562V16.9275H0.928772C0.910022 16.1287 0.976897 15.0981 1.39502 14.6812C1.61815 14.4594 2.34752 14.0937 5.36565 12.8925H5.3644ZM19.3206 7.23249C19.2956 6.99624 19.2413 6.78562 19.1381 6.64124C18.6894 6.01124 18.5088 5.59124 17.5194 5.29124C16.53 4.99124 16.89 5.05124 16.1694 5.08187C15.4506 5.11312 14.8506 5.50187 14.8506 5.71312C14.8506 5.71312 14.4006 5.74249 14.2206 5.92249C14.0519 6.09249 13.7769 6.84249 13.7469 7.10374H13.7675L13.8175 7.67499C13.83 7.81874 13.8313 7.94687 13.8344 8.07749C13.8906 8.49374 13.9656 8.92124 14.0406 9.07124L13.8619 9.13062C13.7119 10.8694 14.4619 11.0794 14.4619 11.0794C14.7319 12.6981 15.0013 12.0094 15.0013 12.4294C15.0013 12.8494 14.7325 12.6981 14.7325 12.6981C14.7325 12.6981 14.6988 12.7875 14.63 12.9106C17.6113 14.0981 18.3344 14.4606 18.555 14.6812C18.9738 15.0987 19.0388 16.1287 19.0206 16.9281H19.3206V13.6125L19.2894 13.5987C18.6894 13.3594 18.4494 12.6987 18.4494 12.6987C18.4494 12.6987 18.1788 12.8487 18.1788 12.43C18.1788 12.0112 18.4494 12.6987 18.7188 11.08C18.7188 11.08 19.2213 10.9362 19.3206 9.92999V9.16249C19.3206 9.15124 19.3206 9.14187 19.3188 9.13124H19.1375C19.1375 9.13124 19.2725 8.575 19.3206 7.96749V7.23249Z"></path>
              </g>
          </g>
        </svg>
          <p>Users Activity</p>
        </div>
        <Link to='/transactions' className='menu-button' style={{textDecoration:'none'}}>
        <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path
                d="M1 5.5H17.2M13.6 1L18.1 5.5L13.6 10M19 14.5H2.8M6.4 10L1.9 14.5L6.4 19"
                class="stroke-path"
                stroke="black"
                stroke-opacity="0.7"
                stroke-width="2" />
            </g>
          </g>
        </svg>

        <p>Transactions</p>
        </Link>
        <Link to='/taskstatus' style={{textDecoration:'none'}} className='menu-button'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="grid">
            <g>
              <g>
                <rect width="24" height="24" opacity="0"></rect>
                <path xmlns="http://www.w3.org/2000/svg" d="M20 20H0V0H2V17.7778H4V7.77778H8V17.7778H10V3.33333H14V17.7778H16V12.2222H20V20Z"/>              </g>
            </g>
          </svg>
          <p>Task Status</p>
        </Link>
        <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M16 11.25V8.75H20V11.25H16ZM17.2 20L14 17L15.2 15L18.4 18L17.2 20ZM15.2 5L14 3L17.2 0L18.4 2L15.2 5ZM3 18.75V13.75H2C1.45 13.75 0.979002 13.505 0.587002 13.015C0.195002 12.525 -0.000664969 11.9367 1.69779e-06 11.25V8.75C1.69779e-06 8.0625 0.196002 7.47375 0.588002 6.98375C0.980002 6.49375 1.45067 6.24917 2 6.25H6L11 2.5V17.5L6 13.75H5V18.75H3ZM12 14.1875V5.8125C12.45 6.3125 12.8127 6.92208 13.088 7.64125C13.3633 8.36042 13.5007 9.14667 13.5 10C13.5 10.8542 13.3623 11.6408 13.087 12.36C12.8117 13.0792 12.4493 13.6883 12 14.1875Z" />
            </g>
          </g>
        </svg>
          <p>Reported</p>
        </div>
        <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M15.4167 1.66667H4.58335C4.47285 1.66667 4.36687 1.71057 4.28873 1.78871C4.21059 1.86685 4.16669 1.97283 4.16669 2.08333V9.16667H9.16669V6.66667L13.3334 10L9.16669 13.3333V10.8333H4.16669V17.9167C4.16669 18.0272 4.21059 18.1332 4.28873 18.2113C4.36687 18.2894 4.47285 18.3333 4.58335 18.3333H15.4167C15.5272 18.3333 15.6332 18.2894 15.7113 18.2113C15.7895 18.1332 15.8334 18.0272 15.8334 17.9167V2.08333C15.8334 1.97283 15.7895 1.86685 15.7113 1.78871C15.6332 1.71057 15.5272 1.66667 15.4167 1.66667Z"/>
            </g>
          </g>
        </svg>
          <p>Log Activity</p>
        </div>

       <div className='separation'>
       </div>

       </div>
       <div className='menu1'>
       <p> Menu </p>
       <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M7.70833 18.3333L7.375 15.6667C7.19444 15.5972 7.02417 15.5139 6.86417 15.4167C6.70417 15.3194 6.54806 15.2153 6.39583 15.1042L3.91667 16.1458L1.625 12.1875L3.77083 10.5625C3.75694 10.4653 3.75 10.3714 3.75 10.2808V9.71916C3.75 9.62861 3.75694 9.53472 3.77083 9.4375L1.625 7.8125L3.91667 3.85416L6.39583 4.89583C6.54861 4.78472 6.70833 4.68055 6.875 4.58333C7.04167 4.48611 7.20833 4.40278 7.375 4.33333L7.70833 1.66666H12.2917L12.625 4.33333C12.8056 4.40278 12.9758 4.48611 13.1358 4.58333C13.2958 4.68055 13.4519 4.78472 13.6042 4.89583L16.0833 3.85416L18.375 7.8125L16.2292 9.4375C16.2431 9.53472 16.25 9.62861 16.25 9.71916V10.2808C16.25 10.3714 16.2361 10.4653 16.2083 10.5625L18.3542 12.1875L16.0625 16.1458L13.6042 15.1042C13.4514 15.2153 13.2917 15.3194 13.125 15.4167C12.9583 15.5139 12.7917 15.5972 12.625 15.6667L12.2917 18.3333H7.70833ZM10.0417 12.9167C10.8472 12.9167 11.5347 12.6319 12.1042 12.0625C12.6736 11.4931 12.9583 10.8056 12.9583 10C12.9583 9.19444 12.6736 8.50694 12.1042 7.9375C11.5347 7.36805 10.8472 7.08333 10.0417 7.08333C9.22222 7.08333 8.53111 7.36805 7.96833 7.9375C7.40556 8.50694 7.12444 9.19444 7.125 10C7.125 10.8056 7.40611 11.4931 7.96833 12.0625C8.53056 12.6319 9.22167 12.9167 10.0417 12.9167Z" />
            </g>
          </g>
        </svg>
          <p>Settings</p>
        </div>
        <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M9.95835 15C10.25 15 10.4967 14.8992 10.6984 14.6975C10.9 14.4958 11.0006 14.2494 11 13.9583C11 13.6667 10.8995 13.42 10.6984 13.2183C10.4972 13.0167 10.2506 12.9161 9.95835 12.9167C9.66669 12.9167 9.4203 13.0175 9.21919 13.2192C9.01808 13.4208 8.91724 13.6672 8.91669 13.9583C8.91669 14.25 9.01752 14.4967 9.21919 14.6983C9.42085 14.9 9.66724 15.0006 9.95835 15ZM9.20835 11.7917H10.75C10.75 11.3333 10.8022 10.9722 10.9067 10.7083C11.0111 10.4444 11.3061 10.0833 11.7917 9.62501C12.1528 9.26389 12.4375 8.92001 12.6459 8.59334C12.8542 8.26667 12.9584 7.87445 12.9584 7.41667C12.9584 6.63889 12.6736 6.04167 12.1042 5.62501C11.5347 5.20834 10.8611 5.00001 10.0834 5.00001C9.29169 5.00001 8.64919 5.20834 8.15585 5.62501C7.66252 6.04167 7.31891 6.54167 7.12502 7.12501L8.50002 7.66667C8.56946 7.41667 8.72585 7.14584 8.96919 6.85417C9.21252 6.56251 9.58391 6.41667 10.0834 6.41667C10.5278 6.41667 10.8611 6.53834 11.0834 6.78167C11.3056 7.025 11.4167 7.29223 11.4167 7.58334C11.4167 7.86112 11.3334 8.12167 11.1667 8.36501C11 8.60834 10.7917 8.83389 10.5417 9.04167C9.93058 9.58334 9.55558 9.99306 9.41669 10.2708C9.2778 10.5486 9.20835 11.0556 9.20835 11.7917ZM10 18.3333C8.84724 18.3333 7.76391 18.1144 6.75002 17.6767C5.73613 17.2389 4.85419 16.6453 4.10419 15.8958C3.35419 15.1458 2.76058 14.2639 2.32335 13.25C1.88613 12.2361 1.66724 11.1528 1.66669 10C1.66669 8.84723 1.88558 7.76389 2.32335 6.75001C2.76113 5.73612 3.35474 4.85417 4.10419 4.10417C4.85419 3.35417 5.73613 2.76056 6.75002 2.32334C7.76391 1.88612 8.84724 1.66723 10 1.66667C11.1528 1.66667 12.2361 1.88556 13.25 2.32334C14.2639 2.76112 15.1459 3.35473 15.8959 4.10417C16.6459 4.85417 17.2397 5.73612 17.6775 6.75001C18.1153 7.76389 18.3339 8.84723 18.3334 10C18.3334 11.1528 18.1145 12.2361 17.6767 13.25C17.2389 14.2639 16.6453 15.1458 15.8959 15.8958C15.1459 16.6458 14.2639 17.2397 13.25 17.6775C12.2361 18.1153 11.1528 18.3339 10 18.3333Z" />
            </g>
          </g>
        </svg>
          <p>Help</p>
        </div>
        <div className='menu-button'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='users'>
          <g>
            <g>
              <rect width="24" height="24" opacity="0"></rect>
              <path xmlns="http://www.w3.org/2000/svg" d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 10C18.3334 9.61417 17.755 9.55 17.5559 9.88084C17.1311 10.5845 16.5517 11.1822 15.8617 11.6287C15.1717 12.0753 14.3891 12.359 13.5732 12.4583C12.7573 12.5576 11.9295 12.4699 11.1526 12.2019C10.3756 11.9339 9.66976 11.4926 9.08859 10.9114C8.50741 10.3303 8.06612 9.62445 7.79812 8.84747C7.53013 8.07048 7.44246 7.2427 7.54177 6.42681C7.64107 5.61093 7.92475 4.82834 8.3713 4.13833C8.81785 3.44831 9.41557 2.86897 10.1192 2.44417C10.45 2.24417 10.3859 1.66667 10 1.66667C5.39752 1.66667 1.66669 5.39751 1.66669 10C1.66669 14.6025 5.39752 18.3333 10 18.3333Z" />
            </g>
          </g>
        </svg>
          <p>Dark Mode</p>
        </div>
        </div>
    </div>
  )
}

export default SideBar