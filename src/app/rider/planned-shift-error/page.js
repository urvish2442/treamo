/** @format */

'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import CommonBlock from '@/components/styles/ryder.style';
import Header from '@/components/styles/ryderHeader.style';
import Select from 'react-select';
const PlanShiftError = () => {
  const dropdownRef = useRef(null);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (document.getElementById('clickbox')) {
        if (document.getElementById('clickbox').contains(e.target)) {
          setProfileDropdownOpen(true);
        } else {
          setProfileDropdownOpen(false);
        }
      } else {
        setProfileDropdownOpen(false);
      }
    });
  }, []);
  return (
    <CommonBlock>
      <Header>
        <div className='header-block'>
          <div className='header-block-left'>
            <Link href={''}>
              <img alt='' src='/back-arrrow-header.svg' />
            </Link>
          </div>
          <div className='header-block-right'>
            <button className='profile-btn' id='clickbox'>
              <span>Anwar Raza</span>
              <img alt='' src='/icon-arrow-block.png' />
            </button>
          </div>
        </div>
      </Header>
      {isProfileDropdownOpen && (
        <div
          ref={dropdownRef}
          className='absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]'>
          <ul className='py-4'>
            <li className='full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent'>
              <button
                // onClick={() => router.push("/hubmanager/editprofile")}
                style={{ cursor: 'pointer' }}>
                <img className='h-6 w-6' src='/images/ic_profile.svg' />
                <span className='font-inter text-black text-[16px]'>Profile</span>
              </button>
            </li>

            <li className='full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent'>
              <button style={{ cursor: 'pointer' }}>
                <img className='h-6 w-6' src='/logout-icon.svg' />
                <span className='font-inter text-black text-[16px]'>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      <div className='common-block-ryder'>
        <div className='shift-common-error'>
          <div className='shift-common-error-inner'>
            <img src='/error-img.png' />
            <p>Krankmeldung</p>
          </div>
          <div className='shift-common-error-inner'>
            <img src='/error-img.png' />
            <p>Bezahlung</p>
          </div>
          <div className='shift-common-error-inner'>
            <img src='/error-img.png' />
            <p>Unfall</p>
          </div>
          <div className='shift-common-error-inner'>
            <img src='/error-img.png' />
            <p>Verspätung</p>
          </div>
          <div className='shift-common-error-inner'>
            <img src='/error-img.png' />
            <p>Check In</p>
          </div>
        </div>
      </div>
    </CommonBlock>
  );
};

export default PlanShiftError;
